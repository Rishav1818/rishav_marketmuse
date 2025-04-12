import axios from 'axios';
import { QueryResponse } from '../types';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const processQuery = async (query: string): Promise<QueryResponse> => {
    try {
        const response = await api.post<QueryResponse>('/process-query', { query });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.detail || 'An error occurred while processing the query');
        }
        throw error;
    }
};

export const checkHealth = async (): Promise<boolean> => {
    try {
        const response = await api.get('/health');
        return response.data.status === 'healthy';
    } catch (error) {
        return false;
    }
}; 