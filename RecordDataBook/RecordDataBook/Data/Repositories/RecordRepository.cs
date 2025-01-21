using Microsoft.EntityFrameworkCore;
using RecordDataBook.Entities;
using RecordDataBook.Interfaces.Repositories;

namespace RecordDataBook.Data.Repositories
{
    public class RecordRepository(
        AppDbContext context
    ) : IRecordRepository
    {
        public async Task AddAsync(Record record)
        {
            if (!await IsEmailUniqueAsync(record.Email))
            {
                throw new InvalidOperationException("Record with this email already exists.");
            }

            context.Records.Add(record);
            await context.SaveChangesAsync();
           
        }

        public async Task<IEnumerable<Record>> GetAllAsync()
        {
            return await context.Records.OrderBy(x=>x.Id).ToListAsync();
        }
        private async Task<bool> IsEmailUniqueAsync(string email)
        {
            return !await context.Records.AnyAsync(r => r.Email == email);
        }

        public async Task UpdateAsync(Record updatedRecord)
        {
            var existingRecord = await context.Records.FindAsync(updatedRecord.Id);
            if (existingRecord == null)
            {
                throw new InvalidOperationException("Record not found.");
            }

            if (existingRecord.Email != updatedRecord.Email && !await IsEmailUniqueAsync(updatedRecord.Email))
            {
                throw new InvalidOperationException("Record with this email already exists.");
            }

            existingRecord.Name = updatedRecord.Name;
            existingRecord.Age = updatedRecord.Age;
            existingRecord.Question = updatedRecord.Question;
            existingRecord.Email = updatedRecord.Email;

            context.Records.Update(existingRecord);
            await context.SaveChangesAsync();
        }
    }
}
