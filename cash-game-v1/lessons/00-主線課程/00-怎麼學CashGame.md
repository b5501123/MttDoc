# 怎麼學 Cash Game：用 EV、位置、Rake 串起來

## 本章要解決的問題

Cash game 不是 MTT 去掉 ICM。你要改成一套長期 EV 系統：每一手都先看位置、rake、SPR、對手 range，再決定是否用 thin value、bluff、bluff-catch 或棄牌。

## 主線教材

Cash game 的主線是長期 EV。MTT 會因 pay jump、bounty、短碼 fold equity 改變很多 all-in 決策；cash game 則回到每 100BB 是否能穩定賺。這代表你不能靠「等翻倍」修正錯誤，每一個小 pot、每一次盲位防守、每一個 river call 都會長期累積。

第一個主控旋鈕是 position。IP 可以實現更多 equity、控制 pot、拿到更多 thin value；OOP 需要更強 range、更少 marginal call、更清楚的 check-raise 或 check-call 計畫。你在 BTN 可以 open 很多可玩牌，但 SB/BB 不能因為價格看似好就亂防守。

第二個主控旋鈕是 rake。低中級線上 cash game 的 rake 會懲罰小 pot marginal call，尤其 SB/BB 的 offsuit broadway、低 suited gapper、小 suited connector。如果一手牌只靠非常薄的 equity 才能 call，rake 會把它推成 fold。

第三個主控旋鈕是 SPR。100BB cash game 的單對牌不是自動打三街。你需要判斷 SRP、3bet pot、4bet pot 不同 SPR 下，top pair、overpair、combo draw、set、nut draw 的承諾門檻。

這套教材先建立 6-max 100BB baseline，再用 pool exploit 調整。不要把 range 當死規則，也不要把 exploit 當藉口亂打。每次調整只動邊界：open 底部、flat 底部、3bet bluff、river bluff-catch。

## 本章要用的 Range 表

- `cashv1-rfi-100bb-6max-utg/hj/co/btn/sb`：100BB 6-max RFI 全位置。
- `cashv1-3bet-100bb-*`：面對 Open 的 3bet / flat / fold baseline。
- `cashv1-bbdef-100bb-vs-*`：BB defend vs 各位置 open。

## 實戰手牌串講

### Hand 1

100BB BTN 76s，前面 fold。BTN 有位置與 realization，可 open。但若 SB/BB 都 3bet 高，76s 從標準 open 變成 mixed 或 fold。

### Hand 2

100BB BB Q8o vs BTN 2.5bb open。價格看似能防，但 OOP + rake + dominated 讓它很容易變成虧損 call。先看 BB defend vs BTN，不要用 MTT BBA 價格思維。

### Hand 3

100BB CO open AQo，BTN 3bet。這不是 MTT 25BB 的 all-in 決策，而是 100BB postflop realization。你要看 CO vs BTN 3bet continue，分出 4bet、call、fold。

## 讀完要能回答

- 你能不能說出 cash game 和 MTT 最大差異。
- 你能不能解釋 rake 為什麼會砍掉 marginal call。
- 你能不能把每手牌先分成 SRP、3bet pot、4bet pot。

## 練習

1. 選 20 手牌，只分類 IP/OOP、SRP/3bet pot、value/bluff-catch。
2. 把三手你常 defend 的 BB 牌拿去檢查 rake 是否讓它變差。
3. 列出 BTN、SB、BB 三個位置的最大錯誤。
