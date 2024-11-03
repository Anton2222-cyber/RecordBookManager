import React, { useState } from 'react';
import { createRecord } from '../api/api';



const CreateRecordForm: React.FC<RecordFormProps> = ({ onRecordCreated }) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState<number | ''>('');
    const [email, setEmail] = useState('');
    const [question, setQuestion] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (name && age && email && question) {
            await createRecord({ name, age: Number(age), email, question });
            onRecordCreated();
            setName('');
            setAge('');
            setEmail('');
            setQuestion('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border mb-4 rounded">
            <h2 className="text-lg font-bold mb-4">Create New Record</h2>
            <div className="mb-4">
                <label className="block mb-1">Name:</label>
                <input value={name} onChange={(e) => setName(e.target.value)} className="border p-2 w-full" />
            </div>
            <div className="mb-4">
                <label className="block mb-1">Age:</label>
                <input value={age} onChange={(e) => setAge(e.target.value ? Number(e.target.value) : '')} className="border p-2 w-full" type="number" />
            </div>
            <div className="mb-4">
                <label className="block mb-1">Email:</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 w-full" type="email" />
            </div>
            <div className="mb-4">
                <label className="block mb-1">Question:</label>
                <input value={question} onChange={(e) => setQuestion(e.target.value)} className="border p-2 w-full" />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Record</button>
        </form>
    );
};

export default CreateRecordForm;
