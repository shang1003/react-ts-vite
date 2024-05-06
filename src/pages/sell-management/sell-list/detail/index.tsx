import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { DetailBase } from "~/components/detail";
import SellStudent from "../components/SellStudent";
import { useTranslation } from "react-i18next";
import styles from '../index.module.less';
const App: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const name = params.get('name');

  const { t } = useTranslation();
  const listUrl = "/sell-management/sell-list";
  return (

    <DetailBase {...{ listUrl, isShowRefresh: false }}>
      <div>
        <div className={styles['header-detail']}>
          {<span>{t("name")}</span>} : {<span>{name}</span>}
        </div>
        <SellStudent scrollY="calc(100vh - 280px)" id={id} />

      </div>
    </DetailBase>
  );
};

export default App;
