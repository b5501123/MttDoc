let manifest = [];
let filtered = [];
let currentIndex = 0;
let selectedCourse = localStorage.getItem("selectedCourseId") || "mtt-v2";
let fontScale = Number(localStorage.getItem("readerFontScale") || "1");

const indexPane = document.getElementById("indexPane");
const toggleIndex = document.getElementById("toggleIndex");
const chapterList = document.getElementById("chapterList");
const reader = document.getElementById("reader");
const searchInput = document.getElementById("searchInput");
const libraryStats = document.getElementById("libraryStats");
const prevDoc = document.getElementById("prevDoc");
const nextDoc = document.getElementById("nextDoc");
const fontMinus = document.getElementById("fontMinus");
const fontPlus = document.getElementById("fontPlus");
const screenTitle = document.getElementById("screenTitle");
const practiceList = document.getElementById("practiceList");
const courseTabs = document.getElementById("courseTabs");
const brandMark = document.getElementById("brandMark");
const routeList = document.getElementById("routeList");
const quickGrid = document.getElementById("quickGrid");
const reviewBoard = document.getElementById("reviewBoard");
const pathIntro = document.getElementById("pathIntro");
const quickIntro = document.getElementById("quickIntro");
const reviewIntro = document.getElementById("reviewIntro");

const sectionMap = {
  reader: document.getElementById("sectionReader"),
  path: document.getElementById("sectionPath"),
  quick: document.getElementById("sectionQuick"),
  practice: document.getElementById("sectionPractice"),
  review: document.getElementById("sectionReview")
};
const sectionTitles = {
  reader: "教材閱讀",
  path: "學習路線",
  quick: "速查表",
  practice: "練習題",
  review: "複盤"
};

const courseUi = {
  "mtt-v2": {
    mark: "MTT",
    title: "MTT v2 線上 BBA",
    search: "搜尋 RFI、BB defend、rejam、push/fold、ICM、PKO...",
    pathIntro: "先讀 Stack Mode，再進 RFI、BB 防守、Rejam、Push/Fold，最後補 ICM、PKO 與 postflop SPR。每個 preflop 章節都要回到範圍表。",
    quickIntro: "這裡放最常用的範圍表入口。範圍表是訓練 baseline，不是即時輔助工具。",
    reviewIntro: "複盤時先分類 spot，再對照範圍表。不要只看輸贏結果，要找 open 太寬、call-off 太寬、錯過 rejam 或 SPR 規劃錯誤。",
    routes: [
      ["00-課程索引", "1. 課程索引", "確認 v2 學習順序與使用方式。"],
      ["Stack Mode 決策地圖", "2. Stack Mode", "先學有效籌碼如何改變整套策略。"],
      ["25BB 壓力 RFI", "3. 25BB RFI", "把 open 分成 raise-call、raise-fold、mixed。"],
      ["BB 防守不是保護盲注", "4. BB 防守", "用價格、realization、rejam 建立防守框架。"],
      ["Rejam 三要素", "5. Rejam", "Fold equity、opener range、背後玩家。"],
      ["短碼不是等 AA", "6. Push/Fold", "12BB、10BB、8BB first-in 決策。"],
      ["ICM 先影響 Call-off", "7. ICM / PKO", "先收 call-off，再調整 open 與 bounty。"],
      ["課後 Review 流程", "8. 複盤流程", "把錯手回到 range 與 stack mode。"]
    ],
    quick: [
      ["mttv2-rfi-25bb-9max-btn", "25BB BTN RFI", "最常用後位 open 與 raise-call / raise-fold。"],
      ["mttv2-rfi-20bb-9max-co", "20BB CO RFI", "短中碼偷盲與被 rejam 前規劃。"],
      ["mttv2-bbdef-20bb-vs-btn", "20BB BB vs BTN", "BB 面對後位 open 的 call / rejam 分界。"],
      ["mttv2-rejam-20bb-vs-btn", "20BB Rejam vs BTN", "用 blocker 與 fold equity 懲罰偷盲。"],
      ["mttv2-pushfold-10bb-co", "10BB CO Push", "短碼 first-in shove baseline。"],
      ["mttv2-pushfold-8bb-sb", "8BB SB Push", "BBA 下最常見的 SB 短碼施壓。"]
    ],
    review: [
      ["1. Spot", "RFI / BB defend / Rejam / Push-Fold / Postflop / ICM / PKO。"],
      ["2. Stack", "Hero、Villain、effective stack、cover 關係。"],
      ["3. Range", "先找 baseline，再標出 R+、R、M、RF、RC、RJ、AI。"],
      ["4. Adjustment", "只調整邊界，不因單一結果重寫策略。"],
      ["Review流程", "打開 Review 流程", "用固定欄位把錯手轉成下一次行動。"]
    ]
  }
};

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function inlineMarkdown(value) {
  return escapeHtml(value)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>");
}

function tableToHtml(lines) {
  const rows = lines
    .filter((line) => !/^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(line))
    .map((line) => line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((cell) => inlineMarkdown(cell.trim())));

  if (!rows.length) return "";
  const [head, ...body] = rows;
  return `<div class="table-wrap"><table><thead><tr>${head.map((cell) => `<th>${cell}</th>`).join("")}</tr></thead><tbody>${body
    .map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`)
    .join("")}</tbody></table></div>`;
}

function markdownToHtml(markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const html = [];
  let list = [];
  let ordered = false;
  let code = [];
  let inCode = false;
  let table = [];

  function flushList() {
    if (!list.length) return;
    html.push(`<${ordered ? "ol" : "ul"}>${list.map((item) => `<li>${inlineMarkdown(item)}</li>`).join("")}</${ordered ? "ol" : "ul"}>`);
    list = [];
  }

  function flushCode() {
    if (!code.length) return;
    html.push(`<pre><code>${escapeHtml(code.join("\n"))}</code></pre>`);
    code = [];
  }

  function flushTable() {
    if (!table.length) return;
    html.push(tableToHtml(table));
    table = [];
  }

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();

    if (line.startsWith("```")) {
      flushList();
      flushTable();
      if (inCode) {
        inCode = false;
        flushCode();
      } else {
        inCode = true;
      }
      continue;
    }

    if (inCode) {
      code.push(rawLine);
      continue;
    }

    if (/^\|.+\|$/.test(line)) {
      flushList();
      table.push(line);
      continue;
    }
    flushTable();

    if (!line.trim()) {
      flushList();
      continue;
    }

    const heading = /^(#{1,6})\s+(.+)$/.exec(line);
    if (heading) {
      flushList();
      const level = Math.min(heading[1].length + 1, 6);
      html.push(`<h${level}>${inlineMarkdown(heading[2])}</h${level}>`);
      continue;
    }

    if (/^---+$/.test(line.trim())) {
      flushList();
      html.push("<hr />");
      continue;
    }

    const bullet = /^[-*]\s+(.+)$/.exec(line);
    if (bullet) {
      if (list.length && ordered) flushList();
      ordered = false;
      list.push(bullet[1]);
      continue;
    }

    const numbered = /^\d+\.\s+(.+)$/.exec(line);
    if (numbered) {
      if (list.length && !ordered) flushList();
      ordered = true;
      list.push(numbered[1]);
      continue;
    }

    flushList();
    html.push(`<p>${inlineMarkdown(line)}</p>`);
  }

  flushTable();
  flushList();
  flushCode();
  return html.join("\n");
}

function normalizeDoc(doc) {
  return {
    courseId: doc.courseId || "mtt-v2",
    courseTitle: doc.courseTitle || "MTT v2 線上 BBA",
    courseShortTitle: doc.courseShortTitle || "MTT v2",
    courseDescription: doc.courseDescription || "",
    contentType: doc.contentType || "lesson",
    title: doc.title,
    path: doc.path,
    url: doc.url,
    bytes: doc.bytes
  };
}

function courseConfig(courseId) {
  return courseUi[courseId] || {
    mark: "PK",
    title: "Poker Course",
    search: "搜尋教材...",
    pathIntro: "依照章節順序閱讀。",
    quickIntro: "常用章節入口。",
    reviewIntro: "用固定流程複盤。",
    routes: [],
    quick: [],
    review: []
  };
}

function availableCourses() {
  const map = new Map();
  for (const doc of manifest) {
    if (!map.has(doc.courseId)) {
      map.set(doc.courseId, {
        id: doc.courseId,
        title: doc.courseTitle,
        shortTitle: doc.courseShortTitle,
        description: doc.courseDescription
      });
    }
  }
  return [...map.values()];
}

function courseDocs(courseId = selectedCourse) {
  return manifest.filter((doc) => doc.courseId === courseId);
}

function groupName(doc) {
  const parts = doc.path.split("/");
  return parts.length > 1 ? parts[0] : "總覽";
}

function updateCourseChrome() {
  const config = courseConfig(selectedCourse);
  const count = courseDocs().length;
  const total = manifest.length;
  if (brandMark) brandMark.textContent = config.mark;
  searchInput.placeholder = config.search;
  libraryStats.textContent = `${count} 篇 ${config.title}，全庫 ${total} 篇離線內建`;
}

function renderCourseTabs() {
  if (!courseTabs) return;
  courseTabs.innerHTML = availableCourses()
    .map((course) => `<button class="course-tab ${course.id === selectedCourse ? "active" : ""}" data-course="${course.id}">
      <strong>${escapeHtml(course.shortTitle)}</strong>
      <span>${escapeHtml(String(courseDocs(course.id).length))}</span>
    </button>`)
    .join("");

  courseTabs.querySelectorAll("[data-course]").forEach((button) => {
    button.addEventListener("click", () => selectCourse(button.dataset.course));
  });
}

function bindOpenQuery(container) {
  container.querySelectorAll("[data-open-query]").forEach((button) => {
    button.addEventListener("click", () => openDocByQuery(button.dataset.openQuery));
  });
}

function renderCourseHubs() {
  const config = courseConfig(selectedCourse);
  if (pathIntro) pathIntro.textContent = config.pathIntro;
  if (quickIntro) quickIntro.textContent = config.quickIntro;
  if (reviewIntro) reviewIntro.textContent = config.reviewIntro;

  routeList.innerHTML = config.routes
    .map(([query, title, text]) => `<button class="route-card" data-open-query="${escapeHtml(query)}"><strong>${escapeHtml(title)}</strong><span>${escapeHtml(text)}</span></button>`)
    .join("");

  quickGrid.innerHTML = config.quick
    .map(([query, title, text]) => `<button class="quick-card" data-open-query="${escapeHtml(query)}"><strong>${escapeHtml(title)}</strong><span>${escapeHtml(text)}</span></button>`)
    .join("");

  reviewBoard.innerHTML = config.review
    .map(([query, title, text]) => {
      if (/\.md$/.test(query)) {
        return `<button class="route-card" data-open-query="${escapeHtml(query)}"><strong>${escapeHtml(title)}</strong><span>${escapeHtml(text)}</span></button>`;
      }
      return `<div><strong>${escapeHtml(query)}</strong><span>${escapeHtml(title)}</span></div>`;
    })
    .join("");

  bindOpenQuery(routeList);
  bindOpenQuery(quickGrid);
  bindOpenQuery(reviewBoard);
}

function renderList() {
  const groups = new Map();
  for (const doc of filtered) {
    const key = groupName(doc);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(doc);
  }

  if (!filtered.length) {
    chapterList.innerHTML = `<p class="empty-state">沒有符合搜尋的章節。</p>`;
    return;
  }

  chapterList.innerHTML = [...groups.entries()]
    .map(([group, docs]) => `
      <section class="chapter-group">
        <h2>${escapeHtml(group)}</h2>
        ${docs.map((doc) => {
          const absoluteIndex = manifest.indexOf(doc);
          return `<button class="chapter-btn ${absoluteIndex === currentIndex ? "active" : ""}" data-index="${absoluteIndex}">
            <span>${escapeHtml(doc.title)}</span>
            <small>${escapeHtml(doc.path)}</small>
          </button>`;
        }).join("")}
      </section>
    `)
    .join("");

  chapterList.querySelectorAll(".chapter-btn").forEach((button) => {
    button.addEventListener("click", () => loadDoc(Number(button.dataset.index)));
  });
}

function showSection(section) {
  for (const [key, element] of Object.entries(sectionMap)) {
    element.classList.toggle("active", key === section);
  }
  document.body.className = `section-${section}`;
  screenTitle.textContent = sectionTitles[section];
  document.querySelectorAll(".bottom-nav-btn").forEach((button) => {
    button.classList.toggle("active", button.dataset.section === section);
  });
  if (section !== "reader") indexPane.classList.remove("open");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openDocByQuery(query) {
  const normalized = query.toLowerCase();
  const sameCourse = manifest.findIndex((doc) => doc.courseId === selectedCourse && `${doc.title} ${doc.path}`.toLowerCase().includes(normalized));
  const index = sameCourse >= 0
    ? sameCourse
    : manifest.findIndex((doc) => `${doc.title} ${doc.path}`.toLowerCase().includes(normalized));
  if (index >= 0) {
    showSection("reader");
    loadDoc(index);
  }
}

async function loadDoc(index) {
  if (index < 0 || index >= manifest.length) return;
  currentIndex = index;
  const doc = manifest[currentIndex];
  if (doc.courseId !== selectedCourse) {
    selectedCourse = doc.courseId;
    localStorage.setItem("selectedCourseId", selectedCourse);
    applySearch();
  }
  localStorage.setItem("lastDocIndex", String(currentIndex));
  localStorage.setItem(`lastDocIndex:${selectedCourse}`, String(currentIndex));
  updateCourseChrome();
  renderCourseTabs();
  renderCourseHubs();
  renderPracticeList();
  renderList();

  reader.innerHTML = `<p>載入中...</p>`;
  const response = await fetch(doc.url);
  const content = await response.text();
  reader.classList.toggle("range-reader", doc.contentType === "range");
  reader.innerHTML = doc.contentType === "range" ? content : markdownToHtml(content);
  document.title = `${doc.title} - ${doc.courseShortTitle} 教材`;

  if (window.innerWidth <= 900) {
    indexPane.classList.remove("open");
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function applySearch() {
  const keyword = searchInput.value.trim().toLowerCase();
  const docs = courseDocs();
  filtered = keyword
    ? docs.filter((doc) => `${doc.title} ${doc.path}`.toLowerCase().includes(keyword))
    : docs.slice();
  renderList();
}

function applyFont() {
  reader.style.setProperty("--reader-scale", String(fontScale));
  localStorage.setItem("readerFontScale", String(fontScale));
}

function renderPracticeList() {
  const practiceDocs = courseDocs().filter((doc) => doc.contentType === "quiz" || doc.title.includes("練習題") || doc.path.includes("練習題") || doc.path.includes("quizzes"));
  if (!practiceDocs.length) {
    practiceList.innerHTML = `<p class="empty-state">這個課程目前沒有練習題。</p>`;
    return;
  }

  practiceList.innerHTML = practiceDocs
    .map((doc) => {
      const index = manifest.indexOf(doc);
      return `<button class="route-card" data-index="${index}">
        <strong>${escapeHtml(doc.title)}</strong>
        <span>${escapeHtml(doc.path)}</span>
      </button>`;
    })
    .join("");

  practiceList.querySelectorAll("[data-index]").forEach((button) => {
    button.addEventListener("click", () => {
      showSection("reader");
      loadDoc(Number(button.dataset.index));
    });
  });
}

function selectCourse(courseId) {
  if (courseId === selectedCourse) return;
  selectedCourse = courseId;
  localStorage.setItem("selectedCourseId", selectedCourse);
  searchInput.value = "";
  applySearch();
  updateCourseChrome();
  renderCourseTabs();
  renderCourseHubs();
  renderPracticeList();

  const saved = Number(localStorage.getItem(`lastDocIndex:${selectedCourse}`));
  const fallback = manifest.findIndex((doc) => doc.courseId === selectedCourse);
  const target = Number.isFinite(saved) && manifest[saved]?.courseId === selectedCourse ? saved : fallback;
  if (target >= 0) loadDoc(target);
}

async function init() {
  const response = await fetch("./content-manifest.json");
  manifest = (await response.json()).map(normalizeDoc);
  if (!courseDocs(selectedCourse).length) selectedCourse = manifest[0]?.courseId || "mtt-v2";

  const saved = Number(localStorage.getItem(`lastDocIndex:${selectedCourse}`));
  const legacy = Number(localStorage.getItem("lastDocIndex") || "0");
  const fallback = manifest.findIndex((doc) => doc.courseId === selectedCourse);
  const firstIndex = Number.isFinite(saved) && manifest[saved]?.courseId === selectedCourse
    ? saved
    : Number.isFinite(legacy) && manifest[legacy]?.courseId === selectedCourse
      ? legacy
      : fallback;

  filtered = courseDocs();
  updateCourseChrome();
  renderCourseTabs();
  renderCourseHubs();
  renderPracticeList();
  renderList();
  applyFont();
  loadDoc(firstIndex >= 0 ? firstIndex : 0);
}

toggleIndex.addEventListener("click", () => {
  indexPane.classList.toggle("open");
});

searchInput.addEventListener("input", applySearch);

prevDoc.addEventListener("click", () => {
  const docs = courseDocs();
  const coursePosition = docs.indexOf(manifest[currentIndex]);
  const previous = docs[Math.max(0, coursePosition - 1)];
  if (previous) loadDoc(manifest.indexOf(previous));
});
nextDoc.addEventListener("click", () => {
  const docs = courseDocs();
  const coursePosition = docs.indexOf(manifest[currentIndex]);
  const next = docs[Math.min(docs.length - 1, coursePosition + 1)];
  if (next) loadDoc(manifest.indexOf(next));
});
fontMinus.addEventListener("click", () => {
  fontScale = Math.max(0.86, Math.round((fontScale - 0.08) * 100) / 100);
  applyFont();
});
fontPlus.addEventListener("click", () => {
  fontScale = Math.min(1.34, Math.round((fontScale + 0.08) * 100) / 100);
  applyFont();
});

document.querySelectorAll(".bottom-nav-btn").forEach((button) => {
  button.addEventListener("click", () => showSection(button.dataset.section));
});

init().catch((error) => {
  reader.innerHTML = `<h2>教材載入失敗</h2><pre>${escapeHtml(String(error))}</pre>`;
});
