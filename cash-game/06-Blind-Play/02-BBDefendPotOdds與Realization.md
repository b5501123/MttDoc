# BB Defend：Pot Odds、Rake、Realization

## 線上桌面設定

BB 面對小 open 有漂亮 pot odds，但 OOP realization 低，且小底池 rake 會大幅影響 EV。

## 核心觀念

防守不是只看價格。76s 有可玩性，K4o 雖有高牌但常被 domination；小對需要足夠 implied odds，不是自動 call。

Cash game 的第一原則是：每一個決策都直接換算成長期 bb/100 和真實金額。沒有 ICM 可以保護錯誤，也沒有下一個 blind level 會幫你改變策略；你在這一手選擇的 open、call、3bet、下注尺度和河牌跟注，都會被 rake、位置、有效籌碼與對手類型直接校正。

## 決策流程

先看 open size、opener position、自己手牌可玩性，再看對手 postflop 是否會過度放棄。

線上多桌時不要追求每一手都算到最細。你需要先建立 default，再依對手偏差調整：對手太緊就多偷、多小注；對手太愛跟就少 bluff、多 thin value；對手河牌下注不足就大幅降低 bluff-catch。這比背一張靜態表更接近可執行策略。

## 線上調整

對 BTN 2BB open 可較寬 defend；對 UTG 3BB open 要明顯收緊。高 rake 下 offsuit trash 要少跟。

## 常見錯誤

把 pot odds 當唯一答案；或不考慮對手 position。

## 練習

選 20 手 BB fold/call spot，標記每手的 realization 來源。
