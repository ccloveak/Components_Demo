import React, { useState, useEffect } from 'react';
import { Tree, Spin } from 'antd';
// import { EditOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
// const { Search } = Input;
// 测试数据
const { TreeNode } = Tree;

interface DateType {
    title: string;
    key: string;
    children?: [];
}

const tree_data = [
    {
        title: '個人情報',
        key: 'SAMPLE_SHEET_CATEGORY_PERSONAL_INFO',
        children: [
            {
                title: '[サンプル]住所・連絡先',
                key: 'SAMPLE_SHEET_DEFINITION_CONTACT_ADDRESS',
            },
            {
                title: '[サンプル]評価履歴',
                key: 'SAMPLE_SHEET_DEFINITION_ANNUAL_REVIEW',
            },
            {
                title: '[サンプル]住所・連絡先1',
                key: 'SAMPLE_SHEET_DEFINITION_CONTACT_ADDRESS1',
            },
            {
                title: '[サンプル]評価履歴1',
                key: 'SAMPLE_SHEET_DEFINITION_ANNUAL_REVIEW1',
            },
            {
                title: '[サンプル]住所・連絡先2',
                key: 'SAMPLE_SHEET_DEFINITION_CONTACT_ADDRESS2',
            },
            {
                title: '[サンプル]評価履歴2',
                key: 'SAMPLE_SHEET_DEFINITION_ANNUAL_REVIEW2',
            },
        ],
    },
    {
        title: 'test個人情報',
        key: 'testSAMPLE_SHEET_CATEGORY_PERSONAL_INFO',
        children: [
            {
                title: 'test[サンプル]住所・連絡先',
                key: 'testSAMPLE_SHEET_DEFINITION_CONTACT_ADDRESS',
            },
            {
                title: 'test[サンプル]評価履歴',
                key: 'testSAMPLE_SHEET_DEFINITION_ANNUAL_REVIEW',
            },
            {
                title: 'test[サンプル]住所・連絡先1',
                key: 'testSAMPLE_SHEET_DEFINITION_CONTACT_ADDRESS1',
            },
            {
                title: 'test[サンプル]評価履歴1',
                key: 'testSAMPLE_SHEET_DEFINITION_ANNUAL_REVIEW1',
            },
            {
                title: 'test[サンプル]住所・連絡先2',
                key: 'testSAMPLE_SHEET_DEFINITION_CONTACT_ADDRESS2',
            },
            {
                title: 'test[サンプル]評価履歴2',
                key: 'testSAMPLE_SHEET_DEFINITION_ANNUAL_REVIEW2',
            },
        ],
    },
    {
        title: '資格情報',
        key: 'SAMPLE_SHEET_CATEGORY_QUALIFICATIONS',
        children: [
            {
                title: '[サンプル]学歴',
                key: 'SAMPLE_SHEET_DEFINITION_EDUCATION_BACKGROUND',
            },
            {
                title: '[サンプル]資格管理',
                key: 'SAMPLE_SHEET_DEFINITION_CERTIFICATION',
            },
            {
                title: '[サンプル]学歴1',
                key: 'SAMPLE_SHEET_DEFINITION_EDUCATION_BACKGROUND1',
            },
            {
                title: '[サンプル]資格管理1',
                key: 'SAMPLE_SHEET_DEFINITION_CERTIFICATION1',
            },
            {
                title: '[サンプル]学歴2',
                key: 'SAMPLE_SHEET_DEFINITION_EDUCATION_BACKGROUND2',
            },
            {
                title: '[サンプル]資格管理2',
                key: 'SAMPLE_SHEET_DEFINITION_CERTIFICATION2',
            },
        ],
    },
    {
        title: 'test資格情報',
        key: 'testSAMPLE_SHEET_CATEGORY_QUALIFICATIONS',
        children: [
            {
                title: 'test[サンプル]学歴',
                key: 'testSAMPLE_SHEET_DEFINITION_EDUCATION_BACKGROUND',
            },
            {
                title: 'test[サンプル]資格管理',
                key: 'testSAMPLE_SHEET_DEFINITION_CERTIFICATION',
            },
            {
                title: 'test[サンプル]学歴1',
                key: 'testSAMPLE_SHEET_DEFINITION_EDUCATION_BACKGROUND1',
            },
            {
                title: 'test[サンプル]資格管理1',
                key: 'testSAMPLE_SHEET_DEFINITION_CERTIFICATION1',
            },
            {
                title: 'test[サンプル]学歴2',
                key: 'testSAMPLE_SHEET_DEFINITION_EDUCATION_BACKGROUND2',
            },
            {
                title: 'test[サンプル]資格管理2',
                key: 'testSAMPLE_SHEET_DEFINITION_CERTIFICATION2',
            },
        ],
    },
];

const App = () => {
    const [treeData, setTreeData] = useState(tree_data);
    function onDrop(info: any) {
        const dragNode = info.dragNode;
        const dropNode = info.node;
        const isSameLevel = (a: any, b: any) => {
            const aLevel = a.props.pos.split('-').length;
            const bLevel = b.props.pos.split('-').length;
            return aLevel === bLevel;
        };

        const isSameParent = (a: any, b: any) => {
            const aLevel = a.props.pos.split('-');
            const bLevel = b.props.pos.split('-');
            aLevel.pop();
            bLevel.pop();
            return aLevel.join('') === bLevel.join('');
        };
        const canDrop =
            isSameParent(dragNode, dropNode) && isSameLevel(dragNode, dropNode) && info.dropToGap;
        if (!canDrop) {
            return;
        }
        const sameLevel = isSameLevel(dragNode, dropNode);
        const sameParent = isSameParent(dragNode, dropNode);
        if (sameParent && sameLevel) {
            const dropKey = info.node.props.eventKey;
            const dragKey = info.dragNode.props.eventKey;
            const dropPos = info.node.props.pos.split('-');
            const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

            const loop = (data: any, key: string, callback: any) => {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].key === key) {
                        return callback(data[i], i, data);
                    }
                    if (data[i].children) {
                        loop(data[i].children, key, callback);
                    }
                }
            };
            const data = [...treeData];

            // Find dragObject
            let dragObj: any;
            loop(data, dragKey, (item: any, index: any, arr: any) => {
                arr.splice(index, 1);
                dragObj = item;
            });

            if (!info.dropToGap) {
                // Drop on the content
                loop(data, dropKey, (item: any) => {
                    item.children = item.children || [];
                    // where to insert 示例添加到尾部，可以是随意位置
                    item.children.push(dragObj);
                });
            } else if (
                (info.node.props.children || []).length > 0 && // Has children
                info.node.props.expanded && // Is expanded
                dropPosition === 1 // On the bottom gap
            ) {
                loop(data, dropKey, (item: any) => {
                    item.children = item.children || [];
                    // where to insert 示例添加到头部，可以是随意位置
                    item.children.unshift(dragObj);
                });
            } else {
                let ar: any = [];
                let i: any;
                loop(data, dropKey, (item: any, index: any, arr: any) => {
                    ar = arr;
                    i = index;
                });
                if (dropPosition === -1) {
                    ar.splice(i, 0, dragObj);
                } else {
                    ar.splice(i + 1, 0, dragObj);
                }
            }
            setTreeData(data);
        }
    }
    return <Tree defaultExpandAll draggable treeData={treeData} onDrop={onDrop} />;
};

export default App;
