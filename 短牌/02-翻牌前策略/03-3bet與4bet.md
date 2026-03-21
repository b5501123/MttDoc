# 3-bet 與 4-bet

> 章節：2-3 | 難度：⭐⭐⭐ | 建議先修：02-位置與開牌範圍.md

---

## 本章學習目標

1. 理解短牌 3-bet 範圍的構建邏輯
2. 掌握 4-bet 的正確使用場景
3. 學習 Polar vs Linear 策略在短牌中的應用
4. 了解 ICM 壓力下的 3-bet 調整

---

## 一、短牌 3-bet 的基本框架

### 1.1 為什麼 3-bet 範圍在短牌比德州更緊？

**原因 1：更多跟注者**

短牌翻牌後的 Draw 豐富，對手更願意跟注 3-bet（因為他們知道翻牌後有追牌機會）。這讓 3-bet Bluff 的折疊率更低，純 Bluff 3-bet 的 EV 下降。

**原因 2：3-bet 後底池更大**

底池更大意味著翻牌後每一個決策的成本更高。如果你用劣勢牌 3-bet 並在翻牌後繼續跟注，損失可能很大。

**原因 3：短牌的對局 EV 更接近 50/50**

AA vs 同花連牌在短牌中只有 65-70% 的勝率（德州 75-80%），這讓所有翻前全押的「保證」都有所降低。

**原因 4：ICM 在 MTT 中放大謹慎性**

ICM 讓你在泡沫期或決賽桌附近更不願意冒險，這進一步壓縮了 3-bet 的積極性。

### 1.2 3-bet Size 建議

短牌的 3-bet Size 通常比德州更大：

| 情境 | 德州 3-bet Size | 短牌 3-bet Size |
|------|--------------|--------------|
| OOP（無位置）3-bet | 3-3.5x 開牌 | 3.5-4x 開牌 |
| IP（有位置）3-bet | 2.5-3x 開牌 | 3-3.5x 開牌 |
| SB vs BTN | 3-3.5x | 4x |
| BB vs CO | 3x | 3.5x |

例：CO 開牌到 300（3x），BTN 3-bet 到 900（3x 的 300），短牌建議 BTN 3-bet 到 1050（3.5x）。

---

## 二、3-bet 範圍的構建

### 2.1 線性（Linear / Merged）3-bet Range

線性範圍：以真正的強牌為主，少量或不含 Bluff。

```
線性 3-bet 範圍（適合大多數 MTT 情況）：

超強牌（Value Core）：
AA, KK, QQ, JJ（前四強對子）
AKs（同花 AK，Flush 潛力強）
AKo（大多數情況）

強牌延伸（Value Extension）：
TT（視情況 3-bet 或跟注）
AQs（有 Flush 潛力，3-bet 友好）
KQs（強同花連牌）

半強牌（Semi-Value / Thin Value）：
AJs（有 Flush 潛力）
JTs（Combo Draw 潛力，作為平衡）
```

**何時使用線性範圍**：
- ICM 壓力較高時（泡沫、FT 附近）
- 對手 3-bet 後不喜歡棄牌時
- 你的 3-bet 被對手視為很強的信號時

### 2.2 極化（Polar）3-bet Range

極化範圍：超強牌（Value）+ 弱牌（Bluff），去掉中等強牌。

```
極化 3-bet 範圍：

Value（超強牌）：
AA, KK, QQ, JJ, AKs, AKo

Bluff（通常是有 Flush 潛力的手牌）：
A6s（有 Nut Flush Draw 潛力，棄牌成本低）
A7s（同上）
JTs（作為 Bluff 時，有 Backup Equity）
TJs（同上）
```

**何時使用極化範圍**：
- 深疊時（100bb+），因為有足夠的籌碼空間
- 對手 3-bet 後折疊率較高時
- 位置良好時（IP 3-bet）

**短牌中極化範圍的選擇偏好**：
- 選同花牌作 Bluff（有 Flush Draw 備胎）
- 避免選純弱牌（沒有 Backup Equity 的 Bluff 在短牌中更危險）

### 2.3 實戰範例：CO vs BTN 3-bet

```
情境：CO 開牌到 3x，BTN 考慮 3-bet

BTN 3-bet Value 手牌（必 3-bet）：
AA, KK, QQ, JJ, TT, AKs, AKo, AQs

BTN 跟注手牌（有位置，隱含賠率好）：
99, 88, JTs, TJs, 9Ts, 89s

BTN Bluff 3-bet 手牌（選擇性）：
A6s, A7s, K8s（有 Flush 潛力的適合 Bluff）

BTN 棄牌手牌：
77 以下對子（沒有足夠強度 3-bet，跟注後位置好但仍難打）
不同花中等牌（KJo, KTo 等）
```

---

## 三、4-bet 策略

### 3.1 4-bet 的核心原則

**短牌 MTT 中，4-bet 幾乎只用超強牌。**

原因：
1. 4-bet 後底池極大，翻牌後幾乎是全押或棄牌的情況
2. 短牌中對手 3-bet 通常代表更強的牌（3-bet 范围更緊）
3. ICM 壓力讓大底池決策更敏感

### 3.2 4-bet 價值範圍

```
純 Value 4-bet：
AA（無論如何必 4-bet）
KK（幾乎必 4-bet，除非對手極緊）
QQ（視情況）

情境判斷的 4-bet：
JJ：只在對手 3-bet range 較寬時 4-bet，否則跟注
AKs：視對手 3-bet 習慣決定

幾乎不 4-bet 的手牌：
TT 以下的對子
AQs 以下的同花高牌
```

### 3.3 4-bet Size

```
短牌 4-bet Size：
IP 4-bet：約 2-2.5x 3-bet 的金額
OOP 4-bet：約 2.5-3x 3-bet 的金額

例：底池 100（Ante + 盲注），CO 開牌 300，BTN 3-bet 900，
CO 4-bet 到 2200-2500（約 2.5x 3-bet）
```

### 3.4 4-bet Bluff

**短牌 MTT 中，4-bet Bluff 應極為少見。**

如果偶爾需要平衡，選擇：
- 有很強 Equity 的手牌（如 AJs 同花——如果 4-bet 後跟注，仍有不錯的 Flush 潛力）
- 不要用純弱牌 Bluff 4-bet

---

## 四、面對 3-bet 的防守

### 4.1 面對 3-bet 的決策框架

```
你開牌，對手 3-bet，你的選擇：
1. 棄牌（Fold）
2. 跟注（Call）
3. 4-bet（Re-raise）

決策因子：
- 你的手牌強度
- 對手的 3-bet 頻率（緊 or 寬？）
- 位置（你有位置還是無位置？）
- 籌碼深度
- ICM 壓力
```

### 4.2 有位置跟注 3-bet

```
有位置（例如 BTN 面對 CO 3-bet）：
可以跟注的手牌：
- 中等強牌：TT-88, KQs, AJs
- 同花連牌：JTs, 9Ts, 89s（有 Combo Draw 潛力）
- 不太適合 4-bet 但也不該棄牌的手牌

跟注的邏輯：
位置讓你可以翻牌後控制底池
Short Deck 的 Draw 讓有潛力的牌值得跟注
```

### 4.3 無位置跟注 3-bet

```
無位置（例如 UTG 面對 BTN 3-bet）：
大幅收緊跟注範圍：
- 跟注：AA, KK, QQ, JJ, AKs
- 棄牌：AKo 以下的手牌（除非你想 4-bet）

原因：無位置的翻牌後不利，短牌中這個劣勢更大
```

### 4.4 BB vs BTN 3-bet 的特殊情況

```
BB 面對 BTN 3-bet：
BB 已付大盲，有折扣跟注的優勢

BB 跟注範圍（比一般 OOP 寬）：
- 強牌：JJ+, AQs+
- 同花連牌（有 Combo Draw 潛力）：JTs, TJs, 9Ts
- 中等強牌：TT, 99, KQs

BB 應棄牌：
- 不同花中等牌（KJo, QJo 等）
- 小對子（無位置，Set Mining ROI 低）
- 雜牌
```

---

## 五、Squeeze（擠壓）

### 5.1 什麼是 Squeeze

Squeeze = 在有一個開牌者和一個或多個跟注者的情況下進行的 3-bet。

```
例：UTG 開牌 300，CO 跟注 300，BTN Squeeze 到 1500

Squeeze 的邏輯：
- 跟注者通常持有較弱的手牌（否則會 3-bet）
- 底池已經很大（有跟注者的貢獻）
- 打出讓所有人棄牌的機率高

短牌 Squeeze：
- 比德州更謹慎
- 因為跟注者在短牌中有更多 Draw 理由，折疊率不高
- Squeeze Value 手牌更重要（AA, KK, AKs）
```

### 5.2 Squeeze 的最佳時機

```
適合 Squeeze 的情況：
1. 有 AA/KK/AKs——創造最大底池
2. 跟注者位置不好（例如 SB 跟注）
3. 對手的開牌範圍已知為較寬（容易棄牌）

不適合 Squeeze 的情況：
1. 對手是深疊的積極玩家（不容易棄牌）
2. 你的手牌只是中等強牌（風險回報不划算）
3. ICM 壓力高（Bubble 附近）
```

---

## 六、ICM 壓力下的 3-bet 調整

### 6.1 ICM 如何影響 3-bet

ICM（獨立籌碼模型）讓每個籌碼的邊際價值隨著排名變化。

在 MTT 的關鍵階段：
- **泡沫期**：短疊玩家不願意冒險，大疊玩家反而可以更積極 3-bet
- **決賽桌早期**：每個位置的升級都有真實金錢價值，應謹慎
- **HU 或最後 2-3 人**：ICM 影響最大，3-bet/4-bet 的範圍需要完全重評估

### 6.2 具體 ICM 調整

```
泡沫期（差 1 個名次進獎圈）：

大疊（底池相對較小的風險）：
→ 可以 3-bet Bluff，因為對手更怕 ICM
→ 但要謹慎 4-bet，因為還有全押風險

中疊（ICM 最敏感的位置）：
→ 大幅收緊 3-bet 範圍
→ 只 3-bet 超強牌（AA, KK, AKs）
→ 避免 Bluff 3-bet

短疊（全押壓力下）：
→ Push 或 Fold 邏輯
→ 3-bet 通常等於全押
→ 只選最強的手牌
```

### 6.3 決賽桌 3-bet 策略

```
決賽桌（9 人到 1 人）：

早期 FT（9-6 人）：
→ 類似泡沫期，謹慎 3-bet
→ 大疊可以利用對中疊/短疊的 ICM 壓力

中期 FT（5-3 人）：
→ 3-bet 範圍因人而異
→ 短疊的 Push Range 更緊
→ 大疊繼續施壓

HU（2 人決賽）：
→ 3-bet 大幅放寬
→ 幾乎每手牌都有 3-bet 的理由
→ ICM 影響最小（只有 1、2 名的差別）
```

---

## 七、具體手牌情景分析

### 情景 1：AA 面對 3-bet

```
情境：
你在 UTG 開牌（AA），CO 3-bet，其他人棄牌

你的選擇：
4-bet（建議）：AA 是最強牌，應該建立底池
跟注（偶爾）：如果你想陷阱打法，但在短牌 MTT 中通常不推薦

4-bet Size：3-bet 金額的 2.5x
例：CO 3-bet 900，你 4-bet 到 2200

結論：幾乎必 4-bet
```

### 情景 2：JTs 面對 3-bet（有位置）

```
情境：
你在 BTN，CO 開牌，你 3-bet JTs（計劃是 Bluff 3-bet）
CO 4-bet！

你的選擇：
棄牌（建議）：CO 的 4-bet 代表超強牌，JTs 的 Equity 不夠
跟注（偶爾極深疊）：如果籌碼深度 > 200bb 且有隱含賠率

結論：通常棄牌，JTs 的 Bluff 3-bet 被 4-bet 後必須棄牌
```

### 情景 3：QQ 面對 3-bet（無位置）

```
情境：
你在 UTG+1，開牌 3x（QQ），BTN 3-bet 3.5x

你的選擇：
4-bet：可以，但要注意 BTN 的 3-bet 範圍
跟注：也可以，有位置時翻牌後更靈活
棄牌：絕對不棄牌

無位置的 QQ vs BTN 3-bet：
→ 4-bet 到 2.5x 3-bet，看 BTN 反應
→ 如果 BTN 跟注，翻牌後謹慎（QQ 高牌翻牌很少，QQ 配對機率低）
→ 如果 BTN 5-bet All-in，你面對 AA/KK 的機率很高，可以考慮棄牌
```

---

## 本章重點摘要

1. **3-bet 範圍比德州更緊**：翻牌後 Draw 多讓純 Bluff 3-bet 效果差
2. **3-bet 偏線性**：主要以強牌為主，少量同花 Bluff 手牌
3. **4-bet 基本只用 AA/KK**：少量 AKs/QQ，幾乎不 4-bet Bluff
4. **ICM 壓力下更緊**：泡沫期和 FT 早期大幅收緊 3-bet
5. **有位置時可以跟注 3-bet**：同花連牌的隱含賠率在 IP 時更高
6. **Squeeze 要謹慎**：Short Deck 對手不容易因 Squeeze 棄牌

> 下一章：[03-翻牌後策略](../03-翻牌後策略/01-翻牌質地與Outs.md) —— 翻牌質地分析和 Outs 計算的實戰應用
