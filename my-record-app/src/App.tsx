import React from 'react';
import RecordList from './components/RecordList';
import CreateRecordForm from "./components/CreateRecordForm.tsx";


const App: React.FC = () => {
    const [refresh, setRefresh] = React.useState(0);

    return (
        <div>
            <CreateRecordForm onRecordCreated={() => setRefresh((prev) => prev + 1)} />
            <RecordList key={refresh} />
        </div>
    );
};

export default App;
