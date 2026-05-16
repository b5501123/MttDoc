import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync } from "node:fs";
import { basename, dirname, join, relative } from "node:path";

const root = process.cwd();
const out = join(root, "www");
const courses = [
  {
    id: "mtt",
    title: "MTT 線上 BBA",
    shortTitle: "MTT",
    description: "線上 MTT、Big Blind Ante、短碼、ICM、PKO 與決賽桌。",
    docsRoot: join(root, "..", "mtt"),
    contentDir: "mtt",
    exclude: new Set()
  },
  {
    id: "cash-game",
    title: "NLH Cash Game",
    shortTitle: "Cash",
    description: "線上 6-max 100BB、rake、preflop、SRP、3bet pot、exploit 與複盤。",
    docsRoot: join(root, "..", "cash-game"),
    contentDir: "cash-game",
    exclude: new Set(["00-教材規劃.md"])
  }
];
const appFiles = [
  "index.html",
  "styles.css",
  "app.js",
  "manifest.webmanifest",
  "sw.js",
  "icon.svg"
];

function walk(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(full));
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".md")) {
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

if (existsSync(out)) {
  rmSync(out, { recursive: true, force: true });
}
mkdirSync(out, { recursive: true });

for (const file of appFiles) {
  copyFileSync(join(root, file), join(out, file));
}

const manifest = courses.flatMap((course) => {
  const contentOut = join(out, "content", course.contentDir);
  const docs = walk(course.docsRoot)
    .filter((file) => !course.exclude.has(relative(course.docsRoot, file).replaceAll("\\", "/")))
    .sort((a, b) => a.localeCompare(b, "zh-Hant", { numeric: true }));

  return docs.map((file) => {
    const rel = relative(course.docsRoot, file);
    const target = join(contentOut, rel);
    ensureDir(target);
    copyFileSync(file, target);
    const normalized = rel.replaceAll("\\", "/");
    return {
      courseId: course.id,
      courseTitle: course.title,
      courseShortTitle: course.shortTitle,
      courseDescription: course.description,
      title: titleFromMarkdown(file),
      path: normalized,
      url: `./content/${course.contentDir}/${toUrlPath(normalized)}`,
      bytes: statSync(file).size
    };
  });
});

copyFileSync(join(root, "manifest.webmanifest"), join(out, "manifest.webmanifest"));
ensureDir(join(out, "content-manifest.json"));
await import("node:fs").then(({ writeFileSync }) => {
  writeFileSync(join(out, "content-manifest.json"), JSON.stringify(manifest, null, 2), "utf8");
});

const summary = courses
  .map((course) => `${course.shortTitle}: ${manifest.filter((doc) => doc.courseId === course.id).length}`)
  .join(", ");
console.log(`Built app assets and ${manifest.length} markdown documents into ${out} (${summary})`);
