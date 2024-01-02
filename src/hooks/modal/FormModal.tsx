import { useTranslation } from "react-i18next";
import { Modal } from "antd";
import { DynamicForm } from "@/components/dynamic-form";
import { useToggle } from "@/hooks";
import React, { useRef } from "react";
import Notify from "@/components/notify";
import { FormItemType, DynamicFormProps } from "@/components/dynamic-form";
interface ModalProps {
  id?: string;
  submit: (values: any) => Promise<any>;
  title?: string;
  okText?: string;
  cancelText?: string;
  formItems?: FormItemType[];
  formProps?: DynamicFormProps;
  refresh?: () => void;
}
const defaultFormProps = {
  wrapperCol: { span: 14 },
  labelCol: { span: 8 },
  isShowFooter: false,
};

export const useFormModal = ({
  submit,
  title,
  okText,
  cancelText,
  formItems,
  formProps,
  refresh,
  id,
}: ModalProps): [(v: boolean) => void, () => JSX.Element] => {
  const [isShow, toggle] = useToggle(false);
  const formRef = useRef<any>(null);
  const { t } = useTranslation();
  const FormModal = () => (
    <Modal
      title={title || t("create")}
      open={isShow}
      okText={okText}
      cancelText={cancelText}
      onCancel={() => toggle(false)}
      onOk={() => {
        formRef?.current?.validateFields().then((values: any) => {
          const { successTip,failTip } = formProps || {};
          submit({ id, ...values }).then(
            () => {
              Notify.success(t("success"), successTip || t("edit success"));
              toggle(false);
              refresh && refresh();
            },
            (err = {}) => {
              const {
                response: {
                  data: { message = "" },
                },
              } = err;
              Notify.error(t("error"),failTip|| t(message));
              toggle(false);
            }
          );
        });
      }}
    >
      <DynamicForm
        ref={formRef}
        formProps={{ ...formProps, ...defaultFormProps }}
        formItems={formItems || []}
      />
    </Modal>
  );
  return [toggle, FormModal];
};
