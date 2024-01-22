import { useState } from "react";
import { Button, Tag } from "antd";
import { useFetch, useRefresh } from "~/hooks";
import { useFormModal } from "~/hooks/modal/FormModal";
import { getStudentList, createStudent } from "~/client/student";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./index.module.less";
import { actionConfigs } from "./action";
import { BaseTable } from "~/components/base-table";
import { getTime } from "~/utils";
const noteMap: any = {
    1: <Tag color="red">体验课</Tag>,
    2: <Tag color="green">正式课</Tag>
}
const TableCom: React.FC = () => {
    const { t } = useTranslation();
    const validateNumber = (_: any, value: any) => {
        if (value && !/^\d+(\.\d+)?$/.test(value)) {
            return Promise.reject(t('please enter a valid number.'));
        }
        return Promise.resolve();
    };
    const validatePhoneNumber = (_: any, value: any) => {
        if (value && !/^1[0-9]{10}$/.test(value)) {
            return Promise.reject(t('please enter a valid 11-digit phone number.'));
        }
        return Promise.resolve();
    };
    const formItems = [
        {
            name: "name",
            label: t("student name"),
            type: "input",
            colNum: 2,
            required: true,
        },
        {
            name: "phone",
            label: t("phone"),
            type: "input",
            colNum: 2,
            validator: validatePhoneNumber,
            required: true,

        },
        {
            name: "channel",
            label: t("channel"),
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
            name: "course_category",
            label: t("course category"),
            type: "input",
            colNum: 2,
            required: true,
        },
        {
            name: "course_unit_price",
            label: t("course unit price"),
            validator: validateNumber,
            type: "input",
            colNum: 2,
            required: true,
        },
        {
            name: "total_hours",
            label: t("total hours"),
            validator: validateNumber,
            type: "input",
            colNum: 2,
            required: true,
        },
        {
            name: "total_amount",
            label: t("total amount"),
            validator: validateNumber,
            type: "input",
            colNum: 2,
            required: true,
        },
        {
            name: "remaining_class_hours",
            label: t("remaining hours"),
            type: "input",
            colNum: 2,
            required: true,
        },
        {
            name: "notes",
            label: t("notes"),
            type: "select",
            options: [
                { label: "体验课", value: "1" },
                { label: "正式课", value: "2" },
            ],
            colNum: 2,

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
            title: t("student name"),
            dataIndex: "name",
            width: 100,
            render: (value: any, { id }: any) => {
                return <Link to={`/student-management/student-list/detail/${id}`}>{value}</Link>;
            },
            fixed: 'left',

        },
        {
            title: t("phone"),
            dataIndex: "phone",
            width: 120
        },
        {
            title: t("channel"),
            dataIndex: "channel",
            width: 120
        },
        {
            title: t("purchase date"),
            dataIndex: "purchase_date",
            render: (v: any) => getTime(v),
            width: 170
        },
        {
            title: t("course category"),
            dataIndex: "course_category",
            width: 170
        },
        {
            title: t("course unit price"),
            dataIndex: "course_unit_price",
            ellipsis: true,
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
            title: t("remaining hours"),
            dataIndex: "remaining_class_hours",
            width: 170
        },
        {
            title: t("notes"),
            dataIndex: "notes",
            render: (v: any) => noteMap[v],
            ellipsis: true,
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
