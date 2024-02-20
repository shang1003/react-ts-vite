import { useState } from "react";
import { Button, Radio, Space } from "antd";
import { Link } from "react-router-dom";
import { getUserList, UserDetailType, getUserExcel } from "~/client/user";
import { useFetch, useRefresh } from "~/hooks";
import { useFormModal } from "~/hooks/modal/FormModal";
import { createUser } from "~/client/user";
import { useTranslation } from "react-i18next";
import styles from "./index.module.less";
import { actionConfigs } from "./action";
import { BaseTable } from "~/components/base-table";
import { getTime, download } from "~/utils";
const TableCom: React.FC = () => {
  const handleClick = () => {
    download(getUserExcel, '用户信息')
  }
  const { t } = useTranslation();
  const roleOptions = [{ label: t('orgadm'), value: "orgadm" }, { label: t('teacher'), value: "teacher", }]
  const formItems = [
    {
      name: "name",
      label: t("username"),
      type: "input",
      colNum: 2,
      required: true,
    },
    {
      name: "password",
      label: t("password"),
      colNum: 2,
      type: "input-password",
      required: true,
    },
    {
      name: "role",
      label: t("role"),
      colNum: 2,
      type: "select",
      options: roleOptions,
    },
    {
      name: "gender",
      colNum: 2,
      label: t("gender"),
      type: "input",
      component: <Radio.Group>
        <Radio value="男">{t('male')}</Radio>
        <Radio value="女">{t('female')}</Radio>
      </Radio.Group>,
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
      name: "bank_account_number",
      colNum: 2,
      label: t("bank account"),
      type: "input",
    },
    {
      label: t("description"),
      colNum: 2,
      name: "description",
      type: "textarea",
    },
  ];
  const columns = [
    {
      title: t('index'),
      dataIndex: 'index',
    },
    {
      title: t("username"),
      dataIndex: "name",
      key: "name",
      render: (value: any, { id }: UserDetailType) => {
        return <Link to={`/user-management/user-list/detail/${id}`}>{value}</Link>;
      },
    },
    {
      title: t("role"),
      dataIndex: "role",
      render: (v: any) => t(v),
    },
    {
      title: t("create time"),
      dataIndex: "create_time",
      render: (v: any) => getTime(v),
    },

    {
      title: t("description"),
      dataIndex: "description",
    },
  ];
  const [refreshKey, refresh] = useRefresh();
  const [toggle, FormModal] = useFormModal({
    submit: (values) => createUser(values),
    formItems,
    height: 350,
    width: 800,
    refresh,
    formProps: {
      initialValues: { role: "teacher" },
      successTip: t("{{name}} success", { name: t("create") }),
    }
  });
  const [data, setData] = useState<UserDetailType[] | []>([]);
  const [loading, setLoading] = useState(true);
  useFetch(
    async () => {
      setLoading(true);
      return await getUserList();
    },
    ({ userList }) => {
      setData(userList.map((item, index) => ({ ...item, index: index + 1 })));
      setLoading(false);
    },
    [refreshKey]
  );

  return (
    <>
      <div className={styles["header"]}>
        <Space>
          <Button
            type="primary"
            onClick={() => toggle(true)}
          >
            {t("create")}
          </Button>
          <Button
            type="primary"

            onClick={handleClick}
          >
            {t("export")}
          </Button>
        </Space>
      </div>
      <FormModal />
      <BaseTable
        rowKey="id"
        columns={columns}
        data={data}
        scrollY='calc(100vh - 272px)'
        loading={loading}
        actions={actionConfigs}
        refresh={refresh}
      />
    </>
  );
};

export default TableCom;
