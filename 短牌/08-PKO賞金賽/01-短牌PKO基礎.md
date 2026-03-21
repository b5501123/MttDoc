# 短牌 PKO 賞金賽基礎

> PKO（Progressive Knockout）= 累進賞金賽；每淘汰一名對手可獲其賞金的一半，另一半加到自己頭上。
> 短牌 + PKO = 最高方差的撲克格式之一。

---

## 目錄

1. [短牌 PKO 的特殊性概述](#短牌pko特殊性)
2. [短牌 All-In 頻率對 PKO 的影響](#allin頻率影響)
3. [追殺 EV 公式在短牌的應用](#追殺ev公式)
4. [短牌 PKO 的起始牌調整](#起始牌調整)
5. [BTN Ante 結構的偷盲策略](#btn偷盲策略)
6. [大賞金玩家的追殺時機](#大賞金追殺)
7. [短牌 PKO Bubble 策略](#bubble策略)

---

## 短牌PKO特殊性

### 概念定義

**短牌 PKO** 是將兩種特殊撲克格式結合的賽制：

- **短牌（Short Deck / 6+ Holdem）**：36 張牌，移除 2-5，Flush > Full House
- **PKO（Progressive Knockout）**：每位玩家有賞金，淘汰對手得一半，另一半加到自己頭上

**為什麼說這是「超高方差」？**

1. **短牌本身方差已高**：draw 密度大，大牌 vs 大牌的機率高，flip 頻繁
2. **PKO 的賞金 EV 增加投入誘因**：即使 EV 略負，有賞金時 call 更寬
3. **兩者疊加**：玩家在短牌 PKO 中會更頻繁 all-in，且更願意在劣勢下追殺賞金

**歷史背景：**

- 短牌最知名的賽事：Triton Poker（亞洲高額注）
- Triton 引入了短牌 PKO 格式，吸引了大量動作型玩家
- GGPoker 也有線上短牌 PKO 遊戲（Jackpot PKO 格式）

**方差數據（對比）：**

| 格式 | 相對方差等級 | 特點 |
|------|------------|------|
| NLH MTT | 基準（100） | 標準方差 |
| NLH PKO MTT | 120–140 | 追殺誘因增加方差 |
| 短牌 MTT | 150–170 | Draw 密度增加方差 |
| 短牌 PKO MTT | 200–250 | 雙重疊加 |

---

## All-In頻率影響

### 短牌的 All-In 頻率為何更高？

**原因一：Draw 密度高**

在 36 張牌的短牌中：
- 每張手牌與翻牌的連結性更強
- 翻牌出現 draw（flush draw、straight draw）的概率更高
- 玩家更願意「帶 draw 進大底池」

**計算：短牌 vs NLH 的 all-in 頻率估算**

假設在翻牌，一位玩家有 9-out flush draw：
- NLH：9 outs / 47 剩餘牌 ≈ 19% per street
- 短牌：假設 5 outs / 31 剩餘牌 ≈ 16% per street（outs 少但 equity 計算更複雜）

但短牌玩家因為有「Flush > Full House」的心理，更願意追 flush，導致：
- 有 flush draw 的玩家更積極投入底池
- 翻牌後 all-in 的比例比 NLH 高 30–40%

**原因二：起始牌的 equity 分佈更均勻**

短牌中，強牌 vs 強牌（例如 KK vs QQ）的 equity 差距較 NLH 小：
- NLH：KK vs QQ = 81%/19%
- 短牌：KK vs QQ ≈ 73%/27%（因為 QQ 在短牌中 straight 和 flush 可能性增加）

這意味著玩家在短牌中面對強牌時更願意 call（因為 equity 差距小）。

**原因三：BTN Ante 結構**

短牌的 BTN ante 結構（而非傳統 big blind ante）意味著：
- BTN 每手付較大的 ante
- BTN 的「有效 open 成本」更高
- 所有玩家對 BTN 的攻擊和反擊更頻繁，導致更多 all-in 對抗

---

### All-In 頻率對 PKO 賞金計算的影響

**核心問題：短牌中更頻繁的 all-in 如何改變 PKO 賞金 EV？**

**基本 PKO 賞金 EV 公式：**

```
Bounty EV = P(knock out opponent) × opponent's bounty value
```

在短牌中，因為 all-in 更頻繁，每局遇到「可能追殺」機會的次數更多。

**具體影響：**

1. **短疊更快進入 push/fold 模式**：短牌的 BTN ante 結構讓 effective stack 下降更快，短疊的賞金更容易被追殺
2. **更多 multi-way all-in**：短牌中 3-way 或 4-way all-in 比 NLH 更頻繁，PKO 賞金分配更複雜
3. **賞金 EV 的折扣效應**：在 multi-way all-in，你只有部分概率淘汰對手，賞金 EV 需除以人數

---

## 追殺EV公式

### PKO 追殺 EV 的短牌應用

**標準 PKO 追殺 EV 公式：**

```
追殺 call EV = Chip EV（call）+ Bounty EV - ICM 成本
```

其中：
```
Bounty EV = P(win) × (Opponent Bounty / 2)
```

**短牌調整：**

由於短牌的 equity 分佈更均勻，P(win) 通常比 NLH 低（更多 flip 情況）。

**範例計算：**

**場景：**
- 你有 K♠Q♠（短牌翻牌前），60bb 深疊
- 對手 all-in push（20bb），他的賞金 = $200
- 你是唯一有機會 call 的玩家
- 你的 K♠Q♠ vs 對手的 push range（≈30% of hands）

**計算步驟：**

Step 1：計算 Equity

假設對手的 push range：AA, KK, QQ, JJ, TT, 99, AK, AQ, AJ

你的 K♠Q♠ vs 這個 range 的 equity：
- vs AA：約 32%
- vs KK：約 29%
- vs QQ：約 26%（你有 Q）
- vs JJ：約 53%
- vs TT：約 55%
- vs 99：約 57%
- vs AK：約 42%
- vs AQ：約 40%（你有 Q）
- vs AJ：約 52%

加權平均 equity ≈ 44%（假設 range 分佈均勻）

Step 2：計算 Chip EV

```
底池 = 20bb（對手）+ 1bb（SB ante 或 BB，取決於位置）
你 call = 20bb
Call EV（chip）= 0.44 × 41bb - 20bb = 18.04 - 20 = -1.96bb
```

Chip EV 為負，但...

Step 3：加入賞金 EV

```
Bounty EV = 0.44 × ($200 / 2) = 0.44 × $100 = $44
```

Step 4：ICM 成本估算

在深疊中期，ICM 影響較小，假設 ICM 成本 ≈ $5

Step 5：總 EV

```
總 EV = Chip EV + Bounty EV - ICM 成本
      = (-1.96bb × $換算率) + $44 - $5
```

假設 1bb = $10：
```
總 EV = -$19.6 + $44 - $5 = +$19.4（正值！）
```

**結論：雖然 Chip EV 為負，賞金 EV 使得 call 成為正 EV 決策。**

---

### 短牌特殊調整（修正 equity）

短牌中，K♠Q♠ 的 equity 可能比 NLH 稍低或稍高，取決於 board 紋路：

- **Short deck connector 優勢**：KQs 在短牌中 straight/flush 可能性更高
- **但對手的 AA/KK 也有更多 straight 可能**：equity 差距縮小

實際上在短牌 PKO，你應該：
1. 比 NLH PKO 更頻繁追殺（因為 equity 更均勻）
2. 但也要記住 all-in 失敗後的 ICM 損失更大（短牌高方差）

---

## 起始牌調整

### 短牌 PKO 的翻牌前 Range 調整

**標準短牌 MTT vs 短牌 PKO 的主要差異：**

在短牌 PKO 中，你有額外的「追殺誘因」，這影響你的開牌 range 和 call range。

**調整原則一：適當放寬 call range（追殺時）**

當對手是短疊且你能追殺時，你可以接受更低的 equity 來 call all-in：

- NLH PKO：需要約 40%+ equity 才考慮 call
- 短牌 PKO：可能 35%+ equity 已足夠（賞金溢價）

**調整原則二：suited 牌的溢價更高**

短牌中 flush > full house，suited 牌的 EV 更高，在 PKO 中 flush 完成後可以更積極地追殺：

| 牌型 | NLH 評估 | 短牌 PKO 評估 |
|------|----------|--------------|
| AKs | 極強 | 極強（保持） |
| KQs | 強 | 非常強（溢價） |
| JTs | 好 | 非常好（溢價） |
| 98s | 中等 | 好（溢價） |
| AKo | 強 | 強（保持，但稍弱於 suited） |
| KQo | 中等 | 中等（短牌 offsuit 折扣大） |

**調整原則三：Blockers 效果在短牌中略不同**

短牌 36 張牌，每張牌的 block 比例更高（每張牌佔 1/36 而非 1/52）：
- 持有 A♠ 在短牌中 block 的 flush 比例更大
- PKO 中 block 賞金手牌（例如大疊有 A 的手牌）也有 block 效果

---

### 具體起始牌範例

**範例 1：中疊 40bb，面對短疊 8bb push（他有 $100 賞金）**

你在 BB，手牌：J♦9♦

分析：
- J♦9♦ vs push range（所有牌 = 36 張的所有組合，短疊超短 push 幾乎 all hands）
- 假設 equity ≈ 55%（對手 push range 很廣）
- Bounty EV = 0.55 × $50 = $27.5
- Chip EV = 0.55 × 17bb - 8bb = 9.35 - 8 = +1.35bb（正值）
- 總 EV = 正值

**結論：J♦9♦ 面對超短疊 push 應 call（短牌 PKO 中）**

**範例 2：中疊 35bb，CO open to 2.5bb，CO 有 $200 賞金**

你在 BTN，手牌：8♠7♠

分析：
- 標準 BTN 面對 CO open，8♠7♠ 是一個 call/fold 邊界牌
- 但 CO 有 $200 賞金！
- 若你 3-bet 並成功讓 CO all-in：Bounty EV = P(win) × $100
- 8♠7♠ 的 3-bet 作為 semi-bluff + 追殺可能是合理的

**短牌 PKO 特殊策略：賞金玩家面前的 squeeze 頻率更高**

---

## BTN偷盲策略

### 利用 BTN Ante 結構在 PKO 中的偷盲策略

**短牌 BTN Ante 的特殊性：**

在標準短牌中，只有 BTN 付 ante（而非所有玩家付 antes）。這有以下意義：

1. **BTN 的成本高**：BTN 每手付 ante + 可能付 call，實際成本更高
2. **攻擊 BTN 的 EV 更高**：BTN 防守成本高，他需要更廣的 defend range
3. **SB/BB 偷 BTN ante 的機會**：BTN fold 後，ante 留在底池，偷盲更值

**在 PKO 中的特殊應用：**

**場景：BTN 是大賞金玩家**

如果 BTN 有大賞金（例如 $300），其他玩家更願意：
- 和他對抗（追殺機會）
- 在他 steal 時 3-bet（製造追殺機會）
- 在 SB 或 BB 面對他的偷盲，call 更寬（可能贏賞金）

**偷盲頻率調整：**

一般短牌 MTT 的 BTN open range：約 45–55%（幾乎所有 playable hands）

短牌 PKO 中，BTN 面對後手有大賞金時：
- 應稍微縮窄 open range（避免被追殺）
- 或維持 range 但 c-bet 頻率降低（減少底池大小）

**SB vs BTN 在 PKO 的策略調整：**

SB 面對 BTN open，若 BTN 有大賞金：
- 3-bet range 可以適當放寬（追殺誘因）
- 但注意：若 BTN 4-bet，你需要更強的牌才能繼續（避免 ICM 損失）

---

### 偷盲策略的 PKO 修正

**標準情況（無大賞金）：**

BTN open → SB 3-bet range 約 12–15%

**有大賞金情況：**

BTN 有 $200+ 賞金，SB 的 3-bet range 可以擴展到 18–22%

具體擴展的牌：
- Suited connectors（87s, 76s）：有 draw equity + 追殺潛力
- Suited broadways（KTs, QTs）：strong equity + flush 潛力
- Pocket pairs（99, 88, 77）：set mining + 潛在賞金追殺

**BTN 大賞金的 3-bet/4-bet 注意事項：**

若你 3-bet 追殺 BTN 大賞金，他可能：
1. **Fold**：你沒有追殺機會（得到底池 value 但沒有賞金）
2. **Call**：翻牌後有機會 all-in（追殺機會）
3. **4-bet**：他可能有強牌，你需評估是否繼續（5-bet 或 fold）

最優策略：3-bet sizing 讓 BTN 傾向 call（不是太大讓他 fold，不是太小讓他輕鬆 call）

---

## 大賞金追殺

### 大賞金玩家在短牌桌上的追殺時機

**定義大賞金玩家：**

當一位玩家的賞金超過平均賞金 3 倍以上時，他成為「大賞金玩家」（Big Bounty Player, BBP）。

**短牌中追殺大賞金的特殊機會：**

**機會 1：BBP 作為短疊**

如果 BBP 已成為短疊（15bb 以下），他接近 push/fold 模式。
短牌中，你應該：
- 在 BBP 的盲注位置時，拓寬你的 raise range（他需要 defend 更廣）
- 面對 BBP push，用更寬的 range call（賞金 EV 補償 chip EV 的不足）

**計算示例：BBP 有 $400 賞金，短疊 10bb push**

你（40bb 中疊）在 BB，hand：T♦9♦

- T♦9♦ vs BBP push range（≈50% 的牌，因為很短了）：equity ≈ 52%
- Chip EV = 0.52 × 21bb - 10bb = 10.92 - 10 = +0.92bb（微正）
- Bounty EV = 0.52 × $200 = $104
- ICM 成本（中期，非 bubble）= 約 $10–20

**總 EV = +$0.92bb × 換算率 + $104 - $15 ≈ 非常正**

即使是弱牌（T♦9♦），追殺大賞金的 EV 也很高！

---

**機會 2：BBP 是深疊**

如果 BBP 是深疊（80bb+），追殺更難：
- 他不需要 all-in，你很難「順便」追殺
- 但你可以通過 Squeeze play 製造機會

**Squeeze 追殺 BBP：**

```
情境：BTN（BBP，大賞金）open，CO call
你在 SB，squeeze 3-bet
```

目標：讓 BBP fold（得到 pot）或讓 BBP 4-bet（更大追殺機會）

但注意：Squeeze 追殺的 EV 計算更複雜，需考慮：
- BBP fold 概率（失去追殺機會）
- CO fold 概率（只剩 BBP）
- BBP call 概率（翻牌後機會）
- BBP 4-bet 概率（更大底池，更大風險）

---

**機會 3：Multi-way 底池中的 BBP**

短牌 PKO 的 multi-way all-in：

如果 BBP 在 3-way 或 4-way all-in：
- 你淘汰他的概率 = 約 33%（3-way）或 25%（4-way）
- Bounty EV = P(you win, BBP loses) × BBP bounty / 2

**短牌多人 all-in 的賞金分配計算：**

```
3-way all-in（你、BBP、第三人），BBP 賞金 $300
P(你贏) = 33%（假設均等概率）
P(BBP 最後出局，而你贏) = 考慮 BBP 必須在你之前出局的概率
簡化：Bounty EV ≈ P(BBP 出局且你在場) × $150
```

在短牌中，multi-way all-in 比 NLH 更複雜，建議使用工具計算（後文提到的 ICMIZER 短牌版本）。

---

## Bubble策略

### 短牌 PKO Bubble 策略

**Bubble 定義（PKO 特殊版）：**

在 PKO 賽事的 Bubble，有兩種 EV：
1. **Prize EV**：進圈 vs 泡沫的 ITM EV
2. **Bounty EV**：當前存活玩家的賞金 EV

這兩種 EV 有時方向相同，有時衝突。

---

**情境 1：Bubble 中你有機會追殺短疊（打人進圈）**

```
Bubble 還差 1 人入圈
你（60bb）在 BTN
短疊（8bb，賞金 $150）push from UTG
所有人 fold 到你
```

決策分析：

- **純 ITM 角度（不考慮賞金）**：60bb 中大疊追殺短疊 = 風險較低（你有 cover），但仍有 ICM 成本（若輸，你降到 52bb）
- **加入賞金 EV**：
  - 你的手牌（假設 A♥J♦）vs 短疊 push range（超廣，接近 ATC）equity ≈ 60%
  - Bounty EV = 0.60 × $75 = $45
  - ICM 成本（Bubble，你輸後降 8bb）= 約 $15–25
  - Chip EV（60%勝率 vs 8bb pot）= 微正

**總 EV = 正值，應 call！**

**關鍵原則：PKO Bubble，大疊追殺短疊的 EV 幾乎總是正的（賞金補償 ICM 風險）。**

---

**情境 2：Bubble 中有人 squeeze 你（你是 BBP）**

如果你是桌上的大賞金玩家，在 Bubble 期間你會面對更多攻擊：

- 其他玩家知道你的賞金高，會更頻繁 3-bet/squeeze
- 你需要縮緊防守 range（因為 ICM 損失大）
- 或者識別 squeeze bluffs 並適當 4-bet

**對抗追殺的防守策略：**

1. **縮窄開牌 range**：Bubble 期間，開牌 range 稍微收緊（防止被 squeeze）
2. **面對 3-bet，fold 更寬**：你的 ICM 成本高，應避免邊際翻牌前決策
3. **識別 "Bounty hunter"**：如果某玩家一直對你 3-bet，他可能是在追殺你而非有強牌

---

**情境 3：Bubble 即將破，多個短疊存在**

**Bubble 策略的「耐心 vs 激進」平衡：**

```
桌上有：
你（50bb）、大疊（80bb）、中疊（40bb）、短疊 A（10bb，$100 賞金）、短疊 B（7bb，$80 賞金）
Bubble 差 1 人入圈
```

選項：
1. **等待**：讓短疊 A 和 B 自然淘汰（不冒 ICM 風險）
2. **主動追殺**：選擇性追殺短疊（賞金 + ICM 雙贏）

**分析：**

- 若你「等待」：很可能大疊會先追殺短疊，你失去賞金機會
- 若你「主動追殺」（選擇性）：在有利位置和強牌時攻擊短疊

**最優策略：選擇性主動追殺**

條件：
- 你有強牌（不是邊界牌）
- 你有 cover（你的籌碼 > 短疊）
- 位置有利（IP 更好）
- 短疊賞金 > 你的 ICM 風險成本

---

**短牌 PKO Bubble 的特殊考量：**

1. **短牌的 all-in 更頻繁**：Bubble 期間意外的「被動 all-in」更多（翻牌後手牌強度提升快）
2. **Flush draw 的誘惑**：有時你在 Bubble 有 flush draw，是否追殺短疊？
   - 有 flush draw + 短疊賞金 = 通常 yes（draw equity + bounty EV）
   - 但要計算 ICM 成本
3. **多人 all-in 在 Bubble**：短牌中可能發生 3-way all-in，Bubble 期間要格外謹慎

---

## 策略總結表

### 短牌 PKO 基礎策略摘要

| 情境 | 標準 NLH PKO | 短牌 PKO 調整 |
|------|-------------|-------------|
| 追殺短疊（有賞金） | 需 equity ≥ 40% | 需 equity ≥ 35%（draw 補償） |
| Bubble 追殺 | 謹慎，ICM 優先 | 選擇性追殺，賞金 EV 補償 |
| 大賞金玩家是大疊 | 需製造機會 | Squeeze 追殺，short deck draw 支援 |
| BTN open range | 標準 | 偏向 suited，flush 溢價 |
| Suited 牌溢價 | 小幅溢價 | 大幅溢價（Flush > Full House） |

### 短牌 PKO 的 EV 計算模板

```
短牌 PKO Call EV =
  P(win) × Pot Size（chips）
  + P(knock out target) × Target Bounty / 2
  - ICM Cost（根據賽段調整）
  - EV Loss to other players（multi-way 情況）
```

---

## 常見錯誤與糾正

**錯誤 1：把短牌 PKO 當成純 chip EV 遊戲**

糾正：在 PKO 中，賞金 EV 至關重要。chip EV 為負的 call 可能因賞金而成為正 EV。

**錯誤 2：忽視 Flush > Full House 對 PKO 手牌評估的影響**

糾正：在短牌 PKO 中，有 flush draw 追殺的 EV 比 NLH 更高（flush 在短牌中更有價值且更頻繁完成）。

**錯誤 3：在 Bubble 不追殺短疊**

糾正：Bubble 期間，大疊追殺短疊（有賞金）幾乎總是正 EV（賞金補償 ICM 成本）。

**錯誤 4：低估 multi-way all-in 的賞金計算複雜性**

糾正：multi-way all-in 需要正確計算每個玩家淘汰的概率，避免過度自信追殺。

---

*下一章：短牌 PKO 進階策略 — 多人 all-in 情境、複雜賞金 EV 計算和 Final Table 策略*
