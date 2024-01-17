import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import MainContent from "@/layouts"; //首此一定加载，无需懒加载
import { Login } from "@/pages/Login/index";

//懒加载
const NoMatch = lazy(() => import("@/components/404"));
const TableCom = lazy(() => import("@/pages/table"));
const StudentList = lazy(() => import("@/pages/student-management/student-list"));
const TeacherList = lazy(() => import("@/pages/teacher-management/teacher-list"));
const TableDetail = lazy(() => import("@/pages/table/detail"));
const StudentDetail = lazy(() => import("@/pages/student-management/student-list/detail"));
const TeacherDetail = lazy(() => import("@/pages/teacher-management/teacher-list/detail"));
const Home = lazy(() => import("@/pages/home"));
const Course = lazy(() => import("~/pages/course-management"));

//路由配置
export const router: RouteObject[] = [
  {
    path: "/",
  },
  {
    path: "/",
    element: <MainContent />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "user-management",
        children: [
          {
            path: "user-list",
            element: <TableCom />,
          },
          {
            path: "user-list/detail/:id",
            element: <TableDetail />,
          },
        ],
      },
      {
        path: "student-management",
        children: [
          {
            path: "student-list",
            element: <StudentList />,
          },
          {
            path: "student-list/detail/:id",
            element: <StudentDetail />,
          },
        ],
      },
      {
        path: "teacher-management",
        children: [
          {
            path: "teacher-list",
            element: <TeacherList />,
          },
          {
            path: "teacher-list/detail/:id",
            element: <TeacherDetail />,
          },
        ],
      },
      {
        path: "course-management",
        children: [
          {
            path: "course-table",
            element: <Course />,
          },
        ],
      },
      {
        path: "*",

        element: <NoMatch />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
];
