import { defineConfig } from "vite"; //defineConfig 配置项可以智能提示
import react from "@vitejs/plugin-react"; //提供 React 项目编译和热更新的功能
import path from "path";
import checker from "vite-plugin-checker"; //检查typescript语法
import legacy from "@vitejs/plugin-legacy"; //兼容浏览器
console.log(path.resolve(__dirname, "src"), "--------");

export default defineConfig({
  server: { host: "localhost", port: 3000, proxy: {
        '/api': {
      target: 'http://localhost:5000',
      changeOrigin: true,
      rewrite: path => path.replace(/^\/api/, '')
    }
  } },

  plugins: [
    react(),
    legacy({
      targets: ["defaults", "not IE 11"],
    }),
    checker({ typescript: true }), //检查错误
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), //配置别名
    },
    extensions: [".js", ".ts", ".jsx", ".tsx", ".json"], //扩展名
  },
});
