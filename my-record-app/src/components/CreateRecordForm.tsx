// src/components/AddRecord.tsx
import React, { useState } from 'react';
import { createRecord } from '../api/api';

const CreateRecordForm: React.FC<{ onRecordAdded: () => void }> = ({ onRecordAdded }) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState<number | ''>('');
    const [email, setEmail] = useState('');
    const [question, setQuestion] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await createRecord({ name, age: Number(age), email, question });
        onRecordAdded(); // Виклик функції для оновлення таблиці
        setName('');
        setAge('');
        setEmail('');
        setQuestion('');
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border p-2 mr-2"
            />
            <input
                type="number"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
                className="border p-2 mr-2"
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border p-2 mr-2"
            />
            <input
                type="text"
                placeholder="Question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                required
                className="border p-2 mr-2"
            />
            <button type="submit" className="bg-blue-500 text-white p-2">Add Record</button>
        </form>
    );
};

export default CreateRecordForm;
