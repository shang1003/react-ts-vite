import { useTranslation } from "react-i18next";
import { useFormModal } from "~/hooks/modal/FormModal";
import { Button, Radio } from "antd";
import { editSalary } from "~/client/salary";
import dayjs from "dayjs";
export const Edit: React.FC<any> = (props) => {
  const { t } = useTranslation();
  const { item, refresh } = props;
  const roleOptions = [
    { label: t("orgadm"), value: "orgadm" },
    { label: t("teacher"), value: "teacher" },
    { label: t("clerk"), value: "clerk" },
    { label: t("course consultant"), value: "course_consultant" },
    { label: t("learning consultant"), value: "learning_consultant" },
  ];
  const validateNumber = (_: any, value: any) => {
    if (value && !/^(-)?\d+(\.\d+)?$/.test(value)) {
      return Promise.reject(t("please enter a valid number."));
    }
    return Promise.resolve();
  };

  const formItems = [
    {
      name: "chinese_name",
      label: t("chinese name"),
      type: "input",
      colNum: 2,
      disabled: true,
    },
    {
      name: "english_name",
      label: t("english name"),
      type: "input",
      colNum: 2,
      disabled: true,
    },

    {
      name: "gender",
      colNum: 2,
      label: t("gender"),
      type: "input",
      component: (
        <Radio.Group disabled={true}>
          <Radio value='male'>{t("male")}</Radio>
          <Radio value='female'>{t("female")}</Radio>
        </Radio.Group>
      ),
    },
    {
      name: "phone",
      label: t("phone"),
      colNum: 2,
      type: "input",
      disabled: true,
    },
    {
      name: "id_card_number",
      colNum: 2,
      label: t("id card"),
      validateTrigger: "onBlur",
      type: "input",
      disabled: true,
    },
    {
      name: "deposit_bank",
      label: t("deposit bank"),
      type: "input",
      colNum: 2,
      disabled: true,
    },
    {
      name: "bank_account_number",
      colNum: 2,
      label: t("bank account"),
      type: "input",
      disabled: true,
    },
    {
      name: "employment_date",
      colNum: 2,
      label: t("employment date"),
      format: "YYYY-MM-DD",
      type: "date-picker",
      disabled: true,
    },
    {
      name: "settlement_date",
      label: t("salary date"),
      format: "YYYY-MM-DD",
      showTime: false,
      type: "date-picker",
      disabledDate: (current: any, info: any) => {
        if (
          !info.from ||
          (info?.from?.month() === current.month() && info?.from?.year() === current.year())
        ) {
          return false;
        } else {
          return true;
        }
      },
      isRange: true,
      colNum: 2,
      required: true,
    },
    {
      name: "basic_salary",
      label: t("basic salary"),
      type: "input",
      validator: validateNumber,
      colNum: 2,
    },
    {
      name: "class_hour",
      label: t("class hour"),
      type: "input",
      validator: validateNumber,
      colNum: 2,
    },

    {
      name: "commission",
      label: t("commission"),
      type: "input",
      validator: validateNumber,
      colNum: 2,
      required: true,
    },
    {
      name: "gross_amount",
      label: t("gross amount"),
      type: "input",
      validator: validateNumber,
      colNum: 2,
      disabled: true,
      required: true,
    },
    {
      name: "reward",
      label: t("reward"),
      type: "input",
      validator: validateNumber,
      colNum: 2,
      required: true,
    },
    {
      name: "penalty",
      label: t("penalty"),
      type: "input",
      validator: validateNumber,
      colNum: 2,
      required: true,
    },
    {
      name: "total_amount",
      label: t("total amount"),
      type: "input",
      disabled: true,
      colNum: 2,
      required: true,
    },
  ];
  const [toggle, FormModal, formRef] = useFormModal({
    submit: (values) => {
      const {
        settlement_date: [start_date, end_date],
        ...res
      } = values;
      return editSalary(item.id, { start_date, end_date, ...res });
    },
    formItems,
    refresh,
    height: 540,
    width: 800,
    title: t("edit"),
    id: item.teacher_id,
    formProps: {
      initialValues: {
        ...item,
        ...item?.user,
        settlement_date: [item.start_date, item.end_date],
      },
      onValuesChange: (
        _: any,
        { basic_salary = 0, class_hour = 0, reward = 0, penalty = 0, commission = 0 }: any
      ) => {
        formRef?.current.setFieldsValue({
          total_amount: basic_salary * class_hour + +reward - penalty + +commission,
        });
        formRef?.current.setFieldsValue({ gross_amount: basic_salary * class_hour + +commission });
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
