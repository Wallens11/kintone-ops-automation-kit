# CSV Cleanup Helper

A small Node.js script that cleans CSV files before import.

## Behavior

- trims whitespace around headers and values,
- normalizes blank-like values to empty strings,
- validates required columns,
- validates required values per row,
- writes a cleaned CSV file.

## Setup

```bash
npm install
```

No external dependencies are required.

## Usage

```bash
node clean-csv.js samples/input.csv output/cleaned.csv --required Name,Email
```

## Test With Sample

```bash
npm test
```

Expected output:

```text
Wrote 3 rows to output/cleaned.csv
```

## Notes

This is a simple helper for small CSV files. For production imports, confirm encoding, delimiter, date format, required columns, and duplicate rules with the actual client workflow.
