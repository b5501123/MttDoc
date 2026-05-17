# 怎麼學這套 MTT：從一手牌到整場比賽

## 本章要解決的問題

這套課不是一堆獨立文章，而是一條固定決策線。你每次打牌都照同一個順序：先看有效籌碼，再看 action，接著找 range 分層，最後才用桌況、ICM、PKO 做調整。

## 主線教材

你之前會覺得教材無法學，是因為它把知識切成太多小片段。MTT 的核心不是知道很多名詞，而是每一手牌都能用同一套流程處理。這版教材只保留主線課程，範圍表是工具，測驗是檢查點，不再讓學習路線被碎片打散。

第一個固定問題是有效籌碼。線上 BBA MTT 中，真正決定策略的是 effective stack，不是你帳面上總共有多少 BB。如果你有 60BB，BB 只有 20BB，你跟 BB 對抗時就是 20BB 策略。這會直接改變 open、rejam、BB defend、postflop commitment。

第二個固定問題是 action 類型。所有 preflop 先分成四種：first-in、面對 open、面對 all-in、已進入 postflop。first-in 看 RFI 或 push/fold；面對 open 看 BB defend、3bet、rejam；面對 all-in 不能拿 open range 直接 call；postflop 要回到 preflop range 與 SPR。

第三個固定問題是 range 分層。R+ 是高頻或強制打，R 是標準 baseline，M 是桌況調整，RF 是 raise-fold，RC 是 raise-call all-in，RJ 是 rejam，AI 是 first-in shove。你不是背每一格，而是先知道每個標籤代表什麼風險。

第四個固定問題是調整。調整只動邊界，不重寫整套策略。盲位過緊時，後位 M hand 加頻；盲位 rejam 高時，RF 底部收掉；ICM 壓力高時，先收 call-off，再收邊界 open；PKO 只有在你 cover 對手時才讓 bounty 影響 call。

學習順序是：讀一章主線，開本章 range 表，做三手串講，最後做測驗。不要先從 69 張表開始背，這會重新變成碎片學習。你要先理解「為什麼這個 spot 要這樣分層」，再把範圍表當作標準答案的索引。

## 本章要用的 Range 表

- 所有 RFI 表作為 first-in 起點。
- BB defend、Rejam、Push/Fold 表作為不同 action 類型的分流工具。

## 實戰手牌串講

### Hand 1

25BB BTN KJo，前面 fold 到你。你不是先問 KJo 強不強，而是先問：這是 first-in，effective stack 25BB，BTN，盲位是否有 rejam stack。查 25BB BTN RFI 後，KJo 多數是 RF 或標準 open，但若 BB 20BB aggressive，底部要收。

### Hand 2

20BB BB 55 面對 CO open。這不是保護盲注問題，而是面對 open、effective stack 20BB、OOP realization 差。查 BB defend vs CO 與 20BB rejam，55 常比 call 更適合 rejam，因為你用 fold equity 直接實現牌力。

### Hand 3

10BB CO A7o，前面 fold 到你。這是 first-in short stack，不是 call shove。查 10BB CO Push/Fold，A7o 通常可 shove。但如果 bubble 中盲位 call 太鬆，要收底部 offsuit。

## 讀完要能回答

- 你能不能在 5 秒內分辨這手是 RFI、BB defend、rejam、push/fold、call-off 還是 postflop。
- 你能不能說出 RF 和 RC 的差別。
- 你能不能解釋為什麼 push range 不能直接當 call shove range。

## 練習

1. 任選 10 手牌，只分類 action 類型，不判斷對錯。
2. 打開任一 RFI 表，把 R+、R、M、RF、RC 各找三手牌。
3. 用一手牌寫出：effective stack、action 類型、range 表、調整原因。
