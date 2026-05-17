# MTT v2 自我 Review 與修正

## Review 日期

2026-05-17

## 本輪範圍

- 重做 MTT 教材，不沿用舊 `docs/mtt` 內容。
- 刪除舊 `docs/mtt` 與 `docs/cash-game`，避免 APK 混入不能用的舊教材。
- App 只打包 `docs/mtt-v2`。
- Range JSON 轉成離線 HTML 13x13 範圍表。
- 範圍表先只做主表、標籤、註解、邊界手牌，不做右側 All-in/Raise/Call/Fold 統計。

## 初版問題

1. 課文拆太碎，學習者會在很多小片段之間跳來跳去，無法形成一條決策主線。
2. Range 表雖然有 13x13，但視覺不夠像策略表，行動頻率不明確。
3. App 導航仍像文件目錄，不像可學習的 MTT 課程。
4. 需要明確標出這是線上 MTT + Big Blind Ante 的 baseline training range，不是現場牌局或即時輔助工具。

## 已修正

1. 課程重排為 12 篇主線長章：
   - 怎麼學這套 MTT
   - 有效籌碼與 Stack Mode
   - RFI 完整主線
   - BB 防守完整主線
   - Rejam 與反偷盲
   - 短碼 Push/Fold 與 Call-off
   - Postflop SPR 主線
   - ICM 與 Final Table
   - PKO 主線
   - 線上多桌 Default 與 Exploit
   - Range 表使用方法
   - 四週訓練計畫
2. 範圍表維持 69 張 JSON：
   - RFI 36 張
   - BB defend 9 張
   - Rejam 9 張
   - Push/Fold 15 張
3. 測驗維持 80 題，分成 8 份。
4. Range renderer 改成大尺寸 13x13 strategy matrix：
   - 每格只顯示手牌牌型，避免文字擠在格內。
   - 每格使用水平比例色塊表示 All-in / Raise / 3Bet / Call / Fold。
   - Fold 與 mixed hand 也有清楚色塊，不再只靠單一底色。
   - 上方保留 action legend。
   - 表格下方新增完整策略手牌清單，mixed hand 會在不同 action 中標出比例。
   - 標籤說明、備註、邊界手牌改成可展開區塊，不佔教材主畫面。
5. App 首頁與索引改成「主線教材 / 範圍表 / 測驗」三種內容類型，不再把所有小章節散列成碎片。
6. 本機已加入 `poker-mtt-strategy` 專案 skill，後續寫 MTT / Cash Game 教材時會用同一套審核標準：長主線、range 表、邊界手、練習題、線上 BBA 語境。

## 驗證目標

- `node tools/generate-mtt-v2.mjs` 成功。
- `npm run build:web` 成功。
- `content-manifest.json` 統計應為：
  - lesson: 12
  - range: 69
  - quiz: 8
  - total: 89
- 69 個 range JSON 全部可解析。
- Range HTML 必須包含 `linear-gradient` 比例色塊。
- Range HTML 不應包含 `range-side-panel` 或「行動總覽」。
- APK 內 `content-manifest.json` 只能包含 `mtt-v2`。

## 剩餘風險

- 這些 range 是 training baseline，不是 solver 匯出的精準表。
- Android 小螢幕仍需實機檢查橫向滑動與字體大小。
- Cash Game 尚未重做，下一輪要另起主線教材與 range 表，不沿用舊內容。
