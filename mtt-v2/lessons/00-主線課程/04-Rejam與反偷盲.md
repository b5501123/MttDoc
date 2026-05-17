# Rejam 與反偷盲：讓 opener 為 RF 付代價

## 本章要解決的問題

Rejam 不是看到 blocker 就推，也不是只等 premium。它是 15-25BB 最重要的反偷盲武器，核心是 fold equity、opener range、背後玩家、ICM 壓力。

## 主線教材

Rejam 的價值來自兩部分：被 call 時的 equity，和 opener fold 時你直接拿下底池。很多玩家只看自己牌力，忽略 fold equity；也有人只看 blocker，對 tight opener 亂推。正確做法是先判斷 opener 的位置與 range。

對 CO open rejam 要比對 BTN 更謹慎，因為 CO range 比 BTN 強，背後還常有 BTN、SB、BB 未行動。A5s、55、KTs 這類牌可以成為候選，但前提是 CO 有足夠 raise-fold 區，且背後沒有會 overcall 的大碼。

對 BTN open，rejam 可以更寬。BTN steal 頻率高，RF hand 多，Axs、KTs、QJs、小對都有更高價值。但如果 BTN 是短碼或 tight player，或已經 pot committed，你的 fold equity 會下降，M hand 要收。

對 SB open，BB rejam 最寬，因為只剩兩人，SB 會有最多偷盲底部。這時很多 Kx、Qx、suited connector、小對都有反擊價值。但 ICM 仍然會改變結論：如果 SB cover 你且 bubble 壓力重，邊界 rejam 要收。

Rejam 的最大錯誤是忽略背後玩家。你在 BTN 面對 CO open，後面還有 SB/BB；你在 CO 面對 HJ open，後面還有 BTN/SB/BB。背後大碼越多，邊界越要收。背後短碼越多，也要考慮他們 overcall 或 squeeze 的可能。

## 本章要用的 Range 表

- 25BB Rejam vs CO / BTN / SB。
- 20BB Rejam vs CO / BTN / SB。
- 15BB Rejam vs CO / BTN / SB。
- 25BB / 20BB RFI 中的 RF 與 RC 分層。

## 實戰手牌串講

### Hand 1

25BB BTN A5s vs CO open，SB/BB 都大碼。A5s 有 blocker，但背後大碼會降低邊界 rejam 舒適度。若 CO tight，這手要收；若 CO open/fold 高，才可推。

### Hand 2

20BB SB KTo vs BTN open。BTN range 寬，KTo 有 blocker 與可用 equity，常可 rejam。若 BTN call shove 太鬆，KTo 這類 dominated 風險上升，要降頻。

### Hand 3

15BB BB 33 vs SB open。這是經典 rejam spot。SB range 寬，33 被 call 時有 equity，且 fold equity 可直接拿底池。除非 ICM 極重或 SB 太 tight，通常不該只 call。

## 讀完要能回答

- 你能不能解釋 rejam 的兩種收益來源。
- 你能不能說出 opener 越後位，rejam 為何越寬。
- 你能不能在 rejam 前先看背後玩家與 ICM。

## 練習

1. 用 25BB、20BB、15BB 各寫一手 rejam 候選。
2. 列出五手有 blocker 但不應對 tight CO rejam 的牌。
3. 用同一手 A5s 比較 vs CO、vs BTN、vs SB。
