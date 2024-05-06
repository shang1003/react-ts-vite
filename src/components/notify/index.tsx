import React from "react";
import { notification } from "antd";
import {
  InfoCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import "./index.less";

const open = (args: { title: string; description: string; type: string; onClose?: () => void }) => {
  const { title, type = "error", description = "", onClose } = args;

  let iconColor = "#F5222D";
  let icon = null;

  if (type === "info") {
    iconColor = "#0068FF";
    icon = <InfoCircleOutlined style={{ color: iconColor }} />;
  } else if (type === "success") {
    iconColor = "#57E39B";
    icon = <CheckCircleOutlined style={{ color: iconColor }} />;
  } else if (type === "error") {
    iconColor = "#EB354D";
    icon = <CloseCircleOutlined style={{ color: iconColor }} />;
  } else if (type === "process") {
    iconColor = "#0068FF";
    icon = <LoadingOutlined style={{ color: iconColor }} />;
  } else if (type === "warn") {
    iconColor = "#FEDF40";
    icon = <InfoCircleOutlined style={{ color: iconColor }} />;
  }

  notification.open({
    message: title,
    duration: 3,
    icon,
    description,
    className: "notify",
    onClose,

    style: {
      whiteSpace: "pre-line",
    },
  });
};
const success = (title: string, description: string) => {
  open({
    title,
    description,
    type: "success",
  });
};

const info = (title: string, description: string) => {
  open({
    title,
    description,
    type: "info",
  });
};

const error = (title: string, description: string) => {
  open({
    title,
    description,
    type: "error",
  });
};

const warn = (title: string, description: string) => {
  open({
    title,
    description,
    type: "warn",
  });
};

const process = (title: string, description: string) => {
  open({
    title,
    description,
    type: "process",
  });
};

const Notify = {
  success,
  error,
  warn,
  info,
  process,
};

export default Notify;
