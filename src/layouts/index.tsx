import React, { useState } from "react";
import { Suspense } from "react";
import { SideBar } from "@/layouts/sidebar";
import { HeaderWrapper } from "@/layouts/header";
import Breadcrumb from "./Breadcrumb";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import PageLoading from "~/components/loading";
const { Content } = Layout;
const contentStyle = {
  height: "calc(100vh - 60px)",
  overflow: "hidden",
};
const MainContent: React.FC = function () {
  const [collapsed, setCollapsed] = useState(false);
  function handleToggleCollapsed() {
    setCollapsed(!collapsed);
  }
  return (
    <Layout>
      <SideBar {...{ collapsed }} />

      <Layout>
        <HeaderWrapper
          {...{ collapsed, setCollapsed: handleToggleCollapsed }}
        />
        <Content style={contentStyle}>
          {/* { <Breadcrumb />} */}
          <Suspense fallback={<PageLoading />}>
            <Outlet />
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainContent;
