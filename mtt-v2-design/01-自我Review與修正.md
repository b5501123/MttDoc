# MTT v2 自我 Review 與修正

## Review 日期

2026-05-17

## 本輪範圍

- 重做 MTT 教材，不沿用舊 `docs/mtt` 內容。
- 刪除舊 `docs/mtt` 與 `docs/cash-game`。
- App 只打包 `docs/mtt-v2`。
- Range JSON 轉成手機可讀 HTML 13x13 範圍表。

## 初版問題

1. 章節數只有 11 篇，仍然偏像大綱，不足以學習。
2. 測驗只有 50 題，低於原設計的 80 題。
3. Postflop SPR 只有總論，缺少 c-bet、river、multiway、probe、短碼 all-in 路線。
4. App 還殘留舊 MTT / Cash Game 的捷徑設定。
5. 舊 `docs/mtt` 與 `docs/cash-game` 會讓後續維護混亂。

## 已修正

1. 課程擴充到 43 節：
   - 使用方式與 Stack Mode
   - RFI 依 stack 與位置拆解
   - BB defend vs HJ / CO / BTN
   - Rejam 25BB / 20BB / 15BB
   - Push/Fold 12BB / 10BB / 8BB
   - ICM / FT / PKO
   - Postflop SPR 10 節
   - 線上多桌與複盤流程
2. 範圍表維持 69 張 JSON：
   - RFI 36 張
   - BB defend 9 張
   - Rejam 9 張
   - Push/Fold 15 張
3. 測驗擴充到 80 題，分成 8 份。
4. `course-app` 的 build pipeline 改為只讀 `docs/mtt-v2`。
5. App manifest 只包含 `courseId: mtt-v2`。
6. 舊 MTT / Cash Game UI 捷徑已移除。
7. 舊 `docs/mtt` 與 `docs/cash-game` 已刪除。

## 驗證

- `node tools/generate-mtt-v2.mjs` 成功。
- `npm run build:web` 成功。
- `content-manifest.json` 統計：
  - lesson: 43
  - range: 69
  - quiz: 8
  - total: 120
- 69 個 range JSON 全部可解析。
- 每張 range JSON 都有必填欄位：`id`、`title`、`game`、`table`、`spot`、`stackBb`、`position`、`legend`、`hands`、`notes`、`boundary`。
- Range hand code 與 label 檢查通過。
- App build 產出的 manifest 只含 `mtt-v2`。

## 剩餘風險

- 這些 range 是 training baseline，不是 solver 匯出的精準表。
- 需要實機檢查 Android 小螢幕橫向滑動 13x13 表格是否夠順。
- 後續 Cash Game 會另起新版，不再使用舊版內容。
