# 平 Call 與 Range 分配：哪些牌 Flat，哪些牌 3-bet

## 核心問題

面對對手 open，你有一手好牌。
你應該 **3-bet** 還是 **flat call**？

很多玩家的直覺是「有好牌就 3-bet」，但這是錯的。
正確答案取決於：**手牌特性、位置、對手類型**。

---

## 兩種 Range 構成方式

### Linear Range（合併型）

3-bet 只打最強的手牌，中等手牌 call，弱牌 fold。

```
例：面對 UTG open
3-bet：AA, KK, QQ, AKs（頂端強牌）
Call：JJ, TT, AQs, KQs（中等強牌，有翻牌潛力）
Fold：弱牌
```

**Linear range 的邏輯：**
中等牌（JJ, TT, AQs）如果 3-bet，對手 4-bet 時你很難受。
Call 進去，SPR 合適，翻牌後打更清楚。

---

### Polar Range（兩極型）

3-bet 打最強牌 + bluff，中等牌 call。

```
例：面對 BTN open，你在 BB
3-bet value：AA, KK, QQ, AK
3-bet bluff：A5s, A4s, 76s（blocker + suited）
Call：JJ, TT, 99, AQs, KQs（中等牌，IP/OOP 影響）
```

**Polar range 的邏輯：**
中等牌讓對手 fold all bluffs 後無法打（被 4-bet 很難受），
直接進入 call range 打翻牌後更有優勢。

---

## 決定 Flat Call 還是 3-bet 的因素

### 因素 1：你是否有位置（IP/OOP）

**IP（你有位置）：Flat call 更有價值**

IP flat call 的優點：
- 翻牌後最後行動，有完整資訊
- 可以控制底池大小
- 對手的 bluff 更容易利用（他 bet → 你 call/raise）

```
你在 BTN，CO open：
JJ, TT, AQs → 傾向 flat call（IP，有翻牌後空間）
AA, KK → 可以 3-bet（建大底池）或偶爾 flat（陷阱）
```

**OOP（你無位置）：Flat call 更難打**

OOP flat call 的缺點：
- 翻牌後先行動，被動
- 對手可以用位置剝削你
- SPR 合理時仍然值得，但難度更高

```
你在 BB，BTN open：
JJ, TT → 可以 call（BB 有 discount）或 3-bet
AQs → 可以 call 或 3-bet（兩種都合理）
AA, KK → 幾乎都要 3-bet（OOP 需要縮小底池）
```

---

### 因素 2：對手 open 位置（Range 緊窄程度）

**對手 range 越緊 → Flat call 更多中等牌**

```
UTG open（range 12-15%，只有強牌）：

你在 BTN，有 AQs：
UTG range 包含很多 AK, QQ+
你的 AQs 對 UTG range 勝率約 40-45%

3-bet 的問題：UTG 很難 fold，4-bet 了你很難受
Flat call 的優點：SPR 合適，翻牌後打更清楚

→ 建議：Flat call AQs
```

**對手 range 越寬 → 3-bet 更多**

```
BTN open（range 42-52%，很多弱牌）：

你在 BB，有 AQs：
BTN range 很寬，有很多弱牌
你 3-bet 後，BTN fold 很多弱牌 → 你贏底池
即使被 call，你的 AQs 翻牌前後都有優勢

→ 建議：3-bet AQs（對寬 range 的 3-bet 更有利）
```

---

### 因素 3：手牌的翻牌潛力（Implied Odds）

**有強翻牌潛力的牌 → Flat call 更好**

```
小對子（22-55）：
- 翻牌 Set 機率 ≈ 11%
- Set 後可以贏大底池
- IP 深疊 flat call 是標準打法
- 3-bet 後 SPR 太低，失去 set mining 的意義
```

```
Suited Connector（87s, 76s, 65s）：
- 有 flush draw, straight draw 潛力
- IP 深疊 flat call，等翻牌發力
- OOP 較難打（先行動）
```

**直接牌力強的牌 → 3-bet 更好**

```
AA, KK：
- 翻牌潛力不是重點，現在就是最強的牌
- 需要建大底池
- 對手的 range 越寬，3-bet 越好（有人跟就賺）
```

---

## 9-max 各場景的 Call vs 3-bet 建議

### 場景 1：BTN open，你在 CO（IP）

```
3-bet：AA, KK, QQ, AKs（value）
       A5s, A4s, KQs（polar bluff）
Call：JJ, TT, 99, AQs, AJs（中等牌 IP）
      KQs, KJs（有 implied odds）
      小對子（set mining）
      Suited connector（87s, 76s）
Fold：弱牌
```

### 場景 2：CO open，你在 BTN（IP）

```
3-bet：AA, KK, QQ, AK（value）
       A5s-A2s, K9s, 76s（bluff）
Call：JJ, TT, 99, AQs, AJs
      KQs, KJs, QJs
      22-88（set mining）
      87s, 76s, 65s
```

### 場景 3：BTN open，你在 BB（OOP）

```
3-bet：AA, KK, QQ, AK（value，OOP 建底池）
       JJ, TT（semi-value，不想 call OOP）
       A5s-A2s, KQs, 87s（bluff，有 equity）
Call：99, 88, AQs, AJs（中等牌，BB discount）
      KQs（有利可圖）
      部分小對子（discount 讓 set mining 值得）
Fold：邊緣牌（OOP 難打）
```

### 場景 4：UTG open，你在 BTN（IP）

```
3-bet：AA, KK（value，UTG 也可能 call）
       AKs, QQ（semi-value）
       A4s, A3s（polar bluff with blocker）
Call：JJ, TT, 99（中等對子，IP set mining）
      AQs, AJs（有牌力，IP 可以打）
      KQs, QJs（suited Broadway）
      小對子（IP 深疊 set mining）
Fold：AQo（OOP 情況不同，BTN 是 IP 可以 call）
```

---

## 平 Call 之後的心態

Flat call 進翻牌後，你的任務是：

```
翻牌中了強牌 → 根據對手行為選擇 value line
翻牌有 draw → 根據 pot odds 和 equity 決定是否 continue
翻牌 miss → 評估是否繼續（floating）或放棄
```

**Flat call 的常見錯誤：**
- Call 了但翻牌後完全被動（只 check-fold）
- 不知道自己的手牌在什麼 range 內（confused call）
- Call 了小對子但 miss set 就亂打（應該 check/fold）

---

## 線上 MTT 的 Flat Call 特別考量

**線上玩家的常見行為：**
- 面對 3-bet fold 太多（50-70%）→ 你的 3-bet bluff 價值更高
- Flat call 被識別為「弱牌」→ 對手 c-bet 頻率更高
- 你可以利用：**用強牌 flat，然後 check-raise 對手的 c-bet**

**多桌時的 flat call 建議：**
- 多桌時盡量簡化 → 傾向 3-bet or fold，少用 flat call
- 需要翻牌後深度思考的 flat call 手牌（suited connector, small pair）在多桌時容易打錯
- 單桌時可以完整利用 flat call 的翻牌後價值

---

## 速查：這手牌應該 3-bet 還是 call？

```
問以下問題：

1. 我有位置嗎？
   有 → Call 更有吸引力
   沒有 → 傾向 3-bet or fold

2. 對手的 range 緊還是寬？
   緊（UTG）→ 中等牌傾向 call
   寬（BTN）→ 中等牌傾向 3-bet

3. 手牌有 implied odds 嗎？
   有（小對子、suited connector）→ IP deep stack 傾向 call
   沒有（AQo, KQo）→ 傾向 3-bet（發揮直接牌力）

4. ICM 壓力高嗎？
   高（Bubble/FT）→ 減少 flat call，簡化決策
   低（早期）→ 可以做更多 flat call
```
