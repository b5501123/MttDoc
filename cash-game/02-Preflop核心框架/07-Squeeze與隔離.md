# Squeeze 與多人入池前隔離

## 線上桌面設定

當前面有人 open 且至少一人 call，squeeze 可以直接拿下死錢，也能隔離弱玩家進入較低 SPR 底池。

## 核心觀念

Squeeze 的 value 來自 dead money、fold equity、位置和對 cold caller capped range 的攻擊。高 rake 環境下，squeeze 往往比跟注進多人底池更乾淨。

Cash game 的第一原則是：每一個決策都直接換算成長期 bb/100 和真實金額。沒有 ICM 可以保護錯誤，也沒有下一個 blind level 會幫你改變策略；你在這一手選擇的 open、call、3bet、下注尺度和河牌跟注，都會被 rake、位置、有效籌碼與對手類型直接校正。

## 決策流程

先確認 opener 是否會 4bet、caller 是否太愛跟、自己位置是否 OOP。若多人都不 fold，squeeze range 要偏 value，size 也要夠大。

線上多桌時不要追求每一手都算到最細。你需要先建立 default，再依對手偏差調整：對手太緊就多偷、多小注；對手太愛跟就少 bluff、多 thin value；對手河牌下注不足就大幅降低 bluff-catch。這比背一張靜態表更接近可執行策略。

## 線上調整

線上低 stakes 常有 open + 2 callers，這時小 squeeze 只會製造大多人底池。OOP squeeze 要加大，並減少純 bluff。

## 常見錯誤

拿沒有 blocker、沒有可玩性的垃圾牌 squeeze；或用太小 size 讓所有人跟。

## 練習

找三手 open + call spot，寫出你會 squeeze 的 value 和 bluff。
