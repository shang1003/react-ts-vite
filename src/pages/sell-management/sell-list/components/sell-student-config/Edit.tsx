import { useTranslation } from "react-i18next";
import { useFormModal } from "~/hooks/modal/FormModal";
import { Button } from "antd";
import { editSellStudent } from "~/client/sell";
export const Edit: React.FC<any> = (props) => {
  const { t } = useTranslation();
  const options: any[] = [
    {
      label: t('european and american formal classes'),
      value: 1
    },
    {
      label: t('philippines formal classes'),
      value: 2
    },
    {
      label: t('chinese teachers formal classes'),
      value: 3
    },
    {
      label: t('european and american trial classes'),
      value: 4
    },
    {
      label: t('philippines trial classes'),
      value: 5
    },
    {
      label: t('chinese teachers trial classes'),
      value: 6
    }
  ]
  const { item, refresh } = props;
  const formItems: any[] = [
    {
      name: "date",
      label: t("date"),
      type: "date-picker",
      format: "YYYY-MM-DD",
      colNum: 2,
    },
    {
      name: "studentName",
      label: t("student name"),
      type: "input",
      colNum: 2,
    },
    {
      name: "phoneNumber",
      label: t("phone"),
      type: "input",
      colNum: 2,
    },
    {
      name: "basicInfo",
      label: t("basic info"),
      type: "textarea",
      colNum: 2,
    },
    {
      name: "trialClassTime",
      label: t("trial class time"),
      type: "input",
      colNum: 2,
    },
    {
      name: "courseCategory",
      label: t("course category"),
      type: "select",
      options,
      colNum: 2,
    },
    {
      name: "textbookName",
      label: t("textbook"),
      type: "input",
      colNum: 2,
    },
    {
      name: "lessonPrice",
      label: t("lesson price"),

      type: "input",
      colNum: 2,
    },
    {
      name: "totalLessons",
      label: t("total hours"),
      type: "input",
      colNum: 2,
    },
    {
      name: "totalAmount",
      label: t("total amount"),
      disabled: true,
      type: "input",
      colNum: 2,
    },
    {
      name: "trialClassCount",
      label: t("trial class count"),
      type: "input",
      colNum: 2,
    },
    {
      name: "trialClassSchedulingTest",
      label: t("experience class schedule"),
      type: "input-number",
      max: 1,
      min: 0,
      colNum: 2,
    },
    {
      name: "formalClassTest",
      label: t("formal class test"),
      type: "input-number",
      max: 1,
      min: 0,
      colNum: 2,
    },
  ];
  const [toggle, FormModal, formRef] = useFormModal({
    submit: (values) => editSellStudent(item.id, values),
    formItems,
    refresh,
    top: 10,
    title: t("edit"),
    id: item.id,
    height: 350,
    width: 850,
    formProps: {
      onValuesChange: (_: any, { lessonPrice = 0, totalLessons = 0 }: any) => {
        formRef?.current.setFieldsValue({ totalAmount: (lessonPrice * totalLessons).toFixed(2) })
      },
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
