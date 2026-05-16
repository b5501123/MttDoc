# GTO 與剝削性打法：線上 BBA MTT 的平衡用法

本教材預設場景：線上 No-Limit Hold'em MTT、Big Blind Ante、8-max 或 9-max、多桌節奏。除非特別說明，所有籌碼深度都用有效 bb 計算，底池預設包含 SB、BB、BB ante。

## 本章定位
GTO 是基準，剝削是利潤來源。線上 MTT 玩家池偏差明顯，BBA、ICM、PKO 又讓人更常犯錯。你要先知道平衡，再用證據偏離。

## 線上 BBA 原則
沒有基準的剝削會變成猜測；不願偏離的 GTO 會錯過玩家池送出的 EV。最好的打法是用 GTO 保護自己不離譜，再針對過度 fold、過度 call、過度 fear ICM 的玩家調整。

## 操作框架
1. 用 GTO 建立 preflop、c-bet、river 防守基準。
2. 觀察玩家池偏差，決定往哪邊偏離。
3. 對 overfold 多 bluff，對 overcall 多 value。
4. 對 ICM 過緊玩家加壓，對不懂 ICM 玩家少做邊緣 call。
5. 每次剝削都要能被資料或 showdown 支撐。

## 尺寸與節奏
- GTO 尺寸要轉成線上常用尺寸，不盲抄 solver。
- 剝削 calling station 時，加大 value 尺寸。
- 剝削 overfolder 時，小尺寸高頻即可。
- ICM spot 不要只看 chipEV solver。

## 線上常見偏差與調整
- 低級別 pool underbluff river：防守低於 GTO。
- 盲位 overfold：steal 高於 GTO。
- PKO 玩家 overcall：bluff 低於 GTO、value 高於 GTO。
- reg 會反擊：回到更平衡範圍。

## 本章練習
- 每週選一個 spot 先看 GTO，再寫兩個剝削版本。
- 複盤時標記偏離是否有證據。
- 建立自己的玩家池偏差清單，每月更新。

## 快速檢查
- 我知道基準。
- 我有證據才剝削。
- 我會在對手調整後回到平衡。
