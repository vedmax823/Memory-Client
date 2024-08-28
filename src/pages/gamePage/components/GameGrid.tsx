import React, { FC } from 'react';
import RowComponent from './RowComponent';
interface GameGridProps{
    game : GameFull
}
const GameGrid : FC<GameGridProps>= ({game}) => {

    return (
        <div className="w-full flex flex-col">
            {
                Array.from({length : game.rows}).map((_, index) => 
                    <RowComponent 
                        key={index}
                        row={index}
                        cols={game.cols}
                        field={game.field}
                    />
                )
            }
        </div>
    );
};

export default GameGrid