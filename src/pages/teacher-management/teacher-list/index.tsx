import { useState } from "react";
import { Button, Space } from "antd";
import { useFetch, useRefresh } from "~/hooks";
import { getTeacherList, getTeacherExcel } from "~/client/teacher";
import { useTranslation } from "react-i18next";
import styles from "./index.module.less";
import { actionConfigs } from "./action";
import { download, renderLabel } from "~/utils";
import { BaseTable } from "~/components/base-table";
const TableCom: React.FC = () => {
    const { t } = useTranslation();


    const handleClick = () => {
        download(getTeacherExcel, '教师信息')
    }
    const columns = [
        {
            title: t('index'),
            dataIndex: 'index',
            width: 70,
            ellipsis: true,
            fixed: 'left',
        },
        {
            title: t("教师"),
            dataIndex: "name",
            width: 120,
            ellipsis: true,
            fixed: 'left',
        },
        {
            title: t("学员"),
            dataIndex: "student_name",
            width: 120,
            render: renderLabel,
            ellipsis: true,
            fixed: 'left',
        },
        {
            title: t("gender"),
            dataIndex: "gender",
            ellipsis: true,
            width: 100,
        },
        {
            title: t("phone"),
            dataIndex: "phone",
            ellipsis: true,
            width: 120,
        },
        {
            title: t("id card"),
            dataIndex: "id_card_number",
            ellipsis: true,
            width: 100,

        },
        {
            title: t("bank account"),
            ellipsis: true,
            dataIndex: "bank_account_number",
            width: 100
        },

    ];
    const [refreshKey, refresh] = useRefresh();

    const [data, setData] = useState<any | []>([]);
    const [loading, setLoading] = useState(true);
    useFetch(
        async () => {
            setLoading(true);
            return await getTeacherList();
        },
        (res) => {
            setData(res.data.map((item, index) => ({ ...item, index: index + 1 })));
            setLoading(false);
        },
        [refreshKey]
    );

    return (
        <>
            <div className={styles["header"]}>
                <Space>
                    <Button
                        type="primary"

                        onClick={handleClick}
                    >
                        {t("export")}
                    </Button>
                </Space>
            </div>

            <div style={{ height: "600px" }}>
                <BaseTable
                    rowKey="id"
                    columns={columns}
                    data={data}
                    scrollY='calc(100vh - 272px)'
                    loading={loading}
                    actions={actionConfigs}
                    refresh={refresh}
                />
            </div>
        </>
    );
};

export default TableCom;
