import { FC } from 'react';
import SwitchCard from './SwitchCard';

interface RowComponentProps{
    cols : number,
    row : number,
    field : Card[]
}

const RowComponent : FC<RowComponentProps> = ({cols, row, field}) => {
    const getCard = (col : number, row : number) => {
        return field.find(card => card.col === col && card.row === row) || null
    }
    return (
        <div className="flex justify-center">
            {Array.from({length : cols}).map((_, index) => 
                <SwitchCard
                    key={index}
                    row={row}
                    col={index}
                    card={getCard(row, index)} 
                />
            )}
        </div>
    );
};

export default RowComponent;