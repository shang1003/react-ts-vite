import { useTranslation } from "react-i18next";
import { useFormModal } from "~/hooks/modal/FormModal";
import { Button } from "antd";
import { editTeacherSalary } from "~/client/teacher";
export const Edit: React.FC<any> = (props) => {
  const { t } = useTranslation();
  const { item, refresh } = props;
  const formItems = [
    {
      name: "salary_date",
      label: t("salary date"),
      type: "date-picker",
      required: true,
    },
    {
      name: "gross_salary",
      label: t("gross salary"),
      type: "input",
      required: true,
    },
    {
      name: "bonuses_penalties",
      label: t("bonuses penalties"),
      type: "input",
      required: true,
    },
    {
      name: "net_salary",
      label: t("net salary"),
      type: "input",
      required: true,
    },

  ];
  const [toggle, FormModal] = useFormModal({
    submit: (values) => editTeacherSalary({ ...values, id: item.id }),
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
