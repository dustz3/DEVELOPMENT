@echo off
chcp 65001 >nul
echo ========================================
echo   TailorMed 文檔網站 - 預覽模式（搜尋可用）
echo ========================================
echo.
echo 步驟 1: 建置網站（確保包含最新變更和搜尋索引）...
echo.
echo 這可能需要 1-2 分鐘，請稍候...
echo.

cd /d "%~dp0"

echo 正在建置網站...
call npm run build
if errorlevel 1 (
    echo.
    echo [錯誤] 建置失敗，請檢查錯誤訊息
    pause
    exit /b 1
)
echo.
echo [成功] 建置完成！搜尋索引已建立
echo.

echo 步驟 2: 啟動預覽伺服器...
echo.
echo 請等待瀏覽器自動開啟...
echo 如果沒有自動開啟，請查看下方顯示的網址
echo.
echo ========================================
echo 重要提示：
echo - 此模式使用建置後的版本，搜尋功能可用
echo - 編輯文檔後，需要重新執行此批次檔才能看到更新
echo - 請保持此視窗開啟，關閉視窗會停止伺服器
echo - 按 Ctrl+C 可以停止伺服器
echo ========================================
echo.

call npm run serve

