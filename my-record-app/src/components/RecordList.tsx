// src/components/RecordList.tsx
import React, { useEffect, useState } from 'react';
import { fetchRecords, createRecord } from '../api/api';
import CreateRecordForm from "./CreateRecordForm.tsx";


interface Record {
    id: number;
    name: string;
    age: number;
    email: string;
    question: string;
}

const RecordList: React.FC = () => {
    const [records, setRecords] = useState<Record[]>([]);

    const getRecords = async () => {
        const data = await fetchRecords();
        setRecords(data);
    };

    useEffect(() => {
        getRecords();
    }, []);

    const handleRecordAdded = () => {
        getRecords(); // Оновлюємо список записів
    };

    return (
        <div>
            <CreateRecordForm onRecordAdded={handleRecordAdded} />
            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                <tr>
                    <th className="text-left border border-gray-300 px-4 py-2">Name</th>
                    <th className="text-left border border-gray-300 px-4 py-2">Age</th>
                    <th className="text-left border border-gray-300 px-4 py-2">Email</th>
                    <th className="text-left border border-gray-300 px-4 py-2">Question</th>
                </tr>
                </thead>
                <tbody>
                {records.map((record) => (
                    <tr key={record.id}>
                        <td className="border border-gray-300 px-4 py-2">{record.name}</td>
                        <td className="border border-gray-300 px-4 py-2">{record.age}</td>
                        <td className="border border-gray-300 px-4 py-2">{record.email}</td>
                        <td className="border border-gray-300 px-4 py-2">{record.question}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default RecordList;
