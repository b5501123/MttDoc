# Poker Course App Release / TG 打包紀錄

此文件記錄 `docs/course-app` 的 Android 打包與 Telegram 發送流程。流程參考 `C:\Stock` 的 release 習慣，但這個教材 app 使用專案內的 Capacitor / Android 專案獨立打包。

## Release 紀錄

### v1.0.0 - 2026-06-02 Poker Course debug

狀態：Released

```text
APK:     C:\mtt-gto-solver\docs\course-app\releases\poker-course-v1.0.0-202606020-debug.apk
TG ZIP:  C:\mtt-gto-solver\docs\course-app\releases\poker-course-v1.0.0-202606020-debug.zip
TG 頻道: 股票測試頻道
TG message_id: 1853
Caption: Poker Course App 2026-06-02 - MTT v2 + Cash Game v1 (MTT 12/69/8, Cash 9/20/6)
```

內容：

- MTT v2：12 篇主線課文、69 張範圍表、8 份測驗。
- Cash Game v1：9 篇主線課文、20 張範圍表、6 份測驗，共 60 題。
- APK manifest 已驗證總計 124 筆內容。
- APK 內 `cashv1-rfi-100bb-6max-btn.html` 已驗證 169 格、沒有格內使用說明、策略清單在矩陣下方。

### v1.0.0 - 2026-06-02 MTT v2 debug

狀態：Released

```text
APK:     C:\mtt-gto-solver\docs\course-app\releases\mtt-v2-course-v1.0.0-202606020-debug.apk
TG ZIP:  C:\mtt-gto-solver\docs\course-app\releases\mtt-v2-course-v1.0.0-202606020-debug.zip
TG 頻道: 股票測試頻道
TG message_id: 1852
```

內容：

- MTT v2：12 篇主線課文、69 張範圍表、8 份測驗。

### v1.0.0 - 2026-05-16

狀態：Released

```text
APK:     C:\mtt-gto-solver\docs\course-app\releases\poker-course-v1.0.0-202605161-debug.apk
TG ZIP:  C:\mtt-gto-solver\docs\course-app\releases\poker-course-v1.0.0-202605161-debug.zip
TG 頻道: 股票測試頻道
TG message_id: 1837
APK SHA256: 393AEA43D51A71F0ACF8BF07CF4925C13C0BA055AF48F057683458C92F27E10C
ZIP SHA256: 3126B45F67D64AD17011C94F220CF1CCBE15FD506C2046A76846EE7C2FFC2DB4
```

內容：

- App 改為多課程閱讀器，內建 MTT 與 Cash Game 兩個課程。
- MTT：52 篇線上 BBA MTT 教材。
- Cash Game：84 篇線上 NLH cash game 教材，含 100 題練習。
- App 名稱更新為「撲克教材」。
- Release 檔名前綴更新為 `poker-course`。

驗證：

- `npm run build:web` completed。
- `npx cap sync android` completed。
- Gradle `assembleDebug` completed。
- APK 內含 `assets/public/content-manifest.json`。
- Course manifest entries: 136。
- Manifest 分組：MTT 52、Cash Game 84。
- Cash Game 練習題：100 題。
- Cash Game 規劃檔 `00-教材規劃.md` 未包入 APK。
- ZIP 內只有 APK，沒有 `.codex` 私有設定。

### v1.0.0 - 2026-05-15

狀態：Released

```text
APK:     C:\mtt-gto-solver\docs\course-app\releases\mtt-course-v1.0.0-202605151-debug.apk
TG ZIP:  C:\mtt-gto-solver\docs\course-app\releases\mtt-course-v1.0.0-202605151-debug.zip
TG 頻道: 股票測試頻道
TG message_id: 1836
ZIP SHA256: 2A6BD86DACDE590203375465E04E5E96944E67E9ECEE8A2DB2A509623C48BCB1
```

內容：

- 52 篇全新 MTT / Big Blind Ante 線上教材。
- 100 題 BBA MTT 練習題。
- Web content 已重新 build 並同步進 Android assets。

驗證：

- `npm run build:web` completed。
- `npx cap sync android` completed。
- Gradle `assembleDebug` completed。
- APK 內含 `assets/public/content-manifest.json`。
- Course manifest entries: 52。
- ZIP 內只有 APK，沒有 `.codex` 私有設定。

## 快速打包

```powershell
cd C:\mtt-gto-solver\docs\course-app
.\scripts\build-release-package.ps1
```

腳本會執行：

1. `npm run build:web`
2. `npx cap sync android`
3. `gradlew assembleDebug`
4. 複製 APK 到 `releases`
5. 壓成 ZIP
6. 檢查 APK 內是否有 `assets/public/content-manifest.json`

輸出命名：

```text
releases\poker-course-v{packageVersion}-{yyyyMMddN}-debug.apk
releases\poker-course-v{packageVersion}-{yyyyMMddN}-debug.zip
```

`N` 從 `0` 開始，同一天重複打包會自動遞增。

## Dry Run

只檢查下一次輸出檔名，不實際 build：

```powershell
.\scripts\build-release-package.ps1 -DryRun
```

## 發 Telegram

目前已設定本機私有 TG config：

```text
C:\mtt-gto-solver\docs\course-app\.codex\telegram-release.json
```

可直接執行：

```powershell
.\scripts\build-release-package.ps1 -SendTelegram
```

這個 config 內含 bot token、chat id 與預設 caption，已被 `.gitignore` 排除。不要把 token 寫進 Markdown、release note、APK 或 ZIP。

如果要臨時覆蓋 TG 設定，也可以在同一個 PowerShell session 設環境變數：

```powershell
$env:TELEGRAM_BOT_TOKEN = '<bot-token>'
$env:TELEGRAM_CHAT_ID = '<chat-id>'
.\scripts\build-release-package.ps1 -SendTelegram
```

自訂 caption：

```powershell
.\scripts\build-release-package.ps1 -SendTelegram -Caption 'MTT Course App 線上 BBA 教材測試包'
```

Telegram 使用 Bot API `sendDocument` 發送 ZIP。成功時回傳 JSON 會包含 `result.message_id`，需要時把該 id 補回本文件的 release 紀錄。

## Release Build

目前 TG 測試包使用 debug APK。如果要產正式 release APK：

```powershell
.\scripts\build-release-package.ps1 -BuildType Release
```

正式對外前要先補 Android release signing；未設定 signing 時不要把 release build 當作正式發行包。

## 環境

腳本會優先使用：

```text
C:\mtt-gto-solver\.codex\jdks
C:\mtt-gto-solver\.codex\android-sdk
```

如果找不到，會 fallback 到：

```text
C:\Stock\tools\jdk17\jdk-17.0.19+10
C:\Stock\tools\android-sdk
```

Android Gradle Plugin 8.x 需要 JDK 17。
