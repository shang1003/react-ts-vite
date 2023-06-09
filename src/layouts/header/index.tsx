import React from "react";
import { Layout, Button } from "antd";
import './index.less'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
const { Header } = Layout;
type props ={
  collapsed: boolean;
  setCollapsed: () => void;
}

export const HeaderWrapper: React.FC<props> = function ({ collapsed, setCollapsed }) {
  return (
    <Header style={{ padding: 0 }}>
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={()=> setCollapsed()}
        style={{
          fontSize: "16px",
          width: 64,
          height: 64,
        }}
      />
    </Header>
  );
};
