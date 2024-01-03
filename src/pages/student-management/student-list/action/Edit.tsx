import { useTranslation } from "react-i18next";
import { useFormModal } from "~/hooks/modal/FormModal";
import { Button } from "antd";
import { editUser } from "~/client/user";
export const Edit: React.FC<any> = (props) => {
  const { t } = useTranslation();
  const { item, refresh } = props;
  const formItems = [
    {
      name: "name",
      label: t("username"),
      type: "input",
      disabled: true,
      colNum: 2,
    },
    {
      name: "phone",
      label: t("phone"),
      type: "input",
      colNum: 2,
      required: true,
    },
    {
      name: "purchase_date",
      label: t("purchase date"),
      type: "date-picker",
      disabled: true,
      colNum: 2,
      required: true,
    },
    {
      name: "course_unit_price",
      label: t("course unit price"),
      type: "input",
      colNum: 2,
      required: true,
    },
    {
      name: "total_hours",
      label: t("total hours"),
      type: "input",
      colNum: 2,
      required: true,
    },
    {
      name: "total_amount",
      label: t("total amount"),
      type: "input",
      colNum: 2,
      required: true,
    },
    {
      name: "notes",
      label: t("notes"),
      type: "textarea",
      labelCol: { span: 4 },
      wrapperCol: { span: 19 }

    },
  ];
  const [toggle, FormModal] = useFormModal({
    submit: (values) => editUser(values),
    formItems,
    refresh,
    height: 350,
    width: 800,
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
