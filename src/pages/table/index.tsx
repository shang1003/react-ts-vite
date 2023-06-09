import { useState } from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { getUserList, UserDetailType } from "~/client/user";
import { useFetch, useRefresh } from "~/hooks";
import { useFormModal } from "~/hooks/modal/FormModal";
import { createUser } from "~/client/user";
import { useTranslation } from "react-i18next";
import styles from "./index.module.less";
import { actionConfigs } from "./action";
import { BaseTable } from "~/components/base-table";
import { getTime } from "~/utils";
const TableCom: React.FC = () => {
  const { t } = useTranslation();
  const formItems = [
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
  const columns = [
    {
      title: t("username"),
      dataIndex: "name",
      key: "name",
      render: (value: any, { id }: UserDetailType) => {
        return <Link to={`/table/case/detail/${id}`}>{value}</Link>;
      },
    },
    {
      title: t("age"),
      dataIndex: "age",
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
    refresh,
  });
  const [data, setData] = useState<UserDetailType[] | []>([]);
  const [loading, setLoading] = useState(true);
  useFetch(
    async () => {
      setLoading(true);
      return await getUserList();
    },
    ({ userList }) => {
      setData(userList);
      setLoading(false);
    },
    [refreshKey]
  );

  return (
    <>
      <div className={styles["header"]}>
        <Button
          type="primary"
          style={{ marginBottom: "10px" }}
          onClick={() => toggle(true)}
        >
          {t("create")}
        </Button>
      </div>
      <FormModal />
      <BaseTable
        rowKey="id"
        columns={columns}
        data={data}
        scrollY={300}
        loading={loading}
        actions={actionConfigs}
        refresh={refresh}
        otherProps={{ pagination: { pageSize: 5 } }}
      />
    </>
  );
};

export default TableCom;
