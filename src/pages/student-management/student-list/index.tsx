import { useState } from "react";
import { Button, Tag, Radio } from "antd";
import { useFetch, useRefresh } from "~/hooks";
import { useFormModal } from "~/hooks/modal/FormModal";
import { getStudentList, createStudent, getStudentExcel, uploadStudents } from "~/client/student";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./index.module.less";
import { actionConfigs } from "./action";
import { BaseTable } from "~/components/base-table";
import { BatchDelete } from "./action/BatchDelete";
import { getTime, download } from "~/utils";

const noteMap: any = {
    1: <Tag color="red">体验课</Tag>,
    2: <Tag color="green">正式课</Tag>
}
const TableCom: React.FC = () => {
    const { t } = useTranslation();
const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [modalData, setModalData] = useState<any>({})
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
      };
      const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
      };
    const validateNumber = (_: any, value: any) => {
        if (value && !/^\d+(\.\d+)?$/.test(value)) {
            return Promise.reject(t('please enter a valid number.'));
        }
        return Promise.resolve();
    };
    const handleClick = () => {
        download(getStudentExcel, '学员信息')
    }
    const avatarFormItems = [{
        type: 'upload',
        name: "content",
        required: true,
        beforeUpload: () => false,
        label: t('select file')
    }]

    const open = (v: any) => {
        if (v == "create") {
            setModalData(
                {
                    height: 350,
                    width: 800,
                    submit: (values: any) => createStudent(values),
                    formItems,
                    refresh,
                    formProps: {
                        successTip: t("{{name}} success", { name: t("create") }),
                    }
                }
            )
        } else {
            setModalData({
                submit: async (values: any) => {
                    const data: any = await uploadStudents(values.content)
                    return data
                },
                refresh,
                title: t('upload file'),
                formItems: avatarFormItems,
                formProps: { successTip: t("{{name}} success", { name: t("upload avatar") }) }
            })
            toggle(true)
        }
        toggle(true)

    }
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
            required: true,
        },
        {
            name: "gender",
            label: t("gender"),
            type: "input",
            colNum: 2,
            component: <Radio.Group>
                <Radio value="male">{t('male')}</Radio>
                <Radio value="female">{t('female')}</Radio>
            </Radio.Group>,
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
            width: 120,
            render: (value: any, { id }: any) => {
                return <Link to={`/student-management/student-list/detail/${id}`}>{value}</Link>;
            },
            fixed: 'left',

        },
        {
            title: t("gender"),
            dataIndex: "gender",
            width: 120
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
    const [toggle, FormModal] = useFormModal(modalData);
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
                <div className={styles['button-group']}>
                    <Button
                        type="primary"
                        onClick={() => open("create")}
                    >
                        {t("create")}
                    </Button>
                    <BatchDelete selectedRowKeys={selectedRowKeys} refresh={refresh} isDisabled={!data.length}/>
                </div>
                <div className={styles['button-group']}>
                    <Button
                        type="primary"

                        onClick={handleClick}
                    >
                        {t("import")}
                    </Button>
                    <Button
                        type="primary"

                        onClick={() => open("upload")}
                    >
                        {t("upload file")}
                    </Button>
                </div>
            </div>
            <FormModal />
            <BaseTable
               rowSelection={rowSelection}
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
