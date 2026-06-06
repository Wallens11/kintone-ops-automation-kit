import fs from "node:fs";
import path from "node:path";

function parseArgs(argv) {
  const [inputPath, outputPath, ...rest] = argv;

  if (!inputPath || !outputPath) {
    throw new Error("Usage: node clean-csv.js <input.csv> <output.csv> --required Name,Email");
  }

  const requiredIndex = rest.indexOf("--required");
  const requiredColumns = requiredIndex >= 0 && rest[requiredIndex + 1]
    ? rest[requiredIndex + 1].split(",").map((value) => value.trim()).filter(Boolean)
    : [];

  return { inputPath, outputPath, requiredColumns };
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let value = "";
  let inQuotes = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const nextChar = text[index + 1];

    if (char === '"' && inQuotes && nextChar === '"') {
      value += '"';
      index += 1;
      continue;
    }

    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === "," && !inQuotes) {
      row.push(value);
      value = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && nextChar === "\n") {
        index += 1;
      }

      row.push(value);
      rows.push(row);
      row = [];
      value = "";
      continue;
    }

    value += char;
  }

  if (value.length > 0 || row.length > 0) {
    row.push(value);
    rows.push(row);
  }

  return rows.filter((currentRow) => currentRow.some((cell) => cell.trim() !== ""));
}

function normalizeValue(value) {
  const trimmed = String(value || "").trim();
  const lower = trimmed.toLowerCase();

  if (lower === "n/a" || lower === "null" || lower === "undefined" || lower === "-") {
    return "";
  }

  return trimmed;
}

function escapeCsvValue(value) {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replaceAll('"', '""')}"`;
  }

  return value;
}

function toCsv(rows) {
  return `${rows.map((row) => row.map(escapeCsvValue).join(",")).join("\n")}\n`;
}

function validateColumns(headers, requiredColumns) {
  const missingColumns = requiredColumns.filter((column) => !headers.includes(column));

  if (missingColumns.length > 0) {
    throw new Error(`Missing required columns: ${missingColumns.join(", ")}`);
  }
}

function validateRequiredValues(headers, rows, requiredColumns) {
  const indexes = requiredColumns.map((column) => ({
    column,
    index: headers.indexOf(column)
  }));

  const errors = [];

  rows.forEach((row, rowIndex) => {
    indexes.forEach(({ column, index }) => {
      if (!row[index]) {
        errors.push(`Row ${rowIndex + 2}: ${column} is required`);
      }
    });
  });

  if (errors.length > 0) {
    throw new Error(errors.join("\n"));
  }
}

function cleanCsv(inputPath, outputPath, requiredColumns) {
  const raw = fs.readFileSync(inputPath, "utf8");
  const parsedRows = parseCsv(raw);

  if (parsedRows.length === 0) {
    throw new Error("CSV is empty.");
  }

  const [rawHeaders, ...rawDataRows] = parsedRows;
  const headers = rawHeaders.map(normalizeValue);
  const dataRows = rawDataRows.map((row) => headers.map((_, index) => normalizeValue(row[index])));

  validateColumns(headers, requiredColumns);
  validateRequiredValues(headers, dataRows, requiredColumns);

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, toCsv([headers, ...dataRows]));

  return dataRows.length;
}

try {
  const { inputPath, outputPath, requiredColumns } = parseArgs(process.argv.slice(2));
  const rowCount = cleanCsv(inputPath, outputPath, requiredColumns);
  console.log(`Wrote ${rowCount} rows to ${outputPath}`);
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
