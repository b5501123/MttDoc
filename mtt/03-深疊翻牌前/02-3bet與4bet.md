# 3-bet 與 4-bet：重新奪取主動權

## 為何需要 3-bet

3-bet 不只是「我有好牌」的動作，它有三個策略目的：

### 1. Value（價值）
持有 QQ+、AK 類強牌，希望建立大底池，因為翻牌後有勝算優勢。

### 2. Steal（偷取）
對手 open range 很寬（如 BTN 的 42-52%），你可以用 3-bet 讓他 fold，直接贏得底池。即使被 call，你有翻牌後的主動權。

### 3. Denial of Equity（剝奪 equity）
讓對手的邊緣手牌（76s、T8s 等）折疊，而不是讓他們免費看翻牌並 realize equity。

---

## 3-bet Range 的構成

健康的 3-bet range 由兩部分組成：

**Value hands（值牌）：**
- 通常是 QQ+、AKs、AKo（核心）
- 在 IP 可以加入 JJ、AQs
- 這些手牌最希望被 call，建立大底池

**Bluff hands（詐牌）：**
- 選擇原則：有一定 equity 但翻牌後難打 + 有 blocker 效果
- 典型：A5s-A2s（有 Ace blocker，阻止對手的 AA/AK，同時有 flush potential）
- 也包含：KQs（有 blocker 和 connectedness），KJs

為什麼不選 KTo 或 QJo 作為 3-bet bluff？因為這些手牌被 call 後 OOP 很難打，且 blocker 效果差。

---

## 各位置 3-bet Range（9-max）

### BB vs BTN Open（IP 讓 BTN OOP 不適用，BB 對 BTN 仍 OOP）

BTN open range 最寬（42-52%），BB 3-bet 的 value 最高：
- Value：QQ+, AKo, AKs
- Bluff：A5s-A2s, KQs, JTs（邊界）
- 3-bet 頻率約 10-14%

### BTN vs CO Open（BTN 對 CO 有位置）

IP 3-bet 更有價值：
- Value：JJ+, AQs+, AKo
- Bluff：A4s-A2s, KQs, QJs
- 3-bet 頻率約 12-16%

### SB vs BTN Open（SB 對 BTN OOP）

OOP 的 3-bet 需要更 value-heavy：
- Value：QQ+, AKo, AKs
- Bluff：A5s（primarily），少量 KQs
- 3-bet 頻率約 8-11%

### CO vs UTG Open（CO 對 UTG OOP）

UTG open range 很窄，CO 3-bet 需要非常強：
- Value：KK+（AA 必，KK 必，QQ 可以 call 也可以 3-bet）
- 幾乎無 bluff（UTG range 太強，bluff 3-bet 勝率太低）
- 3-bet 頻率約 4-6%

---

## 3-bet Sizing

### IP 3-bet（有位置）
- 通常是 open 的 2.5-3x
- 範例：CO open 2.5bb，BTN 3-bet 7-8bb

### OOP 3-bet（無位置）
- 通常是 open 的 3-4x
- 範例：UTG open 2.5bb，BB 3-bet 9-11bb

**OOP 需要更大尺寸的原因：**
- 讓對手更少 call（因為 OOP 後手打法更難）
- 如果被 call，需要建立足夠大的底池讓 3-bet 和 c-bet 的 EV 相符

---

## 面對 3-bet 的選擇

當你 open 被 3-bet，有三個選項：

### 選項一：4-bet（反 raise）

**何時 4-bet：**
- Value：AA、KK（必 4-bet），QQ（通常），AKs/AKo（通常）
- Bluff：少量 blockers（如 A4s 作為 bluff，因為有 Ace blocker）

**4-bet sizing：**
- 一般是 3-bet 的 2.3-2.8x
- 例：被 3-bet 到 10bb，4-bet 約 22-28bb

深疊 100bb+ 的 4-bet：通常不是全壓，留後手空間
淺疊 50bb 以下的 4-bet：幾乎等於 commit，直接 shove 往往更簡單

### 選項二：Call（跟注）

**何時 call：**
- 有位置（IP call 比 OOP call 更有價值）
- 手牌有 playability（JJ、TT、AQs in position）
- 深疊，implied odds 足夠（77、KQs in position）

**OOP call 3-bet 需要非常謹慎：**
OOP call 3-bet 後，翻牌前 SPR 降低（約 3-5），你需要連翻牌都打得好。只有非常深疊且手牌有很強的翻牌後打法時才考慮。

### 選項三：Fold

面對強位置的 3-bet，很多手牌的正確選擇是 fold：
- UTG open，被 BB 3-bet：AJo、KQo、TT 通常 fold（OOP 且面對強 3-bet range）
- CO open，被 BTN 3-bet：QJs、KTo fold

---

## 4-bet Range（深疊）

4-bet 的構成類似 3-bet——value + bluff：

**Value 4-bet：** AA, KK, QQ（高頻）, AKs（通常）, AKo（通常）

**Bluff 4-bet：**
- 選擇有 blocker 效果的手牌
- A5s, A4s：有 Ace blocker（阻止對手的 AA/AK），同時如果被 call，仍有 flush equity
- KQs（在某些 IP 的 5-bet 稀少情境）

**4-bet bluff 的邏輯：**
你 4-bet bluff，對手只能用 AA/KK 繼續（5-bet）。如果對手的 3-bet 是寬的（包含很多 bluff），你的 4-bet 可以讓他大量 fold。

---

## 線上特別說明

**線上玩家的 fold to 3-bet 統計普遍偏高。**

線上 MTT 中，尤其是中低 stakes，玩家面對 3-bet 的 fold 率通常在 55-70%（GTO 約 50%）。

這意味著：
- 3-bet bluff 頻率可以高於理論值（多 3-5%）
- 被 fold 的 EV 比理論更高，3-bet bluff 的整體 EV 更正
- 尤其是 BTN/CO 面對較鬆玩家的 open，3-bet bluff 的 EV 非常高

**如何識別這類機會：**
1. HUD 統計：fold to 3-bet > 65% → 可以更積極 3-bet bluff
2. 注意對手的 open size：小尺寸 open（2-2.2bb）通常代表更廣的 range
3. 觀察對手在面對 3-bet 後的反應模式

**注意：** 即使對手 fold to 3-bet 高，仍需要選擇好的手牌做 bluff（有 blocker、有後手 equity）。不能因為對手愛 fold 就用 72o 3-bet bluff。
