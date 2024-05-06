import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import type { MenuProps } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useRootContext } from "@/App";
import { getMenu } from "./menu";
import { useFetch } from "~/hooks";
import logo from "@/assets/logo_1.png";
import "./index.less";
const { Sider } = Layout;
type props = {
  collapsed: boolean;
};

export const SideBar: React.FC<props> = function ({ collapsed }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const root = useRootContext();
  const [menu, setMenu] = useState<MenuProps['items']>([])
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  useEffect(() => {
    let selectedKey = "";
    let openkey = "";
    const path = location.pathname.split("?")[0];
    const pathArr = path.slice(1).split("/");
    if (pathArr.length >= 2) {
      selectedKey = pathArr.slice(0, 2).join("/");
      openkey = pathArr[0];
    } else {
      selectedKey = pathArr[0];
      openkey = pathArr[0];
    }
    setOpenKeys([openkey]);
    setSelectedKeys([selectedKey]);

  }, [location.pathname]);
  useFetch(
    () => getMenu(t, root.userinfo.role),
    (res) => {
      setMenu(res)
    },
    [root.userinfo.role, root.lang, root.refreshKey]
  );

  const [open, setOpenKeys] = useState<string[]>();
  const onClick: MenuProps["onClick"] = ({ key }) => {
    if (key == "key1") {
      window.open('https://console.51menke.com/home.html#/homeResource');

      return
    }
    if (key == "key2") {
      window.open('https://www.51menke.com');

      return
    }
    navigate(key);
  };
  const handleOpenChange = (openKeys: string[]) => {
    setOpenKeys(openKeys);
  };
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={225}
      className="sidebar"
    >
      <div className="sider-menu-logo" style={{ fontSize: root.lang == 'zh' ? 20 : 11 }}>
        {collapsed ? <img src={logo} /> : t("system name")}
      </div>

      <Menu
        theme="dark"
        mode="inline"
        onClick={onClick}
        items={menu}
        openKeys={open}
        selectedKeys={selectedKeys}
        onOpenChange={handleOpenChange}
      />
    </Sider>
  );
};
