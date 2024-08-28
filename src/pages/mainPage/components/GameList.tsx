import { useEffect, useState } from "react";
import { createNewGame, getGames, joinGame } from "../../../http/games";
import { useNavigate } from "react-router-dom";

const GamesList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [players, setPlayers] = useState("1");
  const [cards, setCards] = useState("12"); // default value
  const [games, setGames] = useState<Game[]>([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const navigate = useNavigate();

  const handleCreateGame = async () => {
    try{
      const game : Game = (await createNewGame(parseInt(players), parseInt(cards))).data;
      setGames((prevGames) => [game, ...prevGames]);
      setPlayers("1");
      setCards("12");
      closeModal();
      navigate(`live/${game.id}`)
    }
    catch(e){
      console.log(e);
      console.log("error")
    }
  };

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const gamesData = await getGames();
        console.log(gamesData.data);
        setGames(gamesData.data);
      } catch (error) {
        console.log("Error fetching games:", error);
      }
    };
    fetchGames();
  }, []);

  const onJoin = async (id : string) => {
    try{
      const game : Game= (await joinGame(id)).data;
      console.log(game);
      navigate(`/live/${game.id}`);
    }
    catch(e){
      console.log(e)
    }
  }

  return (
    <div className="flex flex-col items-center justify-start p-4 bg-slate-50 h-[90vh]">
      {/* Header with Button */}
      <div className="flex items-center justify-between w-full max-w-4xl mb-4">
        <h1 className="text-3xl font-bold text-indigo-600">Open Games</h1>
        <button
          onClick={openModal}
          className="py-2 px-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-semibold shadow-md hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 ml-4"
        >
          Create New Game
        </button>
      </div>
    
      {/* Game list  */}
      <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-4xl flex-grow overflow-y-scroll">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {games.map((game) => (
            <div key={game.id} className="p-4 bg-gray-100 rounded-lg shadow">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold">{game.id.slice(0, 7)}</h3>
                  <p className="text-gray-600">Players: {game.maxPlayersCount}</p>
                  <p className="text-gray-600">Cards: {game.cardsCount}</p>
                </div>
                <button 
                  onClick={() => onJoin(game.id)}
                  className="py-2 px-4 bg-indigo-500 text-white rounded-lg font-semibold shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Join
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for creating a new game */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold text-indigo-600 mb-4 text-center">
              Create a New Game
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Number of Players
              </label>
              <input
                // disabled
                type="number"
                value={players}
                onChange={(e) => setPlayers(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter number of players"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Number of Cards
              </label>
              <select
                value={cards}
                onChange={(e) => setCards(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="12">12</option>
                <option value="16">16</option>
                <option value="20">20</option>
                <option value="24">24</option>
              </select>
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleCreateGame}
                className="py-2 px-4 bg-indigo-500 text-white rounded-lg font-semibold shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Create Game
              </button>
              <button
                onClick={closeModal}
                className="py-2 px-4 bg-gray-500 text-white rounded-lg font-semibold shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GamesList;
