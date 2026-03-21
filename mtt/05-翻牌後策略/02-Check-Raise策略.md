# Check-Raise 策略

## Check-Raise 的本質

Check-raise（先 check，對手下注後 raise）是 OOP 玩家最重要的主動武器，也是 IP 玩家在有利情況下的強力進攻工具。

Check-raise 的目的：
1. **建立更大的底池**（強牌）
2. **剝奪對手的 equity**（bluff/semi-bluff）
3. **奪取主動權**（切換從被動到主動）
4. **保護自己的 range**（讓對手不能免費 bet 你所有的 check）

---

## Check-Raise 的兩種構成

### 構成一：Value Check-Raise

目的：建立底池，讓強牌賺更多錢。

典型情況：
- 你 OOP，持有 set（三條）或 two pair
- 翻牌你選擇 check（慢打），對手 c-bet，你 raise
- 讓對手在已建立的底池基礎上再投入

**常見的 value CR 手牌：**
- Set（三條）在幾乎所有翻牌
- Two pair（在配對或連接翻牌）
- Strong top pair 在乾燥翻牌（有時 CR 比 donk bet 更好）
- Nut flush（成牌後的 CR）

### 構成二：Semi-bluff Check-Raise

目的：有 equity（可以 fold out 對手，也可以打出 draw），同時建立主動權。

典型情況：
- 你有 flush draw 或 open-ended straight draw（OESD）
- 翻牌你 check，對手 c-bet，你 raise
- 目標：對手 fold（最好）或你繼續並打出 draw（次好）

**為什麼選 semi-bluff 而非純 bluff CR：**
- Semi-bluff 有後手的 equity（即使被 call，有機會打出 draw）
- 純 bluff CR 被 call 後完全無 equity，極高風險

---

## 適合 Check-Raise 的翻牌

### 高頻 CR 的翻牌

**Wet/Connected Boards（連接型，多 draw 的翻牌）：**
- 9-8-7（rainbow 或 flush draw）
- J-T-6s（有 flush draw 可能）
- 8-7-6

為什麼：這類翻牌你的 range 有大量 draw，CR 可以代表 semi-bluff draw 或強牌（set/two pair），讓對手難以應對。

**Paired Boards（配對翻牌）：**
- K-K-5
- Q-Q-3

在配對翻牌，如果你 CR，暗示你有三條（KKx 或 QQx），對手的 TPTK 等強牌也難以繼續。

### 低頻 CR 的翻牌

**High Dry Boards（高牌乾燥）：**
- A-K-5 rainbow
- A-Q-2 rainbow

在這類翻牌，pre-flop aggressor（如 UTG open）的 range 有壓倒性優勢（大量 AK、AA、KK），你很少有 set 或 two pair 需要 CR。CR bluff 在這裡效果差。

---

## Check-Raise Sizing

### 翻牌 CR 尺寸

一般是對手 c-bet 的 2.5-3.5x：

| 對手 c-bet（底池 100%）| CR 到 | 底池比例 |
|----------------------|-------|--------|
| 33% 底池（33） | 約 75-90 | 75-90% |
| 50% 底池（50） | 約 120-150 | 120-150% |
| 75% 底池（75） | 約 175-225 | 175-225% |

**OOP CR 通常要更大（接近 3x 或以上），讓對手面對更難的決定。**

### 轉牌 CR 尺寸

轉牌 CR 通常更大（2-3x 對手 bet），因為：
- 更少的人繼續（已過翻牌，底池更大）
- CR 的 semi-bluff equity 更清楚（draw 完成的機會只剩 1 張牌）

---

## MTT ICM 對 Check-Raise 的影響

ICM 對 CR 的影響主要在 call/fold 決策：

**在 Bubble 附近：**
- 對手的 CR 代表更強的 range（因為中疊不會在 bubble 用 semi-bluff CR）
- 你面對 CR 時，fold 的頻率應該比平時更高（即使 Chip EV 說 call）
- 自己做 CR semi-bluff 時，需要更強的 semi-bluff 手牌（有足夠 equity）

**在早期深疊：**
- CR 打法相對接近 GTO/Cash Game 標準
- 可以充分運用 semi-bluff CR 建立籌碼

---

## 線上 MTT 的 Check-Raise 應用

### 對手 fold to check-raise 偏高

線上玩家（尤其不熟悉 GTO 的玩家）面對 CR 的 fold rate 偏高，因為：
- 他們把 CR 當作「很強的手牌」
- 不習慣面對 CR 後繼續（pass mentality）
- 多桌玩家對 CR 的反應更被動（不想深入思考）

**利用方式：**
選擇正確的翻牌（wet board，你有 semi-bluff draw）進行 CR，成功率比理論更高。

### 注意 CR 的頻率平衡

即使對手 fold to CR 高，也需要保持 value + bluff 的平衡：
- 只做 value CR → 對手很快學會 fold 到你的 CR 即可，不需要 call
- 加入 semi-bluff CR → 對手必須 call 來保護，這也讓你的 value CR 更有效

---

## 常見錯誤

**錯誤 1：在不適合的翻牌 CR bluff**
Dry board（A-7-2），你 CR 沒有 equity，被 call 後幾乎輸。

**錯誤 2：CR size 太小**
CR 太小讓對手可以 call 很多手牌，失去了 CR 的 fold equity。

**錯誤 3：忘記平衡（純 value CR）**
只在有 set/two pair 時 CR，對手可以 fold 所有其他手牌到你的 CR，你的 value 大幅減少。

**錯誤 4：ICM 時期過度 CR bluff**
Bubble 附近，自己的 CR bluff 被 call 後出局的代價太高，應謹慎選擇 CR 時機。
