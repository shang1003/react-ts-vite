import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
export const ClassRecord: React.FC<any> = (props) => {
    const { t } = useTranslation();
    const { item } = props;
    return (
        <>
            <Link to={`/teacher-management/teacher-list/class-records/${item.id}`}>{t('class record')}</Link>
        </>
    );
};


