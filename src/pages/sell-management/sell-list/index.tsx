import { useState } from "react";
import { useFetch, useRefresh } from "~/hooks";
import { renderLabel } from "~/utils";
import { createSell, getSell } from "~/client/sell";
import { useTranslation } from "react-i18next";
import { BaseTable } from "~/components/base-table";
import { useFormModal } from "~/hooks/modal/FormModal";
import { Button, Space } from "antd";
import styles from '@/pages/student-management/student-list/index.module.less'
import { Link } from "react-router-dom";
import { actionConfigs } from "./action";
const App: React.FC<dynamic.ComponentProps> = (props) => {
    const { scrollY = 'calc(100vh - 230px)' } = props;
    const [data, setData] = useState<any>([])
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();
    const [refreshKey, refresh] = useRefresh();
    const formItems: any[] = [

        {
            name: "name",
            label: t("name"),
            type: "input",

        },
        {
            name: "description",
            label: t("description"),
            type: "textarea",

        },

    ];
    const [toggle, FormModal] = useFormModal({
        submit: (values) => {
            return createSell(values)
        },
        formItems,
        refresh,
        formProps: {
            initialValues: { role: "teacher" },
            successTip: t("{{name}} success", { name: t("create") }),
        }
    });


    useFetch(
        () => {
            setLoading(true)
            return getSell()
        },
        ({ data }) => {
            setLoading(false)
            setData(data.map((item: any, index: any) => ({ ...item, index: index + 1 })));

        },
        [refreshKey]
    );

    const columns = [
        {
            title: t('index'),
            dataIndex: 'index',
            width: 70,
            fixed: 'left',
        },
        {
            title: t('name'),
            dataIndex: 'name',
            render: (value: any, { id, name }: any) => {
                return <Link to={`/sell-management/sell-list/detail/${id}?name=${name}`}>{value}</Link>;
            },
            width: 150,
        },

        {
            title: t("description"),
            dataIndex: "description",
            width: 180,
            render: renderLabel,
            ellipsis: true,
        },
        {
            title: t("operation date"),
            dataIndex: "updated_time",
            width: 180,
        },
    ];
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
                </Space>
            </div>
            <FormModal />
            <BaseTable
                rowKey="id"
                columns={columns}
                data={data}
                scrollY={scrollY}
                loading={loading}
                actions={actionConfigs}
                refresh={refresh}
            />
        </>
    );
};

export default App;
