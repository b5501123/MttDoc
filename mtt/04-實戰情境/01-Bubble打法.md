# Bubble 打法：線上 MTT 的關鍵時刻（BBA 標準）

## 線上 MTT Bubble 的特殊性

Bubble 是 MTT 中壓力最大、策略最複雜的階段。線上大型 MTT 的 bubble 與現場有根本性差異。

本章所有底池計算、push/fold range 分析均以**Big Blind Ante（BBA）**為預設標準。BBA 底池 = SB + BB + BB ante，例如 2,000/4,000 時起始底池為 10,000（而非無 ante 的 6,000）。BBA 讓 bubble 的每手牌底池增大約 67%，這對 chip EV steal 和 ICM 壓力都有顯著影響。

**BBA 在 Bubble 的雙重影響：**
1. **Steal 更有吸引力**：BBA 底池更大，每次成功偷盲贏得更多籌碼
2. **ICM 壓力也更高**：底池更大，每次被 call 的籌碼損失也更大

這兩個效果共同作用，使 bubble 策略的核心原則保持不變（大疊積極、中疊保守、短疊主動），但每個決策點的 EV 差異比無 ante 環境更加顯著。

**持續時間：**
一個 1,000 人的 MTT，前 150 名進錢。當剩 170 人時進入 bubble，每次有人出局，整個 lobby 都能看到人數減少。這個過程可能持續 **30-60 分鐘**，期間有幾十甚至上百手牌要在高度 ICM 壓力下做決定。BBA 讓每手牌的盲注成本更高（後位需付 2bb），短疊的壓力比無 ante 更緊迫。

**多桌同步：**
Bubble 期間通常有 15-20 桌同時進行。你在其中一桌，無法控制其他桌的出局速度。有時一桌會特別「保守」（幾桌的短疊都在死撐），有時某桌會快速連出幾人。

**Lobby 資訊：**
線上玩家可以隨時查看 lobby，了解：
- 目前剩餘人數
- 各桌的籌碼分佈
- 每桌的最短疊是多少（BBA 環境下短疊的有效 bb 數消耗更快）

這些資訊幫助你判斷 bubble 的進展，以及你的 ICM 壓力大小。

---

## Bubble 四種角色與策略（BBA 版本）

### 角色一：大疊（Full Chip Leader 或接近）

**優勢：** 最小的 ICM 壓力，最大的施壓能力。**BBA 讓每次 steal 的底池收益更大，大疊優勢被進一步放大。**

**核心策略：**
- 積極偷盲，目標是中疊的 SB/BB
- BBA steal 底池更大：在 2,000/4,000/4,000 盲注下，每次成功 steal 贏得 10,000（而非無 ante 的 6,000），多贏 67%
- 對中疲玩家的 3-bet 是最強的 ICM 武器；BBA 讓中疊的 call 代價更高，3-bet 成功率更高
- 可以比 BBA Nash 更寬地 push（5-10% 放寬）
- 不必怕中疊的回應，因為中疊在 BBA ICM 壓力下折疊比跟注更安全

**大疊的 BBA Bubble EV 分析（2,000/4,000/4,000 盲注）：**

```
每次成功 steal 贏得底池 = 2,000（SB）+ 4,000（BB）+ 4,000（BB ante）= 10,000
如果你 BTN push，成功率 80%（中疊不願意在 bubble call）：
  BBA Steal EV = 80% × 10,000 = 8,000 chips
  無 ante Steal EV = 80% × 6,000 = 4,800 chips
  BBA 額外 EV = 3,200 chips 每手
```

每手額外 3,200 chips 的 EV 差距，在 bubble 持續數十手的情況下，累積效果非常可觀。**大疊在 BBA bubble 不積極是極大的 EV 損失。**

**大疊的錯誤：**
過於被動，以「已經安全」為由放棄大量 EV。大疊在 bubble 是賺最多 EV 的時刻，在 BBA 環境下這個錯誤代價更大。

### 角色二：中上疊（比平均多，但不是 chip leader）

**優勢：** 有 ICM 施壓能力，但自己也有一定壓力

**核心策略：**
- 主動針對真正的短疊（他們需要 double up）
- 避免與大疊正面衝突（BBA 讓大疊的 3-bet 代價更高）
- 偷盲時選擇短疊在 SB/BB 的情況（他們更容易 fold）
- BBA 讓每次 steal 的 EV 更高，但被大疊 3-bet 的代價也更大，選擇目標要更謹慎
- 防守自己的 SB/BB 時，只跟注非常強的手牌

### 角色三：中疊（平均籌碼附近）

**壓力：** 最大，BBA 進一步強化了保守傾向

**核心策略：**
- Push range 縮緊 10-15%（相比 BBA Nash）
- 面對大疊的 open：只 3-bet/call 極強牌（BBA 底池讓 call 代價更高）
- 面對短疊的 push：正常 BBA call range，但 ICM 縮緊
- 主要以 fold 和偶爾的積極主動來求生存
- 不冒大風險，等待真正有機會的時刻

**關鍵判斷（BBA 環境）：** 如果你能確保進圈（pass the bubble），未來的 EV 很高，所以保守是值得的。BBA 讓 bubble 期間每手牌的潛在損失更大，保守策略比無 ante 環境更加合理。

### 角色四：短疊（接近出局）

**壓力：** 反而降低，**BBA 讓積極 push 的 EV 更高，是唯一選擇**

**核心策略（BBA 版本）：**
- 不能繼續等待（BBA 讓每手牌消耗更多 bb：後位要付 1bb BB + 1bb ante）
- BBA push range 比無 ante 版本寬約 3-5%（底池更大，fold equity 收益更高）
- 尋找能 push 的位置（BTN/CO/SB fold 到你的情況）
- BBA 短疊的最優 push 窗口在 **8-15bb**，此時 fold equity 最大且 BBA 底池讓 push EV 最優
- 被 call 後，靠牌力決定，不要後悔

**BBA 短疊 Push EV 說明（10bb，BTN 位置，bubble）：**

```
BBA 底池 = SB 0.5bb + BB 1bb + BB ante 1bb = 2.5bb
Fold equity 收益 = 2.5bb（無 ante 僅 1.5bb，BBA 高 67%）
如果 fold 成功率 70%：
  BBA Fold EV = 70% × 2.5bb = 1.75bb
  無 ante Fold EV = 70% × 1.5bb = 1.05bb
```

**BBA 短疊 bubble 心態：** 「保 bubble」對短疊來說意義有限。進了圈但只有 3bb 也難有作為（而且 BBA 讓你的 bb 消耗更快）。需要積極 double up，在 8-12bb 時就主動出擊，不要等到 5bb 以下才行動。

---

## Bubble 具體場景分析（BBA 底池計算）

### 場景一：大疊 BTN 對中疊 BB

**設定：**
- 150 人 MTT，前 20 名進錢，剩 22 人（bubble 最後幾手）
- 你有 85,000（全桌最大），BB 有 35,000（接近平均）
- 盲注 2,000/4,000，**BBA 4,000**

**BBA 底池組成：**
- SB 折疊前已投入 2,000
- BB 投入 4,000（BB）+ 4,000（ante）= 8,000
- 起始底池 = 2,000 + 4,000 + 4,000 = **10,000**

**行動：** 所有前位 fold，你在 BTN，BTN open 2.5x = 10,000，SB fold，BB ??

**BB 的 BBA ICM 困境：**
- BB 需要 call 6,000（已投入 8,000，面對 BTN raise 10,000）
- 如果 call 後輸了，剩 21,000（還有一個短疊比他小，但不多）
- BBA 底池更大，call 後進入的主底池更大，一旦輸了損失更多
- 輸了很可能直接 bubble 出局，$0
- 因此 BB 的 call range 在 BBA 環境下比無 ante 大幅縮緊

**BB 對你（BTN）open 的 BBA 回應分析：**

| 手牌強度 | BB 行動 | 原因 |
|---------|---------|------|
| AA, KK | 3-bet jam | 必然行動 |
| QQ, JJ | 3-bet（視深度） | 夠強可以對抗 |
| TT, 99 | Call 或 fold | ICM 壓力下傾向 fold |
| AK | 3-bet jam 或 call | 勉強值得冒險 |
| AQ 以下 | Fold | BBA ICM 壓力讓這些牌 fold 正確 |

**你（BTN 大疊）的 BBA 策略：**
- Open range 可以放寬到 55-60%（比 BBA Nash BTN 更廣）
- BBA 讓你的 open 底池更大，c-bet 效率更高
- 翻牌後積極 c-bet，對手難以應對（BBA 讓底池更大，c-bet 的 fold equity 更高）
- 即使被 3-bet，你也有籌碼繼續作戰

**BBA 效益計算（BTN open 成功 vs 無 ante）：**
```
BBA open 成功贏得底池 = 10,000（起始）+ fold 掉的 SB 2,000 = 12,000 chips
無 ante 成功贏得底池 = 6,000 + SB 2,000 = 8,000 chips
BBA 額外收益 = 4,000 chips（每次成功）
```

**結論：** 這是大疊 bubble 最有 EV 的位置組合，BBA 環境讓這個優勢進一步放大，應該積極利用。

---

### 場景二：中疊面對短疊 Push（BBA 版本）

**設定：**
- 同上場景（22 人剩，前 20 進錢）
- 你有 40,000，UTG+2 有 12,000 push all-in，所有人 fold 到你（CO）
- 盲注 2,000/4,000，BBA 4,000

**BBA 底池計算：**
- UTG+2 push：12,000
- SB：2,000（已投入，fold 掉）
- BB：4,000 + 4,000（ante）= 8,000（已投入）
- 總底池 = 12,000 + 2,000 + 8,000 = **22,000**
- 你需要 call 12,000

BBA 需要的勝率 = 12,000 / (22,000 + 12,000) = 12,000 / 34,000 ≈ **35.3%**

（無 ante 版本：12,000 / (18,000 + 12,000) = 40%，BBA 讓 call 的 pot odds 更好）

從純 Chip EV 看，BBA 讓 call 門檻降低（從 40% 降至 35.3%），很多手牌都值得 call。

**BBA ICM 調整（bubble 中疊）：**
- 你有 40,000，輸了剩 28,000（仍然可以生存），不是直接出局
- 短疊（12,000）的 BBA push range 約 30-33%（UTG+2 BBA 位置）
- 你需要考慮：call 然後輸了，你變成 28,000，更接近 bubble 的危險區
- BBA 底池讓 call 的籌碼移動更大，ICM 代價也相應增加

**實際結論（BBA bubble 中疊）：**
- AJ+, KQs, 99+ 可以 call
- 更弱的手牌：即使 BBA pot odds 改善，ICM 損失仍然讓 call 為 break-even 或略負
- BBA 讓短疊的 push range 略寬（+3%），你需要的手牌強度也相應提高

---

### 場景三：短疊 SB push，你在 BB（BBA 版本）

**設定：**
- 剩 21 人，前 20 進錢（1 人 bubble）
- 你有 55,000，SB 有 8,000
- 盲注 2,000/4,000，**BBA 4,000**
- SB 所有前位 fold，直接 push all-in

**BBA 底池計算：**
- SB push：8,000
- BB（你已投入）：4,000（BB）+ 4,000（ante）= 8,000
- SB push 的起始底池 = 8,000 + 8,000 = **16,000**
- 你需要 call 0（SB push 8,000，你已投入 8,000，剛好平）

等等：SB push 8,000，你 BB + ante = 8,000，你不需要額外 call——你已經 pot committed！

修正計算：若 SB push 超過你的 BB + ante 投入：
- 假設 SB push 整個 8,000 籌碼，你已投入 8,000，不需要補貼就 call
- BBA 底池 = 8,000（SB）+ 8,000（你的 BB + ante）= **16,000**
- 因為你已投入 8,000 = SB push 8,000，你已等比投入，自動 call

**如果 SB push 超過 BB + ante（例如 SB 有 15,000，push 15,000）：**
- 你的 BB + ante = 8,000 已投入
- 你需要再 call 7,000
- BBA 底池 = 15,000 + 8,000 = 23,000
- 需要勝率 = 7,000 / (23,000 + 7,000) = **23.3%**（無 ante：7,000 / (15,000 + 4,000 + 7,000) = 26.9%）

**BBA 讓 BB 對 SB push 的 call 標準更低（pot odds 更好）。**

**SB 的 BBA push range（7-8bb）≈ 78-80%**：幾乎所有手牌（BBA 比無 ante 寬約 3%）

**BBA ICM 考量：**
- 如果你 fold，短疊繼續活著，bubble 維持
- 如果你 call 並贏，短疊出局，你進圈（且有不錯的籌碼量）
- 如果你 call 並輸，你損失 7,000，剩 48,000（仍然安全）
- BBA 讓底池更大，你贏得的籌碼（如果贏）更多，這進一步支持 call

**BBA 結論：** 這裡 call range 比 BBA Nash 標準寬。你 fold 不能「送」對手 survive，而且你輸了也不危險。在 BBA 環境下，大多數有成牌潛力的手牌（Q7o+、K5o+、A2o+）都應該 call。

---

### 場景四：大疊積極 steal 計算（BBA 專項）

**設定：**
- 22 人剩，前 20 進錢
- 你是大疊（90,000），BTN push 15bb = 30,000
- SB：中疊（45,000）；BB：短疊（15,000）
- 盲注 2,000/4,000，BBA 4,000

**BBA 底池分析：**

情況 A：所有人 fold（steal 成功）
- 你贏得 SB 2,000 + BB 4,000 + BB ante 4,000 = **10,000**
- 無 ante 版本只能贏 6,000

情況 B：BB 短疊 call（短疊 pot committed）
- 底池 = 30,000 + 2,000 + 8,000 = 40,000
- 你有 BB 的 BBA push range（~68%），你的 15bb push 應該對 BB 有明顯勝率

情況 C：SB 中疊 3-bet（ICM 擠壓）
- SB 中疊在 bubble 的 3-bet range 非常窄（BBA ICM 讓他們保守）
- SB 的 3-bet 近乎 AA/KK，你可以根據手牌決定應對

**大疊 BBA bubble 偷盲的綜合結論：**
成功 steal 的 EV 比無 ante 高 67%，被 call 的風險由 BBA push range 廣（折疊股權更強）抵消。大疊 bubble 的偷盲策略在 BBA 環境下應該更積極，不是更保守。

---

## Bubble 常見錯誤（BBA 環境版）

**錯誤 1：中疊過度保守，連好牌都 fold**

「反正 bubble 快到了，等等進圈再說」——但進了圈只剩 10bb 也沒用。BBA 環境下短疊的盲注消耗更快，進圈後如果籌碼太少根本無法利用 BBA 的 push EV 優勢。Bubble 期間仍需要理性的 call/fold 決策，不能讓 ICM 讓你連 AK 都不敢 call。

**錯誤 2：大疊不積極利用 BBA 優勢**

大疊在 bubble 有獨一無二的施壓能力，在 BBA 環境下這個優勢更大（每次 steal 多贏 67%）。不使用是極大的 EV 損失。每一手沒有積極 steal 的機會，就是放棄了 BBA 帶來的額外 EV。

**錯誤 3：短疊過度保守等「好牌」**

短疊等到 3-4bb 才 push 好牌，此時 fold equity 幾乎消失，push 效率極低。BBA 環境下情況更糟——每手牌需要付出 2bb（BB + ante），從 10bb 縮水到 5bb 只需要 5 手不行動。應該在 8-12bb 就積極 push，利用 BBA 底池的 fold equity 最大值。

**錯誤 4：使用無 ante 底池計算 bubble call/push 決策**

這是 BBA 環境中最常見的計算錯誤。例如：假設 100/200 底池是 300（無 ante），實際 BBA 底池是 500。使用錯誤的底池大小會讓你高估 call 的 required equity，錯過應該 call 的邊界手牌。反之，如果你是 push 方，低估底池大小會讓你低估 push EV，錯過應該 push 的邊界手牌。

**錯誤 5：線上多桌時分心**

Bubble 是最需要專注的時刻。BBA 讓每手牌的潛在籌碼移動更大，錯誤的代價也更高。線上玩家應在 bubble 附近減少桌數，確保每個 BBA ICM 決策都是清醒思考後的結果，而不是多桌壓力下的倉促決定。

**錯誤 6：對短疊 push 用無 ante call range**

在 BBA 環境下，對短疊 push 的 call 所需勝率比無 ante 低（pot odds 更好）。使用舊版無 ante call range 會讓你 fold 本應 call 的邊界手牌（如面對 10bb push 的 K9s、A7o 等）。應使用 HRC/ICMIZER BBA 模式確認 call 標準。
