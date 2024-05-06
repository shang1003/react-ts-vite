import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
export const Salary: React.FC<any> = (props) => {
    const { t } = useTranslation();
    const { item } = props;
    return (
        <>
            <Link to={`/salary-manage/user-list/detail/${item.id}`}>{t('salary')}</Link>
        </>
    );
};


