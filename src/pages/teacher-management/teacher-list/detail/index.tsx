import React, { useState } from "react";
import { Card } from "antd";
import { getTeacherDetail } from "~/client/teacher";
import { useParams } from "react-router-dom";
import { DetailBase } from "~/components/detail";
import { useFetch, useRefresh } from "~/hooks";
import { useTranslation } from "react-i18next";
import CourseTable from "../../components/course-table"
const { Meta } = Card;
const App: React.FC = () => {
  const { id } = useParams();
  const { t } = useTranslation();

  const listUrl = "/teacher-management/teacher-list";
  const [data, setData] = useState<any | {}>({});
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useRefresh();

  useFetch(
    () => {
      setLoading(true);
      return getTeacherDetail({ id });
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


  const isShowRefresh = true;

  return (
    <DetailBase {...{ listUrl, handleRefresh, isShowRefresh }}>
      <CourseTable id={id} />
    </DetailBase>
  );
};

export default App;
