# Nash 均衡概念

## Nash 均衡是什麼（直覺語言）

Nash 均衡是賽局理論的核心概念。在 push/fold 情境下，它的意思是：

**當 push range 和 call range 互相平衡，沒有任何一方可以單方面改變策略來提高 EV。**

換句話說：
- 如果我知道你的 call range，我不能通過改變 push range 來獲得更多 EV
- 如果你知道我的 push range，你不能通過改變 call range 來獲得更多 EV

這是一個**雙向均衡**。

---

## 推注者和跟注者的雙向均衡

### 推注者的邏輯

推注者（Pusher）會問：「如果對手用最優 call range 回應，我 push 這手牌是否有正 EV？」

如果答案是 yes，這手牌進入 push range。

### 跟注者的邏輯

跟注者（Caller）會問：「如果對手用最優 push range，我 call 這手牌是否有正 EV？」

如果答案是 yes，這手牌進入 call range。

### 均衡點

Nash 均衡就是找到一對（push range, call range），使得：
- Pusher 無法通過擴大或縮小 push range 提高 EV
- Caller 無法通過擴大或縮小 call range 提高 EV

---

## 為何 Nash 是最優策略

**在對手知道你策略的最差情況下，Nash 均衡策略保護你不被利用。**

如果你比 Nash 更寬地 push：
- 對手可以擴大 call range，以更強的手牌對抗你的弱手牌，利用你

如果你比 Nash 更窄地 push：
- 對手可以縮小 call range，你損失了折疊股權的 EV

Nash 均衡是讓對手無法利用你的最優策略。

注意：Nash 並不一定是「絕對最優」策略（當對手犯錯時，剝削性策略可能更好），但它是「無法被剝削」的保底策略。

---

## Push Range 的兩個核心規律

### 規律一：越短越寬

| Stack | BTN Push Range（近似） |
|-------|----------------------|
| 20bb | ~42% |
| 15bb | ~54% |
| 10bb | ~65% |
| 7bb | ~76% |
| 5bb | ~85% |

原因：Stack 越短，fold equity 的相對價值越高（贏得底池相對於剩餘籌碼的比例更大），同時 SPR 很低讓 equity realization 更完整。

### 規律二：越後位越寬

同樣 10bb，不同位置的 push range：

| 位置 | Push Range（近似） |
|------|------------------|
| UTG | ~28% |
| HJ | ~42% |
| CO | ~52% |
| BTN | ~65% |
| SB | ~68% |

原因：後位需要通過的對手更少，折疊股權更高，可以 push 更寬的手牌。

---

## Call Range 比 Push Range 窄

這是 Nash 均衡最重要的一個直覺：

**跟注者的 call range 永遠比推注者的 push range 窄。**

原因是數學上的非對稱性：
- 推注者已經投入了所有籌碼
- 跟注者需要額外再投入，面對更嚴格的 pot odds 要求
- 跟注者需要更高的勝率才能 call

具體範例（BTN push 10bb vs BB）：
- BTN push range：~65%
- BB call range：~36%（接近 UTG 的 push range 寬度）

這意味著：**你可以 push 對手不能 call 的手牌。** 很多手牌（如 K4o, Q7s）BTN 可以 push，但 BB 對 BTN 的 push call 不回來。

---

## Nash 的限制

Nash 均衡基於某些假設，在 MTT 實戰中有重要限制：

### 限制一：假設單人 call

標準 Nash push/fold 表假設只有一個可能的 caller（即你 push，只有下一個人可以 call）。

在 9-max 實戰中，你 UTG push，可能有多個人都能 call。多人 call 的可能性降低了 fold equity，應該縮緊 push range（尤其是早位）。

### 限制二：不考慮 ICM

Nash 均衡計算的是 Chip EV 最優，不考慮獎金結構。

在 bubble 附近或 final table，ICM 壓力改變了 push/call 的最優邊界：
- Push range 通常縮緊（因為被 call 輸籌碼的 ICM 代價更高）
- Call range 通常更緊（因為輸了被淘汰的 ICM 代價更高）

詳見第 02 章第 04 節：ICM 調整。

### 限制三：無位置歷史

Nash 假設對手不知道你之前 push 過多少次。實際上，對手會觀察你的 push 頻率並調整 call range。

---

## 線上工具查詢方法

### HRC（Hold'em Resources Calculator）

最強大的 push/fold + ICM 工具。

**使用步驟：**
1. 設定桌子大小（9-max）
2. 輸入各玩家的籌碼量
3. 設定盲注結構（含 antes）
4. 選擇「Nash Push/Fold」模式
5. 查看各位置的 push range 和對應的 call range

HRC 支援 ICM 模式，可以加入獎金結構計算 ICM 調整後的 range。

### Simple Nash

輕量級工具，快速查詢標準 Nash range。

**使用步驟：**
1. 選擇 Stack 大小
2. 選擇位置
3. 輸出：push range 圖（顏色標示）

### ICMIZER

主要用於 ICM 分析，也包含 push/fold 功能。

**使用步驟：**
1. 輸入手牌場景（各人籌碼、位置）
2. 輸入獎金結構
3. 分析 push 的 ICM EV
4. 比較 push vs fold 的獎金期望值

---

## 實戰應用

Nash 均衡不是要你死記圖表，而是建立直覺：

1. **知道大概的 push range 邊界：** UTG 10bb ≈ 28%，BTN 10bb ≈ 65%
2. **知道 call range 更窄：** BTN push 65%，BB call ≈ 36%
3. **知道何時要調整：** ICM 壓力、多人 call 風險
4. **用工具確認邊緣手牌：** 不確定的手牌（邊界附近）用 HRC 確認

最終目標是在桌上能快速判斷大多數 push/fold 決定，只有真正的邊緣案例才需要計算。
