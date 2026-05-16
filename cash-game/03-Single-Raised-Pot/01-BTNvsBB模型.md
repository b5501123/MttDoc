# BTN vs BB 的基礎模型

## 線上桌面設定

BTN open、BB call 是線上 cash 最常見的 single-raised pot。BTN 有位置與 range advantage，BB 有較寬防守但 OOP。

## 核心觀念

BTN 不是每個牌面都高頻 c-bet。A-high、K-high、乾燥牌面對 BTN 有利；低連張和雙同花牌面更接近 BB。

Cash game 的第一原則是：每一個決策都直接換算成長期 bb/100 和真實金額。沒有 ICM 可以保護錯誤，也沒有下一個 blind level 會幫你改變策略；你在這一手選擇的 open、call、3bet、下注尺度和河牌跟注，都會被 rake、位置、有效籌碼與對手類型直接校正。

## 決策流程

Flop 先判斷 range advantage 和 nut advantage，再選 size。小注適合高頻施壓，大注適合 polar range 與保護強牌。

線上多桌時不要追求每一手都算到最細。你需要先建立 default，再依對手偏差調整：對手太緊就多偷、多小注；對手太愛跟就少 bluff、多 thin value；對手河牌下注不足就大幅降低 bluff-catch。這比背一張靜態表更接近可執行策略。

## 線上調整

對 fold to c-bet 高的 BB，可以小注偷很多底池；對 check-raise 高的 BB，要增加 check back 和可繼續牌。

## 常見錯誤

用同一個 33% pot 打所有 flop；或以為 BTN 永遠優勢。

## 練習

拿 A72r、987ss、KQ4r 三個牌面，各寫 BTN c-bet 頻率。
