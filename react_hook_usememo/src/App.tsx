import Counter from './Counter';
import CounterWithUseMemo from './CounterWithUseMemo';
import React from 'react';

const App = () => {
    return (
        <>
            <Counter />
            <br />
            <CounterWithUseMemo />
        </>
    );
};
export default App;
