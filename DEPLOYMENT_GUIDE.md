# TailorMed track-v2 部署指南

## 專案結構

```
track-v2/
├── Templates/          # Pug 模板（前端）
├── Styles/             # Stylus 樣式
├── Assets/             # 靜態資源
├── compile.js          # 編譯腳本
├── backend/            # 後端 API（目前為空）
└── netlify/functions/  # Netlify Functions（API 端點）
```

## 部署方式

### Netlify Functions 部署（推薦）

使用 **Netlify Functions** 來處理 API 請求，這樣前端和後端都在同一個 Netlify 專案中。

#### 1. 建立 Netlify Functions

在專案根目錄建立 `netlify/functions/tracking.js`：

```javascript
// netlify/functions/tracking.js
exports.handler = async (event, context) => {
  // 處理 CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // 處理 OPTIONS 請求（CORS preflight）
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  const { httpMethod, path, queryStringParameters } = event;

  try {
    // 根據路徑處理不同的 API 端點
    if (path.includes('/api/tracking')) {
      const { orderNo, trackingNo } = queryStringParameters || {};

      // TODO: 連接到資料庫或外部 API
      // 目前返回範例資料
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          data: {
            orderNo: orderNo || 'TM439812',
            trackingNo: trackingNo || 'TRACK001',
            status: 'in_transit',
            // ... 其他資料
          },
        }),
      };
    }

    if (path.includes('/api/health')) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          status: 'ok',
          timestamp: new Date().toISOString(),
        }),
      };
    }

    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: 'Not found' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
```

#### 2. 設定 Netlify 配置

在專案根目錄建立 `netlify.toml`：

```toml
[build]
  publish = "dist/Projects/TailorMed/track-v2"
  command = "cd src/Projects/TailorMed/track-v2 && node compile.js"
  functions = "netlify/functions"

[[redirects]]
  from = "/api/tracking"
  to = "/.netlify/functions/tracking"
  status = 200

[[redirects]]
  from = "/api/tracking-public"
  to = "/.netlify/functions/tracking"
  status = 200

[[redirects]]
  from = "/api/health"
  to = "/.netlify/functions/tracking"
  status = 200

[[redirects]]
  from = "/design"
  to = "/design_ui.html"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### 3. 更新 \_redirects 檔案

確保 `dist/Projects/TailorMed/track-v2/_redirects` 包含：

```
# API to Netlify Functions
/api/tracking  /.netlify/functions/tracking  200
/api/tracking-public  /.netlify/functions/tracking  200
/api/health  /.netlify/functions/tracking  200

# Redirect /design to design_ui.html
/design  /design_ui.html  200

# Fallback for SPA routing
/*  /index.html  200
```

#### 4. 在 Netlify 設定環境變數

如果需要資料庫連線或其他 API：

```bash
# 在 Netlify Dashboard > Site settings > Environment variables 設定：
DATABASE_URL=your-database-url
API_KEY=your-api-key
```

### 1. 前端部署（Frontend）

前端是靜態檔案，編譯後會產生在 `dist/Projects/TailorMed/track-v2/` 目錄下。

#### 編譯步驟

```bash
cd src/Projects/TailorMed/track-v2
node compile.js
```

編譯完成後，檔案會在 `dist/Projects/TailorMed/track-v2/` 目錄下：

- `index.html` - 主頁面
- `design_ui.html` - 設計 UI 頁面
- `components/` - 組件 HTML
- `css/` - 樣式檔案
- `images/` - 圖片資源

#### 部署選項

##### A. Netlify 部署（推薦）

1. **建立 `netlify.toml` 在專案根目錄：**

```toml
[build]
  publish = "dist/Projects/TailorMed/track-v2"
  command = "cd src/Projects/TailorMed/track-v2 && node compile.js"

[[redirects]]
  from = "/design"
  to = "/design_ui.html"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

2. **在 Netlify 設定：**
   - Build command: `cd src/Projects/TailorMed/track-v2 && node compile.js`
   - Publish directory: `dist/Projects/TailorMed/track-v2`
   - Environment variables: 不需要（目前）

##### B. Vercel 部署

1. **建立 `vercel.json`：**

```json
{
  "buildCommand": "cd src/Projects/TailorMed/track-v2 && node compile.js",
  "outputDirectory": "dist/Projects/TailorMed/track-v2",
  "rewrites": [
    { "source": "/design", "destination": "/design_ui.html" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

##### C. GitHub Pages 部署

1. **建立 GitHub Actions workflow (`.github/workflows/deploy.yml`)：**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Build
        run: cd src/Projects/TailorMed/track-v2 && node compile.js

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist/Projects/TailorMed/track-v2
```

### 2. 後端部署（Backend）

目前 `backend/` 資料夾是空的，當有後端程式碼時，可以使用以下方式部署：

#### 選項 A: Render 部署

1. **建立 `render.yaml` 在 `backend/` 目錄：**

```yaml
services:
  - type: web
    name: tailormed-track-api
    env: node
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: DATABASE_URL
        sync: false
      - key: API_KEY
        sync: false
```

2. **在 `backend/package.json` 設定：**

```json
{
  "name": "tailormed-track-api",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.0",
    "cors": "^2.8.5"
  }
}
```

#### 選項 B: Railway 部署

1. 連接到 GitHub repository
2. 設定根目錄為 `src/Projects/TailorMed/track-v2/backend`
3. 自動偵測 Node.js 專案並部署

#### 選項 C: Heroku 部署

1. **建立 `Procfile`：**

```
web: node server.js
```

2. **部署：**

```bash
heroku create tailormed-track-api
git subtree push --prefix src/Projects/TailorMed/track-v2/backend heroku main
```

#### 選項 D: AWS/Google Cloud/Azure

根據實際需求選擇合適的雲端平台，部署 Node.js 應用程式。

## 環境變數設定

### 前端環境變數

目前不需要環境變數，但未來可能需要：

```bash
# .env 或 Netlify Environment Variables
VITE_API_URL=https://api.tailormed-intl.com
VITE_ENV=production
```

### 後端環境變數

當後端有程式碼時，需要設定：

```bash
# 資料庫連線
DATABASE_URL=postgresql://user:pass@host:port/dbname

# API 金鑰
API_KEY=your-api-key

# 伺服器設定
PORT=3000
NODE_ENV=production
```

## 完整部署流程

### 1. 本地開發

```bash
# 編譯前端
cd src/Projects/TailorMed/track-v2
node compile.js

# 本地預覽
cd ../../../../dist/Projects/TailorMed/track-v2
python3 -m http.server 8000
# 或使用其他靜態伺服器
```

### 2. 部署前端

```bash
# 1. 編譯
cd src/Projects/TailorMed/track-v2
node compile.js

# 2. 提交到 git
git add dist/
git commit -m "chore: build frontend"
git push

# 3. Netlify 會自動部署（如果已設定）
```

### 3. 部署後端（當有程式碼時）

```bash
# 1. 進入 backend 目錄
cd src/Projects/TailorMed/track-v2/backend

# 2. 安裝依賴
npm install

# 3. 測試
npm test

# 4. 部署到 Render/Railway/Heroku
# （根據選擇的平台執行對應的部署指令）
```

## 注意事項

1. **前端和後端分開部署**

   - 前端：靜態檔案託管（Netlify/Vercel/GitHub Pages）
   - 後端：Node.js 服務（Render/Railway/Heroku）

2. **CORS 設定**

   - 如果前端和後端在不同域名，需要設定 CORS

3. **環境變數**

   - 不要將敏感資訊（API keys, database credentials）提交到 git
   - 使用環境變數管理

4. **編譯腳本**
   - 確保 `compile.js` 在 CI/CD 中正確執行
   - 檢查編譯後的檔案是否正確生成

## 目前狀態

- ✅ 前端編譯流程完整
- ✅ 前端可以部署到 Netlify/Vercel
- ⚠️ 後端資料夾目前為空，需要開發後端 API
- ⚠️ 需要建立後端部署配置（當有程式碼時）
