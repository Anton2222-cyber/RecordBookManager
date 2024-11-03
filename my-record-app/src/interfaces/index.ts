interface IRecord {
    id: number;
    name: string;
    age: number;
    email: string;
    question: string;
}

interface RecordFormProps {
    onRecordCreated: () => void;
}