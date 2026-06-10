# 📞 Lead Router

A Google Apps Script-based ETL system that transforms raw lead spreadsheets into **timezone-segmented, call-ready datasets using phone number area codes**.

---

## ⚡ One-Line Summary

Automatically converts unstructured lead lists in Google Sheets into structured, region-specific outbound calling sheets in seconds — with support for **multi-column processing**.

---

## 🚀 Overview

Lead Router is designed for sales teams handling large volumes of North American phone-based lead data in Google Sheets.

It automates the manual process of sorting and organizing leads by geographic calling regions using deterministic area-code mapping.

It also supports processing multiple phone fields (Office, Mobile, HQ, etc.) independently in a single run.

---

## 🎯 Core Problem

Sales teams typically face:

- Manual segmentation of large lead lists
- Time-consuming timezone filtering
- High risk of human sorting errors
- Delays in sales campaign execution
- Multiple phone columns requiring separate processing

Lead Router eliminates this by fully automating segmentation inside Google Sheets.

---

## ⚙️ What the System Does

- Normalizes and cleans phone numbers
- Extracts area codes from raw inputs
- Maps numbers to North American time zones
- Separates leads into region-based sheets
- Supports single-column or multi-column processing
- Isolates invalid, toll-free, and unmapped numbers
- Preserves original dataset structure
- Generates separate outputs per phone column

---

## 🆕 Key Capabilities

### 🔁 Multi-Column Processing Mode

- Process one selected phone column or all detected phone columns at once
- Each column is processed independently

---

### 🔁 Multi-Column Processing Behavior

- Each phone column is treated as an independent dataset
- Total processing volume = rows × selected columns
- Example: 3 columns × 11,000 rows = 33,000 total processed records
- Designed for linear scalability across multiple contact fields

---

### 📁 Column-Based Output System

Each phone column generates its own full routing set:

- ET [Office Phone]
- CT [Office Phone]
- MT [Office Phone]
- PT [Office Phone]
- AK [Office Phone]
- HI [Office Phone]
- TOLL_FREE [Office Phone]
- ERRORS [Office Phone]

Same structure applies per column (Mobile Phone, HQ Phone, etc.)

---

### 🧭 Flexible Phone Column Selection

- Enter `0` → process all columns
- Or select a specific phone column

---

### 📊 Processing Summary

- Per-column breakdown of results
- Final aggregated summary across all processed data

---

### 🧹 Safe Reset System

- Detects all generated routing sheets dynamically
- Supports both legacy and modern naming formats:
  - ET (Column)
  - ET [Column]
- Shows preview of all sheets before deletion

---

## 📊 Output Structure

The system generates the following routing buckets per phone column:

- 🇺🇸 ET — Eastern Time
- 🇺🇸 CT — Central Time
- 🇺🇸 MT — Mountain Time
- 🇺🇸 PT — Pacific Time
- 🇺🇸 AK — Alaska Time
- 🇺🇸 HI — Hawaii Time
- ☎️ TOLL_FREE
- ❌ ERRORS

---

### 📁 Output Sheet Naming Format

Structure:

`ZONE [PHONE COLUMN]`

Examples:

- ET [Office Phone]
- CT [Office Phone]
- MT [Office Phone]

- ET [Mobile Phone]
- CT [Mobile Phone]
- MT [Mobile Phone]

---

## 🧠 System Architecture

### ETL Pipeline Flow

RAW_INPUT → Column Detection → User Selection → Phone Normalization → Validation → Area Code Extraction → Timezone Mapping → Bucket Routing → Sheet Generation

---

## 🧩 Core Components

### UI Layer
- Adds custom Google Sheets menu
- Provides execution controls:
  - Run Routing
  - Reset Output
- Supports multi-column selection interface

---

### Orchestrator Engine
- Central controller
- Handles single and multi-column workflows
- Aggregates results and summaries

---

### Data Processing Engine
- Phone normalization
- Extension extraction
- Validation (10-digit enforcement)
- Area code extraction

---

### Routing Engine
- Maps area codes to time zones
- Handles toll-free detection
- Routes records into appropriate buckets

---

### Output Engine
- Writes processed data into separate sheets per column
- Dynamically names sheets using:
  - `ZONE [COLUMN NAME]`
- Clears and refreshes outputs safely

---

## 📥 Input Requirements

- Google Sheet name: `RAW_INPUT`
- Must contain at least one phone-like column with keywords such as:
  Phone, Number, Mobile, Cell, Contact, Line

### Example column names:
Office Phone, Direct Line, HQ Number, Mobile, Cell

### Supported formats:

- (212) 555-1234
- 12125551234
- 212-555-1234
- (+1) 212 555 1234
- 212.555.1234
- 2125551234
- (+1) (212) 555-1234

---

## 🧮 Data Processing Logic

1. Detect phone columns using keyword matching: Phone, Number, Mobile, Cell, Contact, Line
2. User selects:
   - Single column OR
   - Process all columns
3. Normalize phone numbers
4. Remove formatting noise and extensions
5. Validate 10-digit structure
6. Extract area code
7. Map to time zone bucket
8. Write results into output sheets per column

---

## 🧾 Error Handling

Invalid or unmapped records are routed to an `ERRORS` sheet.

Tracked error types:

- BLANK_PHONE
- INVALID_LENGTH_OR_FORMAT
- INVALID_AREA_CODE_STRUCTURE
- UNMAPPED_AREA_CODE

---

## 📈 Performance Profile

- Complexity: O(n × m)

Optimized via:
- In-memory processing
- Batch sheet writes
- Minimal Spreadsheet I/O

Observed performance:

### Single-column processing
- ~11,000 records processed in ~25 seconds

### Multi-column processing
- 33,000 records processed across 3 phone columns
- Completed in ~80 seconds

### Scaling behavior
- Performance scales linearly with:
  - Number of records
  - Number of processed columns
- Execution depends on Google Apps Script runtime limits and spreadsheet size

### Performance interpretation
- Single column = baseline processing unit
- Multi-column = independent dataset expansion
- Total workload scales with dataset size × number of selected columns

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

Built specifically for Google Sheets using Google Apps Script and is not directly compatible with Microsoft Excel.

The system relies on Google-native services such as SpreadsheetApp, UI menus, and container-bound scripting.

However, the core logic is platform-agnostic and can be adapted to Excel using VBA or Office Scripts with minimal changes.

---

## 🧱 System Design Notes

- Scoped to North American Numbering Plan (NANP)
- Deterministic area-code mapping (not geolocation-based)
- Multi-column processing scales total workload proportionally
- No duplicate detection
- No CRM or dialer integration

---

## 🔮 Future Improvements

- CRM integrations (HubSpot / Salesforce)
- Duplicate detection layer
- Do Not Call (DNC) filtering
- International number support
- Dashboard UI inside Sheets
- Performance scaling for large datasets

---

## 📌 Version

Current Version: v2.7

Key highlights:
- Multi-column processing support
- Independent column routing architecture
- Enhanced reset safety system
- Improved error reporting consistency

---

## 👤 Author Notes

This project was built using an AI-assisted development workflow.

AI tools were used for:
- Code scaffolding
- Logic design and refinement
- Debugging support
- System expansion

Final architecture and decisions remain human-directed.

---

## 📌 Summary

Lead Router is a lightweight ETL automation system that converts raw lead data into structured, timezone-segmented calling lists entirely within Google Sheets, with full multi-column processing and scalable routing architecture.
