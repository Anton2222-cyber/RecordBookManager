using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecordDataBook.Context;
using RecordDataBook.Entities;
using RecordDataBook.Interfaces;

namespace RecordDataBook.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecordController : ControllerBase
    {
        private readonly IRecordService _recordService;

        public RecordController(IRecordService recordService)
        {
            _recordService = recordService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Record>>> GetRecords()
        {
            var records = await _recordService.GetRecordsAsync();
            return Ok(records);
        }

        [HttpPost]
        public async Task<ActionResult<Record>> CreateRecord(Record record)
        {
            try
            {
                var createdRecord = await _recordService.CreateRecordAsync(record);
                return CreatedAtAction(nameof(GetRecords), new { id = createdRecord.Id }, createdRecord);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
        [HttpPut("{id}")]
        public async Task<ActionResult<Record>> UpdateRecord(int id, Record record)
        {
            try
            {
                var updatedRecord = await _recordService.UpdateRecordAsync(id, record);
                return Ok(updatedRecord);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

    }
}

