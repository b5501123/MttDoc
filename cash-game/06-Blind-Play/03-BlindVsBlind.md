# Blind vs Blind：SB Limp、Raise、3bet

## 線上桌面設定

Blind vs blind 是特殊場景，SB 只有一個玩家要過，但翻牌後 OOP；BB 有位置但 range 很寬。

## 核心觀念

SB 可使用 raise-only 或 mixed limp strategy。簡化學習時，低 stakes 可以先用 raise-or-fold，再對被動 BB 加入 limp。

Cash game 的第一原則是：每一個決策都直接換算成長期 bb/100 和真實金額。沒有 ICM 可以保護錯誤，也沒有下一個 blind level 會幫你改變策略；你在這一手選擇的 open、call、3bet、下注尺度和河牌跟注，都會被 rake、位置、有效籌碼與對手類型直接校正。

## 決策流程

SB raise 後，BB defend 很寬；所以 flop 不能用一般 BTN vs BB 模型直接套用。SB 需要更多 check 和小注策略。

線上多桌時不要追求每一手都算到最細。你需要先建立 default，再依對手偏差調整：對手太緊就多偷、多小注；對手太愛跟就少 bluff、多 thin value；對手河牌下注不足就大幅降低 bluff-catch。這比背一張靜態表更接近可執行策略。

## 線上調整

若 BB overfold，SB 可高頻 raise；若 BB 攻擊 limp 太少，SB limp 可以提高實現率。

## 常見錯誤

SB limp 後面對 raise 亂 call；或 SB raise 太小讓 BB 幾乎全 defend。

## 練習

觀察 100 手 BvB，記錄 BB 對 SB raise 的 fold 率。
