# Nash 均衡：Push/Fold 的數學基礎

## 什麼是 Nash 均衡

Nash 均衡（Nash Equilibrium）= 一個策略組合，在這個組合下，**任何一方單獨改變策略都不會獲益**。

用撲克語言說：
> 如果你用 Nash 均衡策略 push，對手用 Nash 均衡策略 call，
> 雙方都無法通過改變自己的策略來獲得更好的結果。

---

## Push/Fold Nash 的兩個角色

### 推注者（Pusher）
決定：哪些手牌 push all-in，哪些 fold。

目標：最大化自己的 EV，考慮到對手的最佳 call 策略。

### 跟注者（Caller）
決定：面對 push，哪些手牌 call，哪些 fold。

目標：最大化自己的 EV，考慮到對手的 push range。

---

## 為什麼 Nash 是最優策略

**直觀理解：**

如果你 push 太寬（包含太多弱牌）：
→ 對手發現可以用更寬的 range call 來剝削你
→ 你的 EV 下降

如果你 push 太緊（只 push 強牌）：
→ 對手知道你的 range 很強，fold 更頻繁
→ 你失去了 fold equity，EV 下降

Nash 是這兩種極端之間的**平衡點**。

**更精確的說：**
Nash 是讓對手無法剝削你的策略。
對手不管怎麼調整，都無法比「跟著 Nash 走」得到更好的結果。

---

## Nash Push Range 的計算原理

Nash 的計算考慮：
1. 你的位置（決定盲注在哪）
2. 你的 stack（bb 數）
3. 對手的位置（決定他的 call range）
4. 底池賠率（決定 call/fold 的損益）

**推注者的 EV 公式：**
```
EV(push) = P(fold) × 獲得盲注
         + P(call) × [P(win|call) × 雙方籌碼 - P(lose|call) × 你的籌碼]
```

**跟注者的 EV 公式：**
```
EV(call) = P(win) × 底池 - P(lose) × call 金額
EV(fold) = 0（保留現有籌碼）
```

Nash 是找到讓兩個公式同時達到均衡的 range。

---

## Nash 的重要特性

### 特性 1：Push Range 越淺越寬
```
Stack    大致 Push Range（BTN）
20bb   → ~45%
15bb   → ~55%
10bb   → ~67%
7bb    → ~78%
5bb    → ~87%
3bb    → ~95%+（幾乎全部手牌）
```

為什麼？越短疊 → fold equity 越小 → 必須更寬 push 來補償

### 特性 2：位置越好 Push Range 越寬
同樣 10bb：
- UTG：~35%
- BTN：~67%

為什麼？BTN push 後只需要過 SB/BB，UTG push 需要過所有人。

### 特性 3：Call Range 通常比 Push Range 窄
這是 Push/Fold 的非對稱性：
- 推注者有 fold equity 的額外收益
- 跟注者沒有 fold equity，只能靠牌力

**結果：** Call range 通常比 Push range 窄 15-25 個百分點。

---

## Nash 的限制與現實應用

### Nash 的假設
Nash push/fold 圖表**假設：**
1. 只有你和 BB（頭對頭）或你對一個對手
2. 沒有 ICM 考量（純 Chip EV）
3. 對手完全理性且執行 Nash call range

### 現實差異

**差異 1：多人桌**
UTG push 需要過 5 個人（6-max），Nash 圖表通常針對單對單計算，需要調整。

實際上 UTG push range 要比 Nash 建議的更緊（因為更多人有機會 call）。

**差異 2：ICM**
Nash 是 Chip EV 最優，但 Bubble/FT 需要 ICM 調整。

- Bubble 時：push range 縮緊（怕出局）
- Bubble 時大疊：push range 放寬（ICM 壓力免疫）

**差異 3：對手不完美**
現實中對手 call range 不是 Nash。
- 如果對手 call 太緊 → 你可以 push 更寬
- 如果對手 call 太鬆 → 你應該 push 更緊（只 push 真正的 value）

---

## 如何使用 Nash 圖表

1. **確認 stack（bb 數）**
2. **確認你的位置**
3. **確認是 unopened pot（你第一個行動）還是有人已 open**
4. **查圖表，確認手牌是否在 push range 內**
5. **考慮 ICM 調整（Bubble/FT 時縮緊）**

---

## 記憶捷徑

```
Nash push = 最佳化 fold equity + 牌力的平衡點
越短 = 越寬（fold equity 小，靠牌力）
越深 = 越緊（fold equity 大，不需要太多手牌）
位置越好 = 越寬（需要過的人越少）
ICM 壓力大 = 縮緊 10-20%
```

---

下一章：各位置詳細 Push Range 圖表。
