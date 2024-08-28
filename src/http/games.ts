import apiClient from "."

export const createNewGame = async (maxPlayersCount : number, cardsCount : number) => {
    return await apiClient.post('/api/game', {maxPlayersCount, cardsCount})
}

export const getGames = async () => {
    return await apiClient.get('/api/game')
}

export const constGetGameById = async (id : string) => {
    return await apiClient.get(`/api/game/${id}`);
}

export const joinGame = async (id : string) => {
    return await apiClient.patch(`/api/game/${id}`);
}

export const checkPictures = async (gameId : string, firstId : string, secondId : string) => {
    return await apiClient.post(`/api/game/${gameId}`, {firstId : firstId, secondId : secondId});
}

export const checkPicturesOnline = async (gameId : string, firstId : string, secondId : string) => {
    return await apiClient.post(`/api/realtimegame/game/${gameId}`, {firstId : firstId, secondId : secondId});
}