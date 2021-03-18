import { FC } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Child } from './App';

const grid = 8;

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 10px 10px 0`,
    display: 'inline-flex',
    width: '120px',

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',
    border: '1px solid grey',
    // styles we need to apply on draggables
    ...draggableStyle,
});

const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    margin: '10px 0',
});

interface ChildProps {
    subItems: Child[];
    type: string;
}

const ServiceCommandUnit: FC<ChildProps> = (props) => {
    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity

    return (
        <Droppable droppableId={props.type.toString()} type={`droppableSubItem`}>
            {(provided, snapshot) => (
                <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
                    {props.subItems.map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                            {(provided: any, snapshot) => (
                                <div style={{ display: 'flex' }}>
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
                                                display: 'block',
                                                margin: '0 10px',
                                                border: '1px solid #000',
                                            }}
                                        >
                                            Drag
                                        </span>
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
    );
};

export default ServiceCommandUnit;
