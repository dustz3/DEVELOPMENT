@echo off
chcp 65001 >nul
echo ========================================
echo   TailorMed 文檔網站 - 開發模式（即時預覽）
echo ========================================
echo.

cd /d "%~dp0"

echo 步驟 1: 檢查搜尋索引...
echo.

REM 檢查是否有建置後的搜尋索引
if not exist "build\search" (
    echo [提示] 搜尋索引不存在，正在建立...
    echo 這可能需要 1-2 分鐘，請稍候...
    echo.
    call npm run build
    if errorlevel 1 (
        echo.
        echo [錯誤] 建置失敗，請檢查錯誤訊息
        pause
        exit /b 1
    )
    echo.
    echo [成功] 搜尋索引已建立！
    echo.
) else (
    echo [提示] 搜尋索引已存在，跳過建置步驟
    echo.
)

echo 步驟 2: 啟動開發伺服器...
echo.
echo 這可能需要 10-30 秒，請稍候...
echo.

echo 請等待瀏覽器自動開啟...
echo 如果沒有自動開啟，請查看下方顯示的網址
echo.
echo ========================================
echo 重要提示：
echo - 編輯 docs/ 資料夾中的檔案後，儲存即可看到更新
echo - 瀏覽器會自動重新整理顯示最新內容
echo - 請保持此視窗開啟，關閉視窗會停止伺服器
echo - 按 Ctrl+C 可以停止伺服器
echo.
echo ⚠️  搜尋功能限制：
echo    開發模式下搜尋功能無法使用（這是插件的限制）
echo    如需測試搜尋功能，請使用「開啟文檔-預覽模式.bat」
echo    或執行: npm run build ^&^& npm run serve
echo ========================================
echo.

call npm start

