import 'antd/dist/antd.css';

import { Button, Input } from 'antd';

import { PlusOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import React from 'react';

const columns = [
  {
    title: 'index',
    dataIndex: 'index',
    valueType: 'indexBorder',
  },
  {
    title: 'Title',
    dataIndex: 'name',
    renderFormItem: (_, { type, defaultRender,formItemProps, fieldProps, ...rest }, form) => {
      if (type === 'form') {
        return null;
      }
      const status = form.getFieldValue('state');
      if (status !== 'open') {
        return <Input {...fieldProps} placeholder="请输入test" />;
      }
        return defaultRender(_);
    }
  },
  {
    title: 'Money',
    dataIndex: 'title',
    width: 100,
    valueType: 'money',
    renderText: () => (Math.random() * 100).toFixed(2),
  },
  {
    title: 'Created Time',
    key: 'since',
    dataIndex: 'createdAt',
    valueType: 'dateTime',
  },
];

const ProTableTemplate = () => (
  <ProTable
      columns={columns}
      request={async () => ({
        data: [
          {
            key: 1,
            name: `TradeCode ${1}`,
            createdAt: 1602572994055,
          },
        ],
        success: true,
      })}
      rowKey="key"
      dateFormatter="string"
      headerTitle="查询 Table"
      search={{
        defaultCollapsed: false,
        optionRender: ({ searchText, resetText }, { form }) => [
          <Button
            key="searchText"
            type="primary"
            onClick={() => {
              form?.submit();
            }}
          >
            {searchText}
          </Button>,
          <Button
            key="resetText"
            onClick={() => {
              form?.resetFields();
            }}
          >
            {resetText}
          </Button>,
          <Button key="out">导出</Button>,
        ],
      }}
      toolBarRender={() => [
        <Button key="primary" type="primary">
          <PlusOutlined />
          新建
        </Button>,
      ]}
    />

);

export default ProTableTemplate
