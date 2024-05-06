import { useRoutes, useNavigate, useLocation } from "react-router-dom";
import { REDIRECT__HOME_URL, REDIRECT__TEACBER_URL, OTHER_URL } from "@/utils/constants";
import { useEffect, createContext, useContext } from "react";
import { router, teacherRouter, otherRouter } from "./router";
// import { StyleProvider } from '@ant-design/cssinjs';
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
  const routerMap: any = {
    orgadm: router,
    teacher: teacherRouter,
    clerk: otherRouter,
    course_consultant: otherRouter,
    learning_consultant: otherRouter

  }
  const roleRouter = routerMap[root.userinfo.role];
  const routing = useRoutes(roleRouter);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isLogin = async () => {
    if (pathname == "/login") {
      return
    }
    try {
      //是否过期 username为undfined 表示登录过期
      const { data } = await getUserInfo();
      //过期且url不为login
      if (!data?.username && pathname !== "/login") {
        navigate("/login");
      } else {
        root.setUserinfo(data);
        if (pathname === "/") navigate(root.isTeacherRole && REDIRECT__TEACBER_URL || root.isOrgadmRole && REDIRECT__HOME_URL || root.isOtherRole && OTHER_URL || '');

      }
    } catch (error: any) {
      navigate("/login");
    }
  };
  useEffect(() => {
    isLogin();
  }, []);

  return (
    <ConfigProvider locale={root.lang === "en" ? enUS : zhCN}>
      {/* antd降级 */}
      {/* <StyleProvider hashPriority="high"> */}
      <RootContext.Provider value={root}>{routing}</RootContext.Provider>
      {/* </StyleProvider> */}

    </ConfigProvider>
  );
}

export default observer(App);
