import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { basename, dirname, join, relative } from "node:path";

const root = process.cwd();
const out = join(root, "www");
const ranks = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"];
const course = {
  id: "mtt-v2",
  title: "MTT v2 線上 BBA",
  shortTitle: "MTT v2",
  description: "線上 MTT、Big Blind Ante、有效籌碼、RFI、BB 防守、Rejam、Push/Fold、ICM、PKO 與 postflop SPR。",
  docsRoot: join(root, "..", "mtt-v2"),
  contentDir: "mtt-v2"
};
const appFiles = [
  "index.html",
  "styles.css",
  "app.js",
  "manifest.webmanifest",
  "sw.js",
  "icon.svg"
];

function walkFiles(dir, predicate) {
  const entries = readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkFiles(full, predicate));
    } else if (entry.isFile() && predicate(full)) {
      files.push(full);
    }
  }
  return files;
}

function titleFromMarkdown(file) {
  const text = readFileSync(file, "utf8");
  const firstHeading = text.split(/\r?\n/).find((line) => line.startsWith("# "));
  return firstHeading ? firstHeading.replace(/^#\s+/, "").trim() : basename(file, ".md");
}

function ensureDir(file) {
  mkdirSync(dirname(file), { recursive: true });
}

function toUrlPath(path) {
  return path.split(/[\\/]/).map(encodeURIComponent).join("/");
}

function sortZh(a, b) {
  return a.localeCompare(b, "zh-Hant", { numeric: true });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function handAt(rowIndex, colIndex) {
  const row = ranks[rowIndex];
  const col = ranks[colIndex];
  if (row === col) return `${row}${row}`;
  const high = ranks[Math.min(rowIndex, colIndex)];
  const low = ranks[Math.max(rowIndex, colIndex)];
  const suffix = rowIndex < colIndex ? "s" : "o";
  return `${high}${low}${suffix}`;
}

function labelClass(label) {
  return `label-${String(label).toLowerCase().replace("+", "p").replace(/[^a-z0-9]+/g, "-")}`;
}

function renderRangeHtml(range) {
  const cells = ranks.map((_, rowIndex) => {
    const tds = ranks.map((__, colIndex) => {
      const hand = handAt(rowIndex, colIndex);
      const label = range.hands[hand] || "F";
      return `<td class="range-cell ${labelClass(label)}"><span class="hand">${escapeHtml(hand)}</span><span class="tag">${escapeHtml(label)}</span></td>`;
    }).join("");
    return `<tr><th>${escapeHtml(ranks[rowIndex])}</th>${tds}</tr>`;
  }).join("");

  const header = `<tr><th></th>${ranks.map((rank) => `<th>${escapeHtml(rank)}</th>`).join("")}</tr>`;
  const legend = Object.entries(range.legend || {})
    .map(([label, text]) => `<div class="legend-item ${labelClass(label)}"><strong>${escapeHtml(label)}</strong><span>${escapeHtml(text)}</span></div>`)
    .join("");
  const notes = (range.notes || []).map((note) => `<li>${escapeHtml(note)}</li>`).join("");
  const boundary = (range.boundary || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("");

  return `<section class="range-page">
  <header class="range-header">
    <p class="range-eyebrow">13x13 Range Table</p>
    <h2>${escapeHtml(range.title)}</h2>
    <div class="range-meta">
      <span><strong>Game</strong>${escapeHtml(range.game)}</span>
      <span><strong>Spot</strong>${escapeHtml(range.spot)}</span>
      <span><strong>Stack</strong>${escapeHtml(range.stackBb)}BB</span>
      <span><strong>Hero</strong>${escapeHtml(range.position)}</span>
      ${range.villainPosition ? `<span><strong>Villain</strong>${escapeHtml(range.villainPosition)}</span>` : ""}
      <span><strong>Open</strong>${escapeHtml(range.openSize || "")}</span>
    </div>
  </header>

  <div class="range-grid-wrap">
    <table class="range-grid" aria-label="${escapeHtml(range.title)}">
      <thead>${header}</thead>
      <tbody>${cells}</tbody>
    </table>
  </div>

  <section class="range-legend">
    ${legend}
  </section>

  <section class="range-notes">
    <h3>使用規則</h3>
    <ul>${notes}</ul>
    <h3>邊界手牌</h3>
    <ul>${boundary}</ul>
  </section>
</section>`;
}

function markdownManifestEntry(file, sourceRoot, prefix, contentType) {
  const rel = relative(sourceRoot, file).replaceAll("\\", "/");
  const targetRel = `${prefix}/${rel}`;
  const target = join(out, "content", course.contentDir, targetRel);
  ensureDir(target);
  copyFileSync(file, target);
  return {
    courseId: course.id,
    courseTitle: course.title,
    courseShortTitle: course.shortTitle,
    courseDescription: course.description,
    contentType,
    title: titleFromMarkdown(file),
    path: targetRel,
    url: `./content/${course.contentDir}/${toUrlPath(targetRel)}`,
    bytes: statSync(file).size
  };
}

function rangeManifestEntry(file, sourceRoot) {
  const range = JSON.parse(readFileSync(file, "utf8"));
  const rel = relative(sourceRoot, file).replaceAll("\\", "/").replace(/\.json$/i, ".html");
  const targetRel = `ranges/${rel}`;
  const target = join(out, "content", course.contentDir, targetRel);
  const html = renderRangeHtml(range);
  ensureDir(target);
  writeFileSync(target, html, "utf8");
  return {
    courseId: course.id,
    courseTitle: course.title,
    courseShortTitle: course.shortTitle,
    courseDescription: course.description,
    contentType: "range",
    title: range.title,
    path: targetRel,
    url: `./content/${course.contentDir}/${toUrlPath(targetRel)}`,
    bytes: Buffer.byteLength(html, "utf8")
  };
}

if (existsSync(out)) {
  rmSync(out, { recursive: true, force: true });
}
mkdirSync(out, { recursive: true });

for (const file of appFiles) {
  copyFileSync(join(root, file), join(out, file));
}

const lessonsRoot = join(course.docsRoot, "lessons");
const rangesRoot = join(course.docsRoot, "ranges");
const quizzesRoot = join(course.docsRoot, "quizzes");
const lessons = walkFiles(lessonsRoot, (file) => file.toLowerCase().endsWith(".md"))
  .sort(sortZh)
  .map((file) => markdownManifestEntry(file, lessonsRoot, "lessons", "lesson"));
const ranges = walkFiles(rangesRoot, (file) => file.toLowerCase().endsWith(".json"))
  .sort(sortZh)
  .map((file) => rangeManifestEntry(file, rangesRoot));
const quizzes = walkFiles(quizzesRoot, (file) => file.toLowerCase().endsWith(".md"))
  .sort(sortZh)
  .map((file) => markdownManifestEntry(file, quizzesRoot, "quizzes", "quiz"));
const manifest = [...lessons, ...ranges, ...quizzes];

copyFileSync(join(root, "manifest.webmanifest"), join(out, "manifest.webmanifest"));
writeFileSync(join(out, "content-manifest.json"), JSON.stringify(manifest, null, 2), "utf8");

console.log(`Built MTT v2 app assets into ${out}: ${lessons.length} lessons, ${ranges.length} ranges, ${quizzes.length} quizzes, ${manifest.length} total entries.`);
