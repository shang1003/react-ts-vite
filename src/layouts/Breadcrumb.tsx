import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation, Link } from "react-router-dom";
import { Breadcrumb } from "antd";

function App() {
  const location = useLocation();
  const { t } = useTranslation();
  const pathMap: any = {
    three: "3D",
    case: t("case"),
    "user-list": t("user list"),
    g6: "G6",
    "dynamic-form": t("dynamic form"),
    "user-management": t("user management"),
    "student-management": t("student management"),
    "student-list": t("student list"),
    "teacher-list": t("teacher list"),
    "teacher-management": t("teacher management"),
    "course-table": t("course table"),
    salary: t("teacher salary"),
    "class-records": t("class records"),
    "course-management": t("course management"),
    "class-record": t("class record"),
    detail: t("detail"),
    "salary-manage": t("salary manage"),
    home: t("home"),
    "sell-management": t("sell management"),
    "sell-list": t("sell list"),
    "network-disk": t("network disk"),
    "recharge-record": t("recharge record"),
    "teacher-salary-list": t("teacher salary"),
    "send-textbook-records": t("send textbook records"),
  };
  const pathSnippets = location.pathname
    .split("/")
    .filter((i) => i)
    .slice(0, 3);
  console.log(pathSnippets, location.pathname, "==");

  const items = pathSnippets.map((snippet, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;

    return { path: url, title: pathMap[snippet] || snippet };
  });

  function itemRender(item: any, _: any, items: any) {
    const last = items.indexOf(item) === items.length - 1 || items.indexOf(item) === 0;
    return last ? (
      <span>{item.title}</span>
    ) : (
      <Link style={{ color: "#0068ff" }} to={item.path}>
        {item.title}
      </Link>
    );
  }
  return <Breadcrumb style={{ padding: "10px" }} itemRender={itemRender} items={items} />;
}

export default App;
