import './App.css';

import React, { FC, useState } from 'react';

const App: FC = () => {
    /**
     * mock data
     */
    const list: string[] = [];
    for (let i = 0; i < 10; i++) {
        list.push(`Item ${i + 1}`);
    }
    const lineHeight = 42;
    const [dragging, setDragging] = useState<boolean>(false);
    const [draggingIndex, setDraggingIndex] = useState<number>(-1);
    const [startPageY, setStartPageY] = useState<number>(0);
    const [offsetPageY, setOffsetPageY] = useState<number>(0);
    const [displayList, setDisplayList] = useState<string[]>(list);

    const handleMounseDown = (evt: React.MouseEvent, index: number) => {
        setDragging(true);
        setStartPageY(evt.pageY);
        setDraggingIndex(index);
    };

    const handleMouseUp = () => {
        setDragging(false);
        setStartPageY(0);
        setDraggingIndex(-1);
    };

    const move = (arr: string[], startIndex: number, toIndex: number) => {
        arr = arr.slice();
        arr.splice(toIndex, 0, arr.splice(startIndex, 1)[0]);
        return arr;
    };

    const handleMouseMove = (evt: React.MouseEvent) => {
        let offset = evt.pageY - startPageY;
        if (offset > lineHeight && draggingIndex < list.length - 1) {
            // move down
            setDisplayList(move(list, draggingIndex, draggingIndex + 1));
            setDraggingIndex(draggingIndex + 1);
            setStartPageY(startPageY + lineHeight);
        } else if (offset < -lineHeight && draggingIndex > 0) {
            // move up
            offset += lineHeight;
            setDisplayList(move(list, draggingIndex, draggingIndex - 1));
            setDraggingIndex(draggingIndex - 1);
            setStartPageY(startPageY - lineHeight);
        }
        setOffsetPageY(offset);
    };

    const getDraggingStyle = (index: number) => {
        if (index !== draggingIndex) return {};
        return {
            backgroundColor: '#eee',
            transform: `translate(10px, ${offsetPageY}px)`,
            opacity: 0.5,
        };
    };

    return (
        <div className="dnd-sample">
            <ul>
                {displayList.map((text, i) => (
                    <li
                        key={text}
                        onMouseDown={(evt) => handleMounseDown(evt, i)}
                        style={getDraggingStyle(i)}
                    >
                        {text}
                    </li>
                ))}
            </ul>
            {dragging && (
                <div
                    className="dnd-sample-mask"
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                />
            )}
        </div>
    );
};

export default App;
