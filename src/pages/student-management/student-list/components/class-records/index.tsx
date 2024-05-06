import { useState } from "react";
import { useFetch } from "~/hooks";
import { getTime, renderLabel } from "~/utils";
import { getCoursetable } from "~/client/coursetable";
import { useTranslation } from "react-i18next";
import { BaseTable } from "~/components/base-table";

const dataMap: any = {
    1: "正常出勤",
    2: "取消课程",
    3: "体验课",
}
const App: React.FC<dynamic.ComponentProps> = (props) => {
    const { id, scrollY = 'calc(100vh - 220px)' } = props;
    const [teacherSalary, setTeacherSalary] = useState<any>([])
    const [loading, setLoading] = useState(true);

    useFetch(
        () => {
            setLoading(true)

            return getCoursetable({ student_id: id })
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
            title: t("chinese name"),
            dataIndex: "chinese_name",
            render: (_: any, record: any) => renderLabel(record.student?.chinese_name),
            width: 180,
        },
        {
            title: t("english name"),
            dataIndex: "egnlish_name",
            render: (_: any, record: any) => renderLabel(record.student?.english_name),
            width: 180,
        },
        {
            title: t("course time"),
            dataIndex: "date",
            width: 180,
        },
        {
            title: t("course name"),
            dataIndex: "name",
            ellipsis: true,
            width: 120,
        },
        {
            title: t("course status"),
            dataIndex: "status",
            render: (v: any) => dataMap[v] || "未开始",
            width: 120,
        },
        {
            title: t("operation date"),
            dataIndex: "created_time",
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
                scrollY={scrollY}
                loading={loading}
            />
        </>
    );
};

export default App;
