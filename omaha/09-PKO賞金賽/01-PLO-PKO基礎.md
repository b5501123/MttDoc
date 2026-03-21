# PLO PKO 賞金賽基礎

## 前言：PLO PKO 的獨特魅力

Progressive Knockout（PKO）賞金賽是現代線上撲克中最受歡迎的賽制之一。當 PLO（Pot Limit Omaha）與 PKO 結合，便產生了一種既刺激又策略深度極高的賽事格式。

PLO PKO 的特殊性在於：PLO 本身的 all-in 頻率遠高於 NLH，而 PKO 的賞金機制又進一步鼓勵玩家追殺對手。兩者相乘，產生了與純 NLH PKO 或純 PLO MTT 完全不同的策略環境。

本章節將系統性地介紹 PLO PKO 的基礎概念、數學框架，以及適應這種特殊賽制所需的策略調整。

---

## 第一節：PKO 賞金賽的基本機制

### PKO 的獎金結構

在標準 PKO 中，每位玩家的 buy-in 分為兩部分：
- **獎金池（Prize Pool）**：約 50% 進入常規獎金分配
- **賞金（Bounty）**：約 50% 作為玩家的初始賞金

每當一名玩家被淘汰：
- 淘汰他的玩家獲得該玩家**一半賞金**
- 另一半賞金**加入到自己的賞金上**，使自己的賞金增加

**範例計算**

假設 buy-in 為 \$100，其中 \$50 進獎金池，\$50 作賞金：
- 玩家 A 的初始賞金：\$50
- 玩家 B 淘汰玩家 A，獲得：\$25（A 賞金的一半）
- 玩家 B 自己的賞金增加：從 \$50 → \$75
- 若之後玩家 C 淘汰玩家 B，玩家 C 獲得 \$37.5

這個「雪球效應」讓頂尖玩家的賞金可以累積到幾百美元，形成「大賞金玩家（Big Stack Bounty Player）」的特殊局面。

---

### PKO 的核心概念：賞金 EV

在 PKO 中，你的決策 EV 包含兩個部分：

**1. 常規 ICM EV（Prize Pool EV）**
- 傳統的籌碼和獎金計算
- 與 NLH MTT 的計算方式相同

**2. 賞金 EV（Bounty EV）**
- 你有多大概率淘汰對手？
- 淘汰對手可獲得多少賞金？

**Total EV = ICM EV + Bounty EV**

在某些情況下，賞金 EV 足夠大，可以讓一個在純 ICM 計算下 -EV 的決策變成 +EV。

---

## 第二節：PLO PKO 比 NLH PKO 更複雜的原因

### PLO 中的 All-in 頻率更高

在 NLH 中，翻牌前 all-in 通常發生在：
- AA vs. KK
- Set vs. 強 draw
- 短疊 push/fold

但在 PLO 中，all-in 的頻率大幅增加：

**PLO all-in 的常見情境**
1. **Nut draw vs. Nut draw**：兩個玩家都有極強的 draw，雙方 equity 接近 50/50
2. **Set vs. 強 wrap draw**：三條對 15-20 outs draw
3. **Top two pair vs. Wrap**：兩種強手牌的碰撞
4. **多種 draw 組合**：flush draw + straight draw 讓許多手牌在翻牌前後都傾向 all-in

PLO 中，翻牌後 all-in 的 equity 分佈更加接近 50/50，比 NLH 更常見 coin flip 情況。

**對 PKO 的影響**

all-in 頻率高 = 更多淘汰機會 = 更多賞金機會。

這讓 PLO PKO 中的追殺決策（call 去嘗試淘汰對手）更加頻繁，賞金 EV 在整體 EV 中占比更高。

---

### PLO PKO 中的 Equity 計算複雜性

在 NLH PKO 中，翻牌前的 equity 計算相對簡單（可以查 preflop chart）。

在 PLO PKO 中：
- **Hand vs. Range 的 equity 計算更複雜**：PLO 四張牌的組合讓 range 計算複雜度指數級增加
- **Draw 組合影響 equity 分佈**：PLO 的 equity 分佈更均勻（很少像 NLH 的 AA vs. 22 那樣極度懸殊）
- **Multiway 底池的賞金分配**：若有 3 個玩家 all-in，誰最先被淘汰？賞金如何分配？

**PLO 的 equity 分佈特點**

在 NLH：
- AA vs. KK = 82% vs. 18%（極度不均等）
- AA vs. random hand = 85% vs. 15%

在 PLO：
- AAKK ds vs. KQJT ds = 約 60% vs. 40%（較均等）
- 最強手 vs. 最弱手（如 AAKK ds vs. 7♣2♦9♠3♥）= 約 73% vs. 27%

PLO 的 equity 更均等意味著：
- 賞金 EV 的計算需要更精確的 equity 估算
- 「強迫性追殺」（calling 因為 equity 壓倒性優勢）在 PLO 中較少見
- 賞金 EV 需要補償更大的 equity 不確定性

---

## 第三節：追殺 EV 公式在 PLO 的應用

### 標準追殺 EV 公式

在 PKO 中，call 去追殺的 EV 計算：

```
Call EV = [Equity × (Total Pot)] - Call Amount + [P(eliminate) × Bounty Value]
```

其中：
- **Equity**：你的贏牌概率
- **Total Pot**：底池總額（含你的 call）
- **Call Amount**：你需要放入的籌碼
- **P(eliminate)**：你贏且對手被淘汰的概率
- **Bounty Value**：賞金的現金等值

**PLO 版本的修正**

在 PLO 中，需要額外考慮：

**1. Equity 範圍更寬**
- PLO 的 equity 通常在 35-65% 之間（比 NLH 更均等）
- 使用平均 equity 45-55% 進行計算

**2. 多人 all-in 的機率分配**
- 若有 3 人 all-in，被淘汰的可能是你、對手 A 或對手 B
- 需要計算三方 equity 並分配賞金

**3. 翻牌後追殺的特殊性**
在 PLO 中，翻牌後 all-in 更常見，此時需要精確的 outs 計算：

```
P(eliminate) = P(你贏) × P(對手 stack = 0 | 你贏)
```

若對手 stack ≤ 你的 call amount，P(對手 stack = 0 | 你贏) = 1。

---

### 具體 PLO PKO 追殺 EV 計算範例

**場景設定**

- Buy-in：\$100（\$50 獎金池 + \$50 賞金）
- 你的賞金：\$50（未累積）
- 對手的賞金：\$150（已淘汰 2 名玩家）
- 淘汰對手可獲得：\$75（對手賞金的一半）
- 你的 stack：60bb，對手 stack：30bb
- 翻牌前情境：對手 shove 30bb，你有強力手牌

**純 ICM 計算**

假設你的 equity vs. 對手 range = 55%：

*Chip EV*：
- Win：你有 90bb
- Lose：你有 30bb
- EV = 0.55 × 90 + 0.45 × 30 = 49.5 + 13.5 = 63bb（比原本 60bb 多 3bb）

*ICM EV（考慮獎金結構）*：
- 在 ICM 下，63bb 的 chip EV 不等於 63/Total chips 的獎金
- 假設 ICM 調整後，call 的 ICM EV = 略正（+2% 的 prize pool）

**加入賞金 EV**

- 淘汰對手概率 = 55%（你的 equity）× 100%（對手 stack = 30bb，全押）= 55%
- 賞金收益 = \$75 × 55% = \$41.25

*Total EV = ICM EV (\$2) + Bounty EV (\$41.25) = +\$43.25*

**結論**：在純 ICM 下可能是邊緣決策（+\$2），但加入賞金 EV 後，call 明顯 +EV（+\$43.25）。

---

## 第四節：PLO PKO 的起始牌調整

### 標準 PLO MTT 的起始牌 Range

在標準 PLO MTT（無 PKO）中，起始牌 range 主要考慮：
- 手牌 equity
- 位置
- Stack 深度
- ICM 壓力

### PKO 對起始牌 Range 的鬆弛

在 PLO PKO 中，追殺情境讓你的起始牌 range 需要調整：

**追殺時放寬 range 的條件**

1. **對手有大賞金**：賞金 EV 顯著為正
2. **你能 cover 對手（有 side pot 考量）**：確保賞金分配
3. **Equity 不太差（≥ 40%）**：不要追殺到明顯 -EV

**具體的 Range 調整範例**

*標準情況（無賞金考量）*：

在 BTN 對 UTG shove（20bb），你可能需要以下手牌才能 call：
- AA 系列（所有）
- KKQJ ds+
- AKQJ ds
- 強力 rundown（KQJT ds+）

*PKO 追殺情況（對手賞金為 \$200）*：

相同情境，你的 call range 可以放寬到：
- 所有上述手牌
- 中等 AA（rainbow 版本）
- 任何有 A 的 double-suited 手牌
- QJT9 ds、JT98 ds（強 rundown）

**放寬程度取決於賞金大小**

賞金越大，你可以越放寬 call range：
- 小賞金（\$25-50）：略微放寬（增加 5-10% 的手牌）
- 中等賞金（\$50-150）：中等放寬（增加 10-20% 的手牌）
- 大賞金（\$150+）：大幅放寬（幾乎任何 40%+ equity 的手牌）

---

### 翻牌後的起始牌調整

在翻牌後的追殺情境（對手 all-in）：

**PLO 翻牌後的 equity 計算**

翻牌後，你有更多資訊（可以看到公共牌），equity 計算更精確：

*範例*：翻牌後你有 12 個 outs（flush draw）vs. 對手的 two pair：
- 12 outs × 4%（兩條街）= 48% equity
- 如果對手賞金 \$100，淘汰他的 EV = \$50 × 48% = \$24

*標準計算下*：48% equity 的 call 可能是邊緣的（45bb 底池的 call）
*加入賞金*：\$24 的額外收益讓 call 變成明顯 +EV

**翻牌後追殺的最低 equity 門檻**

根據賞金大小，翻牌後的最低 call equity 調整：
- 無賞金：需要 > 50% equity（或良好底池賠率）
- 小賞金（\$50）：約 42-45% equity 可 call
- 大賞金（\$200+）：約 35-38% equity 可 call（賞金 EV 補償）

---

## 第五節：短疊 PLO PKO 的賞金考量

### 短疊在 PKO 中的特殊地位

在 PKO 中，短疊是最吸引追殺的目標：
- 短疊的賞金相對於其 chip 更容易獲得
- 淘汰短疊的成本低（call amount 小），但賞金 EV 可能很高

**短疊的雙重壓力**

1. **成為被追殺的目標**：所有人都想淘汰你獲得賞金
2. **自己主動 push 去追殺**：主動去 cover 比你更短的玩家

### 短疊主動 push 追殺策略

在 PLO PKO 中，若你是中短疊（15-25bb）且桌上有更短疊（8-12bb）：

**策略 A：主動 push 去隔離短疊**

若短疊在前位 shove，你可以從後位 re-shove 去「cover」他：
- 目標：隔離短疊，增加你獲得賞金的概率
- 要求：你的 hand 有合理 equity vs. 短疊 range
- 好處：即使你的 equity 只有 48%，賞金 EV 可以讓此決策 +EV

**計算範例**

- 短疊 10bb shove，你有 22bb，對手賞金 \$80
- 你從後位 re-shove 22bb（隔離短疊）
- 你的 equity vs. 短疊 range：假設 50%
- 淘汰短疊 EV = \$40（賞金一半）× 50% = \$20
- 常規 chip EV：+1bb（邊緣 +EV）
- 總 EV：+\$20 + \$1 = +\$21（明顯 +EV）

**策略 B：Call 而非 Re-raise**

若你不確定是否能 re-shove 隔離，可以 call 短疊的 shove：
- 好處：成本低，若有其他玩家也 call，形成 side pot 對你有利
- 壞處：無法保護 side pot，大疊可能從後位入場

---

### 短疊防禦策略

當你是短疊且面對追殺時：

**策略一：選擇性 push**

- 不要讓自己在弱手下被迫 all-in
- 主動選擇有利局面 push（有 equity 優勢時）
- 避免被動等待直到 blind 吃掉大量籌碼

**策略二：利用位置 push**

- 在有位置的情況下 push（BTN/CO），增加 fold equity
- 即使 hand 較弱，fold equity 可以補償
- 短疊在好位置的 push range 應該比 OOP 更寬

**策略三：ICM 考量**

在 PKO bubble 或 final table，短疊需要額外考慮：
- 主動 push 可能讓你出局並損失 ICM 價值
- 有時保守等待（fold）比 push 有更高的 ICM 期望值
- 但等待也有成本（blinds 消耗），需要平衡

---

## 第六節：大疊利用賞金施壓的策略

### 大疊在 PLO PKO 中的優勢

大疊（Big Stack）在 PLO PKO 中有以下特殊優勢：

1. **可以 cover 所有玩家**：有機會淘汰任何對手獲得賞金
2. **施加 ICM 壓力**：中疊不敢輕易對抗大疊（怕被淘汰）
3. **賞金累積效應**：大疊通常已積累高賞金，對後來者更有吸引力

### 大疊施壓的具體策略

**策略一：針對大賞金玩家加大攻擊**

若桌上有一名玩家有 \$300 的賞金（通常是之前桌上的強者），你應該：
- 增加對他的 3-bet 頻率（尤其是 IP）
- 在翻牌後用更積極的 semi-bluff 施壓
- 願意在 45%+ equity 的情況下 call 他的 all-in

**策略二：Open raise 頻率提高**

大疊可以更頻繁地 open raise，因為：
- 對手的 call/3-bet 風險更高（怕被淘汰）
- 你有 chip 緩衝，輸掉一個底池影響不大
- 你的 fold equity 更高（對手 respect 你的 raise）

**策略三：Limp 誘導短疊 re-shove**

在有短疊在後位的情況下，大疊可以 limp 誘導：
- 你 limp，短疊 re-shove（他認為這是 steal 機會）
- 你 call，以大疊 cover 短疊
- 若你有合理 equity，這是標準的賞金追殺策略

**具體範例**

大疊 100bb limp，短疊 12bb re-shove（BTN），你在 SB：
- 你有 A♥K♥Q♠J♦（強 broadway）
- 短疊 range：任何 10%+ 的手牌（he's desperate）
- 你的 equity vs. 短疊 range：約 60%
- 短疊賞金：\$75
- 賞金 EV = \$37.5 × 60% = \$22.5
- 明顯 +EV，你應該 call

---

## 第七節：PLO PKO Bubble 特殊考量

### Bubble 在 PKO 中的雙重壓力

在 PKO Bubble（接近進錢圈），你同時面對：
1. **ICM 壓力**：不想在 bubble 被淘汰，損失所有 ICM 價值
2. **賞金誘惑**：桌上可能有大賞金玩家，淘汰他有巨大收益

這兩種力量相互衝突，形成 PLO PKO Bubble 特有的決策困境。

### Bubble 的 Case-by-Case 分析

**Case 1：你是中疊，對手是大賞金大疊**

- 淘汰大疊有高賞金 EV（好）
- 但大疊可以 cover 你（若你輸，你出局）
- ICM 壓力讓 all-in 風險很高

**建議**：在 bubble 避免與大疊進行非必要的 all-in，除非賞金 EV 極高（> ICM 損失）

**Case 2：你是大疊，對手是小賞金短疊**

- 淘汰短疊賞金 EV 小
- 你的 ICM 損失也小（你有 chip 緩衝）
- 但其他中疊玩家希望你淘汰短疊（讓他們先進錢圈）

**建議**：在 bubble，大疊追殺小賞金短疊通常是 +EV 的，因為 ICM 成本低

**Case 3：你是短疊，對手也是短疊（賞金可觀）**

- 雙方都在 bubble 壓力下
- 淘汰對方可獲得賞金 + ICM 提升
- 但 all-in 也可能讓你出局

**建議**：若 equity 明確優勢（> 55%），主動 push 追殺是正確的。若 equity 接近 50%，謹慎考慮。

---

### PKO Bubble 的數學框架

**PLO PKO Bubble EV 計算**

設：
- Prize pool ICM value（你現有的 ICM 價值）= $500
- Bounty 可獲得 = $100
- 你的 all-in equity = 52%

*計算：*

1. Win scenario（52%）：
   - 你獲得額外籌碼，ICM 提升
   - 你獲得 $50（賞金的一半）
   - 假設 ICM 提升 = $80

2. Lose scenario（48%）：
   - 你出局，ICM = $0（若在 bubble）
   - ICM 損失 = $500

3. EV 計算：
   - Win EV = 0.52 × ($80 + $50) = 0.52 × $130 = $67.6
   - Lose EV = 0.48 × (-$500) = -$240
   - **Total EV = $67.6 - $240 = -$172.4（明顯 -EV！）**

**結論**：即使加入賞金 EV，在 bubble 的 52% equity all-in 仍可能是 -EV 的（ICM 損失太大）。

只有當賞金 EV 足夠大，才能翻轉 bubble 的 ICM 壓力。

---

## 第八節：PLO PKO 基礎策略總結

### 核心原則

**原則一：賞金是真實的 EV，必須計入**

永遠不要忽略 PKO 的賞金 EV。在某些情況下，賞金 EV 比 ICM EV 更重要。

**原則二：PLO 的高 all-in 頻率讓賞金機會更多**

PLO 的特性讓追殺情境更頻繁出現，需要時刻保持「賞金意識」。

**原則三：Range 調整需謹慎**

放寬追殺 range 是正確的，但不要過度。最低 equity 門檻（35-40%）必須維持。

**原則四：Bubble 的 ICM 壓力通常大於賞金 EV**

在 bubble，除非賞金極大，否則應保守行事，等待更好的追殺機會（進錢圈後）。

**原則五：大疊和短疊的角色不同**

- 大疊：積極追殺，施加 ICM 壓力
- 短疊：選擇性 push，利用 fold equity，但不要莽撞追殺

### 快速決策框架

當面對追殺機會時，用以下步驟做決策：

1. **計算 equity**（你 vs. 對手 hand range）
2. **計算賞金 EV**（P(eliminate) × Bounty Value）
3. **計算 ICM EV**（考慮當前賽事階段）
4. **比較 Total EV**（ICM + Bounty vs. fold EV）
5. **根據計算結果決定**：call（若 Total EV > 0）或 fold

這個框架在 PLO PKO 的所有情境下都適用，是高效決策的基礎。
