# 底池限注奧馬哈 02：PLO 策略核心

> **學習目標**：理解 PLO 的核心策略思想，掌握為何 PLO 需要更頻繁的 Pot bet，深入理解 Equity 概念，學會判斷什麼時候可以慢打。

---

## 一、PLO 的核心哲學：永遠在 Draw，永遠在被 Draw

### 1.1 奧馬哈的 Draw 密度

在德州撲克中，一個翻牌後典型的場景：
```
德州撲克翻牌後（3 players）：
  玩家 A：有 Made Hand（頂對）
  玩家 B：有 Draw（同花聽牌）
  玩家 C：有 Backdoor Draw（後門聽牌）
  → 相對清晰的強弱分工
```

在 PLO 中，翻牌後的典型場景：
```
PLO 翻牌後（3 players）：
  玩家 A：有 Made Hand（Set）+ Flush Draw
  玩家 B：有 Nut Draw（20-out Wrap）+ Backdoor Flush
  玩家 C：有 Strong Draw（13-out Wrap）+ Made 兩對

  所有人都有強勁的「繼續」理由！
  所有人都同時在攻擊和被攻擊！
```

**這就是 PLO 的核心特性**：在大多數翻牌後，每個玩家同時是「Made Hand 的保護者」和「Draw 的追逐者」。

### 1.2 Draw vs Made Hand 的 Equity 差距

```
德州撲克典型：
  Set（Made Hand）vs 9-out Flush Draw：
  → Set：65%，Flush Draw：35%
  → 差距：30%（明顯領先）

PLO 典型：
  Set vs 20-out Wrap Draw：
  → Set：60%，Wrap Draw：40%
  → 差距：20%（仍然領先，但差距小）

PLO 極端情況：
  Set + 小 flush draw（Made + 輔助 Draw）vs 20-out Wrap + Nut Flush Draw：
  → 可能接近 50/50！
  → 甚至 Wrap Draw 方可能是 equity 領先方
```

**結論**：在 PLO 中，「Strong Draw」的價值比德州撲克的 draw 高得多，有時候甚至超越 Made Hand 的 equity。

---

## 二、PLO 需要更頻繁 Pot Bet 的原因

### 2.1 Draw 的底池賠率計算

在 PLO 中，最大下注 = Pot，對手的底池賠率 = **2:1（他們 Call 1，贏 2）**。

```
計算：
  底池 = P，你 Pot Bet = P
  對手 Call P，面對的底池 = P（原底池）+ P（你的 bet）+ P（他的 call）= 3P

  對手的底池賠率 = 3P : P = 3:1（「投入 1 贏 3」= 需要 25% equity 才合算）
  等等，標準計算：
  對手投入 P，底池變成 3P，所以他賺 2P（如果贏），
  底池賠率 = P : 2P = 1:2（「投入 1 贏 2」= 需要 33% equity 才合算）

  正確底池賠率計算：
  對手 Call P → 他投入 P
  底池 after call = P（原）+ P（你bet）+ P（他call）= 3P
  如果對手贏，他得到整個 3P（包含他自己的 P）
  他的 net win = 3P - P = 2P
  他投入：P
  他的賠率 = P : 2P = 1:2（投入 1 贏 2）
  所需最低 equity = P / 3P = 33%

  結論：在 PLO 中，面對 Pot Bet，對手需要 33% equity 才合算跟注。
```

**問題**：在 PLO 中，幾乎所有 13+ outs 的 Draw 都有超過 33% 的 equity！

```
13-out Wrap Draw（Turn + River）：約 49% equity → 遠超 33%，必跟
9-out Flush Draw（Turn + River）：約 35% equity → 略超 33%，應跟
8-out OESD（Turn + River）：約 31% equity → 略低 33%，接近 break-even
```

**結論**：即使你 Pot Bet，對手有 13+ outs 時他們**理應跟注**（正確的數學決定）。這就是 PLO 的現實：你無法用 Pot Bet 完全驅逐有強 draw 的對手。

### 2.2 為什麼還要 Pot Bet？

即使對手有正確的理由跟注，你的 Pot Bet 仍然比 Small Bet 更好：

```
場景：底池 100bb，你有 Set（60% equity），對手有 20-out Wrap（40% equity）

選項 A：你 Bet 小（50bb）
  對手面對的底池賠率：50 : (100+50) = 1:3（需要 25% equity）→ 對手絕對跟注
  底池 after call = 200bb
  你的 EV = 200 × 60% - 50 = 120 - 50 = +70bb

選項 B：你 Pot Bet（100bb）
  對手面對的底池賠率：1:2（需要 33% equity）→ 對手仍然跟注（40% > 33%）
  底池 after call = 300bb
  你的 EV = 300 × 60% - 100 = 180 - 100 = +80bb

結論：Pot Bet 的 EV（+80bb）> Small Bet 的 EV（+70bb）

更重要：在多人底池，Pot Bet 讓每個有 draw 的對手都面臨更差的賠率
→ 有些邊緣 draw（8-out OESD 等）在 Pot Bet 下會 fold
→ 讓弱 draw fold = 增加你的 EV
```

### 2.3 對 Draw 的最大壓力：Stack off 策略

```
PLO 的最終目的：在你有 equity 優勢時，盡量把全部籌碼推進底池

如果你有 60% equity，最大化 EV 的方法：
→ 盡快 Stack off（全押）把所有籌碼投入底池
→ 每一個 bb 你都有 60% 的機率贏回（期望值 60%，投入 1bb 期望 0.6bb 的回報）
→ 注意：這有方差（你 40% 的機率輸），但長期 EV 為正

PLO 的 Stack off 路徑：
  翻牌：Pot Bet（100bb → 底池變 300bb）
  轉牌：Pot Bet（300bb → 底池變 900bb）
  → 但有效籌碼通常 < 900bb，所以通常 2 輪就 Stack off

在 100bb 有效籌碼的 PLO：
  底池 30bb（翻前），你 Pot Bet 30bb（底池 90bb），
  對手 Call（底池 90bb），
  轉牌 Pot Bet 90bb（底池 270bb），
  但有效籌碼只有 100-30 = 70bb（剩餘），
  → 轉牌 All-in = 70bb（短於底池）
  → Stack off 完成！
```

---

## 三、Equity 的重要性（詳解）

### 3.1 中等牌 vs 強牌的 Equity 差距

在德州撲克和 PLO 中，Equity 的分配模式不同：

```
德州撲克（NLH）翻牌後的 Equity 分布（典型）：
  Top Set：75% vs 中等手牌（兩對等）：25%
  差距：50%（很大）

PLO 翻牌後的 Equity 分布（典型）：
  Top Set：60% vs 20-out Wrap Draw：40%
  差距：20%（較小）

  Set + 同花 Draw（Made + Draw）：65% vs 強 Wrap + Backdoor Flush：35%
  差距：30%
```

**為什麼 PLO 的 Equity 差距小？**

1. **Draw 在奧馬哈更強**：20-out Wrap 有 70% 命中率（T+R），而德州撲克 9-out Flush 只有 35%
2. **每個人有 6 個組合**：更容易同時有 Made Hand + Draw（即使 Made Hand 較弱，加上 Draw 的總 Equity 可能很高）
3. **不確定性更高**：在 PLO，你更難確定對手是 Draw 還是 Made Hand，使決策更複雜

### 3.2 Equity Realization（Equity 實現率）

**Equity Realization** 是你實際獲得的 Equity 比例，受到以下因素影響：

```
位置（Position）：
  後位（IP）的 Equity Realization > 前位（OOP）
  原因：後位有資訊優勢，能做出更好的決策

  量化：相同手牌，IP 的 Equity Realization ≈ 110-120%
              OOP 的 Equity Realization ≈ 80-90%

技術水平：
  好的玩家能更完整地實現 Equity
  弱的玩家常常在有 Equity 時放棄（錯誤 fold）

手牌的 Draw 性質：
  「有多種實現路線的手牌」> 「只有一種路線的手牌」
  AKQJ ds（4 條路線）> AA72 rainbow（1-2 條路線）
  前者的 Equity Realization 更高
```

### 3.3 Equity vs EV（期望值）

```
重要區分：
  Equity = 你贏得底池的概率 × 底池大小
  EV（Expected Value）= 你的長期期望盈利

  Equity 高 ≠ EV 一定正

  例子：
    你有 Set（60% equity），對手有 Wrap（40% equity）
    底池 100bb，對手 Pot Bet 100bb，你要決定 Call 還是 Fold

    你的 Equity = 60%
    你 Call 後的 EV：
      底池 after call = 300bb
      你的份額 = 300 × 60% = 180bb
      你投入 = 100bb（call）
      你的 Net EV = 180 - 100 = +80bb（正 EV！你應該 Call）

    現在如果你的 equity 是 45%（稍微劣勢）：
      你的份額 = 300 × 45% = 135bb
      你的 Net EV = 135 - 100 = +35bb（仍然正 EV）

    只有當你的 equity < 33% 時，Call 才是負 EV：
      你的份額 = 300 × 33% = 99bb < 100bb（投入）= 輕微負 EV
```

### 3.4 「Drawing Dead」的概念

```
Drawing Dead（死路一條）：
  你的 draw 即使命中，你的牌型仍然輸給對手

例子：
  公牌：A♠ K♠ Q♠（Monotone 翻牌）
  對手：A♥ K♦（成了頂部兩對，但更重要的是他有 flush draw 嗎？）
  你：J♠ T♠（你已成了 J-high flush = 5 張黑桃！）
  但等等：對手沒有黑桃，你的 J-high flush 可能沒有問題

  真正的 Drawing Dead 例子：
  公牌：A♥ K♥ 5♣（Rainbow + K♥ A♥）
  你：Q♥ J♥（紅心 Nut flush draw）
  對手：A♣ A♦（AA，在手牌中有 2 張 A）

  如果 Turn 來 Q♣（你沒有 flush，做出 QQ 兩對）：
    你的牌型：A♥-Q♥-Q♣... 等等，用 QJ 手牌配 AK5（公牌）：
    Q♥J♥ + AK5 = Q-J-A-K-5 = 一對？沒有，無對
    最好的牌型：A-K-Q-J-5（高牌）

  如果 Turn 來紅心（你成 flush）：
    你的 Q♥J♥ flush = Q-J-A♥-K♥ + 一張紅心公牌
    對手 AA + A♥（等等，AA 只有 2 張 A，不超過 2 張）
    → 如果 Turn 來 2♥，River 來 3♥（公牌 5 張中有 4 張紅心）：
    你用 Q♥J♥ + A♥K♥ + 1 張紅心 = 5 張紅心 flush ✓
    對手用 A♣A♦ + A♥K♥X？等等，他沒有紅心手牌
    → 你的 Q-J Flush（Q-high）= 對手沒有更強的 flush → 你贏！

  重要：「Drawing Dead」的實際案例：
    公牌：T♠ 9♠ 8♠（三張黑桃，Monotone）
    你：7♠ 6♠（你已成 T-high flush！7-6+T-9-8 = 選最強 5 張黑桃）
        用 7♠6♠ + T♠9♠8♠ = 已成 9-8-7-6-T = T-high flush（T-9-8-7-6）
    對手：A♠ K♠（已成 A-high flush！A-K-T-9-8）

    你的 T-high flush 永遠輸給對手的 A-high flush
    → 即使 Turn/River 來任何牌，你的 flush 仍然輸
    → 你 「Drawing Dead」！

    這就是為什麼 Non-Nut flush 在 Monotone 翻牌極度危險
```

---

## 四、什麼時候可以慢打（Trap）

### 4.1 PLO 中慢打的基本原則

在奧馬哈中，慢打比德州撲克更危險，但在特定情況下仍然合適。

```
慢打的前提條件（必須全部滿足）：
1. 你有 Nut（最強牌型）或 Near-Nut
2. 翻牌相對乾燥（沒有大量 Draw）
3. 你有位置（IP），對手在你前面行動
4. 對手有在你後面 Bet 的理由（你相信他們會 Bet）
```

### 4.2 適合慢打的情況

**情況 1：乾燥翻牌，你有 Nut Straight 或 Nut Flush**

```
翻牌：A♣ 2♥ 7♦（Rainbow，乾燥）
你的手牌：A♠ A♥ K♦ J♣（你有三條 A）

這個翻牌你的 Set of A 是極強的：
  → Rainbow：無 Flush Draw
  → 不連接：無 Straight Draw
  → 你的三條 A 幾乎無法被超越（下一張公牌才有機會）

慢打理由：
  → 如果你 Pot Bet，對手有頂對或兩對可能折疊
  → 如果你 Check，對手可能 Bet 一個中等金額，你再 Raise
  → 乾燥翻牌上，Check-Raise 比直接 Pot Bet 能建更大底池

慢打風險：
  ⚠️ 如果 Turn 來一張連牌或同花，翻牌的乾燥性消失
  ⚠️ 如果對手 Check（你 Check，他們也 Check），你沒有建底池
```

**情況 2：IP 位置，你有 Set，對手常常 c-bet**

```
翻牌：K♥ 7♠ 2♦（Rainbow）
你在 BTN（IP），對手在 CO（OOP）
你的手牌有 K♦K♣（Set of K）

CO 常常會在翻牌後對 BTN c-bet（因為是 Aggressor）

慢打策略：
  CO Bet → 你 Raise（不是慢打，而是 Fast Play）

OR：

  CO Check（少數情況）→ 你 Bet（不讓他們免費看牌）
  → 在這個情況，無論如何你都應該 Bet（因為 CO Check 讓你必須自己建底池）

慢打只在：
  → 你確信 CO 會 Bet 任何翻牌（Aggressive 玩家）
  → 乾燥翻牌上你 Check，讓 CO Bet，然後你 Raise

注意：在奧馬哈，IP 的慢打比 OOP 的慢打安全，因為你可以看到 CO 的行動後再決定
```

**情況 3：Monotone 翻牌，你有 Nut Flush**

```
翻牌：K♠ Q♠ J♠（三張黑桃）
你的手牌：A♠ T♠（你有百老匯 + Nut Flush！）
等等，A♠T♠ 在奧馬哈是 2 張手牌，配 K♠Q♠J♠（公牌）= A♠K♠Q♠J♠T♠ = 百老匯同花順！
→ 這是奧馬哈中最強的牌型！

慢打是完全合理的：
  → 你已有最強可能的牌型（百老匯同花順）
  → 沒有任何牌能打敗你
  → 目標：讓對手建底池，你最後贏取最多

策略：
  Check（讓對手 Bet 或建底池）→ 然後 Raise
  或 Small Bet（讓弱牌有 Call 的理由）→ 對手 Raise → 你再 Re-raise
```

### 4.3 不適合慢打的情況

```
❌ 不應該慢打的情況：

1. 濕潤翻牌（任何有 Draw 的翻牌）
   → Draw 免費看牌 = 他們有高機率命中 = 你的強牌被超越

2. OOP 位置
   → OOP 慢打風險更高（你先行動，Check 讓對手有主動權）
   → 對手可能直接 Check，你失去保護機會

3. 你的強牌可以被 Draw 超越
   → 例如 Set（60%）vs 20-out Wrap（40%）
   → 即使你領先，讓 Draw 免費看牌是浪費你的優勢

4. 多人底池
   → 多人底池中，更多的 Draw 可能存在
   → 讓多人免費看牌的代價更高

典型的「慢打代價」：
  你有 Set of 8，翻牌 8♥ 7♠ 6♣（濕潤，有連牌）
  你 Check（想慢打）
  對手 Check（沒有 Bet 的意願）
  Turn：5♦（Now 9-8-7-6-5 的 9-high straight 成了！有 J-T-9 或 T-9-5 的人都可能成順）
  → 你的 Set 面對可能的 Straight，優勢大幅降低
  → 慢打的代價：免費給了對手的 Draw 一張牌
```

---

## 五、PLO vs NLH 的策略差異總結

### 5.1 關鍵策略差異

| 策略點 | NLH | PLO |
|-------|-----|-----|
| 翻牌後下注大小 | 可以 overbet（超額） | 最大 Pot Bet |
| Bluff 頻率 | 相對較高 | 較低 |
| Slow Play 安全性 | 相對較高 | 相對較低 |
| Draw 的價值 | 相對較低 | 相對較高 |
| Made Hand 的安全性 | 相對較高 | 相對較低 |
| Stack Off 條件 | Set+ 通常 Stack off | 需要評估 equity |
| Fold equity（Bluff 成功率）| 較高 | 較低 |

### 5.2 PLO 的 10 個核心策略原則

```
1. 永遠追求 Nut（Nut draw 或 Nut made hand）
2. 濕潤翻牌 = Pot Bet 保護強牌
3. 非 Nut draw 在多人底池非常危險
4. 位置是奧馬哈最重要的因素之一
5. 翻牌前的選牌質量決定翻牌後的選擇空間
6. Double-Suited Rundown > Single-Suited >> Rainbow（其他條件相同）
7. 慢打的場合比 NLH 少，要有充分理由
8. Set 在奧馬哈需要保護，不像 NLH 那麼「安全」
9. Bluff 只在有 Semi-Bluff（Nut Draw）支持時有效
10. 多人底池 = 更需要 Nut，非 Nut 的價值大幅下降
```

---

## 六、PLO 的 Stack off 決策

### 6.1 什麼情況下應該 Stack off？

```
可以 Stack off 的情況（任一條件滿足）：

條件 A：你有 Nut 或 Near-Nut Made Hand（如 Nut Flush, Nut Straight, Top Set）
  + 翻牌非極度危險（無 Monotone 讓你的牌貶值）

條件 B：你有 Nut Draw + Made Hand 的組合（如 Nut Flush Draw + Two Pair）
  + 你的 Equity 估計 > 45%

條件 C：你有 Nut Draw + Nut Draw 的組合（如 Nut Flush Draw + Nut Wrap）
  + 你的 Equity 估計 > 40%（equity 高的 draw 值得 Stack off）
```

### 6.2 Stack off 的 Equity 門檻

```
實用標準：

在 Cash Game（現金桌）：
  需要 > 50% equity 才考慮 Stack off（正期望值）
  但 40%+ 的 Draw 有時也值得（因為 Draw 命中後還有後續街）

在 MTT（多桌錦標賽）：
  ICM 考量使 Stack off 更保守
  通常需要 55%+ equity 才在 ICM 壓力下 Stack off
  在 Final Table / Bubble：門檻更高（可能需要 60%+）

例外：當你是短疊，沒有選擇，只能 All-in 或 Fold
  → 短疊的 Stack off 門檻相對低（因為你無法「等待更好的機會」）
```

---

## 七、章節總結

| 核心概念 | 要點 |
|---------|------|
| PLO 的核心哲學 | 永遠在 Draw，永遠在被 Draw；Draw 的 equity 比 NLH 高得多 |
| Pot Bet 頻率 | PLO 比 NLH 更頻繁 Pot Bet（讓 Draw 付費，保護 Made Hand）|
| Equity 差距 | PLO 的 Made Hand vs Strong Draw 只差 20%（NLH 差 30%）|
| 慢打條件 | 乾燥翻牌 + Nut + IP + 對手會 Bet 時才考慮慢打 |
| Stack off 條件 | Made Nut + 非危險翻牌，或 Nut Draw + 高 Equity |
| vs NLH | PLO 比 NLH 更積極，更少慢打，Bluff 更少，Draw 價值更高 |

---

**下一章**：[03-SPR 與深疊打法](./03-SPR與深疊打法.md) — 學習 PLO 的 SPR 概念和深疊策略。

---

*章節：04-底池限注奧馬哈（PLO）/ 02-PLO 策略核心*
*難度：⭐⭐⭐（進階）*
