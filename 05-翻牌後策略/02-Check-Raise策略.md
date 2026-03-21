# Check-Raise 策略

## Check-Raise 的定義

**Check-Raise** = 先過牌，對手下注後，你加注。

這是 OOP（無位置）玩家最強的武器之一。

---

## 為什麼需要 Check-Raise

### 防止被免費打牌

如果你 OOP 只會 check-call：
- 對手可以用任何手牌 bet，拿到免費資訊
- 你的 strong hand 只能被動收錢
- 對手可以控制底池大小

加入 Check-Raise 後：
- 對手無法知道你 check = 弱牌
- 對手的 bet 風險提高
- 你可以用 strong hand 建大底池

### 平衡你的 check range

如果你 check 只代表弱牌：
- 對手 bet 100%
- 你的 check-call 範圍被剝削

加入 Check-Raise Value + Bluff：
- 對手 bet 頻率降低（怕被 check-raise）
- 你的所有 range 都更難讀

---

## Check-Raise 的構成

### Check-Raise Value

強牌做 check-raise，建立大底池：
- 頂對頂踢腳（TPTK）：A♠ K♥ 7♣ 翻牌，你有 AK
- 兩對（two pair）
- 暗三條（set）
- 順子或同花

### Check-Raise Bluff / Semi-Bluff

用有 draw 的手牌做 check-raise：

**Semi-bluff（有後備 equity）：**
- Flush draw（9 outs）
- Open-ended straight draw（8 outs）
- Combo draw（flush + straight，15 outs）

為什麼 semi-bluff 比純 bluff 好：
- 被 call 時仍有改善機率
- 翻牌 check-raise，即使被 call，轉牌可能完成 draw
- 風險低於純 bluff

**選擇 Check-Raise Bluff 的原則：**
1. 有一定 equity（不要用 pure air）
2. 能接受被 call（有後手計劃）
3. 翻牌質地配合（有 draw 的翻牌更適合 CR bluff）

---

## Check-Raise Sizing

**翻牌 Check-Raise：**
通常是對手 bet 的 2.5-3倍

```
對手 bet 50% pot（假設底池 100，bet 50）
你 Check-Raise：到 125-150（約 2.5-3x）
```

**為什麼不更小？**
Check-Raise 太小 = 對手有很好的 pot odds call
你想要 fold equity + 正確的 pot size

**為什麼不更大？**
太大讓你的 bluff 風險太高，且 value 也損失 call range

---

## 哪些翻牌適合 Check-Raise

### 高頻 Check-Raise 翻牌

**1. 連牌翻牌（你有 Set/Two pair/Draw）**
例：T♣ 9♦ 8♠
你有 TT, 99, 88（set）→ check-raise value
你有 JTs, J9s（open-ended）→ check-raise semi-bluff
你有 A♠ J♠（backdoor）→ 可以加入 bluff

**2. 你 range advantage 更強的翻牌**
例：你 BB call UTG open，翻牌 7-6-2
UTG range 不包含 76s, 65s → 你的 range 在這個翻牌更強
可以積極 check-raise

### 低頻 Check-Raise 翻牌

**高牌翻牌，對手 range advantage 更強：**
例：A♠ K♦ 9♣（你是 BB，對手 UTG open）
對手的 AK, AA, KK 比你多
→ 謹慎 check-raise，大多 check-call 或 fold

---

## MTT Check-Raise 的特殊考量

### 籌碼深度影響

**深疊（100bb+）：**
Check-Raise 後仍有多條街，semi-bluff 效果最好。

**中疊（30-50bb）：**
翻牌 check-raise 後，SPR 降低，可能快速進入 all-in 決策。
要確認你願意繼續打多條街。

**短疊（<30bb）：**
翻牌 check-raise 後可能立刻 all-in 面對。
只在真正的 value 或很強的 semi-bluff 才用。

### ICM 調整

Bubble/FT 時：
- 純 bluff Check-Raise 頻率降低
- 更多 check-call，避免建大底池
- Semi-bluff CR 可以保留，但要控制尺寸

---

## 實戰判斷流程

```
1. 你有 strong value 嗎？（set, two pair, TPTK in right spot）
   → 是：Check-Raise value 建大底池

2. 你有 strong draw 嗎？（flush draw, OESD, combo draw）
   → 是：Check-Raise semi-bluff

3. 翻牌對你的 range 有利嗎？（你 BB call，低牌翻牌）
   → 是：可以加入 bluff

4. 對手的 bet 代表什麼？（純 C-bet bluff vs strong hand）
   → 對手 likely bluffing：Check-Raise 效果好
```

---

## 常見錯誤

### 錯誤 1：從不 Check-Raise
只 check-call，給對手免費打牌空間。
對手學會你 check = 弱牌。

### 錯誤 2：Check-Raise 太頻繁（空氣牌）
沒有 equity 就 bluff Check-Raise。
被 call 後沒有出路。

### 錯誤 3：Check-Raise size 太小
Check-Raise 到 2x（應該是 2.5-3x）
對手輕鬆 call，你的 bluff 成功率低。

---

下一章：多條街打法（轉牌和河牌）。
