# Multiway Pot 的 Equity Realization

## 線上桌面設定

多人底池中，每個玩家都有一部分 equity，且 bluff 要通過多人，fold equity 大幅下降。

## 核心觀念

你的 top pair 在 heads-up 可能是 value，在四人底池可能只是中等牌。越多人進池，越要重視 nut potential。

Cash game 的第一原則是：每一個決策都直接換算成長期 bb/100 和真實金額。沒有 ICM 可以保護錯誤，也沒有下一個 blind level 會幫你改變策略；你在這一手選擇的 open、call、3bet、下注尺度和河牌跟注，都會被 rake、位置、有效籌碼與對手類型直接校正。

## 決策流程

先看玩家人數、位置、誰是 preflop aggressor、牌面是否連接。多人時用更緊 value range 和更少 bluff。

線上多桌時不要追求每一手都算到最細。你需要先建立 default，再依對手偏差調整：對手太緊就多偷、多小注；對手太愛跟就少 bluff、多 thin value；對手河牌下注不足就大幅降低 bluff-catch。這比背一張靜態表更接近可執行策略。

## 線上調整

線上低 stakes 很多 limp/call 多人底池，最賺的是對弱玩家 value bet，而不是代表強 range。

## 常見錯誤

在多人底池用 heads-up c-bet 頻率；或用非 nut draw 打超大。

## 練習

複盤 10 手多人底池，標記你是否過度 c-bet。
