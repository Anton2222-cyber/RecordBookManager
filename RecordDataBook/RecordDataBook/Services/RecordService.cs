using Microsoft.EntityFrameworkCore;
using RecordDataBook.Context;
using RecordDataBook.Entities;
using RecordDataBook.Interfaces;

namespace RecordDataBook.Services
{
    public class RecordService : IRecordService
    {
        private readonly AppDbContext _context;

        public RecordService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Record>> GetRecordsAsync()
        {
            return await _context.Records.ToListAsync();
        }

        public async Task<bool> IsEmailUniqueAsync(string email)
        {
            return !await _context.Records.AnyAsync(r => r.Email == email);
        }

        public async Task<Record> CreateRecordAsync(Record record)
        {
            if (!await IsEmailUniqueAsync(record.Email))
            {
                throw new InvalidOperationException("Record with this email already exists.");
            }

            _context.Records.Add(record);
            await _context.SaveChangesAsync();
            return record;
        }

        public async Task<Record> UpdateRecordAsync(int id, Record updatedRecord)
        {
            var existingRecord = await _context.Records.FindAsync(id);
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

            _context.Records.Update(existingRecord);
            await _context.SaveChangesAsync();
            return existingRecord;
        }

    }
}
