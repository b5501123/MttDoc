# 底池限注奧馬哈 01：PLO 下注規則

> **學習目標**：掌握 Pot Limit 的計算公式，能夠在任何底池大小下快速計算 Pot bet 和 Pot raise 的金額，理解 PLO 格式的下注限制。

---

## 一、什麼是 Pot Limit（底池限注）？

### 1.1 基本定義

**Pot Limit（PL）** 是一種下注限制格式：

> 每次行動時，你的最大下注或加注金額不能超過當前底池的大小。

不同下注格式的比較：

| 格式 | 最大下注 | 奧馬哈應用 |
|------|---------|----------|
| No-Limit（NL）| 無限制（可全押） | NL Omaha（較少見）|
| Pot-Limit（PL）| 不超過底池 | **PLO（最常見）** |
| Fixed-Limit（FL）| 固定金額 | Fixed Limit Omaha（較少見）|

### 1.2 為什麼奧馬哈用 Pot Limit？

歷史和策略原因：
1. **翻牌前 equity 差距小**：奧馬哈中最好和最差的手牌 equity 差距比 NLH 小，PLO 防止翻牌前立即全押
2. **翻牌後的豐富策略**：PLO 讓翻牌後有更多決策輪次，遊戲更有深度
3. **控制方差**：PLO 比 NLO 方差稍小（雖然仍然很大）

---

## 二、Pot Bet（下注等於底池）的計算

### 2.1 翻牌後先行動（Open Bet）

當你是翻牌後第一個行動的玩家：

```
公式：Pot Bet = 底池大小（P）

例子：
  翻牌後底池 = 30bb
  你的 Pot bet = 30bb（直接下底池大小）
```

### 2.2 翻牌後跟注後再下注（Continuation Bet）

如果翻牌前有下注，進入翻牌的底池已包含那些注：

```
例子：
  翻牌前：CO 開牌 3bb，BTN 跟注，BB 跟注
  翻牌底池 = 3 + 3 + 3 = 9bb（加上兩個盲注？）

  等等，標準計算：
  - 小盲 = 0.5bb，大盲 = 1bb
  - CO 開牌到 3bb，BTN 跟注 3bb，BB 跟注（補 2bb 到 3bb 總計）
  - SB 已投入 0.5bb，棄牌失去（通常 SB 不計算進底池，除非他跟注）

  如果 SB 棄牌：
  底池 = BB(1bb) + CO(3bb) + BTN(3bb) + SB(0.5bb，棄牌已投入)
       = 7.5bb（注：SB 的 0.5bb 在他棄牌後進入底池）

  翻牌底池（近似計算）：
  如果 CO 開 3bb，BTN 跟，BB 跟，SB 棄：
  底池 ≈ CO(3) + BTN(3) + BB(3) = 9bb（標準化：每人 3bb，3 人 = 9bb）

  翻牌後第一個行動（BB，OOP）：
  Pot bet = 9bb

  如果 BB 棄牌，CO 下注：
  CO 的 Pot bet = 9bb（底池大小）
```

### 2.3 完整的 Pot bet 計算步驟

```
步驟 1：確認當前底池大小（P）
步驟 2：你的 Pot bet = P

簡單！但容易混淆的是 Pot Raise 的計算。
```

---

## 三、Pot Raise（加注到底池大小）的計算

### 3.1 Pot Raise 公式

當已有對手下注，你要 Pot Raise 時：

```
公式：Raise to = 3 × Bet + Pot（下注前的底池大小）

或更直觀的公式：
  Call 金額 = C（你需要跟注的金額）
  Raise to（你的最大加注目標額）= C × 3 + P

例子：
  底池 = 30bb
  對手 Bet = 20bb

  Call 金額 C = 20bb
  Pot after call = 30 + 20 = 50bb（算上對手的 bet 後的底池）
  Raise to = C + Pot after call = 20 + 50 = 70bb

  所以 Pot Raise = 70bb（你總共投入 70bb，包含你的跟注部分）

  用公式驗證：Raise to = C × 3 + P = 20 × 3 + 30 = 60 + 30 = 90bb？

  等等，讓我釐清這個計算...
```

### 3.2 Pot Raise 的正確計算方法

```
正確方法：逐步計算

情況：底池 30bb，對手 Bet 20bb，你要 Pot Raise

步驟 1：對手 Bet 後的底池（算上對手的 Bet）
  底池（after bet）= 30 + 20 = 50bb

步驟 2：你先 Call（跟注）
  你 Call 20bb → 底池 = 50 + 20 = 70bb

步驟 3：你的 Raise = 當前底池（after your call）= 70bb
  → 你額外 Raise 70bb

步驟 4：你的總投入 = Call(20) + Raise(70) = 90bb

因此：「Pot Raise」= Raise to 90bb（你總共投入 90bb）

快速公式記憶：
  Pot Raise = Call × 3 + 原始底池（Bet 前）
  = 20 × 3 + 30 = 90bb ✓
```

### 3.3 更多 Pot Raise 例子

**例子 1：翻牌前的 Pot Raise（3-bet）**

```
情況：BB = 1bb，CO 開牌到 3bb，BTN 要 Pot Raise（3-bet）

步驟計算：
  底池（before CO's bet）= BB(1) + SB(0.5) = 1.5bb（假設 SB 棄牌）
  CO Bet = 3bb
  底池 after CO's bet = 1.5 + 3 = 4.5bb

  BTN Call = 3bb
  底池 after BTN's call = 4.5 + 3 = 7.5bb

  BTN Raise to = 7.5bb（底池）
  BTN 的 Raise = 7.5bb（額外）
  BTN 總投入 = Call(3) + Raise(7.5) = 10.5bb
  → BTN Pot Raises to 10.5bb

  公式驗證：Call × 3 + 原始底池 = 3 × 3 + 1.5 = 9 + 1.5 = 10.5bb ✓
```

**例子 2：翻後面對 Pot Bet 的 Pot Re-raise**

```
情況：底池 40bb，玩家 A Pot bet 40bb，玩家 B（你）要 Pot Re-raise

玩家 A Bet = 40bb
底池 after A's bet = 40 + 40 = 80bb

你 Call = 40bb
底池 after your call = 80 + 40 = 120bb

你的 Raise to = 120bb（底池）
你的 Raise = 120bb（額外）
你的總投入 = Call(40) + Raise(120) = 160bb

公式驗證：Call × 3 + 原始底池 = 40 × 3 + 40 = 120 + 40 = 160bb ✓

所以你 Raise to 160bb（160bb 是你投入的總額）
```

**例子 3：多輪加注（4-bet）**

```
底池 10bb（翻牌前）
玩家 A 開牌 3bb
玩家 B 3-bet to 10bb（Pot Raise）
玩家 A 4-bet（再次 Pot Raise）

A 的 4-bet 計算：
  B's raise = 10bb
  底池 after B's raise = 10 + 10 = 20bb（底池 10bb + B 的 10bb 3-bet）
  等等，讓我重算：

  翻牌前：
  SB 0.5, BB 1（底池 1.5bb）
  A 開到 3bb（底池 = 1.5 + 3 = 4.5bb，算上 A 的 3bb 進底池）
  等等，這取決於 A 的 bet 是否計入底池。

  簡化計算：
  底池 = 10bb
  A Bet = 3bb（底池 after A = 13bb）
  B 3-bet：
    B Call = 3bb，底池 = 16bb
    B Raise to = 16bb，B 總投入 = 3 + 16 = 19bb
    等等不對... B raises to 10bb（pot raise target）
    B 的 pot raise to = Call(3) × 3 + 原始底池(10) = 9 + 10 = 19? 不對

  我來用更直觀的方法：

  翻前底池：10bb（假設已有人 limp 或這是 3-way）
  玩家 A bet 10bb（Pot Bet）：底池 = 10 + 10 = 20bb
  玩家 B Pot Raise：
    B Call = 10bb，底池 = 20 + 10 = 30bb
    B Raise to = 30bb（pot after B's call），總投入 = 10 + 30 = 40bb
  玩家 A Pot 4-bet（面對 B 的 40bb 3-bet）：
    A 已投入 10bb，B 投入 40bb，差額 = 30bb（A 需要 Call 30bb 才能跟注）
    底池 after B's 40bb = 底池 10 + A 的 10 + B 的 40 = 60bb（before A acts）
    A Call = 30bb，底池 after A call = 60 + 30 = 90bb
    A Raise to = 90bb（pot），A Raise amount = 90bb
    A 總投入 = Call(30) + Raise(90) = 120bb

  以此類推...
```

---

## 四、翻牌前 Pot Raise（3-bet）的計算

### 4.1 標準翻牌前 Pot Raise

```
標準 PLO 翻牌前場景：
  盲注：SB 0.5bb, BB 1bb
  有效籌碼：100bb

  玩家 A（CO）開牌到 3bb：
    底池 = SB(0.5) + BB(1) + CO(3) = 4.5bb

  玩家 B（BTN）要 Pot Raise（3-bet）：
    B Call = 3bb
    底池 after B call = 4.5 + 3 = 7.5bb
    B Raise to = 7.5bb（pot）
    B 總投入 = 3 + 7.5 = 10.5bb
    → BTN raises to 10.5bb

  簡化記憶：
    BTN 3-bet = CO 開牌的 3.5 倍（≈ 10.5 / 3 ≈ 3.5x）
    → 在 PLO，翻牌前的 pot 3-bet 通常約是開牌的 3.5 倍
```

### 4.2 面對 3-bet 的 Pot 4-bet

```
繼續上面的場景：
  底池 = 4.5bb，CO 開 3bb，BTN 3-bet to 10.5bb
  CO 要 Pot 4-bet：
    CO 已投入 3bb，BTN 投入 10.5bb，差額 = 7.5bb（CO 需要 Call 7.5bb）
    底池 after BTN 3-bet = 4.5 + 10.5 = 15bb（但 CO 的 3bb 已在底池...）

    讓我重算：
    底池（在 CO 3-bet 前）= SB(0.5) + BB(1) = 1.5bb
    CO bet 3bb → 底池 = 4.5bb
    BTN 3-bet to 10.5bb → 底池 = 1.5 + 10.5 = 12bb（SB+BB+BTN 的 10.5bb）
    CO 已投入 3bb（算在底池裡了）

    CO 需要 Call = 10.5 - 3 = 7.5bb（差額）
    底池（算上 CO call）= 12 + 3（已在）= 15bb... 等等

    更清楚的方法：
    底池（before CO 4-bet action）= SB(0.5) + BB(1) + CO(3) + BTN(10.5) = 15bb
    CO 已投入 3bb，需要額外 Call 7.5bb 才能跟注 BTN 的 10.5bb

    CO Call = 7.5bb → 底池 after CO call = 15 + 7.5 = 22.5bb
    CO Raise to（Pot Raise）= 22.5bb
    CO 總投入（4-bet）= 3（已投）+ 7.5（call）+ 22.5（raise）= 33bb
    或說：CO 4-bet to 33bb（total chips in）

    快速公式：CO 4-bet ≈ BTN 3-bet × 3.5 ≈ 10.5 × 3.5 ≈ 36.75bb（近似）
```

---

## 五、PLO 下注規則的實戰快速計算

### 5.1 快速計算技巧

```
實戰中快速計算 Pot Raise 的方法：

技巧 1：「Call + 底池」的直覺計算
  你需要 Call X，底池變成 P
  你的 Raise = P（原底池 + 對手的 Bet + 你的 Call）
  你的總投入 = X（Call）+ P（Raise）= X + P

  簡化：如果對手 Pot Bet（Bet = P），
  你的 Call = P，底池 after call = 3P，
  你的 Raise = 3P，總投入 = P + 3P = 4P

  即：對抗一個 Pot Bet，你的 Pot Raise = 4 × 原始底池

技巧 2：常用倍數記憶
  翻前：
    標準 Pot 3-bet ≈ 開牌 × 3.5
    Pot 4-bet ≈ 3-bet × 3.5

  翻後：
    Pot Bet = 底池 × 1
    對 Pot Bet 的 Pot Raise = 底池 × 4
    對 Pot Raise 的 Pot Re-raise = 底池 × 13（近似）
```

### 5.2 常見場景的下注金額表

| 場景 | 底池 | 下注/加注金額 |
|------|------|------------|
| 翻後先行動 Pot Bet | 30bb | 30bb（下到 30bb）|
| 對 Pot Bet 的 Pot Raise | 30bb，對手 Bet 30bb | Raise to 120bb（4×原底池）|
| 翻前 Pot 3-bet（面對 3bb 開牌） | 1.5bb | 3-bet to ~10.5bb |
| 翻前 Pot 4-bet（面對 10.5bb 3-bet） | ~1.5bb | 4-bet to ~35bb |

---

## 六、不能超過底池下注的規則詳解

### 6.1 何時不能超過？

在 PLO 中，每次行動的最大加注金額 = 當前底池大小（包含你的跟注後）。

```
不能做的行動：
❌ 在底池 30bb 時 Bet 50bb（超過底池）
❌ 在對手 Bet 20bb（底池 30bb）時 Raise to 200bb（超過 Pot Raise 的 90bb）

合法行動：
✅ 在底池 30bb 時 Bet 30bb（Pot Bet）
✅ 在對手 Bet 20bb（底池 30bb）時 Raise to 90bb（Pot Raise 計算）
✅ 任何小於等於 Pot 的金額（如 Bet 15bb，半鍋下注）
```

### 6.2 Pot Limit 的策略意義

```
Pot Limit 對策略的影響：

1. 翻牌前不能直接全押（除非深度 = 底池）
   → 在 PLO 中，翻牌前通常不會發生全押（除非有多輪加注）
   → 這使翻牌後的遊戲更重要

2. 最大下注受限，Draw 永遠有底池賠率
   → 德州撲克可以 overbets（超額下注）拒絕 draw 的賠率
   → PLO 中，draw 永遠能用 2:1 的賠率跟注 Pot Bet
   → 這意味著強 Draw（13+ outs）永遠有足夠的數學理由跟注

3. 多輪才能 Stack off（全押）
   → 翻牌後通常需要 2-3 輪下注才能把籌碼全押進去
   → 這增加了策略深度（翻牌、轉牌、河牌各有決策）

4. Bluff 的下注大小受限
   → PLO 中無法用大 Bet 強迫對手 fold
   → Pot Bet 已經是你能做的最大，對手通常有足夠的賠率繼續
   → PLO 中 Bluff 的效率相對低（但並非無效）
```

---

## 七、特殊情況：短疊的 Pot Limit 計算

### 7.1 當有效籌碼小於 Pot

```
情況：底池 50bb，一方只剩 20bb（短疊）
另一方要 All-in

Pot Bet = 50bb，但短疊只有 20bb
→ 短疊只能投入最多 20bb（All-in）
→ 另一方只能跟注 20bb（Side pot 分配）

在 MTT 中，短疊的 All-in 不受 Pot Limit 限制：
  → 你只能 All-in 你有的籌碼（= 你的全部）
  → 對手可以選擇 Call 或 Fold（但不能 raise 超過 pot）
```

### 7.2 MTT 短疊場景下的 PLO 決策

```
短疊 PLO 的翻牌前策略：

籌碼 < 10bb：
  → 幾乎任何行動都可能觸發全押
  → 翻牌前 AA：直接 All-in（不管 PLO 限制，因為 PLO 的加注把你推到 All-in）

籌碼 10-25bb：
  → 翻牌前有加注時，你可能面對多輪加注後被迫全押
  → 需要評估：如果我加注，對手再 3-bet，我是否願意全押？
  → AA 和強 A 級手牌：願意全押
  → B 級以下：不一定

籌碼 25-50bb：
  → 標準 PLO 範圍，可以打完整的翻牌後策略
  → 注意：一個 Pot Raise（翻前）已佔有效籌碼的 30-40%
```

---

## 八、PLO 下注規則的實戰練習

### 練習題

**Q1：底池 20bb，你是第一個行動。最大下注是多少？**

<details>
<summary>答案</summary>

答案：20bb（Pot Bet = 底池大小）

</details>

---

**Q2：底池 40bb，對手 Bet 40bb。你的 Pot Raise 是多少？**

<details>
<summary>答案</summary>

計算步驟：
- 對手 Bet 後底池 = 40 + 40 = 80bb
- 你 Call = 40bb，底池 after call = 80 + 40 = 120bb
- 你 Raise to = 120bb（Pot）
- 你總投入 = Call(40) + Raise(120) = 160bb

答案：Raise to 160bb（你投入 160bb 總計）

</details>

---

**Q3：翻牌前，SB=0.5, BB=1。CO 開牌到 3bb，你在 BTN 要 Pot 3-bet。3-bet 金額是多少？**

<details>
<summary>答案</summary>

計算步驟：
- 底池（before CO's bet）= SB(0.5) + BB(1) = 1.5bb
- CO Bet = 3bb → 底池 = 4.5bb
- BTN Call = 3bb → 底池 after call = 4.5 + 3 = 7.5bb
- BTN Raise to = 7.5bb（pot），BTN 總投入 = 3 + 7.5 = 10.5bb

答案：3-bet to 10.5bb

快速記憶：翻前 pot 3-bet ≈ 開牌 × 3.5 = 3 × 3.5 = 10.5bb

</details>

---

## 九、章節總結

| 計算場景 | 公式 | 例子 |
|---------|------|------|
| 先行動 Pot Bet | = 底池大小（P） | 底池 30bb → Bet 30bb |
| 面對 Bet 的 Pot Raise | = Call + (Call + P + Bet) = Call × 3 + P | 底池 30bb，Bet 20bb → Raise to 90bb |
| 翻前 Pot 3-bet | ≈ 開牌 × 3.5 | CO 開 3bb → BTN 3-bet to ~10.5bb |
| 面對 Pot Bet 的 Pot Raise | ≈ 原始底池 × 4 | 底池 30bb，Pot Bet 30bb → Raise to 120bb |

**核心記憶點**：
> PLO 的最大下注 = 底池大小。永遠不能超過底池下注。Pot Raise 時，你的「Call 金額 × 3 + 原始底池」= 你的最大投入金額。

---

**下一章**：[02-PLO 策略核心](./02-PLO策略核心.md) — 理解 PLO 的核心策略思想：永遠在 draw，永遠在被 draw。

---

*章節：04-底池限注奧馬哈（PLO）/ 01-PLO 下注規則*
*難度：⭐⭐（中級）*
