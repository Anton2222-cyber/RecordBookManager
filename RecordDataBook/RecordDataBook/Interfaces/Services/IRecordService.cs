using RecordDataBook.Entities;

namespace RecordDataBook.Interfaces.Services
{
    public interface IRecordService
    {
        Task<IEnumerable<Record>> GetRecordsAsync();
        Task CreateRecordAsync(Record record);

        Task UpdateRecordAsync(Record record);
    }
}
