# Fast-fold Pool 策略

## 線上桌面設定

Fast-fold pool 的玩家能快速 fold 等好牌，因此平均 preflop range 常比 regular table 更緊。

## 核心觀念

你要用 population strategy：偷盲可以增加，但被抵抗時要尊重；postflop 不要假設對手亂來。

Cash game 的第一原則是：每一個決策都直接換算成長期 bb/100 和真實金額。沒有 ICM 可以保護錯誤，也沒有下一個 blind level 會幫你改變策略；你在這一手選擇的 open、call、3bet、下注尺度和河牌跟注，都會被 rake、位置、有效籌碼與對手類型直接校正。

## 決策流程

先測試 pool 對 BTN steal、SB steal、flop c-bet 的反應。若 overfold，用小注與 steal；若 regular 多，回到 baseline。

線上多桌時不要追求每一手都算到最細。你需要先建立 default，再依對手偏差調整：對手太緊就多偷、多小注；對手太愛跟就少 bluff、多 thin value；對手河牌下注不足就大幅降低 bluff-catch。這比背一張靜態表更接近可執行策略。

## 線上調整

Fast-fold 因手數大，tilt 也放大。每 30 分鐘強制休息比 regular table 更重要。

## 常見錯誤

因為對手換很快就亂 bluff；或完全不做 population exploit。

## 練習

比較 fast-fold 中 BTN steal 成功率與 regular table 差異。
