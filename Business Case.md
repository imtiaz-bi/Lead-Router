## Business Case (PDF)

The full business case document is available at this link: 📄 [View Document](https://drive.google.com/file/d/10Q8O5a6zyl39QyHVwtGPIxPmHH7fwPuP/view?usp=sharing)

**The Business Problem: Inside Sales Workflow**

You're an inside sales rep working in the United States or Canada.
It's Monday morning. Your manager has just assigned you a CSV file containing 1,000 fresh leads from across the US and Canada (probably pulled from a B2B database) and asks you to call all of them by the end of the week. That's not a problem for you.

After all, you're one of the team's top performers. You enjoy cold calling, and your company uses an auto-dialer that can place calls far faster than anyone manually could. Upload a CSV with phone numbers, launch a campaign, and start talking to prospects. Your week ahead is looking bright. 
You open the CSV file and immediately spot a problem.

Each lead contains up to three phone numbers:
- Direct Number
- Mobile Number
- HQ Number

The phone numbers come from all over the United States and Canada. Some are formatted correctly. Others are not.

You begin seeing entries like:
- (212) 555-1234
- +1 416 555 1000
- 604.555.2000
- 212-555-1234 ext 101
- 12028886589
- 212 666 8856 x 225
- N/A
- [Blank]

For real, the list contains a mix of:
- US and Canadian numbers from all time zones
- Toll-free numbers
- International numbers
- Blank phone fields
- Invalid entries
- Numbers with extensions
- Multiple phone number formats

Then it hits you. You can't simply upload this file into your auto-dialer.

To avoid calling prospects at inappropriate hours, you first need to separate the phone numbers by time zone. You also need to:
- Remove invalid numbers
- Exclude international numbers
- Normalize phone numbers into a clean 10-digit format
- Identify and separate toll-free numbers
- Extract phone extensions and list them separately
- Flag problematic records for review

So that you can finally end up with phone numbers grouped into buckets like this: 

EST | CST | MST | PST | Alaska | Hawaii | Toll Free | Errors

And because each lead may have Direct, Mobile, and HQ phone numbers, you must perform this process for every phone field you plan to call.

The only way to do this manually is to look up each phone number's area code, determine its time zone, move the record into the appropriate bucket, and reformat the phone number into a clean, dialer-friendly 10-digit format.
Now imagine your file contains 1,000 leads with roughly 2,000 phone numbers across all phone fields.

You decide to use a phone area-code lookup website to find the time zone for each number, one by one. If each lookup, validation, copy-paste, and formatting operation takes just 30 to 40 seconds, you're looking at anywhere from 12 to 22 hours of manual work before you can even begin making calls.
That's nearly three full workdays spent preparing data instead of calling prospects.

There had to be a better way.

**The Solution**

Lead Router was built to eliminate this manual process.

This lightweight Google Apps Script works with Google Sheets to:
- Automatically analyze a lead list and identify phone number fields
- Clean and standardize phone numbers
- Extract extensions
- Validate entries
- Map area codes to their corresponding North American time zones
- Route records into separate worksheets
- List toll-free numbers separately
- List invalid, blank, and international numbers separately
- Preserve your original data without modifying, deleting, or overwriting it
- Process thousands of phone numbers and route them into time-zone-specific worksheets in seconds, what could take an SDR days of manual work 

Instead of spending hours manually researching area codes and reorganizing spreadsheets, sales teams can transform a raw lead file into clean, dialer-ready, time-zone-specific calling queues in minutes.
The result is less administrative work, faster campaign launches, improved productivity, and more time spent doing what sales professionals do best - connecting with prospects.

**Impressive Speed**

The Lead Router delivers exceptional speed in processing data!

In testing, Lead Router **processed phone numbers in 11,000+ rows in just 25 seconds**. Whether you're routing 500 phone numbers or 10,000+, **results arrive in seconds- not minutes or hours**.
This level of performance makes Lead Router a fit for any team - from small sales teams to enterprise-scale operations handling high-volume lead data. 

**Why It Runs So Fast**

Lead Router is optimized for large lead lists within Google Apps Script execution limits by using a batch-processing architecture instead of cell-by-cell operations.
It follows a simple** read → process → write** model:

**Read Once**
The entire dataset is loaded into memory in a single operation, avoiding repeated spreadsheet access.

**Process In Memory**
All operations - phone normalization, validation, extension extraction, area-code detection, and time-zone routing - are handled in memory using JavaScript arrays and lightweight string operations. No external APIs or services are used.

**Write Once**
Processed results are written back to Google Sheets in bulk, minimizing slow spreadsheet write operations.
Lightweight Routing Engine

The system uses:
- Hard-coded, rule-based phone area-code mapping
- Regular expressions for phone normalization
- In-memory lookup tables
- Array-based routing logic
- Bulk sheet writes

This architecture minimizes spreadsheet I/O overhead, allowing thousands of records to be processed quickly and efficiently.

**Data Security and Privacy**

Your lead data stays completely inside Google Sheets. No external apps, no API calls, no AI agents, and no data sharing with external tools are involved - the entire process runs securely within Google Apps Script.
Lead Router operates as a read-only ingestion layer over your source data. It uses non-destructive processing, ensuring that original inputs are never altered or overwritten.

The RAW_INPUT worksheet remains untouched throughout processing, while all routed records are written to separate output worksheets.
This design ensures the original dataset is always preserved, allowing users to safely reprocess, audit, or reuse the data at any time without risk of modification or loss.


**It's a Free Tool**

Lead Router is a Google Apps Script-based tool that is free to use. It simply needed someone to build it.
This makes it especially valuable for sales teams looking to reduce operational costs.
