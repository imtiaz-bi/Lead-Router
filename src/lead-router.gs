const VERSION = "2.7";

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu(`Lead Router ${VERSION}`)
    .addItem("Run Routing", "runRouting")
    .addItem("Reset Output", "resetOutput")
    .addToUi();
}

/**
 * =========================
 * TIMEZONE CONFIG
 * =========================
 */
const TIMEZONE_CONFIG = {
  ET: { areaCodes: [ "203","207","212","215","216","220","223","226","229","231","234","239","240","248","249","252","260","267","269","272","276","289","301","302","304","305","313","315","317","321","330","332","336","339","343","347","351","352","365","380","386","401","404","407","410","412","413","416","418","419","434","437","438","440","443","450","463","470","475","478","484","502","508","513","514","516","518","519","540","548","551","561","567","570","574","579","581","586","603","606","607","609","610","613","614","616","617","631","646","647","656","658","667","678","679","681","689","703","704","705","706","716","718","724","732","734","740","743","753","754","757","762","765","770","771","774","781","782","786","802","803","804","810","813","814","819","828","845","848","850","856","857","859","860","863","864","878","904","905","908","910","912","914","917","919","929","934","937","941","947","954","973","978","980","984","989" ] },

  CT: { areaCodes: [ "204","205","210","214","217","218","219","224","225","228","251","254","256","262","281","306","309","312","314","318","319","320","325","331","334","337","346","361","402","405","409","414","417","423","430","431","432","464","469","479","501","504","507","512","515","531","539","557","563","573","580","601","608","612","615","618","620","630","636","639","641","651","660","662","682","708","712","713","715","731","737","763","769","773","785","806","812","815","816","817","830","832","847","865","870","872","901","903","913","915","918","920","931","936","940","952","956","972","979","985" ] },

  MT: { areaCodes: [ "208","303","307","308","385","403","406","435","480","505","520","575","587","602","623","654","719","720","780","801","825","928","970","983" ] },

  PT: { areaCodes: [ "121","134","136","140","141","142","145","150","151","153","206","209","213","236","250","253","310","323","341","360","369","408","415","424","425","458","503","509","510","530","541","559","562","564","604","619","626","628","650","661","669","702","707","714","760","775","778","805","818","831","858","909","916","925","949","951","971" ] },

  AK: { areaCodes: ["907"] },
  HI: { areaCodes: ["808"] },

  TOLL_FREE: { areaCodes: ["800","833","844","855","866","877","888"] }
};

/**
 * =========================
 * MAIN ROUTING
 * =========================
 */
function runRouting() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("RAW_INPUT");

  if (!sheet) {
    SpreadsheetApp.getUi().alert("RAW_INPUT sheet not found");
    return;
  }

  const data = sheet.getDataRange().getValues();
  if (data.length < 2) {
    SpreadsheetApp.getUi().alert("No data found in RAW_INPUT");
    return;
  }

  const headers = data[0].map(h => h.toString().trim());
  const rows = data.slice(1);

  const phoneColumns = detectPhoneColumns(headers);

  if (phoneColumns.length === 0) {
    SpreadsheetApp.getUi().alert("No phone columns found");
    return;
  }

  const selection = askUserToChooseMode(phoneColumns);

  if (!selection) {
    SpreadsheetApp.getUi().alert("Routing cancelled.");
    return;
  }

  const isAllMode = selection === "ALL";
  const selectedColumns = isAllMode
    ? phoneColumns
    : [phoneColumns.find(c => c.index === selection)];

  const columnSummaries = {};

  selectedColumns.forEach(col => {

    const buckets = {
      ET: [], CT: [], MT: [], PT: [],
      AK: [], HI: [], TOLL_FREE: [], ERRORS: []
    };

    const summary = {
      total: rows.length,
      ET: 0, CT: 0, MT: 0, PT: 0,
      AK: 0, HI: 0, TOLL_FREE: 0, ERRORS: 0
    };

    rows.forEach(row => {

      const safeRow = normalizeRow(row, headers.length);
      const rawPhone = String(safeRow[col.index] || "").trim();

      const ext = extractExtension(rawPhone);
      const cleanedPhone = cleanPhone(rawPhone);

      const validation = validatePhone(cleanedPhone);

      // ✅ RESTORED v2.6 ERROR HANDLING
      if (!validation.valid) {
        buckets.ERRORS.push([
          ...safeRow,
          cleanedPhone,
          ext,
          validation.reason
        ]);
        summary.ERRORS++;
        return;
      }

      const areaCode = extractAreaCode(cleanedPhone);

      if (areaCode === "INVALID") {
        buckets.ERRORS.push([
          ...safeRow,
          cleanedPhone,
          ext,
          "INVALID_AREA_CODE_STRUCTURE"
        ]);
        summary.ERRORS++;
        return;
      }

      const zone = getTimeZone(areaCode);

      if (zone === "ERROR") {
        buckets.ERRORS.push([
          ...safeRow,
          cleanedPhone,
          ext,
          "UNMAPPED_AREA_CODE"
        ]);
        summary.ERRORS++;
        return;
      }

      buckets[zone].push([
        ...safeRow,
        cleanedPhone,
        ext,
        zone
      ]);

      summary[zone]++;
    });

    writeOutput(ss, headers, buckets, col.name);
    columnSummaries[col.name] = summary;
  });

  showSummary(columnSummaries);
}

/**
 * =========================
 * MODE SELECTION
 * =========================
 */
function askUserToChooseMode(columns) {
  const ui = SpreadsheetApp.getUi();

  let msg =
    "Enter '0' to PROCESS ALL COLUMNS\n\n" +
    "Or pick one column from below:\n\n";

  columns.forEach((c, i) => {
    msg += `${i + 1}. ${c.name}\n`;
  });

  const response = ui.prompt(
    "Lead Router Mode Selection",
    msg,
    ui.ButtonSet.OK_CANCEL
  );

  if (response.getSelectedButton() === ui.Button.CANCEL) {
    return null;
  }

  const choice = parseInt(response.getResponseText(), 10);

  if (isNaN(choice)) return null;

  if (choice === 0) return "ALL";

  const index = choice - 1;

  if (index < 0 || index >= columns.length) return null;

  return columns[index].index;
}

/**
 * =========================
 * COLUMN DETECTION
 * =========================
 */
function detectPhoneColumns(headers) {

  const strongSignals = ["phone","mobile","cell","contact","number"];
  const exclude = ["address","city","state","zip","postal","country"];

  return headers.map((h, i) => {
    const s = h.toLowerCase().replace(/[_-]/g, " ").trim();

    if (exclude.some(e => s.includes(e))) return null;

    const hasSignal = strongSignals.some(k => s.includes(k));
    const hasLine = /\bline\b/.test(s);

    if (hasSignal || hasLine) {
      return { name: h, index: i };
    }

    return null;
  }).filter(Boolean);
}

/**
 * =========================
 * PHONE HELPERS
 * =========================
 */
function normalizeRow(row, length) {
  const safe = [];
  for (let i = 0; i < length; i++) {
    safe.push(row[i] !== undefined ? row[i] : "");
  }
  return safe;
}

function extractExtension(phone) {
  const match = phone.toString().match(/(?:ext\.?|x)\s*[:\-\.]?\s*(\d+)/i);
  return match ? match[1] : "";
}

function cleanPhone(phone) {
  let cleaned = phone.toString().replace(/(?:ext\.?|x)\s*[:\-\.]?\s*\d+/gi, "");
  cleaned = cleaned.replace(/\D/g, "");
  if (cleaned.length === 11 && cleaned.startsWith("1")) cleaned = cleaned.slice(1);
  return cleaned;
}

function validatePhone(phone) {
  if (!phone || phone.trim().length === 0) {
    return { valid: false, reason: "BLANK_PHONE" };
  }

  if (phone.length !== 10) {
    return { valid: false, reason: "INVALID_LENGTH_OR_FORMAT" };
  }

  return { valid: true };
}

function extractAreaCode(phone) {
  return phone.length === 10 ? phone.substring(0, 3) : "INVALID";
}

/**
 * =========================
 * ROUTING
 * =========================
 */
function getTimeZone(areaCode) {
  if (TIMEZONE_CONFIG.TOLL_FREE.areaCodes.includes(areaCode)) return "TOLL_FREE";

  for (let zone in TIMEZONE_CONFIG) {
    if (zone === "TOLL_FREE") continue;
    if (TIMEZONE_CONFIG[zone].areaCodes.includes(areaCode)) return zone;
  }

  return "ERROR";
}

/**
 * =========================
 * OUTPUT
 * =========================
 */
function writeOutput(ss, headers, buckets, columnName) {

  const safeHeaders = Array.isArray(headers) ? headers : [];

  const outputHeaders = [
    ...safeHeaders,
    `Phone Used - ${columnName}`,
    "Ext",
    "Zone"
  ];

  Object.keys(buckets).forEach(zone => {

    const sheetName = `${zone} [${columnName}]`;
    let sheet = ss.getSheetByName(sheetName);

    if (!sheet) sheet = ss.insertSheet(sheetName);
    else sheet.clear();

    sheet.getRange(1, 1, 1, outputHeaders.length).setValues([outputHeaders]);

    if (buckets[zone].length > 0) {
      sheet.getRange(2, 1, buckets[zone].length, outputHeaders.length)
        .setValues(buckets[zone]);
    }
  });
}

/**
 * =========================
 * SUMMARY
 * =========================
 */
function showSummary(columnSummaries) {
  const ui = SpreadsheetApp.getUi();

  let msg = `📊 Processing Summary (v${VERSION})\n\n`;

  let total = 0;

  for (let col in columnSummaries) {
    const s = columnSummaries[col];
    total += s.total;

    msg += `Column - ${col}\n`;
    msg += `Records Processed: ${s.total}\n`;
    msg += `ET: ${s.ET} | CT: ${s.CT} | MT: ${s.MT} | PT: ${s.PT}\n`;
    msg += `AK: ${s.AK} | HI: ${s.HI} | TOLL_FREE: ${s.TOLL_FREE}\n`;
    msg += `ERRORS: ${s.ERRORS}\n\n`;
  }

  msg = `Total Processed: ${total}\n\n` + msg;

  ui.alert(msg);
}

/**
 * =========================
 * RESET OUTPUT (SAFE)
 * =========================
 */
function resetOutput() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();

  const sheets = ss.getSheets();

  const toDelete = sheets
    .map(s => s.getName())
    .filter(name =>
      /^(ET|CT|MT|PT|AK|HI|TOLL_FREE|ERRORS)(\s[\(\[].+[\)\]])?$/.test(name)
    );

  if (toDelete.length === 0) {
    ui.alert("No Lead Router sheets found.");
    return;
  }

  const preview =
    "The following Lead Router sheets will be deleted:\n\n" +
    toDelete.join("\n") +
    `\n\nTotal: ${toDelete.length}`;

  const response = ui.alert(
    "Confirm Reset Output",
    preview + "\n\nProceed?",
    ui.ButtonSet.OK_CANCEL
  );

  if (response !== ui.Button.OK) {
    ui.alert("Reset cancelled.");
    return;
  }

  toDelete.forEach(name => {
    const sheet = ss.getSheetByName(name);
    if (sheet && ss.getSheets().length > 1) {
      ss.deleteSheet(sheet);
    }
  });

  ui.alert("Lead Router reset complete.");
}
