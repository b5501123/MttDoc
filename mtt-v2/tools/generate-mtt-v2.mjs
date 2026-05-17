import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const ranks = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"];
const positions = ["UTG", "LJ", "HJ", "CO", "BTN", "SB"];
const stacks = [60, 40, 30, 25, 20, 15];

function resetDir(dir) {
  rmSync(join(root, dir), { recursive: true, force: true });
  mkdirSync(join(root, dir), { recursive: true });
}

function write(rel, content) {
  const file = join(root, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, `${content.trim()}\n`, "utf8");
}

function safeName(value) {
  return value.replace(/[\\/:*?"<>|]/g, "-").replace(/\s+/g, "");
}

function handCode(a, b, suffix = "") {
  if (a === b) return `${a}${a}`;
  const ai = ranks.indexOf(a);
  const bi = ranks.indexOf(b);
  return ai < bi ? `${a}${b}${suffix}` : `${b}${a}${suffix}`;
}

function expandToken(token) {
  const t = token.trim();
  if (!t) return [];
  const pairPlus = /^([AKQJT98765432])\1\+$/.exec(t);
  if (pairPlus) {
    const start = ranks.indexOf(pairPlus[1]);
    return ranks.slice(0, start + 1).map((r) => `${r}${r}`);
  }

  const broadwayPlus = /^([AKQJT98765432])([AKQJT98765432])([so])\+$/.exec(t);
  if (broadwayPlus) {
    const [, high, low, suited] = broadwayPlus;
    const highIndex = ranks.indexOf(high);
    const lowIndex = ranks.indexOf(low);
    const hands = [];
    for (let i = highIndex + 1; i <= lowIndex; i += 1) {
      hands.push(handCode(high, ranks[i], suited));
    }
    return hands;
  }

  if (/^[AKQJT98765432]{2}[so]?$/.test(t)) return [t];
  return [t];
}

function expand(rangeText) {
  if (!rangeText) return [];
  return rangeText.split(",").flatMap(expandToken);
}

function makeHands(groups) {
  const hands = {};
  for (const [label, rangeText] of Object.entries(groups)) {
    for (const hand of expand(rangeText)) {
      if (!hands[hand]) hands[hand] = label;
    }
  }
  return hands;
}

function rangeDoc({ id, title, spot, table = "9max", stackBb, position, villainPosition = "", openSize = "2.0bb-2.2bb", groups, notes, boundary }) {
  return {
    id,
    title,
    game: "NLH MTT Big Blind Ante",
    table,
    spot,
    stackBb,
    position,
    villainPosition,
    openSize,
    source: "training-baseline",
    legend: {
      "R+": "強制 raise / open",
      R: "標準 raise / open",
      M: "mixed / 桌況調整",
      F: "fold",
      C: "call / defend",
      "3B": "non-all-in 3bet",
      RC: "raise-call all-in",
      RF: "raise-fold",
      RJ: "rejam",
      AI: "all-in shove"
    },
    hands: makeHands(groups),
    notes,
    boundary
  };
}

function rfiGroups(position, stack) {
  const deep = {
    UTG: { "R+": "TT+,AKs,AQs,AKo", R: "77+,AJs+,KQs,AQo", M: "66,A9s+,KJs+,QJs,JTs,AJo,KQo" },
    LJ: { "R+": "99+,AQs+,AKo", R: "66+,ATs+,KJs+,QJs,JTs,T9s,AQo,KQo", M: "55,A8s,KTs,QTs,J9s,98s,AJo,KJo" },
    HJ: { "R+": "88+,AQs+,AKo", R: "55+,A9s+,KTs+,QTs+,JTs,T9s,98s,AJo+,KQo", M: "44,A7s,K9s,Q9s,J9s,T8s,87s,KJo,QJo" },
    CO: { "R+": "77+,AJs+,AQo", R: "44+,A2s+,K9s+,Q9s+,J9s+,T9s,98s,87s,ATo+,KJo+,QJo", M: "22,33,K8s,Q8s,J8s,T8s,97s,76s,A9o,KTo,QTo,JTo" },
    BTN: { "R+": "66+,ATs+,AJo", R: "22+,A2s+,K2s+,Q5s+,J7s+,T7s+,98s,87s,76s,65s,A2o+,K8o+,Q9o+,J9o+,T9o", M: "K7o,Q8o,J8o,T8o,97s,86s,75s,64s,54s" },
    SB: { "R+": "77+,AJs+,AQo", R: "22+,A2s+,K5s+,Q8s+,J8s+,T8s+,98s,87s,76s,A8o+,KTo+,QTo+,JTo", M: "K9o,Q9o,J9o,T9o,65s,54s" }
  };
  const mid = {
    UTG: { RC: "TT+,AQs+,AKo", RF: "66+,AJs,KQs,AQo", M: "55,A9s,KJs,QJs,JTs,AJo,KQo" },
    LJ: { RC: "99+,AQs+,AKo", RF: "55+,ATs+,KJs+,QJs,JTs,AQo,KQo", M: "A8s,KTs,QTs,J9s,T9s,98s,AJo,KJo" },
    HJ: { RC: "88+,AJs+,AQo", RF: "44+,A8s+,KTs+,QTs+,JTs,T9s,98s,ATo+,KQo", M: "A7s,K9s,Q9s,J9s,T8s,87s,KJo,QJo" },
    CO: { RC: "77+,ATs+,AJo+", RF: "22+,A2s+,K9s+,Q9s+,J9s+,T9s,98s,87s,A9o+,KTo+,QTo+", M: "K8s,Q8s,J8s,T8s,76s,65s,JTo" },
    BTN: { RC: "66+,A9s+,ATo+,KQs", RF: "22+,A2s+,K5s+,Q8s+,J8s+,T8s+,98s,87s,76s,A2o+,K9o+,Q9o+,J9o+,T9o", M: "K4s,Q7s,J7s,T7s,65s,54s,K8o,Q8o,J8o" },
    SB: { RC: "55+,A8s+,ATo+,KQs", RF: "22+,A2s+,K7s+,Q9s+,J9s+,T9s,98s,87s,A7o+,KTo+,QTo+", M: "K6s,Q8s,J8s,T8s,76s,K9o,Q9o,JTo" }
  };
  const shallow20 = {
    UTG: { RC: "88+,AJs+,AQo+", RF: "55+,A9s+,KTs+,QTs+,JTs,AJo,KQo", M: "44,A8s,K9s,Q9s,T9s" },
    LJ: { RC: "77+,ATs+,AQo+", RF: "44+,A8s+,KTs+,QTs+,JTs,T9s,AJo,KQo", M: "A7s,K9s,Q9s,J9s,98s,KJo" },
    HJ: { RC: "66+,ATs+,AJo+", RF: "33+,A5s+,K9s+,Q9s+,J9s+,T9s,98s,KTo+,QTo+", M: "A4s,K8s,Q8s,J8s,87s,A9o,JTo" },
    CO: { RC: "55+,A8s+,ATo+,KQs", RF: "22+,A2s+,K7s+,Q8s+,J8s+,T8s+,98s,87s,A8o+,KTo+,QTo+,JTo", M: "K6s,Q7s,T7s,76s,65s,K9o,Q9o" },
    BTN: { RC: "44+,A5s+,A8o+,KTs+,QJs", RF: "22+,A2s+,K2s+,Q5s+,J7s+,T7s+,98s,87s,76s,65s,A2o+,K8o+,Q9o+,J9o+,T9o", M: "K7o,Q8o,J8o,86s,75s,54s" },
    SB: { RC: "44+,A5s+,A8o+,KTs+,QJs", RF: "22+,A2s+,K5s+,Q7s+,J7s+,T7s+,98s,87s,76s,A2o+,K8o+,Q9o+,J9o+", M: "K7o,Q8o,T9o,65s,54s" }
  };
  const shove15 = {
    UTG: { AI: "55+,A8s+,KTs+,QTs+,JTs,AJo+,KQo", M: "44,A5s,A7s,K9s,Q9s,T9s" },
    LJ: { AI: "44+,A5s+,KTs+,QTs+,JTs,T9s,ATo+,KQo", M: "33,A2s,A4s,K9s,Q9s,J9s,A9o,KJo" },
    HJ: { AI: "33+,A2s+,K9s+,Q9s+,J9s+,T9s,98s,A9o+,KJo+,QJo", M: "22,K8s,Q8s,J8s,T8s,A8o,KTo,QTo,JTo" },
    CO: { AI: "22+,A2s+,K7s+,Q8s+,J8s+,T8s+,98s,87s,A7o+,KTo+,QTo+,JTo", M: "K6s,Q7s,T7s,76s,65s,A5o,K9o,Q9o,T9o" },
    BTN: { AI: "22+,A2s+,K2s+,Q5s+,J7s+,T7s+,98s,87s,76s,65s,A2o+,K8o+,Q9o+,J9o+,T9o", M: "K7o,Q8o,J8o,T8o,86s,75s,64s,54s" },
    SB: { AI: "22+,A2s+,K2s+,Q5s+,J6s+,T6s+,98s,87s,76s,65s,54s,A2o+,K7o+,Q8o+,J8o+,T8o+", M: "Q4s,J5s,T5s,97s,86s,K6o,Q7o,J7o" }
  };

  if (stack >= 40) return deep[position];
  if (stack >= 25) return mid[position];
  if (stack === 20) return shallow20[position];
  return shove15[position];
}

function generateRfiRanges() {
  for (const stack of stacks) {
    for (const position of positions) {
      const id = `mttv2-rfi-${stack}bb-9max-${position.toLowerCase()}`;
      const groups = rfiGroups(position, stack);
      const title = `${stack}BB 9-max ${position} RFI 範圍`;
      write(`ranges/rfi/${id}.json`, JSON.stringify(rangeDoc({
        id,
        title,
        spot: "RFI",
        stackBb: stack,
        position,
        groups,
        notes: [
          "這是 training baseline，不是未經調整的絕對 GTO。",
          "盲位過緊時 CO/BTN/SB 的 mixed hand 可放寬；左側 3bet 過高時移除低 suited gapper。",
          stack <= 25 ? "此深度 open 前必須先知道面對 rejam 的 raise-call / raise-fold 計畫。" : "深度足夠時，後位可保留更多可玩性手牌。"
        ],
        boundary: stack <= 20
          ? ["A2s-A5s", "K9s/KTo", "小對 22-55", "QJo/JTo"]
          : ["A9o-AJo", "KTo/KJo", "低 suited connector", "小對 22-55"]
      }), null, 2));
    }
  }
}

function generateBbDefendRanges() {
  const spots = [
    { vs: "HJ", stacks: [40, 25, 20], groups: { C: "22+,A2s+,K9s+,Q9s+,J9s+,T9s,98s,87s,AJo,KQo", "3B": "TT+,AQs+,AKo,A5s", RJ: "77+,ATs+,AQo+" } },
    { vs: "CO", stacks: [40, 25, 20], groups: { C: "22+,A2s+,K7s+,Q8s+,J8s+,T8s+,98s,87s,76s,A9o+,KTo+,QTo+,JTo", "3B": "99+,AJs+,AQo+,A5s,A4s,KQs", RJ: "66+,A9s+,KQs,AJo+" } },
    { vs: "BTN", stacks: [40, 25, 20], groups: { C: "22+,A2s+,K2s+,Q5s+,J7s+,T7s+,98s,87s,76s,65s,A2o+,K8o+,Q9o+,J9o+,T9o", "3B": "88+,ATs+,AJo+,A5s,A4s,KTs+,QJs", RJ: "44+,A5s+,KTs+,QJs,A8o+,KQo" } }
  ];
  for (const spot of spots) {
    for (const stack of spot.stacks) {
      const groups = stack >= 40
        ? { C: spot.groups.C, "3B": spot.groups["3B"], M: "K7o,Q8o,J8o,T8o,75s,64s" }
        : { C: "A2s+,K9s+,Q9s+,J9s+,T9s,98s,87s,A9o+,KTo+,QTo+", RJ: spot.groups.RJ, M: "22,33,K8s,Q8s,J8s,A8o,JTo" };
      const id = `mttv2-bbdef-${stack}bb-vs-${spot.vs.toLowerCase()}`;
      write(`ranges/bb-defend/${id}.json`, JSON.stringify(rangeDoc({
        id,
        title: `${stack}BB BB 防守 vs ${spot.vs} open`,
        spot: "BB Defend",
        stackBb: stack,
        position: "BB",
        villainPosition: spot.vs,
        groups,
        notes: [
          "BB 已投入大盲與 BBA 結構下有較好價格，但 OOP realization 仍然限制防守。",
          stack <= 25 ? "短中碼時 call 的價值下降，rejam blocker 與 fold equity 變重要。" : "40BB 仍可保留 call range，但不要把所有 suited hand 都自動 defend。"
        ],
        boundary: ["A2o-A8o", "K8o/K9o", "低 suited connector", "小對 22-55"]
      }), null, 2));
    }
  }
}

function generateRejamRanges() {
  const configs = [
    { stack: 25, vs: "CO", groups: { RJ: "55+,A8s+,KTs+,QTs+,JTs,AJo+,KQo", M: "44,A5s,A7s,K9s,Q9s,T9s,ATo,KJo" } },
    { stack: 25, vs: "BTN", groups: { RJ: "44+,A5s+,KTs+,QTs+,JTs,T9s,A9o+,KJo+,QJo", M: "33,A2s,A4s,K9s,Q9s,J9s,A8o,KTo,QTo" } },
    { stack: 25, vs: "SB", groups: { RJ: "22+,A2s+,K8s+,Q9s+,J9s+,T9s,98s,A8o+,KTo+,QTo+,JTo", M: "K7s,Q8s,J8s,T8s,A5o,K9o,Q9o" } },
    { stack: 20, vs: "CO", groups: { RJ: "44+,A5s+,KTs+,QTs+,JTs,A9o+,KQo", M: "33,A2s,A4s,K9s,Q9s,T9s,A8o,KJo" } },
    { stack: 20, vs: "BTN", groups: { RJ: "33+,A2s+,K9s+,Q9s+,J9s+,T9s,98s,A8o+,KTo+,QTo+", M: "22,K8s,Q8s,J8s,T8s,87s,A5o,K9o,JTo" } },
    { stack: 20, vs: "SB", groups: { RJ: "22+,A2s+,K5s+,Q8s+,J8s+,T8s+,98s,87s,A2o+,K9o+,QTo+,JTo", M: "K4s,Q7s,T7s,76s,K8o,Q9o" } },
    { stack: 15, vs: "CO", groups: { RJ: "33+,A2s+,K9s+,Q9s+,J9s+,T9s,A8o+,KJo+,QJo", M: "22,K8s,Q8s,J8s,A5o,KTo,QTo,JTo" } },
    { stack: 15, vs: "BTN", groups: { RJ: "22+,A2s+,K7s+,Q8s+,J8s+,T8s+,98s,87s,A5o+,KTo+,QTo+,JTo", M: "K6s,Q7s,T7s,76s,A2o,K9o,Q9o,T9o" } },
    { stack: 15, vs: "SB", groups: { RJ: "22+,A2s+,K2s+,Q5s+,J7s+,T7s+,98s,87s,76s,A2o+,K8o+,Q9o+,J9o+", M: "Q4s,J6s,T6s,K7o,Q8o,J8o,T8o" } }
  ];
  for (const cfg of configs) {
    const id = `mttv2-rejam-${cfg.stack}bb-vs-${cfg.vs.toLowerCase()}`;
    write(`ranges/rejam/${id}.json`, JSON.stringify(rangeDoc({
      id,
      title: `${cfg.stack}BB Rejam vs ${cfg.vs} open`,
      spot: "Rejam",
      stackBb: cfg.stack,
      position: "Hero behind opener",
      villainPosition: cfg.vs,
      groups: cfg.groups,
      notes: [
        "Rejam 需要 fold equity；若 opener 明顯只用強牌 open，mixed hand 要收緊。",
        "背後仍有玩家未行動時，移除最弱 Ax、Kx 和低 suited connector。",
        "ICM 壓力下，中碼不要用邊界牌與 cover 你的大碼硬碰。"
      ],
      boundary: ["A2s-A5s", "K9s/KTo", "小對 22-44", "QJo/JTo"]
    }), null, 2));
  }
}

function generatePushFoldRanges() {
  const pf = {
    12: {
      UTG: "55+,A8s+,KTs+,QTs+,JTs,AJo+,KQo",
      HJ: "44+,A5s+,KTs+,QTs+,JTs,T9s,ATo+,KQo",
      CO: "33+,A2s+,K9s+,Q9s+,J9s+,T9s,98s,A9o+,KJo+,QJo",
      BTN: "22+,A2s+,K7s+,Q8s+,J8s+,T8s+,98s,87s,A5o+,KTo+,QTo+,JTo",
      SB: "22+,A2s+,K2s+,Q5s+,J7s+,T7s+,98s,87s,76s,A2o+,K8o+,Q9o+,J9o+"
    },
    10: {
      UTG: "44+,A7s+,KTs+,QTs+,JTs,ATo+,KQo",
      HJ: "33+,A2s+,K9s+,Q9s+,J9s+,T9s,A9o+,KJo+,QJo",
      CO: "22+,A2s+,K8s+,Q8s+,J8s+,T8s+,98s,87s,A7o+,KTo+,QTo+,JTo",
      BTN: "22+,A2s+,K5s+,Q7s+,J7s+,T7s+,98s,87s,76s,A2o+,K9o+,Q9o+,J9o+,T9o",
      SB: "22+,A2s+,K2s+,Q2s+,J5s+,T6s+,98s,87s,76s,65s,A2o+,K6o+,Q8o+,J8o+,T8o+"
    },
    8: {
      UTG: "33+,A5s+,KTs+,QTs+,JTs,A9o+,KQo",
      HJ: "22+,A2s+,K9s+,Q9s+,J9s+,T9s,A8o+,KJo+,QJo",
      CO: "22+,A2s+,K7s+,Q8s+,J8s+,T8s+,98s,87s,A5o+,KTo+,QTo+,JTo",
      BTN: "22+,A2s+,K2s+,Q5s+,J7s+,T7s+,98s,87s,76s,A2o+,K8o+,Q9o+,J9o+,T9o",
      SB: "22+,A2s+,K2s+,Q2s+,J2s+,T5s+,95s,86s,75s,64s,A2o+,K4o+,Q7o+,J7o+,T8o+"
    }
  };
  for (const [stackText, byPos] of Object.entries(pf)) {
    for (const [position, rangeText] of Object.entries(byPos)) {
      const stack = Number(stackText);
      const id = `mttv2-pushfold-${stack}bb-${position.toLowerCase()}`;
      write(`ranges/push-fold/${id}.json`, JSON.stringify(rangeDoc({
        id,
        title: `${stack}BB ${position} Push/Fold`,
        spot: "Push/Fold",
        stackBb: stack,
        position,
        groups: { AI: rangeText, M: "K9s,Q9s,J9s,T9s,A5o,KTo,QTo,JTo" },
        notes: [
          "這是 chip EV training baseline。Bubble / final table call-off 會更緊。",
          "Shove 比 call shove 寬；不要用這張表去直接跟別人的 all-in。",
          "若桌上玩家 call 太鬆，移除最弱 offsuit broadway 和低 suited hand。"
        ],
        boundary: ["最低 Ax", "最低 Kx", "小對 22-44", "QTo/JTo/T9o"]
      }), null, 2));
    }
  }
}

function lesson({ title, spot, rules, ranges, mistakes, drills }) {
  return `# ${title}

## 場景設定

${spot}

## 你要先記住的規則

${rules.map((x) => `- ${x}`).join("\n")}

## Range 表

${ranges.map((x) => `- ${x}`).join("\n")}

## 邊界手牌

邊界手牌不是背答案，而是看 stack、ICM、盲位玩家與 opener 類型做調整。每次遇到 mixed hand，先問：如果被 rejam，我是否知道要不要跟？如果答案是否定，這手牌通常不該無腦 open。

## 常見錯誤

${mistakes.map((x) => `- ${x}`).join("\n")}

## 練習

${drills.map((x, i) => `${i + 1}. ${x}`).join("\n")}
`;
}

function generateLessons() {
  const lessons = [
    ["00-使用方式/00-課程索引.md", lesson({
      title: "MTT v2 課程索引",
      spot: "本課程只針對線上 NLH MTT、Big Blind Ante、8-max / 9-max、多桌環境。舊版文章式教材不作為 v2 內容來源。",
      rules: ["先學 stack mode，再學單張手牌。", "每個 preflop spot 都必須連到 range 表。", "Range 是 baseline，不是永遠不變的命令。", "練習題要能反推你是否真的懂 range。"],
      ranges: ["先看 RFI，再看 BB defend，再看 rejam / push-fold。", "範圍表頁可依 stack、spot、position 搜尋。"],
      mistakes: ["只讀文章不看表。", "把 40BB open range 套到 20BB。", "用 push range 去 call shove。"],
      drills: ["打開 25BB BTN RFI，列出三手 raise-call 和三手 raise-fold。", "打開 10BB CO Push/Fold，說明 KTo 是否可推。"]
    })],
    ["00-使用方式/01-13x13範圍表怎麼讀.md", lesson({
      title: "13x13 範圍表怎麼讀",
      spot: "所有 preflop 範圍表使用 13x13 grid。對子在對角線，suited 在一側，offsuit 在另一側。",
      rules: ["每格一定有文字標籤，不只靠顏色。", "`R+` 是強制 open；`M` 是要看桌況。", "`RC` 代表 raise-call all-in，不是單純 raise。", "`RF` 代表可以 open，但被推要 fold。", "`AI` 是直接 all-in。"],
      ranges: ["任一 RFI 表。", "任一 Push/Fold 表。"],
      mistakes: ["只看顏色不看標籤。", "把 mixed hand 當必打。", "看到 Axs 就不看位置和 stack。"],
      drills: ["在 20BB HJ RFI 中找出 A5s 的標籤並解釋。", "在 15BB SB 表中找出 Q8o 是否可推。"]
    })],
    ["01-Preflop總論/01-StackMode決策地圖.md", lesson({
      title: "Stack Mode 決策地圖",
      spot: "線上 BBA MTT 中，effective stack 比盲注級別更重要。同一手 AJo 在 60BB、30BB、15BB 完全不是同一個決策。",
      rules: ["60BB 仍可保留 postflop edge。", "40BB 是標準中碼，要有 3bet pot 計畫。", "30BB 開始不能亂 3bet/fold。", "25BB open 前必須知道是否跟 rejam。", "15BB 以下進入 push/fold 主導。"],
      ranges: ["RFI 40BB / 25BB / 15BB 對照。", "Rejam 25BB vs CO / BTN。", "Push/Fold 12BB / 10BB / 8BB。"],
      mistakes: ["用深碼 suited connector 邏輯打 20BB。", "25BB BTN open 後被 BB jam 才開始想。", "15BB 還想用小 raise 打複雜 postflop。"],
      drills: ["你 25BB CO KJo，盲位有 18BB aggressive stack，先找表再決定。", "你 15BB HJ A9o，判斷是 shove、min-raise 還是 fold。"]
    })],
    ["02-RFI範圍/01-RFI不是背表.md", lesson({
      title: "RFI 不是背表",
      spot: "所有人 fold 到你，線上 9-max BBA，effective stack 依表格。你要決定 open、shove、mixed 或 fold。",
      rules: ["前位 range 先保護自己不被後位 3bet。", "後位 range 主要攻擊盲位 dead money。", "stack 越短，raise-fold 成本越高。", "ICM 下先收緊 call-off，再收邊界 open。"],
      ranges: ["60BB 9-max RFI 全位置。", "25BB 9-max RFI 全位置。", "15BB 9-max RFI 全位置。"],
      mistakes: ["CO/BTN 因 BBA 亂開 offsuit trash。", "UTG 用後位 range。", "不看左側 stack 和 rejam 頻率。"],
      drills: ["40BB HJ KJo 是否 open？", "25BB CO A7s 面對兩個 18BB 盲位怎麼調整？", "15BB UTG KQo 是否可推？"]
    })],
    ["03-BB防守/01-BB防守不是保護盲注.md", lesson({
      title: "BB 防守不是保護盲注",
      spot: "你在 BB，已投入 BB，且 BBA 結構讓底池更大。面對 HJ / CO / BTN open，你要選 fold、call、3bet 或 rejam。",
      rules: ["BB 有價格，但 OOP realization 很差。", "面對越後位 open 防守越寬。", "25BB 以下 call 價值下降，rejam 價值上升。", "ICM 下 BB call-off 需要比 chip EV 更緊。"],
      ranges: ["40BB BB vs BTN。", "25BB BB vs CO。", "20BB BB vs HJ。"],
      mistakes: ["看到 suited 就 defend。", "用 cash game BB defend 套 MTT。", "20BB BB call 太多，錯過 rejam。"],
      drills: ["25BB BB A5s vs BTN min-open 如何處理？", "40BB BB K8o vs HJ open 是否 defend？", "20BB BB 55 vs CO open 是否 rejam？"]
    })],
    ["04-Rejam/01-Rejam三要素.md", lesson({
      title: "Rejam 三要素",
      spot: "前面玩家 open，你在後位或盲位，effective stack 15-25BB。你要判斷是否 all-in rejam。",
      rules: ["Rejam 需要 fold equity。", "Opener 越後位，你可以越寬。", "背後玩家越多，你要越緊。", "Blocker 重要，但不能取代 fold equity。", "ICM 壓力會先砍掉邊界 Ax/Kx。"],
      ranges: ["25BB Rejam vs CO / BTN / SB。", "20BB Rejam vs CO / BTN / SB。", "15BB Rejam vs CO / BTN / SB。"],
      mistakes: ["用弱 Ax 對 tight UTG rejam。", "小對該推不敢推。", "沒看背後大碼玩家。"],
      drills: ["20BB BTN A5s vs CO open 是否 rejam？", "25BB SB KTo vs BTN open 怎麼處理？", "15BB BB 33 vs SB open 是否 rejam？"]
    })],
    ["05-PushFold/01-短碼不是等AA.md", lesson({
      title: "短碼不是等 AA",
      spot: "你剩 12BB / 10BB / 8BB，在 BBA MTT。Action fold 到你，你要決定直接 shove 或 fold。",
      rules: ["Shove range 比 call shove 寬。", "BBA dead money 讓偷盲價值提高。", "越靠後位越寬。", "ICM 下 bubble call-off 收很緊，但 open shove 不一定同步收同樣多。"],
      ranges: ["12BB Push/Fold 全位置。", "10BB Push/Fold 全位置。", "8BB Push/Fold 全位置。"],
      mistakes: ["8BB BTN 還 min-raise/fold。", "用 push range 去 call UTG all-in。", "短碼等太久讓 fold equity 消失。"],
      drills: ["10BB CO A7o 是否 shove？", "8BB SB Q7o 是否 shove？", "12BB UTG 44 是否 shove？"]
    })],
    ["06-ICM/01-ICM先影響CallOff.md", lesson({
      title: "ICM 先影響 Call-off",
      spot: "接近 bubble、pay jump 或 final table。你面對 all-in 或可能被迫打光。",
      rules: ["ICM 對 call-off 的影響通常大於 open。", "中碼最怕跟大碼打大底池。", "大碼可以施壓，但不能無腦亂開。", "短碼要找 fold equity，不是等死。"],
      ranges: ["先用 chip EV 表，再按 ICM 收掉 mixed call-off。", "Push/Fold 表不可直接當 bubble call 表。"],
      mistakes: ["中碼用 chip EV call-off。", "大碼亂開被另一個大碼反制。", "短碼過度等 pay jump。"],
      drills: ["FT 7 left，中碼 AJo 面對 cover 你的 CO jam 是否 call？", "Bubble 大碼 BTN K7s 是否可 open？"]
    })],
    ["07-PKO/01-Bounty不是免死金牌.md", lesson({
      title: "PKO Bounty 不是免死金牌",
      spot: "PKO MTT，你 cover 對手或被對手 cover。你要評估 bounty 是否讓 call / rejam 變寬。",
      rules: ["只有 cover 對手才有 bounty equity。", "Bounty 可放寬 call，但 dominated hand 仍會輸大。", "越後期 bounty 相對籌碼價值越要重新估算。", "不 cover 時回到普通 MTT range。"],
      ranges: ["先用 chip EV call range，再依 bounty 做一層調整。", "Rejam 表中的 mixed hand 是 PKO 最常調整區。"],
      mistakes: ["不 cover 還為 bounty 亂 call。", "用 KTo/A2o 追任何短碼 bounty。", "忽略背後玩家。"],
      drills: ["你 cover 8BB 對手，BTN jam，你 BB A8o 是否 call？", "你不 cover CO，面對 all-in 是否還能用 bounty 理由跟？"]
    })],
    ["08-PostflopSPR/01-SPR決定承諾點.md", lesson({
      title: "SPR 決定承諾點",
      spot: "MTT postflop 不只看牌面，也要看 preflop 後剩多少 stack。30BB SRP 和 100BB SRP 的 top pair 不是同一種牌。",
      rules: ["SPR 越低，top pair / overpair 越接近承諾。", "SPR 高時，單對牌不能無腦三街。", "短碼 postflop 常是 flop bet 後 turn all-in。", "下注 size 必須先想下一街 stack。"],
      ranges: ["Postflop 沒有 13x13，但要回到 preflop range 看誰有 nut advantage。"],
      mistakes: ["20BB TPTK 還想 pot control 三街。", "100BB overpair 在濕牌面打光。", "Flop c-bet 沒想 turn SPR。"],
      drills: ["30BB BTN open BB call，flop K72r 你 KQ，下注後 turn SPR 多少？", "40BB 3bet pot AA 在 987ss 是否自動打光？"]
    })],
    ["09-線上多桌/01-Default與Exploit.md", lesson({
      title: "線上多桌 Default 與 Exploit",
      spot: "你在多桌線上 MTT，資訊有限。你需要先有 default range，再依玩家傾向小幅調整。",
      rules: ["Unknown 先用 baseline。", "盲位過緊可放寬 steal。", "盲位 rejam 過高要收掉 RF。", "對 under-bluff player，river bluff-catch 降低。", "不要用單一 showdown 過度調整。"],
      ranges: ["所有 mixed hand 都是 exploit 調整入口。", "RFI 表中 M / RF 的牌最受桌況影響。"],
      mistakes: ["因一手牌就改整套 range。", "多桌時用情緒 call。", "看到 tight blind 卻不偷。"],
      drills: ["BTN 25BB，BB fold to steal 很高，哪些 M hand 可加入 open？", "SB 20BB aggressive rejam，你 CO 應收哪些 RF？"]
    })]
  ];
  for (const [path, content] of lessons) write(`lessons/${path}`, content);
}

function focusedLesson({ title, scene, concepts, process, rangeRefs, edges, mistakes, drills }) {
  return `# ${title}

## 場景設定

${scene}

## 核心觀念

${concepts.map((x) => `- ${x}`).join("\n")}

## 操作流程

${process.map((x, i) => `${i + 1}. ${x}`).join("\n")}

## Range 表

${rangeRefs.map((x) => `- ${x}`).join("\n")}

## 邊界手牌

${edges.map((x) => `- ${x}`).join("\n")}

## 常見錯誤

${mistakes.map((x) => `- ${x}`).join("\n")}

## 練習

${drills.map((x, i) => `${i + 1}. ${x}`).join("\n")}
`;
}

function generateFocusedLessons() {
  const lessons = [
    ["02-RFI範圍/02-60BB深碼RFI.md", focusedLesson({
      title: "60BB 深碼 RFI：先保留後手優勢",
      scene: "Effective stack 60BB，線上 BBA MTT，前面玩家都 fold 到你。這個深度仍然有 postflop 操作空間，open range 可以包含可玩性手牌，但不能把所有 suited hand 都當成印鈔機。",
      concepts: ["60BB 的 open 目標是取得 position、隔離弱盲位、保留後手優勢。", "前位被 domination 的 offsuit broadway 要保守，後位才開始大量偷盲。", "小對與 suited connector 的價值來自 implied odds，但面對 squeeze 高的桌子會下降。", "深碼不是寬到失控，而是允許更多可玩性。"],
      process: ["先確認位置，UTG/LJ 不偷盲，CO/BTN 才是攻擊位。", "看左側 3bet/squeeze 傾向，過高就砍掉低 suited connector。", "判斷盲位是否過緊，過緊才把 M hand 加入 open。", "open 後先規劃被 3bet 的 continue range。"],
      rangeRefs: ["60BB 9-max UTG/LJ/HJ RFI。", "60BB 9-max CO/BTN/SB RFI。"],
      edges: ["A9o/AJo：位置越前越容易 dominated。", "KTo/KJo：後位可偷，前位少碰。", "22-55：深碼可開，但左側 squeeze 高要收。", "65s/54s：需要 position 與弱盲位支撐。"],
      mistakes: ["看到 60BB 就用 cash game 邏輯開太寬。", "UTG 開 KJo、QJo 後被後位壓力懲罰。", "在 aggressive 左側玩家前面開太多低 suited connector。"],
      drills: ["60BB HJ 44，左側 BTN 3bet 很高，是否仍 open？", "60BB BTN 75s，兩個盲位 fold to steal 高，如何處理？", "60BB UTG AJo，在 tough table 是否要降頻？"]
    })],
    ["02-RFI範圍/03-40BB中深碼RFI.md", focusedLesson({
      title: "40BB 中深碼 RFI：開始重視反擊成本",
      scene: "Effective stack 40BB。你仍可 open/fold，但 3bet pot 的 SPR 已下降，邊界手牌被反擊時更難舒服防守。",
      concepts: ["40BB 是線上 MTT 最常見的工作深度。", "後位仍可偷盲，但要知道哪些牌能面對 3bet。", "前位 open 被 3bet 時，不要用 dominated offsuit broadway 硬撐。", "小對不再單靠 set mining 支撐所有 open。"],
      process: ["先用 40BB RFI 表找 baseline。", "標記 R+、R、M，M hand 只在盲位偏緊或桌子偏被動時加入。", "面對 3bet，先把 value continue 與 fold 分清楚。", "若後面有 20BB aggressive stack，要預先規劃被 rejam。"],
      rangeRefs: ["40BB 9-max RFI 全位置。", "40BB BB defend vs HJ/CO/BTN。"],
      edges: ["AJo：HJ 以後較自然，UTG/LJ 要看桌況。", "KQo：前位可開但怕被 3bet；後位價值上升。", "T9s/98s：位置好才舒服。", "22-44：面對短碼盲位時不再純靠 set value。"],
      mistakes: ["40BB BTN 亂開，卻不知道被 18BB jam 要不要跟。", "CO 開太多低 offsuit Kx。", "把 40BB 當 100BB 打，postflop 過度浮動。"],
      drills: ["40BB CO KTo，BB 18BB aggressive，是否 open？", "40BB LJ 66，後面有兩個 25BB rejam stack，如何調整？", "40BB BTN Q8o，兩盲都 tight，是否加入？"]
    })],
    ["02-RFI範圍/04-30BB轉換區RFI.md", focusedLesson({
      title: "30BB 轉換區 RFI：不要亂 3bet/fold",
      scene: "Effective stack 30BB。這是從 postflop 主導轉向 preflop 壓力的轉換區，open 後面對 rejam 的成本明顯提高。",
      concepts: ["30BB open 仍可小 raise，但不能把邊界牌當自動偷盲。", "後位 steal 仍重要，但要看盲位 stack 是否能 rejam。", "非 all-in 3bet bluff 的空間下降。", "被 jam 時，call-off 不是憑感覺，而是由 blocker、equity、ICM 決定。"],
      process: ["先看 30BB RFI 表。", "把 RC/RF 思維提前套到後位 open。", "盲位若 15-25BB，先預測他們 rejam range。", "對過度防守盲位，砍掉 lowest offsuit steals。"],
      rangeRefs: ["30BB 9-max RFI 全位置。", "25BB Rejam vs CO/BTN/SB 作為壓力參考。"],
      edges: ["A8s/A9s：有 blocker，但被 call 時 equity 未必好。", "KJo/QJo：後位偷盲可用，前位容易 dominated。", "小對：不再只為中 set open。", "T8s/97s：需要盲位 fold equity。"],
      mistakes: ["30BB 仍用大量 suited gapper steal。", "被 20BB BB jam 才開始算。", "拿 KJo 跟 tight rejam 硬碰。"],
      drills: ["30BB BTN A2o，SB 20BB aggressive，BB 35BB tight，如何處理？", "30BB HJ T9s，CO/BTN 都愛 3bet，是否 open？", "30BB SB K9o 對 tight BB 是否可 raise-fold？"]
    })],
    ["02-RFI範圍/05-25BB壓力RFI.md", focusedLesson({
      title: "25BB 壓力 RFI：每次 open 都要知道 call-off",
      scene: "Effective stack 25BB。你仍會有 raise-fold，但已經不能把 open 視為便宜嘗試。線上 BBA 底池大，盲位 rejam 很常見。",
      concepts: ["25BB 的核心是把 open range 分成 raise-call、raise-fold、mixed。", "後位 open 很有價值，但 RF 太多會被 aggressive 盲位懲罰。", "ICM 越重，RC 需要越緊。", "邊界 Ax/Kx 不是自動開，要看盲位是否敢推。"],
      process: ["打開 25BB RFI 表，先找 RC 與 RF。", "看盲位 15-25BB stack 數量。", "若盲位 rejam 高，砍掉最底部 RF。", "若盲位太緊，加入 M hand 偷盲。"],
      rangeRefs: ["25BB 9-max RFI 全位置。", "25BB Rejam vs CO/BTN/SB。"],
      edges: ["A7s/A8s：常是 open，但面對 tight rejam 不想 call。", "KTo/KJo：後位可偷，對 aggressive 盲位要收。", "22-44：後位可開，面對 shove 多半 fold 或 mixed。", "QTo/JTo：依盲位而定，不是標準前位 open。"],
      mistakes: ["25BB BTN 覺得位置好就開所有 Kx。", "CO open 太多 RF，讓 BB 無痛 rejam。", "Bubble 中碼仍用 chip EV call-off。"],
      drills: ["25BB CO A8s，BTN/BB 都 18BB aggressive，是否 open？", "25BB BTN 44，SB 12BB、BB 24BB，計畫是什麼？", "25BB SB K9o 對 tight BB 是否可偷？"]
    })],
    ["02-RFI範圍/06-20BB短中碼RFI.md", focusedLesson({
      title: "20BB 短中碼 RFI：少一點花招，多一點清楚",
      scene: "Effective stack 20BB。你還可以 min-raise，但很多牌已接近 all-in 決策。錯誤 open/fold 會快速流失 stack。",
      concepts: ["20BB 時，open size 小，但決策壓力大。", "後位仍可 raise-fold，但底部要比 25BB 更乾淨。", "面對 rejam，RC/RF 的分界要先確認。", "不舒服的 postflop hand 要少開。"],
      process: ["先看 20BB RFI 表。", "把每手牌歸類為 RC、RF、M 或 fold。", "盲位若會 rejam，先刪除 lowest RF。", "若桌子過度 tight，可保留 steal，但不要加太多 offsuit garbage。"],
      rangeRefs: ["20BB 9-max RFI 全位置。", "20BB Rejam vs CO/BTN/SB。", "20BB BB defend vs HJ/CO/BTN。"],
      edges: ["A5s：blocker 好，但 ICM 下會降頻。", "K9s/KTo：後位可用，前位危險。", "QJo/JTo：多是後位邊界。", "33-55：很多位置變成 push/rejam 型手牌。"],
      mistakes: ["20BB 開太多 suited connector 想看 flop。", "open 後遇到 jam 才翻表。", "用 40BB postflop 思維打 20BB。"],
      drills: ["20BB HJ A9o 是否 open？", "20BB BTN K8o，BB call 太鬆，是否仍開？", "20BB CO 55，SB 18BB aggressive，開前要想什麼？"]
    })],
    ["02-RFI範圍/07-15BB開局與直接推.md", focusedLesson({
      title: "15BB 開局與直接推：短碼要保留 fold equity",
      scene: "Effective stack 15BB。很多位置直接 all-in 比小 raise 更清楚，特別是多人桌與 BBA 底池。",
      concepts: ["15BB 以下，fold equity 是主要資產。", "小 raise/fold 會消耗太多 stack，必須非常有理由。", "前位仍要保守，後位與 SB 才能大幅加壓。", "短碼不是等 AA，而是選擇對手最難跟的 spot。"],
      process: ["先看 15BB RFI 表與 12BB Push/Fold 表。", "前位用強而穩定的 shove range。", "CO/BTN/SB 依盲位 call 太鬆或太緊調整。", "Bubble 時先砍掉最差 offsuit 邊界。"],
      rangeRefs: ["15BB 9-max RFI 全位置。", "12BB Push/Fold 全位置。"],
      edges: ["K8o/K9o：後位可推，前位不碰。", "Q9s/J9s/T9s：看位置與 ICM。", "A2s-A5s：blocker 有價值，但被 call 時仍會 dominated。", "22-44：常有 fold equity，不能只怕 coin flip。"],
      mistakes: ["15BB BTN min-raise/fold 太多。", "SB 對 tight BB 不敢推。", "Bubble 過度等牌，最後掉到 5BB。"],
      drills: ["15BB BTN K8o，兩盲 average tight，是否 shove？", "15BB LJ A9o 是否推？", "15BB SB Q8o 對 loose BB 如何調整？"]
    })],
    ["02-RFI範圍/08-前位RFI：UTG與LJ.md", focusedLesson({
      title: "前位 RFI：UTG 與 LJ",
      scene: "9-max 線上 MTT，UTG/LJ 先行動。你後面還有很多玩家，range 必須能承受 3bet、cold call 與 squeeze。",
      concepts: ["前位不是偷盲位置，而是建立強 range。", "Broadway offsuit 最容易被 dominated。", "Suited broadway 比 offsuit broadway 更能實現 equity。", "ICM 或 tough table 時，前位先收掉邊界。"],
      process: ["先看對應 stack 的 UTG/LJ 表。", "確認後方是否有 short rejam stack。", "若桌子被動，才加入少量 M hand。", "被 3bet 時，不用為了面子防守邊界牌。"],
      rangeRefs: ["60BB/40BB/25BB/20BB/15BB UTG RFI。", "60BB/40BB/25BB/20BB/15BB LJ RFI。"],
      edges: ["AJo/KQo：可開但容易被壓力測試。", "KJs/QJs/JTs：suited 可玩性較好。", "66/77：深碼可開，短碼更接近 all-in equity。", "A5s：不是所有前位都可自動開。"],
      mistakes: ["UTG 開 KJo、QJo 成習慣。", "把 LJ 當 CO。", "前位 open 後被 3bet 還用 weak suited ace 硬跟。"],
      drills: ["40BB UTG AJo 是否 open？", "25BB LJ KQo 被 BTN 3bet 怎麼規劃？", "20BB UTG A5s 在 bubble 是否保留？"]
    })],
    ["02-RFI範圍/09-中後位RFI：HJ與CO.md", focusedLesson({
      title: "中後位 RFI：HJ 與 CO",
      scene: "HJ/CO 是線上 MTT 的主要盈利位置。你開始攻擊盲位，但仍要處理 BTN、SB、BB 的反擊。",
      concepts: ["HJ 是半偷盲位，CO 才更接近主攻位。", "BTN aggressive 時，CO 要降低被 3bet 後難打的牌。", "盲位過緊時，CO 可加更多 M hand。", "CO 面對短碼盲位要提前規劃 rejam。"],
      process: ["先看 stack 對應 HJ/CO RFI。", "確認 BTN 是否會 3bet。", "確認 SB/BB 是否有 12-25BB rejam stack。", "根據 fold equity 加入或移除邊界牌。"],
      rangeRefs: ["40BB/25BB/20BB HJ RFI。", "40BB/25BB/20BB CO RFI。", "Rejam vs CO 作為反制參考。"],
      edges: ["A9o/A8s：CO 常可開，HJ 要更挑。", "KTo/QTo/JTo：CO 才自然，HJ 要看桌況。", "98s/87s：深碼可玩，短碼下降。", "22-55：需要知道被推如何處理。"],
      mistakes: ["CO 忽略 BTN aggressive 3bet。", "HJ 用 CO range。", "後位 open 前不看盲位 stack。"],
      drills: ["30BB CO QTo，BTN aggressive，盲位 tight，是否 open？", "25BB HJ A8s，BB 18BB aggressive，如何調整？", "40BB CO 76s，兩盲很緊，是否加入？"]
    })],
    ["02-RFI範圍/10-偷盲位RFI：BTN與SB.md", focusedLesson({
      title: "偷盲位 RFI：BTN 與 SB",
      scene: "BTN/SB 是線上 BBA MTT 偷盲最重要的位置。因為 dead money 大，偷盲很賺；但對手知道這點，所以反擊也更頻繁。",
      concepts: ["BTN 有 position，能承受較多 call。", "SB 沒 position，但只剩 BB 一人，steal incentive 很高。", "BB 太鬆時，SB 要降低弱 offsuit。", "BB 太緊時，BTN/SB 的 M hand 可加入。"],
      process: ["先看 BTN/SB 的 stack 對應 RFI。", "確認 BB defend、3bet、rejam 傾向。", "BTN 對兩個 tight blinds 加寬，對 aggressive blinds 收底部。", "SB 先問：被 BB jam 時哪些牌要跟？"],
      rangeRefs: ["25BB BTN/SB RFI。", "20BB BTN/SB RFI。", "15BB BTN/SB RFI。", "BB defend vs BTN。"],
      edges: ["K7o/Q8o/J8o：只在好偷盲環境加入。", "A2o-A5o：blocker 有價值，但被 call 很難打。", "65s/54s：BTN 比 SB 更容易實現 equity。", "Q9s/J9s/T9s：SB 對 tight BB 價值高。"],
      mistakes: ["BTN 看到兩張牌就開。", "SB 對 loose BB 還狂開 trash。", "被 BB rejam 後才想 call-off。"],
      drills: ["25BB BTN K7o，SB/BB 都 tight，是否 open？", "20BB SB Q8o，BB loose call，如何處理？", "15BB BTN A2o，盲位 call 太鬆，是否仍推？"]
    })],
    ["03-BB防守/02-BB對HJOpen.md", focusedLesson({
      title: "BB 防守 vs HJ Open",
      scene: "你在 BB，面對 HJ open。HJ range 仍相對強，BB 不能只因價格好就 defend 太寬。",
      concepts: ["面對 HJ，BB 防守要比對 BTN 緊。", "Offsuit 弱 Kx/Qx 很容易被 dominated。", "40BB 可保留較多 call，20-25BB 更偏向 rejam 或 fold。", "A blocker 有價值，但 A2o 不是自動防守。"],
      process: ["先看 BB vs HJ 表。", "40BB 時把可玩 suited hand 作 call，強牌與 blocker 進 3bet。", "25BB 以下先找 rejam 候選。", "ICM 下把邊界 call-off 收掉。"],
      rangeRefs: ["40BB BB defend vs HJ。", "25BB BB defend vs HJ。", "20BB BB defend vs HJ。"],
      edges: ["K8o/K9o：多數不舒服。", "Q9s/J9s：可玩但非自動。", "55-77：短碼常變 rejam 候選。", "A9o/AJo：看 stack 與 opener。"],
      mistakes: ["把 BB vs BTN 防守套到 HJ。", "用 A2o defend 後在 A-high flop 賠大。", "20BB call 小對只為看 set。"],
      drills: ["40BB BB K9o vs HJ open 是否 defend？", "25BB BB 66 vs HJ open 如何處理？", "20BB BB A9o vs HJ open 在 bubble 怎麼調整？"]
    })],
    ["03-BB防守/03-BB對COOpen.md", focusedLesson({
      title: "BB 防守 vs CO Open",
      scene: "你在 BB，面對 CO open。CO range 比 HJ 寬，但仍不是任兩張。你要在 call、3bet、rejam 中選清楚。",
      concepts: ["CO open 較寬，BB 可以防守更多 suited broadway、suited connector 與部分 offsuit broadway。", "40BB 可 call 較多可玩牌，25BB 以下 rejam 權重增加。", "對 tight CO 不要過度 rejam 邊界。", "對偷太多的 CO，要用 blocker 與中小對反擊。"],
      process: ["先看 BB vs CO 表。", "判斷 CO open 是否過寬。", "40BB 用 call + 3bet 分層，20/25BB 用 rejam 反擊。", "若背後已無玩家，BB 可比其他位置更直接對抗。"],
      rangeRefs: ["40BB BB defend vs CO。", "25BB BB defend vs CO。", "20BB BB defend vs CO。", "20BB Rejam vs CO。"],
      edges: ["A5s/A4s：優秀 blocker rejam。", "KTo/QTo/JTo：常是對 CO 的邊界 defend。", "76s/65s：40BB 可 call，20BB 價值下降。", "44/55：短碼反擊候選。"],
      mistakes: ["對 tight CO 用 BTN 防守邏輯。", "40BB 把所有 suited gapper 都 call。", "25BB 只 call 不 rejam，讓 CO 免費偷盲。"],
      drills: ["25BB BB A5s vs CO open 是否 rejam？", "40BB BB 76s vs CO open 是否 call？", "20BB BB KTo vs CO open 怎麼處理？"]
    })],
    ["03-BB防守/04-BB對BTNOpen.md", focusedLesson({
      title: "BB 防守 vs BTN Open",
      scene: "你在 BB，面對 BTN open。這是最常見、也最容易過度防守的 spot。BTN range 寬，但 BB 出位置外，不能只看 pot odds。",
      concepts: ["BTN range 寬，BB 防守自然最寬。", "OOP realization 差，弱 offsuit hand 仍會虧。", "40BB call range 最寬，25/20BB rejam 明顯增加。", "對 open 太多又 fold 太多的 BTN，blocker rejam 很有價值。"],
      process: ["先看 BB vs BTN 表。", "40BB 分出 call 與 3bet，不要把邊界都 call。", "25/20BB 找 RJ 與 M hand。", "若 BTN call shove 太鬆，降低弱 Ax/Kx rejam。"],
      rangeRefs: ["40BB BB defend vs BTN。", "25BB BB defend vs BTN。", "20BB BB defend vs BTN。", "20BB Rejam vs BTN。"],
      edges: ["T8o/J8o/Q8o：價格好但 realization 差。", "A2s-A5s：blocker 與 nut potential 兼具。", "K9o/KTo：對寬 BTN 可反擊，對 tight BTN 收。", "22-44：短碼 rejam 價值高於 call。"],
      mistakes: ["BB vs BTN 看到任何 suited 就 call。", "20BB 用 call 保護盲注，錯過 fold equity。", "BTN open size 變大仍用同一張表。"],
      drills: ["40BB BB T8o vs BTN min-open 是否 defend？", "25BB BB A4s vs BTN open 是否 rejam？", "20BB BB 33 vs BTN open 如何處理？"]
    })],
    ["04-Rejam/02-25BBRejam.md", focusedLesson({
      title: "25BB Rejam：用 fold equity 懲罰偷盲",
      scene: "你 25BB，前方 CO/BTN/SB open。25BB rejam 的價值來自 fold equity、blocker 與 opener range 的寬度。",
      concepts: ["25BB rejam 仍能讓 opener fold 很多 RF hand。", "Opener 越後位，你越能加壓。", "背後玩家越多，你越要收緊。", "ICM 下，中碼對 cover 自己的人 rejam 要更謹慎。"],
      process: ["先看 25BB Rejam vs 對應 opener。", "確認 opener 是否真的寬。", "確認背後 stack 與大碼壓力。", "把 M hand 只留給 fold equity 足夠的桌況。"],
      rangeRefs: ["25BB Rejam vs CO。", "25BB Rejam vs BTN。", "25BB Rejam vs SB。"],
      edges: ["A5s/A4s：標準 blocker 邊界。", "KTs/KJo：對後位可用，對前位危險。", "44/55：對寬 opener 可推，對 tight opener 收。", "QJo/JTo：需要 opener 過寬才舒服。"],
      mistakes: ["看到 A blocker 就對 tight CO rejam。", "忽略 BTN/SB/BB 背後大碼。", "Bubble 中碼跟大碼硬碰。"],
      drills: ["25BB BTN A5s vs CO open，BB 大碼，是否 rejam？", "25BB SB KJo vs BTN open，BTN fold to shove 高，如何處理？", "25BB BB 44 vs SB open 是否推？"]
    })],
    ["04-Rejam/03-20BBRejam.md", focusedLesson({
      title: "20BB Rejam：少 call，多讓對手做決定",
      scene: "你 20BB，前方 open。這個深度 call 會讓 postflop SPR 很低，很多手牌用 rejam 比 call 更清楚。",
      concepts: ["20BB 的 call 很容易變成被動實現 equity。", "Rejam 讓 opener 的 RF range 直接棄牌。", "中小對與 suited Ax 的價值上升。", "ICM 會砍掉 dominated 邊界。"],
      process: ["先看 20BB Rejam 表。", "判斷 opener 是否有足夠 fold range。", "若 opener tight 或 pot committed，收掉 M hand。", "若背後有大碼，收掉最弱 blocker。"],
      rangeRefs: ["20BB Rejam vs CO。", "20BB Rejam vs BTN。", "20BB Rejam vs SB。"],
      edges: ["A2s-A5s：常見 blocker rejam。", "K9s/KTo：對後位可推，對 tight range 下降。", "22-44：很多情境比 call 好。", "QTo/JTo：只對過寬 opener。"],
      mistakes: ["20BB call 55 等翻牌。", "rejam 前不看 opener 是否會 fold。", "用 dominated offsuit ace 對早位硬推。"],
      drills: ["20BB BTN A4s vs CO open 是否 rejam？", "20BB SB KTo vs BTN open，BTN call 太鬆，怎麼調？", "20BB BB 22 vs SB open 是否推？"]
    })],
    ["04-Rejam/04-15BBRejam.md", focusedLesson({
      title: "15BB Rejam：短碼的主動權",
      scene: "你 15BB，前面玩家 open。很多玩家短碼只等牌，但 15BB 還有足夠 fold equity，可以靠 rejam 重建 stack。",
      concepts: ["15BB rejam 是短碼最重要武器之一。", "對後位偷盲者，range 可以明顯更寬。", "對前位 tight range，仍要尊重。", "被 call 時 equity 不能太差，不能只看 fold equity。"],
      process: ["先看 15BB Rejam 表。", "辨識 opener 位置與頻率。", "若 opener 後方還有人未行動，砍掉邊界。", "若你在 BB 對 SB，可用最寬反擊。"],
      rangeRefs: ["15BB Rejam vs CO。", "15BB Rejam vs BTN。", "15BB Rejam vs SB。"],
      edges: ["K7s/K8s：對 SB/BTN 可用，對 CO 收。", "A2o-A5o：看 opener 與 ICM。", "Q8s/J8s/T8s：後位攻防才出現。", "22/33：常可推，但 bubble 中要小心。"],
      mistakes: ["15BB 只 call BTN open。", "對 UTG open 用 vs BTN 表。", "短碼怕出局而完全不反擊。"],
      drills: ["15BB BB K8o vs SB open 是否 rejam？", "15BB BTN Q9s vs CO open，CO tight，是否推？", "15BB SB A2s vs BTN open 在 bubble 怎麼調？"]
    })],
    ["05-PushFold/02-12BBPushFold.md", focusedLesson({
      title: "12BB Push/Fold：還有選擇，但別拖太久",
      scene: "你 12BB，前面 fold 到你。這是短碼但仍有 fold equity 的深度，尤其 BBA 底池讓 first-in shove 很有價值。",
      concepts: ["12BB 可以保留少量 min-raise，但預設先學 push/fold。", "前位推得比後位緊。", "Shove range 比 call shove range 寬很多。", "ICM 下，底部 offsuit broadway 與弱 Ax 先收。"],
      process: ["先看 12BB Push/Fold 表。", "確認位置與盲位 call 傾向。", "盲位太鬆，砍掉 dominated offsuit 底部。", "盲位太緊，保留更多 suited 與 blocker hand。"],
      rangeRefs: ["12BB Push/Fold UTG/HJ/CO/BTN/SB。"],
      edges: ["A7o/A8o：後位常推，前位看表。", "KTo/KJo：CO/BTN 常見，UTG 謹慎。", "44/55：很多位置可推。", "98s/T9s：後位與 CO 才常出現。"],
      mistakes: ["12BB 等到 7BB 才開始找 spot。", "用 12BB push 表去 call UTG shove。", "SB 對 tight BB 還棄太多。"],
      drills: ["12BB UTG 44 是否 shove？", "12BB BTN K9o 是否 shove？", "12BB CO 98s 對 loose 盲位如何調整？"]
    })],
    ["05-PushFold/03-10BBPushFold.md", focusedLesson({
      title: "10BB Push/Fold：不要再幻想複雜 postflop",
      scene: "你 10BB，前面 fold 到你。這時候直接 all-in 是主要策略，因為小 raise 後幾乎沒有健康的 fold 空間。",
      concepts: ["10BB first-in shove 仍有 fold equity。", "位置越後，range 擴張越明顯。", "SB 對 BB 是最寬的 first-in spot。", "對 call 太鬆的盲位，要砍掉最差 offsuit。"],
      process: ["先看 10BB Push/Fold 表。", "確認是否有人 cover 且 ICM 壓力重。", "若盲位 tight，照表或略加底部。", "若盲位 loose，移除 lowest Kx/Qx/Jx。"],
      rangeRefs: ["10BB Push/Fold UTG/HJ/CO/BTN/SB。"],
      edges: ["Q9o/J9o/T9o：多是後位或 SB。", "K6o-K9o：SB/BTN 才自然。", "A2o-A5o：後位 blocker 推很重要。", "22/33：不要過度害怕 coin flip。"],
      mistakes: ["10BB BTN min-raise/fold。", "覺得 KTo 太醜不敢 CO 推。", "Bubble 完全不推，讓 stack 掉到無 fold equity。"],
      drills: ["10BB HJ KJo 是否 shove？", "10BB SB J7o，BB tight，是否 shove？", "10BB CO A7o 在 bubble 是否需要收？"]
    })],
    ["05-PushFold/04-8BBPushFold.md", focusedLesson({
      title: "8BB Push/Fold：fold equity 正在消失",
      scene: "你 8BB，前面 fold 到你。這時候等待會非常昂貴，因為下一輪盲注與 BBA 會吃掉大量 stack。",
      concepts: ["8BB 必須主動找 first-in spot。", "很多看起來普通的後位手牌都必須推。", "前位仍需保守，但不能只等 premium。", "Call shove 仍要比 open shove 緊。"],
      process: ["先看 8BB Push/Fold 表。", "位置越後越尊重 dead money。", "若下一手要進盲位，邊界可提高頻率。", "ICM 下只砍最差底部，不要整套停擺。"],
      rangeRefs: ["8BB Push/Fold UTG/HJ/CO/BTN/SB。"],
      edges: ["Q7o/J7o/T8o：多在 SB/BTN 出現。", "K4o-K8o：後位與 SB 的壓力手。", "Any Ax：多數後位都有 blocker 價值。", "低 suited connector：只在後位或 SB。"],
      mistakes: ["8BB 還想 limp/call。", "BTN Q9o 棄掉太多。", "把對手 loose call 當作完全不能推。"],
      drills: ["8BB BTN T8o 是否 shove？", "8BB SB Q7o 對 loose BB 如何調整？", "8BB UTG A9o 是否 shove？"]
    })],
    ["08-PostflopSPR/02-SRP位置優勢.md", focusedLesson({
      title: "SRP 位置優勢：BTN Open BB Call",
      scene: "BTN open，BB call，single-raised pot。這是線上 MTT 出現最多的 postflop spot。BTN 有位置與 range advantage，但 BB 有很多防守牌命中中低牌面。",
      concepts: ["A/K/Q high 乾牌常偏向 BTN range。", "中低連張濕牌會提升 BB 的兩對、順子、pair+draw。", "短碼 SPR 低時，c-bet size 要考慮 turn all-in。", "不是每個 flop 都要 c-bet。"],
      process: ["先回想 BTN RFI 與 BB defend range。", "判斷 flop 誰有 nut advantage。", "選擇小注高頻或大注低頻。", "下注前先看 turn pot 與剩餘 stack。"],
      rangeRefs: ["BTN RFI 表。", "BB defend vs BTN 表。"],
      edges: ["A72r：BTN range advantage 明顯。", "987ss：BB 命中更多兩對與順子。", "KQ4r：BTN 可高頻小注。", "T86 two-tone：需要降低自動 c-bet。"],
      mistakes: ["BTN 每個 flop 都 1/3 pot。", "濕牌面用空氣連開三街。", "短碼 flop bet 後 turn SPR 失控。"],
      drills: ["30BB BTN KQ open，BB call，flop K72r，如何規劃三街？", "40BB BTN A5s open，BB call，flop 987ss，是否高頻 c-bet？", "20BB BTN QJo open，BB call，flop Q84r，下注後 turn 如何承諾？"]
    })],
    ["08-PostflopSPR/03-OOP防守與CheckRaise.md", focusedLesson({
      title: "OOP 防守與 Check-Raise",
      scene: "你在 BB defend 後出位置外。你不能只用 check-call 被動實現 equity，要知道哪些牌能 check-raise 施壓。",
      concepts: ["OOP realization 差，所以強 draw 需要主動性。", "Check-raise 需要 fold equity 與 turn barrel plan。", "短碼 check-raise 幾乎會接近 commitment。", "弱 pair 無 kicker 不要自動保護。"],
      process: ["先確認 preflop BB defend range。", "在有 nut draw、combo draw、強 top pair 時建立 check-raise。", "看 stack 決定 check-raise size 是否等於承諾。", "若對手不 fold，降低 bluff check-raise。"],
      rangeRefs: ["BB defend vs CO/BTN 表。", "20BB/25BB RFI 表用來推回 opener range。"],
      edges: ["A5s 在 wheel draw 面可有強 semi-bluff。", "低 suited connector 命中強 draw 才能主動。", "Middle pair 無 redraw 多數不該膨脹底池。", "Top pair weak kicker 在 ICM 下要控風險。"],
      mistakes: ["BB 只 check-call 到 river。", "沒有 turn plan 就 check-raise。", "短碼用 check-raise/fold 浪費 stack。"],
      drills: ["25BB BB 76s defend vs BTN，flop 852 two-tone，有無 check-raise？", "40BB BB A5s vs CO，flop 743r，如何規劃？", "20BB BB K8o vs BTN，flop KJ4ss，是否願意承諾？"]
    })],
    ["08-PostflopSPR/04-3BetPot低SPR.md", focusedLesson({
      title: "3bet Pot 低 SPR：少犯昂貴錯誤",
      scene: "你 preflop 3bet 或 call 3bet，flop 後 SPR 通常明顯低於 single-raised pot。MTT 中這類錯誤代價很高。",
      concepts: ["3bet pot range 更集中，top pair/overpair 價值上升。", "低 SPR 不代表任何 pair 都打光。", "位置與 nut advantage 仍然重要。", "ICM 下，被 cover 時要避免薄價值打光。"],
      process: ["先確認 3bet range 是否偏 value 或 polar。", "估算 flop pot 與剩餘 stack。", "強牌選 size 時要讓 turn shove 自然。", "邊界 bluff-catcher 不要在 ICM 下過度防守。"],
      rangeRefs: ["RFI 表中的 R+/RC 作 value 參考。", "BB defend 表中的 3B/RJ 作反擊參考。"],
      edges: ["AQ/AK：命中 top pair 常接近承諾，但仍看 board。", "JJ/QQ：A/K high board 要控制。", "A5s：作 bluff 3bet 後要知道哪些 flop 繼續。", "Suited connector call 3bet 在短碼很危險。"],
      mistakes: ["40BB 3bet pot 用 100BB cash game 慢打邏輯。", "拿 overpair 在極濕牌面無腦三街。", "ICM 壓力下用第二對跟到底。"],
      drills: ["35BB CO open，你 BTN 3bet AK，flop A76r，如何 size？", "40BB QQ 3bet pot，flop KJ9ss，是否自動打光？", "30BB A5s 3bet bluff 被 call，flop 862r 是否繼續？"]
    })],
    ["08-PostflopSPR/05-Turn承諾點.md", focusedLesson({
      title: "Turn 承諾點：下注前先看剩餘 stack",
      scene: "MTT 中很多錯誤不是 flop 錯，而是 flop 下注後 turn SPR 變得尷尬。你要在 flop 前就知道 turn 是否承諾。",
      concepts: ["Flop c-bet size 會決定 turn 是否自然 shove。", "短碼 top pair 常在 turn 進入 commitment。", "高 SPR 下，單對牌要避免自動三街。", "Draw 下注要知道 river bluff candidate。"],
      process: ["Flop 前先估 pot、剩餘 stack、下注後 turn SPR。", "若 turn SPR 接近 1，flop bet 就代表準備承諾。", "若不想承諾，flop 要選 check 或小 size。", "River 前保留清楚的 value/bluff 分界。"],
      rangeRefs: ["對應 preflop RFI 與 BB defend 表。"],
      edges: ["TPTK：低 SPR 價值高，高 SPR 仍需看 kicker。", "Second pair：多用 bluff-catch，不要膨脹。", "Nut flush draw：可用來建立承諾線。", "弱 draw：短碼不要用昂貴 semi-bluff。"],
      mistakes: ["Flop 下注只是因為有牌，沒有 turn 計畫。", "下注 size 讓 turn 剩 awkward stack。", "River bluff 選到 blocker 很差的牌。"],
      drills: ["25BB BTN open BB call，flop A84r 下注後 turn SPR 多少？", "30BB CO open BB call，flop T97ss 你 AT，是否想承諾？", "40BB 3bet pot 你 AK 在 KJ8ss，turn blank 如何規劃？"]
    })],
    ["08-PostflopSPR/06-CbetSize選擇.md", focusedLesson({
      title: "C-bet Size 選擇：小注不是萬用",
      scene: "你是 preflop aggressor，flop 後要選 check、小注或大注。線上 MTT 常見錯誤是任何牌面都用 1/3 pot，導致濕牌面被過度 check-raise 或 turn 難打。",
      concepts: ["乾燥高牌面通常可用小注高頻。", "濕潤連張面需要降低頻率或提高 value / draw 的下注權重。", "低 SPR 時，flop size 會直接決定 turn 是否 all-in。", "多桌環境要用簡化策略，但不能忽略牌面分類。"],
      process: ["先判斷 range advantage 與 nut advantage。", "乾牌面用小注測試全 range 壓力。", "濕牌面把空氣牌 check back，保留 equity。", "下注前計算 turn SPR，避免 awkward stack。"],
      rangeRefs: ["BTN RFI vs BB defend。", "CO/HJ RFI vs BB defend。"],
      edges: ["A72r：小注高頻。", "K83r：小注高頻但保留部分 check。", "T98ss：降低空氣 c-bet。", "654 two-tone：BB nut advantage 上升。"],
      mistakes: ["任何 flop 都 1/3 pot。", "濕牌面用沒有 backdoor 的空氣下注。", "下注後 turn 不知道是否該 shove。"],
      drills: ["30BB BTN open BB call，flop A72r，哪些手牌高頻小注？", "40BB CO open BB call，flop T98ss，哪些牌應 check back？", "22BB HJ open BB call，flop K83r，小注後 turn SPR 如何規劃？"]
    })],
    ["08-PostflopSPR/07-River價值與Bluff.md", focusedLesson({
      title: "River 價值與 Bluff：不要用情緒補槍",
      scene: "你打到 river，底池已大。MTT 的 river 決策常受出局壓力、pay jump 與多桌疲勞影響，不能只憑感覺補第三槍。",
      concepts: ["River value 先問 worse hand 是否會 call。", "River bluff 需要 blocker 與對手可棄牌區。", "對 under-bluff pool，可降低 bluff-catch。", "ICM 下薄 value 與 bluff-catch 都要收。"],
      process: ["回推 preflop range 與 flop/turn line。", "列出對手到 river 的強牌、 bluff-catcher、missed draw。", "Value bet 只打能被更差牌跟的組合。", "Bluff 選阻擋牌好、攤牌價值低的牌。"],
      rangeRefs: ["對應 preflop RFI 與 BB defend 表。"],
      edges: ["Top pair top kicker：低 SPR 常 value，高 SPR 仍看 runout。", "Second pair：多數是 showdown value，不要亂 bluff。", "Missed nut flush draw blocker：可成為 bluff。", "低 missed draw 無 blocker：不要自動開槍。"],
      mistakes: ["因為前兩街下注就 river 一定要打。", "用有攤牌價值的牌轉 bluff。", "對不會 fold 的玩家大 bluff。"],
      drills: ["BTN vs BB，A high missed flush draw 到 river，何時可 bluff？", "你有 KQ 在 KJ742，對手 river check，是否 value？", "Bubble 中碼 river second pair 面對大碼 pot bet，如何思考？"]
    })],
    ["08-PostflopSPR/08-Multiway底池.md", focusedLesson({
      title: "Multiway 底池：範圍優勢會被稀釋",
      scene: "兩個以上對手看 flop。MTT 中 multiway 常來自 BB 價格好、短碼平跟或後位跟注。這類底池不能用 heads-up c-bet 頻率硬套。",
      concepts: ["Multiway 時 bluff 頻率下降。", "Top pair 弱 kicker 的價值下降。", "Nut draw 和 nutted value 的重要性上升。", "多人底池更少用低 equity 空氣下注。"],
      process: ["先確認每個玩家 preflop range。", "只用清楚 value 與高 equity draw 建立下注。", "邊界 made hand 多用 check 控制底池。", "短碼玩家存在時，注意下注是否讓自己被迫 call-off。"],
      rangeRefs: ["RFI 表與 BB defend 表一起回推。"],
      edges: ["Top pair weak kicker：多人底池降級。", "Overpair：濕牌多人仍需小心。", "Nut flush draw：可半詐唬但要看 fold equity。", "Bottom set：價值高但要注意同花順完成牌。"],
      mistakes: ["三人底池仍全 range c-bet。", "用 second pair 保護性下注。", "多人濕牌面 overpair 無腦打光。"],
      drills: ["CO open BTN call BB call，flop J87ss，你 AA 如何規劃？", "BTN open SB call BB call，flop A72r，你 KQ 是否 c-bet？", "HJ open CO call BB call，flop 654 two-tone，overpair 怎麼打？"]
    })],
    ["08-PostflopSPR/09-Probe與DelayedCbet.md", focusedLesson({
      title: "Probe 與 Delayed C-bet：對手示弱後再拿回主動",
      scene: "Preflop aggressor flop check back，turn 到你或你在位置上面對第二次 check。這是線上 MTT 常被忽略的盈利點。",
      concepts: ["Flop check back 後，turn probe 可以攻擊 capped range。", "Delayed c-bet 適合有 showdown value 或 backdoor equity 的 flop check。", "OOP probe 要看 turn 是否改善你的 range。", "短碼時 probe size 要避免把自己綁死。"],
      process: ["先判斷 flop check back 代表對手 range 是否 capped。", "Turn 若改善你的 range，可用中小 size probe。", "有 showdown value 的牌不要過度轉 bluff。", "River 只延續 blocker 好或 value 清楚的牌。"],
      rangeRefs: ["BTN RFI vs BB defend。", "CO RFI vs BB defend。"],
      edges: ["Turn A/K：常改善 preflop aggressor。", "低牌配對：常改善 BB defend。", "Second pair：可 check-call，不必硬 probe。", "Nut draw：可 probe 建立 fold equity。"],
      mistakes: ["對手 flop check back 就 turn 亂打。", "沒有 river 計畫就 probe。", "短碼 probe/fold 浪費太多 stack。"],
      drills: ["BB defend vs BTN，flop 964r check/check，turn A，你是否 probe？", "BTN open BB call，flop K72r 你 check back AQ，turn 5 是否 delayed c-bet？", "BB defend 87s，flop T64ss check/check，turn 2s 如何處理？"]
    })],
    ["08-PostflopSPR/10-短碼PostflopAllIn.md", focusedLesson({
      title: "短碼 Postflop All-in 路線",
      scene: "Effective stack 15-25BB，翻牌後 SPR 很低。這類 spot 的重點不是玩三街技巧，而是知道哪些 flop 已進入 all-in 路線。",
      concepts: ["低 SPR 下，top pair、overpair、強 draw 的承諾門檻降低。", "Flop 小注可能已經代表 turn shove。", "不想承諾的邊界牌應該更常 check。", "ICM 下承諾門檻會變高，尤其被大碼 cover 時。"],
      process: ["先算 SPR。", "把手牌分成 value commit、draw commit、showdown control、air give-up。", "下注前決定 turn 是否推。", "面對 raise，回到 equity 與 ICM，不用情緒跟。"],
      rangeRefs: ["20BB RFI 表。", "20BB BB defend 表。", "Push/Fold 表作短碼 preflop 參考。"],
      edges: ["Top pair good kicker：低 SPR 常可承諾。", "Top pair weak kicker：看對手 range 和 ICM。", "Nut flush draw + overcard：可進攻。", "Gutshot no overcard：不要用短碼亂燒。"],
      mistakes: ["20BB flop bet/fold 太多。", "低 SPR 還想慢慢控池到 river。", "ICM 下用弱 top pair 跟大碼打光。"],
      drills: ["20BB BTN KQ open BB call，flop K84r，是否進入承諾？", "18BB CO A5s open BB call，flop 762ss，你有 nut FD，如何打？", "22BB BB defend Q8s vs BTN，flop QJ7ss，是否願意 check-raise all-in？"]
    })],
    ["06-ICM/02-Bubble中碼.md", focusedLesson({
      title: "Bubble 中碼：先保護 call-off",
      scene: "接近 bubble，你是中碼，桌上有大碼 cover 你，也有短碼等待出局。這是最容易用 chip EV 犯錯的階段。",
      concepts: ["中碼最大的錯誤是和 cover 自己的大碼打大底池。", "ICM 最先影響 call-off range。", "Open 不一定要大幅縮，但 RF 與 call-off 要重分層。", "短碼存在時，中碼要避免邊界 all-in。"],
      process: ["先用 chip EV 表找 baseline。", "把 call-off 的 M/邊界牌砍掉。", "對不能 cover 的大碼少打薄邊。", "對會過度棄牌的中碼可加壓，但別撞大碼。"],
      rangeRefs: ["25BB/20BB RFI 表。", "Rejam 表只作 chip EV 起點，Bubble 要收。"],
      edges: ["AJo/KQo：chip EV 可打，ICM 可能變 fold。", "77/88：面對大碼 jam 要小心。", "A5s：blocker 有價值，但被 call 後風險大。", "KTs/QJs：位置與 cover 關係決定。"],
      mistakes: ["Bubble 中碼用平常 range call all-in。", "為了偷盲撞上唯一 cover 你的大碼。", "看到短碼就完全不打，讓自己變短碼。"],
      drills: ["Bubble 24BB HJ AJo 面對大碼 CO jam，如何思考？", "Bubble 30BB BTN K7s，兩盲都是中碼，是否 open？", "Bubble 18BB SB A5s 對大碼 BTN open 是否 rejam？"]
    })],
    ["06-ICM/03-FinalTablePayJump.md", focusedLesson({
      title: "Final Table Pay Jump：籌碼不是線性價值",
      scene: "Final table，pay jump 明顯。每個 all-in 都不只是 chip EV，還牽涉名次、cover 關係與短碼壓力。",
      concepts: ["籌碼越多，邊際價值越低；籌碼歸零的成本最大。", "大碼能施壓中碼，但要避開另一個大碼。", "中碼避免跟 cover 自己的人打光。", "短碼要選擇 fold equity 最高的 first-in spot。"],
      process: ["先列出每個人的 stack 與 cover 關係。", "判斷誰能施壓誰。", "把 call-off range 比 chip EV 收緊。", "只在你能施壓且不被反制時放寬 open。"],
      rangeRefs: ["Push/Fold 表作短碼 first-in 起點。", "RFI/Rejam 表在 FT 要按 cover 關係調整。"],
      edges: ["KQo/AJo：很強，但對大碼 jam 不一定能 call。", "小對：first-in 有價值，call-off 常變差。", "Suited Ax：blocker 加壓好，但被 call 時要注意 domination。", "Broadway suited：對短碼可施壓，對大碼收。"],
      mistakes: ["FT 還把 chip EV 表當答案。", "大碼無腦 bully 撞另一大碼。", "短碼過度等待，錯過 BTN/SB first-in。"],
      drills: ["FT 7 left，你 22BB 中碼，CO 大碼 jam，你 BB AJo 是否 call？", "FT 5 left，你大碼 BTN K7s，兩盲中碼，是否 open？", "FT 短碼 8BB CO Q9s，是否找 first-in？"]
    })],
    ["07-PKO/02-PKOCover關係.md", focusedLesson({
      title: "PKO Cover 關係：先問能不能拿賞金",
      scene: "PKO 線上 MTT。你面對短碼 all-in 或考慮 rejam。第一件事不是看 bounty 多香，而是你是否 cover 對手。",
      concepts: ["只有 cover 對手才有 bounty equity。", "被對手 cover 時，PKO 不能替你降低出局成本。", "Cover 多個短碼時，isolation all-in 價值上升。", "Bounty 越大，call 可放寬，但 dominated hand 仍要小心。"],
      process: ["先確認你是否 cover all-in 玩家。", "估算 bounty 相對底池籌碼價值。", "看背後是否有人能 overcall 或 squeeze。", "只放寬接近臨界的 call，不把垃圾牌變成好牌。"],
      rangeRefs: ["Rejam 表的 M hand 是 PKO 常調整區。", "Push/Fold 表只作 first-in 起點，不是 PKO call 表。"],
      edges: ["A8o/A9o：cover 短碼時可放寬，仍怕 dominated。", "KTo/QJo：bounty 足夠才進入討論。", "小對：對短碼 bounty 有價值，但 multiway 風險高。", "Suited Ax：blocker 與 equity 都不錯。"],
      mistakes: ["不 cover 還為 bounty call。", "看到 bounty 就用任何 Ax 跟。", "忽略背後大碼可能 overcall。"],
      drills: ["PKO 你 28BB cover 8BB BTN jam，BB A8o 是否 call？", "PKO 你 12BB 不 cover CO，CO jam，你 KJo 能否因 bounty call？", "PKO 你大碼 SB，BTN 7BB open，哪些 M hand 可加壓？"]
    })],
    ["09-線上多桌/02-線上DecisionLoop.md", focusedLesson({
      title: "線上多桌 Decision Loop",
      scene: "你同時打多桌線上 MTT，時間有限。你需要一套固定順序，讓每手牌先靠 baseline，再做少量 exploit。",
      concepts: ["先位置與 effective stack，再看 action。", "先 baseline range，再看桌況調整。", "多桌時不要臨場發明大策略。", "每次調整只動 M/RF 邊界，不重寫整套 range。"],
      process: ["讀 action：first-in、vs open、vs jam、postflop。", "讀 effective stack 與 cover 關係。", "開對應表：RFI、BB defend、Rejam、Push/Fold。", "只根據明確資訊調整邊界。", "做完手牌後標記不確定 spot，休息時 review。"],
      rangeRefs: ["全部 MTT v2 range 表。", "測驗頁用來訓練快速分類。"],
      edges: ["Unknown：先 baseline。", "盲位 tight：偷盲邊界加寬。", "盲位 aggressive：RF 底部收緊。", "ICM heavy：call-off 先收。"],
      mistakes: ["多桌時用情緒 call。", "只因一個 showdown 就大幅改 range。", "忘記看 effective stack，只看自己籌碼。"],
      drills: ["開三桌時，遇到 25BB CO KTo，列出 5 秒內決策順序。", "Unknown BB defend 太寬的證據需要幾手牌？", "你被同一玩家 3bet 兩次，哪些牌先調整？"]
    })],
    ["09-線上多桌/03-Review流程.md", focusedLesson({
      title: "課後 Review 流程：把錯手變成範圍修正",
      scene: "打完 session 後，你不能只看輸贏。MTT 學習要把每個不確定 spot 回到範圍、stack mode、ICM 與對手傾向。",
      concepts: ["先分類 spot，再評估手牌。", "錯誤通常不是單手牌，而是 range 邊界不清楚。", "每次 review 只修一個類型，避免學習發散。", "測驗應回到實戰錯誤，而不是背答案。"],
      process: ["把手牌分成 RFI、BB defend、Rejam、Push/Fold、Postflop、ICM/PKO。", "對照 MTT v2 range 表找 baseline。", "寫下你當下的假設與實際對手資訊。", "標記錯誤類型：開太寬、call-off 太寬、錯過 rejam、postflop SPR 錯。", "用測驗重跑同類型 10 題。"],
      rangeRefs: ["RFI 全表。", "BB defend 全表。", "Rejam / Push-Fold 全表。", "測驗 1-5。"],
      edges: ["輸錢不等於錯，贏錢不等於對。", "All-in spot 要分 first-in 與 call-off。", "ICM spot 必須記 cover 關係。", "Postflop spot 必須記 SPR。"],
      mistakes: ["只 review 最大底池。", "只看結果不看 range。", "把 bad beat 當策略問題。", "一次想改十個 leak。"],
      drills: ["挑 10 手出局前 30 分鐘的牌，分類成六種 spot。", "找出一手 25BB open/fold 錯誤，回到 RFI 表修正。", "找出一手 BB defend 過寬，寫下下次要 fold 的底部。"]
    })]
  ];

  for (const [path, content] of lessons) write(`lessons/${path}`, content);
}

function generateQuizzes() {
  const pages = [
    ["RFI 與 Stack Mode", [
      ["40BB HJ AJo，盲位普通。", "多數可 open，但屬邊界；若左側 3bet 高可收緊。"],
      ["25BB CO KTo，BTN 18BB aggressive。", "偏 mixed / 小心 open-fold 成本；若後手 rejam 高可 fold。"],
      ["15BB UTG KQo。", "可依 push/fold baseline shove，但 bubble 下需收緊。"],
      ["60BB BTN 65s，盲位 tight。", "可 open，盲位過緊提升 steal EV。"],
      ["20BB LJ A7s。", "可 open，但先知道面對 rejam 是否 fold。"],
      ["30BB SB Q9o。", "多數 mixed；看 BB defend / rejam。"],
      ["40BB UTG KJo。", "通常 fold 或極低頻，前位 domination 風險高。"],
      ["25BB BTN 22。", "通常 open，但面對 aggressive rejam 要有 fold 計畫。"],
      ["20BB CO A5s。", "可 open，面對部分 rejam 需看對手與 ICM。"],
      ["15BB BTN K8o。", "多數可 shove，若盲位 call 太鬆則收緊底部。"]
    ]],
    ["BB Defend", [
      ["40BB BB vs BTN min-open，T8s。", "可 defend；有可玩性且對後位 open。"],
      ["40BB BB vs HJ open，K8o。", "多數 fold；dominated 且 OOP realization 差。"],
      ["25BB BB vs BTN open，A5s。", "常可 rejam 或 defend；blocker + fold equity 重要。"],
      ["20BB BB vs CO open，55。", "常可 rejam；call 會降低 fold equity。"],
      ["25BB BB vs HJ open，Q9s。", "多數 call / mixed，對 tight opener 收緊。"],
      ["40BB BB vs CO open，A2o。", "邊界，常 fold；不要只看 A blocker。"],
      ["20BB BB vs BTN open，KTo。", "可 rejam / mixed，依 opener fold to shove。"],
      ["40BB BB vs BTN open，76s。", "可 call，但不要在差 runout 過度追。"],
      ["25BB BB vs CO open，JTo。", "mixed；對寬 opener 可 defend，對 tight opener fold。"],
      ["20BB BB vs HJ open，A9o。", "常屬 rejam 邊界，ICM 下收緊。"]
    ]],
    ["Rejam", [
      ["25BB BTN A5s vs CO open。", "可 rejam / mixed；有 blocker 與 fold equity。"],
      ["20BB SB KTo vs BTN open。", "常可 rejam，若 BTN tight 則降級。"],
      ["15BB BB 33 vs SB open。", "多數可 rejam，SB range 寬且 fold equity 存在。"],
      ["25BB HJ A2s vs UTG open。", "多數 fold；opener 太強且背後多人。"],
      ["20BB BTN QJo vs CO open。", "邊界；看 CO open/fold 與背後 stack。"],
      ["15BB SB A8o vs BTN open。", "常可 rejam。"],
      ["25BB BB K9s vs BTN open。", "可 rejam / call mixed，取決於 BTN range。"],
      ["20BB CO 44 vs HJ open。", "邊界偏緊；背後多人時不要亂推。"],
      ["15BB BTN T9s vs CO open。", "mixed，通常需要 opener 夠寬。"],
      ["25BB SB AQo vs BTN open。", "強 rejam / 3bet value，通常不 fold。"]
    ]],
    ["Push/Fold", [
      ["10BB CO A7o。", "通常 shove。"],
      ["8BB SB Q7o。", "常可 shove，尤其 BB 不過度 call。"],
      ["12BB UTG 44。", "可 shove / mixed，依桌況與 ICM。"],
      ["10BB HJ KJo。", "通常 shove。"],
      ["8BB BTN T8o。", "多數可 shove / mixed，盲位 call 太鬆則收。"],
      ["12BB CO 98s。", "可 shove / mixed。"],
      ["10BB UTG A5s。", "通常 shove。"],
      ["8BB CO K7s。", "多數 shove。"],
      ["12BB BTN 22。", "通常 shove。"],
      ["10BB SB J7o。", "多數可 shove，依 BB call range。"]
    ]],
    ["ICM / PKO", [
      ["Bubble 中碼 AJo 面對 cover 你的大碼 jam。", "比 chip EV 緊，常 fold；ICM 先影響 call-off。"],
      ["大碼 BTN bubble K7s，盲位中碼。", "可高頻施壓，但不要對會反擊的大碼亂開。"],
      ["PKO 你 cover 6BB 短碼，BB A8o 面對 BTN jam。", "可比普通 MTT 寬，但仍看 bounty 價值與 BTN range。"],
      ["PKO 你不 cover 對手，想因 bounty call。", "錯。沒有 cover 就沒有 bounty equity。"],
      ["FT 6 left 中碼 77 面對大碼 CO jam。", "需比 chip EV 緊，避免與 cover 你的 stack 打大波動。"],
      ["Bubble 短碼 8BB BTN Q9s。", "仍要找 fold equity，不能只等 AA。"],
      ["PKO 大碼 CO A5s vs tight 盲位。", "可加壓，A blocker 與 cover pressure 有價值。"],
      ["Mystery bounty 未開獎前。", "不要過度高估 bounty，先接近普通 MTT。"],
      ["FT 大碼 SB any two 推中碼 BB。", "不是自動正確；BB 太短或你被另一大碼制衡時要收。"],
      ["Bubble call shove KQo vs UTG。", "通常比平時更緊，別用 open range 當 call range。"]
    ]],
    ["Postflop SPR", [
      ["30BB BTN open BB call，flop K72r，你 KQ。", "低中 SPR 可小注建立價值，先規劃 turn 是否接近承諾。"],
      ["40BB BTN open BB call，flop 987ss，你 A5s 無同花。", "多數不高頻 c-bet；BB nut advantage 較高。"],
      ["25BB CO open BB call，flop A84r，你 AQ。", "常可小注，下注後 turn SPR 低，要準備 value commit。"],
      ["40BB 3bet pot，QQ 在 KJ9ss。", "不是自動打光；A/K high 與濕牌面需控制。"],
      ["20BB BTN open BB call，flop Q84r，你 QJ。", "低 SPR 下可進入承諾，但 ICM / 對手 range 會影響。"],
      ["BB defend 76s，flop 852 two-tone。", "有 combo draw 可 check-raise，且要有 turn all-in 計畫。"],
      ["Multiway A72r，你是 BTN 空氣牌。", "多人底池不適合全 range c-bet。"],
      ["Flop check back 後 turn A，BB 是否可 probe？", "要看 turn 是否改善 BB range；A 通常偏向 preflop aggressor。"],
      ["River missed draw 無 blocker。", "不要情緒 bluff，缺少 fold equity 與 blocker。"],
      ["18BB nut flush draw + overcard。", "常可用低 SPR 走半詐唬承諾線。"]
    ]],
    ["線上多桌與複盤", [
      ["Unknown player 第一手對局。", "先用 baseline，不因資訊不足亂 exploit。"],
      ["盲位 fold to steal 明顯偏高。", "後位 RFI 的 M hand 可加頻。"],
      ["BB 20BB rejam 很高。", "CO/BTN 的 RF 底部要收掉。"],
      ["你被同一玩家 3bet 兩次。", "先記錄樣本，不要立刻重寫整套 range。"],
      ["Session review 第一件事。", "分類 spot：RFI、BB defend、Rejam、Push/Fold、Postflop、ICM/PKO。"],
      ["一手牌贏了大底池。", "仍要 review range 和 line，結果不代表策略正確。"],
      ["Bubble 出局手。", "先標 cover 關係，再判斷 call-off 是否過寬。"],
      ["短碼連續 fold 到 5BB。", "檢查是否錯過 12BB/10BB first-in spot。"],
      ["BB defend 過寬。", "回到 vs HJ/CO/BTN 表，標最低 defend 邊界。"],
      ["Postflop 大底池錯誤。", "先重建 flop SPR 和 turn commitment。"]
    ]],
    ["範圍表邊界判斷", [
      ["R+ 和 R 差別。", "R+ 是強制或高頻，R 是標準 baseline。"],
      ["M hand 是否一定要打？", "不是；M 是依盲位、ICM、對手傾向調整。"],
      ["RF 的真正意思。", "可 open，但面對 all-in 多數 fold。"],
      ["RC 的真正意思。", "open 後面對 all-in 可 call-off。"],
      ["RJ 和 AI 差別。", "RJ 是面對 opener rejam，AI 是 first-in shove。"],
      ["Push range 能否拿來 call shove？", "不能，call shove 通常更緊。"],
      ["BB defend 表為何不能全 call？", "OOP realization 差，短碼還會損失 fold equity。"],
      ["A5s 為何常是邊界核心？", "有 blocker、可成 nut flush / wheel，但被 call 時仍需 equity。"],
      ["小對 22-44 為何常出現在短碼推注？", "有 fold equity 時可直接實現 equity，call 看 flop 常較差。"],
      ["ICM 先調哪一塊？", "先調 call-off，再調最底部 open / rejam。"]
    ]]
  ];
  pages.forEach(([title, items], pageIndex) => {
    const start = pageIndex * 10 + 1;
    const body = items.map(([q, a], i) => `## Q${start + i}

${q}

**答案：** ${a}`).join("\n\n");
    write(`quizzes/${String(pageIndex + 1).padStart(2, "0")}-${safeName(title)}.md`, `# 測驗 ${pageIndex + 1}：${title}

${body}`);
  });
}

resetDir("lessons");
resetDir("ranges");
resetDir("quizzes");
generateLessons();
generateFocusedLessons();
generateRfiRanges();
generateBbDefendRanges();
generateRejamRanges();
generatePushFoldRanges();
generateQuizzes();

write("ranges/schema.md", `# MTT v2 Range JSON Schema

Range JSON 是 MTT v2 的 source of truth。每張表必須包含：

- \`id\`
- \`title\`
- \`game\`
- \`table\`
- \`spot\`
- \`stackBb\`
- \`position\`
- \`legend\`
- \`hands\`
- \`notes\`
- \`boundary\`

\`hands\` 只需要列出非 fold；renderer 會把其他 hand 視為 \`F\`。`);

console.log("Generated MTT v2 lessons, ranges, and quizzes.");
