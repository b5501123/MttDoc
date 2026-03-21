# PLO PKO 進階策略

## 前言：超越基礎的賞金賽思維

在掌握 PLO PKO 基礎後，進階玩家需要面對更複雜的情境：多人 all-in 的賞金計算、桌上有大賞金玩家時的整體策略調整、賞金 EV 與 ICM EV 的精確平衡，以及具體的翻牌前/後手牌決策。

本章節將深入探討這些進階主題，並透過具體手牌情境幫助玩家建立實戰決策框架。

---

## 第一節：PLO PKO 中的多人 All-in 賞金計算

### 多人 All-in 的複雜性

在 PLO 的多人底池中，all-in 情況遠比 NLH 複雜：

**典型情境**：三人 all-in（你、玩家 A、玩家 B），各自有不同的 stack size

在三人 all-in 中，賞金的分配涉及：
1. 誰被淘汰？（取決於最終排名）
2. 被淘汰者的賞金由誰獲得？（必須是直接淘汰他的玩家）
3. Side pot 如何影響淘汰者身份？

---

### 三人 All-in 的賞金計算框架

**場景設定**

- 玩家 A（你）：stack 40bb，賞金 \$50
- 玩家 B：stack 25bb，賞金 \$120
- 玩家 C：stack 60bb，賞金 \$80

三人翻牌前 all-in，先計算 side pot：
- Main pot：25bb × 3 = 75bb
- Side pot（A vs. C）：(40-25) × 2 = 30bb
- C 的剩餘 stack：60-40 = 20bb（不參與 main pot 或 side pot A）

**Equity 計算**

假設翻牌前：
- A（你）：38% equity
- B：30% equity
- C：32% equity

**情境分析（所有可能的結果）**

*情境 1：A 贏 main pot 和 side pot（A 有最高 hand）*
- A 獲得：75bb（main）+ 30bb（side）= 105bb
- B 被淘汰（輸 main pot）→ A 獲得 B 的賞金 \$60（一半）
- C 輸 side pot，但保留 20bb

*情境 2：B 贏 main pot，A 贏 side pot*
- B 獲得：75bb
- A 獲得：30bb（side pot）
- C 輸 side pot
- 誰獲得 B 的賞金？B 贏了，沒人獲得 B 的賞金
- A 被淘汰了嗎？不，A 有 30bb + 原始 stack = 30bb

*情境 3：C 贏 main pot 和 side pot*
- C 獲得：75bb + 30bb = 105bb + 剩餘 20bb
- B 被 C 淘汰 → C 獲得 B 的賞金 \$60
- A 被 C 淘汰 → C 獲得 A 的賞金 \$25（A 賞金 \$50 的一半）

**期望賞金計算**

對於你（玩家 A）：

*你能獲得的賞金機會*：
- 淘汰 B 的機率 = P(A 贏 main pot) = 38%
  - 但需要 B 輸 main pot 且你贏 main pot
  - 更精確：P(A > B > C 在 main pot) + P(A > C > B) = 大約 38% × (B 先於 C 出局) = 複雜計算

  簡化計算：若你贏 main pot（38%），B 就被淘汰，你獲得 \$60
  賞金 EV from B = 0.38 × \$60 = \$22.8

*你被淘汰的機率*：
- P(B 或 C 贏，且你 stack 歸零) = 1 - 38% = 62%（主要是 main pot 輸）
- 但你在 side pot 仍有機會（若 B 贏 main，你和 C 打 side pot）

複雜的多人 all-in 計算通常需要軟體（如 ICMIZER 或 Monker）來精確求解。

---

### 多人 All-in 的實戰決策簡化

在實戰中，你無法進行精確的三人 all-in 計算。以下是實用的簡化方法：

**簡化方法一：重點關注主要對手**

當有三人 all-in，重點關注：
- 最有賞金的對手（他的賞金最值得追殺）
- 你對他的 equity（用這個作為主要計算依據）

**簡化方法二：保守估算賞金 EV**

多人 all-in 時，賞金 EV 通常比 HU 情況低，因為：
- 你可能輸給另一個對手（而不是賞金目標）
- 賞金可能被另一個對手獲得

保守估算：多人 all-in 的賞金 EV = HU 賞金 EV × 0.7（打折 30%）

**簡化方法三：關注 Side pot 結構**

若你有最大 stack，確認你是否能 cover 所有對手（創造 side pot 機會）。Cover 對手 = 能獲得他的賞金。

---

## 第二節：大賞金玩家在桌時的整體策略調整

### 識別「大賞金目標」

在 PLO PKO 賽事中，某些玩家會累積巨額賞金：
- 在初期淘汰了很多對手的玩家
- 從另一張桌帶著高賞金換桌過來的玩家
- 剩餘玩家中賞金最高的「Prize Bounty Leader」

**如何識別**：查看賞金排行（大多數平台會在 HUD 或桌面顯示每位玩家的賞金金額）。

---

### 針對大賞金玩家的策略調整

**策略一：擴大 3-bet 範圍**

對大賞金玩家 open，你應擴大 3-bet 範圍：

*標準情況（vs. 正常賞金玩家）*：
3-bet range 約為前 8-12% 的手牌

*vs. 大賞金玩家（賞金 > \$200）*：
3-bet range 擴展到前 15-20% 的手牌

增加的手牌類型：
- 中等 rundown（JT98 ds、T987 ds）
- 單花 Broadway（AKQJ s、KQJT s）
- 中對 + draws（QQJT ds、JJKQ ds）

**為何 3-bet？**
- 若大賞金玩家 call，你創造更大的底池 → 更多 all-in 機會
- 若他 fold，你赢得了賞金保護（他保留了籌碼，你不必冒 all-in 風險）
- 3-bet 讓你在 HU 打（而非多人），增加你賞金獲取的概率

**策略二：Heads-up 隔離策略**

在多人底池，大賞金玩家有更多「存活」機會（你可能贏了底池但他沒被淘汰）。

目標：盡量讓大賞金玩家 HU（一對一），最大化你淘汰他的機率。

具體操作：
- 用大 sizing 的 3-bet / 4-bet 讓其他玩家 fold
- 在翻牌後積極使用 pot bet 或 all-in 施壓
- 避免讓第三個玩家進入底池

**策略三：中等手牌追殺決策**

持有中等強度手牌（如 40-45% equity）時，針對大賞金玩家的 all-in，賞金 EV 可以支持 call：

*計算範例*：
- 大賞金玩家賞金 \$300，淘汰他可獲 \$150
- 你的 equity = 43%
- 賞金 EV = 0.43 × \$150 = \$64.5
- ICM EV（假設 -\$20，因為 equity 略差）
- Total EV = \$64.5 - \$20 = +\$44.5

即使 equity 只有 43%，大賞金讓追殺明顯 +EV！

**策略四：跟蹤賞金玩家的桌位**

若大賞金玩家換桌，重新評估你的策略。若你跟桌調整（如果是線下），考慮跟隨到他的桌。

---

### 大賞金玩家的防禦策略

若你是大賞金玩家，每個人都想淘汰你：

**防禦策略一：提高手牌要求**

降低 open raise 頻率，只在有強手時 open：
- 避免輕易被 3-bet 壓進 all-in（因為對手 call range 已放寬）
- 選擇有清晰 nut potential 的手牌

**防禦策略二：調整 3-bet 策略**

當你 3-bet 時，確保手牌足夠強（因為對手 4-bet all-in 的頻率更高）：
- 標準 3-bet range 縮窄到前 8-10%（強手為主）
- 輕量 bluff 3-bet 頻率降低

**防禦策略三：利用大疊優勢**

若你的 stack 很大，可以選擇性地利用：
- 對短疊（比你 stack 小的玩家）仍積極追殺
- 對同等疊或比你更大的玩家保守

---

## 第三節：賞金 EV vs. ICM EV 的平衡

### PLO PKO 中的 EV 衝突

PLO PKO 中最常見的決策衝突：

**衝突一：Bubble 的 ICM 壓力 vs. 大賞金 EV**

- ICM 壓力說：Fold！被淘汰損失大
- 賞金 EV 說：Call！\$200 的賞金不能放棄

**衝突二：翻牌後的 Draw 追殺**

- 你有 45% equity（邊緣）
- ICM 說：Fold，equity 不足
- 賞金說：對手有 \$150 賞金，45% × \$75 = \$33.75 額外 EV

**衝突三：進錢圈後的積極性**

- 進錢圈後，ICM 壓力降低（保底已拿到）
- 賞金 EV 的重要性相對提高
- 應該更積極地追殺？

---

### 數學框架：找到平衡點

**通用公式**

```
決策 EV = ICM EV（純 chip 視角） + Bounty EV - ICM 調整項
```

- **ICM 調整項**：因 all-in 可能被淘汰，ICM 損失的 EV（可能為負）
- **Bounty EV**：P(淘汰對手) × 賞金金額 / 2

**平衡點計算**

設：
- ICM 損失（被淘汰的期望損失）= L
- 賞金 EV = B
- 純 chip EV = C

若 C + B > L，call / 追殺；否則 fold。

**在不同賽事階段的調整**

*早期賽段（200+人在場）*：
- ICM 壓力低（被淘汰損失不大）
- B 可以相對較小就支持 call
- 追殺 threshold：賞金 EV + chip EV > 0（相當寬鬆）

*中期賽段（接近 bubble）*：
- ICM 壓力中等
- B 需要更大才能抵消 ICM 損失
- 追殺 threshold 提高到：賞金 EV + chip EV > ICM 損失

*Bubble 期間*：
- ICM 壓力極高
- 只有非常高的 B（通常是頂級賞金）才能支持追殺
- 保守為主，除非賞金 > ICM 損失的 2 倍

*進錢圈後*：
- ICM 壓力降低（保底已拿到）
- 相對積極，類似早期賽段的邏輯

---

### PLO 特有的 EV 計算挑戰

**挑戰一：翻牌後 equity 的不確定性**

PLO 翻牌後，手牌的 equity 取決於複雜的 draw 組合。在實戰中，你需要快速估算 equity。

**實用技巧：快速 outs 計算**
- Flush draw（9 outs）≈ 35% 兩街，18% 一街
- OESD（8 outs）≈ 32% 兩街，16% 一街
- Wrap draw（13-17 outs）≈ 50-65% 兩街
- Flush + OESD（15 outs）≈ 54% 兩街

**挑戰二：多人底池的 equity 分配**

三人底池時，你的 equity 被兩個對手分散。簡化方法：
- HU equity × 0.8 ≈ 三人底池的實際 EV（保守估算）

**挑戰三：動態 equity（Equity 在 betting 中變化）**

在 PLO 的翻牌後，每次 bet/raise 都可能讓你的 range 更透明，改變 equity 分佈。進階玩家需要考慮「range vs. range」而非「hand vs. hand」。

---

## 第四節：短疊 vs. 大疊的 PKO 互動策略

### 短疊（15-25bb）的 PLO PKO 策略

**短疊的目標**

在 PLO PKO 中，短疊有三個主要目標：
1. **存活到進錢圈**（ICM 目標）
2. **主動追殺比你更短的對手**（賞金目標）
3. **避免被大疊以低 equity 追殺**（防禦目標）

**短疊的翻牌前策略**

*Push/fold 基準（15-20bb）*：

在 BTN/CO，以下手牌可以 shove：
- AA（所有版本）
- KKQJ ds+
- AKQJ ds、AKQT ds
- KQJT ds、QQJT ds
- 任何 double-suited Broadway（如 AQJT ds）
- 在有大賞金目標時，加入：AAQQ s、JJQK ds、T987 ds

在 UTG/HJ，shove range 縮窄：
- AA 系列
- KKQJ ds+
- AKQJ ds
- 取消中等 rundown

*面對 open 的 3-bet all-in（BB 的抵抗 push）*：
- 需要高於標準 push range 才能 3-bet（因為對手 open range 通常比 BTN 更強）
- 在 BTN open 時，BB 可以用 JT98 ds 等手牌 3-bet all-in

**短疊的翻牌後策略**

若翻牌前 call（而非 all-in），在翻牌後短疊通常 commit：
- 有 nut draw 或 two pair+：shove 或 pot bet（likely all-in）
- 有 marginal hand（如 medium pair）：check-fold 或 thin call
- 完全 miss：check-fold

---

### 大疊（60bb+）的 PLO PKO 策略

**大疊的目標**

1. **累積賞金**（積極追殺各類 stack）
2. **施加 ICM 壓力**（讓中等 stack 不敢輕易對抗）
3. **保護自己的大賞金**（避免被其他大疊追殺）

**大疊的翻牌前策略**

*對短疊的攻擊*：
- 大幅擴大對短疊的 open/raise 頻率
- 若短疊在後位（BTN/CO），考慮用 limp 誘導他 re-shove
- 面對短疊的 shove，call range 根據賞金大小調整（寬 call）

*對中等 stack 的施壓*：
- 頻繁 open raise（利用 fold equity）
- 3-bet 中等 stack 的 open（尤其是在 bubble 附近）
- 但不要過度激進，PLO 的 equity 均等性限制了你的優勢

*對其他大疊的謹慎*：
- 避免無謂地 all-in 對抗（都是大疊的衝突損失大）
- 除非有明確 equity 優勢，否則保守

**大疊的翻牌後策略**

*有 made hand（兩對以上）*：
- 積極出牌，建立大底池
- 在有 draw 的 board 保護 made hand

*有 draw（nut flush or wrap）*：
- Semi-bluff 積極，與 NLH 中 Ace-high flush draw 類似
- 若對手是短疊，all-in 追殺（有 equity + 賞金 EV）

*Miss（無 made hand 無顯著 draw）*：
- 適當 bluff（利用大疊的 fold equity）
- 不要過度 bluff（PLO 對手 call range 較寬）

---

## 第五節：具體手牌情境 — PLO PKO Bubble 的 Call/Fold 決策

### 情境 1：Bubble，持有 A♠A♦J♥T♥，面對短疊 shove

**場景設定**

- **賽事**：100 人賽事，下一個淘汰拿不到獎金（Bubble）
- **你的 stack**：55bb，賞金 \$60
- **對手**：UTG shove 18bb，賞金 \$180（已淘汰 3 名玩家！）
- **你的位置**：BTN
- **你的手牌**：A♠A♦J♥T♥（AA + double-suited Broadway）

**分析**

*步驟一：計算 equity*
- 你的 A♠A♦J♥T♥ vs. UTG shove range（假設前 12% 的手牌）
- 你的 equity：約 64%（AA 對 any range 都是大優勢）

*步驟二：計算純 ICM EV*
- Call 並贏（64%）：你有 73bb，ICM 提升
- Call 並輸（36%）：你有 37bb，ICM 降低
- Bubble 情況：輸不致命（37bb 仍很多），贏也好

*步驟三：計算賞金 EV*
- P(淘汰對手) = 64%
- 可獲賞金 = \$90（對手 \$180 的一半）
- 賞金 EV = 0.64 × \$90 = \$57.6

*步驟四：Total EV 計算*
- ICM EV（假設 +\$15）+ 賞金 EV（\$57.6）= **+\$72.6**

**決策：明確 Call**

A♠A♦J♥T♥ 有 64% equity，加上 \$57.6 的賞金 EV，這是 bubble 中最明確的 call。

---

### 情境 2：Bubble，持有 K♠Q♠J♦T♥，面對大疊 3-bet

**場景設定**

- **你的 stack**：35bb，賞金 \$40
- **CO open 2.5bb**（大疊 90bb，賞金 \$25）
- **BTN 3-bet 8bb**（大疊 80bb，賞金 \$35）
- **你的位置**：SB
- **你的手牌**：K♠Q♠J♦T♥（KQJT single-suited）

**分析**

*你的選擇*：
1. Fold
2. 4-bet all-in（35bb）
3. Call（進入翻牌，35bb - 8bb = 27bb behind）

*Equity 計算*：
- K♠Q♠J♦T♥ vs. BTN 3-bet range（假設前 12%）：約 45% equity
- K♠Q♠J♦T♥ vs. BTN 3-bet + CO call range：約 41%

*賞金計算*：
- BTN 賞金 \$35，淘汰可得 \$17.5
- CO 賞金 \$25，淘汰可得 \$12.5
- 若 4-bet all-in 三人 all-in，複雜計算後賞金 EV 約 \$10-15

*ICM 計算（Bubble）*：
- 4-bet all-in 輸 = 出局，ICM 損失 \$100+
- 4-bet all-in 贏 = 70bb，ICM 大幅提升

**計算**：
- Win（41%）：ICM +\$80 + 賞金 \$12.5 = \$92.5
- Lose（59%）：ICM -\$120

EV = 0.41 × \$92.5 + 0.59 × (-\$120) = \$37.9 - \$70.8 = -\$32.9

**決策：Fold**

在 Bubble 情境，K♠Q♠J♦T♥（single-suited，非 double-suited）對抗 3-bet 的 4-bet all-in 是 -EV。

如果是 K♠Q♠J♦T♦（double-suited），equity 約 48-50%，決策可能變成 call/4-bet。

---

### 情境 3：進錢圈後，持有 8♠7♠6♦5♦，面對中等賞金 shove

**場景設定**

- **賽事**：剛進錢圈，ICM 壓力大幅降低
- **你的 stack**：60bb，賞金 \$75
- **對手**：MP shove 22bb，賞金 \$120（已淘汰 2 名玩家）
- **你的位置**：BTN
- **你的手牌**：8♠7♠6♦5♦（8765 double-suited rundown）

**分析**

*Equity 計算*：
- 8♠7♠6♦5♦ vs. MP shove range（假設前 18% 的手牌）
- 你的 equity：約 48-50%（rundown 手牌對 range 有良好的 equity）

*賞金計算*：
- P(淘汰) = 50%
- 可獲賞金 = \$60
- 賞金 EV = 0.50 × \$60 = \$30

*ICM 計算（進錢圈後）*：
- 進錢圈後 ICM 壓力大幅降低（保底已拿到）
- 假設 ICM EV = +\$5（50% equity 在此 stack 深度略正）

*Total EV*：
- \$5（ICM）+ \$30（賞金）= +\$35

**決策：Call**

進錢圈後，8♠7♠6♦5♦ 對抗中等賞金玩家的 call 是明確 +EV。同樣的情境在 Bubble 期間可能是 fold。

---

### 情境 4：翻牌後追殺 — 有 Flush Draw 的 Call 決策

**場景設定**

- **你的 stack**：50bb，賞金 \$90
- **對手 stack**：15bb，賞金 \$140（他是大賞金目標！）
- **底池（翻牌前）**：20bb（你 raised，對手 call）
- **你的手牌**：A♦Q♦J♣T♣（A high flush draw + broadway）
- **翻牌**：K♦8♦3♠（你有 A-high diamond flush draw + OESD 可能）
- **對手：all-in 15bb**（他去 all-in 了）

**分析**

*Step 1：Equity 計算*
- A♦Q♦ 提供 nut flush draw（9 outs）
- QJT + K = Broadway 相關 draw（Q 和 J 配 K♦8♦3♠ = 需要 QJT 搭配 K、A 等）
- 估計約 12-14 個 outs（flush + some straight outs）
- Equity = 14 × 4% ≈ 56%（兩街計算）

*Step 2：底池賠率計算*
- 底池：20bb + 15bb = 35bb
- 你需要 call：15bb
- 底池賠率 = 35:15 = 2.33:1
- 你需要 = 1/(1+2.33) = 30% equity 才能 call（純賠率）
- 你有 56% equity，遠超需求

*Step 3：賞金 EV*
- P(淘汰對手) = 56%（對手 all-in，stack = 0 if you win）
- 可獲賞金 = \$70（\$140 的一半）
- 賞金 EV = 0.56 × \$70 = \$39.2

*Step 4：Total EV*
- Chip EV（56% equity，bottom pot 35bb，你 call 15bb）= 0.56 × 35 - 15 = 19.6 - 15 = +4.6bb
- 加上賞金 EV = 4.6bb + \$39.2

**決策：Call（非常明確）**

有 56% equity 加上 \$39.2 的賞金 EV，這是翻牌後最明確的追殺 call。

---

## 第六節：PLO PKO 進階心理策略

### 賞金壓力的心理效應

在 PLO PKO 中，賞金的存在創造了獨特的心理動態：

**效應一：追殺誘惑（Bounty Fever）**

許多玩家在有大賞金目標時，會因「追殺衝動」做出不理性的決策：
- 用 30% equity 去追殺（賞金 EV 無法補償）
- 在 bubble 不顧 ICM 壓力追殺
- 過度 bluff 大賞金玩家（期望讓他出局）

**防範**：永遠先計算 Total EV，不要讓情感驅動決策。

**效應二：被追殺的心理壓力**

當你是大賞金玩家時，每個人都對你更積極。這可能讓你：
- 變得過度保守（不合理地 fold 強手）
- 或過度激進（試圖用大疊嚇阻追殺）

**防範**：維持標準的 GTO 框架，適當保守但不過度。

**效應三：Bubble 的 Fear Factor**

Bubble 時，部分玩家的恐懼讓他們放棄了明顯 +EV 的追殺。

**防範**：在 bubble 進行精確的 Total EV 計算，不要因為「恐懼出局」而 fold 高 EV 的追殺。

---

### 桌面動態觀察

**觀察一：誰在積極追殺？**

識別桌上的「賞金 hunter」：
- 他們會對任何 all-in 都傾向 call（特別是大賞金目標）
- 面對他們，可以在翻牌前用大賞金目標附近的位置 trap

**觀察二：誰在保守等待？**

識別桌上過度 ICM 保守的玩家：
- 他們在 bubble 幾乎 fold 一切
- 這些玩家是你 steal 的好目標（他們怕被淘汰，不敢反擊）

**觀察三：大疊的攻擊模式**

大疊玩家的行為模式：
- 是否頻繁針對短疊？（積極追殺型）
- 是否只在強手時 raise？（保守型）
- 針對不同類型的大疊，使用不同的防禦策略

---

## PLO PKO 進階策略總結

### 核心要點回顧

**1. 多人 all-in 的賞金計算**
- 使用簡化方法（保守估算 × 0.7 打折）
- 重點關注主要賞金目標的 equity
- Side pot 結構影響誰能獲得賞金

**2. 大賞金玩家的策略**
- 進攻：擴大 3-bet range，嘗試 HU 隔離
- 防守（若你是大賞金）：縮窄 open range，謹慎 3-bet

**3. 賞金 EV vs. ICM EV 的平衡**
- 早期賽段：賞金 EV 優先
- 接近 bubble：ICM 優先，除非賞金極大
- 進錢圈後：賞金 EV 重新重要

**4. 短疊 vs. 大疊互動**
- 短疊：選擇性 push，利用 fold equity
- 大疊：積極追殺短疊，對大疊保守

**5. 心理策略**
- 避免「賞金狂熱」（Bounty Fever）
- 維持 Total EV 計算框架
- 觀察並利用桌面動態

### 進階玩家的最終目標

在 PLO PKO 中，最優秀的玩家能夠：
1. 快速（在 30 秒內）估算 Total EV
2. 根據賽事階段動態調整策略
3. 在追殺衝動和 ICM 保守之間找到精確平衡
4. 利用對手的心理偏差（過度追殺或過度保守）

PLO PKO 是結合了 PLO 技術深度、PKO 數學計算、ICM 策略思維的複合型挑戰。掌握這些進階技能，是在現代線上 PLO 賽事中長期盈利的關鍵。
