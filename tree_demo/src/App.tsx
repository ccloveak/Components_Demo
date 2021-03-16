import React, { FC, useState } from 'react';
import { Tree } from 'antd';
const treeData = [
    {
        title: '0-0',
        key: '0-0',
        children: [
            {
                title: '0-0-0',
                key: '0-0-0',
                children: [
                    {
                        title: '0-0-0-0',
                        key: '0-0-0-0',
                    },
                    {
                        title: '0-0-0-1',
                        key: '0-0-0-1',
                    },
                    {
                        title: '0-0-0-2',
                        key: '0-0-0-2',
                    },
                ],
            },
            {
                title: '0-0-1',
                key: '0-0-1',
                children: [
                    {
                        title: '0-0-1-0',
                        key: '0-0-1-0',
                    },
                    {
                        title: '0-0-1-1',
                        key: '0-0-1-1',
                    },
                    {
                        title: '0-0-1-2',
                        key: '0-0-1-2',
                    },
                ],
            },
            {
                title: '0-0-2',
                key: '0-0-2',
            },
        ],
    },
    {
        title: '0-1',
        key: '0-1',
        children: [
            {
                title: '0-1-0-0',
                key: '0-1-0-0',
            },
            {
                title: '0-1-0-1',
                key: '0-1-0-1',
            },
            {
                title: '0-1-0-2',
                key: '0-1-0-2',
            },
        ],
    },
    {
        title: '0-2',
        key: '0-2',
    },
];

const App: FC = () => {
    const [expandedKeys, setExpandedKeys] = useState(['0-0-0', '0-0-1']);
    const [checkedKeys, setCheckedKeys] = useState(['0-0-0']);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [autoExpandParent, setAutoExpandParent] = useState(true);

    const onExpand = (expandedKeysValue: any) => {
        console.log('onExpand', expandedKeysValue);
        setExpandedKeys(expandedKeysValue);
        setAutoExpandParent(false);
    };

    const onCheck = (checkedKeysValue: any) => {
        console.log('onCheck', checkedKeysValue);
        setCheckedKeys(checkedKeysValue);
    };

    const onSelect = (selectedKeysValue: any, info: any) => {
        console.log('onSelect', info);
        setSelectedKeys(selectedKeysValue);
    };

    return (
        <Tree
            checkable
            selectable
            onExpand={onExpand}
            expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
            onCheck={onCheck}
            checkedKeys={checkedKeys}
            onSelect={onSelect}
            selectedKeys={selectedKeys}
            treeData={treeData}
        />
    );
};

export default App;
