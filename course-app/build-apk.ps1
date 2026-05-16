$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$env:JAVA_HOME = "C:\Stock\tools\jdk17\jdk-17.0.19+10"
$env:ANDROID_HOME = "C:\Stock\tools\android-sdk"
$env:ANDROID_SDK_ROOT = "C:\Stock\tools\android-sdk"
$env:Path = "$env:JAVA_HOME\bin;$env:ANDROID_HOME\platform-tools;$env:ANDROID_HOME\cmdline-tools\latest\bin;$env:Path"

Set-Location $projectRoot
npm run build:web
npx cap sync android

Set-Location (Join-Path $projectRoot "android")
.\gradlew.bat assembleDebug --no-daemon --console=plain

$apk = Join-Path $projectRoot "android\app\build\outputs\apk\debug\app-debug.apk"
$dist = Join-Path $projectRoot "dist"
New-Item -ItemType Directory -Force -Path $dist | Out-Null
Copy-Item -Force -Path $apk -Destination (Join-Path $dist "MTT-Course-debug.apk")

Write-Host "APK built:"
Write-Host (Join-Path $dist "MTT-Course-debug.apk")
