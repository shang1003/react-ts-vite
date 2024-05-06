import { useState } from "react";
import { Button, message, Space } from "antd";
import { getNetworkDiskList, uploadNetworkDisk, NetworkDiskType } from "~/client/networkDisk";
import { useFetch, useRefresh } from "~/hooks";
import { useFormModal } from "~/hooks/modal/FormModal";
import { useTranslation } from "react-i18next";
import styles from "./index.module.less";
import { actionConfigs } from "./action";
import { BaseTable } from "~/components/base-table";
import root from "~/store/root";
const TableCom: React.FC = () => {

    const [data, setData] = useState<NetworkDiskType[]>([])
    const { t } = useTranslation();
    let filename = '';
    const id = root.userinfo.id;
    const beforeUpload = (file: any, err: any) => {
        filename = file.name
        return false
    }
    const formItems = [{
        type: 'upload',
        name: "content",
        required: true,
        beforeUpload: beforeUpload,
        label: t('select file')
    }]
    const columns = [
        {
            title: t('index'),
            dataIndex: 'index',
            width: 70,
        },
        {
            title: t('courseware'),
            dataIndex: 'name',
        },
        {
            title: t('create time'),
            dataIndex: 'created_time',
        },
    ];
    const [refreshKey, refresh] = useRefresh();
    const [toggle, FormModal] = useFormModal({
        submit: (values: any) => {
            return uploadNetworkDisk(root.userinfo.id, values.content, filename)
        },
        formItems,

        refresh,
        formProps: {
            initialValues: { role: "teacher" },
            successTip: t("{{name}} success", { name: t("create") }),
        }
    });
    const [loading, setLoading] = useState(true);
    useFetch(
        async () => {
            setLoading(true);
            return await getNetworkDiskList();
        },
        ({ data }) => {
            setData(data.map((item, index) => ({ ...item, index: index + 1 })));
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
                        {t("upload file")}
                    </Button>
                </Space>
            </div>
            <FormModal />
            <BaseTable
                rowKey="id"
                columns={columns}
                data={data}
                scrollY='calc(100vh - 272px)'
                loading={loading}
                actionsWidth={220}
                actions={actionConfigs}
                refresh={refresh}
            />
        </>
    );
};

export default TableCom;
