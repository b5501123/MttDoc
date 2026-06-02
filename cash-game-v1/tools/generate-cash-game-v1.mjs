import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const ranks = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"];

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

function rangeDoc({ id, title, spot, position, villainPosition = "", openSize = "2.5bb", groups, notes, boundary }) {
  return {
    id,
    title,
    game: "NLH Cash 6-max 100BB",
    table: "6max",
    spot,
    stackBb: 100,
    position,
    villainPosition,
    openSize,
    source: "training-baseline",
    legend: {
      R: "open / raise",
      M: "mixed / pool adjustment",
      F: "fold",
      C: "call / defend",
      "3B": "3bet",
      "4B": "4bet"
    },
    hands: makeHands(groups),
    notes,
    boundary
  };
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

function generateLessons() {
  const lessons = [
    ["00-主線課程/00-怎麼學CashGame.md", coreLesson({
      title: "怎麼學 Cash Game：用 EV、位置、Rake 串起來",
      purpose: "Cash game 不是 MTT 去掉 ICM。你要改成一套長期 EV 系統：每一手都先看位置、rake、SPR、對手 range，再決定是否用 thin value、bluff、bluff-catch 或棄牌。",
      body: `
Cash game 的主線是長期 EV。MTT 會因 pay jump、bounty、短碼 fold equity 改變很多 all-in 決策；cash game 則回到每 100BB 是否能穩定賺。這代表你不能靠「等翻倍」修正錯誤，每一個小 pot、每一次盲位防守、每一個 river call 都會長期累積。

第一個主控旋鈕是 position。IP 可以實現更多 equity、控制 pot、拿到更多 thin value；OOP 需要更強 range、更少 marginal call、更清楚的 check-raise 或 check-call 計畫。你在 BTN 可以 open 很多可玩牌，但 SB/BB 不能因為價格看似好就亂防守。

第二個主控旋鈕是 rake。低中級線上 cash game 的 rake 會懲罰小 pot marginal call，尤其 SB/BB 的 offsuit broadway、低 suited gapper、小 suited connector。如果一手牌只靠非常薄的 equity 才能 call，rake 會把它推成 fold。

第三個主控旋鈕是 SPR。100BB cash game 的單對牌不是自動打三街。你需要判斷 SRP、3bet pot、4bet pot 不同 SPR 下，top pair、overpair、combo draw、set、nut draw 的承諾門檻。

這套教材先建立 6-max 100BB baseline，再用 pool exploit 調整。不要把 range 當死規則，也不要把 exploit 當藉口亂打。每次調整只動邊界：open 底部、flat 底部、3bet bluff、river bluff-catch。
      `,
      rangeRefs: [
        "`cashv1-rfi-100bb-6max-utg/hj/co/btn/sb`：100BB 6-max RFI 全位置。",
        "`cashv1-3bet-100bb-*`：面對 Open 的 3bet / flat / fold baseline。",
        "`cashv1-bbdef-100bb-vs-*`：BB defend vs 各位置 open。"
      ],
      examples: [
        "100BB BTN 76s，前面 fold。BTN 有位置與 realization，可 open。但若 SB/BB 都 3bet 高，76s 從標準 open 變成 mixed 或 fold。",
        "100BB BB Q8o vs BTN 2.5bb open。價格看似能防，但 OOP + rake + dominated 讓它很容易變成虧損 call。先看 BB defend vs BTN，不要用 MTT BBA 價格思維。",
        "100BB CO open AQo，BTN 3bet。這不是 MTT 25BB 的 all-in 決策，而是 100BB postflop realization。你要看 CO vs BTN 3bet continue，分出 4bet、call、fold。"
      ],
      checkpoints: ["你能不能說出 cash game 和 MTT 最大差異。", "你能不能解釋 rake 為什麼會砍掉 marginal call。", "你能不能把每手牌先分成 SRP、3bet pot、4bet pot。"],
      drills: ["選 20 手牌，只分類 IP/OOP、SRP/3bet pot、value/bluff-catch。", "把三手你常 defend 的 BB 牌拿去檢查 rake 是否讓它變差。", "列出 BTN、SB、BB 三個位置的最大錯誤。"]
    })],
    ["00-主線課程/01-RFI完整主線.md", coreLesson({
      title: "RFI 完整主線：6-max 100BB 的開局骨架",
      purpose: "RFI 是 cash game 的所有後續 range 起點。本章把 UTG、HJ、CO、BTN、SB 的 open 目的與常見 leak 串起來。",
      body: `
Cash game RFI 第一條線是位置。UTG/HJ 不是偷盲位置，range 必須能承受後位 3bet 與多人跟注；CO 開始有 steal 價值；BTN 是最重要盈利位置；SB 雖然只剩 BB，但你永遠 OOP，所以不能直接拿 BTN range 套過去。

UTG/HJ 要避免 dominated offsuit broadway。KJo、QJo、A9o 這些牌在 6-max 看起來能打，但被 BTN/Blinds call 後很難拿三街 value，被 3bet 時也難防守。前位偏向高牌力與可玩性：對子、suited broadway、Axs、強 offsuit broadway。

CO/BTN 的重點是偷盲與 postflop realization。BTN 可以打非常多 suited hand 和 blocker hand，因為你有位置。但不要把 BTN open 誤解成任何兩張。若盲位 3bet 高，弱 offsuit Kx/Qx/Jx 要收；若盲位過緊，M hand 加頻。

SB 的重點是 rake 與 OOP。SB open 很容易被 BB defend 並且翻後失去位置。對 tight BB 可放寬，對 loose defend 或 aggressive 3bet 的 BB 要收底部。SB limp 策略可以存在，但第一版先建立 raise/fold baseline。
      `,
      rangeRefs: [
        "`cashv1-rfi-100bb-6max-utg`：UTG RFI。",
        "`cashv1-rfi-100bb-6max-hj`：HJ RFI。",
        "`cashv1-rfi-100bb-6max-co`：CO RFI。",
        "`cashv1-rfi-100bb-6max-btn`：BTN RFI。",
        "`cashv1-rfi-100bb-6max-sb`：SB RFI。"
      ],
      examples: [
        "UTG AJo：可 open，但不是印鈔牌。若桌上 BTN/BB 都 aggressive，AJo 會接近邊界。",
        "BTN K7o：對 tight blinds 可混合 open；對 3bet 高的 blinds，K7o 這類底部 offsuit 先收。",
        "SB Q9o：對 tight BB 可 open，對 loose BB 會被 OOP realization 和 rake 懲罰。"
      ],
      checkpoints: ["你能不能說出每個位置 open 的主要目的。", "你能不能分辨 BTN 與 SB 的差異。", "你能不能找出 RFI 表中的 mixed bottom。"],
      drills: ["打開 BTN RFI，列 10 手可 open 但容易過度的牌。", "打開 SB RFI，列 5 手對 tight BB 可加頻、對 loose BB 要收的牌。", "比較 AJo 在 UTG、CO、BTN 的差異。"]
    })],
    ["00-主線課程/02-面對Open.md", coreLesson({
      title: "面對 Open：Call、3Bet、Fold 不是牌力排序",
      purpose: "Cash game 最常見 leak 是跟太多、3bet 太少或用錯 blocker。本章建立 IP flat、OOP defend、3bet value、3bet bluff 的完整框架。",
      body: `
面對 open 時，第一個問題是你是否有 position。IP flat 可以保留 suited broadway、小對、部分 suited connector，因為你能控制 pot 並實現 equity。OOP flat 則要更謹慎，rake 會讓很多邊界 call 變成 fold 或 3bet。

第二個問題是 opener 位置。UTG/HJ range 強，你的 3bet bluff 要更少；CO/BTN range 寬，blind 可以用更多 suited Ax、Kxs、QJs、TT-QQ 類牌做 3bet 或 defend。不要用 vs BTN 的防守寬度去打 vs UTG。

第三個問題是 3bet 結構。Value 3bet 來自 JJ+/AQ+ 這類可承受 4bet 或有明顯 equity 的牌；bluff 3bet 多選 A5s-A2s、KTs/QTs 等 blocker + playability。KJo/QJo 這類 dominated offsuit 不一定是好 3bet bluff。

第四個問題是 squeeze。多人入池時，rake 和 dead money 都變大。你不能只因為有 suited connector 就跟，尤其 OOP。Squeeze 更偏 value 和 blocker，flat range 要避免被後方 squeeze 懲罰。
      `,
      rangeRefs: [
        "`cashv1-3bet-100bb-btn-vs-co`：BTN vs CO open。",
        "`cashv1-3bet-100bb-sb-vs-btn`：SB vs BTN open。",
        "`cashv1-bbdef-100bb-vs-btn`：BB defend vs BTN。",
        "`cashv1-bbdef-100bb-vs-co`：BB defend vs CO。"
      ],
      examples: [
        "BTN A5s vs CO open：A5s 有 blocker、有 nut potential，是常見 3bet bluff / mixed 候選。",
        "SB KJo vs BTN open：KJo 看起來強，但 OOP + rake + domination，很多時候比 3bet 或 fold 更清楚，不應自動 call。",
        "BB 76s vs UTG open：價格不是唯一答案。UTG range 強且 rake 高，76s 很容易只是看起來好玩。"
      ],
      checkpoints: ["你能不能說出 IP flat 和 OOP flat 的差異。", "你能不能分辨 value 3bet 和 bluff 3bet。", "你能不能按 opener 位置調整防守。"],
      drills: ["列出 5 手適合作 BTN vs CO 3bet bluff 的牌。", "列出 5 手 SB vs BTN 不該自動 call 的牌。", "用 A5s、KJo、QTs 分別寫出 vs UTG/CO/BTN 的差異。"]
    })],
    ["00-主線課程/03-盲位防守.md", coreLesson({
      title: "盲位防守：價格好，但 OOP 和 Rake 會收稅",
      purpose: "BB 和 SB 是 cash game 最容易漏錢的位置。本章把 pot odds、rake、realization、3bet、check-raise 放成同一套策略。",
      body: `
BB 防守不是保護盲注，而是比較 call、3bet、fold 哪個 EV 高。你已投入的大盲是沉沒成本，不能因為不想被偷就用所有 suited、offsuit broadway、低 connector 跟注。Cash game 的 rake 會讓很多小優勢 defend 消失。

BB vs BTN 可以最寬，因為 BTN open range 寬。但寬不等於亂防。弱 offsuit Kx/Qx/Jx 很容易被 domination，低 suited gapper 需要足夠 realization 和 implied odds。若 BTN c-bet 過度且 turn 放棄，你可多 defend；若 BTN barrel 強，底部要收。

BB vs CO/HJ/UTG 必須明顯收緊。Opener 越前位，range 越強，你的 dominated hand 越痛苦。A9o/KTo/QJo 這些牌常被高估；A5s/KTs/QJs/小對則因 playability 和 nut potential 更可用。

SB 防守比 BB 更痛苦，因為 SB 已經 OOP 且 BB 還可能 squeeze。SB 對 open 的 flat 要非常小心，更多使用 3bet 或 fold。特別是 vs BTN，SB 不能用 BB defend 表。
      `,
      rangeRefs: [
        "`cashv1-bbdef-100bb-vs-utg/hj/co/btn/sb`：BB defend vs 各位置 open。",
        "`cashv1-3bet-100bb-sb-vs-btn`：SB vs BTN open 的 3bet / fold baseline。"
      ],
      examples: [
        "BB J8o vs BTN open：可能在某些 pool 邊界，但不是自動 call。若對手 turn barrel 高，這手很難實現。",
        "BB A5s vs CO open：A5s 有 blocker 和 nut potential，可以 call 或 3bet mixed，比 A8o 這種 dominated offsuit 更健康。",
        "SB QJo vs CO open：很多時候是 fold 或低頻 3bet，不應因為牌面漂亮就 OOP flat。"
      ],
      checkpoints: ["你能不能說出 BB vs BTN 與 BB vs HJ 的差異。", "你能不能解釋 rake 對 BB defend 的影響。", "你能不能避免 SB 過度 flat。"],
      drills: ["打開 BB vs BTN，找 10 手 bottom defend。", "打開 BB vs HJ，找 10 手你以前可能 defend 但現在要 fold 的牌。", "記錄一個 session 內 SB flat 的所有手牌。"]
    })],
    ["00-主線課程/04-3Bet與4BetPot.md", coreLesson({
      title: "3Bet Pot 與 4Bet Pot：低 SPR 下少犯大錯",
      purpose: "3bet pot 不是單純變大底池，而是 range 集中、SPR 降低、位置更重要。本章處理 preflop continue 到 flop commitment 的主線。",
      body: `
3bet pot 的 range 更集中。當你 3bet BTN vs CO，你代表高牌力、A blocker、suited broadway、部分 suited connector；當 SB 3bet BTN，你常是 polar 或 linear 結構。翻牌後不能用 SRP c-bet 頻率照打。

IP call 3bet 和 OOP call 3bet 差很多。IP 能實現更多 equity，可以保留 suited broadway、小對、Axs；OOP call 3bet 更容易被壓迫，尤其被 position advantage 和 rake 夾殺。很多 OOP hand 要在 preflop 變成 4bet 或 fold。

4bet pot 的 SPR 很低，AK/AQ/QQ/JJ 這些牌需要在 preflop 就知道計畫。4bet bluff 最常用 A5s-A2s 這類 blocker，但不能因為有 blocker 就對不會 fold 的 pool 亂 4bet。

翻後 3bet pot 要先看 range advantage 和 board。Axx/Kxx 乾牌通常偏向 3bettor；中低連張濕牌會改善 caller 的 set、straight draw、pair+draw。低 SPR 下，下注 size 會直接決定 turn 是否 commitment。
      `,
      rangeRefs: [
        "`cashv1-4bet-100bb-btn-vs-sb`：BTN vs SB 3bet 的 4bet continue。",
        "`cashv1-4bet-100bb-co-vs-btn`：CO vs BTN 3bet 的 4bet continue。",
        "`cashv1-3bet-100bb-btn-vs-co`：BTN vs CO open 3bet baseline。",
        "`cashv1-3bet-100bb-sb-vs-btn`：SB vs BTN open 3bet baseline。"
      ],
      examples: [
        "CO open，BTN 3bet，CO AQs。AQs 多數可 continue，但要知道是 call 還是 4bet mixed，取決於 BTN 3bet 結構。",
        "BTN open，SB 3bet，你持 A5s。A5s 可以作 4bet bluff 候選，但若 SB pool 3bet 太 value 且不 fold，這手應收。",
        "SB 3bet pot 你持 QQ，flop A72r。你 range 仍強，但 QQ 已不是自動三街 value。"
      ],
      checkpoints: ["你能不能說出 3bet pot 的 SPR 變化。", "你能不能分辨 IP call 3bet 與 OOP call 3bet。", "你能不能說出 4bet bluff 要看 fold equity。"],
      drills: ["列 5 手 CO vs BTN 3bet 可 call 的牌。", "列 5 手 BTN vs SB 3bet 可 4bet mixed 的牌。", "選三個 3bet pot flop，判斷誰有 nut advantage。"]
    })],
    ["00-主線課程/05-FlopCbet.md", coreLesson({
      title: "Flop C-bet：牌面分類比自動下注重要",
      purpose: "Cash game 翻牌下注不是固定 1/3 pot。本章建立高牌乾面、中低連張、同花濕面、pair board、多方底池的下注邏輯。",
      body: `
Flop 第一問是誰有 range advantage，第二問是誰有 nut advantage。BTN open BB call，A72r、K83r 通常偏 BTN；987ss、765 two-tone 更改善 BB。你不能對所有牌面用同一個 size。

高牌乾面適合小注高頻，因為 opener 有更多 top pair、overpair、high card advantage。中低連張濕面要降低空氣 c-bet，把有 equity 的 draw、overpair、強 top pair放入下注或較大 size。

同花面要看 blocker。你有 A-high flush blocker 時可有更多 barrel candidate；沒有 backdoor 的空氣牌應該少下注。Pair board 則要看誰有 trips density，以及對手是否 overfold。

Multiway 底池要大幅降低 bluff。Cash game multiway 很常來自 cold call 或 BB defend，rake 也更重。你要用更清楚的 value 與高 equity draw，不要 heads-up c-bet 頻率硬套。
      `,
      rangeRefs: [
        "`cashv1-rfi-100bb-6max-*`：用 RFI 表回推 opener range。",
        "`cashv1-bbdef-100bb-vs-*`：用 BB defend 表回推 caller range。"
      ],
      examples: [
        "BTN open BB call，flop A72r。BTN 可小注高頻，BB 多數 range 被壓制。",
        "CO open BB call，flop 987ss。BB 有更多兩對、順子、pair+draw，CO 不應全 range 小注。",
        "HJ open CO call BB call，flop K86r。三人底池下，CO/HJ 的空氣牌不要硬下注。"
      ],
      checkpoints: ["你能不能分辨 range advantage 和 nut advantage。", "你能不能說出哪些牌面適合小注高頻。", "你能不能在 multiway 降低 bluff。"],
      drills: ["分類 20 個 flop：高乾、中低濕、同花、pair board、multiway。", "選 5 手 BTN vs BB，寫出 c-bet size。", "找一手你 multiway 過度 c-bet 的牌。"]
    })],
    ["00-主線課程/06-TurnRiver.md", coreLesson({
      title: "Turn 與 River：Value、Bluff、Bluff-catch 的分線",
      purpose: "Cash game 的大錢常在 turn/river。你需要知道哪些牌繼續 value、哪些牌轉 bluff、哪些牌只剩 bluff-catch。",
      body: `
Turn 是 equity 被重新分配的街。高牌、同花完成、順子完成、pair board 都會改變 range advantage。Flop 自動 c-bet 後，turn 不能情緒補槍；你要問這張 turn 改善誰的 range。

Barrel 候選要有 equity 或 blocker。Nut flush draw、open-ended、A blocker、block 對手強 value 的牌，比完全無 blocker 的空氣好。中等 showdown value 不要亂轉 bluff，因為你燒掉原本能攤牌的 EV。

River value 先問更差牌是否會 call。Top pair good kicker 在某些 runout 是 value，在四連順、同花完成、對手 range uncapped 時可能只剩 check。薄 value 是 cash game 盈利來源，但不是每手 top pair 都三街。

River bluff-catch 要看 pool。低中級 pool 常見 river under-bluff，尤其大 size。你不需要為了平衡每次 hero call。對過度 bluff 的玩家再打開 bluff-catch；對正常或偏緊 pool，保護 winrate 比抓鬼重要。
      `,
      rangeRefs: [
        "`cashv1-rfi-100bb-6max-*`：回推 opener range。",
        "`cashv1-bbdef-100bb-vs-*`：回推 BB caller range。",
        "`cashv1-3bet-100bb-*`：回推 3bet pot range。"
      ],
      examples: [
        "BTN vs BB，flop A72r c-bet，turn 9s 帶出 flush draw。你的 Ax 仍可 value，但 KQ 無 backdoor 不應自動二槍。",
        "BB defend 76s，flop T84ss check-call，turn 2s 完成 flush。你 range 有 flush，對手 over-cbet 時可 probe。",
        "River 你有 second pair 面對 tight player pot bet。若 pool under-bluff，fold 是標準盈利。"
      ],
      checkpoints: ["你能不能列出 turn 改變 range 的牌。", "你能不能選 blocker 好的 bluff。", "你能不能按 pool 調整 river bluff-catch。"],
      drills: ["選 10 手 turn barrel，標出 value/draw/bluff-catch。", "找 5 手 river thin value。", "統計一週 hero call 的結果與對手類型。"]
    })],
    ["00-主線課程/07-Rake與PoolExploit.md", coreLesson({
      title: "Rake 與 Pool Exploit：只調邊界，不改骨架",
      purpose: "Cash game exploit 很重要，但不能把 exploit 當作亂打。本章把 rake、player pool、table selection、HUD read 放回 baseline 上調整。",
      body: `
Rake 影響最大的位置是 blinds 和 small pot flat。你在 BB/SB 的 marginal call，即使 raw equity 足夠，也可能被 rake 打成負 EV。這就是為什麼低級別不應盲目模仿 high-stakes loose defend。

Pool overfold 時，BTN/CO/SB 的 open bottom、3bet bluff、small c-bet 可加頻。Pool overcall 時，減少空氣 bluff，增加 thin value。Pool under-bluff river 時，降低 bluff-catch。調整方向必須對應對手錯誤。

Table selection 是 cash game 技術的一部分。你不需要在最差桌上證明自己。找有短弱玩家、過度 limp/call、過度 fold blind、river call station 的桌，比硬打 reg-heavy 桌更有效。

HUD 或筆記只改邊界。VPIP/PFR/3bet/fold to cbet/river aggression 要有樣本，不要看到一手牌就重寫對手模型。Unknown 先用 baseline，直到數據足夠。
      `,
      rangeRefs: [
        "`cashv1-rfi-100bb-6max-*`：檢查 RFI 表中的 M hand。",
        "`cashv1-3bet-100bb-*`：檢查 3bet bluff 候選。",
        "`cashv1-bbdef-100bb-vs-*`：檢查 BB bottom defend。"
      ],
      examples: [
        "BB defend bottom suited hand 在高 rake 環境中要收，尤其對前位 open。",
        "BTN 對兩個 tight blinds 可以加開 K7o/Q8o 這類 M hand，但對 aggressive 3bettor 要收。",
        "River facing pot bet，對手 500 手樣本 river aggression 極低。你可以 fold 更多 bluff-catcher。"
      ],
      checkpoints: ["你能不能說出 rake 對哪類 hand 影響最大。", "你能不能把 pool leak 對應到 exploit。", "你能不能避免樣本不足過度調整。"],
      drills: ["列出你所在級別三個常見 pool leak。", "選 20 手 BB defend，標出是否被 rake 懲罰。", "寫一張 table selection checklist。"]
    })],
    ["00-主線課程/08-複盤與訓練.md", coreLesson({
      title: "複盤與訓練：把 Session 變成可修正的 Leak",
      purpose: "Cash game 複盤不能只看最大輸贏。你要把 leak 分類成 preflop、flop、turn、river、table selection，並用固定練習修正。",
      body: `
複盤第一步是分類。每手錯牌先標：RFI、vs open、blind defend、3bet pot、flop c-bet、turn barrel、river value/bluff/bluff-catch。只要分類錯，後面討論都會發散。

第二步是回到 range。Preflop 錯誤通常不是單手牌，而是邊界不清楚：BTN open 太寬、SB flat 太多、BB defend 太鬆、3bet bluff 選錯 blocker。你要回到 range 表，不要只看結果。

第三步是看 pot size。Cash game 很多 leak 是小 pot 重複漏，不是單次大 cooler。每週要統計 blinds loss、3bet pot winrate、river call efficiency、c-bet success，不要只 review 最大三手。

第四步是建立訓練週期。第一週只練 RFI；第二週練 vs open 和 blinds；第三週練 flop texture；第四週練 turn/river。每週只改一兩個 leak，避免同時改太多導致策略崩掉。
      `,
      rangeRefs: [
        "`cashv1-rfi-100bb-6max-*`：RFI 複盤主表。",
        "`cashv1-3bet-100bb-*`：面對 open / 3bet 複盤主表。",
        "`cashv1-bbdef-100bb-vs-*`：盲位防守複盤主表。",
        "`cashv1-4bet-100bb-*`：4bet pot 複盤主表。",
        "6 份 Cash Game v1 測驗。"
      ],
      examples: [
        "你 BB Q8o call BTN open，flop 中 Q 輸大 pot。這不是 bad beat review，而是 BB defend bottom + dominated hand review。",
        "你 BTN 76s open 被 SB 3bet fold。若 SB 3bet 高，76s 可以從 open 底部收掉；若 SB normal，這是正常 loss。",
        "你 river 用 missed draw bluff 被 station call。問題不是 bluff 運氣差，而是對 overcall pool 應少 bluff。"
      ],
      checkpoints: ["你能不能把錯手分類成固定 leak。", "你能不能回到 range 表修正邊界。", "你能不能建立四週訓練節奏。"],
      drills: ["每個 session 選 20 手不是最大 pot 的牌複盤。", "統計一週 BB defend bottom hand 的結果。", "完成 60 題測驗後，標出錯最多的兩類 spot。"]
    })]
  ];

  for (const [path, content] of lessons) write(`lessons/${path}`, content);
}

function generateRanges() {
  const rfi = {
    UTG: { R: "66+,ATs+,KTs+,QTs+,JTs,T9s,AJo+,KQo", M: "55,A5s,A4s,A3s,A2s,98s,87s" },
    HJ: { R: "55+,A9s+,KTs+,QTs+,JTs,T9s,98s,AJo+,KQo", M: "44,A5s,A4s,A3s,A2s,K9s,Q9s,J9s,87s,76s,ATo,KJo,QJo" },
    CO: { R: "44+,A2s+,K9s+,Q9s+,J9s+,T9s,98s,87s,ATo+,KJo+,QJo", M: "33,22,K8s,Q8s,J8s,T8s,97s,76s,65s,A9o,KTo,QTo,JTo" },
    BTN: { R: "22+,A2s+,K2s+,Q6s+,J7s+,T7s+,98s,87s,76s,65s,54s,A2o+,K8o+,Q9o+,J9o+,T9o", M: "K7o,Q8o,J8o,T8o,97o,86s,75s,64s" },
    SB: { R: "22+,A2s+,K5s+,Q8s+,J8s+,T8s+,98s,87s,76s,A8o+,KTo+,QTo+,JTo", M: "K4s,Q7s,J7s,T7s,65s,54s,A7o,K9o,Q9o,J9o,T9o" }
  };
  for (const [position, groups] of Object.entries(rfi)) {
    const id = `cashv1-rfi-100bb-6max-${position.toLowerCase()}`;
    write(`ranges/rfi/${id}.json`, JSON.stringify(rangeDoc({
      id,
      title: `100BB 6-max ${position} RFI`,
      spot: "RFI",
      position,
      groups,
      notes: ["Training baseline；高 rake 與 aggressive blinds 會砍掉底部 mixed hand。", "BTN 可最寬，SB 不能直接套 BTN，因為 SB 永遠 OOP。"],
      boundary: ["低 suited connector", "A2s-A5s", "KTo/KJo", "QTo/QJo", "弱 offsuit Kx/Qx"]
    }), null, 2));
  }

  const threeBet = [
    ["btn-vs-utg", "BTN", "UTG", { "3B": "JJ+,AKs,AKo,A5s,A4s", C: "22+,AQs,AJs,KQs,QJs,JTs,T9s,AQo", M: "ATs,KJs,QTs,98s" }],
    ["btn-vs-hj", "BTN", "HJ", { "3B": "TT+,AQs+,AKo,A5s,A4s,KQs", C: "22+,AJs,KJs+,QJs,JTs,T9s,98s,AQo,KQo", M: "A9s,KTs,QTs,87s,AJo" }],
    ["btn-vs-co", "BTN", "CO", { "3B": "99+,AJs+,AQo+,A5s,A4s,KTs+,QTs+,JTs", C: "22+,A2s+,K9s+,Q9s+,J9s+,T9s,98s,87s,AJo,KQo", M: "A9o,KJo,QJo,KTo,QTo" }],
    ["co-vs-hj", "CO", "HJ", { "3B": "TT+,AQs+,AKo,A5s,KQs", C: "22+,AJs,KJs+,QJs,JTs,T9s,98s,AQo,KQo", M: "A9s,KTs,QTs,87s,AJo" }],
    ["sb-vs-btn", "SB", "BTN", { "3B": "88+,ATs+,AJo+,A5s,A4s,KTs+,QTs+,JTs,T9s", C: "22+,A2s+,K9s+,Q9s+,J9s+,T9s,98s", M: "KQo,KJo,QJo,A9o,KTo,QTo" }],
    ["bb-vs-btn", "BB", "BTN", { "3B": "88+,ATs+,AJo+,A5s,A4s,KTs+,QTs+,JTs", C: "22+,A2s+,K2s+,Q6s+,J7s+,T7s+,98s,87s,76s,A2o+,K8o+,Q9o+,J9o+,T9o", M: "K7o,Q8o,J8o,T8o,65s,54s" }]
  ];
  for (const [slug, position, villainPosition, groups] of threeBet) {
    const id = `cashv1-3bet-100bb-${slug}`;
    write(`ranges/3bet/${id}.json`, JSON.stringify(rangeDoc({
      id,
      title: `100BB ${position} vs ${villainPosition} Open`,
      spot: "3Bet vs Open",
      position,
      villainPosition,
      groups,
      notes: ["3bet bluff 需要 blocker、playability 與 fold equity。", "OOP flat 受 rake 懲罰，SB 特別要少 flat。"],
      boundary: ["A5s-A2s", "KTs/QTs/JTs", "小對 22-66", "KJo/QJo/A9o"]
    }), null, 2));
  }

  const bbDefend = [
    ["utg", "UTG", { C: "22+,A2s+,KTs+,QTs+,JTs,T9s,98s,AQo,KQo", "3B": "TT+,AQs+,AKo,A5s", M: "K9s,Q9s,87s,AJo" }],
    ["hj", "HJ", { C: "22+,A2s+,K9s+,Q9s+,J9s+,T9s,98s,87s,AJo,KQo", "3B": "99+,AJs+,AQo+,A5s,A4s,KQs", M: "KJo,QJo,A9o,KTo,QTo" }],
    ["co", "CO", { C: "22+,A2s+,K7s+,Q8s+,J8s+,T8s+,98s,87s,76s,A9o+,KTo+,QTo+,JTo", "3B": "88+,ATs+,AJo+,A5s,A4s,KTs+,QJs", M: "K8o,Q9o,J9o,T9o,65s,54s" }],
    ["btn", "BTN", { C: "22+,A2s+,K2s+,Q5s+,J7s+,T7s+,98s,87s,76s,65s,A2o+,K8o+,Q9o+,J9o+,T9o", "3B": "77+,ATs+,AJo+,A5s,A4s,KTs+,QTs+,JTs", M: "K7o,Q8o,J8o,T8o,97s,86s,75s,64s,54s" }],
    ["sb", "SB", { C: "22+,A2s+,K2s+,Q5s+,J7s+,T7s+,98s,87s,76s,65s,A2o+,K8o+,Q9o+,J9o+,T9o", "3B": "66+,A8s+,ATo+,KTs+,QJs,A5s,A4s", M: "K7o,Q8o,J8o,T8o,86s,75s,64s" }]
  ];
  for (const [slug, villainPosition, groups] of bbDefend) {
    const id = `cashv1-bbdef-100bb-vs-${slug}`;
    write(`ranges/bb-defend/${id}.json`, JSON.stringify(rangeDoc({
      id,
      title: `100BB BB Defend vs ${villainPosition}`,
      spot: "BB Defend",
      position: "BB",
      villainPosition,
      groups,
      notes: ["BB 防守要同時看 pot odds、rake、OOP realization。", "對前位 open 不要拿 vs BTN 的寬度硬套。"],
      boundary: ["弱 offsuit Kx/Qx", "低 suited gapper", "A2o-A8o", "小對 22-55"]
    }), null, 2));
  }

  const fourBet = [
    ["utg-vs-btn", "UTG", "BTN 3bet", { "4B": "QQ+,AKs,AKo", C: "JJ,TT,AQs,AQo,KQs", M: "A5s,A4s" }],
    ["co-vs-btn", "CO", "BTN 3bet", { "4B": "QQ+,AKs,AKo,A5s", C: "JJ,TT,99,AQs,AJs,KQs,AQo", M: "A4s,A3s,KJs,QJs" }],
    ["btn-vs-sb", "BTN", "SB 3bet", { "4B": "JJ+,AKs,AKo,A5s,A4s", C: "TT,99,88,AQs,AJs,ATs,KQs,KJs,QJs,JTs,AQo", M: "A3s,A2s,KTs,QTs,T9s" }],
    ["sb-vs-bb", "SB", "BB 3bet", { "4B": "TT+,AQs+,AKo,A5s,A4s", C: "99,88,AJs,ATs,KQs,KJs,QJs,AQo,KQo", M: "A3s,A2s,KTs,QTs,JTs" }]
  ];
  for (const [slug, position, villainPosition, groups] of fourBet) {
    const id = `cashv1-4bet-100bb-${slug}`;
    write(`ranges/4bet/${id}.json`, JSON.stringify(rangeDoc({
      id,
      title: `100BB ${position} Continue vs ${villainPosition}`,
      spot: "4Bet Continue",
      position,
      villainPosition,
      groups,
      notes: ["4bet bluff 要有 fold equity；對 value-heavy pool 收掉 Axs bluff。", "OOP call 3bet 要比 IP 更謹慎。"],
      boundary: ["A5s-A2s", "JJ/TT/99", "AQo/AJs", "KQs/KJs"]
    }), null, 2));
  }
}

function generateQuizzes() {
  const pages = [
    ["RFI 與位置", [
      ["100BB UTG KJo。", "多數 fold；前位 dominated offsuit broadway 被後位 call/3bet 時很難實現。"],
      ["100BB BTN K7o，兩盲 tight。", "可 mixed open；若盲位 3bet 高則收。"],
      ["100BB SB Q9o vs tight BB。", "可 open / mixed；SB 永遠 OOP，不能直接套 BTN。"],
      ["100BB CO 76s。", "可 mixed open；看 BTN/盲位 3bet 與 rake。"],
      ["100BB HJ A5s。", "可 open；Axs 有 blocker 和 nut potential。"],
      ["100BB BTN 54s。", "可 open / mixed，取決於盲位。"],
      ["100BB UTG 55。", "mixed；桌子 aggressive 時可 fold。"],
      ["100BB SB A2o。", "多數 fold；offsuit weak ace OOP realization 差。"],
      ["100BB BTN Q9o。", "通常 open，但對 aggressive blinds 可收底部。"],
      ["100BB CO KTo。", "mixed / open，對後方 3bet 高要小心。"]
    ]],
    ["面對 Open", [
      ["BTN A5s vs CO open。", "常見 3bet bluff / mixed；blocker + playability。"],
      ["SB KJo vs BTN open。", "不要自動 call；OOP + rake + domination，常 3bet/fold mixed。"],
      ["BB 76s vs UTG open。", "多數不寬防；UTG 強且 rake 懲罰 marginal call。"],
      ["BTN 22 vs UTG open。", "可 call，但看 rake、後方 squeeze 和 implied odds。"],
      ["BB A5s vs CO open。", "可 call/3bet mixed。"],
      ["SB QTs vs CO open。", "可 3bet/call mixed，但避免過度 flat。"],
      ["BB Q8o vs BTN open。", "邊界；對強 barrel pool 可 fold。"],
      ["BTN KQo vs HJ open。", "多數 call 或 3bet mixed，不能只看牌力。"],
      ["CO AJo vs HJ open。", "邊界 continue；看 opener 和後方玩家。"],
      ["BB A2o vs UTG open。", "多數 fold。"]
    ]],
    ["3Bet / 4Bet", [
      ["CO open，BTN 3bet，CO AQs。", "多數 continue；call 或 4bet mixed 取決於 BTN 3bet。"],
      ["BTN open，SB 3bet，BTN A5s。", "4bet bluff 候選，但對不 fold 的 pool 要收。"],
      ["UTG open，BTN 3bet，UTG QQ。", "強 4bet / continue。"],
      ["BTN open，BB 3bet，BTN 76s。", "多數 fold；不要過度 call 3bet。"],
      ["SB 3bet BTN，持 KTs。", "可作 3bet bluff / mixed。"],
      ["4bet bluff 的核心條件。", "blocker、fold equity、被 call 後仍有 equity。"],
      ["OOP call 3bet 為何要收緊？", "realization 差，rake 與 position 懲罰。"],
      ["JJ 面對 4bet 是否一定打光？", "不是；看位置、player pool 和 size。"],
      ["A2s 作 4bet bluff 是否永遠正確？", "不是；對 value-heavy 不 fold pool 要收。"],
      ["3bet pot A72r。", "通常偏 3bettor range。"]
    ]],
    ["Flop / Turn", [
      ["BTN vs BB，A72r。", "BTN 可小注高頻。"],
      ["CO vs BB，987ss。", "BB nut advantage 較高，CO 不應全 range c-bet。"],
      ["Multiway K86r 空氣牌。", "多人底池降低 bluff。"],
      ["Turn 完成同花。", "重新評估誰有更多 flush。"],
      ["有 showdown value 的 second pair。", "不要輕易轉 bluff。"],
      ["Nut FD + overcard。", "常是良好 barrel candidate。"],
      ["無 blocker missed draw river。", "不要自動 bluff。"],
      ["Pair board c-bet。", "看 trips density 和對手 overfold。"],
      ["3bet pot 低 SPR top pair。", "價值上升，但仍看 runout。"],
      ["OOP probe turn。", "要看 turn 是否改善你的 range。"]
    ]],
    ["River / Exploit", [
      ["River thin value 第一問。", "更差牌是否會 call。"],
      ["低級別 pool under-bluff river。", "降低 bluff-catch。"],
      ["對 calling station。", "少 bluff，多 value。"],
      ["對 overfold blinds。", "CO/BTN/SB bottom open 加頻。"],
      ["對 aggressive 3bettor blinds。", "RFI bottom 收，4bet blocker 挑好。"],
      ["Rake 影響最大區域。", "blinds、small pot flat、marginal defend。"],
      ["Table selection 是否是技術？", "是，選更好桌比硬打 reg-heavy 更有效。"],
      ["HUD 樣本不足。", "先 baseline，不重寫策略。"],
      ["River bluff-catch second pair vs tight pot bet。", "多數 fold。"],
      ["對過度 c-bet flop、turn 放棄的人。", "可多 defend flop，turn probe。"]
    ]],
    ["複盤", [
      ["複盤第一步。", "分類 spot：RFI、vs open、blind defend、3bet pot、flop、turn、river。"],
      ["只看最大輸贏 pot 是否足夠？", "不夠；小 pot leak 長期更常見。"],
      ["BB defend leak 怎麼查？", "回到 BB defend 表，標 bottom defend 和 rake。"],
      ["BTN open 被 3bet fold。", "不一定錯；看盲位 3bet 與你的 bottom open。"],
      ["River bluff 被 call。", "先看對手是否 station，而不是只看結果。"],
      ["一週只改幾個 leak？", "一到兩個，避免策略崩掉。"],
      ["3bet pot 複盤要記什麼？", "preflop range、SPR、position、board texture。"],
      ["SB flat 太多。", "通常是 leak，OOP + BB squeeze + rake。"],
      ["Unknown player。", "先 baseline。"],
      ["Cash game 長期目標。", "穩定提高每 100BB EV，不靠單次翻倍。"]
    ]]
  ];
  pages.forEach(([title, items], pageIndex) => {
    const start = pageIndex * 10 + 1;
    const body = items.map(([q, a], i) => `## Q${start + i}

${q}

**答案：** ${a}`).join("\n\n");
    write(`quizzes/${String(pageIndex + 1).padStart(2, "0")}-${safeName(title)}.md`, `# Cash Game 測驗 ${pageIndex + 1}：${title}

${body}`);
  });
}

resetDir("lessons");
resetDir("ranges");
resetDir("quizzes");
generateLessons();
generateRanges();
generateQuizzes();

write("ranges/schema.md", `# Cash Game v1 Range JSON Schema

Range JSON 是 Cash Game v1 的 source of truth。每張表必須包含：\`id\`、\`title\`、\`game\`、\`table\`、\`spot\`、\`stackBb\`、\`position\`、\`legend\`、\`hands\`、\`notes\`、\`boundary\`。

\`hands\` 只需要列出非 fold；renderer 會把其他 hand 視為 \`F\`。`);

console.log("Generated Cash Game v1 lessons, ranges, and quizzes.");
