# 📞 Lead Router

A Google Apps Script-based lead routing system that automatically **segregates spreadsheet-based lead lists into US & Canada time-zone-specific calling sheets using phone number area codes**.

---

## 🚀 Overview

Lead Router is designed for sales teams working with large volumes of **North American phone-based lead data stored in Google Sheets**.

### 🎯 Core Purpose

Transform a single raw spreadsheet into structured, time-zone-specific calling lists based on phone number area codes.

This enables faster, more organized outbound calling workflows without manual segmentation.

---

## ⚙️ What It Does

Lead Router converts unstructured lead data into structured outbound calling lists by:

- Cleaning and normalizing phone numbers into a dialer-friendly format  
- Extracting area codes from phone numbers  
- Mapping leads to North American time zones  
- Automatically splitting data into separate sheets per region  
- Isolating toll-free, invalid, and international numbers  

---

## 📊 Output Structure

The system generates the following sheets automatically:

- 🇺🇸 ET (Eastern Time)
- 🇺🇸 CT (Central Time)
- 🇺🇸 MT (Mountain Time)
- 🇺🇸 PT (Pacific Time)
- 🇺🇸 AK (Alaska)
- 🇺🇸 HI (Hawaii)
- ☎️ TOLL_FREE
- ❌ ERRORS

Each output sheet contains:

- Original lead data  
- Cleaned phone number  
- Extracted extension (if any)  
- Assigned time zone  

---

## 🧠 Key Features

### 📞 Phone Processing Engine

- Removes formatting noise (spaces, symbols, country codes)
- Extracts extensions (`ext`, `x`, `extension`)
- Normalizes numbers into 10-digit format

---

### 🧭 Rule-Based Area Code Routing

Lead Router uses a **hard-coded configuration-based mapping system** to assign phone numbers to time zones.

- Area codes are explicitly defined in the `TIMEZONE_CONFIG` object  
- Each time zone bucket contains predefined 3-digit area codes  
- Toll-free numbers are identified using static prefixes (800, 833, 844, 855, 866, 877, 888)

#### ⚙️ Routing Logic

- Extract first 3 digits (area code)
- Match against predefined arrays
- Assign corresponding time zone bucket

---

### 📊 Automated Sheet Generation

- Creates or refreshes output sheets dynamically
- Preserves structured outbound calling lists

---

### 🧾 Interactive Google Sheets UI

Custom menu:
Lead Router 2.5
 - Run Routing
 - Reset Output


- Phone column selection prompt
- Processing summary dashboard
- Safe reset confirmation

---

## 🔐 Data Security & Integrity

Lead Router is fully **non-destructive by design**.

- The original dataset remains fully intact in the `RAW_INPUT` sheet  
- The original dataset is also preserved in all output sheets  
- No source data is modified or deleted  
- The tool only appends computed routing fields  
- Existing business data, notes, and call logs remain untouched  

---

## 🛠️ Installation & Setup

### Step 1: Create a Google Sheet

Create a new spreadsheet.

---

### Step 2: Open Apps Script

Navigate to:
Extensions → Apps Script
---

### Step 3: Add Code

Copy and paste the contents of:
lead-router.gs

Save the project.

---

### Step 4: Authorize Script

Run `onOpen()` once and approve permissions.

---

### Step 5: Refresh Sheet

Reload spreadsheet to activate menu:
Lead Router 2.5


---

## ▶️ How to Use

### Step 1: Prepare Input Sheet

Create a sheet named:
RAW_INPUT

---

## 📊 Raw Input Sheet

![Raw Input Sheet](screenshots/01_raw_input.png)

---

### Step 2: Add Leads

Example:

| Company | Contact | Phone |
|--------|--------|------|
| ABC Inc | John Doe | (212) 555-1234 |

---

### Step 3: Run Routing

Select the correct phone column when prompted.

---

## 🧭 Lead Router Menu

![Lead Router Menu](screenshots/02_menu.png)

---

## 📞 Phone Column Selection

![Phone Column Selection](screenshots/03_phone_selection.png)

---

### Step 4: Processing Summary

The system displays a summary after execution.

---

## 📊 Processing Summary

![Processing Summary](screenshots/04_summary.png)

---

### Step 5: Review Output Sheets

---

## 📊 ET Output Sheet

![ET Output Sheet](screenshots/05_et_output.png)

---

## ❌ Error Sheet

![Error Sheet](screenshots/06_error_sheet.png)

---

## 🛠️ Customization

### ➕ Add Area Codes

Inside the script:

const TIMEZONE_CONFIG = {
  ET: { areaCodes: ["203", "207", "212"] }
};


📌 Version Control
const VERSION = "2.5";
Increment before saving changes.

🔄 Apply Changes: Save script -> Refresh Google Sheet -> Run updated routing

🧪 Engineering Approach
- Built using an iterative, test-driven workflow:
- Problem definition from real sales operations
- Spreadsheet-native system design
- Incremental Google Apps Script implementation
- Validation using synthetic datasets
- Edge-case testing and refinement

🤖 AI-Assisted Development Disclosure
This project was developed using an AI-assisted engineering workflow.

ChatGPT was used for:
- Code scaffolding and function design
- Logic optimization and routing/validation refactoring
- Error handling improvements in Google Apps Script
- Debugging and code standardization
- Accelerating MVP iteration cycles

Gemini was used for:
- Generating synthetic lead datasets for UAT and validation testing

All business requirements, system design decisions, validation logic, and final implementation ownership remain fully defined and controlled by the author.

📈 Why This Tool Exists
Sales teams continue to rely heavily on spreadsheets for managing leads.
Manual segmentation of large datasets into time-zone-specific calling lists is:
- Time-consuming
- Error-prone
- Operationally inefficient
- Lead Router automates this workflow entirely within Google Sheets.

📌 Tech Stack
- Google Apps Script
- JavaScript (ES5/ES6)
- Google Sheets API (native)
- Spreadsheet UI Service

🚀 Future Improvements
- CRM integrations (HubSpot / Salesforce)
- Duplicate detection system
- Do Not Call (DNC) filtering
- International number support
- Performance optimization for large datasets
- Dashboard UI inside Sheets

📄 License
This project is licensed under the MIT License.

🙏 Acknowledgements
Built with an AI-assisted development workflow using ChatGPT and Gemini to accelerate development, testing, and refinement.





