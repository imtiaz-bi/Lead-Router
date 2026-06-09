# 📞 Lead Router

A Google Apps Script-based ETL system that transforms raw lead spreadsheets into **timezone-segmented, call-ready datasets using phone number area codes**.

---

## ⚡ One-Line Summary

Automatically converts unstructured lead lists in Google Sheets into structured, region-specific outbound calling sheets in seconds.

---

## 🚀 Overview

Lead Router is designed for sales teams handling large volumes of North American phone-based lead data in Google Sheets.

It automates the manual process of sorting and organizing leads by geographic calling regions using deterministic area-code mapping.

---

## 🎯 Core Problem

Sales teams typically face:

- Manual segmentation of large lead lists
- Time-consuming timezone filtering
- High risk of human sorting errors
- Inefficient outbound calling workflows

Lead Router eliminates this by fully automating segmentation inside Google Sheets.

---

## ⚙️ What the System Does

- Normalizes and cleans phone numbers
- Extracts area codes from raw inputs
- Maps numbers to North American time zones
- Separates leads into region-based sheets
- Isolates invalid, toll-free, and unmapped numbers
- Preserves original dataset structure

---

## 📊 Output Structure

The system generates the following sheets:

- 🇺🇸 ET (Eastern Time)
- 🇺🇸 CT (Central Time)
- 🇺🇸 MT (Mountain Time)
- 🇺🇸 PT (Pacific Time)
- 🇺🇸 AK (Alaska)
- 🇺🇸 HI (Hawaii)
- ☎️ TOLL_FREE
- ❌ ERRORS

Each row includes:

- Original lead data
- Cleaned phone number
- Extracted extension (if any)
- Assigned timezone

---

## 🧠 System Architecture

### ETL Pipeline Flow

RAW_INPUT → Column Detection → Phone Normalization → Validation → Area Code Extraction → Timezone Mapping → Bucket Routing → Sheet Generation

---

## 🧩 Core Components

### UI Layer
- Adds custom Google Sheets menu
- Provides execution controls
  - Run Routing
  - Reset Output

---

### Orchestrator Engine
- Central controller (`runRouting`)
- Manages full ETL workflow
- Handles bucket initialization
- Triggers output generation

---

### Data Processing Engine
- Phone cleaning and normalization
- Extension extraction
- Validation (10-digit enforcement)
- Area code extraction

---

### Routing Engine
- Maps area codes to predefined time zones
- Handles toll-free detection
- Routes records into buckets

---

### Output Engine
- Writes processed data into separate sheets
- Clears and refreshes outputs on each run
- Maintains consistent schema across all buckets

---

## 📥 Input Requirements

- Google Sheet named: `RAW_INPUT`
- Must contain at least one phone-like column

Supported formats:
- (212) 555-1234
- 212-555-1234
- +1 212 555 1234

---

## 🧮 Data Processing Logic

1. Detect phone column automatically
2. User selects correct column (if multiple detected)
3. Normalize phone numbers
4. Remove formatting noise and extensions
5. Validate 10-digit structure
6. Extract area code
7. Map to timezone bucket
8. Write to output sheets

---

## 🧾 Error Handling

Invalid or unmapped records are routed to `ERRORS` sheet.

Tracked error types:
- Blank numbers
- Invalid format
- Invalid structure
- Unmapped area codes

---

## 📈 Performance Profile

- Complexity: **O(n)** linear processing
- Observed performance:
  - ~11,000 records processed in ~25 seconds
- Optimized via:
  - In-memory processing
  - Batch sheet writes
  - Minimal spreadsheet I/O

---

## 🔐 Data Safety

- No external APIs
- No data transmission outside Google Sheets
- Original dataset remains unchanged
- All transformations are non-destructive

---

## 🛠️ Tech Stack

- Google Apps Script
- JavaScript (ES5/ES6)
- Google Sheets API (native)
- Spreadsheet UI Service

---

## 🔄 Platform Compatibility

Lead Router is built specifically for Google Sheets using Google Apps Script and is not directly compatible with Microsoft Excel.

The system relies on Google-native services such as SpreadsheetApp, UI menus, and container-bound scripting, which do not exist in Excel environments.

However, the core logic (data cleaning, validation, and routing) is platform-agnostic and can be adapted to Excel using VBA or Office Scripts with minimal architectural changes.

---

## 🧱 System Limitations

- Scoped to North American Numbering Plan (NANP) phone data only  
- Relies on deterministic area-code mapping rather than geolocation-based resolution  
- No de-duplication, as duplicates may represent valid shared business or organizational numbers
- Does not perform carrier or line-type classification  
- No native CRM or dialer integrations; system is optimized for spreadsheet-native execution
- Built for Google Sheets using Apps Script and is not directly compatible with Microsoft Excel without refactoring to VBA or Office Scripts

---

## 🔮 Future Improvements

- CRM integrations (HubSpot / Salesforce)
- Duplicate detection layer
- Do Not Call (DNC) filtering
- International number support
- Dashboard UI inside Sheets
- Performance scaling for large datasets

---

## 🧪 Engineering Approach

- Built iteratively using real-world sales workflows
- Designed as a lightweight ETL system inside Google Sheets
- Tested using synthetic and real lead datasets
- Optimized for speed, simplicity, and reliability

---

## 📌 Version

Current Version: v2.5

---

## 👤 Author Notes

This project was built using an AI-assisted development workflow.

AI tools were used for:
- Code scaffolding
- Logic refinement
- Debugging support
- Test data generation

All system design decisions and final implementation remain human-directed.

---

## 📌 Summary

Lead Router is a lightweight ETL automation system that converts raw lead data into structured, timezone-segmented calling lists entirely within Google Sheets.
