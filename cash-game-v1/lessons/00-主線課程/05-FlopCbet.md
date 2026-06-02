# Flop C-bet：牌面分類比自動下注重要

## 本章要解決的問題

Cash game 翻牌下注不是固定 1/3 pot。本章建立高牌乾面、中低連張、同花濕面、pair board、多方底池的下注邏輯。

## 主線教材

Flop 第一問是誰有 range advantage，第二問是誰有 nut advantage。BTN open BB call，A72r、K83r 通常偏 BTN；987ss、765 two-tone 更改善 BB。你不能對所有牌面用同一個 size。

高牌乾面適合小注高頻，因為 opener 有更多 top pair、overpair、high card advantage。中低連張濕面要降低空氣 c-bet，把有 equity 的 draw、overpair、強 top pair放入下注或較大 size。

同花面要看 blocker。你有 A-high flush blocker 時可有更多 barrel candidate；沒有 backdoor 的空氣牌應該少下注。Pair board 則要看誰有 trips density，以及對手是否 overfold。

Multiway 底池要大幅降低 bluff。Cash game multiway 很常來自 cold call 或 BB defend，rake 也更重。你要用更清楚的 value 與高 equity draw，不要 heads-up c-bet 頻率硬套。

## 本章要用的 Range 表

- `cashv1-rfi-100bb-6max-*`：用 RFI 表回推 opener range。
- `cashv1-bbdef-100bb-vs-*`：用 BB defend 表回推 caller range。

## 實戰手牌串講

### Hand 1

BTN open BB call，flop A72r。BTN 可小注高頻，BB 多數 range 被壓制。

### Hand 2

CO open BB call，flop 987ss。BB 有更多兩對、順子、pair+draw，CO 不應全 range 小注。

### Hand 3

HJ open CO call BB call，flop K86r。三人底池下，CO/HJ 的空氣牌不要硬下注。

## 讀完要能回答

- 你能不能分辨 range advantage 和 nut advantage。
- 你能不能說出哪些牌面適合小注高頻。
- 你能不能在 multiway 降低 bluff。

## 練習

1. 分類 20 個 flop：高乾、中低濕、同花、pair board、multiway。
2. 選 5 手 BTN vs BB，寫出 c-bet size。
3. 找一手你 multiway 過度 c-bet 的牌。
