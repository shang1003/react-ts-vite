import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { deleteStudent } from "~/client/student";
import { Button, Modal } from "antd";
import Notify from "~/components/notify";
export const BatchDelete: React.FC<any> = (props) => {
  const { t } = useTranslation();
  const { selectedRowKeys, refresh, isDisabled } = props;
  const [modal, contextHolder] = Modal.useModal();
  const content = t("are you sure delete?");

  const confirm = () => {
    modal.confirm({
      title: t("delete"),
      icon: <ExclamationCircleOutlined />,
      content,
      okText: t("confirm"),
      cancelText: t("cancel"),
      onOk: () => onOk(),
    });
  };
  const onOk = () => {
    return deleteStudent({ id: selectedRowKeys }).then(() => {
      Notify.success(
        t("success"),
        t("{{name}} success", { name: t("delete") })
      );
      refresh && refresh();
    });
  };

  return (
    <>
      <Button onClick={confirm} type="primary" disabled={isDisabled}>
        {t("batch delete")}
      </Button>
      {contextHolder}
    </>
  );
};
