# Netlify 部署指南 - TailorMed 文檔系統

## 📋 部署前準備

### 1. 更新 Docusaurus 配置

在部署前，需要更新 `docusaurus.config.js` 中的 URL 設定：

```javascript
const config = {
  // 設定為您的 Netlify 網址
  url: 'https://your-site-name.netlify.app',  // 或您的自訂網域
  baseUrl: '/',
  // ...
};
```

### 2. 確認 Node.js 版本

確保 `package.json` 中的 Node.js 版本要求：
```json
"engines": {
  "node": ">=20.0"
}
```

---

## 🚀 部署方式

### 方式 1：透過 Netlify Dashboard（推薦）

#### 步驟 1：連接 GitHub Repository

1. 登入 [Netlify](https://app.netlify.com/)
2. 點擊 **"Add new site"** → **"Import an existing project"**
3. 選擇 **"Deploy with GitHub"**
4. 選擇您的 repository：`dustz3/DEVELOPMENT`
5. 授權 Netlify 存取您的 GitHub

#### 步驟 2：設定建置選項

在 Netlify 建置設定中：

**Base directory：** `src/Projects/TailorMed/tm-docs`

**Build command：**
```bash
npm install && npm run build
```

**Publish directory：**
```
build
```

**Environment variables：**
- `NODE_VERSION` = `20`

#### 步驟 3：部署

1. 點擊 **"Deploy site"**
2. 等待建置完成（約 2-5 分鐘）
3. 部署完成後，Netlify 會提供一個網址（例如：`https://random-name-123.netlify.app`）

#### 步驟 4：更新 URL 設定

部署完成後，更新 `docusaurus.config.js` 中的 URL：

```javascript
url: 'https://your-actual-netlify-url.netlify.app',
```

然後重新推送並觸發重新部署。

---

### 方式 2：使用 Netlify CLI

#### 安裝 Netlify CLI

```bash
npm install -g netlify-cli
```

#### 登入 Netlify

```bash
netlify login
```

#### 初始化並部署

```bash
cd src/Projects/TailorMed/tm-docs
netlify init
```

按照提示選擇：
- **Create & configure a new site**
- **Team**（選擇您的團隊）
- **Site name**（輸入網站名稱，例如：`tailormed-docs`）

#### 部署

```bash
netlify deploy --prod
```

---

## ⚙️ 進階設定

### 自訂網域

1. 在 Netlify Dashboard → **Site settings** → **Domain management**
2. 點擊 **"Add custom domain"**
3. 輸入您的網域（例如：`docs.tailormed.com`）
4. 按照指示設定 DNS 記錄

### 環境變數

如果需要環境變數，在 Netlify Dashboard → **Site settings** → **Environment variables** 中設定。

### 自動部署

Netlify 預設會：
- 監聽 `main` 分支的推送
- 自動觸發建置和部署

您可以在 **Site settings** → **Build & deploy** → **Continuous Deployment** 中調整設定。

---

## 🔍 建置檢查清單

部署前請確認：

- [ ] `docusaurus.config.js` 中的 `url` 已更新為 Netlify 網址
- [ ] `baseUrl` 設定為 `/`
- [ ] `package.json` 中的 Node.js 版本要求正確（>= 20.0）
- [ ] `netlify.toml` 配置正確
- [ ] 所有文檔檔案已提交到 Git
- [ ] 搜尋索引可以正常建立（需要執行 `npm run build`）

---

## 🐛 常見問題

### Q: 建置失敗，顯示 Node.js 版本錯誤？

**A:** 在 Netlify Dashboard → **Site settings** → **Build & deploy** → **Environment** 中設定：
- `NODE_VERSION` = `20`

### Q: 搜尋功能無法使用？

**A:** 確保建置命令包含 `npm run build`，這樣才會建立搜尋索引。

### Q: 頁面顯示 404？

**A:** 檢查 `netlify.toml` 中的重定向規則是否正確：
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Q: 如何更新網站內容？

**A:** 
1. 編輯文檔檔案
2. 提交並推送到 GitHub
3. Netlify 會自動偵測變更並重新部署

---

## 📝 部署後檢查

部署完成後，請檢查：

1. ✅ 網站可以正常訪問
2. ✅ 所有文檔頁面可以正常顯示
3. ✅ 搜尋功能可以正常使用
4. ✅ 圖片和靜態資源可以正常載入
5. ✅ 手機版顯示正常

---

## 🔗 相關資源

- [Netlify 官方文檔](https://docs.netlify.com/)
- [Docusaurus 部署指南](https://docusaurus.io/docs/deployment)
- [Netlify CLI 文檔](https://cli.netlify.com/)

---

**需要幫助？** 隨時聯絡技術支援！

