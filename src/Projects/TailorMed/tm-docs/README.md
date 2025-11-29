# TailorMed 文檔網站

這個網站使用 [Docusaurus](https://docusaurus.io/) 建置，這是一個現代的靜態網站生成器。

---

## 🚀 快速開始

### 第一次使用？

1. **閱讀指南**：先看 [`文檔編輯指南.md`](./文檔編輯指南.md) - 這是給非技術人員的完整指南
2. **使用模板**：參考 [`docs/template.md`](./docs/template.md) 來創建新文檔
3. **查詢語法**：需要時查看 [`Markdown快速參考.md`](./Markdown快速參考.md)

---

## 📝 編輯文檔（最簡單的方法）

### 不需要懂程式！

1. 打開 `docs/` 資料夾
2. 編輯任何 `.md` 檔案（用記事本、VS Code 都可以）
3. 儲存檔案
4. 重新整理瀏覽器，就能看到更新！

**就是這麼簡單！** 🎉

---

## 🛠️ 技術人員：開發環境設定

### 安裝依賴

```bash
npm install
```

### 啟動開發伺服器

從專案根目錄執行：

```bash
npm run docs:start
```

或直接在 `tm-docs` 目錄下執行：

```bash
cd src/Projects/TailorMed/tm-docs
npm start
```

開發伺服器會在 http://localhost:3000/ 啟動，變更會自動重新載入。

### 建置生產版本

```bash
npm run docs:build
```

或：

```bash
cd src/Projects/TailorMed/tm-docs
npm run build
```

### 預覽建置結果

```bash
npm run docs:serve
```

或：

```bash
cd src/Projects/TailorMed/tm-docs
npm run serve
```

---

## 📁 專案結構

```
tm-docs/
├── docs/                    # 📝 文檔內容（在這裡編輯！）
│   ├── intro.md            # 首頁文檔
│   ├── Company/            # 公司相關文檔
│   └── template.md         # 文檔模板（複製使用）
├── static/                  # 🖼️ 靜態資源
│   └── img/                # 圖片放在這裡
├── src/
│   ├── css/                # 樣式設定
│   └── pages/              # 自訂頁面
├── 文檔編輯指南.md          # 📖 完整使用指南
├── Markdown快速參考.md      # 📋 語法快速查詢
├── docusaurus.config.js    # 網站配置
└── sidebars.js             # 側邊欄配置
```

---

## 📚 重要文件

| 文件 | 說明 | 適合對象 |
|------|------|---------|
| [`文檔編輯指南.md`](./文檔編輯指南.md) | 完整的使用指南，包含所有操作說明 | 所有人 |
| [`docs/template.md`](./docs/template.md) | 可以直接複製使用的文檔模板 | 所有人 |
| [`Markdown快速參考.md`](./Markdown快速參考.md) | 語法快速查詢卡片 | 所有人 |
| `README.md`（本文件） | 專案說明和快速開始 | 技術人員 |

---

## 💡 常見操作

### 新增文檔

1. 在 `docs/` 資料夾中建立新的 `.md` 檔案
2. 複製 `docs/template.md` 的內容
3. 填入您的內容
4. 儲存檔案

### 新增圖片

1. 將圖片放到 `static/img/` 資料夾
2. 在文檔中使用：`![說明](/img/圖片名稱.jpg)`

### 調整文檔順序

修改檔案開頭的 `sidebar_position` 數字（數字越小越靠上）

---

## 🆘 需要幫助？

- 📖 查看 [`文檔編輯指南.md`](./文檔編輯指南.md)
- 📋 查詢 [`Markdown快速參考.md`](./Markdown快速參考.md)
- 💬 聯絡技術支援

---

## 🔗 相關資源

- [Docusaurus 官方文檔](https://docusaurus.io/docs)
- [Markdown 語法指南](https://www.markdownguide.org/)
