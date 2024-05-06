import { useTranslation } from "react-i18next";
import { Button } from "antd";
export const Preview: React.FC<any> = (props) => {
    const { t } = useTranslation();
    const { item } = props;
    const handle = () => {
        window.open('api/upload/network-disk/' + item.url)
    }
    return (
        <>
            <Button onClick={handle} type="link">{t('preview')}</Button>
        </>
    );
};


