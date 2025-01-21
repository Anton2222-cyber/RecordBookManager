using RecordDataBook.Entities;

namespace RecordDataBook.Interfaces.Repositories
{
    public interface IRecordRepository
    {
        Task<IEnumerable<Record>> GetAllAsync();
        Task AddAsync(Record record);
        Task UpdateAsync(Record record);
        
    }
}
