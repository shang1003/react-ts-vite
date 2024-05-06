import { defineConfig } from "vite"; //defineConfig 配置项可以智能提示
import react from "@vitejs/plugin-react"; //提供 React 项目编译和热更新的功能
import path from "path";
import checker from "vite-plugin-checker"; //检查typescript语法
import legacy from "@vitejs/plugin-legacy"; //兼容浏览器

export default defineConfig({
  publicDir: "public", // 可以直接访问public中资源
  server: {
    host: "127.0.0.1",
    port: 8088,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:9000",
        changeOrigin: true,
      },
    },
  },

  plugins: [
    react(),
    // legacy({
    //   targets: ["defaults", "not IE 11"],
    //   modernPolyfills: true
    // }),
    checker({ typescript: true }), //检查错误
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), //配置别名
      "~": path.resolve(__dirname, "src"), //配置别名
    },
    extensions: [".js", ".ts", ".jsx", ".tsx", ".json"], //扩展名
  },

  build: {},
});
