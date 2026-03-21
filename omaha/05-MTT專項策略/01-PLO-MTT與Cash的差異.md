# PLO MTT 與 Cash Game 的核心差異

> 本章針對線上 9-max PLO MTT 玩家設計，深入分析 MTT 與 Cash Game 在底池限注奧馬哈中的本質差異。
> 理解這些差異是調整策略的第一步。

---

## 概覽

許多玩家從 PLO Cash Game 進入 PLO MTT 時，直接套用 Cash 策略，結果頻繁出局。
原因在於：**MTT 的籌碼是有限的，每次決策都有「生存成本」；而 Cash 可以 rebuy，只需最大化 Chip EV。**

PLO 本身的高方差特性，加上 MTT 的 ICM 壓力，使 PLO MTT 成為撲克中難度最高的格式之一。

---

## 第一大差異：目標不同 — 最大化 Chip EV vs 最大化 ICM EV

### Cash Game 的目標

在 PLO Cash Game 中，你的目標是最大化 **Chip EV（籌碼期望值）**。
每 1 個籌碼的價值是固定的，例如 $1 = 1 個大盲。

```
Cash Game 決策邏輯：
  如果 EV > 0 → 執行這個動作
  如果 EV < 0 → 不執行
  籌碼價值線性：1 個籌碼 = 固定現金金額
```

### MTT 的目標

在 PLO MTT 中，你的目標是最大化 **ICM EV（獎金期望值）**。
籌碼的邊際價值是**遞減**的：

```
MTT ICM 籌碼價值曲線（示意）：
  100bb → 200bb 的增加：帶來 +15% 獎金 EV
  1bb   → 2bb 的增加：  帶來 +40% 生存機率

結論：翻倍籌碼 ≠ 翻倍 ICM EV
     失去所有籌碼 = 100% 損失（出局）
```

### 為什麼這在 PLO 中更重要

PLO 的 all-in 場景極其頻繁。一手 AA double-suited vs KK double-suited，即使是最大優勢，
all-in 時也只有約 **60-65%** 的贏率。

```
情境：PLO MTT Bubble 附近
你的籌碼：50bb（中疊）
對手：80bb（大疊）
你拿到 AA♠A♥K♦K♣（極強手牌）
對手 all-in

Chip EV 思維：AA 有 65% 勝率 → 打
ICM EV 思維：輸了出局（-100% 本次 ICM），贏了多 50bb 但邊際遞減 → 需要仔細計算
```

---

## 第二大差異：籌碼深度隨時間縮減

### Cash Game 籌碼深度

PLO Cash Game 通常以 **100bb** 深疊進行，玩家可以 rebuy。
整個 session 的籌碼深度相對穩定，策略可以固定。

### MTT 籌碼深度動態變化

MTT 隨著盲注上升，有效籌碼深度不斷壓縮：

```
典型 PLO MTT 籌碼深度進程：

開局階段：  150-200bb（類似深疊 Cash）
中期早段：  80-100bb（標準 Cash 深度）
中期晚段：  40-60bb（已開始感受壓力）
泡沫前後：  20-40bb（Push/Fold 開始出現）
決賽桌短疊：10-20bb（Push/Fold 主導）
```

**每個深度對應完全不同的策略！**

Cash 玩家習慣在 100bb 深度做複雜決策，但 MTT 的 30bb 短疊打法截然不同。
這要求 PLO MTT 玩家必須掌握**多種籌碼深度的策略**，而 Cash 玩家只需精通一種。

---

## 第三大差異：ICM 在 PLO MTT 中的獨特壓力

### NLH MTT 的 ICM 現象回顧

在 NLH MTT 中，ICM 的核心是：
- 短疊被 push 時，中疊可以因為 ICM 折疊有 Chip EV 正值的 call
- Bubble 時大疊有「ICM 免疫」，可以積極施壓

### PLO MTT 的 ICM 壓力更大

原因：**PLO 的 all-in 本質上更接近「flip」**

```
NLH MTT 的典型 all-in 情況：
  AA vs KK（翻牌前）：80% vs 20%
  Set vs Flush Draw（翻牌後）：65% vs 35%
  → 優勢明顯，ICM 代價相對可以接受

PLO MTT 的典型 all-in 情況：
  AAxx vs KKxx（翻牌前）：65% vs 35%
  Set + FD vs Wrap Draw（翻牌後）：55% vs 45%
  → 幾乎是 flip！ICM 代價極高
```

**結論：PLO MTT 的 ICM 折疊門檻遠高於 NLH MTT。**

許多在 NLH MTT 中是「必 call」的情況，在 PLO MTT 的 ICM 框架下應該 fold。

### 具體 ICM 計算範例

```
場景：10 人桌，已剩 12 人（付 10 名），進泡沫

籌碼分布：
  你：25bb
  對手（大疊）：90bb
  其他 10 人：平均 35bb

你的手牌：K♠K♥Q♠J♥（強牌，但非 Nut 手牌）
對手翻牌前 Pot-raise，你考慮 re-pot all-in

ICM 分析：
  Call 且贏（55% 機率）：籌碼 → 50bb，ICM EV 大幅增加
  Call 且輸（45% 機率）：出局，ICM EV = $0（失去所有獎金期望）

即使 KKQJs 在 PLO 是強牌，接近 flip 的情況下，
在泡沫附近的 ICM 代價可能讓這手牌的 ICM EV 為負。
```

---

## 第四大差異：方差處理 — 為什麼 PLO MTT 比 NLH MTT 方差更大

### 方差的數學基礎

方差（Variance）取決於兩件事：
1. 每次 all-in 的勝率差距
2. all-in 的頻率

```
NLH MTT 翻牌前 all-in 典型勝率：
  AA vs KK：80/20
  AA vs AK：67/33
  AK vs QQ：50/50（flip）

PLO MTT 翻牌前 all-in 典型勝率：
  AAKK ds vs KKQQ ds：62/38
  AA72 rb vs KKxx：約 60/40
  雙 Rundown vs AAxx：接近 50/50

結論：PLO 很少有 80/20 的 all-in，大部分是 55/45 到 60/40
```

### 為什麼 flip 型 all-in 方差更大

```
方差公式（簡化）：Variance = p × (1-p) × (Stakes)²

60/40 的 all-in：Variance ∝ 0.6 × 0.4 = 0.24
80/20 的 all-in：Variance ∝ 0.8 × 0.2 = 0.16

PLO 的翻牌後 all-in 往往是 0.55×0.45 = 0.2475（更高方差！）
```

**PLO MTT 的方差是 NLH MTT 的 1.5 到 2 倍。**

### 實際影響

```
NLH MTT ROI 估算（中等技術）：
  達到 ROI +20% 所需場次：約 500 場
  95% 信賴區間建立：約 1,000-2,000 場

PLO MTT ROI 估算（同等相對技術）：
  達到同樣 ROI 所需場次：約 1,000-2,000 場
  95% 信賴區間建立：約 3,000-5,000 場

結論：PLO MTT 需要更大的 Bankroll 和更強的心理抗壓能力
```

### 高方差的具體例子

```
情境：你是 PLO MTT 的強手（技術 > 對手 20%）

單場 PLO MTT 的結局分布（大約）：
  前 10% 完賽（獲獎）：約 15% 機率
  前 30% 完賽：約 35% 機率
  前 50% 完賽：約 55% 機率
  出局（未獲獎）：約 85% 機率

即使是場均盈利的強手，連續 20 場泡沫出局完全正常。
```

---

## 第五大差異：手牌可玩範圍隨籌碼深度的劇烈變化

### Cash Game 的穩定起始牌範圍

PLO Cash Game（100bb 深疊），你可以玩：
- 所有 double-suited rundown
- 所有帶 A 的 double-suited 牌
- 有連接性的 Broadway 牌
- **大約 25-35% 的起始牌**

這個範圍在 Cash 中幾乎不變，因為籌碼深度穩定。

### MTT 的動態起始牌範圍

```
100bb+ 深疊（類 Cash Game）：
  可玩牌：~30%（類似 Cash）
  重點：追求 Nut draw，多人底池，impleid odds 高

60-80bb 中疊：
  可玩牌：~22%
  收緊：去掉邊緣牌（single-suited rundown, bare KK, dangling A）
  重點：避免 Marginal spots

30-50bb 短疊進入中短疊：
  可玩牌：~15%
  大幅收緊：只要 premium hands 或 push/fold
  重點：3-bet/pot 後有 commit 意識

15-30bb 短疊：
  幾乎 Push/Fold 模式
  可玩牌：~10-15%（Push 的牌）
  重點：找到翻倍機會，不浪費盲注

<15bb 超短疊：
  純 Push/Fold
  可玩牌：只有 top ~10% 手牌
  重點：等待最強手牌，push all-in
```

---

## 籌碼深度策略調整詳述

### 深疊期（100bb+）：Cash Game 模式

此階段最接近 PLO Cash Game，可以運用複雜的翻牌後策略。

**可做的事：**
- 追逐複雜的 Wrap Draw + Flush Draw 組合
- 多人底池中作為被動方等候
- 在 IP 中做 Float 和 Delayed C-bet
- Semi-bluff 使用 Pot-size bet

**需要注意的 MTT 差異：**
- ICM 仍然存在，即使深疊也不能完全無視
- 對手的 range 在 MTT 早期往往比 Cash 更緊（因為 rebuy 心態不同）

```
範例場景（深疊期，150bb）：
  你的手牌：J♠T♠9♦8♦（double-suited rundown）
  翻牌：Q♠7♥6♣
  你有：OESD + Backdoor FD

  Cash 思維 vs MTT 思維：
  Cash：積極 semi-bluff，有 equity 就打
  MTT：類似，但注意底池大小，避免在多人底池中被 set 困住
```

### 中疊期（40-80bb）：收緊選牌，減少邊際情況

**開始出現的 MTT 特有調整：**
- 減少 single-suited 手牌的投入
- 避免在 OOP 打 marginal PLO 底池
- 更重視位置，IP 的價值上升

```
需要考慮放棄的手牌例子（中疊期）：
  - K♠Q♠J♥9♦（single-suited，無 A，邊緣牌）
  - A♠9♥7♦4♣（無連接性，只有 Ace high）
  - 7♠6♥5♦2♣（低牌，無同花，容易被支配）
```

### 短疊期（20-40bb）：Push/Fold 邏輯介入

**PLO 的 Push/Fold 和 NLH 的差異：**

NLH 短疊 push range 主要考慮：勝率 vs 對手 Call range
PLO 短疊 push range 需要考慮：勝率 vs 對手 Call range **+ 牌的 equity 不均勻**

```
PLO 20bb Push/Fold 基本原則：
  Premium hands（應該 Push/Pot 進入）：
    - AA 任何搭配
    - KK double-suited（帶 broadway 連牌更佳）
    - 強 double-suited rundown（JT98 ds, QJ09 ds）
    - AAKK, AAQQ

  邊際 hands（視位置決定）：
    - QQ/JJ 帶 rundown
    - Suited A + rundown

  應該 fold 的 hands（即使在 NLH 或 Cash PLO 會玩）：
    - 大部分 rainbow 低牌 rundown
    - Single-suited 無 A 的中等牌
```

### 超短疊期（<15bb）：Pure Push/Fold

此時的策略幾乎和牌局複雜度無關，只需要：
1. 計算 ICM 調整後的 push range
2. 等待適合的位置和手牌
3. 不要因為著急而用弱牌 push

---

## 策略切換時機總結

```
策略切換提示表：

籌碼深度     主要策略模式           特別注意
─────────────────────────────────────────────
100bb+       PLO Cash 策略          ICM 在此深度影響較小
80-100bb     漸進收緊選牌           中等 ICM 壓力
50-80bb      明顯收緊，減少 OOP 底池  ICM 壓力增加
30-50bb      重視 commit 門檻        Push/Fold 開始出現
15-30bb      Push/Fold 主導          避免非 all-in 翻牌後決策
<15bb        純 Push/Fold            只打 premium hands
```

---

## 本章重點回顧

1. **目標差異**：Cash 最大化 Chip EV；MTT 最大化 ICM EV（獎金 EV）。
2. **ICM 成本更高**：PLO 的 all-in 更頻繁且更接近 flip，每次 all-in 的 ICM 代價遠大於 NLH。
3. **方差更大**：PLO MTT 的方差約是 NLH MTT 的 1.5-2 倍，需要更大 Bankroll。
4. **籌碼深度動態調整**：MTT 要求掌握從 150bb 到 <10bb 的全範圍策略。
5. **策略切換時機**：以 80bb / 40bb / 20bb / 10bb 作為策略調整的大致門檻。

---

## 延伸閱讀

- `02-ICM與籌碼管理.md`：深入 ICM 計算和 PLO 的特殊應用
- `03-各階段策略調整.md`：各籌碼深度的詳細策略指南
- `04-Bubble與決賽桌.md`：Bubble 和 Final Table 的進階策略

---

*本章所有數據基於 9-max PLO MTT 線上環境估算，實際情況因對手水準和錦標賽結構而異。*
