import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { mkdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const chromeCandidates = [
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
];

const mime = new Map([
  [".html", "text/html; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".png", "image/png"],
]);

const server = createServer(async (request, response) => {
  try {
    const requestPath = decodeURIComponent(new URL(request.url, "http://127.0.0.1").pathname);
    const file = path.resolve(root, `.${requestPath}`);
    if (!file.startsWith(root)) throw new Error("Path outside workspace");
    const info = await stat(file);
    if (!info.isFile()) throw new Error("Not a file");
    response.writeHead(200, {
      "content-type": mime.get(path.extname(file)) || "application/octet-stream",
      "cache-control": "no-store",
    });
    response.end(await readFile(file));
  } catch {
    response.writeHead(404);
    response.end("Not found");
  }
});

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const { port } = server.address();
const outputDir = path.join(root, "store-assets");
await mkdir(outputDir, { recursive: true });
const output = path.join(outputDir, "screenshot-1280x800.png");

let chrome = null;
for (const candidate of chromeCandidates) {
  try {
    if ((await stat(candidate)).isFile()) {
      chrome = candidate;
      break;
    }
  } catch {
    // Try the next installation path.
  }
}
if (!chrome) throw new Error("Google Chrome was not found");

await new Promise((resolve, reject) => {
  const child = spawn(
    chrome,
    [
      "--headless=new",
      "--disable-gpu",
      "--hide-scrollbars",
      "--window-size=1280,800",
      `--screenshot=${output}`,
      `http://127.0.0.1:${port}/apps/chrome-extension/store-preview.html`,
    ],
    { stdio: "ignore" }
  );
  child.on("error", reject);
  child.on("exit", (code) => {
    if (code === 0) resolve();
    else reject(new Error(`Chrome exited with code ${code}`));
  });
});

server.close();
console.log(`Wrote ${output}`);
