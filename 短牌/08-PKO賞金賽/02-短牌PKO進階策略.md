# 短牌 PKO 進階策略

> 本章深入探討短牌 PKO 的多人 all-in 情境、複雜賞金 EV 計算，以及 Final Table 的高壓決策。

---

## 目錄

1. [短牌 PKO 多人 All-In 情境分析](#多人allin分析)
2. [賞金 EV vs ICM EV 的短牌特殊計算](#賞金ev計算)
3. [短疊 vs 大疊的 PKO 互動](#短疊大疊互動)
4. [具體手牌情境：Bubble 的 Call/Fold 決策](#bubble手牌決策)
5. [Final Table 短牌 PKO 策略](#finaltable策略)

---

## 多人AllIn分析

### 短牌 PKO 多人 All-In 情境

**短牌 multi-way all-in 的頻率：**

短牌由於 draw 密度高，多人底池更容易升級到 all-in。以下是典型場景：

**場景 A：3-way all-in（翻牌前）**

```
Blinds 500/1,000，BTN ante 1,000
UTG（30bb）push all-in
CO（28bb）call
BTN（45bb）call with squeeze logic
```

這種情況在短牌 PKO 中比 NLH 頻繁得多。

**三人 all-in 的賞金 EV 計算：**

假設：
- UTG 賞金 $150，CO 賞金 $100，BTN 賞金 $80
- 你是 CO（call 的玩家），hand：J♠T♠
- UTG hand：A♦K♣
- BTN hand：Q♣Q♦

**Equity 計算（短牌 3-way）：**

J♠T♠ vs A♦K♣ vs Q♣Q♦（短牌）

短牌中：
- JTs 的 straight 和 flush 潛力
- AKo 的高牌價值
- QQ 的 pair 優勢

估算 equity（近似值）：
- JTs：約 27%
- AKo：約 33%
- QQ：約 40%

**賞金計算（你是 CO with JTs）：**

```
你淘汰 UTG 的 Bounty EV：
  P(你贏，UTG 出局) ≈ 需要 UTG 出局而你在場
  = P(你有最多籌碼且 UTG 沒有）
  複雜計算，簡化為：約 20–25%
  Bounty EV(UTG) ≈ 0.22 × $75 = $16.5

你淘汰 BTN 的 Bounty EV：
  類似計算，BTN 賞金 $80
  Bounty EV(BTN) ≈ 0.22 × $40 = $8.8

總 Bounty EV ≈ $25
```

**總體 3-way all-in EV：**

```
Chip EV（JTs，27% equity）：
  底池 = 84bb（28+28+28... 各方 all-in 但金額不同需按最小確認）
  簡化：JTs 全部贏 = +56bb（約），期望 = 0.27 × 56bb ≈ 15bb
  投入 = 28bb
  Chip EV = 15 - 28 = -13bb（負值）

Bounty EV ≈ $25（正值）

ICM 成本（中期賽段）= 約 $10

總 EV = -13bb × 換算率 + $25 - $10
```

若 1bb = $5：
```
總 EV = -65 + 25 - 10 = -$50（負！）
```

**結論：CO 的 J♠T♠ call 3-way all-in 是負 EV 的，尤其在 ICM 不利的情況下。**

---

**短牌 3-way All-In 正確計算方法：**

需要使用 PKO-aware ICM 計算工具（如 ICMIZER + PKO 模組，後文提及）。

手動計算框架：

```
1. 計算每種籌碼結果的概率（誰贏、誰第二、誰出局）
2. 對每個結果計算 Prize EV（ICM）
3. 對每個結果計算 Bounty EV
4. 加總 → 真實 EV
```

---

**場景 B：4-way all-in（翻牌後，短牌特有）**

```
翻牌：J♠T♠9♠（三張黑桃）
底池中有 4 位玩家，各自 push
```

在短牌中，這種「全桌 all-in」在 flush + straight 豐富的翻牌上很常見。

**4-way all-in 的賞金計算複雜性：**

- 4 位玩家 all-in = 每位只有 25% 左右的概率淘汰特定對手
- 但如果你是「有最多籌碼的玩家」，你可以淘汰多人

**覆蓋（Cover）的概念：**

- 如果你有最多籌碼（cover 所有人），且所有人都出局 = 你得到所有人的賞金
- 如果你出局 = 你失去籌碼，其他某一人得到你的賞金

---

### Multi-way All-In 的決策框架

**決策框架：**

```
Step 1：計算你的 equity（短牌 multi-way equity 計算器）
Step 2：計算 Bounty EV for each potential elimination
Step 3：計算 ICM 成本（根據賽段）
Step 4：加總 → 決策
```

**快速估算規則（短牌 PKO）：**

| 有效玩家數 | equity 門檻（純 chip） | 加入賞金後門檻 |
|-----------|----------------------|--------------|
| 2-way | 50% | 約 40% |
| 3-way | 33% | 約 26% |
| 4-way | 25% | 約 18% |

短牌中，因 draw 豐富，equity 更均勻，門檻需適當調高：
- 2-way：加入賞金後門檻約 35–40%
- 3-way：加入賞金後門檻約 22–28%

---

## 賞金EV計算

### 賞金 EV vs ICM EV 的短牌特殊計算

**兩種 EV 的定義：**

1. **ICM EV（Prize EV）**：基於 ICM 模型計算的「進圈 / 名次」價值
2. **Bounty EV**：通過淘汰對手獲得的賞金價值

在某些情況下，這兩個 EV 方向相反：
- ICM 鼓勵保守（避免淘汰）
- Bounty EV 鼓勵積極（追殺賞金）

**何時 Bounty EV 壓倒 ICM EV？**

**規則：當 Bounty EV > ICM Cost 時，追殺是正確的**

**計算短牌 PKO 的 ICM Cost：**

ICM Cost = 你在某手牌輸後損失的 Prize EV

```
ICM Cost ≈ Prize EV（當前籌碼量）- Prize EV（輸後籌碼量）
```

**範例：Bubble 期間，你（50bb）追殺短疊（10bb，賞金 $100）**

你的手牌：K♦Q♦（短牌）

```
當前 Prize EV（50bb，Bubble）= $400（假設）
若輸：你（40bb，Bubble）= $350（假設）
ICM Cost = $400 - $350 = $50

Bounty EV：
  你的 equity（KQs vs push range）= 55%
  Bounty EV = 0.55 × $50 = $27.5

總 EV = -$50（ICM Cost）+ $27.5（Bounty）+ Chip EV（微正）= 約 -$20（負！）
```

**在 Bubble 期間，這個 call 可能是負 EV 的！**

但如果賞金更大：

```
若短疊賞金 $300：
Bounty EV = 0.55 × $150 = $82.5
總 EV = -$50 + $82.5 = +$32.5（正！）
```

**結論：賞金大小是 Bubble 決策的關鍵因素。**

---

**短牌特殊調整：短牌的 equity 更難預測**

在短牌中，KQs 的翻牌後 equity 波動更大：
- 翻牌前 equity 55%（對廣 range）
- 翻牌後可能 80%（完成 flush）或 20%（對手完成 flush）

這種波動性意味著：
- 短牌 PKO 的 EV 計算需要考慮「翻牌後 equity 的方差」
- 即使期望 EV 為正，標準差（SD）也可能很大

**短牌 PKO 的 EV 計算要考慮 variance：**

```
調整後 EV = Expected EV - Risk Premium（基於 variance）
```

Risk Premium 的大小取決於你的 bankroll 和賽事規模。

---

### 賞金 EV 計算的實戰應用

**快速計算方法（不用工具）：**

1. **估算你的 equity**（翻牌前用 range 估算）
2. **計算 Bounty EV**：equity × 對手賞金 / 2
3. **估算 ICM Cost**：賽段（初期 = 低、Bubble = 高、Final Table = 最高）× 10–30%
4. **比較**：Bounty EV > ICM Cost？→ 追殺

**不同賽段的 ICM Cost 係數：**

| 賽段 | ICM Cost 係數 | 建議 |
|------|--------------|------|
| 早期（進圈 50%+）| 5–10% | 積極追殺 |
| 中期（進圈 30%）| 15–20% | 選擇性追殺 |
| Bubble（差 1–3 人）| 30–50% | 只追殺大賞金 |
| Final Table | 20–35% | 根據位置調整 |

---

## 短疊大疊互動

### 短疊 vs 大疊的 PKO 互動（短牌中 Flip 更常見）

**「Flip」在短牌的定義：**

在 NLH 中，flip 通常指兩張牌 vs 兩高牌（例如 TT vs AK，約 50/50）。

在短牌中，更多的組合接近 flip：
- AA vs KK（短牌）：約 79/21（比 NLH 的 82/18 更接近）
- KK vs QQ（短牌）：約 74/26（比 NLH 更接近 flip）
- JTs vs KK（短牌）：約 40/60（比 NLH 更接近 flip，因為 draw 更豐富）

**更多 flip 對短牌 PKO 的影響：**

1. **大疊更願意追殺大賞金短疊**：flip 情況下，chip EV 輕微不利，但賞金 EV 可能補償
2. **短疊的生存更依賴運氣**：短牌的 flip 頻率高，短疊在 push 後「翻盤」的概率也略高
3. **保守型大疊的劣勢**：在短牌 PKO 中，過於保守的大疊會被積極型玩家超越

---

**短疊 Push/Fold 在短牌 PKO 的特殊性：**

**短疊（10–15bb）在短牌 PKO 中的 push range 通常更廣：**

原因：
1. 短牌的翻牌後 equity 波動大，寧願翻牌前 all-in
2. 短疊有賞金，他希望被 call（讓對手冒險），增加自己的被動 value
   - 等等，短疊賞金也在他身上，被淘汰後另一人得到他賞金的一半
   - 所以短疊希望 **fold** 對手，或用強牌 call（不是希望被以弱牌 call）

**實際上短疊的最優策略：**

- **有賞金的短疊** 應該比 NLH 更緊（因為他賞金對自己有價值，被淘汰損失更大）
- 但 ICM 因素同樣影響：若不 push，blind 會耗盡

**均衡：有賞金的短疊在 10bb 時的 push range 比 NLH 稍窄（大約少 5–10% 的手牌）**

---

**大疊 Call Range 的調整（面對短疊 push）：**

NLH PKO 大疊 call range vs 短疊 push：通常需要約 35–40% equity

短牌 PKO 大疊 call range 調整：
- 若對手是大賞金短疊：需要約 30–35% equity（賞金補償更多）
- 若對手是小賞金短疊：維持 40% equity 門檻

**套用到具體手牌：**

```
場景：BTN ante（你是 BTN，50bb）
UTG（12bb，賞金 $200）push all-in
所有人 fold 到你

你的手牌選擇：
- AA：絕對 call（任何情況）
- KK：絕對 call
- AK：call（equity 約 55%，bounty EV 補償）
- AQ：call（equity 約 50%，bounty EV 使 EV 正）
- QQ：call（equity 約 53%）
- JTs：call！（短牌，equity 約 42%，bounty EV = 0.42 × $100 = $42，足夠補償）
- 98s：邊界（equity ≈ 38%，bounty EV = $38，ICM 成本約 $15 = +EV）
```

**在大賞金 + 短牌情況下，你的 call range 可以擴展到幾乎所有 suited connectors！**

---

## Bubble手牌決策

### 具體手牌情境：短牌 PKO Bubble 的 Call/Fold 決策

#### 情境 1：Bubble 差 1 人，你是中大疊追殺短疊

**設定：**

- 9 個玩家，8 人進圈（差 1 人出局）
- 你（55bb），大疊（90bb），中疊 A（35bb），中疊 B（30bb），短疊 A（8bb，賞金 $120），短疊 B（6bb，賞金 $80）
- Blinds：1,000/2,000，BTN ante 2,000
- 你在 CO
- 短疊 A（8bb）從 BTG（Big Blind 位）push all-in 2,000

等等，讓我重新描述：

**設定：**

- 短疊 A（8bb）在 UTG push all-in（16,000）
- 所有人 fold 到你（CO，55bb）
- SB fold，BB fold

你的手牌：A♠9♦（offsuit）

**計算 ICM Cost（Bubble 差 1 人）：**

在 Bubble，你（55bb）的 Prize EV 很高（幾乎保證進圈）。
- 若你贏：你有 63bb，進圈概率 100%
- 若你輸：你有 47bb，仍進圈（仍有足夠籌碼），但 ICM value 降低

ICM Cost（Bubble）= 相對較小（你仍然進圈，不是出局）

估算：ICM Cost ≈ $15

**Equity 計算：**

A♠9♦ vs UTG 8bb push range（假設廣，但有一定強度）

估算 range = 所有 suited aces, suited connectors, broadways, small pairs
A9o vs 這個 range ≈ 50–55% equity（A 高牌有優勢）

**Bounty EV：**

0.52 × $120 / 2 = 0.52 × $60 = $31.2

**總 EV：**

Chip EV（約 8bb 微正，52% equity vs 8bb）+ $31.2 - $15 ICM ≈ 正 EV

**結論：A♠9♦ 在 Bubble 追殺 8bb 短疊（有賞金）= 正 EV call！**

---

#### 情境 2：Bubble 你是短疊，是否對大賞金玩家玩大

**設定：**

- 你（10bb），大賞金玩家（40bb，賞金 $300），其他短疊（12bb，6bb）
- Blinds：1,000/2,000，BTN ante 2,000
- 你在 SB，大賞金玩家（BBP）在 BTN open（4,000）
- 你的手牌：Q♦J♠（offsuit）

**選項分析：**

1. **Fold**：保持 9bb，繼續等待
2. **Call**（剩 6bb）：OOP 短疊 call = 不建議
3. **Push all-in（10bb）**：

Push EV：
- QJo vs BTN open range（廣，40%）：equity ≈ 47%
- BTN（BBP）fold 概率：若你 push，BTN 可能 fold（他是大賞金，ICM 謹慎）
- BTN call 概率：約 50%

若 BTN fold：
- 你贏 4,000 + antes = 約 7,000 chips = 3.5bb（很重要！）

若 BTN call（50% 概率，BTN range 大概是 AA, KK, AK, AQ, JJ, TT for call）：
- QJo vs 這個 range = equity 約 35%
- Chip EV = 0.35 × 21bb - 10bb = 7.35 - 10 = -2.65bb
- ICM 損失（你出局）= 你失去賞金的一半（他得到你賞金的一半）
- 但你也有機會淘汰 BBP = Bounty EV = 0.35 × $150 = $52.5（你有 $300/2 的機會）

**複合 EV：**

```
Push EV = P(fold) × 底池 EV + P(call) × [Chip EV + Bounty EV - ICM Cost]
        = 0.5 × 3.5bb + 0.5 × [-2.65bb + $52.5 value - ICM Cost]
```

ICM Cost（你出局，短疊）= 約你進圈 Prize 的全部 = 假設 $100（你的 ITM 期望）

```
= 0.5 × 3.5bb + 0.5 × [-2.65bb + $52.5 - $100]
```

這很複雜。但關鍵是：追殺大賞金（$300）讓 push EV 更好。

**結論：QJo 面對大賞金 BTN，push 是可以考慮的，但需更強的牌（KJ+, QTs+）才更好。**

---

#### 情境 3：3-way Bubble，你的 flush draw 是否 all-in？

**設定：**

- Bubble 差 2 人入圈（3 人中 1 人泡沫）
- 你（35bb），中疊（45bb），短疊（12bb，賞金 $150）
- 翻牌後：你有 flush draw（9 outs → 短牌 6 outs），短疊 all-in
- 底池 30bb，你需要 call 12bb

**Flush Draw 的 equity（短牌）：**

6 outs over 2 streets ≈ 35% (flush draw 完成概率，短牌)

**Bounty EV（若你淘汰短疊）：**

P(你淘汰短疊) = P(你贏且短疊輸)

在 3-way（中疊也在）：
- P(你贏) ≈ 35%（flush equity）
- P(短疊同時出局，中疊不出局）= 複雜

簡化：P(你淘汰短疊) ≈ 25%（需要你有最多籌碼且短疊出局）

Bounty EV = 0.25 × $75 = $18.75

**Pot Odds：**

12bb to win 42bb = 3.5:1 = 需要 22% equity

你的 35% equity > 22% = Pot odds 已足夠！

加上 Bounty EV，這個 call 更加有利。

**結論：有賞金的 flush draw 在 Bubble 通常是 call（短牌中尤其如此，因為 flush 更有價值）。**

---

## FinalTable策略

### Final Table 短牌 PKO 策略

**Final Table 的特殊性：**

1. **ICM 壓力最大**：每個名次差距可能是數倍 prize
2. **賞金累積到高峰**：Final Table 玩家的賞金是最高的
3. **短牌的大底池加速淘汰**：Final Table 會比 NLH Final Table 更快結束

---

**Final Table 賞金分佈的典型情況：**

假設 9-max Final Table，起始賞金各 $100，累積後：

| 位置 | 賞金大小（估算） |
|------|----------------|
| Chip leader | $600–900 |
| 中間籌碼 | $200–400 |
| 短疊 | $100–150 |

Final Table 的賞金可以非常大，淘汰大賞金玩家 = 巨大 EV。

---

**Final Table 策略 1：目標化追殺（Targeted Hunting）**

識別 Final Table 上的大賞金玩家，系統性創造對抗機會：

1. **隔位攻擊（Isolation Raise）**：大賞金玩家 limp，你 isolation raise
2. **Squeeze 機會**：兩位玩家間接面對大賞金，你 squeeze
3. **Blind Battle 利用**：大賞金玩家在盲注位，更積極 3-bet

**心理戰術：**

大賞金玩家自己知道被追殺，所以：
- 他可能縮緊開牌 range（怕被 stack off）
- 他可能在翻牌後快速棄牌（怕被 trap）
- 你可以利用這一點：用小 size c-bet 誘他 fold，或 check 誘他 bluff

---

**Final Table 策略 2：短疊 Push/Fold 的賞金調整**

Final Table 短疊的 push/fold range 需要考慮賞金：

**你是短疊（12bb），Final Table，有 $200 賞金：**

你的 push range 應該稍窄（因為你的賞金價值大，被淘汰損失更大）：

- NLH Final Table 12bb：push range 約 40–50%
- 短牌 PKO Final Table 12bb：push range 約 30–40%（縮緊 10%）

**你是大疊（60bb），面對短疊 push（大賞金 $300）：**

- Call range 更廣
- 即使是邊界牌（例如 K7s, QTs），賞金 EV 可能使 call 正確

---

**Final Table 具體手牌：**

**Hand 1：你 25bb，BTN，短疊（8bb，賞金 $250）在 BB**

你手牌：K♠T♦

選項：
1. **Fold**：失去機會，維持 25bb
2. **Open to 18,000（2.5bb）**：讓 BB 決策（他可能 fold 或 all-in）
3. **Push all-in（25bb）**：最大化 fold equity + 追殺機會

分析：
- KTo 是中等強度牌，不是 premium
- 對 8bb 短疊，push 25bb 可能讓他 fold（他怕輸，即使有賞金）
- 若他 call（range = 強牌），KTo 的 equity ≈ 40–45%
- Bounty EV = 0.42 × $125 = $52.5

但 ICM Final Table 成本高。

**建議：Open to 2.5bb（不是全押）**

讓 BB 短疊做決策，若他 fold，得到一些 EV；若他 push，你面對 EV 更清晰的 call/fold 決策。

---

**Hand 2：3-way Final Table，大賞金玩家 all-in**

**設定：**

- Final Table 6-max，你（45bb），大賞金玩家 BBP（30bb，賞金 $500），短疊（10bb）
- BBP push all-in（30bb）
- 短疊 fold
- 你在 BTN，手牌：A♠J♠（suited！）

**計算：**

A♠J♠ vs BBP push range（他 30bb push，range ≈ 25% of hands）

A♠J♠ equity vs BBP range ≈ 57%（強牌，suited）

**Bounty EV：**
0.57 × $250 = $142.5

**ICM Cost（Final Table，you have 45bb cover）：**

若你輸：你有 15bb，仍在 Final Table
ICM Cost（你從 45bb 降到 15bb）= 顯著，約 $80–120

**總 EV：**

Chip EV（57% equity，30bb pot）= 微正
Bounty EV = $142.5
ICM Cost = -$100

**總 EV = Chip EV + $142.5 - $100 = 正值**

**結論：A♠J♠ 面對大賞金 BBP 的 30bb push at Final Table = Call！**

---

**Final Table 策略 3：頭對頭（HU）時的 PKO 特殊性**

當到達 HU（最後 2 人），PKO 賞金計算完全改變：

1. **你的賞金和對手的賞金都在桌上**：無論誰輸都得到對方賞金的一半
2. **ICM 現在只是 Prize Pool 差異**：1st 和 2nd 的差距
3. **策略回歸純 Chip EV**（加上賞金考量）

**HU 短牌 PKO 策略：**

- 比 NLH PKO 更激進（flip 更值）
- Flush draw 的 all-in 更正確（flush 更有價值）
- 需要快速完成（短牌 HU 非常快）

---

**Final Table 短牌 PKO ICM 總結表：**

| 情況 | 策略調整 |
|------|----------|
| 大賞金玩家是大疊 | 製造機會，Squeeze，利用 draw 追殺 |
| 大賞金玩家是短疊 | 積極追殺，幾乎所有情況 call 都是正 EV |
| 你是大賞金玩家 | 縮緊 range，避免不必要的 flip |
| Final Table Bubble | 中大疊追殺短疊（有賞金）= 強 +EV |
| HU 決賽 | 回歸積極，flush draw 更勇敢打 |

---

## 進階策略工具與框架

### 短牌 PKO 的 GTO 解決方案框架

**為什麼短牌 PKO 的 GTO 計算特別複雜：**

1. **兩個非標準元素疊加**：短牌（非標準牌組）+ PKO（非標準 EV 計算）
2. **賞金的動態性**：賞金隨時在變，每淘汰一人賞金就改變
3. **Short deck equity 特殊性**：現有 GTO 工具多針對 NLH 設計

**可用的近似方法：**

1. **使用 ICMIZER + PKO 模組**（但只支持 NLH）：用 NLH 計算後，手動調整 equity（短牌稍有不同）
2. **Simple Postflop 短牌模式**：用於翻牌後的 equity 計算，但不計算 PKO EV
3. **手動計算框架**：用本章的公式，配合直覺判斷

**實戰中最重要的 heuristics（啟發式規則）：**

1. **大賞金目標 = 更寬 call**
2. **Bubble 不追殺 = 幾乎永遠錯誤（除非手牌極弱）**
3. **短牌的 flush draw = 強追殺工具**
4. **Final Table 謹慎，但不要因為 ICM 而完全放棄賞金 EV**

---

## 常見進階錯誤

**錯誤 1：在 Final Table 過度 ICM-fearful，完全不追殺**

很多玩家到了 Final Table 因為 ICM 壓力而過於保守，放棄了賞金 EV。

糾正：ICM 是重要的，但 PKO 賞金也是真實的 EV。要平衡兩者，不是完全忽視賞金。

**錯誤 2：Multi-way all-in 中忽略「誰淘汰誰」的概率**

糾正：3-way 以上 all-in，你不一定是淘汰特定玩家的那個人。要計算「你淘汰特定目標」的實際概率，而非簡單用 equity。

**錯誤 3：高估短牌 flush draw 的 equity**

在短牌中，flush draw 的 outs 比 NLH 少（因為同花牌更少）：
- NLH：flush draw = 9 outs
- 短牌：flush draw ≈ 5–6 outs

但短牌 flush 的「完成後價值」更高（flush > full house），這補償了 outs 的減少。

糾正：用正確的短牌 outs 計算，但不要低估 flush 完成後的 value。

**錯誤 4：追殺時機不對（對手不是真正的「短疊」）**

30bb 的對手不是「短疊」，他還有很多玩法空間。追殺 30bb 玩家的 ICM 成本遠高於追殺 8bb 玩家。

糾正：區分「真正短疊（<15bb）」和「中疊」，只對真正短疊積極追殺（有賞金時）。

---

*本章節提供了短牌 PKO 的進階策略框架。具體的手牌決策需要配合工具計算和實戰經驗的積累。*
