import { Dropdown, Button, Divider } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import React from "react";
interface ItemActionButtonsType {
  firstAction?: React.FC<any> | null;
  moreActions: Record<"action", React.FC<any>>[];
  item: Record<string, any>;
  refresh?: () => void;
}
export const ItemActionButtons: React.FC<ItemActionButtonsType> = (props) => {
  const { t } = useTranslation();
  const { firstAction: FirstAction, moreActions, item, refresh } = props;

  function getActions() {
    if (!FirstAction && moreActions.length === 0) {
      return null;
    }
    let firstElement = null;
    let dividerElement = null;
    let moreElement = undefined;
    if (FirstAction) {
      firstElement = <FirstAction item={item} refresh={refresh} />;
    }

    if (moreActions.length > 0) {
      const items = moreActions.map((it, index) => {
        const ActionComponent = it.action;

        return {
          label: <ActionComponent item={item} refresh={refresh} />,
          key: index,
        };
      });

      if (firstElement && moreActions.length > 0) {
        dividerElement = <Divider type="vertical" />;
      }

      moreElement =
        items.length > 1 ? (
          <Dropdown
            menu={{
              items: items,
            }}
            trigger={["click"]}
          >
            <Button type="link">
              {t("more")} {<DownOutlined />}
            </Button>
          </Dropdown>
        ) : (
          items[0].label
        );
    }

    return (
      <>
        {firstElement}
        {dividerElement}
        {moreElement}
      </>
    );
  }

  return getActions();
};
