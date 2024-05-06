import { useState } from "react";
import { useFetch, useRefresh } from "~/hooks";
import { renderLabel, getClassCategory } from "~/utils";
import { getStudentList } from "~/client/student";
import { createSendTextbookRecords, getSendTextbookRecords } from "~/client/send-textbook-records";

import { useTranslation } from "react-i18next";
import { BaseTable } from "~/components/base-table";
import { useFormModal } from "~/hooks/modal/FormModal";
import { Button, Space, Select } from "antd";
import styles from "@/pages/student-management/student-list/index.module.less";
import root from "~/store/root";
import { actionConfigs } from "./action";
import { validateNumber } from "~/utils";
import { useSearchParams } from "react-router-dom";
const App: React.FC<dynamic.ComponentProps> = (props) => {
  const { scrollY = "calc(100vh - 270px)" } = props;
  const [data, setData] = useState<any>([]);
  const [studentList, setStudentList] = useState<{ label: string; value: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const [refreshKey, refresh] = useRefresh();
  const classCategory = getClassCategory(t);
  let [searchParams] = useSearchParams();
  const [searchData, setSearchData] = useState<any>(searchParams.get("student_id"));

  const formItems: any = [
    {
      name: "operation_name",
      label: t("operation personnel"),
      type: "input",
      colNum: 2,
      disabled: true,
      required: true,
    },
    {
      name: "student_id",
      label: t("bind student"),
      type: "select",
      required: true,
      colNum: 2,
      options: studentList,
    },

    {
      name: "name",
      label: t("textbook"),
      required: true,
      colNum: 2,
      type: "input",
    },
    {
      name: "send_name",
      required: true,
      colNum: 2,
      label: t("send name"),
      type: "input",
    },
    {
      name: "course_category",
      label: t("course category"),
      type: "select",
      required: true,
      colNum: 2,
      options: classCategory,
    },
    {
      name: "price",
      label: t("textbook price"),
      required: true,
      colNum: 2,
      validate: (v: string) => validateNumber(v, t),
      type: "input",
    },
    {
      name: "address",
      required: true,
      colNum: 2,
      label: t("address"),
      type: "input",
    },
  ];
  const [toggle, FormModal, formRef] = useFormModal({
    height: 250,
    width: 700,
    submit: (values: any) => {
      return createSendTextbookRecords({ ...values });
    },
    formItems,
    refresh,
    formProps: {
      initialValues: {
        operation_name: root.userinfo.english_name,
      },
      onValuesChange: (_: any, { course_unit_price = 0, total_hours = 0 }: any) => {
        formRef?.current.setFieldsValue({
          total_amount: course_unit_price * total_hours,
        });
      },
      successTip: t("{{name}} success", { name: t("create") }),
    },
  });

  useFetch(
    () => {
      setLoading(true);
      return getSendTextbookRecords({ student_id: searchData });
    },
    ({ data }) => {
      setLoading(false);
      setData(data.map((item, index) => ({ ...item, index: index + 1 })));
    },
    [refreshKey, searchData]
  );
  useFetch(
    () => {
      setLoading(true);
      return getStudentList();
    },
    ({ data }) => {
      setLoading(false);
      setStudentList(
        data.map(({ english_name, id }) => ({
          label: english_name,
          value: id + "",
        }))
      );
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
      title: t("operation personnel"),
      dataIndex: "operation_name",
      width: 180,
      render: renderLabel,
    },
    {
      title: t("operation time"),
      dataIndex: "created_time",
      width: 180,
    },
    {
      title: t("send name"),
      dataIndex: "send_name",
      width: 180,
    },
    {
      title: t("phone"),
      dataIndex: "phone",
      width: 120,
      render: (...res: any[]) => renderLabel(res[1]?.student?.phone),
    },
    {
      title: t("chinese name"),
      dataIndex: "chinese_name",
      render: (...res: any[]) => renderLabel(res[1]?.student?.chinese_name),
      width: 120,
    },
    {
      title: t("english name"),
      dataIndex: "english_name",
      render: (...res: any[]) => renderLabel(res[1]?.student?.english_name),
      width: 120,
    },

    {
      title: t("course category"),
      dataIndex: "course_category",
      render: (v: any) => classCategory.find((item) => item.value == v)?.label,

      width: 170,
    },

    {
      title: t("textbook"),
      dataIndex: "name",
      render: renderLabel,
      ellipsis: true,
      width: 150,
    },
    {
      title: t("textbook price"),
      dataIndex: "price",
      render: renderLabel,
      ellipsis: true,
      width: 150,
    },
    {
      title: t("address"),
      dataIndex: "address",
      render: renderLabel,
      ellipsis: true,
      width: 150,
    },
  ];
  return (
    <>
      <div className={styles["header"]}>
        <Space>
          <Select
            style={{ width: 160 }}
            allowClear
            showSearch
            defaultValue={searchData}
            filterOption={(input: string, option: any) => (option?.label ?? "").includes(input)}
            onClear={() => setSearchData("")}
            onChange={(v) => setSearchData(v)}
            placeholder={`${t("please select")} ${t("student")}`}
            options={studentList}
          />
          <Button type='primary' onClick={() => toggle(true)}>
            {t("create")}
          </Button>
        </Space>
      </div>
      <FormModal />
      <BaseTable
        rowKey='id'
        actions={actionConfigs}
        columns={columns}
        data={data}
        actionsWidth={100}
        scrollY={scrollY}
        refresh={refresh}
        loading={loading}
      />
    </>
  );
};

export default App;
