import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});


export const fetchRecords = async () => {
    try {
        const response = await api.get('/api/record');
        return response.data;
    } catch (error) {
        console.error('Помилка при отриманні записів:', error);
        throw error;
    }
};


export const createRecord = async (record: { name: string; age: number; email: string; question: string; }) => {
    try {
        const response = await api.post('/api/record', record);
        return response.data;
    } catch (error) {
        console.error('Помилка при створенні запису:', error);
        throw error;
    }
};
