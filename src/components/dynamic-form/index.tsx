import { forwardRef, useState } from "react";
import { Input, InputNumber, Cascader, Switch, Select, ColorPicker, TimePicker } from "antd";
import { Title, Checkbox, TableTransfer, Upload, DatePicker } from "./components";
import { Form, Tooltip, Button, Row, Col } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import Notify from "@/components/notify";
import type { FormProps } from "antd";
import { useTranslation } from "react-i18next";
import { isEmpty } from "lodash";
const { Item: FormItem } = Form;
const components: Record<string, any> = {
  select: Select,
  title: Title,
  checkbox: Checkbox,
  switch: Switch,
  input: Input,
  "input-password": Input.Password,
  "table-transfer": TableTransfer,
  "input-number": InputNumber,
  textarea: Input.TextArea,
  cascader: Cascader,
  upload: Upload,
  "date-picker": DatePicker,
  "color-picker": ColorPicker,
  "time-picker": TimePicker,
  "time-range-picker": TimePicker.RangePicker,
};

export interface DynamicFormProps extends FormProps {
  onSubmit?: (v: any) => Promise<any>;
  successTip?: any;
  failTip?: any;
  isShowFooter?: boolean;
}

export interface FormItemType {
  type: string;
  component?: JSX.Element;
  colNum?: number;
  [key: string]: any;
}

export interface DynamicFormType {
  formItems: FormItemType[];
  formProps?: DynamicFormProps;
}

export const DynamicForm = forwardRef((props: DynamicFormType, ref: any) => {
  const { t } = useTranslation();
  const { formItems, formProps } = props;
  const [submmitLoading, setSubmmitLoading] = useState(false);
  const { successTip, failTip, onSubmit, isShowFooter = true, ...res } = formProps || {};
  const defaultFormProps: DynamicFormProps = {
    colon: false,
    labelAlign: "left",
    labelCol: {
      xs: { span: 5 },
      sm: { span: 3 },
    },
    wrapperCol: {
      xs: { span: 10 },
      sm: { span: 8 },
    },
    //重写form默认属性值
    ...res,
  };

  const renderTip = (tip: any) => {
    if (!tip) {
      return null;
    }
    return (
      <Tooltip title={tip}>
        <QuestionCircleOutlined />
      </Tooltip>
    );
  };

  //label提示
  const renderLabel = (label: any, tip: any) => {
    if (!tip) {
      return label;
    }
    return (
      <span>
        {label}&nbsp;{renderTip(tip)}
      </span>
    );
  };

  //校验
  const getRules = (item: FormItemType) => {
    const {
      required,
      rules,
      validator,
      type = "",
      otherRule,
      hidden,
      label,
      placeholder,
      hasRequiredCheck = true,
    } = item;
    if (hidden) {
      return [];
    }
    if (rules) {
      return rules;
    }
    const newRules = [];
    const newRule: { required?: boolean; validator?: any } = {};
    const requiredRule: { required?: boolean; message?: string } = {};
    if (required) {
      if (type && type.includes("select")) {
        requiredRule.required = true;
        requiredRule.message = placeholder || t("please select {{label}}!", { label });
      } else if (hasRequiredCheck) {
        requiredRule.required = true;
        requiredRule.message = placeholder || t("please input {{label}}!", { label });
      } else if (validator) {
        newRule.required = required;
      }
    }
    if (!isEmpty(requiredRule)) {
      newRules.push(requiredRule);
    }
    if (validator) {
      newRule.validator = validator;
    }
    if (!isEmpty(newRule)) {
      newRules.push(newRule);
    }
    if (otherRule) {
      newRules.push(otherRule);
    }
    return newRules;
  };

  //获取FormItem属性类型
  const getFormItemProps = (item: FormItemType) => {
    const {
      name,
      label,
      type,
      help,
      extra,
      className,
      style,
      hidden,
      labelCol,
      wrapperCol,
      tip,
      required,
      valuePropName,
      validateTrigger = "onBlur",
    } = item;
    const base = {
      name,
      label: renderLabel(label, tip),
      help,
      extra,
      className,
      style,
      hidden,
      labelCol,
      wrapperCol,
      required,
      valuePropName,
      validateTrigger,
      rules: getRules(item),
    };
    switch (type) {
      case "title":
        return {
          ...base,
          label: "",
          wrapperCol: {
            span: 24,
          },
        };

      default:
        return base;
    }
  };

  //渲染FormItem
  const renderFormItem = (item: FormItemType, index: any) => {
    const { component, type, colNum, valuePropName, ...res } = item;
    const formItemProps = getFormItemProps(item);

    //自定义
    if (component) {
      return (
        <Col span={24 / (colNum || 1)} key={`form-item-col-${index}`}>
          <FormItem {...formItemProps} key={`form-item-${index}`}>
            {component}
          </FormItem>
        </Col>
      );
    }
    const CurComp = components[type];
    if (CurComp) {
      return (
        <Col span={24 / (colNum || 1)} key={`form-item-col-${index}`}>
          <FormItem {...formItemProps} key={`form-item-${index}`}>
            <CurComp {...res} />
          </FormItem>
        </Col>
      );
    }
  };

  const renderFormItems = () => {
    return formItems
      .filter((item) => !item.hidden)
      .map((item, index) => renderFormItem(item, index));
  };

  const onOk = (values: any) => {
    setSubmmitLoading(true);
    if (!onSubmit) {
      setSubmmitLoading(false);
      return;
    }

    return onSubmit(values).then(
      () => {
        Notify.success(t("success"), successTip || t("edit success"));
        setSubmmitLoading(false);
      },
      (err = {}) => {
        const {
          response: {
            data: { message = "" },
          },
        } = err;
        Notify.error(t("error"), failTip || message);
        setSubmmitLoading(false);
      }
    );
  };

  const footer = (isShowFooter: boolean) => {
    return (
      isShowFooter && (
        <Form.Item>
          <Button loading={submmitLoading} type='primary' htmlType='submit'>
            {t("submit")}
          </Button>
        </Form.Item>
      )
    );
  };

  return (
    <Form {...defaultFormProps} onFinish={onOk} ref={ref}>
      <Row>{renderFormItems()}</Row>
      {footer(isShowFooter)}
    </Form>
  );
});
