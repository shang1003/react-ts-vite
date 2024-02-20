import { useTranslation } from "react-i18next";
import { useFormModal } from "~/hooks/modal/FormModal";
import { Button } from "antd";
import { editStudent } from "~/client/student";
// const {s}
export const Edit: React.FC<any> = (props) => {
  const { t } = useTranslation();
  const validateNumber = (_: any, value: any) => {
    if (value && !/^\d+(\.\d+)?$/.test(value)) {
      return Promise.reject(t('please enter a valid number.'));
    }
    return Promise.resolve();
  };
  const validateInNumber = (_: any, value: any) => {
    if (value && !/^\d+$/.test(value)) {
      return Promise.reject(t('please enter a valid number.'));
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
      colNum: 2,
    },
    {
      name: "course_category",
      label: t("course category"),
      type: "input",
      colNum: 2,
      required: true,
    },
    {
      name: "phone",
      label: t("phone"),
      type: "input",
      colNum: 2,
      required: true,
    },
    {
      name: "channel",
      label: t("channel"),
      type: "input",
      colNum: 2,
      required: true,

    },
    {
      name: "student_bg",
      label: t("student background"),
      type: "input",
      colNum: 2,
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
      validator: validateInNumber,
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
      name: "notes",
      label: t("notes"),
      type: "select",
      options: [
        { label: "体验课", value: "1" },
        { label: "正式课", value: "2" },
      ],
      colNum: 2,

    },
  ];
  const [toggle, FormModal] = useFormModal({
    submit: (values) => editStudent(values),
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
