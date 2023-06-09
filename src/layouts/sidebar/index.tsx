import React, { useState, useEffect } from "react";
import CONFIG from "@/config";
import { Layout, Menu } from "antd";
import type { MenuProps } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { menu } from "./menu";
import "./index.less";
import logo from '@/assets/image/logo.png'
const { Sider } = Layout;
type props = {
  collapsed: boolean;
};

export const SideBar: React.FC<props> = function ({ collapsed }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  useEffect(() => {
  const path = location.pathname.split("?")[0];
  const openkey = path.split("/")[1];
  const selectedKey = path.slice(1)
    setOpenKeys([openkey]);
    setSelectedKeys([selectedKey]);
  }, [location.pathname]);

  const [open, setOpenKeys] = useState<string[]>();
  const onClick: MenuProps["onClick"] = ({ key }) => {
    navigate(key);
  };
  const handleOpenChange = (openKeys: string[]) => {
    console.log(openKeys, "openKeys");
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
        {collapsed ? (
          <img src={logo}  />
        ) : (
          CONFIG.title
        )}
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
