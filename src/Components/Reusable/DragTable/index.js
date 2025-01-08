import React, { useContext, useMemo, useState } from "react";
import { HolderOutlined, EllipsisOutlined } from "@ant-design/icons";
import { DndContext } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button, Dropdown, Menu, Table } from "antd";

// Context to manage drag-related props for each row
const RowContext = React.createContext({});

// Drag Handle Component
const DragHandle = () => {
  const { setActivatorNodeRef, listeners } = useContext(RowContext);
  return (
    <Button
      type="text"
      size="small"
      icon={<HolderOutlined />}
      style={{ cursor: "move" }}
      ref={setActivatorNodeRef}
      {...listeners}
    />
  );
};

// Sortable Row Component
const SortableRow = ({ children, ...props }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props["data-row-key"],
  });

  const style = {
    ...props.style,
    transform: CSS.Translate.toString(transform),
    transition,
    ...(isDragging ? { position: "relative", zIndex: 9999 } : {}),
  };

  const contextValue = useMemo(
    () => ({
      setActivatorNodeRef,
      listeners,
    }),
    [setActivatorNodeRef, listeners]
  );

  return (
    <RowContext.Provider value={contextValue}>
      <tr {...props} ref={setNodeRef} style={style} {...attributes}>
        {children}
      </tr>
    </RowContext.Provider>
  );
};

// Main DragTable Component
const DragTable = ({ sourceData }) => {
  const [dataSource, setDataSource] = useState(sourceData);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]); // Initial selected keys
  const [selectedRows, setSelectedRows] = useState([]);

  const handleClickEdit = (record) => {
    console.log("redord---->", record)
  }

  const columns = [
    {
      key: "sort",
      align: "center",
      render: () => <DragHandle />,
    },
    { title: "Task name", dataIndex: "task", key: "task", width: "20%" },
    { title: "Due on", dataIndex: "dayTime", key: "dayTime", width: "20%" },
    {
      title: "Task Status",
      dataIndex: "progress",
      key: "progress",
      width: "20%",
    },
    {
      title: "Task Category",
      dataIndex: "process",
      key: "process",
      width: "20%",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <Dropdown
          overlay={
            <Menu
              onClick={(e) => {
                e.domEvent.stopPropagation(); // Prevent event propagation
              }}
            >
              <Menu.Item key="1" onClick={() => handleClickEdit(record)}>
                <span className="text-[#000000] text-[16px] font-semibold">
                  Edit
                </span>
              </Menu.Item>
              <Menu.Item key="2">
                <span className="text-[#DA2F2F] text-[16px] font-semibold">
                  Delete
                </span>
              </Menu.Item>
            </Menu>
          }
        >
          <EllipsisOutlined
            onClick={(e) => {
              e.stopPropagation(); // Prevent event propagation
            }}
          />
        </Dropdown>
      ),
    },
  ];

  const onRowClick = (record) => {
    const isSelected = selectedRowKeys.includes(record.key);
    if (isSelected) {
      setSelectedRowKeys((prevKeys) =>
        prevKeys.filter((key) => key !== record.key)
      );
      setSelectedRows((prevRows) =>
        prevRows.filter((row) => row.key !== record.key)
      );
    } else {
      setSelectedRowKeys((prevKeys) => [...prevKeys, record.key]);
      setSelectedRows((prevRows) => [...prevRows, record]);
    }
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys, newSelectedRows) => {
      setSelectedRowKeys(newSelectedRowKeys);
      setSelectedRows(newSelectedRows);
    },
    onSelect: (record, selected) => {
      if (selected) {
        setSelectedRows((prev) => [...prev, record]);
      } else {
        setSelectedRows((prev) => prev.filter((row) => row.key !== record.key));
      }
    },
    onSelectAll: (selected) => {
      setSelectedRows(selected ? dataSource : []);
    },
    getCheckboxProps: (record) => ({
      disabled: record.type === "S", // Example of disabling rows
      name: record.name,
    }),
  };

  const onDragEnd = ({ active, over }) => {
    if (active.id !== over?.id) {
      setDataSource((prev) => {
        const activeIndex = prev.findIndex((item) => item.key === active.id);
        const overIndex = prev.findIndex((item) => item.key === over.id);
        return arrayMove(prev, activeIndex, overIndex);
      });
    }
  };

  return (
    <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
      <SortableContext
        items={dataSource.map((item) => item.key)}
        strategy={verticalListSortingStrategy}
      >
        <Table
          rowKey="key"
          className="list_table"
          columns={columns}
          dataSource={dataSource}
          rowSelection={rowSelection}
          onRow={(record) => ({
            onClick: () => onRowClick(record),
          })}
          components={{
            body: {
              row: SortableRow,
            },
          }}
          pagination={false} // Optional: Disable pagination for better drag experience
        />
      </SortableContext>
    </DndContext>
  );
};

export default DragTable;
