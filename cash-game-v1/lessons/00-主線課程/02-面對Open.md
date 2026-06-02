# 面對 Open：Call、3Bet、Fold 不是牌力排序

## 本章要解決的問題

Cash game 最常見 leak 是跟太多、3bet 太少或用錯 blocker。本章建立 IP flat、OOP defend、3bet value、3bet bluff 的完整框架。

## 主線教材

面對 open 時，第一個問題是你是否有 position。IP flat 可以保留 suited broadway、小對、部分 suited connector，因為你能控制 pot 並實現 equity。OOP flat 則要更謹慎，rake 會讓很多邊界 call 變成 fold 或 3bet。

第二個問題是 opener 位置。UTG/HJ range 強，你的 3bet bluff 要更少；CO/BTN range 寬，blind 可以用更多 suited Ax、Kxs、QJs、TT-QQ 類牌做 3bet 或 defend。不要用 vs BTN 的防守寬度去打 vs UTG。

第三個問題是 3bet 結構。Value 3bet 來自 JJ+/AQ+ 這類可承受 4bet 或有明顯 equity 的牌；bluff 3bet 多選 A5s-A2s、KTs/QTs 等 blocker + playability。KJo/QJo 這類 dominated offsuit 不一定是好 3bet bluff。

第四個問題是 squeeze。多人入池時，rake 和 dead money 都變大。你不能只因為有 suited connector 就跟，尤其 OOP。Squeeze 更偏 value 和 blocker，flat range 要避免被後方 squeeze 懲罰。

## 本章要用的 Range 表

- `cashv1-3bet-100bb-btn-vs-co`：BTN vs CO open。
- `cashv1-3bet-100bb-sb-vs-btn`：SB vs BTN open。
- `cashv1-bbdef-100bb-vs-btn`：BB defend vs BTN。
- `cashv1-bbdef-100bb-vs-co`：BB defend vs CO。

## 實戰手牌串講

### Hand 1

BTN A5s vs CO open：A5s 有 blocker、有 nut potential，是常見 3bet bluff / mixed 候選。

### Hand 2

SB KJo vs BTN open：KJo 看起來強，但 OOP + rake + domination，很多時候比 3bet 或 fold 更清楚，不應自動 call。

### Hand 3

BB 76s vs UTG open：價格不是唯一答案。UTG range 強且 rake 高，76s 很容易只是看起來好玩。

## 讀完要能回答

- 你能不能說出 IP flat 和 OOP flat 的差異。
- 你能不能分辨 value 3bet 和 bluff 3bet。
- 你能不能按 opener 位置調整防守。

## 練習

1. 列出 5 手適合作 BTN vs CO 3bet bluff 的牌。
2. 列出 5 手 SB vs BTN 不該自動 call 的牌。
3. 用 A5s、KJo、QTs 分別寫出 vs UTG/CO/BTN 的差異。
