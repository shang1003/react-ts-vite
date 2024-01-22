import {
  GoldOutlined,
  HomeOutlined,
  DeploymentUnitOutlined,
  TableOutlined
} from "@ant-design/icons";
import type { MenuProps } from "antd";
const getMenu = (t: any) => {
  const menu: MenuProps["items"] = [
    // {
    //   key: "home",
    //   icon: <HomeOutlined />,
    //   label: t("home"),
    // },
    {
      key: "user-management",
      icon: <GoldOutlined />,
      label: t("user management"),
      children: [
        {
          key: "user-management/user-list",
          label: t("user list"),
        },
      ],
    },
    {
      key: "student-management",
      icon: <DeploymentUnitOutlined />,
      label: t("student management"),
      children: [
        {
          key: "student-management/student-list",
          label: t("student list"),
        },
      ],
    },
    {
      key: "teacher-management",
      icon: <TableOutlined />,
      label: t("teacher management"),
      children: [
        {
          key: "teacher-management/teacher-list",
          label: t("teacher list"),
        },
      ],
    },

    // {
    //   key: "dynamic-form",
    //   icon: <DeploymentUnitOutlined />,
    //   label: t("dynamic form"),
    //   children: [
    //     {
    //       key: "dynamic-form/case",
    //       label: t("case"),
    //     },
    //   ],
    // },
    // {
    //   key: "three",
    //   icon: <AppstoreOutlined />,
    //   label: "3D",
    //   children: [
    //     {
    //       key: "three/case",
    //       label: t("case"),
    //     },
    //   ],
    // },

  ];

  return menu;
};
export { getMenu };
