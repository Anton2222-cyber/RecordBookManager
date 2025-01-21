using Microsoft.EntityFrameworkCore;
using RecordDataBook.Data;
using RecordDataBook.Entities;
using RecordDataBook.Interfaces.Repositories;
using RecordDataBook.Interfaces.Services;

namespace RecordDataBook.Services
{
    public class RecordService (
        IRecordRepository repository
    ): IRecordService
    {


        public async Task<IEnumerable<Record>> GetRecordsAsync()
        {
           return await repository.GetAllAsync();
        }

        

        public async Task CreateRecordAsync(Record record)
        {
            await repository.AddAsync(record);
        }

        public async Task UpdateRecordAsync(Record updatedRecord)
        {
            await repository.UpdateAsync(updatedRecord);
        }

    }
}
