# 3-bet 與 4-bet：重新奪取主動權（BBA 標準）

## 為何需要 3-bet

3-bet 不只是「我有好牌」的動作，它有三個策略目的：

### 1. Value（價值）
持有 QQ+、AK 類強牌，希望建立大底池，因為翻牌後有勝算優勢。BBA 環境讓底池起點更高，3-bet 建立的底池絕對值也更大，value 3-bet 的 EV 相應提升。

### 2. Steal（偷取）
對手 open range 很寬（如 BTN 的 42-52%），你可以用 3-bet 讓他 fold，直接贏得 BBA 底池。BBA 底池比傳統結構多出 1bb，這讓你的 steal 3-bet 贏得更多。即使被 call，你有翻牌後的主動權。

### 3. Denial of Equity（剝奪 equity）
讓對手的邊緣手牌（76s、T8s 等）折疊，而不是讓他們免費看翻牌並 realize equity。BBA 底池下，對手看到更大的底池，有時反而更願意跟注——所以 denial of equity 的 sizing 要更精確。

---

## BBA 底池計算：3-bet 場景

在開始討論 range 之前，必須先建立 BBA 下的底池數學基準。

### 場景：CO open，BTN 3-bet（100bb）

```
CO open 2.5bb（250）
BBA 已在底池：100（SB）+ 200（BB）+ 200（BBA）= 500
CO 的 250 進入底池 = 750

BTN 3-bet 到 7.5bb（750）
底池 = 750（原有）+ 750（BTN 3-bet）= 1500
BTN 如果被 fold，贏得 750（底池原有部分）
```

### 場景：BTN open，BB 3-bet（100bb）

```
BTN open 2.5bb（250）
底池組成：
  SB = 100（0.5bb）
  BB = 200（1bb）
  BBA = 200（1bb）
  BTN open = 250（1.25bb）
  ─────────────────
  3-bet 前底池 = 750（3.75bb）

BB 3-bet 到 10bb（1000）
BB 已投入：200（BB）+ 200（BBA）= 400，還需加注 600
3-bet 後底池 = 750 + 600 = 1350（6.75bb）

對比傳統無 ante：
  3-bet 前底池 = 100 + 200 + 250 = 550
  BB 3-bet 到 10bb，還需加注 800
  3-bet 後底池 = 550 + 800 = 1350
```

**關鍵洞察：** BBA 讓 BB 的初始投入更大（已付 BB + ante），這意味著 BB 3-bet 時「已在底池的籌碼」更多，相對加注成本略低。BB 的 3-bet bluff 在 BBA 環境下效率更高。

### 場景：SB open，BB 3-bet（100bb）

```
SB open 3bb（300）
底池組成：
  SB open = 300
  BB = 200（1bb）
  BBA = 200（1bb）
  ─────────────────
  3-bet 前底池 = 700（3.5bb）

BB 3-bet 到 9bb（900）
BB 已投入 400（BB + BBA），還需加注 500
3-bet 後底池 = 700 + 500 = 1200

SB 面對 BB 的 3-bet，call 需要付 600 進入 1800 底池
賠率 = 600/1800 = 33.3%（需要 33.3% equity）
```

---

## 3-bet Range 的構成

健康的 3-bet range 由兩部分組成：

**Value hands（值牌）：**
- 通常是 QQ+、AKs、AKo（核心）
- 在 IP 可以加入 JJ、AQs
- 這些手牌最希望被 call，建立大底池
- BBA 讓 value 3-bet 建立的底池更大，value 手牌的 EV 直接提升

**Bluff hands（詐牌）：**
- 選擇原則：有一定 equity 但翻牌後難打 + 有 blocker 效果
- 典型：A5s-A2s（有 Ace blocker，阻止對手的 AA/AK，同時有 flush potential）
- 也包含：KQs（有 blocker 和 connectedness），KJs
- BBA 環境下 bluff 3-bet 贏得更大底池，bluff 的直接收益更高

為什麼不選 KTo 或 QJo 作為 3-bet bluff？因為這些手牌被 call 後 OOP 很難打，且 blocker 效果差。BBA 讓底池更大也讓 OOP 3-bet bluff 被 call 後的後手處境更困難，選擇品質更重要。

---

## 各位置 3-bet Range（9-max，BBA 標準）

### BB vs BTN Open（BB 對 BTN OOP）

BTN open range 最寬（42-52%），BBA 下 BB 的 3-bet 尤其有利：
- BB 已投入 BB + BBA，call 3-bet 成本相對低（已在底池的籌碼更多）
- 但 OOP 打法仍然困難，value-heavy 3-bet 更穩健

3-bet 構成（BBA 標準）：
- Value：QQ+, AKo, AKs
- Bluff：A5s-A2s, KQs, JTs（邊界）
- 3-bet 頻率約 11-15%（BBA 讓 BB 的 bluff 3-bet 略微放寬）

**BBA 底池計算（BTN open 2.5bb，BB 3-bet 10bb）：**
```
3-bet 前底池：0.5 + 1 + 1（BBA）+ 2.5 = 5bb
BB 3-bet 到 10bb，BB 已付 2bb（BB + BBA），還需加注 8bb
3-bet 後底池 = 5 + 8 = 13bb
BTN call 需付 7.5bb 進入 20.5bb 底池
BTN fold 頻率目標 = 10 / (10 + 5) = 66.7%
```

### BTN vs CO Open（BTN 對 CO 有位置）

IP 3-bet 更有價值，BBA 讓底池基數更大，IP 3-bet 的收益提升：
- Value：JJ+, AQs+, AKo
- Bluff：A4s-A2s, KQs, QJs
- 3-bet 頻率約 12-16%

**BBA 底池計算（CO open 2.5bb，BTN 3-bet 8bb）：**
```
3-bet 前底池：0.5 + 1 + 1（BBA）+ 2.5 = 5bb
BTN 3-bet 到 8bb，還需投入 8bb
3-bet 後底池 = 5 + 8 = 13bb
CO call 需付 5.5bb 進入 18.5bb 底池
賠率 = 5.5/18.5 = 29.7%
```

### SB vs BTN Open（SB 對 BTN OOP）

OOP 的 3-bet 需要更 value-heavy。BBA 下 SB 的 resteal 底池計算：
- Value：QQ+, AKo, AKs
- Bluff：A5s（primarily），少量 KQs
- 3-bet 頻率約 8-11%

BBA 特殊考量：SB 在 BBA 下只付了 0.5bb（不含 ante），所以 SB 的 3-bet 成本相對 BB 更高（3-bet 到 12bb，SB 已付 0.5bb，需要再加注 11.5bb）。SB 的 3-bet bluff 應該相對保守。

### SB vs BTN（SB 3-bet sizing 計算）

```
BTN open 2.5bb
底池：0.5（SB）+ 1（BB）+ 1（BBA）+ 2.5（BTN）= 5bb

SB 3-bet 到 12bb：
  SB 已投入 0.5bb，需加注 11.5bb
  3-bet 後底池 = 5 + 11.5 = 16.5bb
  BTN call 需付 9.5bb 進入 26bb 底池
  BTN fold 目標 = 12 / (12 + 5) = 70.6%
```

### CO vs UTG Open（CO 對 UTG OOP）

UTG open range 很窄，CO 3-bet 需要非常強：
- Value：KK+（AA 必，KK 必，QQ 可以 call 也可以 3-bet）
- 幾乎無 bluff（UTG range 太強，bluff 3-bet 勝率太低）
- 3-bet 頻率約 4-6%

BBA 不改變這個邏輯——UTG range 的強度讓 CO 的 bluff 3-bet 幾乎沒有正 EV。

---

## 3-bet Sizing（BBA 標準）

BBA 讓底池基數更大，3-bet sizing 需要相應調整以維持正確的底池壓力。

### IP 3-bet（有位置）

通常是 open 的 2.5-3x，但需要考慮 BBA 底池：

```
CO open 2.5bb，BBA 底池 2.5bb，BTN 3-bet：
  傳統 sizing：7-8bb（約 3x CO open）
  BBA 調整建議：7-8bb 維持不變

  原因：BBA 讓底池更大，但 sizing 以 open 的倍數計算，
  BBA 對 IP 3-bet sizing 的影響相對中性。

  重要的是：3-bet 到 8bb，整個底池 13bb，
  被 call 後翻牌 SPR = (100-8) / 13 = 7.1（合理深度）
```

**IP 3-bet sizing 建議（BBA 環境）：**

| 對手 open | IP 3-bet sizing | 原因 |
|----------|----------------|------|
| 2bb open | 6-7bb | 2.5-3x 倍數 |
| 2.5bb open | 7-8bb | 標準 3x |
| 3bb open（SB）| 9-10bb | 略大，SB open 通常更窄 |

### OOP 3-bet（無位置）

通常是 open 的 3-4x，BBA 環境下需要注意：

```
UTG open 2.5bb，BB 3-bet：
  BBA 底池 = 0.5 + 1 + 1（BBA）+ 2.5 = 5bb

  BB 3-bet 到 10bb：
    還需投入 8bb（已付 BB + BBA = 2bb）
    3-bet 後底池 = 5 + 8 = 13bb
    UTG call 後翻牌 SPR = (100-10) / 20 = 4.5

  BB 3-bet 到 12bb：
    還需投入 10bb
    3-bet 後底池 = 5 + 10 = 15bb
    UTG call 後翻牌 SPR = (100-12) / 22 = 4.0
```

**BBA 環境下 OOP 3-bet sizing 建議：**

BB vs BTN（BTN open 2.5bb）：
- 標準：10-11bb（約 4-4.5x）
- BBA 底池讓 10bb 的壓力感更強（BTN 需要付 7.5bb 進入更大底池）

SB vs BTN（BTN open 2.5bb）：
- 標準：12-14bb
- SB OOP 且翻牌後打法困難，需要大 sizing 讓對手 fold 或 commit

**OOP 需要更大尺寸的原因（BBA 版本）：**
- BBA 底池更大，對手 call 後的 SPR 相對降低
- OOP 需要確保 3-bet 後不論 call 或 fold 都有正 EV
- 更大 sizing 讓 bluff 的成功率補償了被 call 時的翻牌後劣勢

---

## 面對 3-bet 的選擇

當你 open 被 3-bet，有三個選項：

### 選項一：4-bet（反 raise）

**何時 4-bet：**
- Value：AA、KK（必 4-bet），QQ（通常），AKs/AKo（通常）
- Bluff：少量 blockers（如 A4s 作為 bluff，因為有 Ace blocker）

**BBA 環境下的 4-bet sizing：**

```
場景：CO open 2.5bb，BTN 3-bet 8bb，CO 4-bet
  3-bet 後底池 = 13bb
  CO 4-bet 到多少？

  一般是 3-bet 的 2.3-2.8x：
  8 × 2.5 = 20bb（標準 4-bet）

  BBA 底池已有 5bb 在裡面，4-bet 到 20bb：
    CO 需投入 20 - 2.5 = 17.5bb
    4-bet 後底池 = 13 + 17.5 = 30.5bb
    BTN call 需付 12bb 進入 42.5bb 底池
    BTN fold 目標 = 20 / (20 + 13) = 60.6%
```

**4-bet sizing 建議（BBA 環境）：**

| 3-bet 大小 | 4-bet 建議 | 底池壓力 |
|-----------|-----------|---------|
| 8-9bb（IP 3-bet）| 20-22bb | 標準，有效 |
| 10-11bb（OOP BB 3-bet）| 24-27bb | 需要更大 |
| 12-14bb（OOP SB 3-bet）| 28-32bb | 大尺寸 4-bet |

深疊 100bb+ 的 4-bet：通常不是全壓，留後手空間。
淺疊 50bb 以下的 4-bet：幾乎等於 commit，直接 shove 往往更簡單。

### 選項二：Call（跟注）

**何時 call：**
- 有位置（IP call 比 OOP call 更有價值）
- 手牌有 playability（JJ、TT、AQs in position）
- 深疊，implied odds 足夠（77、KQs in position）

**BBA 對 call 3-bet 的影響：**

BBA 讓 3-bet 後底池更大，翻牌前 SPR 更低。以 BTN 3-bet 8bb 為例：

```
BBA 環境（100bb 深疊）：
  翻牌底池 = 16.5bb（BTN 8bb + CO call 8bb + 原底池 0.5bb 已計入）
  實際：BTN 投入 8bb，CO call 8bb，底池約 16.5bb
  剩餘籌碼：100 - 8 = 92bb
  SPR = 92 / 16.5 = 5.6

傳統無 ante：
  翻牌底池 = 約 14.5bb
  SPR = 92 / 14.5 = 6.3
```

BBA 讓 call 3-bet 後的 SPR 略低（5.6 vs 6.3），set mining 和 suited connector 的隱含賠率略有下降，但影響不大。在 IP 深疊仍然值得 call。

**OOP call 3-bet 需要非常謹慎：**
OOP call 3-bet 後，BBA 讓翻牌 SPR 更低（約 3-5），你需要連翻牌都打得好。只有非常深疊且手牌有很強的翻牌後打法時才考慮。

### 選項三：Fold

面對強位置的 3-bet，很多手牌的正確選擇是 fold：
- UTG open，被 BB 3-bet：AJo、KQo、TT 通常 fold（OOP 且面對強 3-bet range）
- CO open，被 BTN 3-bet：QJs、KTo fold

BBA 不改變這些 fold 決策——如果翻牌後打法困難，更大的底池只會讓虧損更多。

---

## 4-bet Range（深疊，BBA 標準）

4-bet 的構成類似 3-bet——value + bluff：

**Value 4-bet：** AA, KK, QQ（高頻）, AKs（通常）, AKo（通常）

**Bluff 4-bet：**
- 選擇有 blocker 效果的手牌
- A5s, A4s：有 Ace blocker（阻止對手的 AA/AK），同時如果被 call，仍有 flush equity
- KQs（在某些 IP 的 5-bet 稀少情境）

**BBA 環境下的 4-bet bluff 邏輯：**

BBA 底池讓每次 4-bet bluff 成功（對手 fold）贏得更多。以 BB 3-bet 11bb（BBA 底池較大）為例：

```
CO open 2.5bb
BBA 底池：5bb
BB 3-bet 到 11bb（還需加注 9bb）
3-bet 後底池 = 14bb

CO 4-bet bluff 到 26bb：
  CO 需投入 26 - 2.5 = 23.5bb
  如果 BB fold：CO 贏得 14bb（3.5bb 的底池 EV 扣除自己的 23.5bb 成本不對）

  正確計算：
  CO 投入 2.5bb open，現在加注到 26bb，總投入 26bb
  4-bet bluff 贏得底池 14bb（返回 CO 前已投入的 2.5bb）
  淨收益 = 14 - 26 + 2.5 = -9.5bb（如果總是被 fold）

  等等——這是 fold EV，成功 4-bet bluff：
  贏得已在底池的 14bb，自己投入了 23.5bb（額外加注）
  淨盈利 = 14 - 0 = +14bb（如果 BB fold，CO 追回所有本金並贏得 BB 的注）

  正確理解：4-bet bluff 的目標是讓 BB fold 放棄他的 3-bet 投入
  BBA 讓 BB 的 3-bet 底池更大（多了 ante），fold equity 更高
```

**4-bet bluff 的邏輯（BBA 精確版）：**
你 4-bet bluff，對手只能用 AA/KK 繼續（5-bet）。BBA 讓對手的 3-bet 底池更大，fold equity 的收益相應提升。如果對手的 3-bet 是寬的（包含很多 bluff），你的 4-bet 可以讓他大量 fold，BBA 讓這個 fold equity 的收益更高。

---

## 各深度 3-bet/4-bet 應用總表（BBA）

### 100bb 深疊

| 場景 | 3-bet sizing | 4-bet sizing | 翻牌 SPR（被 call 後）|
|------|-------------|-------------|---------------------|
| IP 3-bet | open × 3 | 3-bet × 2.5 | 5-7 |
| OOP BB 3-bet | open × 4-4.5 | 3-bet × 2.3 | 4-5 |
| OOP SB 3-bet | open × 4.5-5 | 3-bet × 2.3 | 3.5-4.5 |

### 50bb 中疊

50bb 時 4-bet 幾乎等於 commit，建議直接 shove：

```
CO open 2.5bb（50bb 深疊）
BTN 3-bet 到 8bb
CO 考慮 4-bet：
  4-bet 到 18bb = 投入 36% 的籌碼
  翻牌 SPR 太低，不如直接 shove（50bb）

  CO 4-bet shove：推進 50bb
  BTN call 需付 42bb 進入 100bb 底池
  BTN call 賠率 = 42/100 = 42%（需要 42% equity）
```

### 30bb 極淺

30bb 以下，3-bet 幾乎等於 all-in：

```
BTN open 2.5bb（30bb 深疊）
BB 3-bet shove：27.5bb（剩餘籌碼）
BTN call 底池：0.5+1+1（BBA）+2.5+27.5 = 32.5bb
BTN 需付 25bb 進入 57.5bb 底池
賠率 = 25/57.5 = 43.5%
```

30bb 的 3-bet range 要更 value-heavy，幾乎沒有 bluff 空間（被 call 要有足夠 equity）。

---

## 線上特別說明（BBA 環境）

**線上玩家的 fold to 3-bet 統計普遍偏高。**

線上 MTT 中，尤其是中低 stakes，玩家面對 3-bet 的 fold 率通常在 55-70%（GTO 約 50%）。

BBA 環境強化了這個現象——底池更大讓玩家感受到「被打大了」的壓力，fold 3-bet 的傾向更強。

這意味著：
- 3-bet bluff 頻率可以高於理論值（多 3-5%）
- BBA 讓每次成功的 3-bet bluff 贏得更多，整體 EV 更高
- 尤其是 BTN/CO 面對較鬆玩家的 open，BBA 下的 3-bet bluff EV 非常高

```
BBA 環境 3-bet bluff EV 計算（BTN 3-bet BB open）：
  BTN 3-bet bluff 到 8bb
  對手 fold 頻率：65%（線上偏高）

  fold EV = 0.65 × 3.5bb（BBA 底池，對手已投入）= +2.275bb
  call EV（假設有 35% equity）：
    call 35%：35% × 16.5bb - 8bb = +5.775 - 8 = -2.225bb

  整體 EV = 0.65 × 2.275 + 0.35 × (-2.225)
          = 1.479 - 0.779 = +0.7bb（正 EV）

  無 ante 時：
  fold EV = 0.65 × 2.5bb = +1.625bb
  整體 EV = 0.65 × 1.625 + 0.35 × (-2.225) = +0.278bb（仍正 EV 但更低）
```

**如何識別這類機會：**
1. HUD 統計：fold to 3-bet > 65% → 可以更積極 3-bet bluff
2. 注意對手的 open size：小尺寸 open（2-2.2bb）通常代表更廣的 range，BBA 下偷盲 EV 更高所以更廣 open 是合理的
3. 觀察對手在面對 3-bet 後的反應模式：一旦 fold 了兩次，下次 value 3-bet 時更容易獲得更多尊重

**注意：** 即使對手 fold to 3-bet 高，仍需要選擇好的手牌做 bluff（有 blocker、有後手 equity）。BBA 底池更大不意味著可以用任意手牌 3-bet bluff——被 call 後的翻牌後打法同樣重要。
