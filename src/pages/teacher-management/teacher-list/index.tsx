import { useState } from "react";
import { Button, Radio } from "antd";
import { useFetch, useRefresh } from "~/hooks";
import { useFormModal } from "~/hooks/modal/FormModal";
import { getTeacherList, createTeacher } from "~/client/teacher";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./index.module.less";
import { actionConfigs } from "./action";
import { BaseTable } from "~/components/base-table";
const TableCom: React.FC = () => {
    const { t } = useTranslation();
    const validateNumber = (_: any, value: any) => {
        if (value && !/^\d+(\.\d+)?$/.test(value)) {
            return Promise.reject(t('please enter a valid number.'));
        }
        return Promise.resolve();
    };

    const formItems = [
        {
            name: "name",
            label: t("username"),
            type: "input",
            required: true,
        },
        {
            name: "gender",
            label: t("gender"),
            type: "input",
            component: <Radio.Group>
                <Radio value="male">{t('male')}</Radio>
                <Radio value="female">{t('female')}</Radio>
            </Radio.Group>,
            required: true,
        },
        {
            name: "id_card_number",
            label: t("id card"),
            type: "input",
            required: true,
        },
        {
            name: "bank_account_number",
            label: t("bank account"),
            type: "input",
            required: true,
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

            render: (value: any, { teacher_id }: any) => {
                return <Link to={`/teacher-management/teacher-list/detail/${teacher_id}`}>{value}</Link>;
            },
            fixed: 'left',

        },
        {
            title: t("gender"),
            dataIndex: "gender",
        },
        {
            title: t("id card"),
            dataIndex: "id_card_number",

        },
        {
            title: t("bank account"),
            dataIndex: "bank_account_number",

        },

    ];
    const [refreshKey, refresh] = useRefresh();
    const [toggle, FormModal] = useFormModal({

        submit: (values) => createTeacher(values),
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
