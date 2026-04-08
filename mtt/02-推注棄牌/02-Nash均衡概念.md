# Nash 均衡概念（BBA 標準）

## Nash 均衡是什麼（直覺語言）

Nash 均衡是賽局理論的核心概念。在 push/fold 情境下，它的意思是：

**當 push range 和 call range 互相平衡，沒有任何一方可以單方面改變策略來提高 EV。**

換句話說：
- 如果我知道你的 call range，我不能通過改變 push range 來獲得更多 EV
- 如果你知道我的 push range，你不能通過改變 call range 來獲得更多 EV

這是一個**雙向均衡**。

本章所有 Nash 概念均以**Big Blind Ante（BBA）**為預設環境，這是現代線上 MTT 的標準結構。傳統 Nash push/fold 表（無 ante 版本）在 BBA MTT 中需要系統性調整，本章提供完整的調整方法。

---

## 傳統 Nash 表的問題：它是「無 ante」版本

市面上絕大多數廣泛流傳的 Nash push/fold 表，包括早期的 Simple Nash、PokerStove 計算結果，以及許多教學書籍中的圖表，都是**在無 ante 環境下計算的**。

這意味著：

1. **底池假設錯誤**：傳統 Nash 假設底池 = SB + BB（例：10bb push 底池 ≈ 1.5bb）。BBA 環境下底池 = SB + BB + BB ante（例：10bb push 底池 ≈ 2.5bb）
2. **Fold equity 被低估**：底池小 → fold equity 收益被算低 → push range 算得偏窄
3. **Call 標準被高估**：無 ante 時 BB call 的 pot odds 更差，call range 更窄。BBA 讓 BB 的 pot odds 略好，call range 稍寬，但 push range 放寬的幅度更大

**結論：直接套用傳統無 ante Nash 表在 BBA MTT 中會系統性地低估 push range，造成 EV 損失。**

---

## 推注者和跟注者的雙向均衡

### 推注者的邏輯

推注者（Pusher）會問：「如果對手用最優 call range 回應，我 push 這手牌是否有正 EV？」

在 BBA 環境下，因為底池更大，更多手牌對這個問題的答案是「yes」。

如果答案是 yes，這手牌進入 push range。

### 跟注者的邏輯

跟注者（Caller）會問：「如果對手用最優 push range，我 call 這手牌是否有正 EV？」

在 BBA 環境下，BB 的 pot odds 略好（底池更大），所以 call range 也會比無 ante 版本稍寬。但由於 push range 放寬幅度大於 call range 放寬幅度，整體結果是 push 更具優勢。

如果答案是 yes，這手牌進入 call range。

### 均衡點

Nash 均衡就是找到一對（push range, call range），使得：
- Pusher 無法通過擴大或縮小 push range 提高 EV
- Caller 無法通過擴大或縮小 call range 提高 EV

BBA Nash 均衡與無 ante Nash 均衡的主要差異：**push range 在所有位置、所有 bb 深度均放寬 3-5%。**

---

## 為何 Nash 是最優策略

**在對手知道你策略的最差情況下，Nash 均衡策略保護你不被利用。**

如果你比 Nash 更寬地 push：
- 對手可以擴大 call range，以更強的手牌對抗你的弱手牌，利用你

如果你比 Nash 更窄地 push：
- 對手可以縮小 call range，你損失了折疊股權的 EV

Nash 均衡是讓對手無法利用你的最優策略。

注意：Nash 並不一定是「絕對最優」策略（當對手犯錯時，剝削性策略可能更好），但它是「無法被剝削」的保底策略。**在 BBA 環境下，使用無 ante Nash 表等同於比 BBA Nash 更窄地 push，讓對手可以縮緊 call range 來利用你。**

---

## BBA 版 Push Range 的兩個核心規律

### 規律一：越短越寬（BBA 版）

以下為 BTN push range 的 BBA Nash 近似值（基於 HRC/ICMIZER BBA 模式）：

| Stack | BTN Push Range（BBA Nash） | BTN Push Range（無 ante Nash） | BBA 放寬幅度 |
|-------|---------------------------|-------------------------------|------------|
| 20bb | ~44-46% | ~40-42% | +4% |
| 15bb | ~55-57% | ~52-54% | +3-4% |
| 10bb | ~65-67% | ~62-64% | +3-4% |
| 7bb | ~77-79% | ~74-76% | +3-4% |
| 5bb | ~87-89% | ~84-86% | +3-4% |

原因：Stack 越短，fold equity 的相對價值越高（贏得底池相對於剩餘籌碼的比例更大）。在 BBA 環境下，底池更大使得這個效果在每個深度都更強。

### 規律二：越後位越寬（BBA 版）

同樣 10bb，不同位置的 BBA Nash push range（近似）：

| 位置 | BBA Push Range | 無 ante Push Range | 差距 |
|------|---------------|-------------------|------|
| UTG | ~29-31% | ~26-28% | +3% |
| HJ | ~43-45% | ~40-42% | +3% |
| CO | ~53-55% | ~50-52% | +3% |
| BTN | ~65-67% | ~62-64% | +3% |
| SB | ~68-71% | ~65-68% | +3-4% |

後位需要通過的對手更少，折疊股權更高，可以 push 更寬的手牌。BBA 讓所有位置的這個邊界統一向右移動。

---

## Call Range 比 Push Range 窄

這是 Nash 均衡最重要的一個直覺，在 BBA 環境下同樣成立：

**跟注者的 call range 永遠比推注者的 push range 窄。**

原因是數學上的非對稱性：
- 推注者已經投入了所有籌碼
- 跟注者需要額外再投入，面對更嚴格的 pot odds 要求
- 跟注者需要更高的勝率才能 call

**BBA 版具體範例（BTN push 10bb vs BB）：**
- BTN BBA push range：~65%
- BB BBA call range：~37-38%（比無 ante 的 ~35-36% 稍寬，因為 BBA 讓 pot odds 略好）

這意味著：**你可以 push 對手不能 call 的手牌。** 很多手牌（如 K4o, Q7s, J8o）BTN 在 BBA 環境可以 push，但 BB 面對 BTN 的 push 仍然 call 不回來。

### BBA 對稱性的重要理解

BBA 同時放寬了 push range 和 call range，但**push range 放寬幅度大於 call range**。這是因為：

- Push 方的 EV 增益 = 更大的底池 × P(fold)。BBA 讓底池大 67%，fold equity 增幅顯著
- Call 方的 pot odds 改善有限（call size 是固定的，分母增大讓 pot odds 稍微改善）

因此，BBA 的淨效果是：**push 更有利，call 更謹慎的手牌也能 call，但兩者不對稱——push 的放寬更多。**

---

## 如何將無 ante Nash 調整為 BBA Nash

當你手邊只有傳統無 ante Nash 表時，可以使用以下調整原則：

### 調整原則一：各位置放寬幅度

| 位置 | 放寬幅度 | 說明 |
|------|---------|------|
| UTG | +2-3% | 多人覆蓋降低了 BBA 帶來的額外 fold equity |
| UTG+1 | +2-3% | 同上 |
| MP | +3% | 中位放寬標準幅度 |
| HJ | +3% | 同上 |
| CO | +3-4% | 後位效果更顯著 |
| BTN | +3-4% | 最重要的偷盲位置，BBA 效益最大 |
| SB | +3-5% | 單對 BB，BBA 影響最大 |

### 調整原則二：根據 bb 深度調整

- **20bb 以上**：調整幅度約 +3%（fold equity 相對底池比例較小）
- **15bb 區間**：調整幅度約 +3-4%（BBA 影響進入核心區）
- **10bb 以下**：調整幅度約 +4-5%（短疊受 BBA 影響最大）
- **7bb 以下**：調整幅度約 +4-5%（幾乎 push all-in，BBA 收益直接）

### 調整原則三：邊界手牌的判斷

當你面對傳統 Nash 表中「剛好在 push 邊界上」的手牌（例如 UTG 10bb 的 KTo），在 BBA 環境下：

**BBA 調整後，邊界手牌幾乎都應該 push。**

傳統 Nash 表的邊界手牌，意味著這手牌的 push EV ≈ 0。BBA 加入了額外的 fold equity，讓這些邊界手牌的 EV 變為正值。

---

## Nash 的限制（BBA 環境下同樣存在）

Nash 均衡基於某些假設，在 MTT 實戰中有重要限制，BBA 並不改變這些根本限制：

### 限制一：假設單人 call

標準 Nash push/fold 表假設只有一個可能的 caller（即你 push，只有下一個人可以 call）。

在 9-max 實戰中，你 UTG push，可能有多個人都能 call。多人 call 的可能性降低了 fold equity，應該縮緊 push range（尤其是早位）。BBA 雖然增加了底池，但多人 call 的稀釋效果仍然存在。

### 限制二：不考慮 ICM

Nash 均衡計算的是 Chip EV 最優，不考慮獎金結構。

在 bubble 附近或 final table，ICM 壓力改變了 push/call 的最優邊界：
- Push range 通常縮緊（因為被 call 輸籌碼的 ICM 代價更高）
- Call range 通常更緊（因為輸了被淘汰的 ICM 代價更高）

BBA ICM 計算需要使用 BBA 版底池——即 bubble ICM 場景下每手牌的底池起始值要包含 BB ante。詳見第 02 章第 04 節：ICM 調整。

### 限制三：無位置歷史

Nash 假設對手不知道你之前 push 過多少次。實際上，對手會觀察你的 push 頻率並調整 call range。

---

## 線上工具查詢方法（BBA 模式）

### HRC（Hold'em Resources Calculator）

最強大的 push/fold + ICM 工具，完整支援 BBA 結構。

**BBA 設定步驟：**
1. 設定桌子大小（9-max）
2. 輸入各玩家的籌碼量
3. 設定盲注結構：選擇「Big Blind Ante」選項，設定 ante = 1bb（即等於大盲注）
4. 選擇「Nash Push/Fold」模式
5. 查看各位置的 push range 和對應的 call range

HRC 在 BBA 模式下輸出的 range 已完整反映 BBA 底池大小，無需手動調整。

HRC 支援 ICM 模式，可以加入獎金結構計算 ICM 調整後的 BBA range。

### ICMIZER

主要用於 ICM 分析，也包含 push/fold 功能。

**BBA 設定步驟：**
1. 輸入手牌場景（各人籌碼、位置）
2. 輸入獎金結構
3. 在盲注設定中啟用 Big Blind Ante
4. 分析 push 的 ICM EV（已含 BBA 底池）
5. 比較 push vs fold 的獎金期望值

ICMIZER 的 BBA 計算完整且準確，是驗證 BBA push range 的首選工具。

### Simple Nash

輕量級工具，但需注意：Simple Nash 預設為**無 ante 版本**。

**使用步驟：**
1. 選擇 Stack 大小
2. 選擇位置
3. 輸出：push range 圖（顏色標示）
4. **重要：** 查到結果後，根據上面的調整原則（+3-5%）手動放寬以適應 BBA 環境

---

## 實戰應用

Nash 均衡不是要你死記圖表，而是建立直覺。在 BBA 標準下：

1. **知道 BBA Nash push range 的大概邊界：** UTG 10bb ≈ 30%，BTN 10bb ≈ 66%（比無 ante Nash 表略寬）
2. **知道 call range 更窄：** BTN BBA push 65%，BB BBA call ≈ 37%
3. **知道何時要調整：** ICM 壓力、多人 call 風險——這些在 BBA 環境下同樣適用
4. **不要用舊版無 ante Nash 表：** 直接用 HRC 或 ICMIZER 的 BBA 模式查詢，或者在舊版結果上加 3-5%
5. **用工具確認邊緣手牌：** 不確定的手牌（邊界附近）用 HRC BBA 模式確認

最終目標是在桌上能快速判斷大多數 push/fold 決定，只有真正的邊緣案例才需要計算。記住：在 BBA MTT 中，凡是傳統 Nash 表上顯示為邊界的手牌，在 BBA 環境下通常都可以 push。
