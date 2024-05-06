import {
  GoldOutlined,
  AccountBookOutlined,
  AppstoreOutlined,
  DeploymentUnitOutlined,
  TableOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { getTeacherList } from "~/client/salary";

import type { MenuProps } from "antd";
const getMenu = async (t: any, role: string) => {
  const isAdmin = role == "orgadm";
  const isTeacher = role == "teacher";
  const isOther = ["clerk", "course_consultant", "learning_consultant"].includes(role);
  let filterData: any = [];
  if (!isTeacher) {
    const { data } = await getTeacherList();
    filterData = data.map((item) => ({
      key: `course-table/${item.id}`,
      label: `${item.english_name}(${item.chinese_name})`,
    }));
  }

  const menu: MenuProps["items"] = [
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
        {
          key: "student-management/recharge-record",
          label: t("recharge record"),
        },
        {
          key: "student-management/send-textbook-records",
          label: t("send textbook records"),
        },
      ],
    },
    {
      key: "course-management",
      icon: <AppstoreOutlined />,
      label: t("course management"),
      children: [
        {
          key: "course-management/class-record",
          label: t("class record"),
        },
      ],
    },
    {
      key: "course-table",
      icon: <TableOutlined />,
      label: t("teacher coursetable"),
      children: filterData,
    },
    {
      key: "salary-manage",
      icon: <AccountBookOutlined />,
      label: t("salary manage"),
      children: [
        {
          key: "salary-manage/teacher-salary-list",
          label: t("teacher salary"),
        },
      ],
    },
    {
      key: "sell-management",
      icon: <AccountBookOutlined />,
      label: t("sell management"),
      children: [
        // {
        //   key: "sell-management/sell-list",
        //   label: t("sell list"),
        // },
        // {
        //   key: "sell-management/sell-group",
        //   label: t("performance target"),
        // },
        {
          key: "sell-management/bonus",
          label: t("bonus"),
        },
      ],
    },
    {
      key: "network-disk",
      label: t("network disk"),
      icon: <UploadOutlined />,
    },
    {
      key: "key1",
      label: t("门课后台"),
    },
    {
      key: "key2",
      label: t("门课上课APP"),
    },
  ];
  const other: MenuProps["items"] = [
    {
      key: "student-management",
      icon: <DeploymentUnitOutlined />,
      label: t("student management"),
      children: [
        {
          key: "student-management/student-list",
          label: t("student list"),
        },
        {
          key: "student-management/recharge-record",
          label: t("recharge record"),
        },
        {
          key: "student-management/send-textbook-records",
          label: t("send textbook records"),
        },
      ],
    },
    {
      key: "course-management",
      icon: <AppstoreOutlined />,
      label: t("course management"),
      children: [
        {
          key: "course-management/class-record",
          label: t("class record"),
        },
      ],
    },
    {
      key: "course-table",
      icon: <TableOutlined />,
      label: t("teacher coursetable"),
      children: filterData,
    },
    {
      key: "key1",
      label: t("门课后台"),
    },
    {
      key: "key2",
      label: t("门课上课APP"),
    },
  ];

  if (isAdmin) {
    return menu;
  } else if (isTeacher) {
    const teacher_menu: MenuProps["items"] = [
      {
        key: "course-table",
        icon: <TableOutlined />,
        label: t("course table"),
      },
      {
        key: "key2",
        label: t("门课上课APP"),
      },
    ];
    return teacher_menu;
  } else if (isOther) {
    return other;
  }

  return menu;
};
export { getMenu };
