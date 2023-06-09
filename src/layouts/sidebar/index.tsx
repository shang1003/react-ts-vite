import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import type { MenuProps } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getMenu } from "./menu";
import logo from "@/assets/image/logo.png";
import "./index.less";
const { Sider } = Layout;
type props = {
  collapsed: boolean;
};

export const SideBar: React.FC<props> = function ({ collapsed }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
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
  const [open, setOpenKeys] = useState<string[]>();
  const onClick: MenuProps["onClick"] = ({ key }) => {
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
      width={190}
      className="sidebar"
    >
      <div className="sider-menu-logo">
        {collapsed ? <img src={logo} /> : t("system name")}
      </div>

      <Menu
        theme="dark"
        mode="inline"
        onClick={onClick}
        items={getMenu(t)}
        openKeys={open}
        selectedKeys={selectedKeys}
        onOpenChange={handleOpenChange}
      />
    </Sider>
  );
};
