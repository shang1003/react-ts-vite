import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
export const TeacherSalary: React.FC<any> = (props) => {
    const { t } = useTranslation();
    const { item } = props;
    return (
        <>
            <Link to={`/teacher-management/teacher-list/teacher-salary/${item.teacher_id}`}>{t('teacher salary')}</Link>
        </>
    );
};


