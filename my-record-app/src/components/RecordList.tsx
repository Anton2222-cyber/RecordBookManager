import React from 'react';
import { RecordListProps } from "../types";

const RecordList: React.FC<RecordListProps> = ({ records, onEdit }) => {
    return (
        <div className="p-4">
            <h2 className="text-lg font-bold mb-4">Records</h2>
            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                <tr>
                    <th className="border border-gray-300 px-4 py-2">ID</th>
                    <th className="border border-gray-300 px-4 py-2">Name</th>
                    <th className="border border-gray-300 px-4 py-2">Age</th>
                    <th className="border border-gray-300 px-4 py-2">Email</th>
                    <th className="border border-gray-300 px-4 py-2">Question</th>
                    <th className="border border-gray-300 px-4 py-2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {records.map((record) => (
                    <tr key={record.id}>
                        <td className="border border-gray-300 px-4 py-2">{record.id}</td>
                        <td className="border border-gray-300 px-4 py-2">{record.name}</td>
                        <td className="border border-gray-300 px-4 py-2">{record.age}</td>
                        <td className="border border-gray-300 px-4 py-2">{record.email}</td>
                        <td className="border border-gray-300 px-4 py-2">{record.question}</td>
                        <td className="border border-gray-300 px-4 py-2">
                            <button
                                onClick={() => onEdit(record)}
                                className="bg-yellow-500 text-white px-4 py-1 rounded"
                            >
                                Edit
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default RecordList;
