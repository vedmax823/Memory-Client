import apiClient from ".";

export const getCard = async (cardId: string, gameId: string) => {
  return await apiClient.patch("/api/realtimegame/card", {
    gameId,
    cardId,
  });
};
