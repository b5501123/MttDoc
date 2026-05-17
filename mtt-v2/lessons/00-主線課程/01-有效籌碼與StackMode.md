# 有效籌碼與 Stack Mode：MTT 的主控旋鈕

## 本章要解決的問題

同一手 AJo 在 60BB、30BB、20BB、10BB 完全不是同一手牌。本章把所有深度串成一條連續邏輯，避免你把某個表拿去套全部情境。

## 主線教材

60BB 是仍能打 postflop 的深度。你可以 open 小對、suited connector、部分 suited gapper，因為有位置時能實現 equity，也有 implied odds。但 60BB 不是 cash game 100BB，MTT 的籌碼價值仍不線性，尤其接近 bubble 或 pay jump 時，不能只用深碼想法打光。

40BB 是標準中碼。這時你仍然有 open/fold 空間，但 3bet pot 的 SPR 已經下降，後位 aggressive player 會開始用 3bet 或 squeeze 懲罰太寬的 open。前位要收掉 dominated offsuit broadway，後位可以攻擊盲位，但要知道被 3bet 或 rejam 後的 continue range。

30BB 是轉換區。你不能亂 3bet/fold，也不能只因為 BTN 有位置就亂開。30BB 的 open 還可以小 raise，但每一次 open 都要看盲位是否有 15-25BB rejam stack。很多原本深碼可以靠 postflop 實現的手牌，在 30BB 會變得尷尬。

25BB 是壓力區。這裡最重要的概念是 open 前先知道被 jam 要不要跟。RFI 表中的 RC 與 RF 開始變成核心語言。你不是問「這手能不能開」，而是問「這手開了之後，對哪一種 rejam 要跟，對哪一種要棄」。

20BB 是短中碼。很多 call 會變差，因為 call 之後 SPR 很低，位置外很難實現 equity。你要更常用 rejam 把決策推回給 opener。這個深度的錯誤通常是用 40BB 的可玩性手牌去開，或用 BB call 去保護盲注，結果錯過 fold equity。

15BB 以下進入短碼主導。first-in shove、rejam、fold equity 變成主線。短碼不是等 AA，因為等牌會讓你從 15BB 掉到 8BB，再掉到 5BB，最後連 fold equity 都沒有。你要在還能讓對手 fold 的時候主動拿底池。

## 本章要用的 Range 表

- 60BB / 40BB / 30BB / 25BB / 20BB / 15BB RFI 全位置。
- 25BB / 20BB / 15BB Rejam。
- 12BB / 10BB / 8BB Push/Fold。

## 實戰手牌串講

### Hand 1

60BB CO 76s，兩盲 tight。這手可以 open，因為有 position、有 implied odds，盲位過緊也提高 steal EV。但若 BTN 3bet 很高，76s 會從 open 變成 fold 或低頻。

### Hand 2

25BB BTN A8o，BB 20BB aggressive。A8o 看起來能偷，但被 rejam 後很不舒服。這時要看它是 RF 還是 M，若盲位推太高，A8o 這類底部 offsuit ace 要收。

### Hand 3

12BB HJ KJo。這不是 25BB open/fold 的 spot，而是 push/fold。若前面 fold 到你，KJo 多數可 shove；但如果是面對 UTG shove，KJo 不能因為自己可推就自動 call。

## 讀完要能回答

- 你能不能說出 60、40、30、25、20、15、10BB 的策略差異。
- 你能不能解釋為什麼 25BB open 前要先知道 call-off。
- 你能不能分辨 first-in shove 和 call shove。

## 練習

1. 用 AJo 分別寫出 60BB、30BB、20BB、10BB 的基本計畫。
2. 列出三手 25BB BTN 可 open 但不想 call rejam 的牌。
3. 找出一手你過去 15BB 還 min-raise/fold 的錯誤。
