# Turn 與 River：Value、Bluff、Bluff-catch 的分線

## 本章要解決的問題

Cash game 的大錢常在 turn/river。你需要知道哪些牌繼續 value、哪些牌轉 bluff、哪些牌只剩 bluff-catch。

## 主線教材

Turn 是 equity 被重新分配的街。高牌、同花完成、順子完成、pair board 都會改變 range advantage。Flop 自動 c-bet 後，turn 不能情緒補槍；你要問這張 turn 改善誰的 range。

Barrel 候選要有 equity 或 blocker。Nut flush draw、open-ended、A blocker、block 對手強 value 的牌，比完全無 blocker 的空氣好。中等 showdown value 不要亂轉 bluff，因為你燒掉原本能攤牌的 EV。

River value 先問更差牌是否會 call。Top pair good kicker 在某些 runout 是 value，在四連順、同花完成、對手 range uncapped 時可能只剩 check。薄 value 是 cash game 盈利來源，但不是每手 top pair 都三街。

River bluff-catch 要看 pool。低中級 pool 常見 river under-bluff，尤其大 size。你不需要為了平衡每次 hero call。對過度 bluff 的玩家再打開 bluff-catch；對正常或偏緊 pool，保護 winrate 比抓鬼重要。

## 本章要用的 Range 表

- `cashv1-rfi-100bb-6max-*`：回推 opener range。
- `cashv1-bbdef-100bb-vs-*`：回推 BB caller range。
- `cashv1-3bet-100bb-*`：回推 3bet pot range。

## 實戰手牌串講

### Hand 1

BTN vs BB，flop A72r c-bet，turn 9s 帶出 flush draw。你的 Ax 仍可 value，但 KQ 無 backdoor 不應自動二槍。

### Hand 2

BB defend 76s，flop T84ss check-call，turn 2s 完成 flush。你 range 有 flush，對手 over-cbet 時可 probe。

### Hand 3

River 你有 second pair 面對 tight player pot bet。若 pool under-bluff，fold 是標準盈利。

## 讀完要能回答

- 你能不能列出 turn 改變 range 的牌。
- 你能不能選 blocker 好的 bluff。
- 你能不能按 pool 調整 river bluff-catch。

## 練習

1. 選 10 手 turn barrel，標出 value/draw/bluff-catch。
2. 找 5 手 river thin value。
3. 統計一週 hero call 的結果與對手類型。
