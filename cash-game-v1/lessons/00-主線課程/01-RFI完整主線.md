# RFI 完整主線：6-max 100BB 的開局骨架

## 本章要解決的問題

RFI 是 cash game 的所有後續 range 起點。本章把 UTG、HJ、CO、BTN、SB 的 open 目的與常見 leak 串起來。

## 主線教材

Cash game RFI 第一條線是位置。UTG/HJ 不是偷盲位置，range 必須能承受後位 3bet 與多人跟注；CO 開始有 steal 價值；BTN 是最重要盈利位置；SB 雖然只剩 BB，但你永遠 OOP，所以不能直接拿 BTN range 套過去。

UTG/HJ 要避免 dominated offsuit broadway。KJo、QJo、A9o 這些牌在 6-max 看起來能打，但被 BTN/Blinds call 後很難拿三街 value，被 3bet 時也難防守。前位偏向高牌力與可玩性：對子、suited broadway、Axs、強 offsuit broadway。

CO/BTN 的重點是偷盲與 postflop realization。BTN 可以打非常多 suited hand 和 blocker hand，因為你有位置。但不要把 BTN open 誤解成任何兩張。若盲位 3bet 高，弱 offsuit Kx/Qx/Jx 要收；若盲位過緊，M hand 加頻。

SB 的重點是 rake 與 OOP。SB open 很容易被 BB defend 並且翻後失去位置。對 tight BB 可放寬，對 loose defend 或 aggressive 3bet 的 BB 要收底部。SB limp 策略可以存在，但第一版先建立 raise/fold baseline。

## 本章要用的 Range 表

- `cashv1-rfi-100bb-6max-utg`：UTG RFI。
- `cashv1-rfi-100bb-6max-hj`：HJ RFI。
- `cashv1-rfi-100bb-6max-co`：CO RFI。
- `cashv1-rfi-100bb-6max-btn`：BTN RFI。
- `cashv1-rfi-100bb-6max-sb`：SB RFI。

## 實戰手牌串講

### Hand 1

UTG AJo：可 open，但不是印鈔牌。若桌上 BTN/BB 都 aggressive，AJo 會接近邊界。

### Hand 2

BTN K7o：對 tight blinds 可混合 open；對 3bet 高的 blinds，K7o 這類底部 offsuit 先收。

### Hand 3

SB Q9o：對 tight BB 可 open，對 loose BB 會被 OOP realization 和 rake 懲罰。

## 讀完要能回答

- 你能不能說出每個位置 open 的主要目的。
- 你能不能分辨 BTN 與 SB 的差異。
- 你能不能找出 RFI 表中的 mixed bottom。

## 練習

1. 打開 BTN RFI，列 10 手可 open 但容易過度的牌。
2. 打開 SB RFI，列 5 手對 tight BB 可加頻、對 loose BB 要收的牌。
3. 比較 AJo 在 UTG、CO、BTN 的差異。
