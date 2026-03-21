# PKO 進階策略：賞金計算與桌面動態

## 追殺 EV 的精確計算

在 PKO 中，每個 call 決策都需要考慮賞金 EV。以下是完整的計算框架。

### 完整 PKO Call EV 公式

```
Call EV = Chip EV（考慮 ICM）+ Bounty EV
        = [p × (新底池的 ICM value) - (1-p) × (你損失的 ICM value)]
          + p × (目標賞金 B/2)
```

### 範例：BB Call 計算

**場景：**
- 500人 MTT（PKO，$20 buy-in，$10 rank + $10 bounty）
- 剩 100 人（進 50 名），你在 BB，45bb
- 目標在 CO push all-in 18bb，賞金 $15（已積累了一些）
- SB fold，你 call 需要投入 17bb（已有 1bb BB）

**步驟 1：Pot Odds（Chip EV 角度）**
```
底池 = 18bb + 0.5bb + 1bb = 19.5bb
需要 call = 17bb
需要勝率（純 Chip EV）= 17 / (19.5 + 17) = 46.6%
```

**步驟 2：手牌 equity**
假設你有 A9s，對手 CO 18bb push range ≈ 44%。
A9s 對 44% range ≈ 55% 勝率。

**步驟 3：Chip EV**
```
Chip EV = 55% 勝率 > 46.6% 需要 → Chip EV 正，call 合理
```

**步驟 4：加入 Bounty EV**
```
Bounty EV = 55% × ($15 / 2) = 55% × $7.5 = $4.13
```

總 EV = Chip EV（正）+ $4.13 額外賞金收益

**更加確認 call 正確，即使 Chip EV 略為中性也應該 call。**

---

## Bounty 的放大效應

PKO 賞金會隨時間增長，形成「大魚」效應：

**早期（每人賞金接近初始）：**
- 賞金普遍較小（$5-$15）
- Bounty EV 影響相對小，打法接近標準 MTT

**中後期（有玩家積累了高賞金）：**
- 某些玩家賞金可能達到 $50-$200
- Bounty EV 影響顯著，call range 大幅放寬
- 高賞金玩家成為「攻擊目標」

**計算高賞金目標的 call 調整：**

對手賞金 $100（高賞金）：
- 你 call 如果贏：額外 $50 賞金收益
- 這 $50 相對你的整體 stack 可能相當重要
- 即使 Chip EV 略負，Bounty EV 可能讓 call 變成正 EV

---

## 高賞金玩家的自我保護

當你自己有高賞金，對手的 call range 對你會放寬。這需要調整自己的打法。

**你有高賞金時的策略調整：**

1. **Push range 縮緊：** 被 call 的機率更高（對手有更高的追殺激勵），push 弱牌的 fold equity 降低

2. **注意 ICM 損失：** 你被淘汰後，你的賞金給了對手，這是你的額外損失（除了籌碼以外）

3. **偏向小底池打法：** 避免大底池（減少被追殺的機會）

4. **利用 steal 而非 3-bet call：** 偷盲贏小底池，比大底池對抗更安全

**實際例子：**
你有 $80 賞金，BTN push 20bb。普通情況你可能用 TT 的 call，但因為被淘汰後 BTN 額外獲得 $40，他 call 你任何 push 的激勵也更大。你的 push range 應謹慎。

---

## PKO 的桌面動態

### 識別高賞金目標

在 GGPoker 等平台，每個玩家頭上有賞金顯示。在多桌情況下，可以通過 lobby 或桌面顯示快速識別高賞金玩家。

**高賞金玩家（Bounty Hunter）的傾向：**
- 通常是積極的玩家（已淘汰多人）
- 可能有大量籌碼（淘汰換籌碼）
- 是比賽的「目標玩家」

**低賞金玩家的傾向：**
- 可能是新進的重買玩家
- 對 PKO 不熟悉，打法更接近標準 MTT

### 調整基於對手的 Bounty 水平

| 對手賞金等級 | 你的 call 調整 | 你的 push 調整 |
|------------|-------------|-------------|
| 低（初始附近）| 標準 call range | 標準 push range |
| 中（2-5x 初始）| 稍微放寬 call | 正常 |
| 高（5x+ 初始）| 顯著放寬 call | 正常或稍緊（對方對你也積極）|

---

## PKO 的 Bubble 特殊策略

PKO bubble 是最複雜的決策時刻：ICM + Bounty 的雙重影響。

**PKO Bubble 的矛盾：**
- ICM 說：保守，減少風險
- Bounty 說：積極，追殺賞金

**解決框架：**
1. 先計算 ICM EV（bubble ICM 壓力）
2. 加入 Bounty EV
3. 如果 Bounty EV > ICM 損失，call 更積極
4. 如果 ICM 損失 >> Bounty EV，仍然保守

**典型情境：**

中疊 BB，bubble 附近，短疊 BTN push 7bb，賞金 $25。

- ICM 說：你輸了可能 bubble 出局，謹慎
- Bounty EV：約 55%（勝率）× $12.5 = $6.9 額外

你需要判斷 $6.9 是否超過了你的 ICM 損失風險。如果你有 40bb，輸 7bb 後還有 33bb（不會直接 bubble），則 call 可能正確。如果你只有 8bb，輸了直接 bubble，ICM 損失遠超 $6.9。

---

## PKO 的學習路徑

**初學者重點：**
1. 理解賞金 EV 的計算（B/2 × 勝率）
2. 學會在 call 決策中加入 Bounty EV
3. 注意自己有高賞金時的保護策略

**中級重點：**
1. 使用 ICMIZER PKO mode 分析手牌
2. 理解 PKO bubble 的雙重壓力
3. 識別桌面上的高賞金目標

**進階重點：**
1. 完整的 PKO ICM + Bounty 計算框架
2. 動態桌面策略（隨賞金分佈調整打法）
3. 多桌 PKO 管理（識別哪桌有高賞金目標）
