# 25BB 壓力 RFI：每次 open 都要知道 call-off

## 場景設定

Effective stack 25BB。你仍會有 raise-fold，但已經不能把 open 視為便宜嘗試。線上 BBA 底池大，盲位 rejam 很常見。

## 核心觀念

- 25BB 的核心是把 open range 分成 raise-call、raise-fold、mixed。
- 後位 open 很有價值，但 RF 太多會被 aggressive 盲位懲罰。
- ICM 越重，RC 需要越緊。
- 邊界 Ax/Kx 不是自動開，要看盲位是否敢推。

## 操作流程

1. 打開 25BB RFI 表，先找 RC 與 RF。
2. 看盲位 15-25BB stack 數量。
3. 若盲位 rejam 高，砍掉最底部 RF。
4. 若盲位太緊，加入 M hand 偷盲。

## Range 表

- 25BB 9-max RFI 全位置。
- 25BB Rejam vs CO/BTN/SB。

## 邊界手牌

- A7s/A8s：常是 open，但面對 tight rejam 不想 call。
- KTo/KJo：後位可偷，對 aggressive 盲位要收。
- 22-44：後位可開，面對 shove 多半 fold 或 mixed。
- QTo/JTo：依盲位而定，不是標準前位 open。

## 常見錯誤

- 25BB BTN 覺得位置好就開所有 Kx。
- CO open 太多 RF，讓 BB 無痛 rejam。
- Bubble 中碼仍用 chip EV call-off。

## 練習

1. 25BB CO A8s，BTN/BB 都 18BB aggressive，是否 open？
2. 25BB BTN 44，SB 12BB、BB 24BB，計畫是什麼？
3. 25BB SB K9o 對 tight BB 是否可偷？
