# 4bet、5bet Jam 與 Blocker

## 線上桌面設定

100BB cash 中 4bet pot 的 SPR 很低，preflop 決策會直接影響是否承諾整個 stack。

## 核心觀念

A blocker、K blocker 的價值在於降低對手持有 AA、AK、KK 的組合，但 blocker 不是免死金牌。若對手 3bet 範圍極緊，A5s blocker 仍可能是負 EV。

Cash game 的第一原則是：每一個決策都直接換算成長期 bb/100 和真實金額。沒有 ICM 可以保護錯誤，也沒有下一個 blind level 會幫你改變策略；你在這一手選擇的 open、call、3bet、下注尺度和河牌跟注，都會被 rake、位置、有效籌碼與對手類型直接校正。

## 決策流程

先判斷對手 3bet range：value-heavy、linear、polar 或亂 3bet。再決定 4bet value、4bet bluff 或 call。面對 5bet jam 時，用位置與對手族群修正。

線上多桌時不要追求每一手都算到最細。你需要先建立 default，再依對手偏差調整：對手太緊就多偷、多小注；對手太愛跟就少 bluff、多 thin value；對手河牌下注不足就大幅降低 bluff-catch。這比背一張靜態表更接近可執行策略。

## 線上調整

低 stakes population 的 5bet jam 常偏強，因此 QQ、AK 是否打光要看位置。BTN vs SB 可能能承受，UTG vs tight BB 通常要保守。

## 常見錯誤

看到 blocker 就 4bet，卻沒看對手是否會 fold；或因為不想被欺負而用 AQo 硬 call off。

## 練習

寫下你平台 100BB 常見 4bet size，並計算 4bet 後 SPR。
