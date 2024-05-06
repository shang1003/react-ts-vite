import { useState } from "react";
import { useFetch } from "~/hooks";
import dayjs from "dayjs";
import { getSellGroup } from "~/client/sell";
import { useTranslation } from "react-i18next";
import { BaseTable } from "~/components/base-table";
import { renderLabel } from "~/utils";
import { DatePicker } from "antd";
import { DatePickerProps } from "antd/lib";

const App: React.FC<dynamic.ComponentProps> = (props) => {
  const [data, setData] = useState<any>([]);
  const [month, setMonth] = useState<string>(dayjs().format("YYYY-MM"));
  const [loading, setLoading] = useState(true);
  //排课率
  const getRate = (record: any) => {
    if (!record.trial_class_count_sum) {
      return "0%";
    }
    return `${Math.round(
      (record.trial_class_scheduling_test_sum / record.trial_class_count_sum) * 100
    )}%`;
  };

  const getExperientialRate = (record: any) => {
    // 排课数为空/成交人数为空
    if (!(record.trial_class_scheduling_test_sum && record.formal_class_test_sum)) {
      return "0%";
    }
    return `${Math.round(
      (record.formal_class_test_sum / record.trial_class_scheduling_test_sum) * 100
    )}%`;
  };
  const getAverage = (record: any, type = "om") => {
    if (!(record[`${type}TotalAmountSum`] && record[`${type}TotalLessonsSum`])) {
      return "0";
    }
    return `${(record[`${type}TotalAmountSum`] / record[`${type}TotalLessonsSum`]).toFixed(1)}`;
  };
  useFetch(
    () => {
      setLoading(true);
      return getSellGroup({ date: month });
    },
    ({ data }) => {
      setLoading(false);
      setData(data.map((item, index) => ({ ...item, index: index + 1 })));
    },
    [month]
  );
  const onChange: DatePickerProps["onChange"] = (_, dateString: any) => {
    setMonth(dateString);
  };

  const { t } = useTranslation();
  const columns = [
    {
      title: t("index"),
      dataIndex: "index",
      width: 70,
      fixed: "left",
    },
    {
      title: t("name"),
      dataIndex: "name",
      ellipsis: true,
      render: (_: any, record: any) => renderLabel(record.sell?.name),
      width: 120,
    },
    {
      title: t("experience classes num"),
      dataIndex: "trial_class_count_sum",
      render: (v: any) => renderLabel(v),
      width: 150,
    },
    {
      title: t("course scheduling"),
      dataIndex: "trial_class_scheduling_test_sum",
      render: (v: any) => renderLabel(v),
      width: 150,
    },
    {
      title: t("course scheduling rate"),
      render: (_: any, record: any) => getRate(record),

      width: 150,
    },
    {
      title: t("transactions number"),
      dataIndex: "formal_class_test_sum",
      width: 150,
    },
    {
      title: t("experiential course conversion rate"),
      render: (v: any, record: any) => getExperientialRate(record),
      width: 150,
    },
    {
      title: t("european and american classes"),
      dataIndex: "omTotalLessonsSum",
      width: 150,
    },
    {
      title: t("european and american total amount"),
      dataIndex: "omTotalAmountSum",
      width: 150,
    },
    {
      title: t("european and american total amount"),
      dataIndex: "omTotalAmountSum",
      width: 150,
    },
    {
      title: t("average"),
      render: (_: any, record: any) => getAverage(record, "om"),
      width: 100,
    },
    {
      title: t("philippines teaches classes"),
      dataIndex: "fTotalLessonsSum",
      width: 150,
    },
    {
      title: t("philippines teaches total amount"),
      dataIndex: "fTotalAmountSum",
      width: 180,
    },
    {
      title: t("average"),
      render: (_: any, record: any) => getAverage(record, "f"),
      width: 100,
    },
    {
      title: t("chinese teachers classes"),
      dataIndex: "zTotalLessonsSum",
      width: 150,
    },
    {
      title: t("chinese teachers total amount"),
      dataIndex: "zTotalAmountSum",
      width: 150,
    },
    {
      title: t("average"),
      render: (_: any, record: any) => getAverage(record, "z"),
      width: 100,
    },
  ];
  return (
    <>
      <div style={{ padding: 10 }}>
        <DatePicker
          defaultValue={dayjs(dayjs().format("YYYY-MM"))}
          onChange={onChange}
          picker='month'
        />
      </div>
      <BaseTable
        rowKey='id'
        columns={columns}
        data={data}
        scrollY='calc(100vh - 210px)'
        loading={loading}
        hasItemActions={false}
      />
    </>
  );
};

export default App;
