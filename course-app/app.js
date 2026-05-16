let manifest = [];
let filtered = [];
let currentIndex = 0;
let selectedCourse = localStorage.getItem("selectedCourseId") || "mtt";
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
  mtt: {
    mark: "MTT",
    title: "MTT 線上 BBA",
    search: "搜尋 MTT、BBA、PKO、ICM、短碼...",
    pathIntro: "用「先概念、再範圍、再情境、最後複盤」的順序讀。手機上不要一次讀完，照階段切。",
    quickIntro: "比賽中或賽前快速看。這裡只放最常用入口，不取代完整教材。",
    reviewIntro: "複盤不是記結果，是找錯誤類型。每手牌先判斷 effective stack，再判斷位置、賞金、ICM。",
    routes: [
      ["01-MTT基礎/01-籌碼EV與ICM.md", "1. 核心框架", "Chip EV、ICM、位置、BBA。"],
      ["02-推注棄牌/03-各位置推注範圍圖表.md", "2. 短疊決策", "10BB push/fold、Nash、call range。"],
      ["03-深疊翻牌前/01-開牌範圍.md", "3. Open 與 3-bet", "RFI、3-bet、偷盲與反偷。"],
      ["07-PKO賞金賽/03-短馬NB10BB閃電賞金賽.md", "4. 短馬 NB 專題", "6-max BBA、25% 賞金池、limp 對策。"],
      ["10-自我評估與練習/00-練習題目錄.md", "5. 題庫與複盤", "做題、標 leak、回到教材修正。"]
    ],
    quick: [
      ["Antes與BBA結構", "BBA 底池", "前注預設、底池賠率、偷盲價值。"],
      ["各位置推注範圍圖表", "10BB Push", "各位置 shove range 與邊界手。"],
      ["短馬NB10BB", "短馬 NB", "20-30BB open、3-bet shove、limp。"],
      ["Bubble打法", "Bubble", "大疊施壓、中疊保護、短疊找點。"],
      ["決賽桌ICM", "FT ICM", "決賽桌 pay jump 與 call off。"],
      ["心理與心態", "心態", "方差、賽前準備、複盤習慣。"]
    ],
    review: [
      ["1. 場景", "階段、人數、ITM、盲注、BBA。"],
      ["2. Stack", "Hero / Villain / effective stack / 是否 cover。"],
      ["3. 決策", "push、open、3-bet、call、fold。"],
      ["4. Leak", "over-chase-bounty、wrong-stack-mode、under-defend-bb。"],
      ["03-複盤方法論.md", "打開複盤方法論", "完整複盤流程與錯誤分類。"]
    ]
  },
  "cash-game": {
    mark: "CG",
    title: "NLH Cash Game",
    search: "搜尋 Cash、rake、3bet pot、BB defend、river...",
    pathIntro: "以線上 6-max 100BB 為主線，先建立 preflop 和 SRP，再進 3bet pot、rake exploit 與複盤。",
    quickIntro: "現金桌速查以位置、rake、pot type、SPR 和對手類型為核心，先判斷場景再選策略。",
    reviewIntro: "Cash 複盤看的是長期 bb/100 漏水點。每手牌先標位置、pot type、effective stack、rake 與玩家類型。",
    routes: [
      ["00-目錄與學習路線/00-課程索引.md", "1. 課程索引", "確認 cash game 學習順序與預設場景。"],
      ["01-Cash-Game基礎/03-Rake如何改變策略.md", "2. Rake 意識", "低 stakes 最先修正 cold call 與盲位漏水。"],
      ["02-Preflop核心框架/01-6max位置與OpenRange.md", "3. Preflop 核心", "6-max open、call、3bet、4bet 和 blind defense。"],
      ["03-Single-Raised-Pot/01-BTNvsBB模型.md", "4. SRP 主線", "BTN vs BB、牌面紋理、turn barrel、river value。"],
      ["04-3bet-Pot/01-IP3betPot.md", "5. 3bet Pot", "IP / OOP 3bet pot、SPR、check range 與 exploit。"],
      ["12-練習與複盤/00-練習題目錄.md", "6. 題庫", "100 題 cash game 決策題。"]
    ],
    quick: [
      ["Rake如何改變策略", "Rake", "高 rake 下少 cold call，多 3bet / fold。"],
      ["6max位置與OpenRange", "6-max Open", "UTG 收緊，BTN 攻擊，SB 謹慎。"],
      ["SB與BB防守邏輯", "盲位", "SB 控制虧損，BB 看 realization。"],
      ["BTNvsBB模型", "BTN vs BB", "最常見 SRP 模型。"],
      ["OOP3betPot", "OOP 3bet", "需要 check range，不是全 range c-bet。"],
      ["Under-bluff", "River Fold", "對 under-bluff pool 大幅 overfold。"]
    ],
    review: [
      ["1. 位置", "UTG / HJ / CO / BTN / SB / BB。"],
      ["2. Pot Type", "SRP、3bet pot、4bet pot、multiway。"],
      ["3. Stack", "50BB、100BB、150BB+、短碼玩家。"],
      ["4. Leak", "cold-call-too-wide、river-hero-call、miss-thin-value。"],
      ["SessionReview模板.md", "打開 Session Review 模板", "用固定欄位複盤五手牌。"]
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
    courseId: doc.courseId || "mtt",
    courseTitle: doc.courseTitle || "MTT 線上 BBA",
    courseShortTitle: doc.courseShortTitle || "MTT",
    courseDescription: doc.courseDescription || "",
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
  const markdown = await response.text();
  reader.innerHTML = markdownToHtml(markdown);
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
  const practiceDocs = courseDocs().filter((doc) => doc.title.includes("練習題") || doc.path.includes("練習題"));
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
  if (!courseDocs(selectedCourse).length) selectedCourse = manifest[0]?.courseId || "mtt";

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
