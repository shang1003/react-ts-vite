import { Table } from "antd";
import { ItemActionButtons } from "../action-buttons";
import { useTranslation } from "react-i18next";
import { TableProps } from "antd";
interface ActionsType {
  rowActions: {
    firstAction: React.FC<any>;
    moreActions: Record<"action", React.FC<any>>[];
  };
}
interface BaseTableType {
  columns: Record<string, any>[];
  data: Record<string, any>[];
  loading?: boolean;
  scrollY?: number;
  hasItemActions?: boolean;
  actions?: ActionsType;
  refresh?: () => void;
  rowKey?: string;
  otherProps?: TableProps<Record<string, any>>;
}
export const BaseTable: React.FC<BaseTableType> = ({
  columns = [],
  data = [],
  loading = false,
  hasItemActions = true,
  scrollY = 300,
  actions = {
    rowActions: {
      firstAction: null,
      moreActions: [],
    },
  },
  rowKey = "id",
  refresh,
  otherProps = {},
}) => {
  const { t } = useTranslation();
  const {
    rowActions: { firstAction, moreActions },
  } = actions;
  const getColumns = () => {
    if (!hasItemActions) {
      return columns;
    }
    return [
      ...columns,
      {
        title: t("action"),
        key: "operation",
        width: 210,
        render: (_: any, record: any) => (
          <ItemActionButtons
            firstAction={firstAction}
            moreActions={moreActions}
            item={record}
            refresh={refresh}
          />
        ),
      },
    ];
  };
  return (
    <>
      <Table
        rowKey={rowKey}
        columns={getColumns()}
        dataSource={data}
        scroll={{ y: scrollY }}
        loading={loading}
        {...otherProps}
      />
      ;
    </>
  );
};
