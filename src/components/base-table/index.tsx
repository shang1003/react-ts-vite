import { Table } from "antd";
import { ItemActionButtons } from "../action-buttons";
import { useTranslation } from "react-i18next";
import { TableProps } from "antd";
interface ActionsType {
  rowActions: {
    firstAction?: React.FC<any>;
    moreActions: Record<"action", React.FC<any>>[];
  };
}
interface BaseTableType {
  columns: Record<string, any>[];
  data: Record<string, any>[];
  loading?: boolean;
  scrollY?: number | string;
  ScrollX?: number | string;
  hasItemActions?: boolean;
  actions?: ActionsType;
  refresh?: () => void;
  rowSelection?: object,
  rowKey?: string;
  otherProps?: TableProps<Record<string, any>>;
}
export const BaseTable: React.FC<BaseTableType> = ({
  columns = [],
  data = [],
  loading = false,
  hasItemActions = true,
  scrollY = 700,
  ScrollX = 'max-content',
  actions = {
    rowActions: {
      firstAction: null,
      moreActions: [],
    },
  },
  rowKey = "id",
  rowSelection,
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
        ellipsis: true,
        width: 180,
        fixed: 'right',
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
        rowSelection={rowSelection}
        columns={getColumns()}
        dataSource={data}
        scroll={{ y: scrollY, x: ScrollX }}
        loading={loading}
        {...otherProps}
      />
      ;
    </>
  );
};
