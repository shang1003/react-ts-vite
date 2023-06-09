import { DynamicForm } from "@/components/dynamic-form";
import { testDynamicForm } from "@/client/login";
import styles from "./index.module.less";
import { DynamicFormProps } from "@/components/dynamic-form";
import { useTranslation } from "react-i18next";
export const SimpleForm = () => {
  const { t } = useTranslation();
  const formItems = [
    {
      type: "title",
      label: "动态表单列布局实例",
    },
    {
      name: "test",
      tip: "我是下拉框选择组件",
      label: t("username"),
      type: "select",
      mode: "multiple",
      options: [
        {
          label: "张三",
          value: "zhangsan",
        },
      ],
      required: true,
    },
    {
      label: t("age"),
      name: "age",
      type: "input",
    },
    {
      label: t("checkbox"),
      name: "checkbox",
      content: "Checkbox",
      type: "checkbox",
    },
    // {
    //   // label: t("穿梭框"),
    //   name: "table-transfer",
    //   type: "table-transfer",
    //   leftColumns: leftColumns,
    //   rightColumns: rightColumns,
    //   dataSource: [...mockData],
    //   wrapperCol: { span: 24 },
    // },
    {
      label: "测试错误提交",
      name: "error",
      type: "switch",
      valuePropName: "checked",
    },
  ];

  const onSubmit = (values: any) => {
    return testDynamicForm(values);
  };

  const formProps: DynamicFormProps = {
    wrapperCol: { span: 14 },
    labelCol: { span: 8 },
    labelAlign: "left",
    initialValues: {
      checkbox: true,
      error: true,
    },
    successTip: "动态表单验证成功",
    failTip: "字段缺失，请检查",
    onSubmit,
  };
  return (
    <div className={styles["form"]}>
      <DynamicForm formProps={formProps} formItems={formItems} />
    </div>
  );
};
