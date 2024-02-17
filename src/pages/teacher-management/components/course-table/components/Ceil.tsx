import style from '../index.module.less'
import { useFormModal } from '~/hooks/modal/FormModal'
import { useTranslation } from "react-i18next";
import { message } from 'antd';
import { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { editCourseTable } from '~/client/user';
import root from '~/store/root';
interface CeilType {
    handleData?: (data: any) => void;
    teacher_id?: string;
    flex?: string;
    studentInfo?: { student_id: string, student_name: string };
    data: {
        id: string;
        name: string;//名称
        status?: string;// 课程状态
        row?: string;
        col?: string;
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
    const [content, setContent] = useState<any>(props.data)
    const { studentInfo } = props
    const { currentCeil, flex = "flex7" } = props
    const [isMenu, setIsMenu] = useState<boolean | undefined>(false)
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

        editCourseTable({ id, timeSlot: content.timeSlot, student_name: studentInfo?.student_name, student_id: studentInfo?.student_id, date: content.date, status: key, name: content.name, teacher_id: props.teacher_id }).then(() => {
            setContent({ ...content, status: key, name: content.name })
            message.success(`${t('edit success')}`)
        }).catch(() => {
            message.error(`${t('save failure')}`)
        })

    }
    const items: MenuProps['items'] = [
        { key: '1', label: "正常出勤" },
        { key: '2', label: "取消课程" },
        { key: '3', label: "体验课" },
    ];
    const handle = (e: any, id: string) => {
        if (!studentInfo?.student_id) {
            message.error(`${t('请绑定学员！')}`)
            return
        }

        if (!isOrgadm) {
            return
        }
        e.preventDefault()
        if (isMenu) {
            setIsMenu(false)
            // props.handleData && props.handleData({ id, isShowMenu: false })
        } else {

            if (!content.name) {
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
            name: "name",
            label: t("course description"),
            type: "input",
            required: true
        }
    ];
    const [toggle, FormModal] = useFormModal({
        submit:
            (values) => {
                return editCourseTable({ id, teacher_id: props.teacher_id, timeSlot: content.timeSlot, date: content.date, name: values.name, isChangeName: true, status: content.status })
            },
        title: t('course info'),
        formItems,
        formProps: {
            successTip: t("{{name}} success", { name: t("edit") }),
            initialValues: {
                ...{ name: content.name, color: content.status }
            },
        }
    });
    return <>
        <FormModal />
        <Dropdown placement="bottomLeft" open={isMenu} menu={{ items, onClick: handleSelect }} trigger={['contextMenu']}>
            < div onContextMenu={(e) => handle(e, content.id)} id={content.id} className={classNames(style.ceil, style[flex || 'flex8'])} style={{ backgroundColor: content.isDisabled && 'transparent' || colorMap[content.status] || '#fff', border: isMenu && "2px solid red" || '' }} onClick={handleClick} >{content?.name}</div>
        </Dropdown >

    </>
}