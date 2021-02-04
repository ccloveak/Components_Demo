import './App.css';

import React from 'react';
import { Space } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';

const MyIcon = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2365318_s6qxbcrvgof.js',
});

const App = () => {
    return (
        <Space size="large">
            <MyIcon type="icon-icmember" />
            <MyIcon type="icon-tree1" />
            <MyIcon type="icon-theme1" />
            <MyIcon type="icon-theme" />
        </Space>
    );
};

export default App;
