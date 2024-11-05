import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

// Функція для отримання записів
export const fetchRecords = async () => {
    try {
        const response = await api.get('/api/record');
        return response.data;
    } catch (error) {
        console.error('Помилка при отриманні записів:', error);
        throw error;
    }
};

// Функція для створення нового запису
export const createRecord = async (record: { name: string; age: number; email: string; question: string; }) => {
    try {
        const response = await api.post('/api/record', record);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                console.log(error.response.data);
                throw error.response.data;
            }
        }
        console.error('Несподівана помилка при створенні запису:', error);
        throw new Error("Несподівана помилка при створенні запису. Спробуйте ще раз.");
    }
};

// Функція для оновлення існуючого запису
export const updateRecord = async (id: number, record: { name: string; age: number; email: string; question: string; }) => {
    try {
        const response = await api.put(`/api/record/${id}`, record);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                console.log(error.response.data);
                throw error.response.data;
            }
        }
        console.error('Несподівана помилка при оновленні запису:', error);
        throw new Error("Несподівана помилка при оновленні запису. Спробуйте ще раз.");
    }
};
