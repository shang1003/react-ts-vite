import React, { useRef, useState } from "react";
import { Layout, Button, Avatar, Select, Dropdown } from "antd";
import { UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";
import { useRootContext } from "@/App";
import { logout } from "@/client/login";
import { upload, changePassword } from "@/client/user";
import { useFormModal } from "~/hooks/modal/FormModal";
import "./index.less";
import defalutAvatar from "@/assets/image/default.png";
import { MenuFoldOutlined, MenuUnfoldOutlined, DownOutlined } from "@ant-design/icons";
const { Header } = Layout;
type props = {
  collapsed: boolean;
  setCollapsed: () => void;
};

export const HeaderWrapper: React.FC<props> = observer(({ collapsed, setCollapsed }) => {
  const root = useRootContext();
  const { t, i18n } = useTranslation();
  const { setLang, userinfo, lang } = root;
  const selectRef = useRef(null);
  const navigate = useNavigate();
  const avatarUrl =
    (root.userinfo.avatar &&
      `/api/upload/avatar/${root.userinfo.avatar}?timestamp=${Date.now()}`) ||
    defalutAvatar;
  const avatarFormItems = [
    {
      type: "upload",
      name: "avator",
      required: true,
      label: t("select avatar"),
    },
  ];
  const passwordFormItems = [
    {
      type: "input-password",
      name: "oldPassword",
      required: true,
      label: t("old password"),
    },
    {
      type: "input-password",
      name: "newPassword",
      required: true,
      label: t("new password"),
    },
    {
      type: "input-password",
      name: "confirmPassword",
      required: true,
      dependencies: ["newPassword"],
      rules: [
        {
          required: true,
        },
        ({ getFieldValue }: any) => ({
          validator(_: any, value: any) {
            if (!value || getFieldValue("newPassword") === value) {
              return Promise.resolve();
            }
            return Promise.reject(new Error(t("the two passwords are different")));
          },
        }),
      ],
      label: t("confirm password"),
    },
  ];
  const items = [
    {
      label: t("upload avatar"),
      key: "upload",
    },
    {
      label: t("change password"),
      key: "changePassword",
    },
    {
      label: t("log out"),
      key: "logout",
    },
  ];

  const [modalData, setModalData] = useState<any>({});
  const [toggle, FormModal] = useFormModal({
    ...modalData,
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
        localStorage.removeItem("token");
      });
    } else if (key === "upload") {
      setModalData({
        submit: async (values: any) => {
          const { data }: any = await upload(root.userinfo.id, values.avator);
          root.setUserinfo({ ...root.userinfo, avatar: data.filename });
          return data;
        },
        title: t("upload avatar"),
        formItems: avatarFormItems,
        formProps: { successTip: t("{{name}} success", { name: t("upload avatar") }) },
      });
      toggle(true);
    } else if (key === "changePassword") {
      setModalData({
        submit: async (values: any) => {
          const data: any = await changePassword(root.userinfo.id, values);
          if (data && data?.code == 200) {
            logout().then(() => {
              navigate("/login");
            });
          }
          return data;
        },
        title: t("change password"),
        formItems: passwordFormItems,
        formProps: { successTip: t("{{name}} success", { name: t("change password") }) },
      });
      toggle(true);
    }
  };

  return (
    <Header>
      <Button
        type='text'
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed()}
        style={{
          fontSize: "16px",
          width: 64,
          height: 64,
        }}
      />

      <div className='right-content'>
        <Select
          ref={selectRef}
          key={lang}
          style={{ width: "150px" }}
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
          <div className='avatar'>
            {<Avatar icon={<UserOutlined />} src={avatarUrl} size='large' />}
            <div className='name'>{userinfo.english_name}</div>
            <DownOutlined width={10} />
          </div>
        </Dropdown>
        <FormModal />
      </div>
    </Header>
  );
});
