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
  actionsWidth?: Number;
  rowSelection?: object,
  rowKey?: string;
  pagination?: Object,
  otherProps?: TableProps<Record<string, any>>;
}
export const BaseTable: React.FC<BaseTableType> = ({
  columns = [],
  data = [],
  loading = false,
  hasItemActions = true,
  scrollY = 700,
  actionsWidth = 180,
  actions = {
    rowActions: {
      firstAction: null,
      moreActions: [],
    },
  },
  pagination = {
    showTotal: (v: any) => v,
    defaultCurrent: 1, // 默认页码
    defaultPageSize: 10, // 默认每页显示的数据条数
    showSizeChanger: true, // 显示每页显示数量切换器
    pageSizeOptions: ['10', '15', '30', '100'], // 自定义每页显示数量选项
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
        width: actionsWidth,
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
        pagination={pagination}
        scroll={{ y: scrollY }}
        loading={loading}
        {...otherProps}
      />
      ;
    </>
  );
};
