# Straddle Tables

## 線上桌面設定

Straddle 會提高實際盲注，讓有效籌碼用 BB 計算變淺。例如 100BB buy-in 在 straddle 後可能只剩 50 straddle BB。

## 核心觀念

你必須用 straddle 作為新大盲重新計算 stack depth、open size 和 SPR。很多深碼策略會因此失效。

Cash game 的第一原則是：每一個決策都直接換算成長期 bb/100 和真實金額。沒有 ICM 可以保護錯誤，也沒有下一個 blind level 會幫你改變策略；你在這一手選擇的 open、call、3bet、下注尺度和河牌跟注，都會被 rake、位置、有效籌碼與對手類型直接校正。

## 決策流程

先確認 straddle 是否固定、位置在哪、行動順序如何。再調整 open range 和 3bet size。

線上多桌時不要追求每一手都算到最細。你需要先建立 default，再依對手偏差調整：對手太緊就多偷、多小注；對手太愛跟就少 bluff、多 thin value；對手河牌下注不足就大幅降低 bluff-catch。這比背一張靜態表更接近可執行策略。

## 線上調整

線上 straddle 桌底池更大、玩家更鬆，value isolate 重要，但投機牌 implied odds 未必更好，因有效深度變淺。

## 常見錯誤

仍用原本 BB 計算，誤以為自己很深；或因底池大就過度追 draw。

## 練習

把 200BB table with straddle 轉換成 straddle BB，重新寫 preflop plan。
