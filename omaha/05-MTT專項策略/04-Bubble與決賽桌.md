# PLO MTT Bubble 與決賽桌策略

> 本章深入講解 PLO MTT 在最關鍵時刻的策略：Bubble（泡沫期）、決賽桌（Final Table），
> 以及 Heads-Up（一對一）的 PLO 特殊調整。9-max 線上 PLO MTT 視角。

---

## 概覽：為什麼 PLO 的 Bubble 和 Final Table 特別難

PLO MTT 的 Bubble 和 Final Table 比 NLH 更困難，原因有三：

```
困難 1：PLO 的 all-in 幾乎都是 flip
  NLH Bubble：AA vs KK = 80/20（有壓倒性優勢）
  PLO Bubble：AA ds vs KK ds = 65/35（非壓倒性）
  PLO 翻牌後：set vs wrap = 45/55（你可能是弱方！）

困難 2：PLO 的 fold equity 計算更複雜
  NLH：對手面對 push，有明確的 call/fold 門檻
  PLO：對手面對 pot-raise，hand equity 不確定性更高

困難 3：ICM 和 PLO 的 equity 分布交叉計算
  每次 all-in 都需要同時考慮 PLO equity 和 ICM
  這需要大量練習才能快速做出正確決策
```

---

## 第一節：PLO MTT Bubble 的特殊性

### 什麼是 Bubble？

Bubble 是錦標賽中「最後一名未獲獎位置」的前幾名玩家階段。

```
例子：100 人 MTT，付 15 名
  Bubble 範圍：約 17-20 人時開始 Bubble 意識
  Hard Bubble：剛好 16 人（下一個出局者未獲獎）
```

### PLO Bubble 的核心現實

```
PLO Bubble 的數學現實：

1. 最強翻牌前手牌（AA ds）的 all-in 優勢只有 65%
   對比 NLH：AA 翻牌前 all-in ≈ 80-85%

2. 翻牌後幾乎所有 all-in 都接近 flip
   常見情況：
     Set vs Wrap Draw：45-55%（你可能是弱方）
     Top Two vs Wrap：45-55%
     Nut Flush Draw vs Made Hand：40-50%

3. PLO 的 all-in 更頻繁
   因為 pot limit，很多「semi-bluff」都會建立大底池

結論：PLO Bubble 的每次 all-in 都是高風險決策
```

### Bubble 的四種玩家類型

```
類型 A：大疊（> 1.5 倍平均籌碼）
  ICM 狀態：最強，可以施壓
  策略：積極，但 PLO 的 flip 仍需謹慎

類型 B：中疊（0.7-1.5 倍平均籌碼）
  ICM 狀態：需要保護 ICM 價值
  策略：謹慎，等大疊和短疊互打

類型 C：短疊（0.3-0.7 倍平均籌碼）
  ICM 狀態：壓力大，需要翻倍
  策略：Push 好機會，不要等太久

類型 D：超短疊（< 0.3 倍平均籌碼）
  ICM 狀態：幾乎沒有，等死或翻倍
  策略：有機會就 push，等 BB/SB 強迫 all-in
```

---

## 第二節：大疊的 Bubble 策略

### 大疊的「ICM 免疫」優勢

在 NLH MTT，大疊在 Bubble 幾乎可以 push 任何短疊，因為：
- 輸了不出局
- 對手受到 ICM 壓力，會 over-fold

**PLO 的大疊 Bubble 策略修正：**

```
PLO 大疊 Bubble 策略：
  維持 NLH 的積極性（仍然施壓）
  但要謹慎選擇 all-in 時機（PLO flip 的代價）

大疊可以做的：
  ✓ 對短疊/中疊翻牌前 Pot-raise（他們 fold 是巨大 EV 增加）
  ✓ 翻牌後對短疊/中疊持續施壓（他們 ICM 壓力讓 fold 更多）
  ✓ 用 Position 打更寬的手牌 Range
  ✓ 對超短疊積極 all-in（Equity Edge 加 fold equity = 好 spot）

大疊要避免的：
  ✗ 對 另一個大疊 打 flip（兩個大疊互打，誰輸都失去 Bubble 優勢）
  ✗ 在翻牌後沒有 Nut 時 over-commit（PLO 的翻牌後 flip 代價）
  ✗ 用極弱手牌純 bluff（PLO 對手更難 fold 多牌類型）
```

### 大疊 Bubble 實戰場景

```
場景設定：
  總玩家 16 人（Hard Bubble，下一個出局不獲獎）
  你：85bb（大疊，全場最多籌碼之一）
  對手（MP，中疊）：35bb
  盲注：500/1,000

你在 BTN，手牌：K♠Q♠J♦T♦（強手牌）
對手 MP Open 2,500（2.5bb）

分析：
  你的手牌：強 double-suited 連牌，翻牌前是 B 級手牌
  在深疊 Cash Game：直接 3-bet pot

  但是 Bubble 的 ICM 調整：
    如果你 3-bet pot（≈ 8,500），對手 push 35,000（剩 26,500）
    你面對 call 35,000 的決定
    你有 KQJTs：vs 對手 range 約 47-53%（接近 flip）

    對手 35bb 的 ICM EV ≈ $X（相當大，Bubble 時短疊有價值）
    如果你 call 且輸（47% 可能）：你從 85bb → 50bb
    你仍然是大疊，但失去「壓制優勢」

    如果你 call 且贏（53% 可能）：你從 85bb → 120bb
    成為更大的大疊，但 ICM 增加有限

  大疊在 PLO Bubble 的決策：
    3-bet pot 施壓（對手可能 fold 並失去 1-2bb）= 小但確定的 ICM EV
    Call all-in = 接近 flip，ICM EV 不確定

  最優策略：
    如果對手 fold after 3-bet：你贏了 2.5bb，很好
    如果對手 push：你在接近 flip 的情況重新考慮 call
    KQJT ds 在 Bubble 是「3-bet but fold to push」的牌（非 commit 牌）
```

---

## 第三節：中疊的 Bubble 策略

### 中疊的 Bubble 困境

中疊（0.7-1.5 倍平均籌碼）是 Bubble 最難打的位置。

```
中疊 Bubble 的困境：
  - 不夠大：不能像大疊一樣免費施壓
  - 不夠小：沒有短疊的「必 push」迫切性
  - ICM 壓力：出局=失去所有，但籌碼也沒大到「無所謂」

中疊 Bubble 的正確心態：
  等待！讓大疊和短疊互相消滅。
  你的 ICM EV 隨著短疊出局而自動增加。
```

### 中疊 Bubble 可以打的手牌

```
中疊 Bubble（約 35bb），只主動 all-in 的情況：

翻牌前（3-bet or push）：
  可以打：AA 任何搭配（即使 PLO 65%，仍然是正 EV in most cases）
  可以打：KKQQ double-suited（強到可以接受 flip 的風險）
  考慮打：強 double-suited rundown vs 短疊的 push（你有 40%+ Equity）
  Fold：KKxx 非 double-suited vs 中疊/大疊的 3-bet（太 flip-y）

翻牌後：
  可以 commit：你有 Nut Made Hand + Nut Draw 的強組合
  可以 commit：Nut Straight on dry board vs 短疊的 push
  需要謹慎：Set on wet board（對手有 wrap+FD 可能是 favorite）
  Fold：Non-nut Draw，即使 Chip EV 是正值

中疊 Bubble 的「避免大底池」原則：
  翻牌後不要建立超過你 30-40% 籌碼的底池，除非你是 Nut
  避免：call pot-size bet without Nut plan
  避免：Semi-bluff to pot-size when non-nut
```

### 中疊 Bubble 實戰場景

```
場景設定：
  Bubble（16 剩 15 付），你是中疊（40bb）
  桌上有：大疊 90bb × 2，中疊 35bb × 3，短疊 12bb × 2

你的策略優先級：
  1. 等短疊 all-in 在其他位置（你 ICM EV 上升）
  2. 避免進入和大疊的 大 PLO 底池（flip 代價高）
  3. 積極 steal 盲注（用 Fold Equity，不進大底池）

盲注 steal 的重要性：
  你有 40bb，每圈消耗 1.5bb（9 人桌）
  每 steal 成功 = 大約 2.5bb 淨 = 6% 的籌碼增加
  這是「無風險」的籌碼增加（fold equity 驅動）

  在 Bubble，BTN/CO 位置的 steal 頻率應該更高，
  因為對手因 ICM 壓力而 over-fold（尤其是 BB 中疊）
```

---

## 第四節：短疊的 Bubble 策略

### 短疊 Bubble 的「必 Push」邏輯

短疊（< 0.5 倍平均籌碼）在 Bubble 的策略相對清楚：**必須積極尋找翻倍機會。**

```
短疊 Bubble 的數學：

假設你有 15bb，Bubble（付 15 名，剩 16 人）
平均籌碼：40bb

選項 A：等待完美手牌
  等 2 個 orbit（18 手）：你 → 12bb（盲注消耗）
  等 4 個 orbit（36 手）：你 → 9bb
  → ICM EV 下降，Fold Equity 消失

選項 B：在合適位置積極 Push
  Push 手牌：AA, KK ds, QQ ds, 強 rundown ds
  Push 被 fold（50% 機率）：你 +3bb，很好
  Push 被 call 且贏（55% 機率的 call）：你 +30bb，翻倍
  Push 被 call 且輸（45%）：出局，失去排名

結論：
  15bb 的 Push Equity：
    Fold（50%）：+3bb = +3bb EV
    Call 且贏（50% × 55% = 27.5%）：+30bb = +8.25bb EV
    Call 且輸（50% × 45% = 22.5%）：-15bb = -3.375bb EV

  總 EV：+3 + 8.25 - 3.375 = +7.875bb（正 EV！）

  等 1 個 orbit 的成本：-1.5bb（盲注）
  因此應該積極 push，而不是等待
```

### 短疊 Bubble Push 的目標位置

```
短疊 Bubble 的最佳 Push 目標：

1. 攻擊 ICM 壓力最大的玩家（中疊）
   中疊在 Bubble 最不願意 call（失去 ICM EV 風險大）
   vs 大疊：大疊可以 call 更寬，因為輸了不出局

2. 攻擊在 BB 的玩家
   BB 已付 1bb，call 的賠率更好，但 ICM 壓力也存在
   如果 BB 是中疊，他 fold 的機率仍然不低

3. 從 CO/BTN 位置 Push
   少人要過，Fold Equity 最高
   避免在 UTG/EP Push（6-7 人要過，被 call 機率大）

4. 避免攻擊超短疊（他們 call 更廣）
   超短疊（< 8bb）的 call range 很寬（desperate）
   你的 Push 被他們 call 的機率很高
```

---

## 第五節：Final Table PLO 策略

### 決賽桌的 ICM 計算重要性

決賽桌（Final Table）的每次出局都有**明顯的獎金跳幅**。

```
典型 PLO MTT Final Table 獎金結構（9 人 FT）：

位置   獎金      跳幅
9th    $500      —（泡沫剛進）
8th    $700      +$200
7th    $1,000    +$300
6th    $1,400    +$400
5th    $2,000    +$600
4th    $3,000    +$1,000
3rd    $4,500    +$1,500
2nd    $7,000    +$2,500
1st    $12,000   +$5,000

每次出局的代價在後期急劇上升！
從 3rd → 2nd：$2,500 差距
從 2nd → 1st：$5,000 差距
```

### Final Table 的 ICM 壓力階段

```
決賽桌的 ICM 壓力（隨玩家減少增加）：

9→8 人：輕度 ICM 壓力（剛進 FT，都有獎金了）
8→6 人：中度 ICM 壓力（跳幅開始明顯）
6→4 人：重度 ICM 壓力（$600-1,000 的跳幅，不能隨便 flip）
4→3 人：極重 ICM 壓力（第 4 名 = $3,000，第 3 名 = $4,500）
3→2 人：最高 ICM 壓力（非常謹慎的 all-in 決策）
```

### Final Table 的位置策略

```
PLO Final Table 的位置原則：

1. 位置永遠重要（比 Bubble 更重要）
   因為底池更大（深疊 FT），位置 EV 更高
   IP 打大底池 vs OOP 打大底池差距更明顯

2. BTN 的力量
   FT 的 BTN 可以 steal 並積累籌碼，而不需要 all-in
   對短疊 BTN steal 在 FT 的 ICM 回報很高

3. 對抗大疊的保守
   大疊在 FT 有「免疫」優勢
   中疊不應該主動打 flip vs 大疊（出局代價大）
   等待大疊和短疊互打

4. 對抗短疊的積極
   FT 上的短疊被 bust 讓每個人 ICM EV 上升
   但要計算是否值得 call 短疊的 push
```

### Final Table 實戰場景

```
場景：Final Table 5 人剩餘
獎金：5th $2,000 / 4th $3,000 / 3rd $4,500

籌碼：
  玩家 A（你）：70,000（35bb）
  玩家 B（大疊）：120,000
  玩家 C：50,000
  玩家 D：30,000
  玩家 E（短疊）：15,000

你的 ICM EV（估算）：約 $2,800

情境：大疊 B 在你之前 Pot-raise，你有 KK♠QQ♥（KKQQ single-suited）
你考慮 3-bet pot → 可能引發 all-in

分析：
  如果你 3-bet pot → B call → all-in：
    你 vs B：KKQQ ss vs B's range（假設 B 有 AA or 強 rundown）
    你的 equity：約 40-45%（KKQQ 是強牌但 B 有 AA 時很弱）

  ICM 計算：
    如果你贏（42%）：你 → 140,000，ICM EV → 約 $4,200
    如果你輸（58%）：你出局，5th，ICM EV → $2,000

    Call 的 ICM EV：0.42 × $4,200 + 0.58 × $2,000 = $1,764 + $1,160 = $2,924
    原本 ICM EV：$2,800

    差距：$2,924 - $2,800 = +$124（勉強正 EV）

  關鍵：
    如果短疊 E（15bb）還在，你的 fold 讓 E 繼續出局機率增加
    → 你的 ICM EV 自動上升
    → Fold KKQQ 可能是更好的 ICM 決策！

最優策略：視短疊是否仍在，在極接近的情況傾向 fold。
```

---

## 第六節：Heads-Up PLO 策略

### HU PLO 的根本性變化

Heads-Up（一對一）PLO 和 9-max PLO 幾乎是完全不同的遊戲。

```
9-max PLO 和 HU PLO 的核心差異：

9-max：
  - 起始牌選擇很嚴格
  - 需要 Nut 或接近 Nut
  - 多人底池意識

HU PLO：
  - 起始牌大幅放寬（沒有人在你後面有強牌）
  - 相對牌力更重要（因為只有一個對手）
  - 更多翻牌前交戰和翻牌後 Aggression
  - Position 的差異更加關鍵（BTN = SB = 始終 IP）
```

### HU PLO 翻牌前策略

```
HU PLO 翻牌前 Range 調整：

起始牌放寬原則：
  9-max EP 的「不可玩」牌，在 HU 幾乎都可以玩
  例子：
    K985 rainbow（9-max EP fold）→ HU 可以 raise
    Q876 single-suited（9-max fold）→ HU 可以 limp/raise
    J963 rainbow（9-max fold）→ HU 可以 limp

HU PLO 翻牌前的一般原則：
  BTN（SB）位置：
    Raise 約 60-70% 的手牌（非常廣）
    Limp 約 15-20%（設陷阱或收縮 Variance）
    Fold 約 10-15%（極度弱牌如 2♣4♥7♦9♠ rainbow）

  BB 位置：
    Call（defend）約 55-65% vs BTN raise
    3-bet 約 20%（用強手牌 re-raise）
    Fold 約 15-25%（最弱手牌）
```

### HU PLO 翻牌後策略

```
HU PLO 翻牌後的特點：

1. 更多 Aggression（C-bet 頻率高）
   HU C-bet 頻率：約 60-70%（9-max 是 40-50%）
   原因：只有一個對手，Fold Equity 更高

2. 相對牌力重於絕對牌力
   9-max：你需要「Nut」或 「接近 Nut」
   HU：你需要「比對手強」就足夠
   例：Middle Set on Dry Board 在 HU 非常強
      而在 9-max 多人底池可能不夠強

3. Bluff 比 9-max 更可行
   HU PLO 的 Bluff 成功率更高
   因為對手的 Range 更廣，命中翻牌的機率相對低

4. Small Ball 打法（HU）
   HU 的底池大小傾向更小（2/3 pot 比 Pot-size 更常見）
   控制 Variance，保持底池可管理

HU PLO 具體翻牌場景：
  你的手牌：Q♠T♦8♣6♠
  翻牌：J♠9♦7♥
  你有：Nut Straight！

  9-max：快速下注，保護
  HU：
    選項 A：Donk Bet（60-70% pot）
    選項 B：Check-raise（讓對手 bet）

    HU 更傾向 Check-raise，因為對手的 C-bet 頻率高
    Check → 對手 Bet → 你 Raise = 建立大底池
```

### HU PLO MTT Final Table 的特殊考量

```
HU PLO Final Table（2 人剩餘）：

ICM 的影響：
  只有 1st 和 2nd 的差距
  ICM 壓力相對較小（你已獲得 2nd 名獎金）
  可以更自由地打 Chip EV

但仍需要注意：
  1st 和 2nd 的差距通常是 40-50% 的總獎金
  例：1st = $12,000，2nd = $7,000，差距 $5,000
  值得為此戰鬥，不要隨意認輸

HU PLO 的深疊 vs 短疊調整：
  深疊 HU（100bb+）：充分利用翻牌後技術差距
  短疊 HU（<30bb）：向 Push/Fold 靠攏，但仍有 limp/raise 靈活性

HU PLO 最後幾手的心態：
  接受更多 Variance（你已在 Final 2）
  打 Chip EV 最優化，而非 ICM 保守
  積極建立翻倍底池
```

---

## Bubble 和 Final Table 的通用原則

### 核心 Check List

```
在 Bubble 或 FT 做 all-in 決定之前，問自己：

1. 我的 PLO equity 是多少？
   < 45%：幾乎不打
   45-55%（flip）：需要重大 fold equity 或短疊無選擇
   55-65%（優勢）：通常打，但仍需 ICM 計算
   65%+（明顯優勢）：幾乎都打

2. 我的 ICM EV 影響是什麼？
   贏了：籌碼增加 X%，ICM EV 增加 Y%
   輸了：出局或短疊，ICM EV 損失 Z%
   Y% 的增加 vs Z% 的損失，哪個更大？

3. 有沒有「更好的時機」等待？
   有短疊在其他位置嗎？
   下一圈我會到 BTN 嗎？（更好的 Fold Equity）
   對手的 ICM 壓力比我更大嗎？

4. 這是 Nut 情況嗎？
   PLO 的 all-in 應該盡量在有 Nut 或接近 Nut 時進行
   「我有好牌」在 PLO 不夠，需要「我有最強可能的牌/draw」
```

### PLO Bubble 情緒管理

```
PLO Bubble 的情緒挑戰：

挑戰 1：「我有 AA！怎麼能 fold？」
  現實：AA 在 PLO 只有 65% 優勢，在 Bubble 可能 fold 是正確的
  解決方案：記住 PLO 的 all-in 機率，建立正確期望

挑戰 2：「我已經等很久了，這手牌必須打」
  現實：等待時間和決策正確性無關
  解決方案：每次決策獨立評估，不受過去影響

挑戰 3：「這個玩家很弱，我想 bluff 他」
  現實：PLO Bubble 的 bluff 成功率很低（多張牌的 range 太廣）
  解決方案：等待有 Equity 的情況，而非純 bluff

挑戰 4：「如果我 fold 進去，我也不會做什麼...」
  現實：「進了獎金圈」是重要的心理里程碑，後面有機會
  解決方案：接受在 Bubble 的謹慎，生存才能繼續
```

---

## 本章重點回顧

1. **PLO Bubble 特殊性**：PLO 的 all-in 更接近 flip，ICM 代價更高，需要比 NLH 更謹慎。
2. **大疊策略**：積極施壓獲取 fold equity，但避免 flip vs 另一個大疊。
3. **中疊策略**：等待大疊和短疊互打，避免大 PLO 底池，保護 ICM EV。
4. **短疊策略**：必須積極找機會 push，不能等到 Fold Equity 消失。
5. **Final Table**：每次出局的獎金跳幅更大，ICM 計算更重要，位置優勢更關鍵。
6. **HU PLO**：Range 大幅放寬，相對牌力更重要，Aggression 增加，可以打更多 Chip EV。

---

*延伸閱讀：`02-ICM與籌碼管理.md`，`05-線上PLO-MTT技巧.md`*
