import ThreeComponent from "./components/ThreeJSDemo";
import Light from "./components/Light";
import Fly from "./components/Fly";
// import Blender from "./components/Blender";
import { useTranslation } from "react-i18next";
import { Tabs } from "antd";
import type { TabsProps } from "antd";

const Three = () => {
  const { t } = useTranslation();
  const components = {
    "three-component": {
      label: t("component"),
      component: <ThreeComponent />,
    },
    light: {
      label: t("light"),
      component: <Light />,
    },
    mode: {
      label: t("mode"),
      component: <Fly />,
    },
  };

  const items: TabsProps["items"] = Object.entries(components).map(
    ([key, obj]) => ({ key, label: obj.label, children: obj.component })
  );
  return <Tabs defaultActiveKey="fly" items={items} />;
};
export default Three;
