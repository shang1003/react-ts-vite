import React, { useState } from "react";
import { getTeacherDetail } from "~/client/teacher";
import { useParams, useLocation } from "react-router-dom";
import { DetailBase } from "~/components/detail";
import { useFetch, useRefresh } from "~/hooks";
import { useTranslation } from "react-i18next";
import CourseTable from "../../components/course-table";
import TeacherSalary from "../../components/teacher-salary";
import style from '../index.module.less'
const App: React.FC = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { pathname } = useLocation()


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
      <div>
        <div className={style['header-detail']}>
          {<span>老师姓名</span>} : {<span className={style['header-name']}>{data.name}</span>}
        </div>

        {
          pathname.includes('teacher-salary') && <TeacherSalary id={id} /> || <CourseTable id={id} />
        }
      </div>

    </DetailBase>
  );
};

export default App;
