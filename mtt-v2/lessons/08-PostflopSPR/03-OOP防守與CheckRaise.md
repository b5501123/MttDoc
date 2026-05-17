# OOP 防守與 Check-Raise

## 場景設定

你在 BB defend 後出位置外。你不能只用 check-call 被動實現 equity，要知道哪些牌能 check-raise 施壓。

## 核心觀念

- OOP realization 差，所以強 draw 需要主動性。
- Check-raise 需要 fold equity 與 turn barrel plan。
- 短碼 check-raise 幾乎會接近 commitment。
- 弱 pair 無 kicker 不要自動保護。

## 操作流程

1. 先確認 preflop BB defend range。
2. 在有 nut draw、combo draw、強 top pair 時建立 check-raise。
3. 看 stack 決定 check-raise size 是否等於承諾。
4. 若對手不 fold，降低 bluff check-raise。

## Range 表

- BB defend vs CO/BTN 表。
- 20BB/25BB RFI 表用來推回 opener range。

## 邊界手牌

- A5s 在 wheel draw 面可有強 semi-bluff。
- 低 suited connector 命中強 draw 才能主動。
- Middle pair 無 redraw 多數不該膨脹底池。
- Top pair weak kicker 在 ICM 下要控風險。

## 常見錯誤

- BB 只 check-call 到 river。
- 沒有 turn plan 就 check-raise。
- 短碼用 check-raise/fold 浪費 stack。

## 練習

1. 25BB BB 76s defend vs BTN，flop 852 two-tone，有無 check-raise？
2. 40BB BB A5s vs CO，flop 743r，如何規劃？
3. 20BB BB K8o vs BTN，flop KJ4ss，是否願意承諾？
