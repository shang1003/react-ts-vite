import React, { useState } from "react";
import { Card, Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { getUserDetail, UserDetailType } from "~/client/user";
import { useParams } from "react-router-dom";
import { DetailBase } from "~/components/detail";
import { useFetch, useRefresh } from "~/hooks";
import { useTranslation } from "react-i18next";
import { getTime } from "~/utils";
const { Meta } = Card;
const App: React.FC = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const listUrl = "/table/case";
  const [data, setData] = useState<UserDetailType | {}>({});
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useRefresh();

  useFetch(
    () => {
      setLoading(true);
      return getUserDetail({ id });
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
      <Row key={key}>
        <Col span={12}>{key}</Col>
        <Col span={12}>{formatTime(key, value)}</Col>
      </Row>
    ));
  };

  return (
    <DetailBase {...{ listUrl, handleRefresh, isShowRefresh }}>
      <Card style={{ width: 300 }} loading={loading}>
        <Meta avatar={<UserOutlined />} title={t("user information")} />
        {renderDetail()}
      </Card>
    </DetailBase>
  );
};

export default App;
