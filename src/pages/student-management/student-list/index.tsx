import { Profiler, useState } from "react";
import { Button, Space, Tag, Radio, message, Input, Select } from "antd";
import { useFetch, useRefresh } from "~/hooks";
import { useFormModal } from "~/hooks/modal/FormModal";
import { getStudentList, createStudent, getStudentExcel, uploadStudents } from "~/client/student";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./index.module.less";
import { actionConfigs } from "./action";
import { BaseTable } from "~/components/base-table";
import { BatchDelete } from "./action/BatchDelete";
import { getTrialClass } from "~/utils";
import { download, renderLabel } from "~/utils";
import root from "~/store/root";
const { Search } = Input;

const TableCom: React.FC = () => {
  const { t } = useTranslation();
  const noteMap: any = {
    1: <Tag color='red'>{t("experience course")}</Tag>,
    2: <Tag color='green'>{t("formal course")}</Tag>,
  };
  const trialClass = getTrialClass(t);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [modalData, setModalData] = useState<any>({});
  const [searchData, setSearchData] = useState<any>({});
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const [refreshKey, refresh] = useRefresh();
  const [toggle, FormModal, formRef] = useFormModal(modalData);
  const [data, setData] = useState<any | []>([]);
  const [loading, setLoading] = useState(true);
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const onSearch = (v: string) => {
    setSearchData({ name: v, notes: searchData.notes });
  };
  const handleSelect = (v: string) => {
    setSearchData({ name: searchData.name, notes: v });
  };

  const handleClick = () => {
    download(getStudentExcel, "学员信息");
  };
  const beforeUpload = (file: any, err: any) => {
    if (!file.name.includes(".xls") && !file.name.includes(".xlsx")) {
      message.error(t("please upload els or elsx files"));
      return err;
    }

    return false;
  };
  const avatarFormItems = [
    {
      type: "upload",
      name: "content",
      required: true,
      beforeUpload: beforeUpload,
      label: t("select file"),
    },
  ];

  const open = (v: any) => {
    if (v == "create") {
      setModalData({
        height: 350,
        width: 870,
        submit: (values: any) => createStudent(values),
        formItems,
        refresh,
        formProps: {
          successTip: t("{{name}} success", { name: t("create") }),
          initialValues: {
            operation_name: root.userinfo.english_name,
          },
        },
      });
    } else {
      setModalData({
        submit: async (values: any) => {
          const data: any = await uploadStudents(values.content);
          return data;
        },
        refresh,
        title: t("upload file"),
        formItems: avatarFormItems,

        formProps: {
          successTip: t("{{name}} success", { name: t("upload avatar") }),
        },
      });
      toggle(true);
    }
    toggle(true);
  };

  const formItems = [
    {
      name: "operation_name",
      label: t("operation personnel"),
      type: "input",
      colNum: 2,
      required: true,
    },
    {
      name: "phone",
      label: t("phone"),
      type: "input",
      colNum: 2,
      required: true,
    },
    {
      name: "chinese_name",
      label: t("chinese name"),
      type: "input",
      colNum: 2,
      required: true,
    },
    {
      name: "english_name",
      label: t("english name"),
      type: "input",
      colNum: 2,
      required: true,
    },
    {
      name: "gender",
      label: t("gender"),
      type: "input",
      colNum: 2,
      component: (
        <Radio.Group>
          <Radio value='男'>{t("male")}</Radio>
          <Radio value='女'>{t("female")}</Radio>
        </Radio.Group>
      ),
      required: true,
    },
    {
      name: "age",
      label: t("age"),
      type: "input",
      colNum: 2,
    },
    {
      name: "grade",
      label: t("grade"),
      type: "input",
      colNum: 2,
    },
    {
      name: "student_bg",
      label: t("student background"),
      type: "input",
      colNum: 2,
    },
    {
      label: t("channel"),
      name: "channel",
      type: "input",
      colNum: 2,
    },
    {
      name: "trial_class_category",
      label: t("trial class category"),
      type: "select",
      options: trialClass,
      colNum: 2,
    },
    {
      name: "mail",
      label: t("mail"),
      type: "input",
      colNum: 2,
    },

    {
      name: "notes",
      label: t("notes"),
      type: "select",
      options: [
        { label: "体验课", value: "1" },
        { label: "正式课", value: "2" },
      ],
      colNum: 2,
    },
  ];
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
      render: renderLabel,
    },
    {
      title: t("chinese name"),
      dataIndex: "chinese_name",
      width: 120,
      render: (value: any, { id }: any) => {
        return <Link to={`/student-management/student-list/detail/${id}`}>{value}</Link>;
      },
    },
    {
      title: t("english name"),
      dataIndex: "english_name",
      width: 120,
    },
    {
      title: t("gender"),
      dataIndex: "gender",
      render: (v: string) => t(v),
      width: 120,
    },
    {
      title: t("age"),
      dataIndex: "age",
      width: 120,
    },
    {
      title: t("grade"),
      dataIndex: "grade",
      width: 120,
    },
    {
      title: t("student background"),
      dataIndex: "student_bg",
      width: 200,
    },
    {
      title: t("channel"),
      dataIndex: "channel",
      render: renderLabel,
      width: 120,
    },
    {
      title: t("recharge record"),
      dataIndex: "recharge_record",
      render: (value: any, { id }: any) => {
        return <Link to={`/student-management/recharge-record?student_id=${id}`}>{value}</Link>;
      },
      width: 160,
    },
    {
      title: t("send textbook record"),
      dataIndex: "send_textbook_records",
      render: (value: any, { id }: any) => {
        return (
          <Link to={`/student-management/send-textbook-records?student_id=${id}`}>
            {value || 0}
          </Link>
        );
      },
      width: 160,
    },
    {
      title: t("trial class category"),
      dataIndex: "trial_class_category",
      render: (v: string) =>
        trialClass.find((item: { value: string }) => item.value == v)?.label || "-",
      width: 170,
    },
    {
      title: t("mail"),
      dataIndex: "mail",
      render: renderLabel,
      ellipsis: true,
      width: 150,
    },
    {
      title: t("teacher"),
      dataIndex: "teacher_name",
      render: renderLabel,
      ellipsis: true,
      width: 150,
    },

    {
      title: t("notes"),
      dataIndex: "notes",
      render: (v: any) => noteMap[v] || "-",
      ellipsis: true,
      width: 100,
    },
    {
      title: t("sales person"),
      dataIndex: "sales_person_name",
      render: renderLabel,
      ellipsis: true,
      width: 100,
    },
  ];

  useFetch(
    async () => {
      setLoading(true);
      setSelectedRowKeys([]);
      return await getStudentList(searchData);
    },
    (res) => {
      setData(res.data.map((item, index) => ({ ...item, index: index + 1 })));
      setLoading(false);
    },
    [refreshKey, searchData]
  );

  return (
    <>
      <div className={styles["header"]}>
        <Space>
          <Search
            placeholder={t("please enter the student name")}
            allowClear
            enterButton={t("search")}
            onSearch={onSearch}
          />
          <Select
            defaultValue='all'
            style={{ width: 120 }}
            onChange={handleSelect}
            options={[
              { value: "all", label: t("all") },
              { value: "2", label: t("formal course") },
              { value: "1", label: t("experience course") },
            ]}
          />
          <Button type='primary' onClick={() => open("create")}>
            {t("create")}
          </Button>
          <BatchDelete
            selectedRowKeys={selectedRowKeys}
            refresh={refresh}
            isDisabled={!selectedRowKeys.length}
          />
          <Button type='primary' disabled={!data.length} onClick={handleClick}>
            {t("export")}
          </Button>
          <Button type='primary' onClick={() => open("upload")}>
            {t("upload file")}
          </Button>
        </Space>
      </div>
      <FormModal />
      <BaseTable
        rowSelection={rowSelection}
        rowKey='id'
        columns={columns}
        data={data}
        actionsWidth={200}
        scrollY='calc(100vh - 270px)'
        loading={loading}
        actions={actionConfigs}
        refresh={refresh}
      />
    </>
  );
};

export default TableCom;
