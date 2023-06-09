import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
 export const menu: MenuProps["items"] = [
   {
     key: "january",
     icon: <UploadOutlined />,
     label: "一月",
     children: [
       {
         key: "january/first-week",
         label: "第一周",
       },
     ],
   },
   {
     key: "february",
     icon: <UserOutlined />,
     label: "二月",
     children: [
       {
         key: "february/first-week",
         label: "第一周",
       },
     ],
   },
   {
     key: "march",
     icon: <VideoCameraOutlined />,
     label: "三月",
     children: [
       {
         key: "march/first-week",
         label: "第一周",
       },
     ],
   },
 ];