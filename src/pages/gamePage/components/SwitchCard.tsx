import { FC } from 'react';
import Card, { CardProps } from './Card';
import EmptyCard from './EmptyCard';

const SwitchCard:FC<CardProps> = ({col, row, card}) => {
    if (!card) <EmptyCard />
    return (
        <Card 
            row={row}
            card={card}
            col={col}
        />
    );
};

export default SwitchCard;