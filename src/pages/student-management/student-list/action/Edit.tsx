import { useTranslation } from "react-i18next";
import { useFormModal } from "~/hooks/modal/FormModal";
import { Button, Radio } from "antd";
import { editStudent } from "~/client/student";
import root from "~/store/root";
import { getTrialClass } from "~/utils";
export const Edit: React.FC<any> = (props) => {
  const { t } = useTranslation();
  const { item, refresh } = props;
  const trialClass = getTrialClass(t);
  const formItems = [
    {
      name: "operation_name",
      label: t("operation personnel"),
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
      name: "chinese_name",
      label: t("chinese name"),
      type: "input",
      colNum: 2,
      required: true,
    },
    {
      name: "english_name",
      label: t("english name"),
      type: "input",
      colNum: 2,
      required: true,
    },
    {
      name: "gender",
      label: t("gender"),
      type: "input",
      colNum: 2,
      component: (
        <Radio.Group>
          <Radio value='男'>{t("male")}</Radio>
          <Radio value='女'>{t("female")}</Radio>
        </Radio.Group>
      ),
      required: true,
    },
    {
      name: "age",
      label: t("age"),
      type: "input",
      colNum: 2,
    },
    {
      name: "grade",
      label: t("grade"),
      type: "input",
      colNum: 2,
    },
    {
      name: "student_bg",
      label: t("student background"),
      type: "input",
      colNum: 2,
    },
    {
      label: t("channel"),
      name: "channel",
      type: "input",
      colNum: 2,
    },
    {
      name: "trial_class_category",
      label: t("trial class category"),
      type: "select",
      options: trialClass,
      colNum: 2,
    },

    {
      name: "mail",
      label: t("mail"),
      type: "input",
      colNum: 2,
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
  const [toggle, FormModal, formRef] = useFormModal({
    submit: (values) => editStudent(values),
    formItems,
    refresh,
    height: 350,
    width: 800,
    top: 10,
    title: t("edit"),
    id: item.id,

    formProps: {
      onValuesChange: (_: any, { course_unit_price = 0, total_hours = 0 }: any) => {
        formRef?.current.setFieldsValue({
          total_amount: course_unit_price * total_hours,
        });
      },
      initialValues: {
        ...item,
        operation_name: root.userinfo.username,
      },
    },
  });
  return (
    <>
      <Button onClick={() => toggle(true)} type='link'>
        {t("edit")}
      </Button>
      <FormModal />
    </>
  );
};
