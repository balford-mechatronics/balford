import { cp, copyFile, mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(root, "apps", "chrome-extension");
const core = path.join(root, "packages", "stamp-calc", "src", "index.js");
const output = path.join(root, "dist", "balford-stamping-calculator");

await rm(output, { recursive: true, force: true });
await cp(source, output, {
  recursive: true,
  filter: (entry) =>
    !entry.endsWith("README.md") &&
    !entry.endsWith("STORE-LISTING.md") &&
    !entry.endsWith("store-preview.html"),
});
await mkdir(path.join(output, "lib"), { recursive: true });
await copyFile(core, path.join(output, "lib", "stamp-calc.js"));

console.log(`Built ${output}`);
