import { useState } from "react";
import { useFetch, useRefresh } from "~/hooks";
import { download, renderLabel } from "~/utils";
import { getBonus, createBonus, getBonusExcel } from "~/client/bonus";
import { getUserListInfo } from "~/client/user";
import { getStudentList } from "~/client/student";
import { DatePicker } from "~/components/dynamic-form/components";
import { useTranslation } from "react-i18next";
import { BaseTable } from "~/components/base-table";
import { useFormModal } from "~/hooks/modal/FormModal";
import { Button, Space } from "antd";
import styles from "@/pages/student-management/student-list/index.module.less";
import { actionConfigs } from "./action";
const rewardsOption = [
  { label: "30:开单数量奖,一名正式课学员为一单不论大小金额30元一个学员", value: "1-30" },
  { label: "100:单笔5000-10000元（包含10000元），每单奖励100元", value: "2-100" },
  { label: "500:单笔10001-20000元（包含20000元），每单奖励500元", value: "3-500" },
  { label: "1000:单笔20001～50000元（包含50000元），每单奖励1000元", value: "4-1000" },
  { label: "3000:单笔50001元以上，每单奖励3000元推荐成交奖", value: "5-3000" },
  { label: "100:推荐成交一名学员购买正式课一单不论大小金额100元", value: "6-100" },
  { label: "1000:招聘一名合格的老师奖励1000元", value: "7-1000" },
];
const App: React.FC<dynamic.ComponentProps> = (props) => {
  const { scrollY = "calc(100vh - 230px)" } = props;
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [userList, setUserList] = useState<any>([]);
  const [studentList, setStudentList] = useState<any>([]);
  const [dateArr, setDateArr] = useState<any>([]);
  const { t } = useTranslation();
  const [refreshKey, refresh] = useRefresh();
  const handleDatePicker = (dateArr: any) => {
    setDateArr(dateArr);
  };
  const handleClick = () => {
    const tip = dateArr[0] ? `${dateArr[0]}~${dateArr[1]}` : "全部";
    download(() => getBonusExcel({ start_date: dateArr[0], end_date: dateArr[1] }), `${tip}奖金`);
  };
  const formItems: any[] = [
    {
      name: "date",
      label: t("date"),
      format: "YYYY-MM-DD",
      showTime: false,
      type: "date-picker",
      isRange: true,
      colNum: 2,
      required: true,
    },
    {
      name: "user_id",
      label: t("employee"),
      type: "select",
      options: userList,
      colNum: 2,
      required: true,
    },
    {
      name: "student_id",
      label: t("student"),
      type: "select",
      options: studentList,
      colNum: 2,
    },
    {
      name: "rewards",
      label: t("rewards"),
      type: "select",
      mode: "multiple",
      labelInValue: true,
      allowClear: true,
      required: true,
      options: rewardsOption,
      colNum: 2,
    },
    {
      name: "reward_quantity",
      label: t("reward quantity"),
      type: "input",
      colNum: 2,
      disabled: true,
    },
    {
      name: "amount",
      label: t("total amount"),
      type: "input",
      colNum: 2,
      disabled: true,
    },
  ];
  const [toggle, FormModal, formRef] = useFormModal({
    submit: ({ rewards, date, ...res }) => {
      const [start_date, end_date] = date;
      return createBonus({
        start_date,
        end_date,
        rewards: rewards.map((item: { label: any }) => item.label).join(";"),
        ...res,
      });
    },
    width: 800,
    height: 250,
    formItems,
    refresh,
    formProps: {
      onValuesChange: (_, { rewards }) => {
        const amount = rewards?.reduce((pre: number, cur: any) => {
          return pre + +cur?.value?.split("-")[1];
        }, 0);
        formRef?.current.setFieldsValue({ amount, reward_quantity: rewards?.length || 0 });
      },
      successTip: t("{{name}} success", { name: t("create") }),
    },
  });

  useFetch(
    () => {
      setLoading(true);
      return getBonus({
        start_date: dateArr[0],
        end_date: dateArr[1],
      });
    },
    ({ data }) => {
      setLoading(false);
      setData(data.map((item: any, index: any) => ({ ...item, index: index + 1 })));
    },
    [refreshKey, dateArr]
  );
  useFetch(
    () => {
      return getUserListInfo();
    },
    ({ data }) => {
      setLoading(false);
      setUserList(
        data
          .filter((item) => item.name !== "orgadm")
          .map((item) => ({ label: item.english_name, value: item.id }))
      );
    },
    []
  );
  useFetch(
    () => {
      return getStudentList();
    },
    ({ data }) => {
      setLoading(false);
      setStudentList(data.map((item) => ({ label: item.english_name, value: item.id })));
    },
    []
  );

  const columns = [
    {
      title: t("index"),
      dataIndex: "index",
      width: 70,
      fixed: "left",
    },
    {
      dataIndex: "date",
      title: t("date"),
      render: (...res: any) => renderLabel(`${res[1].start_date}~${res[1].end_date}`),
      width: 150,
    },
    {
      dataIndex: "employee",
      title: t("employee"),
      render: (...res: any) => renderLabel(`${res[1].user?.english_name}`),
      width: 150,
    },
    {
      dataIndex: "student",
      title: t("student"),
      render: (...res: any) => renderLabel(`${res[1].student?.english_name}`),
      width: 150,
    },
    {
      title: t("reward quantity"),
      dataIndex: "reward_quantity",
      width: 180,
      ellipsis: true,
    },
    {
      title: t("total amount"),
      dataIndex: "amount",
      width: 180,
      ellipsis: true,
    },
    {
      title: t("rewards"),
      dataIndex: "rewards",
      width: 180,
      render: renderLabel,
      ellipsis: true,
    },
  ];
  return (
    <>
      <div className={styles["header"]}>
        <Space>
          <DatePicker
            format='YYYY-MM-DD'
            showTime={false}
            isRange={true}
            onChange={handleDatePicker}
          />
          <Button type='primary' onClick={() => toggle(true)}>
            {t("create")}
          </Button>
          <Button type='primary' onClick={handleClick}>
            {t("export")}
          </Button>
        </Space>
      </div>
      <FormModal />
      <BaseTable
        rowKey='id'
        columns={columns}
        data={data}
        actionsWidth={100}
        scrollY={scrollY}
        loading={loading}
        actions={actionConfigs}
        refresh={refresh}
      />
    </>
  );
};

export default App;
