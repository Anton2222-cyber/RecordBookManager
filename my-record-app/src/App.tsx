import React, { useEffect, useState } from 'react';
import RecordList from './components/RecordList';
import CreateRecordForm from "./components/CreateRecordForm";
import { IRecord } from "./interfaces";
import { fetchRecords } from "./api/api";

const App: React.FC = () => {
    const [records, setRecords] = useState<IRecord[]>([]);
    const [editRecord, setEditRecord] = useState<IRecord | null>(null);

    const loadRecords = async () => {
        const data = await fetchRecords();
        setRecords(data);
    };

    useEffect(() => {
        loadRecords();
    }, []);

    const handleRecordCreated = (newRecord: IRecord) => {
        if (editRecord) {

            setRecords((prevRecords) => prevRecords.map(record => record.id === newRecord.id ? newRecord : record)); // Оновлюємо запис
            setEditRecord(null);
        } else {
            setRecords((prevRecords) => [...prevRecords, newRecord]);
        }
    };

    const handleEditRecord = (record: IRecord) => {
        setEditRecord(record);
    };

    return (
        <div>
            <CreateRecordForm onRecordCreated={handleRecordCreated} editRecord={editRecord} />
            <RecordList records={records} onEdit={handleEditRecord} />
        </div>
    );
};

export default App;
