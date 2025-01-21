import React, {useEffect, useState} from 'react';
import RecordList from './components/RecordList';
import CreateRecordForm from "./components/CreateRecordForm";
import {IRecord} from "./interfaces";
import {fetchRecords} from "./api/api";

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

    const onEditComplited = (id: number) => {
        console.log('edit', id);
        setEditRecord(null)
        loadRecords();

    }


    const handleRecordCreated = (newRecord: IRecord) => {
        if (!editRecord) {
            setRecords((prevRecords) => [...prevRecords, newRecord]);
        }
    };

    const handleEditRecord = (record: IRecord) => {
        setEditRecord(record);
    };

    return (
        <div>
            <CreateRecordForm onRecordCreated={handleRecordCreated} editRecord={editRecord} onEditCompleted={onEditComplited}/>
            <RecordList records={records} onEdit={handleEditRecord}/>
        </div>
    );
};

export default App;
