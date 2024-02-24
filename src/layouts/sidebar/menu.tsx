import {
  GoldOutlined,
  HomeOutlined,
  DeploymentUnitOutlined,
  TableOutlined,
  AppstoreOutlined
} from "@ant-design/icons";
import type { MenuProps } from "antd";
const getMenu = (t: any, isAdmin: boolean) => {
  const menu: MenuProps["items"] = [
    {
      key: "home",
      icon: <HomeOutlined />,
      label: t("home"),
    },
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
      key: "key1",
      label: t("门课后台")
    },
    {
      key: "key2",
      label: t("门课上课APP")
    },

  ];
  if (isAdmin) {
    return menu
  } else {
    const teacher_menu: MenuProps["items"] = [
      {
        key: "course-table",
        icon: <TableOutlined />,
        label: t("course table"),
      },
      {
        key: "key2",
        label: t("门课上课APP")
      },

    ];
    return teacher_menu
  }


  return menu;
};
export { getMenu };
