import React, { useState } from "react";
import { Card, Row, Col, Tag } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { getStudentDetail, StudentType } from "~/client/student";
import { useParams, useLocation } from "react-router-dom";
import { DetailBase } from "~/components/detail";
import { useFetch, useRefresh } from "~/hooks";
import ClassRecords from "../components/class-records";
import { useTranslation } from "react-i18next";
import { getTime } from "~/utils";
const { Meta } = Card;
const noteMap: any = {
  1: <Tag color="red">体验课</Tag>,
  2: <Tag color="green">正式课</Tag>
}
const App: React.FC = () => {
  const { id } = useParams();
  const { pathname } = useLocation()
  const { t } = useTranslation();
  const titleMap: any = {
    name: t('student name'),
    phone: t('phone'),
    purchase_date: t('purchase date'),
    course_unit_price: t('course unit price'),
    total_hours: t('total hours'),
    notes: t('notes'),
    total_amount: t('total amount'),
    course_category: t('course category'),
    channel: t('channel'),
    remaining_class_hours: t('remaining hours'),
    student_bg: t('student background'),
  }
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
  const handleRefresh = () => {
    setRefreshKey();
  };
  const formatTime = (key: string, value: string) => {
    if (key === "purchase_date") {
      return getTime(value)
    }
    if (key === "notes") {
      return noteMap[value]
    }
    return value
  };

  const isShowRefresh = true;
  const renderDetail = () => {
    return Object.entries(data).map(([key, value]) => (
      <Row key={key} style={{ paddingTop: 10 }}>
        <Col span={12}>{titleMap[key]}</Col>
        <Col span={12}>{formatTime(key, value)}</Col>
      </Row>
    ));
  };
  return (
    <DetailBase {...{ listUrl, handleRefresh, isShowRefresh }}>
      <div>
        {pathname.includes('class-records') && <ClassRecords id={id} name={22} />}
        {pathname.includes('detail') && <Card style={{ width: 500 }} loading={loading}>
          <Meta avatar={<UserOutlined />} title={t("student information")} />
          {renderDetail()}
        </Card>}
      </div>
    </DetailBase>
  );
};

export default App;
