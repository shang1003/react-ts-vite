import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
import MainContent from "@/layouts"; //首此一定加载，无需懒加载
import { Login } from "@/pages/Login/index";

//懒加载
const NoMatch = lazy(() => import("@/components/404"));
const TableCom = lazy(() => import("@/pages/table"));
const StudentList = lazy(() => import("@/pages/student-management/student-list"));
const TableDetail = lazy(() => import("@/pages/table/detail"));
const StudentDetail = lazy(() => import("@/pages/student-management/student-list/detail"));
const Home = lazy(() => import("@/pages/home"));

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
