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

export async function createTeam(teamData) {
    const response = await axios.post('/team', teamData);
    return response.data;
}

export async function createMatch(matchData) {
    const response = await axios.post('/match', matchData);
    return response.data;
}

export async function updateMatch({ id, ...data }) {
    const response = await axios.patch(`/match/${id}`, data);
    return response.data;
}

export async function fetchLeaderboard() {
    const response = await axios.get('/leaderboard');
    return response.data;
}

export async function updateTeam({ id, ...data }) {
    const response = await axios.patch(`/team/${id}`, data);
    return response.data;
}

export async function deleteTeam(id) {
    const response = await axios.delete(`/team/${id}`);
    return response.data;
}

export async function deleteMatch(id) {
    const response = await axios.delete(`/match/${id}`);
    return response.data;
}