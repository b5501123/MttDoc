# 3-bet 和 4-bet 策略

## 基本定義

- **Open（1bet）**：第一個加注
- **3-bet**：對 open 的再加注
- **4-bet**：對 3-bet 的再加注
- **5-bet（all-in）**：通常在 100bb 深度就是全壓

---

## 為什麼需要 3-bet？

1. **價值（Value）**：你有強牌，想要建立更大的底池
2. **偷盲（Steal）**：3-bet 可以把 open 者擠出去，獲得底池
3. **位置（Position）**：在 IP 3-bet 讓你翻牌後有位置優勢
4. **壓縮 SPR（Range Advantage）**：3-bet 後 SPR 更低，簡化後手

---

## 3-bet 的構成

**平衡的 3-bet range = Value + Bluff**

如果你只 3-bet value（QQ+, AKs）：
→ 對手知道你 3-bet = 強牌，輕易 fold → 你拿不到 EV

如果你加入 bluff：
→ 對手無法 fold 全部，你的 value 賺更多
→ 你的 bluff 有時候贏底池

**3-bet bluff 的選擇原則：**
用有一定牌力（semi-bluff）的手牌做 bluff：
- Suited Ace（A2s-A5s）：有 flush draw + 後門 nut flush
- 低端 suited connector（76s, 65s）：有連牌潛力
- Blockers：有 A 或 K 阻斷對手的強牌

---

## 3-bet Sizing

**OOP 3-bet（你在 SB/BB 對 open）：** 約 3-4x open size

```
對手 open 2.5bb → 你 OOP 3-bet：8-10bb
```

**IP 3-bet（你在 BTN/CO 對 open）：** 約 2.5-3x open size

```
對手 open 2.5bb → 你 IP 3-bet：7-8bb
```

**為什麼 IP 可以 3-bet 更小？**
IP 有位置優勢，即使 3-bet 小，翻牌後的位置讓你有更多操作空間。

---

## 各位置 3-bet Range

### BB 對 BTN open（OOP 3-bet）

**BB 3-bet range 約 12-15%**

```
Value（100%頻率 3-bet）：
- AA, KK, QQ, JJ
- AKs, AKo

Semi-value（高頻 3-bet）：
- TT, 99（視對手 BTN range）
- AQs, AJs

Bluff（3-bet 保持平衡）：
- A2s-A5s（Blocker + suited）
- KQs（強牌，也有價值成份）
- 76s, 65s, 87s（suited connector）
```

### BTN 對 CO open（IP 3-bet）

**BTN 3-bet range 約 10-13%**

```
Value：
- QQ+, AKs, AKo

Semi-value：
- JJ, TT, AQs

Bluff：
- A2s-A5s
- K5s-K9s（有 Blocker）
- 65s, 76s, 87s
```

### SB 對 BTN open

**SB 3-bet range 約 13-17%（傾向加大）**

SB 的特殊性：
- SB call BTN open 後，翻牌後 OOP 且有 BB 在後面
- SB call 比 SB 3-bet 更糟（3-bet 可以清場或縮小底池）
- SB 應該 **3-bet or fold**，幾乎不 call

```
SB 3-bet：幾乎全部 3-bet range + fold range
SB call：幾乎不 call（除非 BTN range 很寬時偶爾 call）
```

---

## 面對 3-bet 的選擇

對手 3-bet 後，你有三個選項：

### 選項 1：4-bet（再加注）
適用：
- 你有很強的牌（QQ+, AKs）
- 你想要做 4-bet bluff（有 blockers 的手牌）

4-bet 尺寸：約 2-2.2x 3-bet size（深疊）
例：對手 3-bet 10bb → 你 4-bet 22-24bb

### 選項 2：Call
適用：
- 有良好的 IP（你在 IP）
- 手牌有翻牌潛力（JJ, TT, suited connectors）
- Pot odds 合理

**Trap（慢打）：**
偶爾 call AA/KK 而不是 4-bet，製造平衡性。

### 選項 3：Fold
適用：
- OOP 且手牌不夠強
- 對手 3-bet range 很緊
- ICM 壓力高（Bubble）

---

## 4-bet Range

**4-bet = Value + Bluff**

```
4-bet value（無條件）：
- AA, KK（偶爾 slowplay 除外）
- QQ+（視對手 3-bet range）

4-bet bluff（有 blocker）：
- AKo, AQs（有 A blocker，阻止對手的 AA/KK/AK）
- A5s, A4s（suited + blocker）
- KQs（有 K blocker）
```

**4-bet bluff 的邏輯：**
> 如果我有 A，對手就少了一個 A
> 對手的 AA/AK 機率下降
> 我的 4-bet bluff 成功率更高

---

## 3-bet/4-bet 在 MTT 的特殊考量

### 籌碼深度影響

**深疊（100bb+）：**
- 可以做完整的 3-bet/4-bet/5-bet 遊戲樹
- Bluff 空間最大

**中疊（40-60bb）：**
- 3-bet 後 SPR 很低，接近 committed
- 3-bet range 要更緊（因為 3-bet 後基本就是 all-in or fold）
- 4-bet 通常就是 all-in

**短疊（20-35bb）：**
- 3-bet = all-in（或接近 all-in）
- 不再有多條街的考量
- 這個 stack 深度的 3-bet range 要謹慎

### ICM 影響

**Bubble 時：**
- 3-bet bluff 頻率降低
- 4-bet 要更謹慎（committed 後 ICM 損失大）
- 對大疊的 3-bet：value range 縮緊

**Final Table：**
- 每次 3-bet 都要考慮 ICM
- 輕易的 3-bet bluff 可能讓你 bubble out FT

---

## 常見錯誤

### 錯誤 1：3-bet 太純 value
「我只 3-bet QQ+, AK」
→ 對手知道你 3-bet = 怪物，全部 fold 給你
→ 你需要加入 bluff 讓對手無法輕易 fold

### 錯誤 2：SB open call 太多
「我有 JTs，call BTN 的 open 吧」
→ 翻牌後 OOP，且 BB 可能 squeeze
→ SB 應該 3-bet or fold

### 錯誤 3：中疊隨意 3-bet
「我有 AQs，3-bet 吧」
→ 30bb 時 3-bet 後你已經 committed
→ 要確認你願意 all-in 才 3-bet

### 錯誤 4：忽略 4-bet bluff
「我只 4-bet value」
→ 對手知道你 4-bet = AA/KK，fold QQ, JJ, AK
→ 需要 A5s, AQo 等 blocker 做 4-bet bluff

---

下一章：偷盲與反偷策略。
