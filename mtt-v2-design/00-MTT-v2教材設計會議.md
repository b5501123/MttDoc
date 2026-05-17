# MTT v2 教材設計會議

日期：2026-05-17  
範圍：重新設計 MTT 教材，不沿用現有 MTT 文章內容  
目標：做成能真正學習、查表、練習、打包成 HTML / APK 的 MTT 教材系統

## Skill 盤點結果

本機沒有專門的「撲克策略」skill。可用的相關 skill 是：

- `bmad-brainstorming`：適合做教材重設計的發散與會議框架。
- `bmad-create-ux-design`：適合規劃 HTML / app 內的學習體驗、範圍表、練習題與導航。
- `bmad-tech-writer`：可用於後續文案品質控管，但它是互動 agent，不適合這次直接啟動。

因此本次策略內容不依賴現有 MTT 舊文，也不依賴特定 skill；我會用線上 MTT / BBA / ICM / stack-depth / preflop range / postflop SPR 的專業框架重新設計。

## 會議結論

舊版教材最大的問題不是篇數少，而是「讀完不知道怎麼打」。新版不能再做成文章倉庫，而要做成訓練系統。

新版每一章必須回答四件事：

1. 這是什麼牌桌場景。
2. 這個場景的 baseline range 是什麼。
3. 邊界手牌怎麼調整。
4. 如何用題目確認自己真的會用。

## 產品定位

名稱暫定：`MTT Online BBA Strategy v2`

預設遊戲：

- 線上 NLH MTT
- Big Blind Ante
- 8-max / 9-max 為主
- 補充 6-max final table / short-handed
- 不做 live tell 教材
- 不做即時實戰輔助，只做離線學習與複盤

學員讀完後應該能：

- 用 stack depth 決定 open / 3bet / flat / shove / call shove。
- 看懂並使用 13x13 range grid。
- 知道哪些手牌是純 value、邊界 open、混合、exploit 調整、ICM 收緊。
- 在 BBA 結構下理解 steal、BB defend、ante dead money。
- 在 40BB、30BB、25BB、20BB、15BB、10BB 以下切換策略模式。
- 把手牌錯誤分類到 preflop range、stack mode、ICM、postflop SPR、PKO bounty。

## 新教材格式

每篇教材固定格式：

```text
# 章節標題

## 場景設定
- 桌型、人數、BBA、effective stack、位置、前面行動

## 你要先記住的規則
- 3 到 6 條可執行原則

## Range 表
- 13x13 hand grid
- 顏色標示 action
- 每個 action 有清楚 legend

## 邊界手牌
- 哪些手牌看對手、ICM、桌況調整

## 常見錯誤
- 直接列出錯誤與代價

## 練習
- 5 到 10 題
- 答案要寫理由，不只寫 fold/call/raise
```

## Range 表設計

Range 表不能用圖片，必須能在 HTML / APK 裡清楚顯示。

### 13x13 Grid 規格

固定 13x13：

- 對子：`AA` 到 `22`
- suited：`AKs`、`AQs`...
- offsuit：`AKo`、`AQo`...

每格可有以下標籤：

| 標籤 | 意義 |
|---|---|
| `R` | Raise / Open |
| `R+` | 強制 open，幾乎不 fold |
| `M` | Mixed，依桌況、ICM、玩家類型調整 |
| `F` | Fold |
| `C` | Call / defend |
| `3B` | 3bet |
| `4B` | 4bet |
| `AI` | All-in shove |
| `RC` | Raise-call all-in |
| `RF` | Raise-fold |
| `ISO` | isolate limp |

顏色邏輯：

- 深綠：強制進攻 value。
- 淺綠：標準 open / call。
- 黃色：mixed / 邊界手。
- 藍色：3bet / rejam。
- 紅色：fold 或 ICM 下收掉。
- 紫色：PKO bounty 調整。

### Range 表資料格式

範圍表應使用結構化資料，不手刻 HTML。建議來源格式：

```json
{
  "id": "mtt-bba-rfi-40bb-9max-hj",
  "title": "40BB 9-max HJ RFI",
  "game": "NLH MTT BBA",
  "table": "9max",
  "spot": "RFI",
  "stackBb": 40,
  "position": "HJ",
  "openSize": "2.0bb-2.2bb",
  "ante": "BBA",
  "legend": {
    "R+": "強制 open",
    "R": "標準 open",
    "M": "mixed / exploit",
    "F": "fold"
  },
  "hands": {
    "AA": "R+",
    "AKs": "R+",
    "A5s": "R",
    "K9s": "M",
    "Q8s": "F"
  },
  "notes": [
    "桌上 3bet 過高時移除低 suited gapper。",
    "BBA + 盲位過緊時 BTN / CO 可放寬。"
  ]
}
```

Build 時由 JSON 產出 HTML grid。這樣範圍表可維護、可測試、可重複生成。

## MTT v2 目錄

### 00-使用方式與學習地圖

1. 這套教材怎麼學
2. MTT stack mode 地圖
3. 13x13 range 表怎麼讀
4. BBA 與線上多桌設定

### 01-Preflop Range 總論

1. MTT range 的四個變數：位置、stack、ante、ICM
2. RFI / flat / 3bet / rejam / call shove 的差異
3. 為什麼 100BB range 不能套 25BB
4. 為什麼 10BB 不是小一點的 30BB

### 02-RFI 範圍表

核心要做完整表，不寫空泛文章。

RFI 表最少包含：

- 9-max：UTG、UTG+1、LJ、HJ、CO、BTN、SB
- 8-max：UTG、LJ、HJ、CO、BTN、SB
- stack depth：100BB、60BB、40BB、30BB、25BB、20BB、15BB

每張表要附：

- open size
- raise-fold / raise-call 分界
- 哪些牌受盲位玩家影響
- 哪些牌受 ICM 影響

### 03-BB Defend 與 Blind Play

表格要依 open 位置拆：

- BB vs UTG / LJ / HJ / CO / BTN / SB
- SB vs BTN steal
- BB vs SB limp / raise

變數：

- open size：2.0、2.2、2.5BB
- effective stack：60、40、30、25、20、15BB
- ante：BBA

教材重點：

- BBA 結構下 BB 防守比較寬，但不是任何兩張。
- BB defend 要分 call、3bet、rejam。
- SB 不是 cash game SB，MTT 中 stack pressure 和 rejam 會改變策略。

### 04-3bet / 4bet / Squeeze

範圍表：

- 100BB 3bet：BTN vs CO、SB vs BTN、BB vs BTN、CO vs HJ
- 60BB 3bet：linear / polar 分界
- 40BB 3bet：哪些牌 3bet-call，哪些 3bet-fold
- 30BB 以下：3bet non-all-in vs rejam
- squeeze：CO open + BTN call、HJ open + CO call、BTN open + SB call

教材重點：

- MTT 3bet 不能只用 cash game 邏輯。
- stack 越淺，3bet/fold 成本越高。
- 30BB 附近是最容易犯錯的區間。

### 05-20BB 到 30BB Stack Mode

這是線上 MTT 最重要區間之一。

必做表：

- 30BB RFI + vs 3bet plan
- 25BB RFI + rejam defense
- 20BB RFI + raise-call / raise-fold
- open shove 是否存在
- SB vs BB 20-30BB

每篇都要列：

- 哪些牌 open/fold
- 哪些牌 open/call
- 哪些牌直接 shove
- 哪些牌 limp / trap 僅限特殊對手

### 06-15BB 以下 Push/Fold

必做表：

- 15BB open shove / min-raise 混合
- 12BB push/fold
- 10BB push/fold
- 8BB push/fold
- 6BB push/fold
- call shove：vs UTG、HJ、CO、BTN、SB

教材重點：

- Nash 是基準，不是答案。
- BBA + ante 讓偷盲價值變大。
- ICM 下 call shove 比 shove 更需要收緊。

### 07-Rejam 範圍

必做表：

- 25BB rejam vs CO / BTN / SB
- 20BB rejam vs HJ / CO / BTN
- 15BB rejam vs BTN / SB
- reshove over limp / over min-open

教材重點：

- rejam 不是只看自己牌。
- fold equity、blocker、opener range、背後玩家都要算。
- 最常見 leak：用太弱 Ax rejam，或該 rejam 的 pair 不敢推。

### 08-Postflop by Stack / SPR

不是泛泛寫 c-bet，而是用 stack mode 教。

章節：

- 100BB SRP：BTN vs BB
- 60BB SRP：turn barrel 與 pot control
- 40BB 3bet pot：overpair / top pair 承諾點
- 30BB SRP：flop bet 後 turn SPR
- 20BB single-raised pot：top pair 是否打光
- monotone、paired、connected board 的簡化策略

每篇都要有：

- pot / stack / SPR 計算
- c-bet size
- value / bluff / check range
- 5 題牌面練習

### 09-Bubble / ICM / Final Table

這部分要做「調整表」，不是只講觀念。

範圍表類型：

- Chip EV RFI vs Bubble RFI
- Big stack open pressure
- Medium stack avoid clash
- Short stack call-off range
- Final table 9 left / 6 left / 3 left 調整

教材重點：

- ICM 主要先影響 call-off。
- Big stack 可以施壓，但不能無腦亂開。
- Medium stack 最容易犯「跟大疊打大底池」錯。

### 10-PKO / Mystery Bounty

範圍表不一定能完全固定，但要做 bounty 調整矩陣。

必做：

- Cover / not cover 對 call shove 的影響
- bounty value 換算粗略模型
- PKO early / mid / late
- short stack bounty hunt
- big stack bounty pressure

教材重點：

- PKO 不是看到 bounty 就亂 call。
- cover 對手才有 bounty equity。
- 低 SPR 下 dominated hand 仍可能因 bounty 變可 call，但要有邊界。

### 11-線上多桌與 Exploit

內容：

- unknown pool default
- tight blind exploit
- overfold to c-bet
- overcall BB
- under-bluff river
- limp table
- short stack table

每章都要有：

- baseline
- exploit adjustment
- 反調整風險
- hand example

### 12-題庫與測驗

不要只做 100 題，v2 應該做分層題庫：

- Preflop range 題：80 題
- BB defend 題：40 題
- rejam / call shove 題：60 題
- postflop SPR 題：60 題
- ICM / FT 題：40 題
- PKO 題：40 題

第一版可先做 160 題，後面擴到 320 題。

## HTML / APK 設計

新版不應只把 Markdown 轉 HTML。要新增 range table renderer。

### Build Pipeline

建議結構：

```text
docs/mtt-v2/
  lessons/
    00-使用方式/
    01-Preflop總論/
    ...
  ranges/
    rfi/
    bb-defend/
    rejam/
    call-shove/
    icm/
  quizzes/
    preflop.json
    rejam.json
    icm.json

docs/course-app/
  scripts/
    build-www.mjs
    build-range-html.mjs
```

Build 順序：

1. 讀取 Markdown lesson。
2. 讀取 range JSON。
3. 產生靜態 HTML range grid。
4. 把 lesson、range、quiz 寫進 `www/content/mtt-v2`。
5. `content-manifest.json` 標明 `contentType: lesson | range | quiz`。
6. Capacitor 打包 APK。

### App UX

底部導航建議改成：

- `課程`
- `範圍表`
- `題庫`
- `速查`
- `複盤`

範圍表頁要有：

- 桌型：8-max / 9-max / 6-max
- Stack：100 / 60 / 40 / 30 / 25 / 20 / 15 / 12 / 10 / 8 / 6BB
- Spot：RFI / BB Defend / 3bet / Rejam / Call Shove / ICM
- Position：UTG / LJ / HJ / CO / BTN / SB / BB
- Legend 固定顯示
- 點 hand cell 可以看到：
  - action
  - why
  - common mistake
  - exploit adjustment

### Range 表 HTML 樣式要求

- 手機上 13x13 grid 不能擠爆；要支援橫向滑動或縮放。
- 每格至少 36px，字要清楚。
- 色彩不能只靠顏色，還要有 `R`、`M`、`AI` 等文字標籤。
- Legend 固定在表格上方。
- 每張表下面要有「邊界手牌」說明。
- 可以離線使用，不依賴網路。

## 第一版 MVP

不要一次做完所有 320 題與全部 range。第一版重做 MTT 應先做可學習閉環：

### MVP 範圍

1. 新 app 課程路線與 UX。
2. 13x13 range grid renderer。
3. RFI range：9-max + 8-max，100 / 60 / 40 / 30 / 25 / 20 / 15BB。
4. BB defend：vs BTN / CO / HJ，40 / 30 / 25 / 20BB。
5. Rejam：25 / 20 / 15BB vs CO / BTN / SB。
6. Push/fold：12 / 10 / 8BB，所有位置。
7. 80 題 preflop / stack mode 練習。
8. 10 篇 postflop SPR 教材。

### MVP 驗收標準

- 學員能從「我現在 25BB BTN」找到對應 range 表。
- 每張 range 表都有 legend、邊界手、調整說明。
- 每篇教材有實際練習題。
- App 可以離線打開 HTML range。
- APK 內 `content-manifest.json` 能分出 lesson / range / quiz。
- 不把舊 MTT 文章作為 v2 內容來源。

## 實作順序

1. 建立 `docs/mtt-v2` 新資料夾，作為 MTT 唯一教材來源。
2. 先做 range JSON schema 和 HTML renderer。
3. 先產 5 張 RFI range 表做視覺驗證。
4. 改 course app 支援 `contentType: range`。
5. 做 MTT v2 課程首頁與範圍表索引。
6. 寫 00 / 01 / 02 章節。
7. 補 BB defend、rejam、push/fold。
8. 做 80 題 MVP 題庫。
9. 打包 APK，手機檢查 range table 可讀性。
10. 移除舊 `docs/mtt` 與 `docs/cash-game`，避免 APK 或文件入口混入舊教材。

## 會議決策

- 不再用「52 篇文章」當主要成果。
- 新版成果必須是「教材 + range table + 題庫 + HTML renderer」。
- Range 表用 JSON 作為 source of truth，由 build script 產 HTML。
- MTT v2 作為目前唯一打包教材；舊版 MTT / Cash Game 已移除，Cash Game 後續重做。
- 第一輪不追求全世界最精準 solver range，先做一致、可學、可調整的 baseline training range。
- 若後續要提高精度，再把 HRC / solver / 人工審核 range 匯入 JSON。

## 下一步

下一輪應先做技術骨架，不急著大量寫文：

1. `docs/mtt-v2/ranges/schema.md`
2. `docs/mtt-v2/ranges/rfi/*.json`
3. `docs/course-app/scripts/build-range-html.mjs`
4. range table HTML prototype
5. app 範圍表頁

等 range renderer 確認好，再開始大批重寫 MTT 教材。
