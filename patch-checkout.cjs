const fs = require("fs");

const checkoutPath = "src/components/pages/Checkout.jsx";
const handlerPath = "checkout-handler.txt";

let source = fs.readFileSync(checkoutPath, "utf8").replace(/^\uFEFF/, "");
const handler = fs.readFileSync(handlerPath, "utf8")
  .replace(/^\uFEFF/, "")
  .trimEnd()
  .replace(/\r\n/g, "\n");

const startMarker = "const handlePlaceOrder = () => {";
const endMarker = "if (cartItems.length === 0)";

const start = source.indexOf(startMarker);
const end = source.indexOf(endMarker, start);

if (start === -1 || end === -1 || end <= start) {
  console.error("Patch stopped: expected handler boundaries not found.");
  process.exit(1);
}

const handlerEnd = source.lastIndexOf("};", end);
if (handlerEnd === -1 || handlerEnd < start) {
  console.error("Patch stopped: handler closing brace not found.");
  process.exit(1);
}

const afterHandler = handlerEnd + 2;
const nextSection = source.indexOf(endMarker, afterHandler);

if (nextSection === -1 || nextSection - afterHandler > 100) {
  console.error("Patch stopped: unexpected content after handler.");
  process.exit(1);
}

const lineStart = source.lastIndexOf("\n", nextSection) + 1;
const indent = source.slice(lineStart, nextSection);
if (!/^\s*$/.test(indent)) {
  console.error("Patch stopped: unexpected indentation before empty-cart check.");
  process.exit(1);
}

source =
  source.slice(0, start) +
  handler +
  "\n\n  " +
  source.slice(nextSection);

const importLine = 'import { createOrderRequest } from "../../api/orders";';
if (!source.includes(importLine)) {
  const reactImport = 'import { useState } from "react";';
  if (!source.includes(reactImport)) {
    console.error("Patch stopped: React import not found.");
    process.exit(1);
  }
  source = source.replace(reactImport, reactImport + "\n" + importLine);
}

fs.writeFileSync(checkoutPath, source, "utf8");
console.log("Checkout handler updated successfully.");
