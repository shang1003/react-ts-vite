import { useTranslation } from "react-i18next";
import { useFormModal } from "~/hooks/modal/FormModal";
import { Button } from "antd";
import { editSell } from "~/client/sell";
export const Edit: React.FC<any> = (props) => {
  const { t } = useTranslation();

  const { item, refresh } = props;
  const formItems = [
    {
      name: "description",
      label: t("description"),
      type: "textarea",

    },
  ];
  const [toggle, FormModal, formRef] = useFormModal({
    submit: (values) => editSell(item.id, values),
    formItems,
    refresh,
    top: 10,
    title: t("edit"),
    id: item.id,

    formProps: {
      initialValues: {
        ...item,
      },
    },
  });
  return (
    <>
      <Button onClick={() => toggle(true)} type="link">
        {t("edit")}
      </Button>
      <FormModal />
    </>
  );
};
