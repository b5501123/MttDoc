# Fast-fold 的優缺點

## 線上桌面設定

Fast-fold 讓你 fold 後立即換桌，手數高、等待少，但 table selection 和玩家針對性下降。

## 核心觀念

Fast-fold pool 通常 preflop 更緊，因玩家能快速棄牌等好牌。偷盲、3bet 和 c-bet 需要依 pool 調整。

Cash game 的第一原則是：每一個決策都直接換算成長期 bb/100 和真實金額。沒有 ICM 可以保護錯誤，也沒有下一個 blind level 會幫你改變策略；你在這一手選擇的 open、call、3bet、下注尺度和河牌跟注，都會被 rake、位置、有效籌碼與對手類型直接校正。

## 決策流程

優點是練習量大；缺點是容易 autopilot。你需要更簡化的 baseline 和更嚴格的 hand marking。

線上多桌時不要追求每一手都算到最細。你需要先建立 default，再依對手偏差調整：對手太緊就多偷、多小注；對手太愛跟就少 bluff、多 thin value；對手河牌下注不足就大幅降低 bluff-catch。這比背一張靜態表更接近可執行策略。

## 線上調整

無固定座位讓 exploit 更偏 population，不適合追著單一 fish。若 regular table 有好桌，通常更有價值。

## 常見錯誤

把 fast-fold 當作快速印錢；或因手數多忽略每手 quality。

## 練習

比較你 regular table 和 fast-fold 的 BTN/BB winrate。
