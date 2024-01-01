import React, { useRef } from "react";
import { Layout, Button, Avatar, Select, Dropdown } from "antd";
import { UserOutlined } from '@ant-design/icons';
import type { MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";
import { useRootContext } from "@/App";
import { logout } from "@/client/login";
import { upload } from "@/client/user";
import { useFormModal } from "~/hooks/modal/FormModal";
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
    const { setLang, userinfo, lang } = root;
    const selectRef = useRef(null);
    const navigate = useNavigate();
    const avatarUrl = root.userinfo.avatar && `/api/${root.userinfo.avatar}?timestamp=${Date.now()}`
    const formItems = [{
      type: 'upload',
      name: "avator",
      required: true,
      label: t('select avatar')
    }]
    const items = [
      {
        label: t("upload"),
        key: "upload",
      },
      {
        label: t("log out"),
        key: "logout",
      },
    ];
    const [toggle, FormModal] = useFormModal({
      submit: async (values) => {
        const data: any = await upload(root.userinfo.id, values.avator)
        root.setUserinfo({ ...root.userinfo, avatar: data.avatar })
        return data
      },
      title: t('upload avatar'),
      formItems: formItems,
      formProps: { successTip: t("{{name}} success", { name: t("upload avatar") }) },
    });
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
      } else if (key === "upload") {
        toggle(true)
      }
    };

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
              {<Avatar icon={<UserOutlined />} src={avatarUrl} size="large" />}
              <span>
                {userinfo.username} <DownOutlined />
              </span>
            </div>
          </Dropdown>
          <FormModal />
        </div>
      </Header>
    );
  }
);
