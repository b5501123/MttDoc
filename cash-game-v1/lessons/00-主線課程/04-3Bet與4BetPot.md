# 3Bet Pot 與 4Bet Pot：低 SPR 下少犯大錯

## 本章要解決的問題

3bet pot 不是單純變大底池，而是 range 集中、SPR 降低、位置更重要。本章處理 preflop continue 到 flop commitment 的主線。

## 主線教材

3bet pot 的 range 更集中。當你 3bet BTN vs CO，你代表高牌力、A blocker、suited broadway、部分 suited connector；當 SB 3bet BTN，你常是 polar 或 linear 結構。翻牌後不能用 SRP c-bet 頻率照打。

IP call 3bet 和 OOP call 3bet 差很多。IP 能實現更多 equity，可以保留 suited broadway、小對、Axs；OOP call 3bet 更容易被壓迫，尤其被 position advantage 和 rake 夾殺。很多 OOP hand 要在 preflop 變成 4bet 或 fold。

4bet pot 的 SPR 很低，AK/AQ/QQ/JJ 這些牌需要在 preflop 就知道計畫。4bet bluff 最常用 A5s-A2s 這類 blocker，但不能因為有 blocker 就對不會 fold 的 pool 亂 4bet。

翻後 3bet pot 要先看 range advantage 和 board。Axx/Kxx 乾牌通常偏向 3bettor；中低連張濕牌會改善 caller 的 set、straight draw、pair+draw。低 SPR 下，下注 size 會直接決定 turn 是否 commitment。

## 本章要用的 Range 表

- `cashv1-4bet-100bb-btn-vs-sb`：BTN vs SB 3bet 的 4bet continue。
- `cashv1-4bet-100bb-co-vs-btn`：CO vs BTN 3bet 的 4bet continue。
- `cashv1-3bet-100bb-btn-vs-co`：BTN vs CO open 3bet baseline。
- `cashv1-3bet-100bb-sb-vs-btn`：SB vs BTN open 3bet baseline。

## 實戰手牌串講

### Hand 1

CO open，BTN 3bet，CO AQs。AQs 多數可 continue，但要知道是 call 還是 4bet mixed，取決於 BTN 3bet 結構。

### Hand 2

BTN open，SB 3bet，你持 A5s。A5s 可以作 4bet bluff 候選，但若 SB pool 3bet 太 value 且不 fold，這手應收。

### Hand 3

SB 3bet pot 你持 QQ，flop A72r。你 range 仍強，但 QQ 已不是自動三街 value。

## 讀完要能回答

- 你能不能說出 3bet pot 的 SPR 變化。
- 你能不能分辨 IP call 3bet 與 OOP call 3bet。
- 你能不能說出 4bet bluff 要看 fold equity。

## 練習

1. 列 5 手 CO vs BTN 3bet 可 call 的牌。
2. 列 5 手 BTN vs SB 3bet 可 4bet mixed 的牌。
3. 選三個 3bet pot flop，判斷誰有 nut advantage。
