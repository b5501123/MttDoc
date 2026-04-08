# 決賽桌 ICM：Final Table 的名次博弈（BBA 標準）

## 一、FT 的根本邏輯：為什麼 ICM 在決賽桌最重要

### BBA 在決賽桌的核心影響

本章所有 ICM 計算均以**Big Blind Ante（BBA）**為預設底池大小。BBA 是現代線上 MTT 的標準結構：BB 額外支付 1bb ante，每手牌底池比無 ante 大約 67%。

**BBA 對 FT 的三重影響：**

1. **每手牌的籌碼移動更大**：BBA 底池更大，每次攤牌涉及的籌碼比無 ante 多出 67%，ICM 風險也相應放大
2. **Steal 收益更高**：每次成功偷盲贏得 2.5bb（BBA）而非 1.5bb（無 ante），大疊的施壓效率更高
3. **短疊的 push/fold 窗口更窄**：BBA 讓每手牌消耗更多 bb，從 15bb 縮水的速度比無 ante 快，需要更早行動

在 FT，這些影響疊加 ICM 獎金壓力，使得每一手牌的決策後果比常規牌局嚴重得多。

### 獎金結構製造的扭曲

進入決賽桌（Final Table，FT），每一個名次的跳幅都代表著真實的金錢差距。這讓 ICM 壓力達到整場 MTT 的最高點——直到剩下兩人後才完全消失。

理解 FT ICM 的核心：**你的每一顆籌碼，在不同位置、不同時機下，其美金價值截然不同。BBA 讓每手牌的籌碼移動更大，這個差異在 FT 中尤為明顯。**

典型的 10 人 FT 獎金結構（總 prize pool $10,000）：

| 名次 | 獎金 | 與下一名的差距 | 差距佔 prize pool |
|------|------|-------------|-----------------|
| 1st  | $3,000 | +$1,000 | 10% |
| 2nd  | $2,000 | +$600 | 6% |
| 3rd  | $1,400 | +$400 | 4% |
| 4th  | $1,000 | +$200 | 2% |
| 5th  | $800  | +$200 | 2% |
| 6th  | $600  | +$100 | 1% |
| 7th  | $500  | +$100 | 1% |
| 8th  | $400  | +$100 | 1% |
| 9th  | $300  | +$100 | 1% |
| 10th | $200  | — | — |

**關鍵觀察：**
- 3rd 和 4th 之間有 $400 差距，相當於 10th 名次的兩倍
- 進入 Top 3 是 FT 最重要的里程碑（從 4th 跳到 3rd 節省了 $400）
- 1st 和 2nd 的差距高達 $1,000，是整個 FT 的終極目標
- BBA 讓每手牌的籌碼移動更大，ICM 的每個決策點都更加關鍵

### ICM 如何運作：數學原理（BBA 版本）

ICM（Independent Chip Model）把你目前的籌碼量，轉換成對應的獎金期望值。

**簡化版 ICM 計算原理：**

假設 3 人剩餘，籌碼：A=60%、B=30%、C=10%
獎金：1st=$1,000、2nd=$600、3rd=$400

```
A 的 ICM Equity：
= P(A 1st) × $1,000 + P(A 2nd) × $600 + P(A 3rd) × $400
= 60% × $1,000 + [30%×(10/40)×100%] × $600 + ... （遞迴計算）
≈ $600 + $176 + $56 ≈ $832
```

**BBA 的 ICM 計算影響：** 在 BBA 環境下，每手牌的籌碼變化更大（底池更大），意味著單手牌的 ICM equity 波動也更顯著。使用 ICM 工具時，**必須在設定中啟用 BBA/Big Blind Ante 選項**，否則工具會低估底池大小，系統性地給出偏寬的 call range。

**ICM 最重要的特性（BBA 下更加顯著）：**
1. **非線性**：籌碼加倍不等於 ICM equity 加倍
2. **損失更痛**：輸掉 50% 籌碼損失的 ICM equity > 贏得 50% 籌碼獲得的 ICM equity。BBA 讓單手 all-in 的籌碼移動更大，這個不對稱性更強
3. **最大疊的邊際效益最低**：大疊再多贏籌碼，ICM 增幅遞減

### 為什麼大疊應該施壓但要選擇對象

**大疊的 BBA ICM 優勢：**
- 你不怕被淘汰（即使輸掉一半籌碼仍能生存）
- 對手害怕你（任何人對大疊的 all-in 都面臨被淘汰的風險）
- 你的 ICM 損失容忍度最高
- **BBA 讓你的每次 steal 收益更大**，施壓效率比無 ante 高 67%

**但大疊打短疊是 ICM 陷阱（BBA 強化了這個邏輯）：**

場景：5 人 FT，你是大疊（100bb），短疊（5bb）push all-in，你有 KJo。

Chip EV 說：輕鬆 call（你只拿出 5bb）
ICM 說：考慮清楚——你贏得 5bb 的 ICM 增幅很小，但如果你輸了（概率不低），你從大疊縮水，更重要的是「短疊沒有被淘汰」，你失去了讓他出局的機會。BBA 讓底池稍大（含 ante），但大疊此時的 ICM 分析邏輯不變。

**真正的答案：** 大疊應該打中疊（ICM 壓力最大的人），而不是浪費子彈在短疊身上。讓短疊被其他人淘汰更有效率。

---

## 二、10 人 FT 進場策略：各籌碼量的最優打法（BBA 版）

### 大疊進場策略（50bb+，相當於平均籌碼的 150% 以上）

**心態：你是桌上的霸主，但要智慧地使用優勢。BBA 讓每次行動的籌碼影響更大。**

**翻牌前策略：**
- Open range 比 bubble 時寬（ICM 壓力相對較低，FT 剛開始）
- 積極 3-bet 中疊，尤其是那些在 ICM 壓力下容易 fold 的玩家
- 避免對另一個大疊的無謂衝突
- 短疊推進：除非持有非常好的手牌（TT+、AJs+），否則考慮讓別人去 call
- **BBA 讓你的 steal 底池比無 ante 大 67%**，每次成功的 open/steal 都更有價值

**翻牌後策略：**
- 積極 c-bet，大疊的 c-bet 迫使中疊面臨「被淘汰」的考慮
- BBA 底池讓 c-bet 的絕對 size 更大，對中疊的心理壓力和實際籌碼壓力都更強
- 用 position 壓制 OOP 的中疊玩家
- Turn / River 的 barrel：對中疊可以 triple barrel（他們的 fold equity 最高）

**關鍵原則：施壓要選對象**
| 對象 | 施壓意願 | BBA 環境說明 |
|------|---------|-------------|
| 中疊 | 高 | ICM 壓力大，BBA 讓他們 fold 代價更高，fold 頻率更高 |
| 另一個大疊 | 低 | 互相消耗，BBA 讓單手牌的籌碼移動更劇烈，風險更大 |
| 短疊 | 視情況 | call 了你也贏不了多少；BBA 讓底池稍大，但 ICM 邏輯不變 |

### 中疊進場策略（20-50bb，相當於平均籌碼上下）

**心態：這是 FT 最難受的籌碼段——ICM 壓力最大，但又沒大到可以完全無視風險。BBA 讓每次冒險的籌碼代價更大。**

**你的核心目標：找到合適的 spot 翻倍，同時避免被大疊消滅。**

**翻牌前策略：**
- 對大疊：縮窄 open range（大疊的 3-bet 讓你陷入困境），尤其是 OOP 時
- 對其他中疊：可以維持正常 open range，偶爾 3-bet
- 對短疊：積極 iso-raise（把底池打成 HU，增加短疊被淘汰的機率）
- 避免 call 大疊的 open（Call 不打牌的位置）
- **BBA 讓中疊面對大疊的 open 時底池更大，call 的 SPR 更低，翻牌後被迫做出更大決策**

**翻牌後策略：**
- 面對大疊的 c-bet：沒有好的 equity 就 fold（ICM 保護中疊；BBA c-bet 絕對 size 更大）
- 積極使用 check-raise 當 bluff（對大疊的 range 有 equity 時才考慮）
- 對短疊的翻牌後積極取得底池控制

**尋找翻倍 spot（BBA 加成版）：**
- 等待大疊 limp 或 min-open，然後用好牌 3-bet jam（BBA 底池讓 jam 的 pot odds 更好）
- 利用短疊 all-in 之後的 side pot 機會
- 當大疊在 BTN 時，從 SB/BB 考慮 squeeze（BBA 讓 squeeze 底池更大，成功時收益更高）

### 短疊進場策略（<15bb）

**心態：你已進入 BBA push/fold 模式，ICM 讓你的 push range 比 bubble 時稍窄，但 BBA 讓 push EV 比無 ante 高。**

**為什麼 FT 短疊比 bubble 時稍窄？**
- bubble 時，所有比你多的人都有 ICM 壓力，願意 fold
- FT 時，大疊的 call range 更寬（他們不怕你的 5bb push）
- 但 BBA 讓你的 push 贏得更多（底池更大），部分抵消了這個不利因素

**FT 短疊各位置 BBA Push Range（15bb，假設 9-max 結構）：**

| 位置 | BBA Push Range | 無 ante Push Range（參考） | 備注 |
|------|---------------|--------------------------|------|
| UTG  | TT+, AJs+, AQo+ | TT+, AQs+, AKo | BBA 略寬，但早位仍緊 |
| UTG+1 | 99+, ATs+, AJo+, KQs | 99+, ATs+, AJo+, KQs | 近似 |
| MP   | 88+, A9s+, ATo+, KJs+, KQo | 88+, A9s+, ATo+, KJs+, KQo | BBA 邊界牌 ✓ |
| CO   | 77+, A6s+, A9o+, KTs+, KJo+, QJs | 66+, A7s+, A9o+, KTs+, KJo+ | BBA 略寬 |
| BTN  | 44+, A2s+, A6o+, K9s+, KTo+, Q9s+, JTs | 44+, A2s+, A7o+, K9s+ | BBA 加入更多 Ace |
| SB   | 33+, A2s+, A4o+, K8s+, KTo+, Q9s+, J9s+ | 33+, A2s+, A5o+, K8s+ | BBA 略寬 |

**注意：大疊在 BB 時，短疊 BBA push range 要收窄約 10-15%（因為大疊 call range 更寬，BBA 讓大疊的 pot odds 更好，call 更頻繁）。**

---

## 三、人數縮減時的策略調整（BBA 版）

### 10 → 8 人：第一個關鍵節點

**發生了什麼：**
- 兩個人已出局，獎金差距更真實
- 剩餘玩家的 ICM 壓力整體上升
- 短疊的 BBA push range 稍微收窄（大疊 call range 放寬）
- BBA 讓每手牌的籌碼移動更大，ICM 判斷更加重要

**BBA 底池計算（10,000/20,000/20,000 盲注）：**
- 起始底池 = 10,000 + 20,000 + 20,000 = **50,000**
- 每次成功 steal 贏得 50,000，比無 ante（30,000）多 67%

**策略調整：**
- 大疊：開始更積極地利用 BBA ICM 壓力，每次 steal 的 EV 更高
- 中疊：開始更謹慎地選擇 spot，感受每個名次跳幅的重量；BBA 讓 call 代價更高
- 關注是否有兩個差不多短的短疊在 FT 邊緣（讓他們互打）

### 8 → 6 人：ICM 壓力快速升溫

**ICM 壓力開始顯著（BBA 加速了這個過程）：**
- 獎金差距更大
- 折疊正確性上升（即使有些 Chip EV+ 的牌也應該 fold）
- 大疊的壓迫力更明顯；BBA 讓大疊每次 open 的底池更大，壓迫感更強

**這個階段的典型錯誤：**
中疊在此階段仍然用 9-max 的正常頻率 call 3-bet，導致被大疊消滅，錯失名次晉級機會。BBA 環境下這個錯誤代價更大（底池更大，一次失誤損失更多籌碼）。

**BBA 正確策略：**
- 6 人時，3-bet call off 的門檻要提高到 TT+ / AQ+（視籌碼深度）
- 大疊的 squeeze 和 3-bet 要更積極（BBA 讓 squeeze 底池更大，成功收益更高）
- 開始注意誰是最弱的玩家，讓他們先出局

### 6 → 5 人：接近獎金跳幅最大區

**5 人是整個 FT 最重要的節點之一（從 5th 到 4th 通常有大跳幅）。**

**BBA ICM 自殺的危險最高：**
- 許多玩家在 5 人時犯下 ICM 錯誤，只因為手牌「看起來夠強」
- BBA 環境下底池更大，「看起來划算的 call」的實際 ICM 代價更高
- 在 ICM 框架下，「夠強」的定義在 BBA 環境中比無 ante 更嚴格

**策略重點（BBA 版）：**
- 中疊應該更傾向於讓短疊先出局，而不是冒著風險 call 大疊
- 大疊應該積極製造 all-in 局面（BBA 讓 3-bet jam 的底池更大，施壓更有效）
- 短疊的 BBA push range 非常廣（需要 double up，BBA 讓 push EV 更高）

### 5 → 4 人：獎金差距最劇烈的時刻

**4 人 FT 可能是整場比賽 ICM 壓力最高的點：**
- 每個出局都有顯著的名次和獎金差距
- 「第 4 名出局」意味著離前 3 更近，但誰先出局？
- **BBA 讓每手牌的籌碼移動更大，4 人 FT 的每個決策都更關鍵**

**4 人 BBA FT 完整 ICM 計算示例：**

盲注：5,000/10,000，**BBA 10,000**（起始底池 = 25,000）
獎金：1st $5,000 / 2nd $3,000 / 3rd $2,000 / 4th $1,000

籌碼分佈：
- 玩家 A（你）：120,000（40%）
- 玩家 B：90,000（30%）
- 玩家 C：60,000（20%）
- 玩家 D：30,000（10%）
- 總籌碼：300,000

**當前 ICM Equity 計算（近似值，BBA 工具輸出）：**
```
玩家 A（40%）≈ $3,015
玩家 B（30%）≈ $2,500
玩家 C（20%）≈ $1,985
玩家 D（10%）≈ $1,500
```

**情境：玩家 B 對你 push all-in 90,000，你有 AJo（勝率 ~55%）：**

```
BBA 起始底池 = 25,000（已在底池中）
主底池 = A call 90,000 + B push 90,000 + 起始底池 25,000 = 205,000

Call：
  贏（55%）：A = 120,000 + 90,000 + 起始底池貢獻 = 210,000（70%）
    ICM Equity ≈ $3,900
  輸（45%）：A = 30,000（10%）
    ICM Equity ≈ $1,500

Call EV = 55% × $3,900 + 45% × $1,500
        = $2,145 + $675 = $2,820

Fold EV = $3,015（維持現狀）
```

**結論：Fold！即使 55% 勝率，fold 的 ICM EV 高出 $195。**

BBA 環境下（vs 無 ante）：底池更大，籌碼移動更劇烈，ICM EV 的 fold vs call 差距可能更大。BBA ICM 工具（HRC/ICMIZER BBA 模式）會顯示更準確的數字。

### 4 → 3 人：三人局的特殊動態

**三人局（Three-handed）是 MTT 最微妙的局面之一：**
- ICM 仍然非常重要
- BTN、SB、BB 的輪換節奏快（每人每 3 手就要貼一次大盲 + ante）
- **BBA 讓 3 人局的盲注成本更高**（每手付出 1bb BB + 1bb ante = 2bb），籌碼消耗更快
- 短疊被淘汰後，兩人直接進入 HU

**三人 BBA 策略核心：**
- BTN（≈SB）：廣泛 open，BBA 讓 steal 底池更大，收益更高
- SB（≈BTN）：積極，但不要過分暴露；BBA ICM 壓力仍然存在
- BB：積極 defend，利用位置優勢；BBA 讓你已投入更多（BB + ante），defend 標準略低
- 避免「夾三明治」：不要在 BTN push 和 BB 已 call 時過分行動

**3 人 BBA ICM 邊緣計算：**

你在 BTN，有 ATo，SB（中疊）raise，BB（短疊）call，你面對 squeeze 情況。BBA 底池已相當大，jam 的 pot odds 在 BBA 環境下更好，但 ICM 仍然要求謹慎。

### 3 → 2 人：進入 HU，ICM 消失，BBA 讓 HU push 更廣

當第 3 名出局，ICM 立刻歸零，切換到純 Chip EV 決策。

**這個切換點非常重要（BBA 環境下尤其如此）：**
- 很多玩家習慣了 FT 的保守 ICM 思維，進入 HU 後仍然「保守」
- 這是大錯誤——HU 需要積極、廣範圍的打法
- **BBA HU push range 比無 ante HU 更廣**：HU SB（BTN）push range 在 BBA 環境下幾乎是任意兩張牌（在 10bb 以下）

**BBA HU SB Push Range 參考（純 Chip EV）：**

| Stack | SB BBA Push Range |
|-------|------------------|
| 10bb | ~90%+ |
| 8bb | ~95%+ |
| 6bb | 幾乎任意兩張牌 |

HU 時 ICM 消失，BBA 的底池更大讓 push 更有吸引力。不要把 FT 的 ICM 思維帶入 HU。

---

## 四、大疊的責任：積極施壓，選擇正確對象（BBA 版）

### 大疊的 BBA ICM 核心優勢

在 FT，大疊擁有三個 9-max 常規牌局不存在的優勢，BBA 進一步強化了這些優勢：

1. **ICM 免疫性**：大疊被中疊 call 並輸掉，損失的 ICM equity 相對有限
2. **恐嚇力**：任何人面對大疊的全下，都面臨被淘汰的威脅；BBA 讓底池更大，全下的籌碼壓力更強
3. **時間壓力**：短疊和中疊都有「活下去」的迫切需求，大疊沒有；BBA 加快了盲注消耗，短疊/中疊壓力更緊

**BBA Steal EV 分析（FT 環境）：**

```
盲注 10,000/20,000，BBA 20,000
大疊 BTN push steal 成功：
  BBA 底池贏得 = 10,000 + 20,000 + 20,000 = 50,000
  無 ante 底池贏得 = 10,000 + 20,000 = 30,000
  BBA 每次成功多贏 = 20,000 chips（+67%）
```

在 FT 持續 100+ 手牌中，這個累積效果讓大疊更容易保持和擴大優勢。

### 選擇正確對象的策略（BBA 版）

**打中疊（30-60% 平均籌碼）：**
- 中疊的 ICM 壓力最高——他們知道出局就是「ICM 自殺」
- 中疊的 fold equity 最高，你的 steal 成功率最高
- BBA 讓中疊更不願意 call（底池更大，call 代價更高）
- 在 CO/BTN 時，對 SB/BB 的中疊積極 open raise
- 在 BTN 看到中疊 limp，直接 isolate raise

**避免打另一個大疊（BBA 強化了這個原則）：**
- 兩個大疊對決，對其他玩家是免費的 ICM 福利
- BBA 讓大疊 vs 大疊的單手牌籌碼移動更大，對決結果更劇烈
- 大疊 vs 大疊的 3-bet 戰，輸家變成中疊，立刻在 BBA ICM 壓力下掙扎
- 除非你有明顯的 range advantage 和 nut advantage，否則讓大疊繼續共存

**對短疊的正確處理（BBA 版）：**
- 不要用廣 range 去 call 短疊的 push（你贏得少，BBA 讓底池略大，但原則不變）
- 當短疊 push 的 BBA pot odds 超過 2:1，且你有可觀的勝率（ATo+、TT+），可以 call
- 讓其他中疊去 call 短疊——他們才是更需要「拿下一個名次」的人

### 大疊的翻牌後 BBA 施壓技巧

**壓制中疊 IP 的 C-bet 策略（BBA 底池更大）：**
- 翻牌 c-bet：高頻率（70-80%），size 選 33-50%（BBA 底池更大，絕對 size 更高，讓中疊面臨 fold or commit 的困境）
- Turn：對不靠近對手 range 的牌面繼續 barrel，size 加大（60-75%）
- River：有強牌全 value，有 bluff 選最好的 blocker
- BBA 讓整條街的底池都更大，每次 bet 的絕對壓力更強

**對中疊的 3-bet 頻率（BBA 加成）：**
- 在 CO/BTN 3-bet 中疊的 UTG/MP open：範圍要比無 ante 時更廣
- BBA 讓 3-bet 底池更大，成功 steal 的 EV 更高
- 中疊在 FT 的 fold to 3-bet 率通常高達 70-80%（ICM 讓他們更謹慎，BBA 讓他們更不敢 call）

---

## 五、中疊的生存藝術（BBA 版）

### 中疊的 BBA 困境

FT 中疊是最難打的位置，BBA 進一步加劇了這個困境：
- 足夠多的籌碼讓你不想「白白輸掉」
- 不夠多的籌碼讓你可以完全無視風險
- 最高的 ICM 壓力（相對於你的財務狀況）
- **BBA 讓每次冒險的底池更大，一次失誤損失更多籌碼**

### 避開大疊：主要策略原則（BBA 版）

**面對大疊 Open（BBA 底池更大）：**
- 縮窄 3-bet range（除非有很強的手牌：QQ+、AK，視情況 KK+）
- 傾向 fold 邊緣牌（KJo、QJs 在這裡可能是 fold）
- Call 3-bet 後仍需有良好的可發揮性（suited connectors 比 AT off 更好）
- BBA 讓 call 後的底池更大，翻牌後面對 c-bet 的壓力更強，call 的要求更高

**面對大疊在你 BB 時的 raise：**
- 正常 call range 可以維持（你已投入 BB + ante，pot odds 合理）
- 但翻牌後要謹慎，不要在沒有 top pair 以上時多街對抗
- BBA 讓你的 BB + ante 投入更多（2bb 而非 1bb），稍微降低了 call 的 pot odds 需求

### 找 Spot 翻倍：積極但選擇性（BBA 版）

**最好的 BBA 翻倍 spot：**

1. **其他玩家的 squeeze 機會**：大疊 open + 中疊 call → 你可以 squeeze jam（BBA 讓 squeeze 底池更大，成功 EV 更高）
2. **對短疊的 iso-raise**：短疊 limp 或小 raise，你 isolate 並建立 HU 底池（BBA 讓 iso 底池更大，短疊出局後收益更多）
3. **大疊 limp BTN**：有時大疊會 limp BTN 去「慢玩」，此時你在 SB/BB 有機會 jam 或 raise（BBA 底池讓 jam 的 pot odds 更好）
4. **位置優勢 + 強牌**：在 BTN/CO 時，遇到中疊的 open，3-bet jam 是好選擇（BBA 底池讓 3-bet jam 的 fold equity 收益更高）

### 利用短疊的 ICM 屏障（BBA 版）

**短疊是中疊的「人肉盾牌」（BBA 讓這個屏障更有價值）：**

場景：5 人 FT，你是中疊（35bb），還有兩個短疊（各 10bb）。

大疊開 raise，你要 fold 的頻率應該更高，因為：
- 你出局是 5th，但如果你 fold 並讓短疊先出局，你就是 4th
- 短疊先走一個，你從 5th 直接晉升 4th，不費一顆籌碼
- BBA 讓短疊的盲注消耗更快，他們更可能在你等待期間 blind off

**這稱為「ICM 屏障效應」：短疊的存在讓中疊可以更謹慎。BBA 加快了短疊的消耗，讓這個屏障效應持續時間更短但每一刻更有價值。**

---

## 六、短疊的 BBA Nash Push/Fold 策略

### Push/Fold 模式的觸發點（BBA 版）

當你的籌碼低於 15bb，FT 的 push/fold 策略開始主導：

- **15bb 以下**：大多數情況下應該 push or fold（不要 min-raise + fold）
- **10bb 以下**：幾乎全部 push or fold
- **7bb 以下**：完全 push or fold，幾乎無例外
- **BBA 加快了這個進程**：每手牌付出 2bb（BB + ante），從 15bb 縮水到 10bb 只需 2-3 手不行動

### FT 各位置的 BBA Push Range（10bb 深）

**注意：以下 range 已考慮 FT ICM 因素，比 bubble 時稍窄，但比無 ante 版本稍寬（BBA 效益）。**

**UTG（9-max FT，BBA）：**
- 推薦 push：TT+, AJs+, AQo+
- BBA 邊緣牌（ICM 壓力高時需謹慎）：99, ATs, AQo（BBA 讓這些稍微更值得 push）
- 無 ante 版本：TT+, AQs+, AKo（BBA 略寬）

**UTG+1（BBA）：**
- 推薦 push：99+, ATs+, AJo+, KQs
- BBA 邊緣：88, A9s, KQo（BBA 讓 KQo 從邊界進入 push 範圍）

**MP（BBA）：**
- 推薦 push：88+, A9s+, ATo+, KTs+, KJo+
- BBA 邊緣：77, A8s, KTo（BBA 讓 KTo 進入考慮範圍）

**CO（BBA）：**
- 推薦 push：66+, A5s+, A8o+, KTs+, KJo+, QJs
- BBA 邊緣：55, A4s, QJo, A7o（BBA 讓更多 Ace 進入）

**BTN（BBA）：**
- 推薦 push：44+, A2s+, A6o+, K9s+, KTo+, Q9s+, QTo+, J9s+
- BBA 邊緣：33, A5o, K9o, JTo（BBA 讓 33 和更多邊界牌 ✓）

**SB 面對 BB only（BBA）：**
- 推薦 push：33+, A2s+, A4o+, K8s+, KTo+, Q9s+, J9s+, T8s+
- BBA 邊緣：22, A3o, K9o, 98s（BBA 讓這些邊界牌更值得 push）
- 無 ante 版本各項均略窄

### Call Range（面對 push，BBA 版）

**你在 BB，面對各位置的 push（你有 12bb），BBA 環境：**

| 對手位置 | BBA Call Range | 無 ante Call Range（參考） |
|---------|---------------|--------------------------|
| UTG     | JJ+, AK（非常緊）| JJ+, AK |
| UTG+1   | TT+, AQs+, AKo | TT+, AQs+, AKo |
| MP      | 99+, ATs+, AQo+, KQs | 99+, ATs+, AQo+ |
| CO      | 77+, A9s+, AJo+, KQs | 77+, A9s+, AJo+, KQs |
| BTN     | 55+, A5s+, A9o+, KTs+, KQo, QJs | 55+, A5s+, A9o+, KTs+, KQo |
| SB      | 44+, A3s+, A7o+, K9s+, KJo+, QTs+ | 44+, A3s+, A7o+ |

**BBA call range 比無 ante 略寬（1-2%），因為 BBA 底池讓 pot odds 略好。**

**重要：大疊在 BB 時，你的 BBA push range 要收窄（因為大疊 BBA call range 更寬）。** 大疊在 BBA 環境下的 pot odds 更好，call 更頻繁。你的 push range 應比大疊在 BB 的無 ante 版本更窄 10-15%。

### BBA FT 短疊心態：不是「求生」，而是「找機會」

很多短疊玩家在 FT 犯了「求生存」的錯誤：
- 等待「更好的牌」而錯過 push 機會
- 從 10bb 縮水到 5bb，push range 雖然更廣但期望值更低
- **BBA 讓這個問題更嚴重**：每手牌消耗更多 bb，從 10bb 到 5bb 可能只需 2-3 手不行動

**BBA FT 短疊正確心態：在 10-15bb 時積極尋找 BBA push spot，而不是等到 5bb 時才開始行動。BBA 底池讓 push 的 fold equity 收益最大化，應充分利用。**

---

## 七、FT 偷盲策略（BBA 版）

### 哪些位置偷盲最有效

FT 的偷盲在 BBA 環境下比無 ante 更有價值，因為：
1. 大盲注相對更大（盲注結構進展快）
2. 對手因 ICM 壓力 fold 更頻繁
3. **BBA 讓每次 steal 成功的底池比無 ante 大 67%**
4. 每次 steal 都是純利，BBA 讓這個純利更高

**最有效的偷盲位置（BBA 版）：**

| 位置 | 偷盲效率 | BBA 說明 |
|------|---------|---------|
| BTN  | 最高 | 只需對 2 人，BBA 底池最大，收益最高 |
| CO   | 高 | 只需對 3 人，有效；BBA 讓成功收益更高 |
| SB   | 中高 | 只需對 BB，但 OOP；BBA 讓 SB push 更有利 |
| MP   | 中 | 對 4+ 人，需要緊縮；BBA 不改變多人通過的困難度 |
| UTG  | 低 | 面對整桌，只用強牌 |

### 何時避免偷盲（BBA 環境的特殊考量）

以下情況應該減少偷盲頻率：

1. **大疊在 BB**：大疊的 BBA 3-bet 讓你陷入更大底池的困境，且他們 ICM 壓力低，願意對抗
2. **BB 是「危險」的中疊**：有些中疊玩家在 FT 開始反常地積極，BBA 讓他們的 3-bet 底池更大，對你威脅更強
3. **剛剛偷盲失敗**：連續失敗後，你的 steal range 被對手識破，應暫停幾手
4. **底池賠率讓短疊不得不 call**：短疊的 BB 只剩 3-5bb，他幾乎必須 call 任何 raise；BBA 讓他的 pot odds 更好，call 概率更高

### FT 偷盲的 BBA Sizing

**FT BBA 環境的 open size 策略：**
- 一般 open：2-2.5bb（最常見，節省籌碼；BBA 底池已夠大，不需要更大的 raise）
- 深疊或強牌：3bb（可以建立更大的底池）
- 短疊時 push：all-in（沒有其他選項，BBA 讓 push 的 fold equity 更高）

**BBA Sizing 的 ICM 考量：**
- 大 raise（3.5bb+）commit 了更多籌碼，BBA 底池更大，輸了 ICM 損失更大
- 小 raise（2bb）讓對手有更好的 pot odds call，但你節省了籌碼；BBA 讓對手的 pot odds 已經夠好，小 raise 效果有限
- **BBA 平衡點：2-2.2bb 是 FT steal 的標準**，與無 ante 相同，但 BBA 讓這個 size 贏得更多（底池更大）

---

## 八、關鍵 Spot 分析：BBA 具體計算

### Spot 1：三人剩餘，BBA 籌碼完整計算

**情境：3 人 FT，獎金 1st $6,000 / 2nd $3,500 / 3rd $2,000**
盲注：5,000/10,000，**BBA 10,000**（起始底池 = 25,000）

籌碼：
- 玩家 A（你）：150,000（37.5%）
- 玩家 B（短疊）：80,000（20%）
- 玩家 C（大疊）：170,000（42.5%）
總籌碼：400,000

**ICM Equity 計算（BBA 工具）：**

```
玩家 A 的 ICM：
1st prob = 37.5% → 貢獻 37.5% × $6,000 = $2,250

2nd prob = P(B 1st, 再 A beats C) + P(C 1st, 再 A beats B)
= (20% × A/(A+C)) + (42.5% × A/(A+B))
= (20% × 150/320) + (42.5% × 150/230)
= (20% × 46.9%) + (42.5% × 65.2%)
= 9.38% + 27.7% = 37.1%
→ 貢獻 37.1% × $3,500 = $1,299

3rd prob = 1 - 37.5% - 37.1% = 25.4%
→ 貢獻 25.4% × $2,000 = $508

玩家 A ICM Total ≈ $2,250 + $1,299 + $508 = $4,057
```

**現在玩家 B push all-in 80,000，到你（A）：**

BBA 起始底池 = 25,000（已在底池）
假設你有 ATo，對 B 的 BBA range（55+, A5s+, A8o+, KTs+）勝率 ~57%。

```
Call（BBA 底池更大）：
  贏（57%）：A = 230,000, B = 0, C = 170,000
    → 2 人 ICM（A 57.5%, C 42.5%）
    → A equity = 57.5% × $6,000 + 42.5% × $3,500
    = $3,450 + $1,487.5 = $4,937.5

  輸（43%）：A = 70,000, B = 160,000, C = 170,000
    → 重算 ICM（A 17.5%, B 40%, C 42.5%）
    → A 的新 ICM ≈ $2,830（A 變短疊，B 變大疊）

Call EV = 57% × $4,937.5 + 43% × $2,830
        = $2,814 + $1,217 = $4,031

Fold EV = $4,057（BBA 環境下維持現狀，底池消耗稍快）
```

**BBA 結論：Fold 略優（$4,057 vs $4,031），差距很小。**

ATo 在 BBA FT 這裡是邊緣牌——call 也可以（差距非常小），但 fold 是稍優的選擇。BBA 工具（HRC BBA 模式）的輸出可能略有不同，建議以工具計算為準。

### Spot 2：短疊 all-in，你是中疊，要不要 iso-raise 大疊？（BBA 版）

**情境：5 人 FT，獎金 1st $8,000 / 2nd $5,000 / 3rd $3,500 / 4th $2,500 / 5th $1,500**
盲注：3,000/6,000，**BBA 6,000**（起始底池 = 15,000）

籌碼：
- 大疊：200,000
- 中疊（你）：120,000
- 短疊 D：30,000（push all-in）
- 玩家 E：80,000
- 玩家 F：70,000

**短疊 D push 30,000 all-in，折疊到你（中疊，120,000）。你有 KQs。**

**BBA 底池分析：**
- 起始底池（BBA）= 15,000
- D push = 30,000
- 總主底池 = 15,000 + 30,000 = 45,000

**選項 A：直接 call（flat call 30,000）**
- 進入主底池和其他可能跟進的玩家
- BBA 底池讓 call 的 pot odds 略好（15,000 起始）

**選項 B：Iso-raise（raise 到 90-100,000 讓大疊 fold）**
- 建立 HU side pot，讓短疊必須單獨面對你
- BBA 底池讓 iso 成功時的 side pot 更大

**選項 C：Fold**

**BBA ICM 分析：**

選項 B（iso-raise）看似好，但存在問題：
1. 如果大疊 call 你的 iso-raise，你現在 commit 了大量籌碼，且還有 side pot；BBA 讓總底池更大，風險更高
2. 即使 D 出局，你和大疊的 side pot 仍可能讓你出局
3. 如果大疊 fold 並你贏了 D：你成功 iso，但你的 KQs vs D 的 BBA range 勝率可能只有 55-60%

**ISO-raise 是否值得（BBA 版）？**
- 關鍵因素：大疊的 BBA call range（BBA 讓大疊 pot odds 更好，call 更容易）
- 如果大疊在 BTN 且 ICM 壓力讓他謹慎，iso 成功率更高
- **BBA 一般建議：用 iso-raise 當大疊在 OOP 且是謹慎玩家時，對激進大疊更傾向 fold 或 flat call**

### Spot 3：大疊 vs 中疊，中疊的 BBA 正確應對

**情境：4 人 FT，獎金 1st $10,000 / 2nd $6,000 / 3rd $4,000 / 4th $2,500**
盲注：5,000/10,000，**BBA 10,000**（起始底池 = 25,000）

籌碼：
- 大疊 A：180,000
- 你（中疊）：90,000
- 短疊 C：50,000
- 短疊 D：30,000

**你在 CO，大疊 A 在 BTN，open raise 2.5bb = 25,000（BBA 底池起始已 25,000，A raise 後底池更大）。你有 QJs。**

**BBA ICM 框架下的分析：**

QJs 是非常可玩的牌，但此情境有幾個 BBA ICM 考量：
- 如果你 3-bet 被 call，BBA 底池讓翻牌後你可能 commit 到非常大比例的籌碼
- 如果你 call 並 flop 好牌，你可能進入大 BBA 底池，風險升高
- 如果你 fold，你保護了自己的中疊地位，等短疊先出局

**BBA 建議策略：**
- 在 FT 4 人時，QJs vs 大疊 = **Fold**（BBA ICM 保護中疊，底池更大更危險）
- 如果是 3 人（BB + 你 + 大疊），QJs 的 call 更合理（BBA pot odds + 名次不那麼 critical）

**中疊應對大疊的 BBA 通用原則：**

| 手牌強度 | 建議行動 | BBA 特別說明 |
|---------|---------|------------|
| AA, KK  | 3-bet jam（不討論）| BBA 讓底池更大，jam 收益更高 |
| QQ, JJ  | 視籌碼深度：3-bet or call | BBA 讓 3-bet 底池更大 |
| TT, 99  | Call（不 3-bet，避免大疊 4-bet）| BBA 讓 4-bet 困境更大 |
| AK      | 3-bet（強牌，值得面對大疊）| BBA 加持 |
| AQs     | 視情況 call 或 3-bet（fold 也可以接受）| BBA 讓邊界更傾向 fold |
| AQo     | Fold（BBA ICM 壓力下，AQo vs 大疊 = 問題牌）| BBA 加重了 fold 傾向 |
| 其他    | Fold（保護中疊地位）| BBA 底池更大，保守更合理 |

---

## 九、FT 常見錯誤（BBA 版）

### 錯誤 1：把 FT 當作普通的 9-max 牌局

**具體例子：**
你是中疊（40bb），在 MP 開 raise KJo。CO 的中疊 3-bet。你 4-bet 或 call。

**BBA 環境下的問題：**
在 FT，KJo 面對中疊的 3-bet 應該直接 fold，因為：
- 你輸掉這手牌變成短疊，ICM equity 大幅下降
- BBA 讓 3-bet 後的底池更大，繼續打下去的籌碼風險更高
- 對手的 3-bet range 通常不包含很多你能「贏到」的手牌
- Fold 保存了你的中疊地位，讓短疊先出局的期望更高

**BBA 修正：** FT 所有決策都應該問「這對我的 ICM equity 是正還是負？」在 BBA 環境下，每手牌的潛在籌碼移動更大，這個問題的答案更傾向於保守。

### 錯誤 2：ICM 自殺——用 Chip EV+ 的牌做 ICM EV- 的決定（BBA 強化版）

**具體例子：**
4 人 FT，你是中疊（60bb），短疊（8bb）push all-in，盲注 5,000/10,000，BBA 10,000。你有 A9o，勝率約 60%。

**BBA Chip EV 說：** Call（60% 勝率，正 EV；BBA 底池更大，EV 更高）

**BBA ICM 說：** 折疊！原因在 BBA 環境下更強：
- 如果你 call 並贏，你從 60bb 變成 68bb，ICM equity 增加有限
- 如果你 call 並輸，你從 60bb 變成 52bb，ICM equity 顯著下降（且短疊活著）
- BBA 讓輸掉後的籌碼損失更大（底池更大，移動更多）
- Fold 後，短疊可能被大疊 call 並淘汰，你不費一顆籌碼就升名次

**BBA 修正：** 中疊對短疊的 push，call 門檻要比 Chip EV 計算高得多（ATo+、TT+）。BBA 環境下這個門檻比無 ante 略高，因為底池更大讓每次 call 的籌碼風險更大。

### 錯誤 3：大疊打另一個大疊（無謂衝突；BBA 讓代價更大）

**具體例子：**
5 人 FT，大疊 A（100bb）和你大疊 B（90bb）都在，還有兩個中疊和一個短疊。

大疊 A open raise BTN，你在 BB 有 KQs，3-bet。A 4-bet，你 5-bet jam。

**BBA 環境下的問題：**
- 即使你有 60% 勝率（KQs vs A 的 4-bet range），輸了你變中疊
- BBA 讓每步底池更大，jam 的籌碼移動比無 ante 更劇烈
- 輸了讓大疊 A 成為絕對主導，其他玩家的 ICM equity 大漲
- KQs 面對 4-bet 的實際勝率可能只有 45%（A 的 4-bet range 有很多 AA/KK）

**BBA 修正：** 大疊 vs 大疊，非 AA/KK 不要過分衝突。BBA 讓單手牌的籌碼移動更大，這個原則比無 ante 環境更加重要。

### 錯誤 4：短疊等太久才 push（BBA 讓問題更嚴重）

**具體例子：**
短疊在 15bb 時因為「等更好的牌」，從 15bb 縮水到 7bb，然後才開始積極 push。

**BBA 環境下的問題：**
- 15bb 時的 BBA push range 最廣、期望值最高（有折疊股權 + BBA 底池更大）
- 7bb 時雖然 range 仍然廣，但對手的 call 頻率更高（BBA pot odds 更好）
- **BBA 讓每手牌消耗更多 bb**（BB + ante = 2bb），從 15bb 到 7bb 可能只需 4 手不行動
- 每次 blind off 都是直接的 ICM equity 損失，BBA 讓這個損失更快積累

**BBA 修正：** 在 15bb 及以下，立刻進入積極 BBA push 模式，不要等待「完美手牌」。BBA 底池讓主動 push 的 EV 更高，等待的代價也更大。

### 錯誤 5：偷盲策略固定化（BBA 版）

**具體例子：**
玩家每次 BTN 都 open raise，對手很快識別並開始 3-bet，導致 BTN 的 open range 被利用。

**BBA 環境下的問題：**
- 固定的偷盲頻率讓對手可以調整
- BBA 底池讓對手的 3-bet 成功時收益更大，對手更有動機 3-bet
- 對某些對手，你需要「暫停偷盲」讓他們放鬆警戒

**BBA 修正：** 偷盲要有變化——偶爾 BTN limp，偶爾 3x open，偶爾 fold BTN 強牌讓對手誤判。BBA 讓你的偷盲底池更大，更值得用混合策略保護。

### 錯誤 6：三人時沒有正確 BBA ICM 計算，過早接受不公平 deal

**具體例子：**
3 人 FT，你是大疊（50%），其他兩人各有 25%。

對手提出「三人平分剩餘獎金」的提議。你同意了。

**BBA 環境下的問題（ICM 計算相同，但 BBA 讓你的籌碼更有攻擊性）：**
- 你的 ICM equity 作為 50% 大疊遠高於三分之一
- 平分對你不公平，你放棄了大疊的優勢
- BBA 讓大疊在 3 人局的每次偷盲收益更高，實際上的大疊優勢更大

**BBA ICM 計算顯示（以 $11,500 剩餘獎金為例）：**
```
平分：每人 $3,833

BBA ICM Deal（正確）：
  大疊（50%）：約 $5,200（BBA 環境大疊優勢更大）
  中疊（25%）：約 $3,400
  短疊（25%）：約 $2,900
```

你接受平分損失了約 $1,367！**在 BBA 環境下，大疊的實際籌碼優勢因為每手牌的 steal 收益更高，ICM 計算可能對大疊更有利。建議使用 HRC BBA 模式計算精確的公平 deal 數字。**

### 錯誤 7：使用無 ante ICM 工具計算 BBA FT 決策

**這是 BBA 環境中的根本性錯誤。**

具體表現：
- 使用不支援 BBA 的 ICM 計算器
- 在 HRC/ICMIZER 中忘記啟用 BBA 選項
- 複製網上的「標準 FT ICM 計算」（通常是無 ante 版本）

**BBA 修正：** 所有 FT ICM 計算必須使用 BBA 版工具，確認底池計算包含 ante（例：10,000/20,000 時顯示底池 50,000，而非 30,000）。工具設定確認後，所有 push/fold 和 call/fold 的 ICM EV 計算才是 BBA 環境下的正確答案。
