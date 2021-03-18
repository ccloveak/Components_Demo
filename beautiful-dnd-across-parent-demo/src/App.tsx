import React, { FC, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ServiceCommandUnit from './ServiceCommandUnit';
import { static_items } from './data';

export interface Child {
    id: string;
    name: string;
    sort: string;
    parentId: string;
}

interface Father {
    id: string;
    name: string;
    sort: string;
    sheetDefinitions: Child[];
}

const reorderFather = (list: Father[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};
const reorderChild = (list: Child[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

const grid = 8;

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    background: isDragging ? 'lightgreen' : 'grey',
    ...draggableStyle,
});

const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    width: 200,
});

const App: FC = () => {
    const [dataItems, setDataItems] = useState<Father[]>(static_items);

    const onDragEnd = (result: any) => {
        // dropped outside the list
        console.log(result);
        console.log('innner drag');
        if (!result.destination) {
            return;
        }
        const sourceIndex = result.source.index;
        const destIndex = result.destination.index;
        if (result.type === 'droppableItem') {
            const items: Father[] = reorderFather(dataItems, sourceIndex, destIndex);
            setDataItems(items);
        } else if (result.type === 'droppableSubItem') {
            const itemSubItemMap = dataItems.reduce((acc: any, item) => {
                acc[item.id] = item.sheetDefinitions;
                //console.log('item 67:  ' + JSON.stringify(item));
                return acc;
            }, {});

            const sourceParentId = String(result.source.droppableId);
            const destParentId = String(result.destination.droppableId);
            console.log('sourceParentId' + sourceParentId);
            console.log('itemSubItemMap' + JSON.stringify(itemSubItemMap));
            const sourceSubItems = itemSubItemMap[sourceParentId];
            const destSubItems = itemSubItemMap[destParentId];

            let newItems = [...dataItems];

            /** In this case subItems are reOrdered inside same Parent */
            if (sourceParentId === destParentId) {
                const reorderedSubItems: Child[] = reorderChild(
                    sourceSubItems,
                    sourceIndex,
                    destIndex,
                );
                newItems = newItems.map((item) => {
                    if (item.id === sourceParentId) {
                        item.sheetDefinitions = reorderedSubItems;
                    }
                    return item;
                });
                setDataItems(newItems);
            } else {
                const newSourceSubItems: Child[] = [...sourceSubItems];
                const [draggedItem] = newSourceSubItems.splice(sourceIndex, 1);

                const newDestSubItems: Child[] = [...destSubItems];
                newDestSubItems.splice(destIndex, 0, draggedItem);
                newItems = newItems.map((item) => {
                    if (item.id === sourceParentId) {
                        item.sheetDefinitions = newSourceSubItems;
                    } else if (item.id === destParentId) {
                        item.sheetDefinitions = newDestSubItems;
                    }
                    return item;
                });
                setDataItems(newItems);
            }
        }
    };

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable" type="droppableItem">
                {(provided, snapshot) => (
                    <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
                        {dataItems.map((item, index) => (
                            <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                                {(provided: any, snapshot) => (
                                    <div>
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style,
                                            )}
                                        >
                                            {item.name}
                                            <span
                                                {...provided.dragHandleProps}
                                                style={{
                                                    display: 'inline-block',
                                                    margin: '0 10px',
                                                    border: '1px solid #000',
                                                }}
                                            >
                                                Drag
                                            </span>
                                            <ServiceCommandUnit
                                                subItems={item.sheetDefinitions}
                                                type={item.id}
                                            />
                                        </div>
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default App;
