import React, { useState } from "react";
import { Card, Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { getUserDetail, UserDetailType } from "~/client/user";
import { useParams } from "react-router-dom";
import { DetailBase } from "~/components/detail";
import { useFetch, useRefresh } from "~/hooks";
import { useTranslation } from "react-i18next";
import styles from '../index.module.less'
import { renderLabel } from "~/utils";
const { Meta } = Card;
const App: React.FC = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const listUrl = "/user-management/user-list";
  const [data, setData] = useState<UserDetailType | {}>({});
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useRefresh();
  const titleMap: any = {
    name: t("username"),
    "chinese_name": t("chinese name"),
    "english_name": t("english name"),
    password: "password",
    role: t("role"),
    gender: t("gender"),
    phone: t("phone"),
    id_card_number: t("id card"),
    bank_account_number: t("bank account"),
    description: t("description"),
    deposit_bank: t("deposit_bank"),
    employment_date: t("employment date"),
    "created_time": t("create time"),
    "updated_time": t("updated time"),
  }
  const nameMap: any = {
    'teacher': t('teacher'),
    'orgadm': t('orgadm'),
    'clerk': t('clerk'),
    'course_consultant': t('course consultant'),
    'learning_consultant': t('learning consultant'),

  }
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
  const filterKey = ['avatar', 'id']
  const renderDetail = () => {
    return <Row className={styles["card"]}>
      {
        Object.entries(data).filter(item => !filterKey.includes(item[0])).filter(item => item[0] !== 'id' && item[0] !== 'teacher_id').map(([key, value]) => (
          <Col key={key} span={12}>{titleMap[key]} : {
            key == "role" && nameMap[key] || renderLabel(value)
          }
          </Col>))
      }
    </Row>
  };
  const handleRefresh = () => {
    setRefreshKey();
  };

  const isShowRefresh = true;

  return (
    <DetailBase {...{ listUrl, handleRefresh, isShowRefresh }}>
      <Card loading={loading}>
        <Meta avatar={<UserOutlined />} title={t("user information")} />
        {renderDetail()}
      </Card>
    </DetailBase>
  );
};

export default App;
