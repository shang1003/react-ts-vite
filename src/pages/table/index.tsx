import { useState } from "react";
import { Button, Radio, Space } from "antd";
import { Link } from "react-router-dom";
import { getUserList, UserDetailType } from "~/client/user";
import { useFetch, useRefresh } from "~/hooks";
import { createUser } from "~/client/user";
import { useTranslation } from "react-i18next";
import styles from "./index.module.less";
import { actionConfigs } from "./action";
import { BaseTable } from "~/components/base-table";
import { getTime } from "~/utils";
import { FormModal } from "@/components/modal/Modal";
import root from "~/store/root";
const TableCom: React.FC = () => {
  const [isShow, toggle] = useState(false);
  const isAdmin = root.userinfo.role == "orgadm";
  const { t } = useTranslation();
  const nameMap: any = {
    teacher: t("teacher"),
    orgadm: t("orgadm"),
    clerk: t("clerk"),
    course_consultant: t("course consultant"),
    learning_consultant: t("learning consultant"),
  };
  let roleOptions = [
    { label: t("teacher"), value: "teacher" },
    { label: t("clerk"), value: "clerk" },
    { label: t("course consultant"), value: "course_consultant" },
    { label: t("learning consultant"), value: "learning_consultant" },
  ];
  if (isAdmin) {
    roleOptions.unshift({ label: t("orgadm"), value: "orgadm" });
  }
  const formItems = [
    {
      name: "role",
      label: t("role"),
      colNum: 2,
      type: "select",
      options: roleOptions,
    },
    {
      name: "name",
      label: t("username"),
      type: "input",
      colNum: 2,
      required: true,
    },
    {
      name: "chinese_name",
      label: t("chinese name"),
      type: "input",
      required: true,
      colNum: 2,
    },
    {
      name: "english_name",
      label: t("english name"),
      type: "input",
      required: true,
      colNum: 2,
    },

    {
      name: "password",
      label: t("password"),
      colNum: 2,
      type: "input-password",
      required: true,
    },

    {
      name: "gender",
      colNum: 2,
      label: t("gender"),
      type: "input",
      required: true,
      component: (
        <Radio.Group>
          <Radio value='male'>{t("male")}</Radio>
          <Radio value='female'>{t("female")}</Radio>
        </Radio.Group>
      ),
    },
    {
      name: "phone",
      label: t("phone"),
      colNum: 2,
      type: "input",
    },
    {
      name: "id_card_number",
      colNum: 2,
      label: t("id card"),
      validateTrigger: "onBlur",
      type: "input",
    },
    {
      name: "deposit_bank",
      label: t("deposit bank"),
      type: "input",
      colNum: 2,
    },
    {
      name: "bank_account_number",
      colNum: 2,
      label: t("bank account"),
      type: "input",
    },
    {
      name: "employment_date",
      colNum: 2,
      label: t("employment date"),
      format: "YYYY-MM-DD",
      showTime: false,
      required: true,
      type: "date-picker",
    },
  ];
  const columns = [
    {
      title: t("index"),
      dataIndex: "index",
      width: 70,
    },
    {
      title: t("username"),
      dataIndex: "name",
      width: 150,
      ellipsis: true,
      key: "name",
      render: (value: any, { id }: UserDetailType) => {
        return <Link to={`/user-management/user-list/detail/${id}`}>{value}</Link>;
      },
    },
    {
      title: t("chinese name"),
      dataIndex: "chinese_name",
      width: 120,
    },
    {
      title: t("english name"),
      dataIndex: "english_name",
      width: 120,
    },
    {
      title: t("role"),
      width: 110,
      dataIndex: "role",
      render: (v: any) => nameMap[v],
    },
    {
      title: t("create time"),
      dataIndex: "created_time",
      width: 200,
      render: (v: any) => getTime(v),
    },
  ];
  const [refreshKey, refresh] = useRefresh();
  const [data, setData] = useState<UserDetailType[] | []>([]);
  const [loading, setLoading] = useState(true);
  useFetch(
    async () => {
      setLoading(true);
      return await getUserList();
    },
    ({ userList }) => {
      setData(userList.map((item, index) => ({ ...item, index: index + 1 })));
      root.refresh();
      setLoading(false);
    },
    [refreshKey]
  );

  return (
    <>
      <div className={styles["header"]}>
        <Space>
          <Button type='primary' onClick={() => toggle(true)}>
            {t("create")}
          </Button>
        </Space>
      </div>
      {isShow && (
        <FormModal
          {...{
            submit: (values) => {
              console.log(values, "values");

              return createUser(values);
            },
            formItems,
            height: 350,
            width: 800,
            refresh,
            toggle,
            formProps: {
              initialValues: { role: "teacher" },
              successTip: t("{{name}} success", { name: t("create") }),
            },
          }}
        />
      )}
      <BaseTable
        rowKey='id'
        columns={columns}
        data={data}
        scrollY='calc(100vh - 230px)'
        loading={loading}
        actions={actionConfigs}
        refresh={refresh}
      />
    </>
  );
};

export default TableCom;
