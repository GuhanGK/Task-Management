import React, { useState } from 'react';
import { Collapse, Table } from 'antd';

const { Panel } = Collapse;

const ListTableView = () => {
  const [expandIconPosition, setExpandIconPosition] = useState('end');

  const dataSource = [
    { key: '1', task: 'Interview with Design Team', dayTime: 'Today', progress: '10 Downing Street' },
    { key: '2', task: 'Prepare Presentation', dayTime: 'Tomorrow', progress: 'Conference Room' },
    { key: '3', task: 'Team Meeting', dayTime: 'Next Week', progress: 'Zoom' },
  ];

  const columns = [
    { title: 'Task', dataIndex: 'task', key: 'task' },
    { title: 'Day/Time', dataIndex: 'dayTime', key: 'dayTime' },
    { title: 'Progress', dataIndex: 'progress', key: 'progress' },
  ];

  const onChange = (key) => {
    console.log('Collapse panel changed:', key);
  };

  return (
    <div className="custom-table-wrapper">
      <Table
        dataSource={[]} // Empty dataSource to remove any initial rows (no table data yet)
        columns={columns}
        pagination={false}
        title={() => 'Task Details'} // Table title (header)
        footer={() => (
          <Collapse defaultActiveKey={['1']} onChange={onChange}>
            <Panel header="Task Details" key="1">
              <Table
                dataSource={dataSource}
                columns={columns}
                pagination={false}
                size="small"
              />
            </Panel>
          </Collapse>
        )}
      />
    </div>
  );
};

export default ListTableView;
