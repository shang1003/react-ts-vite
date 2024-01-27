import { useTranslation } from "react-i18next";
import { useFormModal } from "~/hooks/modal/FormModal";
import { Button } from "antd";
import { editTeacher } from "~/client/teacher";
export const Edit: React.FC<any> = (props) => {
  const { t } = useTranslation();
  const validatePhoneNumber = (_: any, value: any) => {
    if (value && !/^1[0-9]{10}$/.test(value)) {
      return Promise.reject(t('please enter a valid 11-digit phone number.'));
    }
    return Promise.resolve();
  };
  const { item, refresh } = props;
  const formItems = [
    {
      name: "name",
      label: t("username"),
      type: "input",
      disabled: true,
    },
    {
      name: "phone",
      label: t("phone"),
      type: "input",
      validator: validatePhoneNumber,
      required: true,
    },
    {
      name: "id_card_number",
      label: t("id card"),
      type: "input",
      required: true,
    },
    {
      name: "bank_account_number",
      label: t("bank account"),
      type: "input",
      required: true,
    },

  ];
  const [toggle, FormModal] = useFormModal({
    submit: (values) => editTeacher(values),
    formItems,
    refresh,

    title: t("edit"),
    id: item.teacher_id,
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
