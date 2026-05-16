# Rake 如何改變策略

## 線上桌面設定

線上低 stakes 通常 rake 高，小底池與翻牌前跟注受影響最大。很多看似 breakeven 的 call，實際被 rake 變成負 EV。

## 核心觀念

Rake 會懲罰冷跟、SB complete、BB 過度 defend、弱同花連張和小對 set mining。越低 stakes，越要偏向 3bet 或 fold，少做邊界 call。

Cash game 的第一原則是：每一個決策都直接換算成長期 bb/100 和真實金額。沒有 ICM 可以保護錯誤，也沒有下一個 blind level 會幫你改變策略；你在這一手選擇的 open、call、3bet、下注尺度和河牌跟注，都會被 rake、位置、有效籌碼與對手類型直接校正。

## 決策流程

面對 open，先問：我跟注後是否常進小底池？是否 OOP？是否容易拿第二好的牌？若三個答案偏負，就不要因為 pot odds 看似漂亮而 call。

線上多桌時不要追求每一手都算到最細。你需要先建立 default，再依對手偏差調整：對手太緊就多偷、多小注；對手太愛跟就少 bluff、多 thin value；對手河牌下注不足就大幅降低 bluff-catch。這比背一張靜態表更接近可執行策略。

## 線上調整

平台 rake cap 越高，preflop calling range 越要收緊。對 loose opener，可用 value-heavy 3bet isolate，而不是帶一堆 dominated hand 進多人底池。

## 常見錯誤

把 solver 無 rake 或低 rake 策略照抄到 micro stakes；尤其在 SB、BB、cold call spot 損失最大。

## 練習

列出你目前最常冷跟的 10 程牌，逐一標記是否受 rake 和 OOP 影響。
