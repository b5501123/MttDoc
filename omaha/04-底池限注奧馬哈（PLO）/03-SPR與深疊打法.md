# 底池限注奧馬哈 03：SPR 與深疊打法

> **學習目標**：掌握 PLO 的 SPR（Stack-to-Pot Ratio）概念，理解不同 SPR 下的策略差異，學會深疊和短疊的不同打法，以及判斷何時應該 Commit（承諾全押）。

---

## 一、什麼是 SPR？

### 1.1 SPR 的定義

**SPR（Stack-to-Pot Ratio，籌碼底池比）**：

```
SPR = 有效籌碼（Effective Stack）/ 底池大小

有效籌碼：兩個玩家中籌碼較少者的剩餘籌碼
（在多人底池，通常指你的剩餘籌碼，或場上第二多籌碼的玩家）

例子：
  你的籌碼：100bb，對手的籌碼：80bb
  底池：20bb
  有效籌碼 = min(100, 80) = 80bb
  SPR = 80 / 20 = 4
```

### 1.2 為什麼 SPR 很重要？

SPR 決定了「翻牌後的決策複雜性」和「Stack off 的容易程度」：

```
SPR = 1（低 SPR）：
  底池 = 剩餘籌碼
  → 翻牌後幾乎就是 Stack off
  → 決策簡單：這手牌值得翻牌前 All-in 嗎？

SPR = 4（中等 SPR）：
  底池的 4 倍 = 剩餘籌碼
  → 翻牌一個 Pot Bet，轉牌再一個 Pot Bet，接近 Stack off
  → 2 輪 Pot Bet 就能 Stack off

SPR = 10（高 SPR）：
  底池的 10 倍 = 剩餘籌碼
  → 需要多輪下注才能 Stack off
  → 有更多街道可以調整策略

SPR > 15（深疊）：
  → 翻牌後策略最複雜
  → 更多機會追 Draw
  → Made Hand 需要更積極保護
```

---

## 二、PLO 的 SPR 計算例子

### 2.1 翻牌前後的 SPR 計算

**標準 9-max MTT 例子**：

```
籌碼：100bb
翻牌前：CO 開牌 3bb，BTN 跟注，BB 跟注，SB 棄牌

翻牌後底池 = CO(3) + BTN(3) + BB(3) + SB(0.5 棄牌) ≈ 9.5bb（近似 10bb）

有效籌碼（翻牌後）：
  CO、BTN、BB 各已投入 3bb，剩餘約 97bb
  有效籌碼 = 97bb（假設三人深度相似）

SPR = 97 / 10 = 約 9.7（中高 SPR）
```

**翻牌前有 3-bet 的例子**：

```
籌碼：100bb
BTN 3-bet to 10bb，CO 跟注，BB 棄牌

底池 = BTN(10) + CO(10) + SB/BB 殘留 ≈ 21.5bb（約 22bb）
有效籌碼 = 100 - 10 = 90bb

SPR = 90 / 22 ≈ 4（中低 SPR）
```

**翻牌前有 4-bet 的例子**：

```
籌碼：100bb
CO 開 3bb，BTN 3-bet to 10.5bb，CO 4-bet to 35bb，BTN 跟注

底池 = CO(35) + BTN(35) + 殘留 ≈ 71bb
有效籌碼 = 100 - 35 = 65bb

SPR = 65 / 71 ≈ 0.9（低 SPR！）
→ 翻牌後幾乎直接 Stack off
```

---

## 三、不同 SPR 下的翻牌後策略

### 3.1 低 SPR（SPR < 2）

```
SPR < 2 意味著翻牌後幾乎就是 All-in 或 Fold

策略：
  → 極度簡化：評估你的翻牌後 equity，決定是否 All-in
  → Committed 門檻：只要你有 30%+ equity，通常應該 All-in（正 EV）
  → 不需要複雜的 Draw 計算（即使你 Draw，1-2 張公牌就結束了）

適合 Low SPR 的手牌：
  → AA（配任何牌）：幾乎永遠 Stack off
  → Set（高 SPR 更有價值，但 Low SPR 也可以）
  → Strong Made Hand：Stack off

Low SPR 下 Fold 的情況：
  → 你完全沒有命中翻牌（純空氣）
  → 你的 equity < 25%（確定的劣勢）
  → 例外：翻牌前 4-bet 場景，SPR 很低，你應該在翻牌前就決定好（不要 4-bet 後翻牌 fold）
```

**MTT 中的 Low SPR 常見場景**：

```
MTT 後期（剩餘籌碼 < 30bb）：
  所有入池行動幾乎都是 Low SPR 場景
  → 翻牌前就要考慮：「如果我進入這個底池，翻牌後我願意全押嗎？」
  → 如果不願意，翻牌前就棄牌

例子：
  你有 15bb，AA 在手
  → 直接 All-in 翻牌前（短疊奧馬哈策略）
  → 不需要等翻牌

  你有 15bb，KQJT ds
  → 視情況，可以 push-or-fold

  你有 15bb，QJT9 rainbow
  → 通常 push-or-fold（如果 BTN 加注，你全押），或棄牌
```

### 3.2 中等 SPR（SPR 3-8）

```
中等 SPR 是 PLO 中最常見的場景（100bb 深度，翻牌前有標準開牌/跟注）

策略特點：
  → 翻牌後通常 2-3 輪下注可以 Stack off
  → 有足夠的「街道」（翻牌、轉牌、河牌）調整策略
  → Made Hand + Draw 的組合最有價值（可以在多條路線 Stack off）

中等 SPR 的 Commit 門檻（應該 Stack off 的 equity 門檻）：
  → 通常 > 40% equity 就考慮 Stack off
  → 有 Nut draw 或 Near-Nut Made Hand 就積極 Stack off
  → Non-Nut 手牌要謹慎（即使 equity > 40%，Non-Nut 有被打敗的風險）

案例：
  SPR = 5，底池 30bb，你有 Set of Q（約 60% equity）
  → 翻牌 Pot Bet（30bb）→ 底池 90bb（SPR 降至 2）
  → 轉牌 Pot Bet（90bb）→ 基本 Stack off
  → 2 輪下注完成
```

### 3.3 高 SPR（SPR > 8）

```
高 SPR 是深疊場景的特徵（200bb+ 或翻牌前很少下注的底池）

策略特點：
  → 更多街道可以追 Draw（每一個 Draw 的潛在收益更高）
  → Made Hand 的保護難度更高（更多公牌 = 更多翻盤機會給 Draw）
  → 策略複雜性最高（需要在多輪下注中保持一致的故事線）

高 SPR 的 Draw 追逐：
  Deep stack（深疊）讓 Draw 的「隱含賠率（Implied Odds）」增加

  隱含賠率：
  不只看「現在的底池賠率」，還看「如果 Draw 命中，能從對手身上贏多少」

  例子：
    底池 20bb，有效籌碼 200bb（SPR = 10）
    對手 Pot Bet 20bb（底池變 40bb）
    現在的底池賠率：你 Call 20bb 面對 40bb 底池 = 1:2（需要 33% equity）

    你的 Draw 只有 9 outs（Nut flush，35% equity）= 稍稍滿足賠率
    但隱含賠率：如果你命中 Nut flush，你可能從對手身上贏 100bb+（因為深疊）
    → 隱含賠率大幅提升你的「實際 EV」
    → 結論：深疊時，即使目前底池賠率勉強合算，Draw 的實際 EV 更高（因為隱含賠率）
```

---

## 四、深疊（100bb+）的 PLO 打法

### 4.1 深疊的優勢與風險

**深疊的優勢**：

```
1. 更高的隱含賠率（命中後能贏更多）
2. 更多街道可以「逃跑」（如果 Turn 來壞牌，你還有 River 的選擇）
3. Bluff 在深疊中更有效（代表更多底池）
4. Position 的優勢被放大（更多決策機會）
```

**深疊的風險**：

```
1. 虧損更大（如果你的 Equity 被打敗，你輸更多 bb）
2. Non-Nut 手牌在深疊面對的壓力更大
3. 深疊需要更高的技術水平（多輪決策）
4. 方差更高（深疊的波動比短疊更劇烈）
```

### 4.2 深疊下的 Draw 追逐策略

```
深疊（200bb+）下的 Draw 計算調整：

標準計算：底池賠率 > 需要的 equity → 跟注
深疊調整：底池賠率 + 隱含賠率 > 需要的 equity → 跟注

隱含賠率的估算：
  「如果我命中 Draw，我預期能贏對手多少額外的籌碼？」

  例子：
    底池 20bb，對手 200bb（深疊），你 150bb
    對手 Bet 20bb（Pot Bet）
    你的有效籌碼 after call = 150 - 20 = 130bb

    如果你命中 Nut Draw（Turn），你能 Pot Bet 嗎？
    → 如果底池 after call = 60bb，你的 Pot Bet = 60bb
    → 對手是否會跟注？如果他有 Made Hand，他可能跟注 60bb
    → 再來一輪 River：底池 = 180bb，你還有 70bb，你可以 All-in
    → 對手是否跟注 70bb？如果他有 Set，可能跟注
    → 你的隱含贏得：60 + 70 = 130bb（額外）

    隱含賠率：20（付出）: 20（底池）+ 130（隱含）= 20 : 150 = 1:7.5（需要 12% equity）
    → 你只需要 12% equity 就合算！
    → 9-out flush draw 有 35% equity，遠超 12%
    → 即使底池賠率只有 1:2，加上隱含賠率，這個 Draw 是大幅 +EV

重要：隱含賠率只在以下情況成立：
  ✅ 你有 Nut Draw（命中後確定是最強牌）
  ✅ 對手有「難以棄牌的」強牌（如 Set，他們很難 fold）
  ✅ 深疊（有足夠的籌碼可以贏取）
  ❌ 非 Nut Draw（命中後可能被打敗，隱含賠率大減）
```

### 4.3 深疊的起始牌調整

```
深疊（200bb+）下的起始牌策略：

升值的手牌（深疊中比 100bb 更強）：
  ✅ Double-Suited Rundowns（Draw 類手牌）
     → 隱含賠率讓 Draw 更有價值
  ✅ 高連牌（AKQJ, KQJT）
     → 深疊讓 Wrap Draw 命中後的回報更高
  ✅ 中位連牌（JT98, T987）
     → 同上，命中後能贏更多籌碼

貶值的手牌（深疊中比 100bb 更弱）：
  ❌ AA 搭配差牌（如 AA72）
     → 深疊讓 AA 的「Overpair」策略更危險
     → 對手有更多機會在後期街道超越你
  ❌ 純 Made Hand（無 Draw 輔助）
     → 深疊下，對手的 Draw 有更多機會命中
     → 純 Made Hand 在深疊需要更積極保護（成本更高）
```

---

## 五、短疊（< 40bb）的 PLO 打法

### 5.1 短疊的基本原則

```
短疊 PLO 的核心：Push or Fold

當你有 < 20bb：
  → 幾乎所有翻牌前加注都是在說「我要全押」
  → 評估：「這手牌值得 All-in 嗎？」
  → 如果不值得，棄牌

當你有 20-40bb：
  → 有時可以翻牌前加注後看翻牌
  → 但翻牌後 SPR 非常低（幾乎 Stack off）
  → 需要有「翻牌後願意全押」的計劃

短疊 All-in（Shove）的手牌標準：
  ✅ AA（任何搭配）→ 幾乎永遠 Shove
  ✅ AA + 高連牌（AAKQ, AAJT 等）→ 非常強，Shove
  ✅ A 級 Double-Suited 連牌（AKQJ ds, KQJT ds）→ 強，Shove
  ✅ B+ 級手牌（KK ds, 高位 ds 連牌）→ 多數情況 Shove

  ❌ C 級以下 → 通常棄牌
  ❌ 非 Nut 類手牌（低位連牌等）→ 短疊不值得 Shove
```

### 5.2 短疊的 Call All-in 標準

```
面對別人的 All-in，什麼情況下 Call？

計算所需 equity：
  對手 All-in X bb，底池已有 Y bb
  你 Call X bb，底池 = Y + X + X = Y + 2X
  你需要的 equity = X / (Y + 2X)

  例子：
    底池 20bb（翻前），對手 All-in 30bb（他的全部）
    你 Call 30bb → 底池 = 20 + 30 + 30 = 80bb
    你需要的 equity = 30 / 80 = 37.5%

    你有什麼手牌需要 37.5% equity 才值得 Call？
    → AA → 約 65-70% equity（遠超，必 Call）
    → 高位 Double-Suited 連牌 → 約 50% equity（超過，Call）
    → 標準 B 級牌 → 約 45-50% equity（可以 Call）
    → C 級牌 → 約 40-45%（邊緣，需要考慮）
    → D 級牌 → 約 35-40%（接近或低於門檻，通常棄牌）
```

### 5.3 MTT 短疊的 ICM 考量

```
在 MTT 中，短疊的 All-in 不只是 equity 計算，還需要考慮 ICM：

ICM 的影響：
  → 在 MTT 中，「保住籌碼」有額外的 ICM 價值
  → 即使 equity 是 45%，ICM 可能讓 Fold 更優
  → 氣泡附近的 ICM 壓力最大

氣泡附近的 Short Stack 策略：
  更嚴格的 Shove 標準：
    ✅ AA → 永遠 Shove（ICM 不改變 AA 的壓倒性優勢）
    ✅ A 級手牌 → Shove
    △ B 級手牌 → 視具體底池和 ICM 狀況
    ❌ C 級以下 → 更傾向棄牌（ICM 壓力讓 EV+的 Shove 變成 ICM-的錯誤）

氣泡後進入 Money 的 Short Stack 策略：
  → 稍微放寬（因為 ICM 壓力降低）
  → 可以更積極 Shove 中等手牌
```

---

## 六、Commit 門檻（何時應該不再折疊）

### 6.1 Commit（承諾）的定義

```
在 PLO 中，「Commit 門檻」是指：
  一旦投入底池的籌碼超過某個比例，放棄（Fold）是數學錯誤的。

Commit 的計算：
  如果你已投入 X bb，面對再投入 Y bb 的決定：
  你「已投入」的成本是 Sunk Cost（不考慮在決策中）
  只看：投入 Y bb，你得到多少 equity 回報？

  如果 Y bb 的 EV > 0 → 繼續
  如果 Y bb 的 EV < 0 → 放棄（但若已 Commit，這個計算可能已過期）
```

### 6.2 常見 Commit 場景

```
場景 1：翻牌後 Pot Bet，面對 Pot Raise

  底池 30bb，你 Pot Bet 30bb（底池 90bb）
  對手 Pot Raise to 120bb（你需要 Call 90bb）

  你應該繼續嗎？

  計算：
    你已投入 30bb（開始的 Pot Bet）
    你需要 Call 90bb
    底池 if you call = 90（現有）+ 90（你的 call）= 180bb（等等，要加上對手的 120bb）

    更正確計算：
    底池前 = 30bb
    你 bet 30bb → 底池 = 60bb
    對手 Raise to 120bb → 底池 = 60（原）+ 90（加注部分）= 150bb（before your decision）
    等等，對手 Raise to 120bb 意味著他的總投入是 120bb，其中 30bb 是跟注你的 Bet，90bb 是額外加注
    底池 = 30（原）+ 30（你的 bet，算在底池）+ 30（對手跟）+ 90（對手加注）= 180bb（before your call）

    你 Call 90bb → 底池 = 180 + 90 = 270bb
    你需要的 equity = 90 / 270 = 33%

    如果你有 Set（約 60% equity）→ 必須 Call！（60% > 33%）
    如果你只有 Non-Nut Draw（約 35% equity）→ 僅僅滿足條件，可能 Call 也可能 Fold

場景 2：已投入 50% 以上籌碼

  籌碼 100bb，翻前 3-bet 到 35bb，翻牌 Pot Bet
  你已投入 35bb + 翻牌 Pot Bet = 35 + 35 = 70bb（70% 籌碼已入底池）
  剩餘 30bb

  如果底池已有 100bb，你還有 30bb，SPR = 0.3（極低 SPR）
  → 幾乎任何進行中的 Draw 或 Made Hand 都值得 All-in
  → 此時你已 Committed，Fold 通常是錯誤的

  例外：你的手牌在翻牌完全沒有任何 Equity（純空氣）→ Fold
```

### 6.3 避免被迫 Commit 到弱牌

```
最常見的 Commit 錯誤：用 B/C 級手牌翻前 3-bet 進入高 SPR 場景

錯誤流程：
  你有 B 級手牌（如 KQJT single-suited）
  你從 CO 3-bet to 10.5bb（翻前 3-bet）
  BTN Call，BB Call（底池 31.5bb）

  翻牌：A♠ Q♠ 7♦（濕潤翻牌，有 flush draw）

  你的手牌：KQJT ss
  翻牌命中：你有 K♣Q♦（選 2 張手牌）配 A♠Q♠7♦：有一對 Q，有 Nut 嗎？不是
  你有 K♣J♦（選 2 張手牌）配 A♠Q♠7♦：K-Q-J + A + 7 = A-K-Q-J（缺 T）= draw

  你已投入 10.5bb（約 30% 籌碼），底池 31.5bb
  → 你面對 Check 或 Bet 的決策

  問題：你的手牌在這個翻牌很弱（Non-Nut draw，無好 Made Hand）
  → 你的 3-bet 創造了一個你不想要的 Commit 場景
  → 如果你 Pot Bet（31.5bb），對手 Raise，你面對困難決策

  避免方法：
  → 不要用 B-/C 級手牌 3-bet（特別是 OOP 或不確定的翻牌場景）
  → 3-bet 要有「全押計劃」：確信你願意 Stack off 的手牌才 3-bet
```

---

## 七、SPR 策略速查表

| SPR 範圍 | 描述 | 翻牌後策略 | 適合的手牌類型 |
|---------|------|---------|------------|
| < 1 | 超短疊 | 幾乎任何有 equity 的手牌直接 All-in | AA, 強 Made Hand |
| 1-3 | 短疊 | 1-2 輪可 Stack off | AA, 強 Made Hand, Nut Draw |
| 3-6 | 中低 SPR | 2-3 輪 Stack off，有策略空間 | 大多數強手牌 |
| 6-10 | 中高 SPR | 需要翻牌後積極判斷 | Draw 手牌開始升值 |
| 10-20 | 深疊（中等） | Draw 追逐有隱含賠率 | Double-Suited Rundowns |
| > 20 | 深疊 | Draw 最有隱含賠率，策略最複雜 | 強 Draw 類手牌 |

---

## 八、章節總結

| 核心概念 | 要點 |
|---------|------|
| SPR 定義 | 有效籌碼 ÷ 底池大小，影響翻牌後策略深度 |
| 低 SPR（< 3）| Push or Fold 策略，任何有 equity 就 Stack off |
| 中等 SPR（3-8）| 標準 PLO 場景，2-3 輪 Stack off |
| 高 SPR（> 8）| Draw 的隱含賠率增加，深疊 Rundown 手牌升值 |
| 深疊打法 | Draw 類手牌（Rundown ds）在深疊中最有威力 |
| 短疊打法 | Push or Fold，AA 幾乎永遠 Shove |
| Commit 門檻 | 不要在弱牌上 3-bet 創造被迫 Commit 的場景 |

**核心 SPR 原則**：
> SPR 決定你的「策略空間」。低 SPR = 簡單決策（All-in or Fold）；高 SPR = 複雜多輪決策，Draw 手牌在深疊中升值，Made Hand 保護難度增加。

---

**下一章**：[05-常見錯誤/01-新手常見錯誤](../05-常見錯誤/01-新手常見錯誤.md) — 學習奧馬哈新手最常犯的 5 大錯誤，避免昂貴的學習代價。

---

*章節：04-底池限注奧馬哈（PLO）/ 03-SPR 與深疊打法*
*難度：⭐⭐⭐（進階）*
