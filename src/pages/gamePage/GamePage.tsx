import { createContext, useEffect } from "react";

import GameGrid from "./components/GameGrid";
import { useGame } from "./hooks/useGame";
import UsersComponent from "./components/UsersComponent";

interface SelectedIdContextType {
  selectedIds: string[];
  addSelectedId: (id: string) => void;
  isChecking: boolean;
  turnUser : string;
  isStarted : boolean;
}

export const SelectedIdContext = createContext<
  SelectedIdContextType | undefined
>(undefined);

const GamePage = () => {
  const { game, selectedIds, addSelectedId, isChecking } = useGame();
  useEffect(() => console.log(game), [game])
  
  if (!game) return <>404 Not Found</>;
  return (
    <SelectedIdContext.Provider
      value={{ selectedIds, addSelectedId, isChecking, turnUser : game.turnUser, isStarted : game.isStarted }}
    >
      <div className="w-ful flex justify-center">
        <div className="w-1/6">
          <UsersComponent 
            users={game.users} 
            turnUser={game.turnUser}
            usersCount={game.maxPlayersCount}
          />
        </div>
        <div className="w-5/6">
          <GameGrid game={game} />
          </div>
      </div>
    </SelectedIdContext.Provider>
  );
};

export default GamePage;
