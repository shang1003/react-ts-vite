import { Button } from "antd";
import { SyncOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import styles from "./index.module.less";
import { useNavigate } from "react-router-dom";
interface DetailBaseType {
  children: JSX.Element;
  listUrl: string;
  handleRefresh?: () => void;
  isShowRefresh?: boolean;
}
import { useTranslation } from "react-i18next";
export const DetailBase: React.FC<DetailBaseType> = ({
  children,
  listUrl,
  isShowRefresh,
  handleRefresh = () => {},
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const goBack = () => {
    navigate(listUrl);
  };

  const detailTitle = () => {
    return (
      <div className={styles["title"]}>
        <Button onClick={goBack} type='link'>
          <ArrowLeftOutlined />
          {t("back")}
        </Button>
        {isShowRefresh && <Button type='link' icon={<SyncOutlined />} onClick={handleRefresh} />}
      </div>
    );
  };

  const renderDetailInfo = () => {
    return (
      <>
        {detailTitle()}
        {children}
      </>
    );
  };

  return (
    <div>
      <div className={styles.header}>{renderDetailInfo()}</div>
    </div>
  );
};
