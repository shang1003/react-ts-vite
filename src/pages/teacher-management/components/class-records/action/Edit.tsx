import { useTranslation } from "react-i18next";
import { useFormModal } from "~/hooks/modal/FormModal";
import { Button } from "antd";
import { editClassRecords } from "~/client/teacher";
export const Edit: React.FC<any> = (props) => {
  const { t } = useTranslation();
  const { item, refresh } = props;
  const formItems = [
    {
      name: "status",
      label: t("course status"),
      type: "select",
      options: [
        { label: "正常出勤", value: "1" },
        { label: "取消课程", value: "2" },
        { label: "体验课", value: "3" },
      ],
      required: true,
    },
    {
      name: "remarks",
      label: t("remarks"),
      type: "input",
    }

  ];
  const [toggle, FormModal] = useFormModal({
    submit: (values) => editClassRecords({ ...values, id: item.id }),
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
