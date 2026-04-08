# ICM 調整：Push/Fold 的獎金結構修正（BBA 標準）

## BBA 環境下的 ICM 基礎

Nash 均衡計算的是 Chip EV 最優。當獎金結構存在時，ICM 會改變最優策略。本章所有 ICM 計算均以**Big Blind Ante（BBA）**為預設底池大小。

**BBA 對 ICM 的關鍵影響：**

在 BBA 環境下，每手牌的底池起始值更大（SB + BB + BB ante）。這直接放大了 ICM 風險：

- **傳統無 ante 底池**（100/200）：底池 = 300，每手牌的籌碼移動相對較小
- **BBA 底池**（100/200/200）：底池 = 500，每手牌的籌碼移動更大

底池更大意味著每手牌潛在的籌碼損失更大，ICM 壓力在 BBA 環境下比無 ante 結構**更為顯著**。特別是在 bubble 和 FT 場景中，每次 push 或 call 的 ICM 代價都要用 BBA 底池大小來計算。

**核心機制：**
- 失去籌碼的 ICM 代價 > 贏得同量籌碼的 ICM 收益
- BBA 放大了底池，也放大了這個不對稱性
- 因此，在關鍵節點，即使 Chip EV 是正的，ICM EV 可能是負的，而且這個現象在 BBA 環境下比無 ante 更早出現

**縮緊幅度取決於：**
1. 你距離 money 有多近（bubble 最大）
2. 獎金結構的陡峭程度（FT 名次差距越大，影響越大）
3. 你的相對籌碼量（中疊受影響最大）
4. BBA 底池大小（底池越大，ICM 考量越迫切）

---

## Bubble 三種角色（BBA ICM 分析）

### 角色一：大疊（Chip Leader / Near Chip Leader）

**ICM 壓力：最小，但 BBA 讓施壓更有利**

大疊在 bubble 的優勢：
- 輸一場不會出局，只是籌碼減少
- 對所有人都有威脅，中疊/短疊不願意面對你
- 可以積極偷盲，逼迫中疊和短疊 fold
- **BBA 讓每次 steal 的底池收益更大（2.5bb vs 1.5bb 無 ante）**，偷盲效率提升

**BBA 環境下大疊的策略調整：**
- Push range 比 Nash **稍微放寬**（因為即使輸，ICM 損失相對小；BBA 讓 fold equity 更大）
- 積極針對中疊（他們 ICM 壓力最大，BBA 讓他們面對 push 時更不願意 call）
- 對短疊更謹慎（短疊 push 的手牌品質較好，BBA 讓底池賠率略有利於對手，但影響有限）

**大疊 BBA steal EV 計算範例（bubble，10bb 大疊 push 15bb steal，SB/BB 均為中疊）：**

```
BBA 底池（起始）= SB 0.5bb + BB 1bb + BB ante 1bb = 2.5bb
Fold equity 收益 = 2.5bb（明顯高於無 ante 的 1.5bb）
BBA push EV 增幅 ≈ 67%（相對於無 ante）
```

### 角色二：中疊（Middle Stack）

**ICM 壓力：最大，BBA 進一步強化了保守策略**

中疊在 bubble 的困境：
- 跟注 all-in 可能嚴重損害籌碼，接近短疊甚至出局
- 不能如大疊般輕鬆冒險
- 距離 money 很近，但還沒進
- **BBA 讓每次被 call 的底池更大，輸了損失的籌碼也更多**

**BBA 環境下中疊的策略調整：**
- Push range 縮緊最多（相比 BBA Nash 可能縮緊 10-15%）
- Call range 非常保守（只 call AA/KK/AK 級別的手牌面對大疊 push）
- 主動 push 時要看清楚周圍籌碼分佈：短疊在後位時，push 風險更高
- BBA 環境下中疊的「call 成本」更高，因為底池更大，一旦 call 被贏走的籌碼更多

### 角色三：短疊

**ICM 壓力：反而降低，BBA 讓 push 更積極**

短疊在 bubble 的邏輯：
- 即使謹慎，盲注也快把你吃光（BBA 讓每手牌的盲注成本更高：付出 1bb BB 時，還要再付 1bb ante）
- 積極 push 才有翻盤機會
- 被 call 輸了，ICM 損失有限（你已經接近出局）
- **BBA 讓短疊的 push EV 更高（贏得更大底池）**，積極 push 的理由更充分

**BBA 環境下短疊的策略調整：**
- Push range 採用 BBA Nash 版本（比無 ante Nash 寬 3-5%）
- 雖然被 call 輸了可能直接出局，但 BBA 底池讓 push EV 補償了這個風險
- 面對大疊的 push，call range 更緊（輸了直接出局）
- 短疊 bubble push 的最優時機：BBA 底池更大，在有 fold equity 的位置（BTN/CO/SB）積極 push

---

## Bubble ICM 場景計算（BBA 版本）

**場景：** 100 人 MTT，10 人 bubble，11 人進錢

獎金結構：1st $5,000 / 2nd $3,000 / 3rd $2,000 / ... / 11th $200

籌碼分佈（10 人剩）：
- 大疊：120,000
- 中疊 A：45,000
- 中疊 B：38,000
- 短疊：12,000
- 其餘 6 人：平均約 35,000

盲注：1,000/2,000，**BBA：2,000**（起始底池 = 5,000）

**場景：大疊對中疊 A All-in，中疊 A 勝率 55%**

Chip EV 說：call（+EV）

BBA ICM 計算（底池包含 BBA）：
- 中疊 A 現在 ICM equity：約 $310
- 贏了（55%）：65,000 → ICM equity 約 $480
- 輸了（45%）：出局 $0

```
Call EV = 55% × $480 + 45% × $0 = $264
Fold EV ≈ $310
```

**應該 fold**，即使有 55% 勝率。

BBA 環境下的額外考量：底池更大（5,000 起始 vs 無 ante 的 3,000），這意味著大疊的每次 raise/push 讓中疊面對更大的底池壓力，ICM EV 的 fold vs call 差距實際上比無 ante 環境**更大**（因為籌碼損失幅度更高）。

### BBA Bubble ICM 速算指南

在 bubble 快速判斷是否值得 call 的 BBA 版本原則：

1. **中疊 vs 大疊 all-in**：幾乎從不 call，除非 AA/KK（BBA 底池更大，call 的風險更高）
2. **中疊 vs 中疊 all-in**：需要 60%+ 勝率才考慮 call（BBA 底池增加了 call 的籌碼移動幅度）
3. **中疊 vs 短疊 push**：AJo+/TT+ 以上才考慮 call（BBA 讓底池賠率略好，但 ICM 代價也更大）
4. **大疊 call 短疊 push**：BBA 底池讓大疊的 pot odds 更好，call 門檻略低，但仍需注意讓短疊活著的 ICM 成本

---

## Final Table ICM 調整（BBA 版本）

FT 的 ICM 壓力與 bubble 類似，但名次差距可能更大。BBA 在 FT 的影響尤為顯著：每手牌的底池更大，意味著 FT 每一次 push/call 的籌碼風險比無 ante 環境高約 67%。

**FT 各人數的 ICM 壓力（BBA 環境）：**

| 剩餘人數 | ICM 壓力 | BBA 額外影響 | 策略重點 |
|---------|---------|------------|---------|
| 9-7 人 | 中等 | 底池更大，每手牌 ICM 風險稍高 | 積累籌碼仍重要，但開始注意 ICM |
| 6-5 人 | 增加 | BBA 讓每手牌的籌碼移動更顯著 | 名次差距開始顯著，中疊要謹慎 |
| 4-3 人 | 高 | BBA ICM 壓力達到頂點 | 每個淘汰都有大額獎金差距 |
| 2 人 | 消失 | HU 不需要 ICM 考量，但 BBA 讓 HU 底池更大（push 更有利）| 純 Chip EV，積極打法 |

FT 的獎金結構通常前幾名差距很大（如 1st 是 2nd 的 1.5-2 倍），這讓大疊積極、中疊保守的策略更加明顯。BBA 進一步強化了這個對比：大疊的每次 steal 收益更大，中疊的每次 call 代價也更大。

### FT BBA ICM 計算範例

**4 人 FT，盲注 5,000/10,000，BBA 10,000**

起始底池 = 5,000 + 10,000 + 10,000 = **25,000**（無 ante 版本僅 15,000）

獎金：1st $50,000 / 2nd $30,000 / 3rd $20,000 / 4th $12,000

籌碼分佈：
- 玩家 A（你）：500,000（50%）
- 玩家 B：200,000（20%）
- 玩家 C：180,000（18%）
- 玩家 D：120,000（12%）

**玩家 B push 200,000 all-in，你有 AJo（勝率 55% vs B 的 push range）：**

```
BBA 底池分析：
起始底池已有 25,000（BBA），主底池 = 你 call 的 200,000 + B 的 200,000 + 起始 25,000
籌碼移動幅度更大（比無 ante 多出底池差額）

ICM 計算：
你現在 ICM equity ≈ $38,500（50% 籌碼，大疊）

Call 贏（55%）：A = 700,000（70%）
  ICM equity ≈ $48,000

Call 輸（45%）：A = 300,000（30%）
  ICM equity ≈ $29,000

Call EV = 55% × $48,000 + 45% × $29,000
        = $26,400 + $13,050 = $39,450

Fold EV = $38,500（維持現狀）
```

**結論：Call 略優（$39,450 vs $38,500），但差距很小。** 如果 BBA 讓底池更大，籌碼移動更劇烈，ICM 代價也更高，這個決定在有更多中疊存在時可能反轉為 fold。

---

## ICM 調整速查表（BBA 標準）

| 情境 | BBA Push Range 調整 | BBA Call Range 調整 | 關鍵原則 |
|------|---------------------|---------------------|---------|
| 早期（遠離 bubble） | BBA Nash 標準 | BBA Nash 標準 | 純 Chip EV，BBA 讓 push 更寬 |
| 接近 bubble 3 桌 | 輕微縮緊（BBA Nash -3-5%） | 輕微縮緊 | 開始意識 ICM |
| Bubble 大疊 | 略放寬（BBA Nash +2-3%） | BBA Nash 標準 | 施壓中疊，BBA 讓收益更大 |
| Bubble 中疊 | 明顯縮緊（BBA Nash -10-15%） | 非常緊 | 保護生存，BBA 代價更高 |
| Bubble 短疊 | BBA Nash 標準（不額外縮緊） | 很緊 | 需積極 push，BBA 讓短疊 EV 更高 |
| FT 9-7 人 | 縮緊（BBA Nash -5%） | 縮緊 | 名次意識，BBA ICM 風險更高 |
| FT 5-4 人 | 明顯縮緊（BBA Nash -10%） | 緊 | ICM 峰值，BBA 放大每手牌影響 |
| FT 3-2 人 | 縮緊降低（BBA Nash -5%） | 標準 | 接近 HU，BBA 讓 HU push 更廣 |
| HU | BBA Nash 大幅放寬 | BBA Nash HU | 純 Chip EV，BBA HU push range 最廣 |

**重要：** 表中「BBA Nash」指的是 HRC/ICMIZER BBA 模式計算的 Nash range，不是傳統無 ante Nash 表。調整百分比是在 BBA Nash 基礎上的增減，不是相對於無 ante Nash。

---

## BBA ICM 計算工具使用說明

### 為什麼 ICM 計算必須包含 BBA 底池

ICM 計算的是籌碼移動後的獎金期望值變化。如果 ICM 工具中設定的底池大小不包含 BBA：

- 計算出的 call EV 偏高（因為假設輸了損失的籌碼較少）
- 計算出的 fold EV 偏低（因為假設底池較小）
- 最終結果：**系統性地建議比最優更寬的 call range**

這是在 BBA MTT 中使用無 ante ICM 工具的重大錯誤。

### 正確設定 BBA ICM 工具

**HRC（Hold'em Resources Calculator）BBA 設定：**
1. 在盲注設定頁面，選擇「Ante Type: Big Blind Ante」
2. 設定 Ante Size = 1bb（等於大盲注）
3. 所有 ICM 計算自動使用 BBA 底池
4. Bubble / FT 的 push/fold range 已自動反映 BBA ICM 代價

**ICMIZER BBA 設定：**
1. 在比賽設定中啟用「BB Ante」選項
2. 確認底池計算顯示包含 ante（例：200/400 時顯示底池 1,000，而非 600）
3. 進行 push/fold 分析，結果即為 BBA ICM 版本

---

## 線上 MTT 特別說明（BBA 環境）

**線上大型 MTT 的 bubble 持續時間非常長，BBA 讓每手牌的 ICM 壓力更集中。**

一個 1,000 人的 MTT，前 150 名進錢。當剩下 170-200 人時進入 bubble 階段，此時可能有：
- 15-20 桌同時進行
- 每桌有不同的籌碼壓力格局
- Bubble 可能持續 30-60 分鐘（幾十甚至上百手牌）
- **每手牌 BBA 讓籌碼消耗更快**（每手後位付出 2bb 而非 1bb），短疊的壓力更大

這對玩家有幾個特殊要求：

1. **長時間 BBA ICM 意識：** 不像現場 bubble 可能只有幾手，線上 bubble 需要長時間保持正確心態。BBA 環境下每手牌底池更大，ICM 判斷更容易出錯

2. **多桌同步判斷：** 你可能在 A 桌打 bubble，同時在 B 桌已經進錢。需要動態調整每桌的 ICM 優先級。各桌的 BBA 盲注消耗讓短疊壓力比無 ante 更緊迫

3. **Lobby 監控：** 線上可以看到其他桌的進展，了解整體籌碼分佈。大型 MTT 平台（GGPoker, PokerStars）都有 lobby 功能顯示各桌狀況。特別注意短疊的 bb 數，BBA 讓短疊的有效 push/fold 窗口更短

4. **避免 bubble 疲勞：** 長時間的高度緊張容易疲勞，ICM 判斷品質下降。保持節奏，不要因為「熬過了這麼久」而在最後關鍵手牌鬆懈。BBA 環境下每手牌都更關鍵

5. **識別哪個桌打的是 Bubble：** 多桌情況下，哪桌是「真正的 bubble 桌」（短疊聚集、最可能出局的桌）需要特別關注。BBA 讓短疊的 push/fold 窗口縮短，這些桌的 ICM 變化更快

6. **BBA 讓偷盲更積極：** 在 bubble 的大疊應充分利用 BBA 環境，每次成功 steal 比無 ante 多贏 67% 的底池，積累優勢更快
