# Cash Game 和 MTT 的核心差異

## 線上桌面設定

現金桌可以隨時補碼、離桌、換桌，籌碼與金錢等值；MTT 則是固定買入、籌碼非線性、受 ICM 和盲注升級影響。

## 核心觀念

Cash game 的策略核心是長期 chip EV / money EV。你不需要為了進錢圈避免邊緣 spot，但你必須避免任何長期被 rake 吃掉的薄利跟注。

Cash game 的第一原則是：每一個決策都直接換算成長期 bb/100 和真實金額。沒有 ICM 可以保護錯誤，也沒有下一個 blind level 會幫你改變策略；你在這一手選擇的 open、call、3bet、下注尺度和河牌跟注，都會被 rake、位置、有效籌碼與對手類型直接校正。

## 決策流程

決策時先移除 MTT 問題：沒有 bubble、沒有 pay jump、沒有 cover pressure。再重新計算位置、range、SPR 和對手錯誤。

線上多桌時不要追求每一手都算到最細。你需要先建立 default，再依對手偏差調整：對手太緊就多偷、多小注；對手太愛跟就少 bluff、多 thin value；對手河牌下注不足就大幅降低 bluff-catch。這比背一張靜態表更接近可執行策略。

## 線上調整

線上低 stakes 最常見的獲利點不是 hero call，而是 table selection、position discipline、對 loose passive 持續 value bet。

## 常見錯誤

把『我不能被淘汰』換成『反正可以補碼』後亂跟；兩者都是錯。Cash 要看 EV，不是看情緒安全感。

## 練習

把同一手 AJo 在 MTT 25BB 和 cash 100BB 的 BTN vs CO 情境各寫一條策略。
