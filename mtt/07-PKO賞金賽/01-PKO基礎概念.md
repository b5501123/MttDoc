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

## BBA 在 PKO 中的角色

**現代線上 MTT PKO 全面採用 Big Blind Ante（BBA）格式。**

BBA 對 PKO 的影響尤為重要，原因如下：

### BBA 擴大底池，增加追殺機會

```
BBA 底池（100/200）：SB 100 + BB 200 + BB ante 200 = 500
傳統底池（100/200）：SB 100 + BB 200 = 300
底池增加：67%
```

底池更大意味著：
- 每次全下的底池金額更大
- 追殺（all-in）情境更頻繁出現（底池賠率更優，推注 EV 更高）
- 短疊的 push EV 因 BBA 底池而提升，導致更多人主動 push → 更多追殺機會

### BBA 讓短疊更傾向 Push

BBA 使底池更大，短疊 push 的 fold equity 價值上升：
```
10bb push，BBA 底池（100/200，ante 200）：
  成功偷盲淨贏 = 500（底池）- 0 = 500 chips（未入局者）
  比傳統多贏 200 chips（ante 部分）
  → 短疊更有動力 push，追殺機會更多
```

### BBA + PKO 的 Bounty EV 公式

```
PKO BBA Call EV = Chip EV（BBA 底池）+ Bounty EV
                = [BBA 底池 odds 計算] + p × (對手賞金 / 2)
```

---

## 主要平台的 PKO 格式（BBA 標準）

### GGPoker — Bounty Builder

GGPoker 的 Bounty Builder 是目前最流行的 PKO 系列，**全面採用 BBA**：
- **Bounty Hunter（BH）：** 50% 獎金池用於排名獎金，50% 用於賞金
- BBA 是 GGPoker 所有 MTT 的標準格式
- 比例固定：淘汰獲得目標賞金的 50%，另 50% 加到自己頭上
- 有每日、每週、每月系列，entry 從 $1.05 到 $210+

常見的 Bounty Builder 格式（均為 BBA）：
- PKO $5.25 Bounty Builders（大量魚玩家）
- PKO $11.25 Bounty Builders
- PKO $109 Bounty Builder（有一定競爭性）

### PokerStars — PSKO（Progressive Super Knockout）

PokerStars 的 PKO 系列稱為 PSKO，**已全面轉換為 BBA**：
- 賞金比例和分配方式類似 GGPoker
- Bounty Builder 系列有各種大型賽事版本（如 WCOOP, SCOOP 的 PKO 版本）
- BBA 在大型系列賽中是標準

### 888poker, partypoker

也有類似的 PKO 格式，**BBA 已是主流格式**，規則基本相同，比例可能略有不同。

---

## PKO 的核心概念：Bounty EV（BBA 版本）

在標準 MTT，你的目標是最大化排名獎金的期望值（ICM EV）。

在 PKO，你有**額外的賞金 EV（Bounty EV）**：

```
PKO Total EV = ICM EV（BBA 底池）+ Bounty EV
```

**Bounty EV 的計算（BBA 環境）：**
如果你 call 一個玩家的 push，他的賞金是 $B：
- 如果你贏（勝率 p）：你獲得 B/2 的賞金
- Bounty EV = p × (B/2)

**範例（BBA 底池計算）：**
對手賞金 $20，你有 60% 勝率。
Bounty EV = 60% × $10 = $6

這 $6 必須加入你的整體 call EV 計算中。

**BBA 底池讓 Bounty EV 更容易達到正值：**
```
BBA Call EV（BB 面對 10bb push，盲注 1000/2000）：
  底池 = 10,000（push）+ 500（SB）+ 2,000（BB）+ 2,000（BB ante）= 14,500
  call 需補 = 10,000 - 2,000 = 8,000
  純 chip EV 所需勝率 = 8,000 ÷ (14,500 + 8,000) = 35.6%

  若有賞金 EV = $6（假設 60% 勝率 × $10）：
  總 EV = Chip EV（正）+ $6 賞金 EV
  BBA 底池讓 chip EV 所需勝率降低，加上賞金 EV，call 更容易成為正確決策
```

---

## Bounty EV 如何改變決策（BBA 強化版）

**關鍵結論：BBA + 賞金雙重讓 call range 放寬。**

### 標準 MTT（無賞金）

你需要足夠的 Chip EV（考慮 ICM）才能 call。
通常是相對保守的 call range。

### PKO（BBA 格式）

你需要：BBA Chip EV + Bounty EV > fold EV

BBA 底池降低了純 chip EV 的門檻，Bounty EV 是額外的正數，雙重讓 call range 放寬。

**範例（BBA + Bounty）：**
盲注 1000/2000，BBA 2000。對手賞金 $20，push 10bb（20,000 chips），你在 BB。

```
BBA 底池計算：
  底池 = 20,000（push）+ 500（SB）+ 2,000（BB）+ 2,000（BB ante）= 24,500
  call 需補 = 20,000 - 2,000 = 18,000
  純 chip EV 所需勝率 = 18,000 ÷ (24,500 + 18,000) = 18,000 ÷ 42,500 = 42.4%

傳統（無 BBA）底池計算：
  底池 = 20,000 + 500 + 2,000 = 22,500
  所需勝率 = 18,000 ÷ 40,500 = 44.4%

BBA 降低所需勝率：44.4% → 42.4%（差 2%）
```

- 你的手牌只有 41% 勝率 → 傳統底池說 fold（41% < 44.4%）
- BBA 底池：41% < 42.4%，仍略不足，但非常接近
- Bounty EV：41% × $10 = $4.1（額外獲得）
- $4.1 的賞金相對你的 ICM equity 若能補償差距 → 可能仍是 call

**BBA + Bounty 的雙重加成讓更多邊緣手牌可以 call。**

---

## Bounty 與 ICM 的交互作用（BBA 環境）

PKO 的複雜性在於：BBA Chip EV、Bounty EV 和 ICM 同時存在，有時方向相反。

**大賞金 + ICM 壓力 + BBA：**
- 你是中疊在 bubble，對手是短疊有大賞金
- ICM 說：謹慎 call
- BBA + Bounty 說：call 可以獲得大底池 + 大賞金（雙重激勵）
- 需要精確計算才能判斷

**PKO BBA 工具：**
- **ICMIZER PKO mode（BBA 設定）：** 支援計算 PKO ICM + Bounty，必須選擇 BBA ante 選項
- **HRC PKO（BBA 設定）：** 也有 PKO 模式，輸入 ante 時選 Big Blind Ante
- **MonkerSolver：** 高精度，但更複雜

---

## PKO 的特殊動態（BBA 加成）

### 賞金目標的桌面張力

在 PKO 桌上，BBA 底池讓每次 push/call 的利害關係更大：
- 高賞金玩家會被更多人盯上（call range 更寬）
- BBA 底池讓即使是邊緣追殺也更接近正 EV
- 你自己有高賞金時，要注意對手的 call range 因 BBA 而進一步放寬
- 低賞金玩家（剛加入或剛被淘汰後重買）相對不那麼吸引人

### BBA 在 PKO Bubble 的特殊考量

在 PKO bubble（BBA 格式）：
- 標準的「保 bubble」ICM 考量仍存在
- BBA 底池更大 → 短疊 push 的 fold equity 更高 → 短疊更積極 push
- 如果短疊有大賞金，BBA + Bounty 讓 call 的激勵大幅增加
- 需要在 ICM 損失、BBA Chip EV 和 Bounty 收益之間精確計算

**BBA Bubble 快速判斷：**
```
你是否應該 call 短疊 push（PKO Bubble，BBA）？

1. 計算 BBA 底池 odds → 純 chip EV 所需勝率
2. 查你的手牌勝率 vs 對手 push range
3. 加入 Bounty EV = 對手賞金 × 50% × 你的勝率
4. 估算 ICM 損失（你輸了損失多少獎金 EV）
5. 如果（Chip EV + Bounty EV）> ICM 損失 → call
```

---

## 初學者的 PKO 心態（BBA 版本）

對剛接觸 PKO 的玩家，最常見的錯誤是過度追殺賞金：

**錯誤思維：** 「他有 $30 賞金，BBA 底池很大，我有 70% 勝率，怎麼能 fold？」

**正確框架（BBA）：**
- $30 賞金的一半是 $15
- 你的 70% 勝率 × $15 = $10.5 的賞金 EV
- 你的 call 需要額外投入（假設 12bb）
- BBA 底池讓 chip EV 更優，但如果 ICM 損失仍大於（Chip EV + $10.5），fold 仍然是對的

**BBA 不是讓你隨便 call 的理由，而是讓計算更精確。**

---

## PKO 的長期 EV 視角（BBA 底池的複利）

對於高頻率 PKO 玩家，賞金是重要的 EV 來源：
- 好的 PKO 玩家的賞金收入可能佔整體 ROI 的 30-50%
- BBA 底池讓每次追殺的 chip EV 更高，長期複利效應顯著
- 積極追殺（在合理計算範圍內）是 PKO 盈利的關鍵
- 不能因為 ICM 而完全放棄所有賞金機會
- BBA 格式讓「追殺邊緣情境」更多傾向 call，這是長期 PKO EV 的重要來源

**BBA 底池速查（PKO 常用場景）：**

| 盲注 | BBA 底池 | 對手 push 10bb call 後底池 | 所需勝率（BBA）| 所需勝率（傳統）|
|------|---------|------------------------|-------------|-------------|
| 100/200 | 500 | 2,500+200=2,700 call | ~44% | ~46% |
| 200/400 | 1,000 | 5,000+400=5,400 | ~44% | ~46% |
| 500/1000 | 2,500 | 12,500+1,000=13,500 | ~44% | ~46% |

（BBA 讓所需勝率降低約 2%，配合賞金 EV，PKO call range 比傳統 MTT 寬得多）
