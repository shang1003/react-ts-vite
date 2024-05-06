import React, { useState, useRef } from "react";
import { useFetch, useRefresh } from "~/hooks";
import { getTime, getweek, renderLabel } from "~/utils";
import { deleteCourseWeek, getCoursetable, syncCourse } from "~/client/coursetable";
import { useTranslation } from "react-i18next";
import { BaseTable } from "~/components/base-table";
import styles from "./index.module.less";
import { getColorData } from "~/utils";
import { Button, Select, Space } from "antd";
import DatePicker from "../DatePicker";
import { actionConfigs } from "./action";
import Notify from "~/components/notify";
const App: React.FC<dynamic.ComponentProps> = (props) => {
  const [teacherSalary, setData] = useState<any>([]);
  const [refreshKey, refresh] = useRefresh();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<any>();
  const dateRef = useRef<any>(null);
  const [weeksY, setWeeksY] = useState<any[]>([]); // 格式YYYY-MM-DD
  const { t } = useTranslation();
  const colorMap = getColorData(t);
  const handleClickDate = (v: any) => {
    setWeeksY(getweek("YYYY-MM-DD", v));
  };
  // 本周课程同步到下周
  const handleSyncCourse = () => {
    syncCourse()
      .then(() => {
        Notify.success(t("success"), t("{{name}} success", { name: t("sync") }));
        refresh();
      })
      .catch(
        ({
          response: {
            data: { message },
          },
        }) => {
          Notify.error(t("error"), message);
        }
      );
  };
  // 删除下周所有课程
  const deleteCourse = () => {
    deleteCourseWeek()
      .then(() => {
        Notify.success(t("success"), t("{{name}} success", { name: t("delete") }));
        refresh();
      })
      .catch(
        ({
          response: {
            data: { message },
          },
        }) => {
          Notify.error(t("error"), message);
        }
      );
  };
  const reset = () => {
    dateRef?.current?.handleReset();
    setWeeksY([]);
    setStatus(null);
  };

  useFetch(
    () => {
      setLoading(true);
      return getCoursetable({ status, dateArr: [weeksY[0], weeksY[6]] });
    },
    ({ data }) => {
      setLoading(false);
      setData(data.map((item, index) => ({ ...item, index: index + 1 })));
    },
    [refreshKey, status, weeksY]
  );

  const columns = [
    {
      title: t("index"),
      dataIndex: "index",
      width: 70,
      fixed: "left",
    },
    {
      title: t("teacher"),
      dataIndex: "chinese_name",
      render: (_: any, record: any) =>
        renderLabel(`${record.user?.english_name} (${record.user?.chinese_name || "-"})`),
    },
    {
      title: t("student"),
      dataIndex: "english_name",
      render: (_: any, record: any) =>
        renderLabel(`${record.student?.english_name} (${record.student?.chinese_name || "-"})`),
    },
    {
      title: t("course time"),
      dataIndex: "date",
      render: (...res: any) => `${res[1].date} ${res[1].start_time}~${res[1].end_time}`,
    },
    {
      title: t("course name"),
      dataIndex: "name",
      ellipsis: true,
    },
    {
      title: t("course status"),
      dataIndex: "status",
      render: (v: string) => {
        const data = colorMap.find((item: { key: any }) => item.key == v);
        return (
          <div style={{ backgroundColor: data?.color, width: "100%" }}>
            {data?.label || t("not started")}
          </div>
        );
      },
    },
    {
      title: t("operation date"),
      dataIndex: "created_time",
      render: (v: any) => getTime(v),
    },
  ];
  return (
    <>
      <div className={styles["header"]}>
        <Space>
          <DatePicker ref={dateRef} isShowDefault={false} handleClickDate={handleClickDate} />
          {t("course status")}：
          <Select
            style={{ width: 160 }}
            allowClear
            value={status}
            onClear={() => setStatus(null)}
            onChange={(v) => setStatus(v)}
            placeholder={t("please select")}
            options={colorMap.map((item: { label: any; key: any }) => ({
              label: item.label,
              value: item.key,
            }))}
          />
          <Button onClick={reset} type='primary'>
            {t("reset")}
          </Button>
          <Button type='primary' onClick={handleSyncCourse}>
            {t("this week are synchronized to next week")}
          </Button>
          <Button type='primary' onClick={deleteCourse}>
            {t("delete all classes for the next week")}
          </Button>
        </Space>
      </div>
      <BaseTable
        rowKey='id'
        columns={columns}
        data={teacherSalary}
        scrollY='calc(100vh - 210px)'
        loading={loading}
        actions={actionConfigs}
        refresh={refresh}
      />
    </>
  );
};

export default App;
