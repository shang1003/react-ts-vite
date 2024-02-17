import { useTranslation } from "react-i18next";
import { useFormModal } from "~/hooks/modal/FormModal";
import { useFetch, useRefresh } from "~/hooks";
import { Button } from "antd";
import { getStudentList } from "~/client/student";
import { bindStudent } from "~/client/teacher";
import { useState } from "react";
export const Bind: React.FC<any> = (props) => {
  const { t } = useTranslation();
  const [data, setData] = useState<any>([])
  const [key, setKey] = useRefresh()
  const [show, setShow] = useState(false)
  const { item, refresh } = props;
  useFetch(() => {
    if (show) {
      return Promise.resolve({ data })
    }
    return getStudentList()
  }, (res) => {
    if (key && !show) {
      setData(res.data.map((item: { name: any; id: any; }) => ({ label: item.name, value: item.id })))
      setShow(true)
    }
  }, [key])
  const formItems = [
    {
      name: "student",
      label: t("bind student"),
      type: "select",
      required: true,
      labelInValue: true,
      showSearch: true,
      filterOption: (input: string, option: any) => (option?.label ?? '').includes(input),
      options: data
    },
  ];
  const [toggle, FormModal] = useFormModal({
    submit: (values) => {
      const { label: student_name, value: student_id } = values.student
      return bindStudent({ id: item.id, student_name, student_id })
    },
    formItems,
    refresh,
    height: 250,

    title: t("bind"),
    id: item.teacher_id,
    formProps: {
      initialValues: {
        student: {
          label: item.student_name, value: item.student_id
        }
      },
    },
  });
  return (
    <>
      <Button onClick={() => { toggle(true), setKey() }} type="link">
        {t("bind")}
      </Button>
      {show && <FormModal />}
    </>
  );
};
