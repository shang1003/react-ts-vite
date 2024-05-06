import { useTranslation } from "react-i18next";
import { Button } from "antd";
export const Download: React.FC<any> = (props) => {
    const { t } = useTranslation();
    const { item } = props;
    const handle = () => {
        window.open(`api/network-disk/download/${item.url}`)
    }
    return (
        <>
            <Button onClick={handle} type="link">{t('download')}</Button>
        </>
    );
};


