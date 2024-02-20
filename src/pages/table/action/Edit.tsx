import { useTranslation } from "react-i18next";
import { useFormModal } from "~/hooks/modal/FormModal";
import { Button, Radio } from "antd";
import { editUser } from "~/client/user";
export const Edit: React.FC<any> = (props) => {
  const { t } = useTranslation();
  const { item, refresh } = props;
  const formItems = [
    {
      name: "name",
      label: t("username"),
      type: "input",
      colNum: 2,
      disabled: true,
      required: true,
    },
    {
      name: "phone",
      label: t("phone"),
      colNum: 2,
      type: "input",
    },
    {
      name: "id_card_number",
      colNum: 2,
      label: t("id card"),
      validateTrigger: "onBlur",
      type: "input",
    },
    {
      name: "bank_account_number",
      colNum: 2,
      label: t("bank account"),
      type: "input",
    },
    {
      label: t("description"),
      colNum: 2,
      name: "description",
      type: "textarea",
    },
  ];
  const [toggle, FormModal] = useFormModal({
    submit: (values) => editUser(values),
    formItems,
    height: 250,
    width: 600,
    refresh,
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
