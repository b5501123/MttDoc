# Cash Game v1 Range JSON Schema

Range JSON 是 Cash Game v1 的 source of truth。每張表必須包含：`id`、`title`、`game`、`table`、`spot`、`stackBb`、`position`、`legend`、`hands`、`notes`、`boundary`。

`hands` 只需要列出非 fold；renderer 會把其他 hand 視為 `F`。
