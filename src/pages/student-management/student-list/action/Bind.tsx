import { useTranslation } from "react-i18next";
import { useFormModal } from "~/hooks/modal/FormModal";
import { useFetch, useRefresh } from "~/hooks";
import { Button } from "antd";
import { getTeacherList } from "~/client/teacher";
import { bindTeacher } from "~/client/student";
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
    return getTeacherList()
  }, (res) => {
    if (key && !show) {
      setData(res.data.map((item: { name: any; id: any; }) => ({ label: item.name, value: item.id })))
      setShow(true)
    }
  }, [key])
  const formItems = [
    {
      name: "student",
      label: t("bind teacher"),
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
      console.log(values, 'values');

      const { label: teacher_name, value: teacher_id } = values.student
      return bindTeacher({ id: item.id, teacher_name, teacher_id })
    },
    formItems,
    refresh,
    height: 250,
    title: t("bind"),
    id: item.teacher_id,
    formProps: {
      initialValues: {
        student: item.teacher_id && {
          label: item.teacher_name, value: item.teacher_id
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
