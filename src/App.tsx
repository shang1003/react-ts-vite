import { useRoutes, useNavigate, useLocation } from "react-router-dom";
import {} from "mobx-react-lite";
import { REDIRECT__HOME_URL } from "@/utils/constants";
import { useEffect, createContext, useContext } from "react";
import { router } from "./router";
import { ConfigProvider } from "antd";
import enUS from "antd/locale/en_US";
import zhCN from "antd/locale/zh_CN";
import root from "@/store/root";
import { observer } from "mobx-react-lite";
import { getUserInfo } from "@/client/login";
import "@/locales/index";
import "@/assets/index.less";
const RootContext = createContext(root);
export const useRootContext = () => useContext(RootContext);
function App() {
  const routing = useRoutes(router);
  const { pathname } = useLocation();

  const navigate = useNavigate();
  const isLogin = async () => {
    try {
      //是否过期 username为undfined 表示登录过期
      const { username } = await getUserInfo();
      //过期且url不为login
      if (!username && pathname !== "/login") {
        navigate("/login");
      } else {
        if (pathname === "/") navigate(REDIRECT__HOME_URL);
        root.setUsername(username);
      }
    } catch (error) {
      console.log("error:", error);
      navigate("/login");
    }
  };
  useEffect(() => {
    isLogin();
  }, []);

  return (
    <ConfigProvider locale={root.lang === "en" ? enUS : zhCN}>
      <RootContext.Provider value={root}>{routing}</RootContext.Provider>
    </ConfigProvider>
  );
}

export default observer(App);
