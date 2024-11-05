import {IRecord} from "../interfaces";

export type RecordFormProps = {
    onRecordCreated: (newRecord: IRecord) => void;
};

export type RecordListProps = {
    records: IRecord[];
    onEdit: (record: IRecord) => void;
};