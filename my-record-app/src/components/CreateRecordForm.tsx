import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { createRecord, updateRecord } from '../api/api';

import recordSchema from '../interfaces/zod/recordSchema';
import { CreateRecordFormProps } from "../types";
import { IRecord } from "../interfaces";

const CreateRecordForm: React.FC<CreateRecordFormProps> = ({ onRecordCreated, editRecord,onEditCompleted }) => {
    const { register, handleSubmit, formState: { errors, isDirty }, reset, setError } = useForm<IRecord>({
        resolver: zodResolver(recordSchema),
        defaultValues: {
            name: '',
            age: null,
            email: '',
            question: '',
        },
    });


    useEffect(() => {
        if (editRecord) {
            reset(editRecord);
        } else {
            reset({
                name: '',
                age: null,
                email: '',
                question: '',
            });
        }
    }, [editRecord, reset]);

    const onSubmit = async (data: IRecord) => {
        try {
            let newRecord;
            if (editRecord) {
                newRecord = await updateRecord(editRecord.id!, data);
                onEditCompleted(editRecord.id!);

            } else {
                newRecord = await createRecord(data);
            }
            onRecordCreated(newRecord);
            reset();
        } catch (error) {
            const apiError = error as AxiosError;

            if (apiError.message) {
                setError("email", { message: apiError.message });
            } else {
                console.error('Несподівана помилка:', error);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 border mb-4 rounded">
            <h2 className="text-lg font-bold mb-4">{editRecord ? 'Редагувати Запис' : 'Створити Новий Запис'}</h2>
            <div className="mb-4">
                <label className="block mb-1">Ім'я:</label>
                <input {...register('name')} className="border p-2 w-full"/>
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>
            <div className="mb-4">
                <label className="block mb-1">Вік:</label>
                <input {...register('age', {valueAsNumber: true})} className="border p-2 w-full" type="number"/>
                {errors.age && <p className="text-red-500">{errors.age.message}</p>}
            </div>
            <div className="mb-4">
                <label className="block mb-1">Електронна пошта:</label>
                <input {...register('email')} className="border p-2 w-full"/>
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>
            <div className="mb-4">
                <label className="block mb-1">Питання:</label>
                <input {...register('question')} className="border p-2 w-full"/>
                {errors.question && <p className="text-red-500">{errors.question.message}</p>}
            </div>
            <button
                type="submit"
                className={`bg-blue-500 text-white px-4 py-2 rounded ${!isDirty && editRecord ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={editRecord ? !isDirty : false}
            >
                {editRecord ? 'Редагувати Запис' : 'Додати Запис'}
            </button>

        </form>
    );
};

export default CreateRecordForm;
