# Postflop SPR 主線：MTT 翻後不是 cash game 翻後

## 本章要解決的問題

MTT postflop 的關鍵是 SPR、range advantage、nut advantage 與 ICM。你不需要把翻後拆成很多孤立技巧，而要知道 preflop 決策如何一路影響 flop、turn、river。

## 主線教材

Postflop 第一個問題是 SPR。30BB BTN open BB call，flop 後的 top pair 和 100BB cash game 的 top pair 不是同一件事。SPR 越低，top pair、overpair、強 draw 越容易進入承諾；SPR 越高，單對牌越不能無腦三街。

第二個問題是牌面優勢。BTN open BB call，A72r、K83r 這類高乾牌通常偏向 BTN range，適合小注高頻。987ss、T86 two-tone、654 這類中低連張濕牌會提升 BB 的兩對、順子、pair+draw，preflop aggressor 不應全 range c-bet。

第三個問題是下注後下一街。很多 MTT 翻後錯誤不是 flop 錯，而是 flop bet size 讓 turn 剩 awkward stack。下注前先想：如果我 bet 1/3 pot，turn SPR 是多少；如果 turn blank，我是否願意 shove；如果被 raise，我是否已經承諾。

第四個問題是 multiway。多人底池時 bluff 頻率下降，top pair weak kicker 降級，nut draw 和 nutted value 重要性上升。你不能用 heads-up BTN vs BB 的 c-bet 頻率套在 CO open、BTN call、BB call 的三人底池。

第五個問題是 river。River value 先問更差牌是否會 call；river bluff 要有 blocker 和對手可棄牌區。對 under-bluff pool，你可以更常 fold bluff-catcher；對 calling station，你要少 bluff，多 thin value。但 ICM 下薄 value 與 bluff-catch 都要收。

## 本章要用的 Range 表

- BTN/CO/HJ RFI 表回推 preflop aggressor range。
- BB defend vs HJ/CO/BTN 回推 caller range。
- 3bet / Rejam 標籤作低 SPR 承諾參考。

## 實戰手牌串講

### Hand 1

30BB BTN KQ open，BB call，flop K72r。BTN 有 range advantage，KQ 在低 SPR 下常可小注建立價值，turn 很多 runout 會接近承諾。

### Hand 2

40BB BTN A5s open，BB call，flop 987ss，且你沒有同花。這是 BB nut advantage 強的牌面，不該高頻空氣 c-bet。你的 A5s 多數應 check back 或選擇非常低頻策略。

### Hand 3

25BB BB 76s defend vs BTN，flop 852 two-tone。你有 pair+draw 或 combo draw 時，check-raise 可以直接建立 fold equity，但 raise 前要知道 turn 是否 all-in。

## 讀完要能回答

- 你能不能先算 SPR 再決定是否承諾。
- 你能不能分辨 A72r 和 987ss 對 BTN/BB range 的差異。
- 你能不能說出 multiway 為什麼少 bluff。

## 練習

1. 選三手 BTN vs BB SRP，分別標記乾牌、濕牌、中性牌。
2. 任選一手 25BB flop c-bet，算下注後 turn SPR。
3. 找一手 river bluff，寫出你的 blocker 是否真的有用。
