import axios from './axiosinstance'
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();

export async function fetchTeams(params = {}) {
    const response = await axios.get('/team', { params })
    return response.data
}

export async function fetchMatches(params = {}) {
    const response = await axios.get('/match', { params })
    return response.data
}

export async function fetchUsers(params = {}) {
    const response = await axios.get('/user', { params })
    return response.data
}