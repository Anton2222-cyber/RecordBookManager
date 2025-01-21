using Microsoft.AspNetCore.Mvc;
using RecordDataBook.Entities;
using RecordDataBook.Interfaces.Services;

namespace RecordDataBook.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecordController(
        IRecordService _recordService
    ) : ControllerBase
    {

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Record>>> GetRecords()
        {
            var records = await _recordService.GetRecordsAsync();
            return Ok(records);
        }

        [HttpPost]
        public async Task<ActionResult> CreateRecord(Record record)
        {
            try
            {
               await _recordService.CreateRecordAsync(record);
                return Ok(new
                {
                    record
                });
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            
        }
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateRecord(Record record)
        {
            try
            {
                await _recordService.UpdateRecordAsync(record);
                return Ok();
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

    }
}

