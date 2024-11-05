import React, { useState, useEffect } from 'react';
import {createRecord, updateRecord} from '../api/api';
import { ZodIssue } from 'zod';
import recordSchema from "../interfaces/zod/recordSchema";
import { RecordFormProps } from "../types";
import { AxiosError } from "axios";

interface CreateRecordFormProps extends RecordFormProps {
    editRecord?: { id: number; name: string; age: number; email: string; question: string } | null;
}

const CreateRecordForm: React.FC<CreateRecordFormProps> = ({ onRecordCreated, editRecord }) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState<number | ''>('');
    const [email, setEmail] = useState('');
    const [question, setQuestion] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        if (editRecord) {
            setName(editRecord.name);
            setAge(editRecord.age);
            setEmail(editRecord.email);
            setQuestion(editRecord.question);
        } else {
            setName('');
            setAge('');
            setEmail('');
            setQuestion('');
        }
    }, [editRecord]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validation = recordSchema.safeParse({ name, age, email, question });

        if (!validation.success) {
            const errorMessages: { [key: string]: string } = {};
            validation.error.errors.forEach((error: ZodIssue) => {
                if (error.path[0]) errorMessages[error.path[0]] = error.message;
            });
            setErrors(errorMessages);
            return;
        }

        setErrors({});

        try {
            let newRecord;
            if (editRecord) {
                // Ваша логіка для оновлення запису
                // викликайте функцію updateRecord замість createRecord
                newRecord = await updateRecord(editRecord.id, { name, age: Number(age), email, question });
            } else {
                newRecord = await createRecord({ name, age: Number(age), email, question });
            }
            onRecordCreated(newRecord);
            setName('');
            setAge('');
            setEmail('');
            setQuestion('');
        } catch (error) {
            const apiError = error as AxiosError;
            setErrors({ email: apiError.message });
        }
    };

    const isDisabled = editRecord && (name === editRecord.name && age === editRecord.age && email === editRecord.email && question === editRecord.question);

    return (
        <form onSubmit={handleSubmit} className="p-4 border mb-4 rounded">
            <h2 className="text-lg font-bold mb-4">{editRecord ? 'Edit Record' : 'Create New Record'}</h2>
            <div className="mb-4">
                <label className="block mb-1">Name:</label>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-2 w-full"
                />
                {errors.name && <p className="text-red-500">{errors.name}</p>}
            </div>
            <div className="mb-4">
                <label className="block mb-1">Age:</label>
                <input
                    value={age}
                    onChange={(e) => setAge(e.target.value ? Number(e.target.value) : '')}
                    className="border p-2 w-full"
                    type="number"
                />
                {errors.age && <p className="text-red-500">{errors.age}</p>}
            </div>
            <div className="mb-4">
                <label className="block mb-1">Email:</label>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 w-full"
                />
                {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>
            <div className="mb-4">
                <label className="block mb-1">Question:</label>
                <input
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="border p-2 w-full"
                />
                {errors.question && <p className="text-red-500">{errors.question}</p>}
            </div>
            {errors.form && <p className="text-red-500">{errors.form}</p>}
            <button type="submit" className={`bg-blue-500 text-white px-4 py-2 rounded ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={isDisabled ?? false}>
                {editRecord ? 'Edit Record' : 'Add Record'}
            </button>
        </form>
    );
};

export default CreateRecordForm;
