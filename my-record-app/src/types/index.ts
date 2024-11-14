import {IRecord} from "../interfaces";
export type RecordListProps = {
    records: IRecord[];
    onEdit: (record: IRecord) => void;
};


export interface CreateRecordFormProps {
    onRecordCreated: (record: IRecord) => void;
    editRecord?: IRecord | null;


}
