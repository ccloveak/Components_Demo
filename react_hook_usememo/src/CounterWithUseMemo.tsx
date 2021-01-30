import './App.css';

import { Button, Input, Space } from 'antd';
import React, { useMemo, useState } from 'react';

const CounterWithUseMemo = () => {
    const [count, setCount] = useState(0);
    const [value, setValue] = useState('');
    const expensive = useMemo(() => {
        let sum = 0;
        for (let i = 0; i < count * 1e9; i++) {
            sum += i;
        }
        return sum;
    }, [count]);
    return (
        <Space size={'large'}>
            {/* Optimization with useMemo */}
            <h3>You clicked {expensive} times!</h3>
            <Button onClick={() => setCount(count + 1)}>click me</Button>
            <Input value={value} onChange={(event) => setValue(event.target.value)} />
        </Space>
    );
};
export default CounterWithUseMemo;
