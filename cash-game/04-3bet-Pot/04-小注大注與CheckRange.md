# 3bet Pot 的小注、大注與 Check Range

## 線上桌面設定

3bet pot sizing 要配合 range。小注適合 range advantage，高頻壓迫；大注適合 polar value 和強 bluff。

## 核心觀念

Check 不是放棄。OOP 尤其需要用 strong check、medium check-call、give-up 組成完整策略。

Cash game 的第一原則是：每一個決策都直接換算成長期 bb/100 和真實金額。沒有 ICM 可以保護錯誤，也沒有下一個 blind level 會幫你改變策略；你在這一手選擇的 open、call、3bet、下注尺度和河牌跟注，都會被 rake、位置、有效籌碼與對手類型直接校正。

## 決策流程

選 size 前先問：我的 range 是否壓倒對手？牌面是否需要 protection？下注後 SPR 如何？對手會如何反擊？

線上多桌時不要追求每一手都算到最細。你需要先建立 default，再依對手偏差調整：對手太緊就多偷、多小注；對手太愛跟就少 bluff、多 thin value；對手河牌下注不足就大幅降低 bluff-catch。這比背一張靜態表更接近可執行策略。

## 線上調整

線上 pool 若對小注過度 fold，可簡化成高頻 25-33% pot；若對手愛 raise，小注 range 要更能防守。

## 常見錯誤

用大注打整個 range，讓 bluff 成本過高；或永遠不 check 強牌。

## 練習

列一個 OOP 3bet pot check-call range，至少包含 5 種牌型。
