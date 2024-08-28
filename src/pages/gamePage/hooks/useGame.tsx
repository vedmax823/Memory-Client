import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { 
  // checkPictures, 
  checkPicturesOnline, constGetGameById } from "../../../http/games";
import * as signalR from "@microsoft/signalr";

export const useGame = () => {
  const [selectedIds, setSelectedId] = useState<string[]>([]);
  const [game, setGame] = useState<GameFull | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const { gameId } = useParams();

  const updateGame = (game: GameFull) => {
    setGame(() => game);
  };

  // useEffect(() => {}, [gameId]);

  const stableUpdateGame = useCallback(updateGame, [updateGame]);
  useEffect(() => {
    console.log(gameId);
    if (!gameId) return;

    // Establish the SignalR connection only once
    const connect = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5197/gamehub")
      .withAutomaticReconnect()
      .build();

    const handleReceiveGame = (newGame: GameFull) => {
      console.log("Received:", newGame);
      stableUpdateGame(newGame);
    };

    connect
      .start()
      .then(() => {
        console.log("Connected to the SignalR hub");

        // Join the game only once
        return connect.invoke("JoinGame", gameId);
      })
      .then(() => {
        console.log(`Joined game with id: ${gameId}`);

        // Listen for game updates
        connect.on("ReceiveGame", handleReceiveGame);
      })
      .catch((err) => console.error("Connection failed: ", err));

    const fetchGame = async () => {
      if (!gameId) return;
      try {
        const game = await constGetGameById(gameId);
        setGame({ ...game.data });
      } catch (error) {
        console.log("Error fetching game:", error);
      }
    };

    fetchGame();

    // Cleanup the connection when the component unmounts
    return () => {
      connect.off("ReceiveGame", handleReceiveGame);
      connect
        .stop()
        .then(() => {
          console.log("Connection stopped");
        })
        .catch((err) =>
          console.error("Error while stopping connection: ", err)
        );
    };
  }, [gameId]);

  const addSelectedId = (id: string) => {
    if (selectedIds.length < 2 && !isChecking) {
      setSelectedId([...selectedIds, id]);
    }
  };

  useEffect(() => {
    if (selectedIds.length === 2 && gameId) {
      const delay = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms));

      const getNewGame = async () => {
        setIsChecking(true); // Починаємо перевірку
        await delay(2000); // Затримка на 2 секунди
        try {
          const newGame = await checkPicturesOnline(
            gameId,
            selectedIds[0],
            selectedIds[1]
          ); // Чекаємо на відповідь сервера
          setGame({ ...newGame.data });
          // console.log(newGame.data);
        } catch (error) {
          console.log("Error during checkPictures:", error);
        } finally {
          setIsChecking(false); // Завершуємо перевірку
          setSelectedId([]); // Очищаємо вибір після перевірки
        }
      };

      // Використовуємо await перед викликом асинхронної функції
      getNewGame();
    }
  }, [selectedIds, gameId]);

  return {
    game,
    selectedIds,
    addSelectedId,
    isChecking,
    updateGame,
  };
};
