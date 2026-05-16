# SB / BB 防守邏輯

## 線上桌面設定

SB 永遠 OOP 且背後還有 BB，因此 cold call 很難賺錢；BB 已投入 1BB，有較好 pot odds，但仍受 rake 和 realization 限制。

## 核心觀念

SB 應偏 3bet 或 fold，少冷跟。BB 可以 defend 較寬，但不是無限 defend；高 rake 下邊界 offsuit hand 會變差。

Cash game 的第一原則是：每一個決策都直接換算成長期 bb/100 和真實金額。沒有 ICM 可以保護錯誤，也沒有下一個 blind level 會幫你改變策略；你在這一手選擇的 open、call、3bet、下注尺度和河牌跟注，都會被 rake、位置、有效籌碼與對手類型直接校正。

## 決策流程

SB 面對 steal：先看 opener 和 BB 類型，再決定 linear 3bet 或 fold。BB 面對 steal：看 open size、位置、手牌可玩性與對手 postflop 漏洞。

線上多桌時不要追求每一手都算到最細。你需要先建立 default，再依對手偏差調整：對手太緊就多偷、多小注；對手太愛跟就少 bluff、多 thin value；對手河牌下注不足就大幅降低 bluff-catch。這比背一張靜態表更接近可執行策略。

## 線上調整

線上 BTN 小 open 很常見，BB 不能只因價格好就跟所有兩張可看牌。OOP realization 低，rake 也會吃掉薄利。

## 常見錯誤

SB complete 過多、BB 看到 suited 就跟、或從盲位用 dominated Ax 打大底池。

## 練習

複盤最近 20 手 BB defend，標記哪些只是因為『便宜』而跟。
