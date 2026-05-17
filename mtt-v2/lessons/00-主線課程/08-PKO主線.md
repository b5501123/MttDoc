# PKO 主線：Bounty 只改邊界，不會把爛牌變好牌

## 本章要解決的問題

PKO 的學習常被賞金誘惑打亂。本章建立最重要的判斷順序：先看是否 cover，再估 bounty，再看牌力與背後玩家。

## 主線教材

PKO 第一個問題永遠是：你有沒有 cover 對手。只有你 cover 對手，才有 bounty equity。如果你不 cover 對手，賞金不會進你的口袋，就不能拿 bounty 當理由去 call。這一點比任何複雜公式都重要。

第二個問題是 bounty 相對籌碼價值。早期 PKO bounty 可能佔總價值比例高，後期籌碼與 pay jump 影響更大。你不能看到 bounty 就用任何 Ax/Kx call。Bounty 只會讓接近臨界的 call 變成可跟，不會把 dominated trash 變成好牌。

第三個問題是 isolation。你 cover 短碼時，rejam 或 isolate 可以讓其他人 fold，自己單挑短碼拿 bounty。這在大碼或中大碼時很重要。但若背後有更大碼會 overcall，你的 isolation EV 會下降，邊界 hand 要收。

第四個問題是 dominated hand。A8o、KTo、QJo 這些牌在 bounty 誘惑下很常被高估。它們可能因 bounty 進入 call 範圍，但一旦對手 jam range 偏強，被 dominated 的代價很大。PKO 放寬的是邊界，不是放棄牌力結構。

PKO 和 ICM 會同時存在。你 cover 短碼時可以放寬；你被大碼 cover 時仍要保護出局風險；FT PKO 還有 pay jump。最終流程是：cover 關係，bounty 價值，chip EV range，ICM 壓力，背後玩家。

## 本章要用的 Range 表

- Rejam 表中的 M hand 是 PKO 最常調整區。
- Push/Fold 表作短碼 first-in 起點，不可直接當 PKO call 表。
- BB defend vs BTN/SB 可用來評估 cover 短碼 jam。

## 實戰手牌串講

### Hand 1

PKO 你 32BB，BTN 8BB jam，你 BB A8o 且 cover。A8o 在普通 MTT 可能邊界，但 bounty 可讓它更常 call。仍要看 BTN 是否太 tight，以及 SB 是否已入池。

### Hand 2

PKO 你 12BB，不 cover CO 20BB，CO jam，你 KJo。沒有 cover 就沒有 bounty equity，不能用賞金理由 call。這手回到普通 MTT call-off，而且通常很緊。

### Hand 3

PKO 你 55BB 大碼，BTN 7BB open，SB 22BB，BB 18BB。你在 CO/BTN 後位若能 isolate 短碼，要看背後中碼是否會 overcall。若背後過緊，M hand 可加壓。

## 讀完要能回答

- 你能不能在 PKO 第一秒先問是否 cover。
- 你能不能說出 bounty 只改邊界的意思。
- 你能不能分辨 isolate bounty 和亂追 bounty。

## 練習

1. 列出三手 cover 短碼可放寬 call 的牌。
2. 列出三手不 cover 時不該因 bounty call 的牌。
3. 用一手 PKO 牌寫出 cover、bounty、ICM、背後玩家四個欄位。
