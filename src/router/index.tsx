import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
import MainContent from "@/layouts"; //首此一定加载，无需懒加载
import { Login } from "@/pages/Login/index";

//懒加载
const NoMatch = lazy(() => import("@/components/404"));
const G6 = lazy(() => import("@/pages/g6"));
const TableCom = lazy(() => import("@/pages/table"));
const Three = lazy(() => import("@/pages/three/index"));
const DynamicForm = lazy(() => import("@/pages/dynamic-form"));
const TableDetail = lazy(() => import("@/pages/table/detail"));
const Home = lazy(() => import("@/pages/home"));

//路由配置
export const router: RouteObject[] = [
  {
    path: "/",
  },
  {
    path: "/three",
    element: <Navigate to="/three/case" replace />,
  },
  {
    path: "/g6",
    element: <Navigate to="/g6/case" replace />,
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
        path: "three",
        children: [
          {
            path: "case",
            element: <Three />,
          },
        ],
      },
      {
        path: "g6",
        children: [
          {
            path: "case",
            element: <G6 />,
          },
        ],
      },
      {
        path: "dynamic-form",
        children: [
          {
            path: "case",
            element: <DynamicForm />,
          },
        ],
      },
      {
        path: "table",
        children: [
          {
            path: "case",
            element: <TableCom />,
          },
          {
            path: "case/detail/:id",
            element: <TableDetail />,
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
