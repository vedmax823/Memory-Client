import apiClient from "."

export const registrateUser = async (name : string) => {
    return await apiClient.post('/api/User/register', {name});
}