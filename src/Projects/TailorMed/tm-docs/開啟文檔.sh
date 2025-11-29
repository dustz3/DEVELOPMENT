#!/bin/bash

echo "========================================"
echo "  TailorMed 文檔網站 - 本地預覽"
echo "========================================"
echo ""
echo "步驟 1: 重新建置網站（確保包含最新變更）..."
echo ""
echo "這可能需要 1-2 分鐘，請稍候..."
echo ""

# 切換到腳本所在目錄
cd "$(dirname "$0")"

echo "正在建置網站..."
npm run build

if [ $? -ne 0 ]; then
    echo ""
    echo "[錯誤] 建置失敗，請檢查錯誤訊息"
    read -p "按 Enter 鍵結束..."
    exit 1
fi

echo ""
echo "[成功] 建置完成！"
echo ""

echo "步驟 2: 啟動本地伺服器..."
echo ""
echo "請等待瀏覽器自動開啟..."
echo "如果沒有自動開啟，請查看下方顯示的網址"
echo ""
echo "按 Ctrl+C 可以停止伺服器"
echo ""
echo "========================================"
echo ""

npm run serve

