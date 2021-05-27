import React, { FC, useState } from 'react';

import { Button } from 'antd';
import { EditableProTable } from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';

type DataSourceType = {
    id: React.Key;
    account?: string;
    email?: string;
    password?: string;
};

const defaultData: DataSourceType[] = [
    {
        id: 0o1,
        account: 'admin01',
        email: 'test@example.com',
        password: 'password123',
    },
    {
        id: 0o2,
        account: 'admin02',
        email: 'test@example.com',
        password: 'password123',
    },
    {
        id: 0o3,
        account: 'admin03',
        email: 'test@example.com',
        password: 'password123',
    },
];

const AdministratorList: FC = () => {
    const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
        defaultData.map((item) => item.id),
    );
    const [dataSource, setDataSource] = useState<DataSourceType[]>(() => defaultData);

    const columns: ProColumns<DataSourceType>[] = [
        {
            title: '管理员账号',
            dataIndex: 'account',
            width: '30%',
            formItemProps: {
                rules: [
                    {
                        required: true,
                        whitespace: true,
                        message: '此项是必填项',
                    },
                ],
            },
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            width: '30%',
            formItemProps: {
                rules: [
                    {
                        required: true,
                        whitespace: true,
                        message: '此项是必填项',
                    },
                    {
                        pattern:
                            /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
                        message: '邮箱格式不正确',
                    },
                ],
            },
        },
        {
            title: '密码',
            dataIndex: 'password',
            formItemProps: {
                rules: [
                    {
                        required: true,
                        whitespace: true,
                        message: '此项是必填项',
                    },
                    {
                        min: 6,
                        whitespace: true,
                        message: '最小为 6 位',
                    },
                ],
            },
        },
        {
            title: '操作',
            valueType: 'option',
            width: 250,
            render: () => {
                return null;
            },
        },
    ];

    return (
        <>
            <div className="text-center text-lg">这里是个标题</div>
            <EditableProTable<DataSourceType>
                headerTitle="管理者編集"
                columns={columns}
                rowKey="id"
                value={dataSource}
                onChange={setDataSource}
                recordCreatorProps={{
                    newRecordType: 'dataSource',
                    record: () => ({
                        id: Date.now(),
                    }),
                }}
                toolBarRender={() => {
                    return [
                        <Button type="primary" key="save">
                            更新
                        </Button>,
                    ];
                }}
                editable={{
                    type: 'multiple',
                    editableKeys,
                    actionRender: (row, config, defaultDoms) => {
                        return [defaultDoms.delete];
                    },
                    onValuesChange: (record, recordList) => {
                        setDataSource(recordList);
                    },
                    onChange: setEditableRowKeys,
                }}
            />
        </>
    );
};

export default AdministratorList;
