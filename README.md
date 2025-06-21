# 💬 Chat AI – 本地運行的 DeepSeek 對話應用程式

**Chat AI** 是一款基於 React 打造的 AI 對話應用程式，串接 DeepSeek 語言模型，提供類 ChatGPT 的本地對話體驗。全程運行於瀏覽器端，資料儲存於使用者的 LocalStorage，不需註冊或登入，隨開即用、安全私密。

支援 Markdown 語法解析、數學公式渲染、代碼區塊高亮，並搭配 SweetAlert2 打造友善互動介面，適合學習、展示與日常使用。

## 🌐 線上體驗

👉 [點此進入 Demo](https://chat-steel-eta.vercel.app/)

> *請將上方網址替換為實際 Demo 網址*

## 🚀 技術架構

- **React 18 + React Router v7**：建構單頁應用介面  
- **Redux Toolkit**：狀態管理集中化  
- **Vite**：快速啟動與建構專案  
- **Master CSS**：輕量化原子 CSS 框架  
- **SweetAlert2 + sweetalert2-react-content**：使用者提示與互動視窗  
- **react-markdown + KaTeX + highlight.js**：支援 Markdown、數學公式與程式碼語法高亮  

## 🔐 本地資料管理與匯入匯出功能

Chat AI 為單機版應用程式，所有對話紀錄儲存在瀏覽器的 **LocalStorage** 中：

- ✅ **匯出功能**：可將當前對話歷史另存為 `.json` 檔案  
- ✅ **匯入功能**：可載入先前儲存的紀錄，或使用預設提供的範例檔案快速體驗  
- ✅ **無須帳號登入**：資料完全留在本機，不上傳雲端，確保隱私  

## 🧩 主要功能特色

- 💬 串接 DeepSeek AI 模型，回應即時自然  
- 📝 支援 Markdown 語法（含表格、超連結、粗體斜體等）  
- 📐 支援 LaTeX 數學公式與程式碼語法高亮  
- 💾 匯入/匯出對話歷史，支援範例快速載入  
- 🎨 使用 Master CSS 及 SweetAlert2 打造簡潔美觀的 UI  
- 📦 完全前端本機化，開啟即用、零後端依賴  

## 📚 主要依賴套件

| 套件 | 用途 |
|------|------|
| `react-markdown` | Markdown 渲染 |
| `remark-gfm` / `remark-math` / `rehype-katex` | GFM 表格、LaTeX 數學公式 |
| `highlight.js` | 程式碼區塊高亮 |
| `sweetalert2` | 彈窗互動 |
| `@master/css` | 原子化樣式控制 |
| `@reduxjs/toolkit` | 狀態集中管理 |

## 🪪 授權 License

本專案採用 [MIT License](https://opensource.org/licenses/MIT) 授權，歡迎自由使用、修改與學習參考。
