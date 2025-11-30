# Netlify Submodule 問題解決方案

## 問題說明

Netlify 在準備 repository 階段會檢查 Git submodules，但 repository 中有 `src/Projects/DGHM/trackingSystem` 被標記為 submodule，導致建置失敗。

## 解決方案

### 在 Netlify Dashboard 中設定

由於 submodule 檢查發生在建置命令執行之前，需要在 Netlify Dashboard 中設定：

#### 方法 1：在 Site Settings 中禁用 Submodule 檢查

1. 進入 Netlify Dashboard
2. 選擇您的網站
3. 進入 **Site settings** → **Build & deploy** → **Build settings**
4. 找到 **"Submodules"** 或 **"Git submodules"** 選項
5. 將其設為 **Disabled** 或取消勾選

#### 方法 2：使用環境變數（如果方法 1 不可用）

在 **Site settings** → **Build & deploy** → **Environment variables** 中添加：

- **Key:** `NETLIFY_SKIP_SUBMODULES`
- **Value:** `true`

或者：

- **Key:** `GIT_LFS_SKIP_SMUDGE`
- **Value:** `1`

#### 方法 3：聯繫 Netlify 支援

如果上述方法都不可用，可以：
1. 在 Netlify Dashboard 中提交支援請求
2. 說明您只需要部署 `tm-docs`，不需要 submodules
3. 請他們協助禁用 submodule 檢查

## 注意事項

- 這個問題不影響 `tm-docs` 的建置，只是 Netlify 的準備階段檢查
- 一旦禁用 submodule 檢查，建置應該可以正常進行
- `tm-docs` 本身不依賴任何 submodules

## 驗證

設定完成後，重新觸發部署，應該可以成功建置。

