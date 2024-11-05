using RecordDataBook.Entities;

namespace RecordDataBook.Interfaces
{
    public interface IRecordService
    {
        Task<IEnumerable<Record>> GetRecordsAsync();
        Task<Record> CreateRecordAsync(Record record);

        Task<Record> UpdateRecordAsync(int id, Record record);
    }
}
