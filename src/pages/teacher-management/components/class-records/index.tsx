import { useState } from "react";
import { useFetch, useRefresh } from "~/hooks";
import { getTime } from "~/utils";
import { getClassRecords, getClassRecordsExcel } from "~/client/teacher";
import { useTranslation } from "react-i18next";
import { actionConfigs } from "./action";
import { BaseTable } from "~/components/base-table";
import { Button } from "antd";
import styles from "./index.module.less";
import { download } from "~/utils";
const dataMap: any = {
    1: "正常出勤",
    2: "取消课程",
    3: "体验课"

}
const App: React.FC<dynamic.ComponentProps> = (props) => {
    const { id, name } = props;
    const [teacherSalary, setTeacherSalary] = useState<any>([])
    const [refreshKey, refresh] = useRefresh();
    const [loading, setLoading] = useState(true);

    useFetch(
        () => {
            setLoading(true)

            return getClassRecords({ id, teacher_name: name })
        },
        ({ data }) => {
            setLoading(false)
            console.log(data, "data");

            setTeacherSalary(data.map((item, index) => ({ ...item, index: index + 1 })));

        },
        [refreshKey]
    );

    const handleClick = () => {
        download(() => getClassRecordsExcel({ id, teacher_name: name }), '教师上课记录')
    }
    const { t } = useTranslation();
    const columns = [
        {
            title: t('index'),
            dataIndex: 'index',
            width: 70,
            fixed: 'left',
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
        {
            title: t("remarks"),
            dataIndex: "remarks",
            ellipsis: true,
            width: 150,
        },
    ];
    return (
        <>
            <div className={styles["header"]}>
                <Button
                    type="primary"

                    onClick={handleClick}
                >
                    {t("export")}
                </Button>
            </div>
            <BaseTable
                rowKey="id"
                columns={columns}
                data={teacherSalary}
                scrollY='calc(100vh - 312px)'
                loading={loading}
                actions={actionConfigs}
                refresh={refresh}
            />
        </>
    );
};

export default App;
