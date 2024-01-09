import style from '../index.module.less'
import { useFormModal } from '~/hooks/modal/FormModal'
import { useTranslation } from "react-i18next";
import { useState } from 'react';
import { editCourseTable } from '~/client/user';
interface CeilType {
    data: {
        id: string,
        name: string;//名称
        isDisabled?: boolean; //是否可以双击
        bg_color?: string;//背景颜色
    }
}
export const Ceil: React.FC<CeilType> = (props) => {
    const { t } = useTranslation();
    const [content, setContent] = useState<any>(props.data)
    const id = props.data.id
    const formItems = [
        {
            name: "name",
            label: t("course description"),
            type: "input",
        },
        {
            name: "color",
            label: t("背景色"),
            type: "color-picker",
            presets:
                [
                    {
                        label: 'Recommended',
                        colors: [
                            '#000000',
                            '#F5222D',
                            '#FA8C16',
                            '#FADB14',
                            '#8BBB11',
                            '#52C41A',
                            '#13A8A8',
                            '#1677FF',
                            '#2F54EB',
                            '#722ED1',
                            '#EB2F96',
                            '#F5222D4D',
                            '#FA8C164D',
                            '#FADB144D',
                            '#8BBB114D',
                            '#52C41A4D',
                            '#13A8A84D',
                            '#1677FF4D',
                            '#2F54EB4D',
                            '#722ED14D',
                            '#EB2F964D',
                        ],
                    },

                ],
            tip: t('default transparent')
        },
    ];
    const [toggle, FormModal] = useFormModal({
        submit:
            (values) => {
                const { name, color } = values
                const isString = typeof (color) == 'string'
                const bg_color = `${isString && color || color?.toHexString()}`
                setContent({ name, bg_color })
                return editCourseTable({ id, name, bg_color })
            },
        title: t('course info'),
        formItems,
        formProps: {
            successTip: t("{{name}} success", { name: t("edit") }),
            initialValues: {
                ...{ name: content.name, color: content.bg_color }
            },
        }
    });
    return <>
        <FormModal />
        <div className={style.ceil} style={{ backgroundColor: content?.bg_color }} onDoubleClick={() => !props?.data?.isDisabled && toggle(true)} >{content?.name}</div>
    </>
}