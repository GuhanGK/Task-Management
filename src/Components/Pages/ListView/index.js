import React, { useState } from 'react';
import { SettingOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Button, Collapse, Dropdown, Menu, Table } from 'antd';
import ProfileImg from "../../../assets/profileImg.svg"
const { Panel } = Collapse;
const ListTableView = () => {
  const [expandIconPosition, setExpandIconPosition] = useState('end');
  const [selectedRowKeys, setSelectedRowKeys] = useState([]); // Initial selected keys
  const [selectedRows, setSelectedRows] = useState([]); // Store the selected rows

  const onChange = (key) => {
    console.log('Collapse panel changed:', key);
  };

  const genExtra = () => (
    <SettingOutlined
      onClick={(event) => {
        event.stopPropagation(); // Prevent collapse trigger on icon click
      }}
    />
  );

  const dataSource = [
    { key: '1', task: 'Interview with Design Team', dayTime: "Today", progress: '10 Downing Street', process: <button>Work</button> },
    { key: '2', task: 'John', dayTime: 42, progress: '31-01-2025', process: <button>Work</button> },
  ];

  const columns = [
    { title: 'Name', dataIndex: 'task', key: 'task' },
    { title: 'Age', dataIndex: 'dayTime', key: 'dayTime' },
    { title: 'Address', dataIndex: 'progress', key: 'progress' },
    { title: 'Address', dataIndex: 'process', key: 'process' },
    { 
        title: 'Action', 
        dataIndex: 'action', 
        key: 'action', 
        render: () => (
            <Dropdown
              overlay={
                <Menu
                    onClick={(e) => {
                        e.domEvent.stopPropagation(); // Prevent event propagation
                    }}
                >
                  <Menu.Item key="1">Edit</Menu.Item>
                  <Menu.Item key="2">Delete</Menu.Item>
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
      disabled: record.type === 'S', // Example of disabling rows
      name: record.name,
    }),
  };

  const onRowClick = (record) => {
    const isSelected = selectedRowKeys.includes(record.key);
    if (isSelected) {
      setSelectedRowKeys((prevKeys) => prevKeys.filter((key) => key !== record.key));
      setSelectedRows((prevRows) => prevRows.filter((row) => row.key !== record.key));
    } else {
      setSelectedRowKeys((prevKeys) => [...prevKeys, record.key]);
      setSelectedRows((prevRows) => [...prevRows, record]);
    }
  };

  return (
    <>
        <div className='flex justify-between'>
            <div>
                <h3>TaskBuddy</h3>
                <div className='flex gap-3'>
                    <p>List</p>
                    <p>Board</p>
                </div>
            </div>
            <div>
                <div className='flex gap-2 items-center'>
                    <img src={ProfileImg} alt='ProfileImg' />
                    <p>Guhan</p>
                </div>
                <div>
                    <Button>Logout</Button>
                </div>
            </div>
        </div>
        <div className='p-4'>
            {/* <Collapse
                className='table_collapse'
                onChange={onChange}
                expandIconPosition={expandIconPosition}
                items={[
                    {
                        key: '1',
                        label: 'Todo (3)',
                        children: (
                            <Table
                                className="list_table"
                                columns={columns}
                                dataSource={dataSource}
                                pagination={false}
                                rowSelection={rowSelection}
                                onRow={(record) => ({
                                    onClick: () => onRowClick(record),
                                })}
                            />
                        ),
                    },
                ]}
            /> */}

            <Table
                    dataSource={[]} // Empty dataSource to remove any initial rows (no table data yet)
                    columns={columns}
                    pagination={false}
                    className='list_header_table'
                    title={() => 'Task Details'} // Table title (header)
                    footer={() => (
                      <Collapse defaultActiveKey={['1']} onChange={onChange} expandIconPosition={expandIconPosition}>
                        <Panel header="Task Details" key="1">
                        <Table
                                className="list_table"
                                columns={columns}
                                dataSource={dataSource}
                                pagination={false}
                                rowSelection={rowSelection}
                                onRow={(record) => ({
                                    onClick: () => onRowClick(record),
                                })}
                            />
                        </Panel>
                      </Collapse>
                    )}
                  />
        </div>
    </>
  );
};

export default ListTableView;
