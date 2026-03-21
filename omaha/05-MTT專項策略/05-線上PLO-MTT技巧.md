# 線上 PLO MTT 技巧：玩家特點、工具與 Bankroll

> 本章專注於線上 9-max PLO MTT 的實戰技巧，涵蓋玩家類型識別、
> HUD 數據應用、多桌挑戰、常見 bluff 模式，以及必備工具和 Bankroll 管理。

---

## 概覽

線上 PLO MTT 和現場 PLO MTT 有本質差異。線上環境有：
- 更快的決策節奏
- 可用 HUD 數據分析對手
- 多桌同時進行的壓力
- 不同的玩家生態（更多 GTO 受訓玩家）

但也有優勢：
- 可以用工具輔助分析
- 選桌/選時段的靈活性
- 大量場次積累 Sample Size

---

## 第一節：線上 PLO MTT 的玩家特點

### 常見玩家類型分析

**類型 1：PLO Fish（魚型玩家）**

```
辨識特徵：
  - VPIP 非常高（60%+）
  - 追 Non-nut Draw 到底
  - 翻牌後下注模式不一致（時而過小，時而過大）
  - 對 ICM 無概念（Bubble 時仍然 call flip）
  - 手牌選擇糟糕（喜歡打 single-suited 低牌）

對付策略：
  ✓ 等 Value Hand，讓他們付錢（不需要複雜 bluff）
  ✓ 在翻牌後有 Nut 時最大化底池（他們會 call 大注）
  ✓ 在 Bubble 積極施壓（他們不懂 ICM，可能 call flip）
  ✗ 不要 Bluff（他們 call 太多）
  ✗ 不要低估他們（PLO 方差大，魚也可以贏 big pots）

HUD 指標：VPIP > 55, PFR < 20, Fold to C-bet < 40%
```

**類型 2：NLH 轉型玩家（NLH-to-PLO）**

```
辨識特徵：
  - 翻牌前範圍合理，但翻牌後犯 NLH 思維錯誤
  - 過度重視 Top Pair（NLH 習慣）
  - 不理解 Nut 的重要性（用非 Nut hand commit）
  - 對 Wrap Draw 的 Outs 計算不準確
  - Flush 的重要性被低估（PLO 中同花極常出現）

對付策略：
  ✓ 在濕潤板用 Nut Draw 積極 Semi-bluff（他們更難判斷你的牌力）
  ✓ 在他們 bet Top Pair 時用 Nut 攻擊
  ✓ 利用他們對 Wrap Draw 的誤判（他們以為 Set 很安全）

HUD 指標：VPIP 22-35, PFR 15-25, Went to SD% 偏高（不知道 fold）
```

**類型 3：PLO 專業/正規玩家（Regular）**

```
辨識特徵：
  - 選牌嚴格（VPIP 20-30%）
  - 翻牌後策略合理（懂 Nut 和 Draw 的組合）
  - ICM 意識強（Bubble 時有明顯行為調整）
  - 位置意識好（IP 主導，OOP 保守）
  - C-bet 頻率適中，有 Check-raise 計劃

對付策略：
  ✓ 不要在他們 OOP 後打 Marginal 底池（他們懂得 fold）
  ✓ 利用位置（他們尊重 IP 的壓力）
  ✓ 在 Bubble 利用他們的 ICM 意識（他們會 over-fold in key spots）
  ✗ 不要輕易對抗（選擇 GTO 路線）

HUD 指標：VPIP 20-30, PFR 15-22, 3-bet 8-14%, Fold to Steal 55-65%
```

**類型 4：短疊 Shover（短疊 Push/Fold 玩家）**

```
辨識特徵：
  - 大部分時間處於短疊（<25bb）
  - Push/Fold 模式（很少 call，很少 raise 小額）
  - 對 ICM 有基本意識（Bubble 時 push range 收緊）
  - 可能是連續受挫的玩家，也可能是策略性玩家

對付策略：
  ✓ 知道他們的 push range，精確計算 call range
  ✓ PLO 的 call vs 短疊 push 需要 40%+ Equity
  ✓ 不要隨便 call 短疊（他們的 push range 往往比你想的更緊）

HUD 指標：VPIP 12-20, 3-bet all-in%, 很少 limp
```

**類型 5：Nit（極緊玩家）**

```
辨識特徵：
  - VPIP 很低（< 15%）
  - 只打 Premium hands
  - 不 bluff，只 value bet
  - 對 Implied Odds 和 Draw 的理解可能不足

對付策略：
  ✓ Steal 他們的盲注（他們 fold 很多）
  ✓ 當他們 bet，給予尊重（他們有強牌）
  ✓ 在 Bubble 積極向他們施壓（他們 over-fold）

HUD 指標：VPIP < 15, PFR < 10, Fold to Steal > 75%
```

---

## 第二節：HUD 數據在 PLO 的應用

### PLO HUD 和 NLH HUD 的差異

HUD（Heads-Up Display）在 PLO 的使用和 NLH 有重要差異：

```
NLH HUD 的核心指標：
  VPIP / PFR / 3-bet% / Fold to C-bet% / WTSD%

PLO HUD 的核心指標（不同！）：
  VPIP / PFR / 3-bet% / Fold to Pot-bet% / WTSD% / AF（Aggression Factor）

PLO 特有的重要指標：
  1. Fold to Pot-bet（翻牌後對 Pot-size bet 的 fold 率）
     NLH 通常看 Fold to C-bet（任何大小）
     PLO 的 Pot-bet 是最大下注，更有意義
     高 Fold to Pot-bet：可以更頻繁用 pot-size semi-bluff
     低 Fold to Pot-bet：只打 Value

  2. AF（Aggression Factor）
     AF = (Bet + Raise) / Call
     PLO 中高 AF 不一定是 bluffer，可能是懂 PLO 的玩家（value heavy）
     低 AF = 偏被動，容易 check-call

  3. Went to Showdown% (WTSD%)
     高 WTSD%（55%+）：傾向追 Non-nut draws，call 太多
     低 WTSD%（25%以下）：懂得 fold，但可能被利用
```

### PLO HUD 數據解讀範例

```
玩家 A 的 HUD：
  VPIP: 42 / PFR: 18 / 3-bet: 6% / Fold to Pot-bet: 28% / WTSD: 48%

分析：
  VPIP 42%：玩很多手牌（比 Regular 廣很多）
  PFR/VPIP 差距大：經常 limp（18/42 = 43% raise）
  3-bet 6%：3-bet 不多，但合理
  Fold to Pot-bet 28%：非常低！他在翻牌後幾乎不 fold to Pot
  WTSD 48%：到攤牌比例高

  對付策略：
    - 不要 Bluff Pot-bet（他不 fold）
    - 等 Value 然後 Pot-bet（他會 call）
    - 利用他 limp 的弱點：對他 isolate（3-bet 隔離）
    - 他的牌型範圍廣，但不一定強（Implied Odds 攻擊不值）

玩家 B 的 HUD：
  VPIP: 22 / PFR: 16 / 3-bet: 12% / Fold to Pot-bet: 62% / WTSD: 28%

分析：
  VPIP 22%：正規玩家範圍
  PFR/VPIP 比例好（16/22 = 73%）：很少 limp
  3-bet 12%：積極 3-bet
  Fold to Pot-bet 62%：翻牌後會 fold to Pot
  WTSD 28%：很少攤牌（懂得 fold 或 bluff 贏底池）

  對付策略：
    - Semi-bluff pot-size bet 有效（62% fold rate！）
    - 在他 3-bet 後，他有強牌，尊重他的 Range
    - 在 Bubble 利用他（他的 ICM 意識強，會 over-fold）
    - 避免和他進入 3-bet pot 沒有清楚計劃
```

---

## 第三節：多桌 PLO MTT 的挑戰

### 為什麼 PLO 多桌比 NLH 更難

```
PLO 多桌的額外挑戰：

1. 決策更複雜（每手牌要計算 6 種 2-card combo）
   NLH：2 張牌，straightforward equity 計算
   PLO：4 張牌，Wraps / Flush Draws / Made Hand 同時考慮

2. 翻牌後選擇更多
   NLH 翻牌後：Fold / Call / Raise（相對簡單）
   PLO 翻牌後：Fold / Call / Pot-raise + 考慮 Nut vs Non-nut

3. ICM 計算需要更多時間
   PLO 的 all-in equity 不明顯（接近 flip），ICM 計算更複雜

4. 情緒管理更困難
   PLO 的方差更大，多桌同時出現不好結果時更容易 tilt
```

### 多桌 PLO MTT 的策略調整

```
多桌時的優先級管理：

1. 按優先級分配注意力
   Critical（必須立即處理）：
     - 你面臨大決定（Bubble 上的 all-in 決策）
     - 你在 BTN 或 SB（位置決策）
     - 決賽桌的 ICM 關鍵時刻

   Important（需要注意）：
     - 你在 BB 面對 raise（defend 決策）
     - 你有強手牌翻牌後

   Routine（可以快速處理）：
     - UTG fold（很多手牌直接 fold）
     - 簡單的 C-bet 和 fold

2. 減少桌數以提升決策質量
   NLH 玩家通常可以同時 8-12 桌
   PLO 建議初期最多 4-6 桌
   在 Bubble 或 FT，考慮關閉其他桌

3. 預設動作（Auto-actions）的使用
   多桌時可以使用 Auto-fold（非常弱的手牌）
   但 Bubble/FT 不要使用，需要手動判斷

4. 時間管理
   PLO 的時間銀行要謹慎使用
   在 Critical 決策時使用全部時間
   在 Routine 決策快速行動，保留時間銀行
```

### 多桌 PLO 的 Tilt 管理

```
PLO 多桌的 Tilt 風險：

常見 PLO Tilt 觸發點：
  - Set 被 Flush Draw 擊中（「怎麼又來了！」）
  - Nut Straight 被更大的 Straight Runner-runner 超越
  - 3 個 all-in 都輸（即使每個都是優勢）
  - Bubble 多次附近出局

Tilt 的識別信號：
  ✗ 開始用弱牌 Push 加速速度
  ✗ 對玩家 A 的「壞玩法」感到憤怒
  ✗ 決策速度過快，不思考
  ✗ 增加桌數試圖「補回損失」

Tilt 預防措施：
  ✓ 設置 Stop-loss（如損失 3 個買入就停止）
  ✓ Bubble 出局後休息 10 分鐘
  ✓ 在遊戲前確立情緒穩定的目標
  ✓ 記錄 tilt 觸發點，在事後回顧
```

---

## 第四節：常見線上 PLO MTT Bluff 模式

### 可以識別的 Bluff 模式

線上 PLO 玩家有一些常見的 bluff 線路，識別它們可以讓你更好地 call 或 fold。

**Bluff 模式 1：Dry Board Pot-bet Bluff**

```
線路：翻牌前 raise → 翻牌 pot-bet（在 K73 rainbow 等乾燥板）
對手的想法：在乾燥板你的 range 不一定 hit，pot-bet 可以贏走底池

識別：
  - 對手 VPIP 很高（他會用很多牌 bluff）
  - 他在 EP 開牌（range 廣）
  - 板面對他的「廣 range」不利

反應：
  - 如果你有 Top Set 或 Nut 手牌：Call 或 Check-raise
  - 如果你有 Non-nut 或 Draw：謹慎，他也可能 Value-bet
  - PLO Dry Board：bluff 比 NLH 成功率更低（對手 range 廣，容易 hit 一個 pair）
```

**Bluff 模式 2：Turn Over-bet Bluff（過大下注詐唬）**

```
線路：翻牌 Check-check → Turn over-bet（1.5 pot 或更大）
對手的想法：用過大下注嚇阻，製造面對更大壓力

識別：
  - 翻牌 check 通常代表對手沒有非常強的牌
  - Turn 突然 over-bet 可能是強牌，也可能是 bluff
  - 如果 Turn 是「嚇牌」（如完成 Flush 的花色），bluff 機率更高

反應：
  - 如果你有 Nut 或接近 Nut：Call 或 Raise
  - 如果你有 Medium Strength：需要讀牌，這是最困難的情況
  - 通常 PLO 的 Turn over-bet 傾向 Polarized（要不很強，要不 bluff）
```

**Bluff 模式 3：Short Stack Push Bluff（短疊虛張聲勢）**

```
線路：短疊在 BTN/CO 翻牌前 Push（看起來是強牌 push）
對手的想法：利用位置 fold equity，用弱牌 push

識別：
  - 短疊的 push range 在特定位置可以很廣
  - 如果他之前有很多 fold，可能更積極 bluff push
  - PLO 的 push equity 計算更複雜（他可能有 40%+ 的弱牌）

反應：
  - 你的 BB call range 需要 40%+ Equity vs 他的 push range
  - 如果他的 range 廣，你的 call range 也可以適當放寬
  - AA / KK ds / 強 rundown ds 都可以 call
  - 弱牌不要 call（即使在 BB），因為 PLO 的 equity 差距大
```

**Bluff 模式 4：河牌 Pot Bluff（完整 Bluff）**

```
線路：翻牌 C-bet → Turn Barrel → River Pot Bluff（三桶詐唬）
對手的想法：代表強牌，讓你 fold 良好的手牌

識別：
  - 三桶詐唬在 PLO 比 NLH 更罕見（因為 PLO 玩家有很多 Draws）
  - 如果 River 是「完成」板（如第三同花），bluff 機率高
  - 對手如果是「激進型」（高 AF），三桶詐唬更可能

反應：
  - 如果你有 Nut 或 Near-Nut：Call（甚至 Raise）
  - 如果你有 Medium Hand（如 Two Pair）：Call 谨慎考虑（看底池大小）
  - 如果你只有 Pair：通常 fold（PLO 的 River 決策更傾向 Polar）
```

---

## 第五節：工具推薦

### PLO 專用 Solver

**1. Monker Solver（最主流的 PLO Solver）**

```
特點：
  - 支援 PLO 和其他 Omaha 變體
  - GTO 策略計算
  - 可以分析具體手牌的最優策略
  - 支援 Multi-way 底池

使用場景：
  - 分析翻牌後的 Check-raise vs Bet 決策
  - 計算特定板面上的 Bet Range
  - 理解 Balanced Strategies（平衡策略）

限制：
  - PLO 的 Solver 計算量比 NLH 大很多
  - 需要強力電腦
  - 學習曲線陡峭

推薦使用方式：
  離線分析，研究常見的 PLO 翻牌結構
  不適合實時桌上查詢（決策時間有限）
```

**2. PLO Ranges（起始牌範圍工具）**

```
特點：
  - 提供 GTO 導向的 PLO 起始牌範圍
  - 按位置分類（UTG/MP/CO/BTN/SB/BB）
  - 包含 Opening / 3-bet / Call 範圍

使用場景：
  - 學習和記憶各位置的開牌範圍
  - 對比自己的直覺和 GTO 範圍
  - 分析 3-bet 策略

推薦使用方式：
  學習階段使用，建立範圍直覺
  在實戰中根據情況偏離（exploitative 調整）
```

**3. Equilab / PLO Equity Calculator**

```
特點：
  - 計算具體 PLO 手牌對抗 range 的 Equity
  - 支援 Wrap Draw / Flush Draw 的 Outs 計算
  - 免費版本可用

使用場景：
  - 研究具體翻牌場景的 Equity
  - 計算 all-in 的 Equity（幫助 ICM 決策）
  - 練習 Outs 計算（提升計算速度）

PLO Equity 計算示例：
  你的手牌：K♠Q♠J♦T♦
  對手範圍：AA + connected（AAKK, AAQJ 等）
  翻牌：9♠8♥7♣

  計算結果：你 vs AA range ≈ 55%（Wrap Straight 勝出）
  → 這個情況你是 Favorite！可以積極
```

**4. ICMIZER（ICM 計算工具）**

```
特點：
  - 計算 MTT ICM EV
  - 模擬 Push/Fold 場景
  - 分析 Bubble 決策

PLO MTT 使用注意：
  ICMIZER 的 Push/Fold 計算基於 NLH Equity 估算
  在 PLO 中需要調整（PLO 的 Equity 分布不同）
  手動輸入 PLO Equity 來獲得更準確的 ICM 分析

推薦工作流程：
  1. 用 PLO Equity Calculator 計算 PLO Equity
  2. 輸入 ICMIZER 的手動模式
  3. 計算 ICM EV
```

---

## 第六節：Bankroll 管理

### PLO MTT 的方差現實

PLO MTT 的方差是 NLH MTT 的 **1.5-2 倍**。這對 Bankroll 需求有直接影響。

```
方差比較（ROI 相同情況下）：

NLH MTT 的 Downswing 現實（10% ROI）：
  連輸 20 場：正常
  連輸 50 場：不罕見
  最大 Downswing（1,000 場）：約 100 買入

PLO MTT 的 Downswing 現實（10% ROI，同樣技術水準）：
  連輸 30 場：正常
  連輸 80 場：不罕見
  最大 Downswing（1,000 場）：約 150-200 買入
```

### PLO MTT Bankroll 建議

```
不同等級的 PLO MTT Bankroll 建議：

微注（< $10 買入）：
  最低 Bankroll：100 買入（$1,000 for $10 MTT）
  舒適 Bankroll：150 買入（$1,500 for $10 MTT）
  理由：方差大，需要足夠緩衝

小注（$10-50 買入）：
  最低 Bankroll：150 買入
  舒適 Bankroll：200 買入
  理由：在這個層級，方差還是主要因素

中注（$50-200 買入）：
  最低 Bankroll：200 買入
  舒適 Bankroll：250-300 買入
  理由：技術差距不明顯，方差管理更重要

大注（$200+ 買入）：
  最低 Bankroll：250-300 買入
  舒適 Bankroll：300+ 買入
  理由：大注對手更強，勝率可能降低
```

### Bankroll 管理原則

```
PLO MTT Bankroll 的 5 大原則：

原則 1：不要 Shot-taking 太積極
  NLH MTT 的 Shot-taking（用 20 買入嘗試更高限注）是常見策略
  PLO MTT 的方差更大，Shot-taking 更危險
  建議：只在有 200+ 買入的情況下考慮升限

原則 2：多表場次類型管理
  不要只打大買入 PLO MTT（方差過大）
  混搭：70% 主打限注 + 30% 大買入錦標賽（調節方差）

原則 3：設置 Stop-loss 和 Stop-win
  每日 Stop-loss：損失 3-5 個買入就停止
  心理平衡：避免在狀態不好時持續玩

原則 4：ROI 追踪的長期視角
  PLO MTT 需要 2,000-5,000 場才能看到穩定 ROI
  在 500 場以內不要做太多「技術結論」
  方差會偽裝成「技術問題」

原則 5：Rakeback 和獎勵計劃
  PLO MTT 的 Rake 比例較高（大買入有 EV 損失）
  加入 VIP 計劃或 Rakeback 減少 Rake 的影響
  這在 PLO MTT 的 ROI 計算中非常重要

PLO MTT Bankroll 計算器（範例）：
  目標：在 $20 PLO MTT 玩 200 場
  需要 Bankroll：$20 × 200 = $4,000（不考慮 ROI）
  舒適起始 Bankroll：$20 × 200 = $4,000（如果有正 ROI 才補充）
  最差情況緩衝：額外 50 買入 = $1,000
  建議起始：$5,000
```

### 心理 Bankroll 管理

```
PLO MTT 的心理挑戰：

挑戰 1：長期 Downswing 的信心危機
  情況：連輸 100 場（PLO 的正常方差範圍）
  問題：開始懷疑自己的技術
  解決：記錄關鍵決策，使用 Solver 驗證（而非只看結果）

挑戰 2：買入焦慮（過度在乎每個買入）
  情況：因為「不能輸這個買入」而做出 ICM-incorrect 的 fold
  問題：情緒影響理性決策
  解決：確保 Bankroll 充足，任何單一買入的損失不影響生活

挑戰 3：追求大贏的衝動
  情況：一直小贏，渴望大勝而做出 hero call
  問題：PLO 的大贏需要時間，不能急
  解決：專注於正確決策，而非短期結果

心理健康的判斷標準：
  ✓ 折疊強牌（如 AA）時不感到憤怒（接受 PLO 的現實）
  ✓ 輸掉 flip 後能平靜繼續（方差是正常的）
  ✓ 長期追踪 EV（而非只看贏輸）
```

---

## 平台選擇與技巧

```
主流線上 PLO MTT 平台特點：

PokerStars：
  - 最大的 PLO MTT 生態
  - MTT 時間表豐富（日夜均有比賽）
  - SCOOP/WCOOP 大型賽事
  - 玩家水準整體較高

GGPoker：
  - 魚型玩家較多（好的 EV 環境）
  - PLO MTT 選擇不如 Stars 多
  - HUD 限制（需要確認當前規定）

888 Poker：
  - 較軟的玩家場
  - PLO 選擇較少
  - 適合尋找 Soft Game 的玩家

Partypoker：
  - 中等玩家水準
  - 有不少 PLO MTT 選擇
  - Rake 較高，需要考慮

選擇建議：
  初學者：選擇玩家最軟的平台（通常是 GGPoker 或 888）
  進階：PokerStars（場次多，可以找到最多 volume）
  職業：多平台同時（分散風險，增加場次）
```

---

## 本章重點回顧

1. **玩家識別**：線上 PLO MTT 有 Fish、NLH 轉型玩家、Regular、短疊 Shover、Nit 等類型，各有對應策略。
2. **HUD 在 PLO**：重視 Fold to Pot-bet、AF、WTSD%，而非直接套用 NLH HUD 解讀。
3. **多桌管理**：PLO 多桌比 NLH 更難，建議初期最多 4-6 桌，在關鍵時刻（Bubble/FT）專注單桌。
4. **Bluff 模式**：識別 Dry Board Pot-bet、Turn Over-bet、Short Stack Push、River 三桶等常見 bluff，選擇正確應對。
5. **工具**：Monker Solver（策略研究）、PLO Ranges（起始牌）、ICMIZER（ICM 計算）是核心工具。
6. **Bankroll**：PLO MTT 需要 150-200+ 買入的 Bankroll，方差是 NLH 的 1.5-2 倍，需要更強的心理承受力。

---

*延伸閱讀：`04-Bubble與決賽桌.md`，`../02-ICM與籌碼管理.md`*
