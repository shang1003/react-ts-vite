import { useState } from "react";
import { useFetch } from "~/hooks";
import { getTime } from "~/utils";
import { getClassRecords } from "~/client/teacher";
import { useTranslation } from "react-i18next";
import { BaseTable } from "~/components/base-table";

const dataMap: any = {
    1: "正常出勤",
    2: "取消课程",
    3: "体验课"

}
const App: React.FC<dynamic.ComponentProps> = (props) => {
    const { id } = props;
    const [teacherSalary, setTeacherSalary] = useState<any>([])
    const [loading, setLoading] = useState(true);

    useFetch(
        () => {
            setLoading(true)

            return getClassRecords({ student_id: id })
        },
        ({ data }) => {
            setLoading(false)
            setTeacherSalary(data.map((item, index) => ({ ...item, index: index + 1 })));

        },
        []
    );

    const { t } = useTranslation();
    const columns = [
        {
            title: t('index'),
            dataIndex: 'index',
            width: 70,
            fixed: 'left',
        },
        {
            title: t("username"),
            dataIndex: "student_name",
            width: 180,
        },
        {
            title: t("course time"),
            dataIndex: "class_time",
            width: 180,
        },
        {
            title: t("course name"),
            dataIndex: "course",
            ellipsis: true,
            width: 120,
        },
        {
            title: t("course status"),
            dataIndex: "status",
            render: (v: any) => dataMap[v],
            width: 120,
        },
        {
            title: t("operation date"),
            dataIndex: "operation_date",
            render: (v: any) => getTime(v),
            width: 150,
        },
    ];
    return (
        <>
            <BaseTable
                rowKey="id"
                hasItemActions={false}
                columns={columns}
                data={teacherSalary}
                scrollY='calc(100vh - 270px)'
                loading={loading}
            />
        </>
    );
};

export default App;
