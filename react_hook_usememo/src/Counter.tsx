import './App.css';

import { Button, Input, Space } from 'antd';
import React, { useState } from 'react';

const Counter = () => {
    const [count, setCount] = useState(0);
    const [value, setValue] = useState('');
    const expensive = () => {
        let sum = 0;
        for (let i = 0; i < count * 1e9; i++) {
            sum += i;
        }
        return sum;
    };
    return (
        <Space size={'large'}>
            <h3>You clicked {expensive()} times!</h3>
            <Button onClick={() => setCount(count + 1)}>click me</Button>
            <Input value={value} onChange={(event) => setValue(event.target.value)} />
        </Space>
    );
};
export default Counter;
