import { useTranslation } from "react-i18next";
import { useFormModal } from "~/hooks/modal/FormModal";
import { Button } from "antd";
import { editRechargeRecord } from "~/client/student";
export const Edit: React.FC<any> = (props) => {
  const { t } = useTranslation();
  const { item, refresh } = props;
  const formItems: any = [
    {
      name: "textbook",
      label: t("textbook"),
      type: "input",
    },
    {
      name: "settlement_date",
      label: t("settlement date"),
      type: "date-picker",
    },
  ];
  const [toggle, FormModal] = useFormModal({
    submit: (values) => editRechargeRecord(item.id, values),
    formItems,
    refresh,
    height: 300,
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
      <Button onClick={() => toggle(true)} type='link'>
        {t("edit")}
      </Button>
      <FormModal />
    </>
  );
};
