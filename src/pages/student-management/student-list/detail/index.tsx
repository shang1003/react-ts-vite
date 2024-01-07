import React, { useState } from "react";
import { Card, Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { getStudentDetail, StudentType } from "~/client/student";
import { useParams } from "react-router-dom";
import { DetailBase } from "~/components/detail";
import { useFetch, useRefresh } from "~/hooks";
import { useTranslation } from "react-i18next";
import { getTime } from "~/utils";
const { Meta } = Card;
const App: React.FC = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const titleMap: any = {
    phone: t('phone'),
    course_unit_price: t('course unit price'),
    total_hours: t('total hours'),
    notes: t('notes'),
    total_amount: t('total amount')
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
    return key === "create_time" ? getTime(value) : value;
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
      <Card style={{ width: 500 }} loading={loading}>
        <Meta avatar={<UserOutlined />} title={t("student information")} />
        {renderDetail()}
      </Card>
    </DetailBase>
  );
};

export default App;
