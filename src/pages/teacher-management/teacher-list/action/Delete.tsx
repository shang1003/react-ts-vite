import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { deleteTeacher } from "~/client/teacher";
import { Button, Modal } from "antd";
import Notify from "~/components/notify";
export const Delete: React.FC<any> = (props) => {
  const { t } = useTranslation();
  const { item, refresh } = props;
  const [modal, contextHolder] = Modal.useModal();
  const content = t("are you sure delete {{name}}？", { name: item.name });
  const isDisabled = item.name == "admin" || item.name == "orgadm";

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
    return deleteTeacher({ id: item.teacher_id }).then(() => {
      Notify.success(
        t("success"),
        t("{{name}} success", { name: t("delete") })
      );
      refresh();
    }).catch(()=>{
      refresh();
      Notify.error(
        t("failure"),
        t("{{name}} failure", { name: t("delete") })
      );
    });
  };

  return (
    <>
      <Button onClick={confirm} type="link" danger disabled={isDisabled}>
        {t("delete")}
      </Button>
      {contextHolder}
    </>
  );
};
