# ICM 調整：Bubble 和 Final Table 的策略修正

## 為什麼需要 ICM 調整

Nash push/fold 圖表是 **Chip EV** 最優，假設每顆籌碼價值相等。

但在 Bubble 和 Final Table，籌碼的**獎金價值是非線性的**：
- 輸光籌碼 = 出局 = $0
- 贏一倍籌碼 ≠ 獎金翻倍

這讓「冒險」的代價比 Nash 計算的更高。

---

## ICM 壓力的來源

### Bubble 壓力
**定義：** 再出局 N 人就進錢的狀態。

Bubble 時出局 = $0
Bubble 後出局 = 至少拿到 min cash

**這個差距讓所有人（尤其中疊）變得更保守。**

### Stack 和 ICM 壓力的關係

| Stack | ICM 壓力 | 說明 |
|-------|---------|------|
| 大疊（>平均 2 倍）| 低 | 就算輸也不會出局 |
| 中疊（接近平均）| 最高 | 一次大輸可能直接 bubble out |
| 短疊（<10bb）| 低 | 反正快出局，push/fold 沒什麼好怕 |

**中疊的 ICM 壓力最高** → 中疊打法最保守。

---

## 各角色的 ICM 調整

### 大疊（Big Stack）
**策略：積極施壓，擴大 push range**

- 對中疊：push range 放寬 10-15%（他們不敢 call）
- 對短疊：range 也放寬，但不要輕忽（短疊 ICM 壓力低，call range 正常）
- 對其他大疊：正常打，他們不怕你

**大疊的黃金規則：**
> 當你是 Bubble 的大疊，你的 push 就是免費拿盲注。
> 中疊們寧可 fold 好牌也不想在 bubble 出局。

---

### 中疊（Medium Stack）
**策略：縮緊 push range，避免不必要的對決**

- Push range 縮緊 ~15-20%
- 去掉所有 bluff push（76o, 85o, 低同花等）
- 只保留：value push + 強 semi-bluff（AX suited, 中等以上對子）
- 對大疊的 push：call range 大幅縮緊（他可能是在欺負你）
- 找短疊下手：跟著短疊的 push，用 call 來剝削

**中疊面對大疊 push 的思路：**
```
大疊 push range 很寬（可能是 bluff）
但我 call 輸了就可能 bubble out
→ 即使有 EV，ICM 讓我 fold 更好
→ 只用很強的手牌 call（QQ+, AKs）
```

---

### 短疊（Short Stack < 10bb）
**策略：接近 Nash，輕微縮緊**

- Push range 比 Nash 縮緊 ~5%（Bubble 心理壓力）
- 一旦進了 money，push range 恢復正常
- 不要因為 bubble 而放棄 push，短疊的 fold equity 正在消失

**短疊的 ICM 邏輯：**
```
我現在 7bb，Bubble
如果我 fold 等待：blinds 會繼續吃我，下一手更慘
如果我 push 被 call 輸：bubble out，但本來就快出局
如果我 push 被 fold：積累籌碼，增加生存機率
→ push 期望值通常高於等待
```

---

## Bubble 實戰範例

### 情境設定
4人剩餘，3人進錢：
- 你（中疊，30bb）
- 大疊（80bb）
- 中疊（25bb）
- 短疊（15bb）

獎金：1st $1000, 2nd $600, 3rd $400, 4th $0

**你的 ICM Equity：約 $350**

### 情境 A：大疊在 BTN push all-in，你在 BB

大疊 push range = 很寬（~70%）
你的 ICM equity = $350

如果你 call 且贏（60% 勝率）：
- 你變大疊，ICM equity 大幅提升 → 約 $600

如果你 call 且輸（40% 機率）：
- 你出局，$0

```
ICM EV（call）= 60% × $600 + 40% × $0 = $360
ICM EV（fold）= 保留 $350（輸掉 BB 後約 $340）
```

看起來 call 好（$360 > $340）？
但這沒有考慮短疊可能出局帶來的 money leap。

**完整 ICM 計算（考慮第四名出局機率）：**

如果此時短疊出局概率很高 → 你只要 survive 就大概率進錢
→ fold 的實際價值比 $340 高很多

**結論：即使 60% 勝率，fold 可能是正確選擇。**

---

### 情境 B：你在 BTN，短疊在 BB（13bb）

你 push all-in，短疊在 BB 面對決策：

短疊的 ICM 壓力：他短疊，進錢本來就很困難，輸了就出局。
短疊的折衷：但短疊不能一直 fold，blinds 在吃他。

**你的利用：**
短疊在 bubble 會 fold 比正常 Nash 更多手牌。
→ 你可以用比 Nash 更寬的 range push 對 BB 短疊。

---

## Final Table ICM

### 位置躍升（Payout Jump）

Final Table 每個位置的獎金差距巨大：

```
例：10人 FT
10th: $500
9th:  $800
8th:  $1,200
7th:  $1,800
6th:  $2,500
5th:  $3,500
4th:  $5,000
3rd:  $8,000
2nd: $15,000
1st: $30,000
```

**每一步的躍升都有巨大影響。**

### FT 打法原則

**原則 1：Push range 比 Bubble 更緊（初期）**
原因：每個位置都有明確獎金，隨便出局損失很大。

**原則 2：識別鎖定（Locking Up）場景**
當某人很快出局，你可以再上一個台階 → 保守打以 survive。

**原則 3：識別積極場景**
當你是 chip leader 且其他人都在互打：
→ 你大疊，繼續積極偷盲。

**原則 4：Push range 隨 FT 進行而調整**
- 10人 FT 初期：保守
- 6人剩餘：正常
- 3人剩餘：接近 Cash Game 打法（ICM 差距縮小）
- 頭對頭：純 Cash Game 打法

---

## ICM 調整速查表

| 場景 | Stack | 調整方向 | 幅度 |
|------|-------|---------|------|
| Bubble | 大疊 | 放寬 push | +10-15% |
| Bubble | 中疊 | 縮緊 push | -15-20% |
| Bubble | 短疊 | 輕微縮緊 | -5% |
| FT 初期 | 任何 | 縮緊 | -10-15% |
| FT 後期（3人）| 任何 | 接近正常 | -0-5% |
| 頭對頭 | 任何 | 正常 Nash | 0% |

---

## 常見 ICM 錯誤

### 錯誤 1：中疊 Bubble call 大疊
「我有 55% 勝率，Chip EV 是正的！」
→ 忘記了 ICM 讓輸的代價遠大於 Chip EV 計算

### 錯誤 2：短疊 Bubble fold 太多
「我想等 bubble 破掉再打」
→ 短疊等待 = 被 blinds 吃死，最後更慘

### 錯誤 3：大疊 Bubble 打太保守
「我不想冒險」
→ 大疊 Bubble 是最賺錢的時刻，應該積極欺負中疊

### 錯誤 4：FT 忽略位置躍升
「我要積極打，拿第一名」
→ 有時候保守 survive 到下個位置比贏更有 EV

---

下一章：深疊翻牌前策略（15bb+）
