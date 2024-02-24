import { useState, useRef } from "react";
import { Button, Space, Tag, Radio, message, Input, Select } from "antd";
import { useFetch, useRefresh } from "~/hooks";
import { useFormModal } from "~/hooks/modal/FormModal";
import { getStudentList, createStudent, getStudentExcel, uploadStudents } from "~/client/student";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./index.module.less";
import { actionConfigs } from "./action";
import { BaseTable } from "~/components/base-table";
import { BatchDelete } from "./action/BatchDelete";
import { getTime, download, renderLabel } from "~/utils";
const { Search } = Input;

const transformNum = (v: any) => {
    return Number(v || 0)
}
const TableCom: React.FC = () => {
    const { t } = useTranslation();
    const noteMap: any = {
        1: <Tag color="red">{t('experience course')}</Tag>,
        2: <Tag color="green">{t('formal course')}</Tag>
    }
    const modelRef = useRef<any>(null);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [modalData, setModalData] = useState<any>({})
    const [classInfo, setClassInfo] = useState<any>({})
    const [searchData, setSearchData] = useState<any>({})
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const onSearch = (v: string) => {
        setSearchData({ name: v, notes: searchData.notes })
    }
    const handleSelect = (v: string) => {
        setSearchData({ name: searchData.name, notes: v })
    }
    const validateNumber = (_: any, value: any) => {
        if (value && !/^\d+(\.\d+)?$/.test(value)) {
            return Promise.reject(t('please enter a valid number.'));
        }
        return Promise.resolve();
    };
    const validateInNumber = (_: any, value: any) => {
        if (value && !/^\d+$/.test(value)) {
            return Promise.reject(t('please enter a valid integer'));
        }
        return Promise.resolve();
    };
    const handleClick = () => {
        download(getStudentExcel, '学员信息')
    }
    const beforeUpload = (file: any, err: any) => {
        if (!file.name.includes('.xls') && !file.name.includes('.xlsx')) {
            message.error(t('please upload els or elsx files'))
            return err
        }

        return false
    }
    const avatarFormItems = [{
        type: 'upload',
        name: "content",
        required: true,
        beforeUpload: beforeUpload,
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
                        onValuesChange: (_: any, { course_unit_price, total_hours }: any) => {
                            formRef?.current.setFieldsValue({ total_amount: course_unit_price * total_hours })
                        },
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
                <Radio value="男">{t('male')}</Radio>
                <Radio value="女">{t('female')}</Radio>
            </Radio.Group>,
            required: true,
        },
        {
            name: "purchase_date",
            label: t("purchase date"),
            type: "date-picker",
            colNum: 2,
        },
        {
            name: "student_bg",
            label: t("student background"),
            type: "input",
            colNum: 2,
        },

        {
            name: "channel",
            label: t("channel"),
            type: "input",
            colNum: 2,
        },
        {
            name: "course_category",
            label: t("course category"),
            type: "input",
            colNum: 2,
        },
        {
            name: "course_unit_price",
            label: t("course unit price"),
            validator: validateNumber,

            type: "input",
            colNum: 2,
        },
        {
            name: "total_hours",
            label: t("total hours"),
            validator: validateInNumber,
            type: "input",
            colNum: 2,
        },
        {
            name: "total_amount",
            label: t("total amount"),
            disabled: true,
            validator: validateNumber,
            type: "input",
            colNum: 2,
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
            title: t("total hours"),
            dataIndex: "total_hours",
            render: renderLabel,
            width: 120
        },
        {
            title: t("total amount"),
            dataIndex: "total_amount",
            render: renderLabel,
            width: 120
        },
        {
            title: t("remaining hours"),
            dataIndex: "remaining_class_hours",
            render: renderLabel,
            width: 170
        },
        {
            title: t("course unit price"),
            dataIndex: "course_unit_price",
            render: renderLabel,
            ellipsis: true,
            width: 150
        },
        {
            title: t("teacher"),
            dataIndex: "teacher_name",
            render: renderLabel,
            ellipsis: true,
            width: 150
        },
        {
            title: t("phone"),
            dataIndex: "phone",
            render: renderLabel,
            width: 140
        },
        {
            title: t("gender"),
            dataIndex: "gender",
            width: 120
        },

        {
            title: t("channel"),
            dataIndex: "channel",
            render: renderLabel,
            width: 120
        },
        {
            title: t("notes"),
            dataIndex: "notes",
            render: (v: any) => noteMap[v] || "-",
            ellipsis: true,
            width: 100
        },
        {
            title: t("student background"),
            dataIndex: "student_bg",
            render: renderLabel,
            width: 200
        },
        {
            title: t("purchase date"),
            dataIndex: "purchase_date",
            render: getTime,
            width: 170
        },
        {
            title: t("course category"),
            dataIndex: "course_category",
            render: renderLabel,
            width: 170
        },
    ];
    const [refreshKey, refresh] = useRefresh();

    const [toggle, FormModal, formRef] = useFormModal(modalData);

    const [data, setData] = useState<any | []>([]);
    const [loading, setLoading] = useState(true);
    useFetch(
        async () => {
            setLoading(true);
            return await getStudentList(searchData);
        },
        (res) => {
            setData(res.data.map((item, index) => ({ ...item, index: index + 1 })));

            if (res.data.length) {
                const data = (res.data as any).reduce((pre: any, cur: any) => {
                    return {
                        total_amount: transformNum(pre.total_amount) + transformNum(cur.total_amount),
                        total_hours: transformNum(pre.total_hours) + transformNum(cur.total_hours),
                        remaining_class_hours: transformNum(pre.remaining_class_hours) + transformNum(cur.remaining_class_hours)

                    }
                })
                setClassInfo(data)
            } else {
                setClassInfo({})
            }
            setLoading(false);
        },
        [refreshKey, searchData]
    );

    return (
        <>
            <div className={styles.foot}>
                <Space>
                    <span>
                        <span>{t('total amount')}：</span>
                        <span>{(Number(classInfo.total_amount || 0)).toFixed(2)} {t('RMB')}</span>
                    </span>
                    <span>
                        <span>{t('total hours')}：</span>
                        <span>{classInfo.total_hours || "0"}</span>
                    </span>
                    <span>
                        <span>{t('total remaining hours')}：</span>
                        <span>{classInfo.remaining_class_hours || "0"}</span>
                    </span>
                </Space>
            </div>
            <div className={styles["header"]}>
                <Space>
                    <Search placeholder={t('please enter the student name')} allowClear enterButton={t('search')} onSearch={onSearch} />
                    <Select
                        defaultValue="all"
                        style={{ width: 120 }}
                        onChange={handleSelect}
                        options={[
                            { value: 'all', label: t('all') },
                            { value: '2', label: t('formal course') },
                            { value: '1', label: t('experience course') },
                        ]}
                    />
                    <Button
                        type="primary"
                        onClick={() => open("create")}
                    >
                        {t("create")}
                    </Button>
                    <BatchDelete selectedRowKeys={selectedRowKeys} refresh={refresh} isDisabled={!selectedRowKeys.length} />
                    <Button
                        type="primary"

                        onClick={handleClick}
                    >
                        {t("export")}
                    </Button>
                    <Button
                        type="primary"
                        onClick={() => open("upload")}
                    >
                        {t("upload file")}
                    </Button>
                </Space>
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
            />

        </>
    );
};

export default TableCom;
