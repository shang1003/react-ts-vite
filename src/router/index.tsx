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
const CourseTable = lazy(() => import("@/pages/teacher-management/components/course-table"));
const Home = lazy(() => import("@/pages/home"));
const Three = lazy(() => import("@/pages/three/index"));

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
          {
            path: "student-list/class-records/:id",
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
            path: "teacher-list/course-table/:id",
            element: <TeacherDetail />,
          },
          {
            path: "teacher-list/teacher-salary/:id",
            element: <TeacherDetail />,
          },
          {
            path: "teacher-list/class-records/:id",
            element: <TeacherDetail />,
          },
        ],
      },
      {
        path: "three",
        children: [
          {
            path: "case",
            element: <Three />,
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
export const teacherRouter: RouteObject[] = [
  {
    path: "/",
  },
  {
    path: "/",
    element: <MainContent />,
    children: [
      {
        path: "course-table",
        element: <CourseTable />,
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
