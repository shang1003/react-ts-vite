import {
  AppstoreOutlined,
  BlockOutlined,
  DeploymentUnitOutlined,
  GoldOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
const getMenu = (t: any) => {
  const menu: MenuProps["items"] = [
    {
      key: "home",
      icon: <HomeOutlined />,
      label: t("home"),
    },
    {
      key: "table",
      icon: <GoldOutlined />,
      label: t("table"),
      children: [
        {
          key: "table/case",
          label: t("case"),
        },
      ],
    },
    {
      key: "dynamic-form",
      icon: <DeploymentUnitOutlined />,
      label: t("dynamic form"),
      children: [
        {
          key: "dynamic-form/case",
          label: t("case"),
        },
      ],
    },
    {
      key: "three",
      icon: <AppstoreOutlined />,
      label: "3D",
      children: [
        {
          key: "three/case",
          label: t("case"),
        },
      ],
    },
    {
      key: "g6",
      icon: <BlockOutlined />,
      label: "G6",
      children: [
        {
          key: "g6/case",
          label: t("case"),
        },
      ],
    },
  ];

  return menu;
};
export { getMenu };
