# 線上多桌 Decision Loop

## 場景設定

你同時打多桌線上 MTT，時間有限。你需要一套固定順序，讓每手牌先靠 baseline，再做少量 exploit。

## 核心觀念

- 先位置與 effective stack，再看 action。
- 先 baseline range，再看桌況調整。
- 多桌時不要臨場發明大策略。
- 每次調整只動 M/RF 邊界，不重寫整套 range。

## 操作流程

1. 讀 action：first-in、vs open、vs jam、postflop。
2. 讀 effective stack 與 cover 關係。
3. 開對應表：RFI、BB defend、Rejam、Push/Fold。
4. 只根據明確資訊調整邊界。
5. 做完手牌後標記不確定 spot，休息時 review。

## Range 表

- 全部 MTT v2 range 表。
- 測驗頁用來訓練快速分類。

## 邊界手牌

- Unknown：先 baseline。
- 盲位 tight：偷盲邊界加寬。
- 盲位 aggressive：RF 底部收緊。
- ICM heavy：call-off 先收。

## 常見錯誤

- 多桌時用情緒 call。
- 只因一個 showdown 就大幅改 range。
- 忘記看 effective stack，只看自己籌碼。

## 練習

1. 開三桌時，遇到 25BB CO KTo，列出 5 秒內決策順序。
2. Unknown BB defend 太寬的證據需要幾手牌？
3. 你被同一玩家 3bet 兩次，哪些牌先調整？
