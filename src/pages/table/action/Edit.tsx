import { useTranslation } from "react-i18next";
import { useFormModal } from "~/hooks/modal/FormModal";
import { Button, Radio } from "antd";
import { editUser } from "~/client/user";
export const Edit: React.FC<any> = (props) => {
  const { t } = useTranslation();
  const { item, refresh } = props;
  const formItems = [
    {
      name: "employment_date",
      colNum: 2,
      label: t("employment date"),
      format: "YYYY-MM-DD",
      showTime: false,
      required: true,
      type: "date-picker",
    },
    {
      name: "chinese_name",
      label: t("chinese name"),
      type: "input",
      required: true,
      colNum: 2,
    },
    {
      name: "english_name",
      label: t("english name"),
      type: "input",
      required: true,
      colNum: 2,
    },
    {
      name: "gender",
      colNum: 2,
      label: t("gender"),
      required: true,
      type: "input",
      component: (
        <Radio.Group>
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
    },

    {
      name: "id_card_number",
      colNum: 2,
      label: t("id card"),
      validateTrigger: "onBlur",
      type: "input",
    },
    {
      name: "deposit_bank",
      label: t("deposit bank"),
      type: "input",
      colNum: 2,
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
    height: 350,
    width: 800,
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
      <Button onClick={() => toggle(true)} type='link'>
        {t("edit")}
      </Button>
      <FormModal />
    </>
  );
};
