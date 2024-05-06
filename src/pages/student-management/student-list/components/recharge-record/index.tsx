import { useState } from "react";
import { useFetch, useRefresh } from "~/hooks";
import { renderLabel } from "~/utils";
import { createRechargeRecord, getRechargeRecord } from "~/client/student";
import { useTranslation } from "react-i18next";
import { BaseTable } from "~/components/base-table";
import { useFormModal } from "~/hooks/modal/FormModal";
import { Button, Space } from "antd";
import styles from "@/pages/student-management/student-list/index.module.less";

const App: React.FC<dynamic.ComponentProps> = (props) => {
  const { id, scrollY = "calc(100vh - 220px)" } = props;
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const [refreshKey, refresh] = useRefresh();
  const formItems: any = [
    {
      name: "recharge_date",
      label: t("recharge date"),
      type: "date-picker",
    },
    {
      name: "description",
      label: t("description"),
      type: "textarea",
    },
  ];
  const [toggle, FormModal] = useFormModal({
    submit: (values: any) => {
      return createRechargeRecord({ student_id: id, ...values });
    },
    formItems,
    refresh,
    formProps: {
      initialValues: { role: "teacher" },
      successTip: t("{{name}} success", { name: t("create") }),
    },
  });

  useFetch(
    () => {
      setLoading(true);
      return getRechargeRecord({ student_id: id });
    },
    ({ data }) => {
      setLoading(false);
      setData(data.map((item, index) => ({ ...item, index: index + 1 })));
    },
    [refreshKey]
  );

  const columns = [
    {
      title: t("index"),
      dataIndex: "index",
      width: 70,
      fixed: "left",
    },
    {
      title: t("chinese name"),
      dataIndex: "chinese_name",
      render: (_: any, record: any) => renderLabel(record.student?.chinese_name),
      width: 180,
    },
    {
      title: t("english name"),
      dataIndex: "egnlish_name",
      render: (_: any, record: any) => renderLabel(record.student?.english_name),
      width: 180,
    },
    {
      title: t("recharge date"),
      dataIndex: "recharge_date",
      width: 180,
    },
    {
      title: t("description"),
      dataIndex: "description",
      width: 180,
      ellipsis: true,
    },
    {
      title: t("operation date"),
      dataIndex: "created_time",
      width: 180,
    },
  ];
  return (
    <>
      <div className={styles["header"]}>
        <Space>
          <Button type='primary' onClick={() => toggle(true)}>
            {t("create")}
          </Button>
        </Space>
      </div>
      <FormModal />
      <BaseTable
        rowKey='id'
        hasItemActions={false}
        columns={columns}
        data={data}
        scrollY={scrollY}
        loading={loading}
      />
    </>
  );
};

export default App;
