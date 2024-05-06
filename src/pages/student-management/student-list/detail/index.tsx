import React, { useState } from "react";
import { Card, Row, Col, Tag, TabsProps, Tabs } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { getStudentDetail, StudentType } from "~/client/student";
import { useParams } from "react-router-dom";
import { DetailBase } from "~/components/detail";
import { useFetch, useRefresh } from "~/hooks";
import ClassRecords from "../components/class-records";
import { useTranslation } from "react-i18next";
import { getTime } from "~/utils";
import styles from "../index.module.less";
const { Meta } = Card;
const noteMap: any = {
  1: <Tag color='red'>体验课</Tag>,
  2: <Tag color='green'>正式课</Tag>,
};
const App: React.FC = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const titleMap: any = {
    id: "id",
    phone: t("phone"),
    chinese_name: t("chinese name"),
    english_name: t("english name"),
    gender: t("gender"),
    age: t("age"),
    grade: t("grade"),
    student_bg: t("student background"),
    channel: t("channel"),
    recharge_record: t("recharge record"),
    purchase_date: t("purchase date"),
    course_category: t("course category"),
    total_hours: t("total hours"),
    course_unit_price: t("course unit price"),
    total_amount: t("total amount"),
    textbook: t("textbook"),
    mail: t("mail"),
    settlement_date: t("settlement date"),
    notes: t("notes"),
    remaining_class_hours: t("remaining hours"),
    created_time: t("create time"),
    updated_time: t("updated time"),
    teacher_name: t("bind teacher"),
  };

  const listUrl = "/student-management/student-list";
  const [data, setData] = useState<StudentType | {}>({});
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useRefresh();

  useFetch(
    () => {
      setLoading(true);
      return getStudentDetail({ id });
    },
    (detail) => {
      setData(detail);
      setLoading(false);
    },
    [refreshKey]
  );
  const formatTime = (key: string, value: string) => {
    if (key === "purchase_date") {
      return getTime(value);
    }
    if (key === "notes") {
      return noteMap[value] || "-";
    }
    return value || "-";
  };
  const onChange = (key: string) => {
    console.log(key);
  };
  const isShowRefresh = false;
  const filterKey = ["teacher_id", "id"];
  const renderDetail = () => {
    return (
      <Row className={styles["card"]}>
        {Object.entries(data)
          .filter((item) => !filterKey.includes(item[0]))
          .map(([key, value]) => (
            <Col key={key} span={12}>
              {titleMap[key]} : {formatTime(key, value)}
            </Col>
          ))}
      </Row>
    );
  };
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: t("basic information"),
      children: (
        <Card loading={loading}>
          <Meta avatar={<UserOutlined />} title={t("student information")} />
          {renderDetail()}
        </Card>
      ),
    },
    {
      key: "2",
      label: t("class records"),
      children: <ClassRecords scrollY='calc(100vh - 315px)' id={id} />,
    },
  ];

  return (
    <DetailBase {...{ listUrl, isShowRefresh }}>
      <div>
        <Tabs defaultActiveKey='1' items={items} onChange={onChange} />
      </div>
    </DetailBase>
  );
};

export default App;
