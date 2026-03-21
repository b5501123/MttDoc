# PKO 基礎概念：Progressive Knockout 賞金賽

## 什麼是 PKO

PKO（Progressive Knockout）是一種特殊的 MTT 格式，每個玩家的「頭」上掛有賞金（bounty）。

**基本規則：**
- 每次你淘汰一個玩家，你獲得他一半的賞金
- 另一半加到你自己的賞金上（讓你的頭更值錢）
- 比賽開始時，每人的賞金相等（例如 $5 each）
- 隨著比賽進行，大量淘汰後的倖存者賞金越來越高

**範例：**
起始賞金 $5。你淘汰了三個玩家（分別是 $5, $10, $20 賞金）：
- 第一個：+$2.5（賞金 $5 的一半），你的賞金變 $7.5（$5 + $2.5）
- 第二個：+$5（賞金 $10 的一半），你的賞金變 $10
- 第三個：+$10（賞金 $20 的一半），你的賞金變 $15

---

## 主要平台的 PKO 格式

### GGPoker — Bounty Builder

GGPoker 的 Bounty Builder 是目前最流行的 PKO 系列：
- **Bounty Hunter（BH）：** 50% 獎金池用於排名獎金，50% 用於賞金
- 比例固定：淘汰獲得目標賞金的 50%，另 50% 加到自己頭上
- 有每日、每週、每月系列，entry 從 $1.05 到 $210+

常見的 Bounty Builder 格式：
- PKO $5.25 Bounty Builders（大量魚玩家）
- PKO $11.25 Bounty Builders
- PKO $109 Bounty Builder（有一定競爭性）

### PokerStars — PSKO（Progressive Super Knockout）

PokerStars 的 PKO 系列稱為 PSKO：
- 賞金比例和分配方式類似 GGPoker
- Bounty Builder 系列有各種大型賽事版本（如 WCOOP, SCOOP 的 PKO 版本）

### 888poker, partypoker

也有類似的 PKO 格式，規則基本相同，比例可能略有不同。

---

## PKO 的核心概念：Bounty EV

在標準 MTT，你的目標是最大化排名獎金的期望值（ICM EV）。

在 PKO，你有**額外的賞金 EV（Bounty EV）**：

```
PKO Total EV = ICM EV + Bounty EV
```

**Bounty EV 的計算：**
如果你 call 一個玩家的 push，他的賞金是 $B：
- 如果你贏（勝率 p）：你獲得 B/2 的賞金
- Bounty EV = p × (B/2)

**範例：**
對手賞金 $20，你有 60% 勝率。
Bounty EV = 60% × $10 = $6

這 $6 必須加入你的整體 call EV 計算中。

---

## Bounty EV 如何改變決策

**關鍵結論：賞金讓 call range 放寬。**

### 標準 MTT（無賞金）

你需要足夠的 Chip EV（考慮 ICM）才能 call。
通常是相對保守的 call range。

### PKO

你需要：Chip EV + Bounty EV > fold EV

Bounty EV 是額外的正數，讓即使 Chip EV 略負的 call 也可能是正確的。

**範例：**
對手賞金 $20，push 10bb，你在 BB。
- Pot odds 計算需要 44% 勝率（Chip EV 角度）
- 你的手牌只有 42% 勝率 → Chip EV 說 fold
- Bounty EV：42% × $10 = $4.2（額外獲得）
- 如果 $4.2 的賞金相對你現在的 ICM equity 足夠補償 Chip EV 的損失 → 可能仍是 call

---

## Bounty 與 ICM 的交互作用

PKO 的複雜性在於：Bounty EV 和 ICM 同時存在，有時方向相反。

**大賞金 + ICM 壓力：**
- 你是中疊在 bubble，對手是短疊有大賞金
- ICM 說：謹慎 call
- Bounty 說：call 可以獲得大賞金
- 需要精確計算才能判斷

**PKO 工具：**
- **ICMIZER PKO mode：** 支援計算 PKO ICM + Bounty
- **HRC PKO：** 也有 PKO 模式
- **MonkerSolver：** 高精度，但更複雜

---

## PKO 的特殊動態

### 賞金目標的桌面張力

在 PKO 桌上，每個玩家都想淘汰有高賞金的玩家。這創造了特殊的桌面動態：

- 高賞金玩家會被更多人盯上（call range 更寬）
- 你自己有高賞金時，要注意對手的 call range 放寬了
- 低賞金玩家（剛加入或剛被淘汰後重買）相對不那麼吸引人

### Bubble 的 PKO 特殊考量

在 PKO bubble：
- 標準的「保 bubble」ICM 考量仍存在
- 但如果短疊有大賞金，call 的激勵增加，有時值得冒一定的 bubble 風險
- 需要在 ICM 損失和 Bounty 收益之間計算

---

## 初學者的 PKO 心態

對剛接觸 PKO 的玩家，最常見的錯誤是過度追殺賞金：

**錯誤思維：** 「他有 $30 賞金，我有 70% 勝率，怎麼能 fold？」

**正確框架：**
- $30 賞金的一半是 $15
- 你的 70% 勝率 × $15 = $10.5 的賞金 EV
- 你的 call 需要額外投入 12bb，12bb 對應你現在籌碼的 ICM 價值可能遠超 $10.5
- 如果 ICM 損失大於賞金 EV，fold 仍然是對的

---

## PKO 的長期 EV 視角

對於高頻率 PKO 玩家，賞金是重要的 EV 來源：
- 好的 PKO 玩家的賞金收入可能佔整體 ROI 的 30-50%
- 積極追殺（在合理計算範圍內）是 PKO 盈利的關鍵
- 不能因為 ICM 而完全放棄所有賞金機會
