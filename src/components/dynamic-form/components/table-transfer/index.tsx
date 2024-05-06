import React, { useState } from "react";
import difference from "lodash/difference";
import { Table, Transfer } from "antd";
import type { ColumnsType, TableRowSelection } from "antd/es/table/interface";
import type { TransferItem, TransferProps } from "antd/es/transfer";

interface TableTransferProps extends TransferProps<TransferItem> {
  dataSource: TransferItem[];
  leftColumns: ColumnsType<TransferItem>;
  rightColumns: ColumnsType<TransferItem>;
}
interface Props extends TableTransferProps {
  onChange: (v: any) => void;
}

const TableTransfer = ({
  leftColumns,
  rightColumns,
  ...restProps
}: TableTransferProps) => (
  <Transfer {...restProps}>
    {({
      direction,
      filteredItems,
      onItemSelectAll,
      onItemSelect,
      selectedKeys: listSelectedKeys,
      disabled: listDisabled,
    }) => {
      const columns = direction === "left" ? leftColumns : rightColumns;

      const rowSelection: TableRowSelection<TransferItem> = {
        getCheckboxProps: (item) => ({
          disabled: listDisabled || item.disabled,
        }),
        onSelectAll(selected, selectedRows) {
          const treeSelectedKeys = selectedRows
            .filter((item) => !item.disabled)
            .map(({ key }) => key);
          const diffKeys = selected
            ? difference(treeSelectedKeys, listSelectedKeys)
            : difference(listSelectedKeys, treeSelectedKeys);
          onItemSelectAll(diffKeys as string[], selected);
        },
        onSelect({ key }, selected) {
          onItemSelect(key as string, selected);
        },
        selectedRowKeys: listSelectedKeys,
      };

      return (
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredItems}
          size="small"
          pagination={{
            pageSize: 5,
          }}
          scroll={{
            y: 200,
          }}
          style={{ pointerEvents: listDisabled ? "none" : undefined }}
          onRow={({ key, disabled: itemDisabled }) => ({
            onClick: () => {
              if (itemDisabled || listDisabled) return;
              onItemSelect(
                key as string,
                !listSelectedKeys.includes(key as string)
              );
            },
          })}
        />
      );
    }}
  </Transfer>
);

const App: React.FC<Props> = (props) => {
  const { dataSource, showSearch, leftColumns, rightColumns } = props;
  const [targetKeys, setTargetKeys] = useState<string[]>();

  const onChange = (nextTargetKeys: any) => {
    props.onChange && props.onChange(nextTargetKeys);
    setTargetKeys(nextTargetKeys);
  };

  return (
    <>
      <TableTransfer
        dataSource={dataSource}
        targetKeys={targetKeys}
        showSearch={showSearch}
        onChange={onChange}
        filterOption={(inputValue, item) =>
          item.title!.indexOf(inputValue) !== -1
        }
        leftColumns={leftColumns}
        rightColumns={rightColumns}
      />
    </>
  );
};

export default App;
