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

const actionPalette = {
  Allin: "#7f2a25",
  Raise: "#d84b43",
  "3Bet": "#b65fcf",
  Call: "#4f8fc8",
  Fold: "#75ad68"
};
const actionOrder = ["Allin", "Raise", "3Bet", "Call", "Fold"];

function handCombos(hand) {
  if (hand[0] === hand[1]) return 6;
  return hand.endsWith("s") ? 4 : 12;
}

function strategyForLabel(label, spot) {
  const s = String(spot || "").toLowerCase();
  if (label === "AI" || label === "RJ") return [{ action: "Allin", pct: 100 }];
  if (label === "3B") return [{ action: "3Bet", pct: 100 }];
  if (label === "C") return [{ action: "Call", pct: 100 }];
  if (label === "R+" || label === "R" || label === "RC" || label === "RF") return [{ action: "Raise", pct: 100 }];
  if (label === "M") {
    if (s.includes("push") || s.includes("rejam")) return [{ action: "Allin", pct: 50 }, { action: "Fold", pct: 50 }];
    if (s.includes("bb defend")) return [{ action: "Call", pct: 50 }, { action: "Fold", pct: 50 }];
    return [{ action: "Raise", pct: 50 }, { action: "Fold", pct: 50 }];
  }
  return [{ action: "Fold", pct: 100 }];
}

function cellGradient(actions) {
  let start = 0;
  const stops = actions.map((item) => {
    const end = start + item.pct;
    const color = actionPalette[item.action] || actionPalette.Fold;
    const stop = `${color} ${start}% ${end}%`;
    start = end;
    return stop;
  });
  return `background: linear-gradient(90deg, ${stops.join(", ")});`;
}

function strategyGroups(range) {
  const groups = Object.fromEntries(actionOrder.map((action) => [action, []]));
  for (let rowIndex = 0; rowIndex < ranks.length; rowIndex += 1) {
    for (let colIndex = 0; colIndex < ranks.length; colIndex += 1) {
      const hand = handAt(rowIndex, colIndex);
      const label = range.hands[hand] || "F";
      for (const item of strategyForLabel(label, range.spot)) {
        if (item.pct <= 0) continue;
        groups[item.action].push({ hand, label, pct: item.pct });
      }
    }
  }
  return groups;
}

function renderStrategyGroups(range) {
  const groups = strategyGroups(range);
  return actionOrder
    .filter((action) => groups[action].length)
    .map((action) => {
      const hands = groups[action]
        .map((item) => `<span class="strategy-hand" title="${escapeHtml(item.label)}">
          <strong>${escapeHtml(item.hand)}</strong>
          ${item.pct < 100 ? `<small>${item.pct}%</small>` : ""}
        </span>`)
        .join("");
      return `<section class="strategy-group action-${action.toLowerCase()}">
        <h3><i style="background:${actionPalette[action]};"></i>${escapeHtml(action)}</h3>
        <div class="strategy-hand-list">${hands}</div>
      </section>`;
    })
    .join("");
}

function renderRangeHtml(range) {
  const strategyList = renderStrategyGroups(range);
  const cells = ranks.map((_, rowIndex) => {
    const tds = ranks.map((__, colIndex) => {
      const hand = handAt(rowIndex, colIndex);
      const label = range.hands[hand] || "F";
      const actions = strategyForLabel(label, range.spot);
      const combos = handCombos(hand);
      return `<td class="range-cell ${labelClass(label)} ${label === "F" ? "is-fold" : ""}" style="${cellGradient(actions)}" data-hand="${escapeHtml(hand)}" data-label="${escapeHtml(label)}" data-combos="${combos}" data-actions="${escapeHtml(JSON.stringify(actions))}" title="${escapeHtml(`${hand} ${label}`)}">
        <span class="hand">${escapeHtml(hand)}</span>
      </td>`;
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
    <p class="range-eyebrow">13x13 Strategy Matrix</p>
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

  <section class="range-matrix-panel">
    <div class="range-toolbar">
      <strong>範圍</strong>
      <span>每格用色塊比例顯示行動頻率，紅色代表進攻，綠色代表棄牌或保守線。</span>
    </div>
    <div class="range-action-legend">
      ${Object.entries(actionPalette).map(([action, color]) => `<span><i style="background:${color};"></i>${escapeHtml(action)}</span>`).join("")}
    </div>
    <div class="range-grid-wrap">
      <table class="range-grid" aria-label="${escapeHtml(range.title)}">
        <thead>${header}</thead>
        <tbody>${cells}</tbody>
      </table>
    </div>
  </section>

  <section class="range-strategy-list">
    <div class="range-section-title">
      <h3>策略手牌清單</h3>
      <p>主表只顯示牌型；完整行動分組放在這裡，mixed hand 會同時出現在兩個行動中並標出比例。</p>
    </div>
    ${strategyList}
  </section>

  <div class="range-info-grid">
    <section class="range-legend">
      <h3>標籤</h3>
      ${legend}
    </section>

    <section class="range-notes">
      <h3>使用規則</h3>
      <ul>${notes}</ul>
      <h3>邊界手牌</h3>
      <ul>${boundary}</ul>
    </section>
  </div>
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
