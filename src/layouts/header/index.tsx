import React, { useRef } from "react";
import { Layout, Button, Avatar, Select, Dropdown } from "antd";
import type { MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import imgurl from "@/assets/image/logo.png";
import { observer } from "mobx-react-lite";
import { useRootContext } from "@/App";
import { logout } from "@/client/login";
import "./index.less";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DownOutlined,
} from "@ant-design/icons";
const { Header } = Layout;
type props = {
  collapsed: boolean;
  setCollapsed: () => void;
};

export const HeaderWrapper: React.FC<props> = observer(
  ({ collapsed, setCollapsed }) => {
    const root = useRootContext();
    const { t, i18n } = useTranslation();
    const { setLang, username, lang } = root;
    const selectRef = useRef(null);
    const navigate = useNavigate();
    const items = [
      {
        label: t("log out"),
        key: "logout",
      },
    ];
    const changeLang = (lang: string) => {
      localStorage.setItem("lang", lang);
      setLang(lang); //改变antd 中英文切换
      i18n.changeLanguage(lang);
    };

    const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
      if (key === "logout") {
        logout().then(() => {
          navigate("/login");
        });
      }
    };
    console.log(lang, "zh");

    return (
      <Header>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed()}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />

        <div className="right-content">
          <Select
            ref={selectRef}
            key={lang}
            style={{ width: "100px" }}
            defaultValue={lang}
            options={[
              { label: t("Chinese"), value: "zh" },
              { label: t("English"), value: "en" },
            ]}
            onChange={(v) => {
              changeLang(v);
            }}
          />
          <Dropdown
            menu={{
              items,
              onClick: handleMenuClick,
            }}
          >
            <div className="avatar">
              <Avatar src={imgurl} size="large" />
              <span>
                {username} <DownOutlined />
              </span>
            </div>
          </Dropdown>
        </div>
      </Header>
    );
  }
);
