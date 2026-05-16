param(
    [ValidateSet("Debug", "Release")]
    [string]$BuildType = "Debug",
    [switch]$SkipSync,
    [switch]$NoZip,
    [switch]$SendTelegram,
    [string]$TelegramBotToken = $env:TELEGRAM_BOT_TOKEN,
    [string]$TelegramChatId = $env:TELEGRAM_CHAT_ID,
    [string]$TelegramConfigPath = "",
    [string]$Caption = "",
    [switch]$DryRun
)

$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$workspaceRoot = Resolve-Path (Join-Path $repoRoot "..\..")
$releaseDir = Join-Path $repoRoot "releases"
$packageJsonPath = Join-Path $repoRoot "package.json"
$releasePrefix = "poker-course"

if (-not $TelegramConfigPath) {
    $TelegramConfigPath = Join-Path $repoRoot ".codex\telegram-release.json"
}

function Get-PackageVersion {
    param([string]$Path)

    $package = Get-Content -Path $Path -Encoding UTF8 | ConvertFrom-Json
    if (-not $package.version) {
        throw "Cannot find version in package.json"
    }
    return $package.version
}

function Get-NextDailySuffix {
    param(
        [string]$ReleaseDir,
        [string]$ReleasePrefix,
        [string]$VersionName,
        [string]$DateText,
        [string]$BuildType
    )

    if (-not (Test-Path $ReleaseDir)) {
        return 0
    }

    $escapedVersion = [regex]::Escape($VersionName)
    $escapedPrefix = [regex]::Escape($ReleasePrefix)
    $escapedBuildType = [regex]::Escape($BuildType.ToLowerInvariant())
    $regex = "^$escapedPrefix-v$escapedVersion-$DateText(\d+)-$escapedBuildType\.apk$"
    $max = -1

    Get-ChildItem -Path $ReleaseDir -Filter "$ReleasePrefix-v$VersionName-$DateText*-$($BuildType.ToLowerInvariant()).apk" |
        ForEach-Object {
            if ($_.Name -match $regex) {
                $value = [int]$Matches[1]
                if ($value -gt $max) {
                    $max = $value
                }
            }
        }

    return $max + 1
}

function Find-LocalJdk {
    $workspaceJdks = Join-Path $workspaceRoot ".codex\jdks"
    if (Test-Path $workspaceJdks) {
        $jdk = Get-ChildItem $workspaceJdks -Recurse -Directory |
            Where-Object { Test-Path (Join-Path $_.FullName "bin\java.exe") } |
            Sort-Object FullName -Descending |
            Select-Object -First 1
        if ($jdk) {
            return $jdk.FullName
        }
    }

    $stockJdk = "C:\Stock\tools\jdk17\jdk-17.0.19+10"
    if (Test-Path (Join-Path $stockJdk "bin\java.exe")) {
        return $stockJdk
    }

    throw "No JDK 17 found. Expected project .codex\jdks or C:\Stock\tools\jdk17\jdk-17.0.19+10."
}

function Find-AndroidSdk {
    $workspaceSdk = Join-Path $workspaceRoot ".codex\android-sdk"
    if (Test-Path (Join-Path $workspaceSdk "platform-tools\adb.exe")) {
        return $workspaceSdk
    }

    $stockSdk = "C:\Stock\tools\android-sdk"
    if (Test-Path (Join-Path $stockSdk "platform-tools\adb.exe")) {
        return $stockSdk
    }

    throw "No Android SDK found. Expected project .codex\android-sdk or C:\Stock\tools\android-sdk."
}

function Assert-ApkContainsCourseManifest {
    param([string]$ApkPath)

    Add-Type -AssemblyName System.IO.Compression.FileSystem
    $zip = [System.IO.Compression.ZipFile]::OpenRead($ApkPath)
    try {
        $entry = $zip.GetEntry("assets/public/content-manifest.json")
        if ($null -eq $entry) {
            throw "APK does not contain assets/public/content-manifest.json"
        }

        $reader = [System.IO.StreamReader]::new($entry.Open())
        try {
            $json = $reader.ReadToEnd()
        }
        finally {
            $reader.Dispose()
        }

        $manifest = $json | ConvertFrom-Json
        Write-Host "Course manifest entries: $($manifest.Count)"
        if ($manifest.Count -lt 1) {
            throw "Course manifest is empty"
        }
    }
    finally {
        $zip.Dispose()
    }
}

function Get-TelegramReleaseConfig {
    param([string]$Path)

    if (-not (Test-Path $Path)) {
        return $null
    }

    $config = Get-Content -Path $Path -Encoding UTF8 | ConvertFrom-Json
    return [pscustomobject]@{
        BotToken = $config.botToken
        ChatId = $config.chatId
        DefaultCaption = $config.defaultCaption
    }
}

$versionName = Get-PackageVersion -Path $packageJsonPath
$dateText = Get-Date -Format "yyyyMMdd"
$dailySuffix = Get-NextDailySuffix -ReleaseDir $releaseDir -ReleasePrefix $releasePrefix -VersionName $versionName -DateText $dateText -BuildType $BuildType
$buildTypeLower = $BuildType.ToLowerInvariant()
$apkName = "$releasePrefix-v$versionName-$dateText$dailySuffix-$buildTypeLower.apk"
$zipName = "$releasePrefix-v$versionName-$dateText$dailySuffix-$buildTypeLower.zip"
$apkTarget = Join-Path $releaseDir $apkName
$zipTarget = Join-Path $releaseDir $zipName

if ($DryRun) {
    Write-Host "Version:      $versionName"
    Write-Host "Build type:   $BuildType"
    Write-Host "Target APK:   $apkTarget"
    Write-Host "Target ZIP:   $zipTarget"
    exit 0
}

$javaHome = Find-LocalJdk
$androidSdk = Find-AndroidSdk
$env:JAVA_HOME = $javaHome
$env:ANDROID_HOME = $androidSdk
$env:ANDROID_SDK_ROOT = $androidSdk
$env:Path = "$env:JAVA_HOME\bin;$env:ANDROID_HOME\platform-tools;$env:Path"

if (-not (Test-Path $releaseDir)) {
    New-Item -Path $releaseDir -ItemType Directory | Out-Null
}

Push-Location $repoRoot
try {
    if (-not $SkipSync) {
        npm run build:web
        npx cap sync android
    }

    Push-Location (Join-Path $repoRoot "android")
    try {
        & ".\gradlew.bat" "assemble$BuildType"
    }
    finally {
        Pop-Location
    }
}
finally {
    Pop-Location
}

$apkSource = Join-Path $repoRoot "android\app\build\outputs\apk\$buildTypeLower\app-$buildTypeLower.apk"
if (-not (Test-Path $apkSource)) {
    throw "APK not found: $apkSource"
}

Copy-Item -LiteralPath $apkSource -Destination $apkTarget -Force
Assert-ApkContainsCourseManifest -ApkPath $apkTarget

if (-not $NoZip) {
    if (Test-Path $zipTarget) {
        Remove-Item -LiteralPath $zipTarget -Force
    }
    Compress-Archive -LiteralPath $apkTarget -DestinationPath $zipTarget -Force
}

Write-Host "APK: $apkTarget"
if (-not $NoZip) {
    Write-Host "TG ZIP: $zipTarget"
}

if ($SendTelegram) {
    $telegramConfig = Get-TelegramReleaseConfig -Path $TelegramConfigPath
    if ($telegramConfig) {
        if (-not $TelegramBotToken) {
            $TelegramBotToken = $telegramConfig.BotToken
        }
        if (-not $TelegramChatId) {
            $TelegramChatId = $telegramConfig.ChatId
        }
        if (-not $Caption -and $telegramConfig.DefaultCaption) {
            $Caption = $telegramConfig.DefaultCaption
        }
    }

    if (-not $TelegramBotToken -or -not $TelegramChatId) {
        throw "TelegramBotToken and TelegramChatId are required. Set TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID or create $TelegramConfigPath."
    }
    if ($NoZip) {
        throw "Telegram delivery uses ZIP. Remove -NoZip."
    }

    $defaultCaption = "MTT Course App v$versionName $dateText$dailySuffix ($BuildType)"
    $sendCaption = if ($Caption) { $Caption } else { $defaultCaption }
    $url = "https://api.telegram.org/bot$TelegramBotToken/sendDocument"
    $response = curl.exe -sS -X POST $url `
        -F "chat_id=$TelegramChatId" `
        -F "document=@$zipTarget" `
        -F "caption=$sendCaption"
    Write-Host $response
}
