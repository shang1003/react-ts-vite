import { useState } from "react";
import { Button, Space } from "antd";
import { useFetch, useRefresh } from "~/hooks";
import { useFormModal } from "~/hooks/modal/FormModal";
import { getTime } from "~/utils";
import { getTeacherSalary, createTeacherSalary, getTeacherSalaryExcel } from "~/client/teacher";
import { useTranslation } from "react-i18next";
import styles from "./index.module.less";
import { actionConfigs } from "./action";
import { BaseTable } from "~/components/base-table";
import { download } from "~/utils";
const App: React.FC<dynamic.ComponentProps> = (props) => {
    const { id, name } = props;
    const [teacherSalary, setTeacherSalary] = useState<any>([])
    const [refreshKey, refresh] = useRefresh();
    const [loading, setLoading] = useState(true);
    const handleClick = () => {
        download(() => getTeacherSalaryExcel({ id, teacher_name: name }), '教师工资表')
    }
    useFetch(
        () => {
            setLoading(true)
            return getTeacherSalary({ id })
        },
        ({ data }) => {
            setLoading(false)
            setTeacherSalary(data.map((item, index) => ({ ...item, index: index + 1 })));

        },
        [refreshKey]
    );
    const { t } = useTranslation();
    const validateNumber = (_: any, value: any) => {
        if (value && !/^(-)?\d+(\.\d+)?$/.test(value)) {
            return Promise.reject(t('please enter a valid number.'));
        }
        return Promise.resolve();
    };
    const formItems = [

        {
            name: "salary_date",
            label: t("salary date"),
            type: "date-picker",
            required: true,
        },
        {
            name: "gross_salary",
            label: t("gross salary"),
            validator: validateNumber,
            type: "input",
            required: true,
        },
        {
            name: "bonuses_penalties",
            label: t("bonuses penalties"),
            validator: validateNumber,
            type: "input",
            required: true,
        },
        {
            name: "net_salary",
            label: t("net salary"),
            type: "input",
            disabled: true,
            validator: validateNumber,
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
            title: t("salary date"),
            dataIndex: "salary_date",
            render: (v: any) => getTime(v),
            width: 140,
        },
        {
            title: t("gross salary"),
            dataIndex: "gross_salary",
            width: 100,
        },
        {
            title: t("bonuses penalties"),
            dataIndex: "bonuses_penalties",
            width: 150,
        },
        {
            title: t("net salary"),
            dataIndex: "net_salary",
            width: 150,
        },
    ];
    const [toggle, FormModal, formRef] = useFormModal({
        submit: (values) => createTeacherSalary({ ...values, teacher_id: id }),
        formItems,
        refresh,
        formProps: {
            onValuesChange: (_: any, { gross_salary, bonuses_penalties }: any) => {
                formRef?.current.setFieldsValue({ net_salary: Number(gross_salary || 0) + Number(bonuses_penalties || 0) })
            },
            successTip: t("{{name}} success", { name: t("create") }),
        }
    });
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
            <BaseTable
                rowKey="id"
                columns={columns}
                data={teacherSalary}
                scrollY='calc(100vh - 272px)'
                loading={loading}
                actions={actionConfigs}
                refresh={refresh}
            />
        </>
    );
};

export default App;
