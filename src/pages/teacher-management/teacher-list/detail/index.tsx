import React, { useState } from "react";
import { getUserDetail } from "~/client/user";
import { useParams, useLocation } from "react-router-dom";
import { DetailBase } from "~/components/detail";
import { useFetch, useRefresh } from "~/hooks";
import { useTranslation } from "react-i18next";
import CourseTable from "../../components/course-table";
import ClassRecords from "../../components/class-records";
import style from '../index.module.less'
const App: React.FC = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { pathname } = useLocation()


  const listUrl = "/teacher-management/teacher-list";
  const [data, setData] = useState<any | {}>(null);
  const [refreshKey, setRefreshKey] = useRefresh();

  useFetch(
    () => {
      return getUserDetail({ id });
    },
    (detail) => {
      setData(detail);
    },
    [refreshKey]
  );
  const handleRefresh = () => {
    setRefreshKey();
  };


  const isShowRefresh = false;

  return (
    <DetailBase {...{ listUrl, handleRefresh, isShowRefresh }}>
      <div>
        <div className={style['header-detail']}>
          {<span>{t("teacher name")}</span>} : {<span>{data?.name}</span>}
        </div>

        {
          data && (pathname.includes('salary') && pathname.includes('class-records') && <ClassRecords data={data} /> || <CourseTable data={data} />)
        }
      </div>

    </DetailBase>
  );
};

export default App;
