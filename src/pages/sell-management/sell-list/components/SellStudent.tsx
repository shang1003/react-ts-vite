import { useState } from "react";
import { useFetch, useRefresh } from "~/hooks";
import { createSellStudent, getSellStudent } from "~/client/sell";
import { useTranslation } from "react-i18next";
import { BaseTable } from "~/components/base-table";
import { useFormModal } from "~/hooks/modal/FormModal";
import { Button, Space } from "antd";
import styles from '@/pages/student-management/student-list/index.module.less'
import { actionConfigs } from "./sell-student-config";
const App: React.FC<dynamic.ComponentProps> = (props) => {
    const { id, scrollY = 'calc(100vh - 220px)' } = props;
    const [data, setData] = useState<any>([])
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();
    const [refreshKey, refresh] = useRefresh();
    const validateNumber = (_: any, value: any) => {
        if (value && !/^(-)?\d+(\.\d+)?$/.test(value)) {
            return Promise.reject(t('please enter a valid number.'));
        }
        return Promise.resolve();
    };
    const options: any[] = [
        {
            label: t('european and american formal classes'),
            value: 1
        },
        {
            label: t('philippines formal classes'),
            value: 2
        },
        {
            label: t('chinese teachers formal classes'),
            value: 3
        },
        {
            label: t('european and american trial classes'),
            value: 4
        },
        {
            label: t('philippines trial classes'),
            value: 5
        },
        {
            label: t('chinese teachers trial classes'),
            value: 6
        }
    ]
    const formItems: any[] = [
        {
            name: "date",
            label: t("date"),
            type: "date-picker",
            format: "YYYY-MM-DD",
            colNum: 2,
        },
        {
            name: "studentName",
            label: t("student name"),
            type: "input",
            colNum: 2,
        },
        {
            name: "phoneNumber",
            label: t("phone"),
            type: "input",
            colNum: 2,
        },
        {
            name: "basicInfo",
            label: t("basic info"),
            type: "textarea",
            colNum: 2,
        },
        {
            name: "trialClassTime",
            label: t("trial class time"),
            type: "input",
            colNum: 2,
        },
        {
            name: "courseCategory",
            label: t("course category"),
            type: "select",
            options,
            colNum: 2,
        },
        {
            name: "textbookName",
            label: t("textbook"),
            type: "input",
            colNum: 2,
        },
        {
            name: "lessonPrice",
            label: t("lesson price"),
            type: "input",
            validator: validateNumber,

            colNum: 2,
        },
        {
            name: "totalLessons",
            label: t("total hours"),
            type: "input",
            validator: validateNumber,
            colNum: 2,
        },
        {
            name: "totalAmount",
            label: t("total amount"),
            disabled: true,
            validator: validateNumber,
            type: "input",
            colNum: 2,
        },
        {
            name: "trialClassCount",
            label: t("trial class count"),
            type: "input",
            validator: validateNumber,
            colNum: 2,
        },
        {
            name: "trialClassSchedulingTest",
            label: t("experience class schedule"),
            type: "input-number",
            max: 1,
            min: 0,
            colNum: 2,
        },
        {
            name: "formalClassTest",
            label: t("formal class test"),
            type: "input-number",
            max: 1,
            min: 0,
            colNum: 2,
        },
    ];
    const [toggle, FormModal, formRef] = useFormModal({
        submit: (values: any) => {
            return createSellStudent({ salespersonId: id, ...values })
        },
        height: 350,
        width: 850,
        formItems,
        refresh,
        formProps: {
            onValuesChange: (_: any, { lessonPrice = 0, totalLessons = 0 }: any) => {
                formRef?.current.setFieldsValue({ totalAmount: lessonPrice * totalLessons })
            },
            initialValues: { role: "teacher" },
            successTip: t("{{name}} success", { name: t("create") }),
        }
    });


    useFetch(
        () => {
            setLoading(true)
            return getSellStudent({ salespersonId: id })
        },
        ({ data }) => {
            setLoading(false)
            setData(data.map((item: any, index: any) => ({ ...item, index: index + 1 })));

        },
        [refreshKey]
    );

    const columns: any[] = [
        {
            title: t('index'),
            dataIndex: 'index',
            width: 70,
            fixed: 'left',
        },
        {
            title: t('date'),
            dataIndex: 'date',
            width: 120,
        },
        {
            title: t('student name'),
            dataIndex: 'studentName',
            width: 120,
        },
        {
            title: t('phone'),
            dataIndex: 'phoneNumber',
            width: 120,
        },
        {
            title: t('basic info'),
            dataIndex: 'basicInfo',
            ellipsis: true,
            width: 200,
        },
        {
            title: t('trial class time'),
            dataIndex: 'trialClassTime',
            width: 160,
        },
        {
            title: t('course category'),
            dataIndex: 'courseCategory',
            render: (v: any) => options.find(item => item.value == v)?.label,
            width: 140,
        },
        {
            title: t('textbook'),
            dataIndex: 'textbookName',
            width: 120,
        },
        {
            title: t('lesson price'),
            dataIndex: 'lessonPrice',
            width: 120,
        },
        {
            title: t('total hours'),
            dataIndex: 'totalLessons',
            width: 120,
        },
        {
            title: t('total amount'),
            dataIndex: 'totalAmount',
            width: 120,
        },
        {
            title: t('trial class count'),
            dataIndex: 'trialClassCount',
            width: 160,
        },
        {
            title: t('experience class schedule'),
            dataIndex: 'trialClassSchedulingTest',
            width: 200,
        },
        {
            title: t('formal class test'),
            dataIndex: 'formalClassTest',
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
