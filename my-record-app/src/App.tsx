// src/App.tsx
import React from 'react';
import RecordList from './components/RecordList';
import CreateRecordForm from './components/CreateRecordForm';

const App: React.FC = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Record Management</h1>
            <RecordList />
        </div>
    );
};

export default App;
