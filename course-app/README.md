# MTT Course App

`docs/course-app` 會把 `docs/mtt-v2` 的 MTT v2 教材打包成可離線閱讀的 PWA / Android APK。這一版只包含新寫的線上 MTT / Big Blind Ante 課文、13x13 範圍表與測驗；舊 `docs/mtt` 與 `docs/cash-game` 已移除，Cash Game 會在 MTT 完成後另起新版。

## 本機預覽

```powershell
cd C:\mtt-gto-solver\docs\course-app
npm run build:web
npm run serve
```

預設網址：

```text
http://localhost:4173/
```

如果 `4173` 已被占用，可以指定其他 port：

```powershell
$env:PORT = '4174'
npm run serve
```

## Android Debug APK

```powershell
cd C:\mtt-gto-solver\docs\course-app
npm run sync
cd android
.\gradlew.bat assembleDebug
```

Gradle 原始輸出：

```text
C:\mtt-gto-solver\docs\course-app\android\app\build\outputs\apk\debug\app-debug.apk
```

## TG 打包流程

產生 APK + ZIP：

```powershell
cd C:\mtt-gto-solver\docs\course-app
.\scripts\build-release-package.ps1
```

產物會寫到：

```text
C:\mtt-gto-solver\docs\course-app\releases\mtt-v2-course-v{version}-{yyyyMMddN}-debug.apk
C:\mtt-gto-solver\docs\course-app\releases\mtt-v2-course-v{version}-{yyyyMMddN}-debug.zip
```

直接發 Telegram：

```powershell
.\scripts\build-release-package.ps1 -SendTelegram
```

TG bot 設定已放在本機私有檔：

```text
C:\mtt-gto-solver\docs\course-app\.codex\telegram-release.json
```

這個檔案由 `.gitignore` 排除，不會進入 repo、Markdown 文件、APK 或 ZIP。腳本仍支援用 `TELEGRAM_BOT_TOKEN` / `TELEGRAM_CHAT_ID` 環境變數覆蓋設定。

完整 release 筆記與操作細節在 [docs/release-tg.md](docs/release-tg.md)。

## 環境處理

打包腳本會優先使用專案本地工具：

```text
C:\mtt-gto-solver\.codex\jdks
C:\mtt-gto-solver\.codex\android-sdk
```

如果找不到，會 fallback 到 `C:\Stock\tools`：

```text
C:\Stock\tools\jdk17\jdk-17.0.19+10
C:\Stock\tools\android-sdk
```

Android Gradle Plugin 8.x 需要 JDK 17，不要用 Java 8。

## 注意事項

- 目前發 TG 使用 debug APK，適合測試頻道與教材驗收。
- App 目前只內建 MTT v2。Cash Game 舊版已刪除，後續會重做新版再加入。
- 正式上架或對外 release 前，仍要補 Android release signing。
- TG 發送的是 ZIP，裡面只包含 APK。
- 每次同一天重打包會自動使用流水號 `{yyyyMMddN}`，避免覆蓋既有檔案。
