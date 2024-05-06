import { useState, useRef } from "react";
import { Button, Space, Radio, Select, DatePicker } from "antd";
import { useFetch, useRefresh } from "~/hooks";
import { FormModal } from "~/components/modal/Modal";
import { renderLabel } from "~/utils";
import { getSalary, createSalary, getTeacherSalaryExcel } from "~/client/salary";
import { useTranslation } from "react-i18next";
import styles from "./index.module.less";
import { actionConfigs } from "./action";
import { BaseTable } from "~/components/base-table";
import { download } from "~/utils";
import { getUserDetail, getUserListInfo } from "~/client/user";
import { useLocation } from "react-router-dom";
const App: React.FC<dynamic.ComponentProps> = (props) => {
  const { scrollY = "calc(100vh - 230px)" } = props;
  const [teacherSalary, setTeacherSalary] = useState<any>([]);
  const [userId, setUserId] = useState<string>();
  const [selectId, setSelectId] = useState<string>("");
  const [userList, setUserList] = useState<any>([]);
  const [show, toggle] = useState(false);
  const [refreshKey, refresh] = useRefresh();
  const [loading, setLoading] = useState(true);
  const formRef = useRef<any>(null);
  const location = useLocation();
  const [month, setMonth] = useState<string>();
  const { t } = useTranslation();
  const isHidden = location.pathname.includes("employee-salary-list");
  const handleClick = () => {
    download(() => getTeacherSalaryExcel({ user_id: userId, date: month }), "工资表");
  };

  useFetch(
    () => {
      setLoading(true);
      return getSalary({ user_id: userId, date: month });
    },
    ({ data }) => {
      setLoading(false);
      setTeacherSalary(data.map((item, index) => ({ ...item, index: index + 1 })));
    },
    [refreshKey, userId, month]
  );
  useFetch(
    () => {
      return getUserListInfo();
    },
    ({ data }) => {
      setLoading(false);
      if (isHidden) {
        setUserList(
          data
            .filter((item) => item.role !== "teacher" && item.name !== "orgadm")
            .map((item) => ({ label: item.english_name, value: item.id }))
        );
      } else {
        //教师
        setUserList(
          data
            .filter(
              (item) =>
                (item.role === "teacher" || item.role === "orgadm") && item.name !== "orgadm"
            )
            .map((item) => ({ label: item.english_name, value: item.id }))
        );
      }
    },
    [location.pathname]
  );
  useFetch(
    () => {
      return getUserDetail({ id: selectId });
    },
    (data) => {
      formRef?.current?.setFieldsValue({
        ...data,
      });
    },
    [selectId]
  );

  const handleDatePicker = (_: any, dateString: any) => {
    setMonth(dateString);
  };

  const nameMap: any = {
    teacher: t("teacher"),
    orgadm: t("orgadm"),
    clerk: t("clerk"),
    course_consultant: t("course consultant"),
    learning_consultant: t("learning consultant"),
  };
  const roleOptions = [
    { label: t("orgadm"), value: "orgadm" },
    { label: t("teacher"), value: "teacher" },
    { label: t("clerk"), value: "clerk" },
    { label: t("course consultant"), value: "course_consultant" },
    { label: t("learning consultant"), value: "learning_consultant" },
  ];
  const validateNumber = (_: any, value: any) => {
    if (value && !/^(-)?\d+(\.\d+)?$/.test(value)) {
      return Promise.reject(t("please enter a valid number."));
    }
    return Promise.resolve();
  };
  const formItems = [
    {
      name: "user_id",
      label: t("name"),
      colNum: 2,
      type: "select",
      onChange: (v: string) => {
        console.log(v, "v");
        setSelectId(v);
      },
      required: true,
      options: userList,
    },
    // {
    //   name: "role",
    //   label: t("role"),
    //   colNum: 2,
    //   type: "select",
    //   options: roleOptions,
    //   disabled: true,
    // },
    {
      name: "chinese_name",
      label: t("chinese name"),
      type: "input",
      colNum: 2,
      disabled: true,
    },
    {
      name: "english_name",
      label: t("english name"),
      type: "input",
      colNum: 2,
      disabled: true,
    },

    {
      name: "gender",
      colNum: 2,
      label: t("gender"),
      type: "input",
      component: (
        <Radio.Group disabled={true}>
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
      disabled: true,
    },
    {
      name: "id_card_number",
      colNum: 2,
      label: t("id card"),
      validateTrigger: "onBlur",
      type: "input",
      disabled: true,
    },
    {
      name: "deposit_bank",
      label: t("deposit bank"),
      type: "input",
      colNum: 2,
      disabled: true,
    },
    {
      name: "bank_account_number",
      colNum: 2,
      label: t("bank account"),
      type: "input",
      disabled: true,
    },
    {
      name: "employment_date",
      colNum: 2,
      label: t("employment date"),
      format: "YYYY-MM-DD",
      type: "date-picker",
      disabled: true,
    },
    {
      name: "settlement_date",
      label: t("salary date"),
      format: "YYYY-MM-DD",
      showTime: false,
      type: "date-picker",
      disabledDate: (current: any, info: any) => {
        if (
          !info.from ||
          (info?.from?.month() === current.month() && info?.from?.year() === current.year())
        ) {
          return false;
        } else {
          return true;
        }
      },
      isRange: true,
      colNum: 2,
      required: true,
    },
    {
      name: "basic_salary",
      label: t("basic salary"),
      type: "input",
      required: true,
      hidden: isHidden,
      validator: validateNumber,
      colNum: 2,
    },
    {
      name: "class_hour",
      label: t("class hour"),
      type: "input",
      hidden: isHidden,
      required: true,
      validator: validateNumber,
      colNum: 2,
    },
    // {
    //   name: "commission_rate",
    //   label: t("commission rate"),
    //   type: "input",
    //   format: "YYYY-MM-DD",
    //   validator: validateNumber,
    //   colNum: 2,
    // },
    {
      name: "commission",
      label: t("commission"),
      type: "input",
      validator: validateNumber,
      colNum: 2,
      required: true,
    },
    {
      name: "gross_amount",
      label: t("gross amount"),
      type: "input",
      validator: validateNumber,
      colNum: 2,
      required: true,
    },
    {
      name: "reward",
      label: t("reward"),
      type: "input",
      validator: validateNumber,
      colNum: 2,
      required: true,
    },
    {
      name: "penalty",
      label: t("penalty"),
      type: "input",
      validator: validateNumber,
      colNum: 2,
      required: true,
    },
    {
      name: "total_amount",
      label: t("total amount"),
      type: "input",
      disabled: true,
      colNum: 2,
      required: true,
    },
  ];

  const columns = [
    {
      title: t("index"),
      dataIndex: "index",
      width: 70,
    },

    {
      title: t("chinese name"),
      dataIndex: "chinese_name",
      render: (_: any, { user }: any) => renderLabel(user.chinese_name),
      width: 120,
      ellipsis: true,
    },
    {
      title: t("english name"),
      dataIndex: "english_name",
      render: (_: any, { user }: any) => renderLabel(user.english_name),
      width: 140,
      ellipsis: true,
    },
    {
      title: t("role"),
      width: 110,
      dataIndex: "role",
      render: (_: any, { user }: any) => nameMap[user.role],
    },
    {
      dataIndex: "gender",
      title: t("gender"),
      type: "input",
      render: (_: any, { user }: any) => t(user.gender),
      width: 110,
    },
    {
      dataIndex: "phone",
      title: t("phone"),
      render: (_: any, { user }: any) => renderLabel(user.phone),
      width: 110,
      ellipsis: true,
    },
    {
      dataIndex: "id_card_number",
      title: t("id card"),
      render: (_: any, { user }: any) => renderLabel(user.id_card_number),
      width: 180,
      ellipsis: true,
    },
    {
      dataIndex: "deposit_bank",
      render: (_: any, { user }: any) => renderLabel(user.deposit_bank),
      title: t("deposit bank"),
      width: 150,
      ellipsis: true,
    },
    {
      dataIndex: "bank_account_number",
      render: (_: any, { user }: any) => renderLabel(user.bank_account_number),
      title: t("bank account"),
      width: 180,
    },
    {
      dataIndex: "employment_date",
      render: (_: any, { user }: any) => renderLabel(user.employment_date),
      title: t("employment date"),
      width: 150,
    },
    {
      dataIndex: "settlement_date",
      title: t("salary date"),
      render: (...res: any) => renderLabel(`${res[1].start_date}~${res[1].end_date}`),
      width: 150,
    },
    {
      dataIndex: "basic_salary",
      title: t("basic salary"),
      width: 200,
    },
    {
      dataIndex: "class_hour",
      title: t("class hour"),
      width: 110,
    },
    // {
    //   dataIndex: "commission_rate",
    //   title: t("commission rate"),
    //   width: 150,
    // },
    {
      dataIndex: "commission",
      title: t("commission"),
      width: 110,
    },
    {
      dataIndex: "gross_amount",
      title: t("gross amount"),
      width: 150,
    },
    {
      dataIndex: "reward",
      title: t("reward"),
      width: 110,
    },
    {
      dataIndex: "penalty",
      title: t("penalty"),
      width: 110,
    },
    {
      dataIndex: "total_amount",
      title: t("total amount"),
      width: 150,
    },
  ];
  return (
    <>
      <div className={styles["header"]}>
        <Space>
          <DatePicker style={{ width: 160 }} onChange={handleDatePicker} picker='month' />
          <Select
            style={{ width: 160 }}
            allowClear
            showSearch
            defaultValue={userId}
            filterOption={(input: string, option: any) => (option?.label ?? "").includes(input)}
            onClear={() => setUserId("")}
            onChange={(v) => setUserId(v)}
            placeholder={`${t("please select")} ${t("teacher")}`}
            options={userList}
          />
          <Button type='primary' onClick={() => toggle(true)}>
            {t("create")}
          </Button>

          <Button type='primary' onClick={handleClick}>
            {t("export")}
          </Button>
        </Space>
      </div>
      {show && (
        <FormModal
          {...{
            submit: (values) => {
              const {
                settlement_date: [start_date, end_date],
                ...res
              } = values;
              return createSalary({ start_date, end_date, ...res });
            },
            formItems,
            height: 540,
            width: 840,
            refresh,
            ref: formRef,
            toggle,
            title: t("bind"),
            formProps: {
              onValuesChange: (
                _: any,
                { basic_salary = 0, class_hour = 0, reward = 0, penalty = 0, commission = 0 }: any
              ) => {
                formRef?.current.setFieldsValue({
                  total_amount: basic_salary * class_hour + +reward - penalty + +commission,
                });
                formRef?.current.setFieldsValue({
                  gross_amount: basic_salary * class_hour + +commission,
                });
              },
              successTip: t("{{name}} success", { name: t("create") }),
            },
          }}
        />
      )}
      <BaseTable
        rowKey='id'
        columns={columns}
        data={teacherSalary}
        scrollY={scrollY}
        loading={loading}
        actions={actionConfigs}
        refresh={refresh}
      />
    </>
  );
};

export default App;
