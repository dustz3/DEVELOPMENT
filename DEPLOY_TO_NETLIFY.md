# 部署到 Netlify 完整指南

## 📋 前置準備

### 1. 確認本地測試成功
- ✅ API 服務器運行正常（`local-api-server.js`）
- ✅ 前端頁面可以正常查詢（`basic.html`, `standard.html`）
- ✅ 所有功能測試通過

### 2. 確認 Git 狀態
確保所有更改已提交到 Git：

```bash
git status
git add .
git commit -m "準備部署到 Netlify"
```

---

## 🚀 部署步驟

### 步驟 1：確保代碼已推送到 GitHub

您的 Git remote 是：`https://github.com/dustz3/TailorMed_Tracking.git`

```bash
# 確認當前分支
git branch

# 推送到 GitHub
git push origin main
```

---

### 步驟 2：登入 Netlify 並連接 GitHub

1. **訪問 Netlify**
   - 前往 https://app.netlify.com
   - 使用 GitHub 帳號登入

2. **連接 GitHub Repository**
   - 點擊 "Add new site" → "Import an existing project"
   - 選擇 "GitHub" 並授權
   - 選擇 repository：`dustz3/TailorMed_Tracking`

---

### 步驟 3：配置 Netlify 構建設定

Netlify 會自動讀取根目錄的 `netlify.toml`，但我們需要確認：

#### 3.1 在 Netlify Dashboard 設定構建配置

進入 Site settings → Build & deploy → Build settings：

- **Build command**: `cd src/Projects/TailorMed/track && node compile.js`
- **Publish directory**: `dist/Projects/TailorMed/track`
- **Functions directory**: `src/Projects/TailorMed/track/backend/netlify/functions`

> 💡 注意：如果 `netlify.toml` 已正確配置，Netlify 會自動讀取這些設定。

---

### 步驟 4：設置環境變數（最重要！）

這是**關鍵步驟**，API TOKEN 必須在這裡設定：

1. **進入 Netlify Dashboard**
   - Site settings → Environment variables
   - 點擊 "Add variable"

2. **添加以下環境變數**：

| 變數名稱 | 值 | 說明 |
|---------|-----|------|
| `AIRTABLE_API_KEY` | 您的 Airtable API Key | 從本地 `.env` 檔案複製 |
| `AIRTABLE_BASE_ID` | 您的 Airtable Base ID | 從本地 `.env` 檔案複製 |
| `AIRTABLE_SHIPMENTS_TABLE` | `Tracking` | 表格名稱 |

3. **設置環境範圍**
   - 勾選 "All scopes"（Production, Deploy previews, Branch deploys）
   - 或至少勾選 "Production"

> ⚠️ **重要**：這些環境變數是**敏感資訊**，請勿提交到 Git。Netlify 會安全地存儲它們。

---

### 步驟 5：觸發部署

#### 方式 A：自動部署（推薦）
- 推送代碼到 GitHub 後，Netlify 會自動觸發部署
- 在 Netlify Dashboard 的 "Deploys" 標籤頁可以看到部署狀態

#### 方式 B：手動部署
- 在 Netlify Dashboard 點擊 "Trigger deploy" → "Deploy site"

---

### 步驟 6：等待構建完成

1. **查看構建日誌**
   - 在 "Deploys" 標籤頁點擊正在進行的部署
   - 查看構建日誌，確認：
     - ✅ Pug 模板編譯成功
     - ✅ Stylus 樣式編譯成功
     - ✅ JavaScript 文件複製成功
     - ✅ Netlify Functions 安裝依賴成功

2. **檢查 Function 日誌**
   - 在 "Functions" 標籤頁查看 `tracking` function
   - 確認沒有錯誤訊息

---

### 步驟 7：測試部署結果

1. **訪問您的網站**
   - Netlify 會提供一個 URL，例如：`https://your-site-name.netlify.app`
   - 或使用自定義域名（如果已設定）

2. **測試頁面**
   - 訪問 `https://your-site.netlify.app/basic`
   - 訪問 `https://your-site.netlify.app/standard`
   - 輸入追蹤號碼測試查詢功能

3. **測試 API**
   - 訪問 `https://your-site.netlify.app/api/health`
   - 應該返回 `{"status":"ok",...}`

---

## 🔍 故障排除

### 問題 1：構建失敗

**檢查構建日誌**：
- 確認 Node.js 版本（Netlify 預設使用 Node 18）
- 確認 `compile.js` 路徑正確
- 確認所有依賴已安裝

**解決方法**：
- 在 `netlify.toml` 添加 Node 版本設定：
```toml
[build.environment]
  NODE_VERSION = "18"
```

---

### 問題 2：Function 無法連接 Airtable

**檢查環境變數**：
- 確認在 Netlify Dashboard 已設置所有環境變數
- 確認變數名稱拼寫正確（大小寫敏感）
- 確認變數值正確（沒有多餘空格）

**檢查 Function 日誌**：
- 在 Netlify Dashboard → Functions → tracking → Logs
- 查看是否有 "AIRTABLE_API_KEY: NOT SET" 的錯誤

**解決方法**：
- 重新設置環境變數
- 重新部署網站

---

### 問題 3：API 返回 404 或 500

**檢查重定向規則**：
- 確認 `netlify.toml` 中的 `[[redirects]]` 規則正確
- 確認 Function 路徑正確

**檢查 Function 日誌**：
- 查看是否有錯誤訊息
- 確認依賴已正確安裝

---

### 問題 4：前端頁面無法加載

**檢查發布目錄**：
- 確認 `dist/Projects/TailorMed/track` 目錄存在
- 確認 `index.html`, `basic.html`, `standard.html` 已生成

**解決方法**：
- 本地運行 `compile.js` 確認編譯成功
- 檢查構建日誌中的編譯錯誤

---

## 📝 檢查清單

部署前確認：

- [ ] 本地測試全部通過
- [ ] 代碼已推送到 GitHub
- [ ] Netlify 已連接 GitHub repository
- [ ] `netlify.toml` 配置正確
- [ ] 環境變數已設置（AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_SHIPMENTS_TABLE）
- [ ] 構建命令和發布目錄正確
- [ ] Functions 目錄配置正確

部署後確認：

- [ ] 構建成功（沒有錯誤）
- [ ] Function 部署成功
- [ ] 網站可以訪問
- [ ] `/basic` 和 `/standard` 頁面可以訪問
- [ ] API 查詢功能正常
- [ ] 環境變數正確讀取（檢查 Function 日誌）

---

## 🎯 快速參考

### 重要檔案位置

- **Netlify 配置**: `/netlify.toml` (根目錄)
- **前端編譯**: `/src/Projects/TailorMed/track/compile.js`
- **Netlify Function**: `/src/Projects/TailorMed/track/backend/netlify/functions/tracking.js`
- **Function 依賴**: `/src/Projects/TailorMed/track/backend/netlify/functions/package.json`
- **發布目錄**: `/dist/Projects/TailorMed/track`

### 環境變數（從本地 `.env` 複製）

```
AIRTABLE_API_KEY=your_api_key_here
AIRTABLE_BASE_ID=your_base_id_here
AIRTABLE_SHIPMENTS_TABLE=Tracking
```

---

## 🔒 安全提醒

1. **不要將 `.env` 檔案提交到 Git**
   - ✅ `.env` 已在 `.gitignore` 中
   - ✅ 環境變數只在 Netlify Dashboard 設置

2. **定期輪換 API Key**
   - 如果 API Key 洩露，立即在 Airtable 中重新生成
   - 更新 Netlify 環境變數

3. **使用環境變數而非硬編碼**
   - ✅ 所有敏感資訊都使用環境變數
   - ✅ 代碼中沒有硬編碼的 API Key

---

## 📞 需要幫助？

如果遇到問題，請檢查：

1. Netlify Dashboard 的構建日誌
2. Netlify Dashboard 的 Function 日誌
3. 瀏覽器開發者工具的 Console 和 Network 標籤

---

**祝部署順利！** 🎉

