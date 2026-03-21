# ICM 與籌碼管理：PLO MTT 的生存之道

> 本章深入講解 ICM（Independent Chip Model）在 PLO MTT 中的應用，
> 包含具體計算例子，幫助你在關鍵時刻做出正確的 ICM 決策。

---

## 什麼是 ICM？

ICM（Independent Chip Model，獨立籌碼模型）是將錦標賽籌碼數量轉換為**實際獎金價值**的數學模型。

**核心概念**：在 MTT 中，籌碼的邊際價值**遞減**。

```
直觀理解：
  從 0 → 10,000 籌碼：你「活著」，有獲獎機會  → 巨大價值增加
  從 10,000 → 20,000 籌碼：你的獲獎機會提高   → 中等價值增加
  從 90,000 → 100,000 籌碼：領先優勢略微提升  → 小幅價值增加
  從 100,000 → 110,000 籌碼：邊際效用繼續遞減 → 更小的價值增加
```

---

## ICM 計算基礎

### 基本 ICM 公式

每位玩家的 ICM 價值（$EV）計算方法：

```
ICM EV ≈ Σ（獎金等級 × 在該等級完賽的機率）

其中，在某等級完賽的機率 ≈ f(當前籌碼量, 其他玩家籌碼量, 位置)
```

**簡化範例（3 人最終桌，獎金結構 50/30/20）：**

```
玩家 A：6,000 籌碼（60%）
玩家 B：3,000 籌碼（30%）
玩家 C：1,000 籌碼（10%）
總籌碼：10,000

獎金池：$1,000（50/30/20 = $500/$300/$200）

ICM EV 計算（簡化）：
  玩家 A 的 ICM EV：
    贏得 1st（約 60%）→ $500 × 0.60 = $300
    獲得 2nd（約 27%）→ $300 × 0.27 = $81
    獲得 3rd（約 13%）→ $200 × 0.13 = $26
    總計：約 $407

  玩家 C 的 ICM EV：
    贏得 1st（約 10%）→ $500 × 0.10 = $50
    獲得 2nd（約 18%）→ $300 × 0.18 = $54
    獲得 3rd（約 72%）→ $200 × 0.72 = $144
    總計：約 $248
```

---

## PLO 的 Chip EV vs ICM EV

### 何時使用 Chip EV 思維

在以下情況，Chip EV 思維可以（近似）替代 ICM EV：

1. **深疊早期**：距離泡沫很遠，籌碼深度 100bb+
2. **無明顯泡沫壓力**：距離獎金圈還有大量玩家
3. **每位玩家籌碼相近**：ICM 壓力相對均勻
4. **超短疊 all-in**：籌碼量太小，ICM 差異微小

```
Chip EV 思維優先的場景（PLO MTT 早期）：
  總玩家 100 人，當前剩 85 人，付 15 名
  你的籌碼：80bb（接近平均水準）

  此時 ICM 影響較小，可以用 Chip EV 打更接近 Cash Game 的策略
```

### 何時必須使用 ICM EV 思維

以下情況，必須使用 ICM EV 思維：

1. **泡沫附近（Bubble）**：剩餘玩家接近獲獎人數
2. **短疊壓力**：你是短疊或附近有多位短疊
3. **籌碼差距巨大**：對手是你 3 倍以上的大疊
4. **決賽桌（Final Table）**：每次出局的獎金跳幅明顯
5. **ICM Deal 討論**：多玩家協議分錢時

```
ICM EV 思維優先的場景（PLO MTT 泡沫）：
  總玩家 100 人，付 15 名，當前剩 17 人
  你的籌碼：25bb（中短疊）
  大疊對你翻牌前 Pot，你有 KK86 double-suited

  此時必須考慮 ICM：即使 KK86 ds 是強牌，
  在 PLO 中 all-in 還是接近 flip，ICM 代價巨大。
```

---

## PLO MTT Bubble 的特殊考量

### 為什麼 PLO MTT 的 Bubble 比 NLH 更複雜

**NLH MTT Bubble 的基本邏輯：**
- AA 翻牌前 all-in：約 80% 優勢
- 大疊可以「免疫」中短疊的 all-in 壓力
- 短疊 push 範圍可以根據 ICM 精確計算

**PLO MTT Bubble 的困難：**
- 最強手牌 all-in 也只有 60-65% 優勢
- 翻牌後幾乎所有 all-in 都是 flip 水準（50-55%）
- **ICM 代價極高：每次 all-in 都可能是「生死抉擇」**

```
PLO MTT Bubble 的 all-in 勝率現實：

情況 1：翻牌前 AA ds vs KKxx
  AA ds 勝率：約 65%（不是 NLH 的 80%！）
  ICM 分析：65% 的 all-in，在 bubble 附近，仍需謹慎

情況 2：翻牌後 Set vs Wrap + Flush Draw
  Set 勝率：約 35-45%（你在支持板！）
  Wrap + FD 勝率：約 55-65%
  → PLO 翻牌後很少有「明顯優勢」，Set 不是 NLH 的 Flush Draw 一樣安全

情況 3：Top Two Pair vs Wrap Draw
  Top Two Pair 勝率：約 45%
  Wrap Draw 勝率：約 55%
  → 你是 Chip EV 的弱方！更別說 ICM
```

### Bubble 時哪些手牌可以打？

**可以主動 all-in 的情況（Bubble 附近）：**

```
1. Nut Draw 組合（翻牌後）
   條件：Nut Flush Draw + OESD/Wrap Draw（20+ outs）
   理由：勝率 50-60%，加上 fold equity，整體 EV 正值

2. Set on Dry Board（翻牌後）
   條件：在乾燥無聽牌板上的底層 set
   理由：對手的 draw range 少，勝率 60-70%

3. 翻牌前 AA（有 backup）
   條件：AA + 同花 + 連牌（AA ds 帶 rundown）
   理由：即使在 PLO，AA ds 翻牌前仍是 65%+ 優勢

4. 強迫 Push（短疊 <15bb）
   條件：被迫選擇 push 的短疊情況
   理由：等更長時間會讓籌碼更少，必須主動找機會
```

**應該 fold 的情況（Bubble 附近，即使 Chip EV 正值）：**

```
1. Top Two Pair 在濕潤板
   Chip EV：可能 +EV
   ICM EV：接近 flip，Bubble 的 ICM 代價使其 -EV

2. 弱 Set 在重度聽牌板
   翻牌：K♠Q♣J♠（三張花色）
   你的 Set：小 Set（如 6♥6♦6♠xx）
   問題：你面對大量 Draw，勝率可能不足 50%

3. 非 Nut Draw 追逐
   你有 Second Nut Flush Draw（非最高同花）
   在 PLO，追非 Nut Draw 代價極高，Bubble 更不應該

4. 中對 + 弱 Draw（邊際手牌）
   對手有 Pot Bet，你沒有清晰的「Nut plan」
   這類手牌在 Cash Game 可以接受，Bubble 必須 fold
```

---

## 具體 ICM EV 計算範例

### 範例一：Bubble 的 ICM 計算

```
錦標賽結構：
  買入：$100
  參加者：100 人
  獎金結構（前 10 名）：
    1st：$3,000（30%）
    2nd：$1,500（15%）
    3rd：$900（9%）
    4th-5th：$600（6%）
    6th-10th：$300（3%）

當前狀況：
  剩餘玩家：11 人（Bubble，11th 名出局不獲獎）
  籌碼分布：
    你（Hero）：15,000（短疊）
    大疊對手：45,000
    其他 9 人：平均 10,000

你的當前 ICM EV（使用 ICM 計算器估算）：約 $285

情境：大疊對你翻牌前 Pot-raise（pot = 2,400），你有 QQ♠JJ♥（適中手牌）

選項 A：All-in（15,000 vs 45,000）

  如果你贏（假設 45% 勝率）：
    你的籌碼 → 30,000
    新 ICM EV → 約 $520

  如果你輸（55% 機率）：
    你出局（11th 名），ICM EV = $0

  ICM EV 計算：
    0.45 × $520 + 0.55 × $0 = $234
    原本 ICM EV：$285
    Call 的 ICM EV：$234 < $285（虧損！）

  結論：即使有籌碼，在 PLO Bubble 對有 flip 手牌應該 fold。

選項 B：Fold

  你的 ICM EV 保持約 $285
  比 Call 多保留 $51 的 ICM EV

最優決策：FOLD（即使犧牲一些 Chip EV）
```

### 範例二：決賽桌的 ICM 壓力

```
決賽桌（6 人剩餘）籌碼：
  玩家 1（你）：50,000
  玩家 2：80,000
  玩家 3：40,000
  玩家 4：30,000
  玩家 5：25,000
  玩家 6：15,000
  總籌碼：240,000

獎金結構：
  1st：$5,000
  2nd：$3,000
  3rd：$2,000
  4th：$1,200
  5th：$800
  6th：$500

你的 ICM EV：約 $1,980（使用 ICM 計算器）

情境：玩家 6（短疊 15,000）all-in，你在 BB 位置，手牌 K♠Q♥T♠9♦

  如果你 call 且贏（約 60% 勝率）：
    你籌碼 → 65,000
    ICM EV → 約 $2,320

  如果你 call 且輸（40% 機率）：
    你籌碼 → 35,000
    ICM EV → 約 $1,540

  Call 的 ICM EV：
    0.60 × $2,320 + 0.40 × $1,540 = $1,392 + $616 = $2,008

  原本 ICM EV：$1,980

  差距：+$28（非常接近，幾乎中性）

  注意：如果短疊輸掉（不是你贏），所有人的 ICM EV 都會增加！
  不 call 讓其他玩家淘汰短疊，間接提升你的 ICM EV。
  這種間接效果使 call 變成 ICM -EV。

最優決策：通常應該 FOLD，讓短疊在其他位置被淘汰。
```

---

## 短疊 PLO MTT 的籌碼管理

### 短疊的核心挑戰

短疊玩家（< 25bb）面對的問題：

1. **翻牌後能力喪失**：PLO 的精髓在翻牌後，短疊無法發揮
2. **Push/Fold 模式**：複雜的 PLO 決策被壓縮成簡單的 push 或 fold
3. **選時機**：必須在籌碼消失前找到翻倍機會

### 短疊的最優策略

```
短疊 PLO MTT 籌碼管理原則：

原則 1：不要讓籌碼縮到無法 push
  你有 20bb → 等待好機會 push
  你有 12bb → 更積極找機會
  你有 6bb  → 下一手好牌就必須 push，別等

原則 2：PLO 短疊 Push 優先考慮的手牌
  Tier 1（任何位置 push）：
    - AA 任何搭配（即使無 backup）
    - KK double-suited 帶連牌（如 KKQJ ds）
    - 強 double-suited rundown（JT98 ds, QJ09 ds）

  Tier 2（CO/BTN/SB/BB 可以 push）：
    - QQ 帶連牌同花
    - 中等 double-suited rundown（T987 ds, 9876 ds）
    - AA 帶低牌（AA72 仍比大部分牌強）

  Tier 3（只在 BTN/SB 特定情況 push）：
    - KK rainbow 帶 broadway
    - Single-suited 強 rundown

原則 3：PLO 的 Push 理由和 NLH 不同
  NLH：AA 翻牌前 all-in 有 80% 勝率，「價值 push」
  PLO：AA ds 翻牌前 all-in 只有 65% 勝率，但有 fold equity 和 position

  PLO 短疊 push 更依賴 fold equity：
  如果大家都 fold，你贏走盲注 = 增加 1.5bb（重要！）
  如果有人 call，你有 60-65% 的 Equity

原則 4：避免「被動縮小」
  不要因為等待「完美手牌」而讓籌碼縮到 5bb 以下
  5bb 的 push 幾乎沒有 fold equity，純 flip
```

### 短疊 ICM 特殊計算

```
情境：你有 12bb，Bubble（剩 13 人，付 10 名）

你的選擇：
  選項 A：等更好的牌，這手 fold（QJ87 single-suited）
  選項 B：Push（12bb all-in）

  選項 A 的代價：
    下一手盲注消耗，你 → 約 10bb
    你的 ICM EV 會因籌碼減少而降低

  ICM 計算表明：在 Bubble 附近，10bb 的玩家 ICM EV 明顯低於 12bb
  因為生存機率下降

  結論：在 PLO MTT Bubble，QJ87 single-suited 從 BTN 位置 push 12bb
  在 Chip EV 和 ICM EV 都可能是正確的，因為 fold equity 很高，
  被 call 時也有 40-45% 的 Equity。
```

---

## PLO MTT 的籌碼管理哲學

### 「足夠」比「最多」更重要

一個常見的 MTT 錯誤是過度追求籌碼量。

```
Cash Game 思維（錯誤套用到 MTT）：
  我要最大化每個有 Chip EV 優勢的機會
  → 在 Bubble 附近打了 flip，出局

MTT 正確思維：
  我需要「足夠的籌碼」在關鍵時刻出手
  → 保持中疊，等待真正的優勢情況
```

**具體原則：**

1. **深疊期**：可以追求 Chip EV，建立籌碼優勢
2. **中疊期**：平衡 Chip EV 和 ICM EV
3. **Bubble 短疊**：ICM EV 優先，只在真正有優勢時 all-in
4. **Final Table**：每個 ICM 跳點都很重要，非常謹慎

### ICM 實用心態

```
問自己三個問題：

1. 如果我輸了這手，我是否出局或變成超短疊？
   → 如果是，ICM 代價很高

2. 這手牌在 PLO 中真的有「明顯優勢」嗎？
   → PLO 中 60% 勝率已經是「很好」，不是 NLH 的 80%

3. 等待其他位置出局對我有好處嗎？
   → 如果有短疊在其他位置，讓他們先被淘汰！
```

---

## ICM 調整因子總結

| 情況 | ICM 調整方向 | 說明 |
|------|------------|------|
| 你是短疊，Bubble 附近 | 偏向 fold | 每次 all-in 都有出局風險 |
| 你是大疊，Bubble 附近 | 可以積極 | 輸了不出局，可以繼續施壓 |
| 有更短的疊在其他位置 | 極度保守 | 讓他們先出局，你的 ICM 自動提升 |
| 決賽桌，獎金跳幅大 | 非常保守 | 每次出局損失大量獎金 |
| 翻牌前 AA PLO | 謹慎打，但通常打 | AA 的 65% 優勢仍值得在大多數情況 all-in |
| 翻牌後 flip 情況 | 通常 fold | PLO flip 的 ICM 代價太高 |

---

## 工具推薦：ICM 計算

**線上 ICM 計算器：**
- **ICMIZER**（icmizer.com）：最主流的 MTT ICM 計算工具，支援 PLO
- **HoldemResources Calculator**（hrccalculator.com）：免費，可自訂獎金結構
- **PokerStove / Equilab**：Equity 計算，配合 ICM 手動計算

**使用建議：**
1. 將常見 Bubble 情況輸入計算器，建立 ICM 直覺
2. 練習估算自己和對手的籌碼 ICM 價值
3. 每場 MTT 結束後回顧關鍵 ICM 決策

---

## 本章重點回顧

1. **ICM 基礎**：籌碼邊際價值遞減，生存的價值高於積累。
2. **Chip EV vs ICM EV**：早期用 Chip EV，泡沫/決賽桌用 ICM EV。
3. **PLO 的 ICM 代價更高**：PLO 的 all-in 幾乎都是 flip，Bubble 要更謹慎。
4. **Bubble 策略**：只在有明顯優勢（60%+）或被迫情況下 all-in。
5. **短疊管理**：不要等待完美手牌而讓籌碼縮到 5bb，PLO 的 push equity 仍然重要。
6. **ICM 計算工具**：使用 ICMIZER 等工具建立 ICM 直覺，然後在桌上快速估算。

---

*延伸閱讀：`03-各階段策略調整.md`，`04-Bubble與決賽桌.md`*
