# Call、3bet、Fold 的 EV 分解

## 線上桌面設定

面對 open 時，你的三個主要選項是 fold、call、3bet。Call 看似便宜，但會承擔 rake、位置、domination 和 realization 問題。

## 核心觀念

3bet 不只是 bluff，也不是只代表 AA。它可以隔離弱玩家、拿主動權、讓對手用較差 range 繼續；call 則需要足夠 implied odds 和翻牌後可實現率。

Cash game 的第一原則是：每一個決策都直接換算成長期 bb/100 和真實金額。沒有 ICM 可以保護錯誤，也沒有下一個 blind level 會幫你改變策略；你在這一手選擇的 open、call、3bet、下注尺度和河牌跟注，都會被 rake、位置、有效籌碼與對手類型直接校正。

## 決策流程

決策流程：先判斷 opener 位置與 range；再看自己位置；再看背後 squeeze 風險；最後看手牌是否適合 call 或 3bet。

線上多桌時不要追求每一手都算到最細。你需要先建立 default，再依對手偏差調整：對手太緊就多偷、多小注；對手太愛跟就少 bluff、多 thin value；對手河牌下注不足就大幅降低 bluff-catch。這比背一張靜態表更接近可執行策略。

## 線上調整

線上低 stakes 對 open 太多人 cold call 時，應減少邊界 cold call，增加 value squeeze。對 fold to 3bet 過高的玩家，加入 Axs、Kxs blocker 3bet。

## 常見錯誤

看到 suited 就 call，看到 A 就 3bet；忽略 opener 的位置和背後玩家。

## 練習

選 10 手你曾 cold call 的牌，分別寫出 call EV 來源。
