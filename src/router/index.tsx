import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import MainContent from "@/layouts"; //首此一定加载，无需懒加载
import { Login } from "@/pages/Login/index";

//懒加载
const NoMatch = lazy(() => import("@/components/404"));
const TableCom = lazy(() => import("@/pages/table"));
const Salary = lazy(() => import("@/pages/salary-management/index"));
const ClassRecord = lazy(() => import("@/pages/teacher-management/components/class-records"));
const StudentList = lazy(() => import("@/pages/student-management/student-list"));
const TableDetail = lazy(() => import("@/pages/table/detail"));
const RechargeRecord = lazy(() => import("@/pages/student-management/recharge-record"));
const SendTextbookRecords = lazy(() => import("@/pages/student-management/send-textbook-records"));
const StudentDetail = lazy(() => import("@/pages/student-management/student-list/detail"));
const CourseTable = lazy(() => import("@/pages/teacher-management/components/course-table"));
const Home = lazy(() => import("@/pages/home"));
const Three = lazy(() => import("@/pages/three/index"));
const NetworkDisk = lazy(() => import("@/pages/network-disk"));
const Bonus = lazy(() => import("@/pages/sell-management/bonus"));

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
        path: "salary-manage",
        children: [
          {
            path: "teacher-salary-list",
            element: <Salary />,
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
          {
            path: "recharge-record",
            element: <RechargeRecord />,
          },
          {
            path: "send-textbook-records",
            element: <SendTextbookRecords />,
          },
        ],
      },
      {
        path: "course-table",
        children: [
          {
            path: ":id",
            element: <CourseTable />,
          },
        ],
      },
      {
        path: "course-management",
        children: [
          {
            path: "class-record",
            element: <ClassRecord />,
          },
        ],
      },
      {
        path: "sell-management",
        children: [
          {
            path: "bonus",
            element: <Bonus />,
          },
        ],
      },

      {
        path: "network-disk",
        element: <NetworkDisk />,
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

//路由配置
export const otherRouter: RouteObject[] = [
  {
    path: "/",
  },
  {
    path: "/",
    element: <MainContent />,
    children: [
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
          {
            path: "recharge-record",
            element: <RechargeRecord />,
          },
          {
            path: "send-textbook-records",
            element: <SendTextbookRecords />,
          },
        ],
      },
      {
        path: "course-table",
        children: [
          {
            path: ":id",
            element: <CourseTable />,
          },
        ],
      },
      {
        path: "course-management",
        children: [
          {
            path: "class-record",
            element: <ClassRecord />,
          },
        ],
      },

      {
        path: "network-disk",
        element: <NetworkDisk />,
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
