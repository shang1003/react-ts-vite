import { useState } from "react";
import { Button } from "antd";
import { useFetch, useRefresh } from "~/hooks";
import { useFormModal } from "~/hooks/modal/FormModal";
import { getStudentList, createStudent } from "~/client/student";
import { useTranslation } from "react-i18next";
import styles from "./index.module.less";
import { actionConfigs } from "./action";
import { BaseTable } from "~/components/base-table";
import { getTime } from "~/utils";
const TableCom: React.FC = () => {
    const { t } = useTranslation();
    const formItems = [
        {
            name: "name",
            label: t("username"),
            type: "input",
            colNum: 2,
            required: true,
        },
        {
            name: "phone",
            label: t("phone"),
            type: "input",
            colNum: 2,
            required: true,
        },
        {
            name: "purchase_date",
            label: t("purchase date"),
            type: "date-picker",
            colNum: 2,
            required: true,
        },
        {
            name: "course_unit_price",
            label: t("course unit price"),
            type: "input",
            colNum: 2,
            required: true,
        },
        {
            name: "total_hours",
            label: t("total hours"),
            type: "input",
            colNum: 2,
            required: true,
        },
        {
            name: "total_amount",
            label: t("total amount"),
            type: "input",
            colNum: 2,
            required: true,
        },
        {
            name: "notes",
            label: t("notes"),
            type: "textarea",
            labelCol: { span: 4 },
            wrapperCol: { span: 19 }

        },
    ];
    const columns = [
        {
            title: t('index'),
            dataIndex: 'index',
            width: 70,
            fixed: 'left',
        },
        {
            title: t("username"),
            dataIndex: "name",
            width: 100,
            fixed: 'left',

        },
        {
            title: t("phone"),
            dataIndex: "phone",
            width: 100
        },
        {
            title: t("purchase date"),
            dataIndex: "purchase_date",
            render: (v: any) => getTime(v),
            width: 150
        },
        {
            title: t("course unit price"),
            dataIndex: "course_unit_price",
            width: 150
        },
        {
            title: t("total hours"),
            dataIndex: "total_hours",
            width: 120
        },
        {
            title: t("total amount"),
            dataIndex: "total_amount",
            width: 120
        },
        {
            title: t("notes"),
            dataIndex: "notes",
            width: 100
        },
    ];
    const [refreshKey, refresh] = useRefresh();
    const [toggle, FormModal] = useFormModal({
        height: 350,
        width: 800,
        submit: (values) => createStudent(values),
        formItems,
        refresh,
        formProps: {
            successTip: t("{{name}} success", { name: t("create") }),
        }
    });
    const [data, setData] = useState<any | []>([]);
    const [loading, setLoading] = useState(true);
    useFetch(
        async () => {
            setLoading(true);
            return await getStudentList();
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
                <Button
                    type="primary"
                    style={{ marginBottom: "10px" }}
                    onClick={() => toggle(true)}
                >
                    {t("create")}
                </Button>
            </div>
            <FormModal />
            <BaseTable
                rowKey="id"
                columns={columns}
                data={data}
                scrollY='calc(100vh - 272px)'
                loading={loading}
                actions={actionConfigs}
                refresh={refresh}
                otherProps={{ pagination: { pageSize: 10 } }}
            />
        </>
    );
};

export default TableCom;
