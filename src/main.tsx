import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "dayjs/locale/zh-cn";
// import "@/mock/data"; // 引入 Mock,用于测试
import { BrowserRouter } from "react-router-dom";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    {/*
      StrictMode作用：
        严格模式在开发中启用以下检查：
        你的组件将 重新渲染额外的时间 查找由不纯渲染引起的错误。
        你的组件将 重新运行副作用额外的时间 查找因缺少副作用清理而导致的错误。
        你的组件将 检查已弃用 API 的使用情况。
        所有这些检查仅用于开发，不会影响生产构建。
 */}
    <StrictMode>
      <App />
    </StrictMode>
  </BrowserRouter>
);
