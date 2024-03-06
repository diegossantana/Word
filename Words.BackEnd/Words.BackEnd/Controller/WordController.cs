using Domain;
using Infrastructure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Words.BackEnd.Controller {
    [Route("api/[controller]")]
    [ApiController]
    public class WordController : ControllerBase {

        private readonly WordDbContext _context;

        public WordController(WordDbContext context) {
            _context = context;
        }

        [HttpGet("skip/{skip:int}/take/{take:int}")]
        public async Task<IActionResult> GetWords([FromRoute] int skip = 0, [FromRoute] int take = 25) {
            var total = await _context.Words.CountAsync();
            var words = await _context.Words
                .AsNoTracking()
                .Skip(skip)
                .Take(take)
                .ToListAsync();
            return Ok(new {
                total, 
                words
            });
        }

        [HttpGet("id/{id}")]
        public async Task<IActionResult> GetWordById(int id) {
            var test = id;
            var word = await _context.Words.FirstOrDefaultAsync(x => x.WordId == id);
            if (word == null) {
                return NotFound();
            }

            return Ok(word);
        }

        [HttpGet("name/{name}")]
        public async Task<IActionResult> GetWordByName(string name) {
            var test = name;
            var word = await _context.Words.FirstOrDefaultAsync(w => w.Name.ToLower() == name.ToLower());
            if (word == null) {
                return NotFound();
            }

            return Ok(word);
        }

        [HttpPost]
        public async Task<IActionResult> PostWord(Word word) {
            word.Size = word.Name.Length;
            _context.Words.Add(word);
            await _context.SaveChangesAsync();

            return Ok(word);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateWord(int id, Word word) {
            if (id != word.WordId) {
                return BadRequest();
            }

            _context.Entry(word).State = EntityState.Modified;

            try {
                await _context.SaveChangesAsync();
            } catch (DbUpdateConcurrencyException) {
                if (!_context.Words.Any(e => e.WordId == id)) {
                    return NotFound();
                } else {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWord(int id) {
            var word = await _context.Words.FindAsync(id);

            if (word == null) { return NotFound(); }

            _context.Words.Remove(word);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
