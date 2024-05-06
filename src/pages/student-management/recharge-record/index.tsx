import { useState } from "react";
import { useFetch, useRefresh } from "~/hooks";
import { renderLabel, validateNumber, validateInNumber, getClassCategory } from "~/utils";
import { createRechargeRecord, getRechargeRecord, getStudentList } from "~/client/student";
import { useTranslation } from "react-i18next";
import { BaseTable } from "~/components/base-table";
import { useFormModal } from "~/hooks/modal/FormModal";
import { Button, Space, Tag, Select } from "antd";
import styles from "@/pages/student-management/student-list/index.module.less";
import root from "~/store/root";
import { actionConfigs } from "./action";
import { useSearchParams } from "react-router-dom";
const App: React.FC<dynamic.ComponentProps> = (props) => {
  const { id, scrollY = "calc(100vh - 270px)" } = props;
  const [data, setData] = useState<any>([]);
  const [studentList, setStudentList] = useState<{ label: string; value: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const [refreshKey, refresh] = useRefresh();
  const classCategory = getClassCategory(t);
  let [searchParams] = useSearchParams();
  const [searchData, setSearchData] = useState<any>(searchParams.get("student_id"));
  const noteMap: any = {
    1: <Tag color='red'>{t("experience course")}</Tag>,
    2: <Tag color='green'>{t("formal course")}</Tag>,
  };
  const formItems: any = [
    {
      name: "operation_name",
      label: t("operation personnel"),
      type: "input",
      colNum: 2,
      required: true,
    },
    {
      name: "student_id",
      label: t("bind"),
      type: "select",
      colNum: 2,
      required: true,
      options: studentList,
    },
    {
      name: "recharge_date",
      label: t("recharge date"),
      colNum: 2,
      required: true,
      type: "date-picker",
    },
    {
      name: "course_category",
      label: t("course category"),
      type: "select",
      required: true,
      options: classCategory,
      colNum: 2,
    },
    {
      name: "course_unit_price",
      label: t("course unit price"),
      required: true,
      validator: (_: any, v: any) => validateNumber(v, t),

      type: "input",
      colNum: 2,
    },
    {
      name: "total_hours",
      label: t("total hours"),
      required: true,
      validator: (_: any, v: any) => validateInNumber(v, t),
      type: "input",
      colNum: 2,
    },

    {
      name: "total_amount",
      label: t("total amount"),
      required: true,
      disabled: true,
      type: "input",
      colNum: 2,
    },
    {
      name: "textbook",
      label: t("textbook"),
      required: true,
      type: "input",
      colNum: 2,
    },
    {
      name: "settlement_date",
      label: t("settlement date"),
      type: "date-picker",
      colNum: 2,
    },
    {
      name: "notes",
      label: t("notes"),
      type: "select",
      required: true,
      options: [
        { label: "体验课", value: "1" },
        { label: "正式课", value: "2" },
      ],
      colNum: 2,
    },
  ];
  const [toggle, FormModal, formRef] = useFormModal({
    height: 350,
    width: 800,
    submit: (values: any) => {
      return createRechargeRecord({ student_id: id, ...values });
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
      return getRechargeRecord({ student_id: searchData });
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
      name: "recharge_date",
      label: t("recharge date"),
      type: "date-picker",
      colNum: 2,
    },
    {
      title: t("course category"),
      dataIndex: "course_category",
      render: (v: any) => classCategory.find((item) => item.value == v)?.label,

      width: 170,
    },
    {
      title: t("course unit price"),
      dataIndex: "course_unit_price",
      render: renderLabel,
      ellipsis: true,
      width: 150,
    },
    {
      title: t("total hours"),
      dataIndex: "total_hours",
      render: renderLabel,
      width: 170,
    },
    {
      title: t("total amount"),
      dataIndex: "total_amount",
      render: renderLabel,
      width: 120,
    },

    {
      title: t("textbook"),
      dataIndex: "textbook",
      render: renderLabel,
      ellipsis: true,
      width: 150,
    },
    {
      dataIndex: "settlement_date",
      title: t("settlement date"),
      width: 180,
    },
    {
      title: t("notes"),
      dataIndex: "notes",
      render: (v: any) => noteMap[v] || "-",
      ellipsis: true,
      width: 100,
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
        scrollY={scrollY}
        refresh={refresh}
        loading={loading}
      />
    </>
  );
};

export default App;
