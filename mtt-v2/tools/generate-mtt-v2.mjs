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

function coreLesson({ title, purpose, body, rangeRefs, examples, checkpoints, drills }) {
  return `# ${title}

## 本章要解決的問題

${purpose}

## 主線教材

${body.trim()}

## 本章要用的 Range 表

${rangeRefs.map((x) => `- ${x}`).join("\n")}

## 實戰手牌串講

${examples.map((x, i) => `### Hand ${i + 1}\n\n${x}`).join("\n\n")}

## 讀完要能回答

${checkpoints.map((x) => `- ${x}`).join("\n")}

## 練習

${drills.map((x, i) => `${i + 1}. ${x}`).join("\n")}
`;
}

function generateCoreLessons() {
  const lessons = [
    ["00-主線課程/00-怎麼學這套MTT.md", coreLesson({
      title: "怎麼學這套 MTT：從一手牌到整場比賽",
      purpose: "這套課不是一堆獨立文章，而是一條固定決策線。你每次打牌都照同一個順序：先看有效籌碼，再看 action，接著找 range 分層，最後才用桌況、ICM、PKO 做調整。",
      body: `
你之前會覺得教材無法學，是因為它把知識切成太多小片段。MTT 的核心不是知道很多名詞，而是每一手牌都能用同一套流程處理。這版教材只保留主線課程，範圍表是工具，測驗是檢查點，不再讓學習路線被碎片打散。

第一個固定問題是有效籌碼。線上 BBA MTT 中，真正決定策略的是 effective stack，不是你帳面上總共有多少 BB。如果你有 60BB，BB 只有 20BB，你跟 BB 對抗時就是 20BB 策略。這會直接改變 open、rejam、BB defend、postflop commitment。

第二個固定問題是 action 類型。所有 preflop 先分成四種：first-in、面對 open、面對 all-in、已進入 postflop。first-in 看 RFI 或 push/fold；面對 open 看 BB defend、3bet、rejam；面對 all-in 不能拿 open range 直接 call；postflop 要回到 preflop range 與 SPR。

第三個固定問題是 range 分層。R+ 是高頻或強制打，R 是標準 baseline，M 是桌況調整，RF 是 raise-fold，RC 是 raise-call all-in，RJ 是 rejam，AI 是 first-in shove。你不是背每一格，而是先知道每個標籤代表什麼風險。

第四個固定問題是調整。調整只動邊界，不重寫整套策略。盲位過緊時，後位 M hand 加頻；盲位 rejam 高時，RF 底部收掉；ICM 壓力高時，先收 call-off，再收邊界 open；PKO 只有在你 cover 對手時才讓 bounty 影響 call。

學習順序是：讀一章主線，開本章 range 表，做三手串講，最後做測驗。不要先從 69 張表開始背，這會重新變成碎片學習。你要先理解「為什麼這個 spot 要這樣分層」，再把範圍表當作標準答案的索引。
      `,
      rangeRefs: ["所有 RFI 表作為 first-in 起點。", "BB defend、Rejam、Push/Fold 表作為不同 action 類型的分流工具。"],
      examples: [
        "25BB BTN KJo，前面 fold 到你。你不是先問 KJo 強不強，而是先問：這是 first-in，effective stack 25BB，BTN，盲位是否有 rejam stack。查 25BB BTN RFI 後，KJo 多數是 RF 或標準 open，但若 BB 20BB aggressive，底部要收。",
        "20BB BB 55 面對 CO open。這不是保護盲注問題，而是面對 open、effective stack 20BB、OOP realization 差。查 BB defend vs CO 與 20BB rejam，55 常比 call 更適合 rejam，因為你用 fold equity 直接實現牌力。",
        "10BB CO A7o，前面 fold 到你。這是 first-in short stack，不是 call shove。查 10BB CO Push/Fold，A7o 通常可 shove。但如果 bubble 中盲位 call 太鬆，要收底部 offsuit。"
      ],
      checkpoints: ["你能不能在 5 秒內分辨這手是 RFI、BB defend、rejam、push/fold、call-off 還是 postflop。", "你能不能說出 RF 和 RC 的差別。", "你能不能解釋為什麼 push range 不能直接當 call shove range。"],
      drills: ["任選 10 手牌，只分類 action 類型，不判斷對錯。", "打開任一 RFI 表，把 R+、R、M、RF、RC 各找三手牌。", "用一手牌寫出：effective stack、action 類型、range 表、調整原因。"]
    })],
    ["00-主線課程/01-有效籌碼與StackMode.md", coreLesson({
      title: "有效籌碼與 Stack Mode：MTT 的主控旋鈕",
      purpose: "同一手 AJo 在 60BB、30BB、20BB、10BB 完全不是同一手牌。本章把所有深度串成一條連續邏輯，避免你把某個表拿去套全部情境。",
      body: `
60BB 是仍能打 postflop 的深度。你可以 open 小對、suited connector、部分 suited gapper，因為有位置時能實現 equity，也有 implied odds。但 60BB 不是 cash game 100BB，MTT 的籌碼價值仍不線性，尤其接近 bubble 或 pay jump 時，不能只用深碼想法打光。

40BB 是標準中碼。這時你仍然有 open/fold 空間，但 3bet pot 的 SPR 已經下降，後位 aggressive player 會開始用 3bet 或 squeeze 懲罰太寬的 open。前位要收掉 dominated offsuit broadway，後位可以攻擊盲位，但要知道被 3bet 或 rejam 後的 continue range。

30BB 是轉換區。你不能亂 3bet/fold，也不能只因為 BTN 有位置就亂開。30BB 的 open 還可以小 raise，但每一次 open 都要看盲位是否有 15-25BB rejam stack。很多原本深碼可以靠 postflop 實現的手牌，在 30BB 會變得尷尬。

25BB 是壓力區。這裡最重要的概念是 open 前先知道被 jam 要不要跟。RFI 表中的 RC 與 RF 開始變成核心語言。你不是問「這手能不能開」，而是問「這手開了之後，對哪一種 rejam 要跟，對哪一種要棄」。

20BB 是短中碼。很多 call 會變差，因為 call 之後 SPR 很低，位置外很難實現 equity。你要更常用 rejam 把決策推回給 opener。這個深度的錯誤通常是用 40BB 的可玩性手牌去開，或用 BB call 去保護盲注，結果錯過 fold equity。

15BB 以下進入短碼主導。first-in shove、rejam、fold equity 變成主線。短碼不是等 AA，因為等牌會讓你從 15BB 掉到 8BB，再掉到 5BB，最後連 fold equity 都沒有。你要在還能讓對手 fold 的時候主動拿底池。
      `,
      rangeRefs: ["60BB / 40BB / 30BB / 25BB / 20BB / 15BB RFI 全位置。", "25BB / 20BB / 15BB Rejam。", "12BB / 10BB / 8BB Push/Fold。"],
      examples: [
        "60BB CO 76s，兩盲 tight。這手可以 open，因為有 position、有 implied odds，盲位過緊也提高 steal EV。但若 BTN 3bet 很高，76s 會從 open 變成 fold 或低頻。",
        "25BB BTN A8o，BB 20BB aggressive。A8o 看起來能偷，但被 rejam 後很不舒服。這時要看它是 RF 還是 M，若盲位推太高，A8o 這類底部 offsuit ace 要收。",
        "12BB HJ KJo。這不是 25BB open/fold 的 spot，而是 push/fold。若前面 fold 到你，KJo 多數可 shove；但如果是面對 UTG shove，KJo 不能因為自己可推就自動 call。"
      ],
      checkpoints: ["你能不能說出 60、40、30、25、20、15、10BB 的策略差異。", "你能不能解釋為什麼 25BB open 前要先知道 call-off。", "你能不能分辨 first-in shove 和 call shove。"],
      drills: ["用 AJo 分別寫出 60BB、30BB、20BB、10BB 的基本計畫。", "列出三手 25BB BTN 可 open 但不想 call rejam 的牌。", "找出一手你過去 15BB 還 min-raise/fold 的錯誤。"]
    })],
    ["00-主線課程/02-RFI完整主線.md", coreLesson({
      title: "RFI 完整主線：不是背開局表，是先規劃被反擊",
      purpose: "RFI 是所有 MTT preflop 的起點，但它不是獨立表格。本章把前位、中位、後位、SB 與 stack mode 串在一起，讓你知道每次 first-in 的完整計畫。",
      body: `
RFI 的第一條線是位置。UTG/LJ 不是偷盲位置，range 必須能承受後面多人 3bet、cold call、squeeze。HJ 是半偷盲，CO 開始大量攻擊盲位，BTN 是最有位置優勢的 steal spot，SB 則只剩 BB 一人但出位置外。

前位 RFI 的錯誤通常是 dominated offsuit broadway。KJo、QJo、A9o 這些牌在前位看似不差，但被後位 call 或 3bet 時很難實現 equity。前位應該偏向強 broadway、suited broadway、中高對子。深碼時可以加小對與少量 suited connector，短碼時要更注重被推後的計畫。

中後位 RFI 的核心是偷盲與反偷盲的平衡。CO/BTN 可以打更多 M hand，但每一手都要看盲位 stack。如果盲位是 20BB aggressive player，你的 RF 底部會被懲罰；如果盲位過緊，你的 M hand 可以加頻。

SB RFI 不能直接用 BTN 思維。SB 只剩 BB 一個對手，所以 steal incentive 很高，但你沒有 position，BB defend 太鬆時，弱 offsuit hand 會很難打。SB 對 tight BB 可以放寬，對會 rejam 的 BB 要先收 RF。

RFI 的第二條線是 stack。60BB 可以用可玩性賺 postflop，40BB 要重視 3bet pot，30BB 要小心 rejam stack，25BB 必須分 RC/RF，20BB 底部收緊，15BB 常進入直接 shove 或非常清楚的 raise-call。
      `,
      rangeRefs: ["RFI 60BB 全位置。", "RFI 40BB 全位置。", "RFI 25BB / 20BB / 15BB 全位置。"],
      examples: [
        "40BB UTG AJo。AJo 不是自動棄，但在 tough table 或後方 3bet 高時要降頻。原因是前位 range 被檢驗時，AJo 會被 AQ+、AK、JJ+ 壓制。",
        "25BB CO KTo，BTN 18BB aggressive，BB 24BB aggressive。KTo 可能在 baseline 邊界，但兩個 rejam stack 會讓它變差。這手不是問 KTo 強不強，而是問 open 後被 jam 是否能承受。",
        "20BB SB Q9s 對 tight BB。這手因為只剩一個對手且 BB 過緊，可以提高 open 或 shove 頻率。若 BB loose call，Q9s 的價值下降，因為你 OOP 實現 equity 差。"
      ],
      checkpoints: ["你能不能用一句話說出每個位置 RFI 的目的。", "你能不能在 open 前先標記 RC、RF、M。", "你能不能根據盲位 tight / aggressive 調整後位 M hand。"],
      drills: ["打開 25BB CO、BTN、SB RFI，各找 5 手 RF。", "列出 UTG 不應該用後位邏輯開的 5 手牌。", "用同一手 KTo 比較 HJ、CO、BTN、SB 的差異。"]
    })],
    ["00-主線課程/03-BB防守完整主線.md", coreLesson({
      title: "BB 防守完整主線：價格好，不代表什麼都要守",
      purpose: "BB 已投入盲注，又在 BBA 結構下有更好價格，但你出位置外，realization 差。本章把 pot odds、realization、call、3bet、rejam 放回同一個框架。",
      body: `
BB 防守第一個陷阱是「我已經放了大盲，所以我要保護」。這是錯的。你已投入的盲注已經是沉沒成本，真正要比較的是 call、fold、3bet、rejam 哪個 EV 更好。BBA 讓底池更大，確實提高防守誘因，但 OOP realization 仍然很差。

面對 HJ open，BB 要最謹慎。HJ range 仍相對強，弱 Kx、弱 Qx、offsuit ace 很容易 dominated。40BB 可以 call 一些 suited playable hand，20-25BB 時則更常把中小對、suited Ax、部分 broadway 放進 rejam 候選。

面對 CO open，BB 可以比對 HJ 寬，因為 CO range 更寬。這時 A5s、A4s、KTs、QJs、中小對的反擊價值上升。40BB 可保留 call range，25BB 以下更需要用 rejam 把 fold equity 拿回來。

面對 BTN open，BB 的防守最寬，但也最容易過度。BTN range 寬，不代表 BB 可以用所有 suited 和 offsuit trash call。T8o、J8o、Q8o 這類手牌有價格，但 realization 差，短碼時更可能變成 fold 或 rejam，而不是自動 call。

BB 防守第二個陷阱是用 cash game BB defend 套 MTT。MTT 有 ICM、短碼、pay jump、BBA、非線性籌碼價值。你不能只因為 pot odds 看起來夠就 call，尤其 20BB 以下，一次錯的 call 會讓你失去下一手 rejam 的 fold equity。
      `,
      rangeRefs: ["40BB / 25BB / 20BB BB defend vs HJ。", "40BB / 25BB / 20BB BB defend vs CO。", "40BB / 25BB / 20BB BB defend vs BTN。"],
      examples: [
        "40BB BB K8o vs HJ open。這手通常 fold。K8o 對 HJ range dominated 嚴重，而且 OOP realization 差，即使價格看起來不錯也不值得。",
        "25BB BB A5s vs BTN open。A5s 有 blocker，也有 nut flush / wheel potential，可以 call、3bet 或 rejam，取決於 BTN open/fold 與 ICM。對過度 steal 的 BTN，rejam 價值高。",
        "20BB BB 55 vs CO open。call 會讓你進低 SPR OOP spot，rejam 常更乾淨，因為你用 fold equity 把 CO 的 RF range 打掉。"
      ],
      checkpoints: ["你能不能分辨 vs HJ、vs CO、vs BTN 防守寬度。", "你能不能說出為什麼 20BB call 小對常比 rejam 差。", "你能不能找出哪些 BB defend hand 是因價格好但 realization 差。"],
      drills: ["各找三手 BB vs HJ 應 fold、BB vs BTN 可 defend 的牌。", "用 A5s 比較 40BB call、25BB rejam、20BB ICM spot。", "回顧一手你在 BB 過度防守的牌，寫出當時 opener 位置。"]
    })],
    ["00-主線課程/04-Rejam與反偷盲.md", coreLesson({
      title: "Rejam 與反偷盲：讓 opener 為 RF 付代價",
      purpose: "Rejam 不是看到 blocker 就推，也不是只等 premium。它是 15-25BB 最重要的反偷盲武器，核心是 fold equity、opener range、背後玩家、ICM 壓力。",
      body: `
Rejam 的價值來自兩部分：被 call 時的 equity，和 opener fold 時你直接拿下底池。很多玩家只看自己牌力，忽略 fold equity；也有人只看 blocker，對 tight opener 亂推。正確做法是先判斷 opener 的位置與 range。

對 CO open rejam 要比對 BTN 更謹慎，因為 CO range 比 BTN 強，背後還常有 BTN、SB、BB 未行動。A5s、55、KTs 這類牌可以成為候選，但前提是 CO 有足夠 raise-fold 區，且背後沒有會 overcall 的大碼。

對 BTN open，rejam 可以更寬。BTN steal 頻率高，RF hand 多，Axs、KTs、QJs、小對都有更高價值。但如果 BTN 是短碼或 tight player，或已經 pot committed，你的 fold equity 會下降，M hand 要收。

對 SB open，BB rejam 最寬，因為只剩兩人，SB 會有最多偷盲底部。這時很多 Kx、Qx、suited connector、小對都有反擊價值。但 ICM 仍然會改變結論：如果 SB cover 你且 bubble 壓力重，邊界 rejam 要收。

Rejam 的最大錯誤是忽略背後玩家。你在 BTN 面對 CO open，後面還有 SB/BB；你在 CO 面對 HJ open，後面還有 BTN/SB/BB。背後大碼越多，邊界越要收。背後短碼越多，也要考慮他們 overcall 或 squeeze 的可能。
      `,
      rangeRefs: ["25BB Rejam vs CO / BTN / SB。", "20BB Rejam vs CO / BTN / SB。", "15BB Rejam vs CO / BTN / SB。", "25BB / 20BB RFI 中的 RF 與 RC 分層。"],
      examples: [
        "25BB BTN A5s vs CO open，SB/BB 都大碼。A5s 有 blocker，但背後大碼會降低邊界 rejam 舒適度。若 CO tight，這手要收；若 CO open/fold 高，才可推。",
        "20BB SB KTo vs BTN open。BTN range 寬，KTo 有 blocker 與可用 equity，常可 rejam。若 BTN call shove 太鬆，KTo 這類 dominated 風險上升，要降頻。",
        "15BB BB 33 vs SB open。這是經典 rejam spot。SB range 寬，33 被 call 時有 equity，且 fold equity 可直接拿底池。除非 ICM 極重或 SB 太 tight，通常不該只 call。"
      ],
      checkpoints: ["你能不能解釋 rejam 的兩種收益來源。", "你能不能說出 opener 越後位，rejam 為何越寬。", "你能不能在 rejam 前先看背後玩家與 ICM。"],
      drills: ["用 25BB、20BB、15BB 各寫一手 rejam 候選。", "列出五手有 blocker 但不應對 tight CO rejam 的牌。", "用同一手 A5s 比較 vs CO、vs BTN、vs SB。"]
    })],
    ["00-主線課程/05-短碼PushFold與CallOff.md", coreLesson({
      title: "短碼 Push/Fold 與 Call-off：最容易混淆的兩張表",
      purpose: "短碼最常犯的錯不是推太寬，而是把 first-in shove range 拿去 call 別人的 all-in。本章把 12BB、10BB、8BB 的主動推注與被動跟注分開。",
      body: `
短碼 first-in shove 的邏輯是 fold equity 加上底池 dead money。BBA MTT 的底池比傳統 ante 結構更值得搶，尤其 BTN、SB、CO。你不是等 AA，而是在仍有 fold equity 時選擇對手難跟的 spot。

12BB 仍有些彈性，但學習時先用 push/fold 建立底線。前位要保守，後位可以推更多 Ax、Kx、小對、suited broadway。10BB 更接近純 push/fold，小 raise/fold 的成本太高。8BB 時 fold equity 正在消失，後位與 SB 要更主動。

Call-off 完全不同。你 first-in shove 可以讓對手 fold，但 call 別人的 all-in 沒有 fold equity。這就是為什麼 push range 一定比 call shove range 寬。很多玩家 10BB CO A7o 可推，卻誤以為 10BB 面對 HJ shove 也可用 A7o call，這是大錯。

短碼也要受 ICM 影響，但不能因為 bubble 就完全停擺。ICM 會讓 call-off 明顯收緊，也會讓某些邊界 shove 降頻，但如果你一路等到 5BB，失去 fold equity，反而更難翻身。短碼策略是找 first-in，而不是等 premium。

短碼調整很簡單：盲位 call 太鬆，收掉最低 offsuit Kx/Qx/Jx；盲位過緊，保留更多 blocker 和 suited hand；下一手要進盲位時，邊界可提高頻率；pay jump 極大時，先收 call-off。
      `,
      rangeRefs: ["12BB Push/Fold 全位置。", "10BB Push/Fold 全位置。", "8BB Push/Fold 全位置。", "ICM 章節中的 call-off 調整。"],
      examples: [
        "10BB CO A7o，前面 fold 到你。這是 first-in，可依表 shove。若兩盲 call 太鬆，底部 A7o 類牌要稍微收，但不應自動棄到只等 premium。",
        "8BB SB Q7o，BB tight。這是非常有價值的 first-in spot，Q7o 對 tight BB 常可 shove。若 BB 是 loose caller，Q7o 才降頻。",
        "12BB BB KJo 面對 HJ shove。不要因為 KJo 在某些位置可 first-in shove 就 call。面對 HJ shove 時 range 強，KJo 很容易被 dominated。"
      ],
      checkpoints: ["你能不能分辨 first-in shove 和 call shove。", "你能不能說出 12BB、10BB、8BB 的差異。", "你能不能在 bubble 下仍找到合理 first-in spot。"],
      drills: ["打開 10BB CO Push/Fold，列出五手可 first-in 但不能 call HJ shove 的牌。", "用 8BB BTN、8BB SB 各找三手邊界 shove。", "回顧一手你短碼等太久的牌，寫出前兩圈錯過的 spot。"]
    })],
    ["00-主線課程/06-PostflopSPR主線.md", coreLesson({
      title: "Postflop SPR 主線：MTT 翻後不是 cash game 翻後",
      purpose: "MTT postflop 的關鍵是 SPR、range advantage、nut advantage 與 ICM。你不需要把翻後拆成很多孤立技巧，而要知道 preflop 決策如何一路影響 flop、turn、river。",
      body: `
Postflop 第一個問題是 SPR。30BB BTN open BB call，flop 後的 top pair 和 100BB cash game 的 top pair 不是同一件事。SPR 越低，top pair、overpair、強 draw 越容易進入承諾；SPR 越高，單對牌越不能無腦三街。

第二個問題是牌面優勢。BTN open BB call，A72r、K83r 這類高乾牌通常偏向 BTN range，適合小注高頻。987ss、T86 two-tone、654 這類中低連張濕牌會提升 BB 的兩對、順子、pair+draw，preflop aggressor 不應全 range c-bet。

第三個問題是下注後下一街。很多 MTT 翻後錯誤不是 flop 錯，而是 flop bet size 讓 turn 剩 awkward stack。下注前先想：如果我 bet 1/3 pot，turn SPR 是多少；如果 turn blank，我是否願意 shove；如果被 raise，我是否已經承諾。

第四個問題是 multiway。多人底池時 bluff 頻率下降，top pair weak kicker 降級，nut draw 和 nutted value 重要性上升。你不能用 heads-up BTN vs BB 的 c-bet 頻率套在 CO open、BTN call、BB call 的三人底池。

第五個問題是 river。River value 先問更差牌是否會 call；river bluff 要有 blocker 和對手可棄牌區。對 under-bluff pool，你可以更常 fold bluff-catcher；對 calling station，你要少 bluff，多 thin value。但 ICM 下薄 value 與 bluff-catch 都要收。
      `,
      rangeRefs: ["BTN/CO/HJ RFI 表回推 preflop aggressor range。", "BB defend vs HJ/CO/BTN 回推 caller range。", "3bet / Rejam 標籤作低 SPR 承諾參考。"],
      examples: [
        "30BB BTN KQ open，BB call，flop K72r。BTN 有 range advantage，KQ 在低 SPR 下常可小注建立價值，turn 很多 runout 會接近承諾。",
        "40BB BTN A5s open，BB call，flop 987ss，且你沒有同花。這是 BB nut advantage 強的牌面，不該高頻空氣 c-bet。你的 A5s 多數應 check back 或選擇非常低頻策略。",
        "25BB BB 76s defend vs BTN，flop 852 two-tone。你有 pair+draw 或 combo draw 時，check-raise 可以直接建立 fold equity，但 raise 前要知道 turn 是否 all-in。"
      ],
      checkpoints: ["你能不能先算 SPR 再決定是否承諾。", "你能不能分辨 A72r 和 987ss 對 BTN/BB range 的差異。", "你能不能說出 multiway 為什麼少 bluff。"],
      drills: ["選三手 BTN vs BB SRP，分別標記乾牌、濕牌、中性牌。", "任選一手 25BB flop c-bet，算下注後 turn SPR。", "找一手 river bluff，寫出你的 blocker 是否真的有用。"]
    })],
    ["00-主線課程/07-ICM與FinalTable.md", coreLesson({
      title: "ICM 與 Final Table：先改 call-off，再改 open",
      purpose: "ICM 不是讓你完全不打，而是讓你知道籌碼不是線性價值。本章把 bubble、中碼、大碼、短碼、final table pay jump 放成一套調整流程。",
      body: `
ICM 最先影響 call-off。因為 call all-in 會讓你承擔出局風險，而 open 或 first-in shove 通常仍保留 fold equity。這就是為什麼 bubble 中碼 AJo 面對 cover 你的大碼 jam，可能要比 chip EV 緊很多；但同一個中碼在 BTN first-in，仍可對 tight 盲位施壓。

中碼是 ICM 最容易犯錯的 stack。你不是最短，不需要亂賭；你也不是最大，不能隨便跟 cover 你的大碼打光。中碼應避免跟大碼打邊界 all-in，同時對會過度棄牌的中短碼施壓。

大碼可以施壓，但不是 any two 印鈔。大碼真正的優勢是 cover 對手，讓中碼不敢輕易 call-off。若另一個大碼在後面，或盲位是會反制的玩家，你仍要收掉底部。大碼亂開被另一個大碼 3bet，反而會把自己的籌碼優勢送掉。

短碼不能只等 pay jump。短碼在 bubble/FT 要找 first-in fold equity，尤其 BTN、SB、CO。ICM 會讓你的 call-off 更緊，但如果你不主動找 spot，等到 4-5BB 時，對手會被迫用更寬 range call，你的 fold equity 消失。

Final table 要先列 stack 地圖。誰 cover 誰，誰被誰 cover，誰是短碼，下一個 pay jump 差多少。沒有這張地圖，你看任何 range 表都會誤用。FT 的 preflop 表只能當 chip EV baseline，真正決策要按 cover 關係重算風險。
      `,
      rangeRefs: ["RFI / Rejam / Push-Fold 表都作 chip EV 起點。", "ICM spot 先調 call-off，再調 RF 與 M 邊界。"],
      examples: [
        "Bubble 24BB HJ AJo，CO 大碼 jam。Chip EV 下 AJo 可能接近，但 ICM 下你是中碼且被 cover，call-off 要大幅收緊，常會 fold。",
        "Bubble 35BB BTN K7s，兩盲都是 18-22BB 中碼且偏緊。這是大碼施壓 spot，K7s 可作 open 候選。但若 BB 是另一個大碼，不能用同樣寬度。",
        "FT 7 left，8BB CO Q9s，前面 fold 到你。雖然有 pay jump，但你仍需要找 first-in。若後面中碼怕出局，Q9s 可能是合理 shove；若盲位大碼 loose call，則收。"
      ],
      checkpoints: ["你能不能說出 ICM 為什麼先影響 call-off。", "你能不能畫出一桌 FT 的 cover 關係。", "你能不能分辨大碼施壓和大碼亂開。"],
      drills: ["用三個 stack：大碼 60BB、中碼 24BB、短碼 8BB，寫出各自 bubble 任務。", "找一手你 bubble call-off 的牌，重新按 ICM 評估。", "FT 任選 6 人 stack，標出誰能施壓誰。"]
    })],
    ["00-主線課程/08-PKO主線.md", coreLesson({
      title: "PKO 主線：Bounty 只改邊界，不會把爛牌變好牌",
      purpose: "PKO 的學習常被賞金誘惑打亂。本章建立最重要的判斷順序：先看是否 cover，再估 bounty，再看牌力與背後玩家。",
      body: `
PKO 第一個問題永遠是：你有沒有 cover 對手。只有你 cover 對手，才有 bounty equity。如果你不 cover 對手，賞金不會進你的口袋，就不能拿 bounty 當理由去 call。這一點比任何複雜公式都重要。

第二個問題是 bounty 相對籌碼價值。早期 PKO bounty 可能佔總價值比例高，後期籌碼與 pay jump 影響更大。你不能看到 bounty 就用任何 Ax/Kx call。Bounty 只會讓接近臨界的 call 變成可跟，不會把 dominated trash 變成好牌。

第三個問題是 isolation。你 cover 短碼時，rejam 或 isolate 可以讓其他人 fold，自己單挑短碼拿 bounty。這在大碼或中大碼時很重要。但若背後有更大碼會 overcall，你的 isolation EV 會下降，邊界 hand 要收。

第四個問題是 dominated hand。A8o、KTo、QJo 這些牌在 bounty 誘惑下很常被高估。它們可能因 bounty 進入 call 範圍，但一旦對手 jam range 偏強，被 dominated 的代價很大。PKO 放寬的是邊界，不是放棄牌力結構。

PKO 和 ICM 會同時存在。你 cover 短碼時可以放寬；你被大碼 cover 時仍要保護出局風險；FT PKO 還有 pay jump。最終流程是：cover 關係，bounty 價值，chip EV range，ICM 壓力，背後玩家。
      `,
      rangeRefs: ["Rejam 表中的 M hand 是 PKO 最常調整區。", "Push/Fold 表作短碼 first-in 起點，不可直接當 PKO call 表。", "BB defend vs BTN/SB 可用來評估 cover 短碼 jam。"],
      examples: [
        "PKO 你 32BB，BTN 8BB jam，你 BB A8o 且 cover。A8o 在普通 MTT 可能邊界，但 bounty 可讓它更常 call。仍要看 BTN 是否太 tight，以及 SB 是否已入池。",
        "PKO 你 12BB，不 cover CO 20BB，CO jam，你 KJo。沒有 cover 就沒有 bounty equity，不能用賞金理由 call。這手回到普通 MTT call-off，而且通常很緊。",
        "PKO 你 55BB 大碼，BTN 7BB open，SB 22BB，BB 18BB。你在 CO/BTN 後位若能 isolate 短碼，要看背後中碼是否會 overcall。若背後過緊，M hand 可加壓。"
      ],
      checkpoints: ["你能不能在 PKO 第一秒先問是否 cover。", "你能不能說出 bounty 只改邊界的意思。", "你能不能分辨 isolate bounty 和亂追 bounty。"],
      drills: ["列出三手 cover 短碼可放寬 call 的牌。", "列出三手不 cover 時不該因 bounty call 的牌。", "用一手 PKO 牌寫出 cover、bounty、ICM、背後玩家四個欄位。"]
    })],
    ["00-主線課程/09-線上多桌Default與Exploit.md", coreLesson({
      title: "線上多桌 Default 與 Exploit：少調整，但調對地方",
      purpose: "線上多桌資訊不完整，時間也少。你需要先有 default，再把 exploit 限制在邊界牌，避免因一兩手牌把整套策略改壞。",
      body: `
多桌時最重要的是流程穩定。每手先判斷 action 類型與 effective stack，再開對應 range。Unknown player 先用 baseline，不要因為感覺調整。你真正能調的是 M、RF、邊界 call-off，不是整套 range。

盲位過緊是最直接的 exploit。BTN、CO、SB 的 M hand 可以加頻，尤其 Kxs、Qxs、部分 offsuit broadway、低 suited connector。但如果盲位只是樣本少，不要把一次 fold 當成長期 tight。

盲位 rejam 過高時，你要收 RF 底部。很多人知道 aggressive blind 會推，卻還是照 baseline 開 K7o、Q8o、弱 ATo，結果變成反覆 raise/fold。正確做法是把最難 call-off 的底部拿掉，保留能 raise-call 或 blocker 更好的牌。

對 under-bluff player，river bluff-catch 要降低。線上低中級別玩家很多 river 大注不足 bluff，尤其 ICM 下更少 bluff。你不需要每次證明對手有 bluff，當 pool 明顯 under-bluff，fold 第二對、弱 top pair 是盈利調整。

對 calling station，少 bluff，多 thin value。這種玩家會讓你的 c-bet bluff、river bluff EV 下降，但會讓 top pair good kicker、overpair、兩對、set 的 thin value 增加。調整方向要跟對手錯誤一致，不要只用「他很爛」當理由亂打。
      `,
      rangeRefs: ["所有 RFI 表中的 M / RF 是 exploit 調整入口。", "BB defend 表用來處理 opener 過寬或過緊。", "Postflop SPR 章作下注與承諾基準。"],
      examples: [
        "25BB BTN K7o，SB/BB 都 fold to steal 高。K7o 可能從 fold 或低頻 M 變成可 open，但如果 BB 有 20BB 且 rejam 高，這手反而要收。",
        "30BB CO QTo，BTN 3bet 高、BB rejam 高。這不是舒服 steal，QTo 容易被兩種壓力懲罰。你的調整是收底部，而不是因為 CO 就照開。",
        "River 你拿 second pair 面對 tight player pot bet。若對手 pool under-bluff，這種 bluff-catch 不需要逞強。你把錢省下來，就是 exploit。"
      ],
      checkpoints: ["你能不能分辨哪些牌是可調整邊界。", "你能不能避免用單一 showdown 重寫策略。", "你能不能把對手錯誤對應到正確 exploit。"],
      drills: ["列出三種盲位類型：tight、loose call、aggressive rejam，分別怎麼調 BTN RFI。", "找三手 river bluff-catch，標出對手是否 under-bluff。", "用一手 CO open 寫出 BTN/盲位不同玩家類型下的調整。"]
    })],
    ["00-主線課程/10-Range表使用方法.md", coreLesson({
      title: "Range 表使用方法：先看標籤，再看手牌",
      purpose: "Range 表不是要你背 169 格，而是要你用標籤建立決策分層。本章教你如何把 69 張表變成可用工具，而不是新的碎片負擔。",
      body: `
讀 range 表時不要先盯著某一手牌。先看 spot、stack、position。你在 25BB BTN first-in，就看 25BB BTN RFI；你在 20BB BB 面對 CO open，就看 20BB BB defend vs CO；你 15BB 面對 BTN open，要看 15BB rejam vs BTN，而不是 15BB RFI。

第二步看標籤。R+ 和 R 是主要進攻區，M 是桌況調整區，F 是棄牌，C 是 call/defend，3B 是非 all-in 3bet，RC 是 raise-call all-in，RF 是 raise-fold，RJ 是 rejam，AI 是 first-in shove。標籤比顏色重要，因為顏色只幫你掃描，真正的策略在文字。

第三步看邊界。每張表都有 boundary。邊界手牌才是你真正要練的部分，因為 AA、KK、AKs 幾乎不會讓你困惑。MTT 贏率通常差在 A8o、KTo、Q9s、55、A5s、T9s 這些你容易過度或不足的牌。

第四步做調整。M hand 的調整來源只有幾種：盲位太緊、盲位太鬆、盲位 rejam 太高、opener 太 tight、ICM 壓力、PKO cover、背後大碼。不要因為心情、連輸、想報仇調整 range。

第五步做回放。每次 review 時，不要問「我這手到底該不該打」，先問「我當時用的是哪張表，標籤是什麼，我調整的理由是什麼」。如果你說不出表與標籤，代表你當時不是在決策，而是在猜。
      `,
      rangeRefs: ["RFI 全表。", "BB defend 全表。", "Rejam 全表。", "Push/Fold 全表。"],
      examples: [
        "25BB BTN 44 在 RFI 表可能是 RF 或邊界。這代表你可以 open，但面對某些 rejam 不應自動 call。若盲位都是 12-18BB aggressive，44 的 open EV 會下降。",
        "20BB BB KTo vs BTN open。這不是用 RFI 表，而是 BB defend 或 rejam 表。KTo 對寬 BTN 可反擊，但對 tight BTN 或 ICM 壓力要收。",
        "10BB SB J7o。這是 Push/Fold AI 表，不是 SB RFI 表。若 BB tight，J7o 可推；若 BB loose call，這手在底部要收。"
      ],
      checkpoints: ["你能不能為任一手牌找到正確表。", "你能不能解釋每個 label 的行動含義。", "你能不能只調整 M/RF/邊界，而不是亂改核心 range。"],
      drills: ["隨機選 20 手牌，只做找表與讀 label。", "把 A5s 在 RFI、BB defend、Rejam、Push/Fold 中各找一張表比較。", "列出你最容易誤用的三張表。"]
    })],
    ["00-主線課程/11-四週訓練計畫.md", coreLesson({
      title: "四週訓練計畫：把教材變成牌桌反應",
      purpose: "最後一章把主線教材轉成訓練安排。目標不是讀完，而是讓你在線上 MTT 中能穩定做出同一套決策。",
      body: `
第一週只練分類。每天拿 30 手牌，不判斷輸贏，只分類：RFI、BB defend、Rejam、Push/Fold、Call-off、Postflop SPR、ICM/PKO。你要把 action 類型練到直覺，因為一旦分類錯，後面查哪張表都會錯。

第二週練 RFI 與 BB defend。每天選兩個 stack，例如 40BB 與 25BB，跑完 UTG 到 SB 的 RFI，再選 BB vs HJ/CO/BTN。重點不是背所有格，而是抓出每個位置的邊界：A9o、KTo、QJo、小對、低 suited connector。

第三週練短碼與 rejam。每天用 25BB、20BB、15BB rejam 表，再接 12BB、10BB、8BB push/fold。每手都要寫清楚：這是 first-in 還是面對 open；有沒有 fold equity；背後還有誰；ICM 是否讓 call-off 收緊。

第四週練 postflop 與 ICM/PKO。每天 review 5 手大底池，先算 SPR，再回推 preflop range。Bubble/FT/PKO spot 要補 cover 關係。你不是看結果，而是看當時決策流程是否完整。

每週最後做測驗。錯題不要只看答案，要回到主線章節與 range 表，標記錯誤類型。錯誤類型只分幾種：用錯表、stack mode 錯、open 太寬、call-off 太寬、錯過 rejam、BB defend 過寬、postflop SPR 沒算、ICM/PKO cover 關係錯。
      `,
      rangeRefs: ["全部 range 表。", "8 份測驗。", "主線課程 00-10 作回補教材。"],
      examples: [
        "你 review 一手 25BB CO KTo 被 BB rejam fold。不要只記輸了 2bb，要標記：RFI，25BB，CO，RF，BB aggressive。下一次 CO 底部要收。",
        "你 10BB BTN Q9o 棄牌，後來發現盲位 tight。這是錯過 first-in fold equity，不是牌不好。回補 10BB BTN Push/Fold。",
        "你 FT 中碼 AJo call 大碼 jam 出局。這不是 bad beat review，而是 ICM call-off review。回到第 07 章，先問 cover 關係。"
      ],
      checkpoints: ["你能不能把錯手歸類成固定錯誤類型。", "你能不能安排每天 30 手分類訓練。", "你能不能把測驗錯題回補到主線章節。"],
      drills: ["建立一份 30 手牌 review 表，欄位包含 spot、stack、range 表、label、錯誤類型。", "連續三天只練 25BB RFI 和 BB rejam，不讀其他章。", "完成 80 題測驗後，統計錯最多的兩類 spot。"]
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
generateCoreLessons();
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

