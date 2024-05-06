import { useTranslation } from "react-i18next";
import { Modal } from "antd";
import { DynamicForm } from "@/components/dynamic-form";
import React, { useRef, useState, forwardRef } from "react";
import Notify from "@/components/notify";
import { FormItemType, DynamicFormProps } from "@/components/dynamic-form";
interface ModalProps {
  id?: string;
  submit: (values: any) => Promise<any>;
  title?: string;
  top?: number;
  height?: number;
  isShowTip?: boolean;
  width?: number;
  okText?: string;
  cancelText?: string;
  formItems?: FormItemType[];
  formProps?: DynamicFormProps;
  refresh?: () => void;
  toggle?: (v: any) => void;
}
const defaultFormProps = {
  wrapperCol: { span: 14 },
  labelCol: { span: 8 },
  isShowFooter: false,
};
export const FormModal = forwardRef(
  (
    {
      submit,
      title,
      okText,
      cancelText,
      formItems,
      formProps,
      height,
      refresh,
      toggle,
      width,
      top = 20,
      isShowTip = true,
      id,
    }: ModalProps,
    ref?: any
  ) => {
    const formRef = ref ? ref : useRef<any>(null);
    const { t } = useTranslation();
    const [submmitLoading, setSubmmitLoading] = useState(false);
    return (
      <Modal
        title={title || t("create")}
        open={true}
        style={{ top }}
        width={width}
        okText={okText}
        cancelText={cancelText}
        onCancel={() => toggle && toggle(false)}
        confirmLoading={submmitLoading}
        onOk={() => {
          formRef?.current?.validateFields().then((values: any) => {
            setSubmmitLoading(true);
            const { successTip, failTip } = formProps || {};
            submit({ id, ...values }).then(
              () => {
                isShowTip && Notify.success(t("success"), successTip || t("edit success"));
                toggle && toggle(false);
                setSubmmitLoading(false);
                refresh && refresh();
              },
              (err = {}) => {
                const {
                  response: {
                    data: { message = "" },
                  },
                } = err;
                isShowTip && Notify.error(t("error"), failTip || t(message));
                setSubmmitLoading(false);
                refresh && refresh();
                toggle && toggle(false);
              }
            );
          });
        }}
      >
        <div style={{ height }}>
          <DynamicForm
            ref={formRef}
            formProps={{ ...formProps, ...defaultFormProps }}
            formItems={formItems || []}
          />
        </div>
      </Modal>
    );
  }
);
