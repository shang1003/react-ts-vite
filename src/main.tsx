import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import 'dayjs/locale/zh-cn';
// import "@/mock/data"; // 引入 Mock,用于测试
import { BrowserRouter } from "react-router-dom";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
