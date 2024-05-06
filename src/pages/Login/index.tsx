import React from "react";
import styles from "./index.module.less";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { login } from "@/client/login";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { DynamicForm } from "@/components/dynamic-form";
import { useRootContext } from "@/App";
import { OTHER_URL, REDIRECT__TEACBER_URL } from "@/utils/constants";
export const Login = () => {
  const root = useRootContext();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const onSubmit = (value: any) => {
    return login(value).then(({ data }) => {
      localStorage.setItem("token", data.token);
      root.setUserinfo(data);
      const path = data.role == "teacher" ? REDIRECT__TEACBER_URL : OTHER_URL;
      console.log(path, "0000");

      navigate(path);
    });
  };

  const formItems = [
    {
      name: "username",
      type: "input",
      placeholder: t("username"),
      prefix: <UserOutlined />,
      required: true,
    },
    {
      name: "password",
      type: "input-password",
      placeholder: t("password"),
      prefix: <LockOutlined />,
      required: true,
    },
  ];

  const formProps = {
    wrapperCol: { span: 24 },
    successTip: t("login success"),
    failTip: t("login fail"),
    onSubmit,
  };

  return (
    <>
      <div className={styles["wrapper"]}>
        <div className={styles["login"]}>
          <p className={styles["login-title"]}>{t("welcome to you")}</p>
          <DynamicForm formProps={formProps} formItems={formItems} />
        </div>
      </div>
    </>
  );
};
