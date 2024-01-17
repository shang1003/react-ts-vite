import { useTranslation } from "react-i18next";
import { useFormModal } from "~/hooks/modal/FormModal";
import { Button } from "antd";
import { editTeacher } from "~/client/teacher";
export const Edit: React.FC<any> = (props) => {
  const { t } = useTranslation();
  const validateNumber = (_: any, value: any) => {
    if (value && !/^\d+(\.\d+)?$/.test(value)) {
      return Promise.reject(t('please enter a valid number.'));
    }
    return Promise.resolve();
  };
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
      colNum: 2,
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
      name: "phone",
      label: t("phone"),
      type: "input",
      colNum: 2,
      validator: validatePhoneNumber,
      required: true,
    },
    {
      name: "course_unit_price",
      label: t("course unit price"),
      type: "input",
      colNum: 2,
      validator: validateNumber,
      required: true,
    },
    {
      name: "total_hours",
      label: t("total hours"),
      type: "input",
      validator: validateNumber,
      colNum: 2,
      required: true,
    },
    {
      name: "total_amount",
      label: t("total amount"),
      type: "input",
      validator: validateNumber,
      colNum: 2,
      required: true,
    },
    {
      name: "remaining_class_hours",
      label: t("remaining hours"),
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
    submit: (values) => editTeacher(values),
    formItems,
    refresh,
    height: 350,
    width: 800,
    top: 10,
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
