import { useTranslation } from "react-i18next";
import { useFormModal } from "~/hooks/modal/FormModal";
import { Button } from "antd";
import { editUser } from "~/client/user";
export const Edit: React.FC<any> = (props) => {
  const { t } = useTranslation();
  const { item, refresh } = props;
  const isDisabled = item.name == "admin" || item.name == "orgadm";
  const formItems = [
    {
      name: "name",
      label: t("username"),
      type: "input",
      required: true,
      disabled: isDisabled,
    },
    {
      label: t("age"),
      name: "age",
      type: "input",
      required: true,
    },
    {
      label: t("address"),
      name: "address",
      type: "input",
      required: true,
    },
    {
      label: t("description"),
      name: "description",
      type: "input",
    },
  ];
  const [toggle, FormModal] = useFormModal({
    submit: (values) => editUser(values),
    formItems,
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
