import { useTranslation } from "react-i18next";
import { useFetch } from "~/hooks";
import { Button } from "antd";
import { getUserListInfo } from "~/client/user";
import { bind } from "~/client/student";
import { FormModal } from "~/components/modal/Modal";
import { useState } from "react";
export const Bind: React.FC<any> = (props) => {
  const { t } = useTranslation();
  const [data, setData] = useState<any>([]);
  const [show, toggle] = useState(false);

  const { item, refresh } = props;
  useFetch(
    () => {
      if (!show) {
        return Promise.resolve({ data });
      }
      return getUserListInfo();
    },
    (res) => {
      setData(
        res.data.map((item: { english_name: any; id: any; role: string }) => ({
          label: item.english_name,
          value: item.id,
          role: item.role,
        }))
      );
    },
    [show]
  );
  const formItems = [
    {
      name: "teacher",
      label: t("bind teacher"),
      type: "select",
      labelInValue: true,
      showSearch: true,
      filterOption: (input: string, option: any) => (option?.label ?? "").includes(input),
      options: data.filter((item: { role: string }) => item.role == "teacher"),
    },
    {
      name: "sales",
      label: t("sales person"),
      type: "select",
      labelInValue: true,
      showSearch: true,
      filterOption: (input: string, option: any) => (option?.label ?? "").includes(input),
      options: data,
    },
  ];

  return (
    <>
      <Button
        onClick={() => {
          toggle(true);
        }}
        type='link'
      >
        {t("bind")}
      </Button>
      {show && (
        <FormModal
          {...{
            submit: (values) => {
              const { label: teacher_name, value: teacher_id } = values?.teacher || {};
              const { label: sales_person_name, value: sales_person_id } = values?.sales || {};
              return bind({
                id: item.id,
                teacher_name,
                teacher_id,
                sales_person_name,
                sales_person_id,
              });
            },
            formItems,
            refresh,
            height: 250,
            toggle,
            title: t("bind"),
            id: item.teacher_id,
            formProps: {
              initialValues: {
                teacher: item.teacher_id && {
                  label: item.teacher_name,
                  value: item.teacher_id,
                },
                sales: item.teacher_id && {
                  label: item.sales_person_name,
                  value: item.sales_person_id,
                },
              },
            },
          }}
        />
      )}
    </>
  );
};
