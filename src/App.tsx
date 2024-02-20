import { useRoutes, useNavigate, useLocation } from "react-router-dom";
import { REDIRECT__HOME_URL, REDIRECT__TEACBER_URL } from "@/utils/constants";
import { useEffect, createContext, useContext } from "react";
import { router, teacherRouter } from "./router";
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
  const isOrgadm = root.userinfo.role == "orgadm"
  const roleRouter = isOrgadm ? router : teacherRouter;
  const routing = useRoutes(roleRouter);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isLogin = async () => {
    if (pathname == "/login") {
      return
    }
    try {
      //是否过期 username为undfined 表示登录过期
      const data = await getUserInfo();
      //过期且url不为login
      if (!data.username && pathname !== "/login") {
        navigate("/login");
      } else {
        if (pathname === "/") navigate(data.role == "orgadm" && REDIRECT__HOME_URL || REDIRECT__TEACBER_URL);
        root.setUserinfo(data);
      }
    } catch (error: any) {
      if (error.response.status == 401) {
        navigate("/login");
      }
      if (pathname === "/") navigate(REDIRECT__HOME_URL);
      console.log("error:", error);

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
