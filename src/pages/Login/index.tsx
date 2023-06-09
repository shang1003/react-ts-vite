import React from "react";
import styles from "./index.module.less";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { login } from "@/client/login";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { DynamicForm } from "@/components/dynamic-form";
import { useRootContext } from "@/App";
import { REDIRECT__HOME_URL } from "@/utils/constants";
import { createUser } from "~/client/user";
import { useFormModal } from "~/hooks/modal/FormModal";
import { Button } from "antd";

export const Login = () => {
  const root = useRootContext();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const registerFormItems = [
    {
      name: "name",
      label: t("username"),
      type: "input",
      required: true,
    },
    {
      name: "password",
      label: t("password"),
      type: "input-password",
      required: true,
    },
    {
      label: t("age"),
      name: "age",
      type: "input-number",
      required: true,
      min: 0,
    },
    {
      label: t("address"),
      name: "address",
      type: "input",
      required: true,
    },
    {
      label: t("description"),
      name: "description",
      type: "textarea",
    },
  ];
  const [toggle, FormModal] = useFormModal({
    submit: (values) => createUser(values),
    formItems: registerFormItems,
    formProps: { successTip: t("{{name}} success", { name: t("register") }) },
  });
  const onSubmit = (value: any) => {
    return login(value).then((data) => {
      root.setUsername(data.username);
      navigate(REDIRECT__HOME_URL);
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
        <Button
          type="primary"
          className={styles["register"]}
          onClick={() => toggle(true)}
        >
          {t("register")}
        </Button>
      </div>
      <FormModal />
    </>
  );
};
