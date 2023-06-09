import {
  createBrowserRouter,
} from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import NoMatch from '@/components/404'
import  Test  from "../pages/test";
import MainContent from '@/layouts' 
const router: RouteObject[] = [
  {
    path: "/",
    element: <MainContent />,
    children: [
      {
        path: "january",
        children: [
          {
            path: "first-week",
            element:<Test/>,
          },
        ],
      },
      {
        path: "february",
        children: [
          {
            path: "first-week",
            element: "二月第一周",
          },
        ],
      },
      {
        path: "march",
        children: [
          {
            path: "first-week",
            element: "三月第一周",
          },
        ],
      },
      {
        path: "*",

        element: <NoMatch/>,
      },
    ],
  },
];
export default createBrowserRouter(router);