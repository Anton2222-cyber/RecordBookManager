import axios from 'axios';
import {IRecord} from "../interfaces";

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


export const createRecord = async (record: IRecord) => {
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


export const updateRecord = async (id: number, record: IRecord) => {
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
        throw new Error("Unexpected error");
    }
};
