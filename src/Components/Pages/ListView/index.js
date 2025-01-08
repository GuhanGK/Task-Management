import React, { useContext, useState } from "react";
import {
  SettingOutlined,
  EllipsisOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  Collapse,
  DatePicker,
  Dropdown,
  Input,
  Menu,
  Table,
} from "antd";
import DragTable from "../../Reusable/DragTable";
const { Panel } = Collapse;
const ListTableView = () => {
  const [expandIconPosition, setExpandIconPosition] = useState("end");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]); // Initial selected keys
  const [selectedRows, setSelectedRows] = useState([]); // Store the selected rows
  const [clickAddTask, setClickAddTask] = useState(false);
  const [addData, setAddData] = useState({
    progress: "",
    catagory: ""
  })

  const ActionMenu = () => (
    <Menu
      onClick={(e) => {
        e.domEvent.stopPropagation(); // Prevent event propagation
      }}
    >
      <Menu.Item key="1"
        onClick={() =>
          setAddData((prev) => ({
            ...prev, // Spread previous state
            catagory: "work", // Update category
          }))
        }
      >
        <span className="text-[#000000] text-[16px] font-semibold">WOEK</span>
      </Menu.Item>
      <Menu.Item key="2"
        onClick={() =>
          setAddData((prev) => ({
            ...prev, // Spread previous state
            catagory: "personal", // Update category
          }))
        }
      >
        <span className="text-[#DA2F2F] text-[16px] font-semibold">
          PERSONAL
        </span>
      </Menu.Item>
    </Menu>
  );

  const ProgressMenu = () => (
    <Menu
      onClick={(e) => {
        e.domEvent.stopPropagation(); // Prevent event propagation
      }}
    >
      <Menu.Item key="1"
        onClick={() =>
          setAddData((prev) => ({
            ...prev, // Spread previous state
            progress: "to do", // Update category
          }))
        } 
      >
        <span className="text-[#000000] text-[16px] font-semibold">TO DO</span>
      </Menu.Item>
      <Menu.Item key="2"
        onClick={() =>
          setAddData((prev) => ({
            ...prev, // Spread previous state
            progress: "in progress", // Update category
          }))
        }
      >
        <span className="text-[#DA2F2F] text-[16px] font-semibold">
          IN PROGRESS
        </span>
      </Menu.Item>
      <Menu.Item key="3"
        onClick={() =>
          setAddData((prev) => ({
            ...prev, // Spread previous state
            progress: "completed", // Update category
          }))
        }
      >
        <span className="text-[#DA2F2F] text-[16px] font-semibold">
          COMPLETED
        </span>
      </Menu.Item>
    </Menu>
  );

  const DropdownCatagoryButton = () => (
    <Dropdown overlay={<ActionMenu />}>
      <PlusOutlined
        onClick={(e) => {
          e.stopPropagation(); // Prevent event propagation
        }}
      />
    </Dropdown>
  );
  const DropdownProgressButton = () => (
    <Dropdown overlay={<ProgressMenu />}>
      <PlusOutlined
        onClick={(e) => {
          e.stopPropagation(); // Prevent event propagation
        }}
      />
    </Dropdown>
  );

  const TaskButtons = () => (
    <div className="flex gap-2">
      <Button className="w-[84px] h-[30px] bg-[#7B1984] text-[14px] text-[#fff] font-bold rounded-[60px]">
        Add
      </Button>
      <Button
        className="w-[84px] h-[30px] text-[14px] text-[#000] font-bold rounded-[60px]"
        onClick={() => setClickAddTask(false)}
      >
        Cancel
      </Button>
    </div>
  );

  const onChange = (key) => {
    console.log("Collapse panel changed:", key);
  };

  const genExtra = () => (
    <SettingOutlined
      onClick={(event) => {
        event.stopPropagation(); // Prevent collapse trigger on icon click
      }}
    />
  );

  const columns1 = [
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
    },
  ];
  const RowContext = React.createContext({});

  const dataSource1 = [
    {
      key: "1",
      task: (
        <div className="flex flex-col gap-2">
          <Input placeholder="Task Title" />
          <TaskButtons />
        </div>
      ),
      dayTime: <DatePicker />,
      progress: addData.progress ? addData.progress : <DropdownProgressButton />,
      process: addData.catagory ? addData.catagory : <DropdownCatagoryButton />,
      action: <></>,
    },
  ];

  const handleClickEdit = (record) => {
    console.log("redord---->", record)
  }

  const dataSource = [
    {
      key: "1",
      task: "Interview with Design Team",
      dayTime: "Today",
      progress: "10 Downing Street",
      process: <button>Work</button>,
    },
    {
      key: "2",
      task: "John",
      dayTime: 42,
      progress: "31-01-2025",
      process: <button>Work</button>,
    },
  ];

  const columns = [
    {
      key: "sort",
      width: "10%",
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
              <Menu.Item key="1">
                <span className="text-[#000000] text-[16px] font-semibold" onClick={handleClickEdit(record)}>
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
  const columns2 = [
    {
      key: "sort",
      width: "10%",
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
              <Menu.Item key="1">
                <span className="text-[#000000] text-[16px] font-semibold" onClick={handleClickEdit(record)}>
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
  const columns3 = [
    {
      key: "sort",
      width: "10%",
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
              <Menu.Item key="1">
                <span className="text-[#000000] text-[16px] font-semibold" onClick={handleClickEdit(record)}>
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

  return (
    <>
      <div className="p-4">
        <Table
          dataSource={[]} // Empty dataSource to remove any initial rows (no table data yet)
          columns={columns}
          pagination={false}
          rowSelection={rowSelection}
          className="list_header_table"
          footer={() => (
            <Collapse
              className="table_collapse_container"
              defaultActiveKey={["1"]}
              onChange={onChange}
              expandIconPosition={expandIconPosition}
            >
              <Panel header="Todo (3)" key="1">
                {dataSource.length > 0 ? (
                  <>
                    <div className="">
                      <div className="border-b border-[#0000001A] h-[40px] px-[20px] flex items-center">
                        <p
                          className="flex items-center text-[14px] font-bold"
                          onClick={() => setClickAddTask(true)}
                        >
                          ADD TASK
                        </p>
                      </div>
                      {clickAddTask && (
                        <div className="add_table_container">
                          <Table
                            className="add_table_wrapper"
                            columns={columns1}
                            dataSource={dataSource1}
                            pagination={false}
                            rowSelection={rowSelection}
                          />
                        </div>
                      )}
                    </div>
                    <DragTable 
                      sourceData={dataSource}
                    />
                  </>
                ) : (
                  <div className="min-h-[200px]">
                    <div className="border-b border-[#0000001A] h-[40px] px-[20px] flex items-center">
                      <p className="flex items-center text-[14px] font-bold">
                        ADD TASK
                      </p>
                    </div>
                    {clickAddTask && (
                      <div className="add_table_container">
                        <Table
                          className="add_table_wrapper"
                          columns={columns1}
                          dataSource={dataSource1}
                          pagination={false}
                          rowSelection={rowSelection}
                        />
                      </div>
                    )}

                    <div className="h-[100%] flex justify-center items-center">
                      <p className="text-[15px] text-[#2F2F2F] font-medium">
                        No Tasks in To-Do
                      </p>
                    </div>
                  </div>
                )}
              </Panel>
            </Collapse>
          )}
        />
        <br />
        <div>
          <Collapse
            className="bg-[#85D9F1] text-left"
            defaultActiveKey={["1"]}
            onChange={onChange}
            expandIconPosition={expandIconPosition}
          >
            <Panel header="In-Progress (3)" key="1">
              <DragTable 
                sourceData={dataSource}
              />
            </Panel>
          </Collapse>
        </div>

        <br />
        <div>
          <Collapse
            className="bg-[#CEFFCC] text-left"
            defaultActiveKey={["1"]}
            onChange={onChange}
            expandIconPosition={expandIconPosition}
          >
            <Panel header="Completed (3)" key="1">
              <DragTable 
                sourceData={dataSource}
              />
            </Panel>
          </Collapse>
        </div>
        
      </div>
    </>
  );
};

export default ListTableView;
