import fs from "node:fs";
import path from "node:path";
import { PDFParse } from "pdf-parse";

const pdfDir = path.resolve("public/documents");
const outputFile = path.resolve("extracted-datasheets.txt");

const files = fs.readdirSync(pdfDir)
  .filter((name) => name.toLowerCase().endsWith(".pdf"))
  .sort();

if (files.length === 0) {
  console.log("No PDF files found in:", pdfDir);
  process.exit(1);
}

const output = [];

for (const file of files) {
  const filePath = path.join(pdfDir, file);
  console.log("Reading:", file);

  const parser = new PDFParse({
    data: new Uint8Array(fs.readFileSync(filePath)),
  });

  try {
    const result = await parser.getText();

    output.push(
      `\n${"=".repeat(90)}\nFILE: ${file}\n${"=".repeat(90)}\n`,
      result.text || "[No text extracted]"
    );
  } catch (error) {
    output.push(`\nFILE: ${file}\nERROR: ${error.message}\n`);
    console.error("Failed:", file, error.message);
  } finally {
    await parser.destroy();
  }
}

fs.writeFileSync(outputFile, output.join("\n"), "utf8");

console.log(`\nProcessed ${files.length} PDF files.`);
console.log("Saved extracted text to:", outputFile);
