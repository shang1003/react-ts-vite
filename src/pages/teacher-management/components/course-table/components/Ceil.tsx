import style from '../index.module.less'
import { useFormModal } from '~/hooks/modal/FormModal'
import { useTranslation } from "react-i18next";
import { message } from 'antd';
import { useState, useEffect } from 'react';
import { Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { editCourseTable } from '~/client/user';

interface CeilType {
    handleData?: (data: any) => void,
    data: {
        id: string,
        name: string;//名称
        status?: string;// 课程状态
        isDisabled?: boolean; //是否可以双击
    },
    currentCeil: { id?: string, isShowMenu?: boolean }
}
// 颜色映射
const colorMap: any = {
    1: "#00bc44",
    2: "#ff9300",
    3: "yellow"
}
export const Ceil: React.FC<CeilType> = (props) => {
    const { t } = useTranslation();
    const [content, setContent] = useState<any>(props.data)
    const { currentCeil } = props
    const [isMenu, setIsMenu] = useState<boolean | undefined>(false)
    const handleClick = () => {
        // 取消右键列表
        props.handleData && props.handleData({ id: "", isShowMenu: false })
        // 打开弹框
        !props?.data?.isDisabled && toggle(true)
    }
    const handleSelect = ({ key }: any) => {
        //关闭右键列表
        setIsMenu(false)
        editCourseTable({ id, status: key, name: content.name }).then(() => {
            setContent({ status: key, name: content.name })
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
        e.preventDefault()
        if (isMenu) {
            props.handleData && props.handleData({ id, isShowMenu: false })
        } else {
            props.handleData && props.handleData({ id, isShowMenu: true })
        }
    }
    useEffect(() => {
        if (currentCeil.id == content.id) {
            setIsMenu(currentCeil.isShowMenu)
        } else {
            setIsMenu(false)
        }
    }, [currentCeil])
    const id = props.data.id
    const formItems = [
        {
            name: "name",
            label: t("course description"),
            type: "input",
        }
    ];
    const [toggle, FormModal] = useFormModal({
        submit:
            (values) => {
                setContent({...content,...values})
                return editCourseTable({ id, ...values })
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
            < div onContextMenu={(e) => handle(e, content.id)} id={content.id} className={style.ceil} style={{ backgroundColor: content.disabled && 'transparent' || colorMap[content.status], border: isMenu && "2px solid red" || '' }} onClick={handleClick} >{content?.name}</div>
        </Dropdown >

    </>
}