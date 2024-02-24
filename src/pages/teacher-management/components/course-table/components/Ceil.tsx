import style from '../index.module.less'
import { useFormModal } from '~/hooks/modal/FormModal'
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { message, Modal } from 'antd';
import Notify from "~/components/notify";
import { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { StudentType } from '~/client/teacher';
import { editCourseTable, deleteCourseTable } from '~/client/user';
import root from '~/store/root';
interface CeilType {
    handleData?: (data: any) => void;
    teacher_id?: string;
    flex?: string;
    studentList: StudentType[],
    refresh?: () => void;
    studentInfo?: { student_id: string, student_name: string };
    data: {
        id: string;
        name: string;//名称
        status?: string;// 课程状态
        row?: string;
        student_name?: string;
        student_id?: string;
        col?: string;
        timeSlot?: string;
        time?: string;
        date?: string;
        isDisabled?: boolean; //是否可以双击
    };
    currentCeil: { id?: string, isShowMenu?: boolean }
}
// 颜色映射
const colorMap: any = {
    1: "#00bc44",
    2: "grey",
    3: "red"
}
export const Ceil: React.FC<CeilType> = (props) => {
    const { t } = useTranslation();
    const isOrgadm = root.userinfo.role == "orgadm"
    const content = props.data
    const { studentList } = props
    const { currentCeil, flex = "flex7" } = props
    const [modal, contextHolder] = Modal.useModal();
    const [isMenu, setIsMenu] = useState<boolean | undefined>(false)
    const confirm = () => {
        modal.confirm({
            title: t("delete"),
            icon: <ExclamationCircleOutlined />,
            content: t("are you sure delete {{name}}？", { name: content.name }),
            okText: t("confirm"),
            cancelText: t("cancel"),
            onOk: () => onOk(),
        });
    };
    const onOk = () => {
        return deleteCourseTable({ id: content.id }).then(() => {
            Notify.success(
                t("success"),
                t("{{name}} success", { name: t("delete") })
            );
            props.refresh && props.refresh()
        });
    };
    // 单击
    const handleClick = () => {
        if (!isOrgadm) {
            return
        }
        // 取消右键列表
        props.handleData && props.handleData({ id: "", isShowMenu: false })
        // 打开弹框
        !props?.data?.isDisabled && toggle(true)
    }
    const handleSelect = ({ key }: any) => {
        //关闭右键列表
        setIsMenu(false)
        // 删除课程
        if (key == "4") {
            confirm()
            return
        }
        // 编辑课程
        editCourseTable({ id, timeSlot: content.timeSlot, student_name: content.student_name, student_id: content.student_id, date: content.date, status: key, name: content.name, teacher_id: props.teacher_id }).then(() => {
            message.success(`${t('edit success')}`)
            props.refresh && props.refresh()
        }).catch(() => {
            message.error(`${t('save failure')}`)
        })

    }
    const items: MenuProps['items'] = [
        { key: '1', label: t('normal attendance') },
        { key: '2', label: t('cancel course') },
        { key: '3', label: t('experience course') },
        { key: '4', label: t('delete course') }
    ];
    // 右键
    const handle = (e: any, id: string) => {
        if (content.isDisabled) {
            return
        }
        if (!isOrgadm) {
            return
        }
        if (!studentList.length) {
            message.error(`${t('please bind students')}`)
            return
        }
        e.preventDefault()
        if (isMenu) {
            setIsMenu(false)
        } else {
            // 没有课程名称和课程id禁止右键
            if (!content.name || !id) {
                return
            }
            setIsMenu(true)
            props.handleData && props.handleData({ id })
        }
    }
    useEffect(() => {
        if (currentCeil.id !== content.id) {
            setIsMenu(false)
        }
    }, [currentCeil])
    const id = props.data.id

    const formItems = [

        {
            name: "student",
            label: t("student"),
            type: "select",
            disabled: content.status,
            labelInValue: true,
            showSearch: true,
            filterOption: (input: string, option: any) => (option?.label ?? '').includes(input),
            options: studentList.map(item => ({ label: item.name, value: item.id })),
            required: true
        },
        {
            name: "name",
            label: t("course description"),
            type: "input",
            required: true
        }
    ];
    const [toggle, FormModal] = useFormModal({
        submit:
            (values) => {
                const { label: student_name, value: student_id } = values.student
                return editCourseTable({ id, student_name, student_id, teacher_id: props.teacher_id, timeSlot: content.timeSlot, date: content.date, name: values.name, isChangeName: true, status: content.status }).then(() => {
                })
            },
        height: 250,
        title: t('course info'),
        formItems,
        refresh: props.refresh,
        formProps: {
            successTip: t("{{name}} success", { name: t("edit") }),
            initialValues: {
                name: content.name,
                student: content.student_id && { value: content.student_id, label: content.student_name }
            }

        }
    });

    return <>
        <FormModal />
        {contextHolder}
        <Dropdown placement="bottomLeft" open={isMenu} menu={{ items, onClick: handleSelect }} trigger={['contextMenu']}>
            < div key={content?.name} onContextMenu={(e) => handle(e, content.id)} id={content.id} className={classNames(style.ceil, style[flex || 'flex8'])} style={{ backgroundColor: content.isDisabled && 'transparent' || colorMap[content.status || 0] || '#fff', border: isMenu && "2px solid red" || '' }} onClick={handleClick} >{content?.name}</div>
        </Dropdown >

    </>
}