import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
export const CourseTable: React.FC<any> = (props) => {
    const { t } = useTranslation();
    const { item } = props;

    return (
        <>
            <Link to={`/teacher-management/teacher-list/course-table/${item.teacher_id}`}>{t('course table')}</Link>

        </>
    );
};


