import { useState } from "react";
import { Button, Radio, Space } from "antd";
import { useFetch, useRefresh } from "~/hooks";
import { useFormModal } from "~/hooks/modal/FormModal";
import { getTeacherList, createTeacher, getTeacherExcel } from "~/client/teacher";
import { useTranslation } from "react-i18next";
import styles from "./index.module.less";
import { actionConfigs } from "./action";
import { download } from "~/utils";
import { BaseTable } from "~/components/base-table";
const TableCom: React.FC = () => {
    const { t } = useTranslation();
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
                <Radio value="男">{t('male')}</Radio>
                <Radio value="女">{t('female')}</Radio>
            </Radio.Group>,
            required: true,
        },
        {
            name: "phone",
            label: t("phone"),
            type: "input",
            required: true,
        },
        {
            name: "id_card_number",
            label: t("id card"),
            validateTrigger: "onBlur",
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
            title: t("username"),
            dataIndex: "name",
            width: 120,
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
                <Space>
                    <Button
                        type="primary"
                        onClick={() => toggle(true)}
                    >
                        {t("create")}
                    </Button>
                    <Button
                        type="primary"

                        onClick={handleClick}
                    >
                        {t("export")}
                    </Button>
                </Space>
            </div>
            <FormModal />
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
