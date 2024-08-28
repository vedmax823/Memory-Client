import { FC, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCard } from "../../../http/cards";
import { SelectedIdContext } from "../GamePage";
import { useUserStore } from "../../../hooks/useUserStore";

export interface CardProps {
  row: number;
  col: number;
  card: Card | null;
}

const Card: FC<CardProps> = ({ card }) => {
  const { gameId } = useParams();
  const [isOpen, setIsOpen] = useState(card?.isOpen);
  const [picture, setPicture] = useState<string | null>(card?.link || "");
  const context = useContext(SelectedIdContext);
  const user = useUserStore(state => state.user);

  useEffect(() => {
    const updateStatesWithDelay = async () => {
      setIsOpen(card?.isOpen);

      await new Promise(resolve => setTimeout(resolve, 200));

      setPicture(card?.link || "");
    };

    updateStatesWithDelay();
  }, [card]);

  if (!context) return null;

  const { selectedIds, addSelectedId, isChecking, turnUser, isStarted } = context;

  const handleClick = async () => {
    if (isChecking || isOpen || !user || !isStarted) return;
    if (selectedIds.length < 2 && turnUser == user.id) {
      try {
        addSelectedId(card!.id);
        const responce = await getCard(card!.id, gameId!);
        const newCard : Card= responce.data;
        console.log(newCard);
        // setPicture(newCard.link);
        // setIsOpen(true);
      } catch (error) {
        console.error("Error fetching link:", error);
      }
    }
  };

  return (
    <div className="w-36 h-36 perspective-1000 m-4 overflow-hidden" onClick={handleClick}>
      <div
        className={`relative w-full h-full text-center transition-transform duration-500 transform-style-3d ${
          isOpen ? "rotate-y-180" : ""
        }`}
      >
        <div className="absolute w-full h-full backface-hidden bg-gray-300 flex items-center justify-center">
          <span className="text-center">Натисніть, щоб дізнатися більше</span>
        </div>
        <div className="absolute w-full h-full backface-hidden bg-green-200 text-white flex flex-col items-center justify-center transform rotate-y-180">
          {picture ? (
            <img src={`${import.meta.env.VITE_API_URL}/${picture}`} alt="card" />
          ) : (
            <span>Завантаження...</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;