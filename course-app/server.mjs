import { createServer } from "node:http";
import { createReadStream, statSync, existsSync } from "node:fs";
import { extname, join, normalize, resolve } from "node:path";

const cwd = resolve(process.cwd());
const root = existsSync(join(cwd, "www")) ? join(cwd, "www") : cwd;
const port = Number(process.env.PORT || 4173);
const host = process.env.HOST || "0.0.0.0";

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".svg": "image/svg+xml; charset=utf-8",
  ".md": "text/markdown; charset=utf-8"
};

function resolvePath(url) {
  const decoded = decodeURIComponent(url.split("?")[0]);
  const safe = normalize(decoded).replace(/^(\.\.[/\\])+/, "");
  let filePath = resolve(join(root, safe));
  if (!filePath.startsWith(root)) return null;
  if (existsSync(filePath) && statSync(filePath).isDirectory()) {
    filePath = join(filePath, "index.html");
  }
  return filePath;
}

createServer((req, res) => {
  const filePath = resolvePath(req.url || "/");
  if (!filePath || !existsSync(filePath)) {
    res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    res.end("Not found");
    return;
  }

  const contentType = types[extname(filePath)] || "application/octet-stream";
  res.writeHead(200, {
    "content-type": contentType,
    "cache-control": "no-cache"
  });
  createReadStream(filePath).pipe(res);
}).listen(port, host, () => {
  console.log(`Course app server: http://${host}:${port}/`);
});
