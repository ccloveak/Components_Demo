import './App.css';

import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import { useState } from 'react';

const CHARACTERS = [
    {
        id: 'gambaruzoi',
        name: 'がんばるぞい',
        thumb: './images/1.png',
    },
    {
        id: 'gyp',
        name: 'ぎょぱー！',
        thumb: './images/2.png',
    },
    {
        id: 'iine',
        name: 'いいね！',
        thumb: './images/3.png',
    },
    {
        id: 'shincyoku_doudesuka',
        name: '進捗どうですか',
        thumb: './images/4.png',
    },
    {
        id: 'shobon',
        name: 'ショボーン',
        thumb: './images/5.png',
    },
];

const App = () => {
    const [characters, updateCharacters] = useState(CHARACTERS);
    const handleOnDragEnd = (result: any) => {
        const items = Array.from(characters);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        updateCharacters(items);
    };
    return (
        <div className="App">
            <header className="App-header">
                <h1>めそこスタンプ</h1>
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="characters">
                        {(provided) => (
                            <ul
                                className="characters"
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {characters.map(({ id, name, thumb }, index) => {
                                    return (
                                        <Draggable key={id} draggableId={id} index={index}>
                                            {(provided) => (
                                                <li
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <div className="characters-thumb">
                                                        <img src={thumb} alt={`${name} Thumb`} />
                                                    </div>
                                                    <p>{name}</p>
                                                </li>
                                            )}
                                        </Draggable>
                                    );
                                })}
                                {provided.placeholder}
                            </ul>
                        )}
                    </Droppable>
                </DragDropContext>
            </header>
        </div>
    );
};

export default App;
