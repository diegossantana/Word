using Domain;
using Infrastructure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Words.BackEnd.Controller {
    [Route("api/[controller]")]
    [ApiController]
    public class WordController : ControllerBase {

        private HttpClient _httpClient;

        private readonly WordDbContext _context;

        public WordController(WordDbContext context) {
            _context = context;
        }

        [HttpGet("carregarPalavras")]
        public async Task PopulationDatabase() {
            using (_httpClient = new HttpClient()) {
                HttpResponseMessage httpResponseMessage = await _httpClient.GetAsync("https://www.ime.usp.br/~pf/dicios/br-utf8.txt");
                var concatedWords = await httpResponseMessage.Content.ReadAsStringAsync();
                var wordsSpliteds = concatedWords.Split("\n").ToList();

                var wordsByLetter = new Dictionary<char, List<string>>();
                foreach (var letter in "AÁÀÃÂaáàâãBbCcDdEÉÈÊeéèêFfGgHhIÍÌÎiíìîJjKkLlMmNnOÓÒÕÔoóòõôPpQqRrSsTtUÚÙÛuúùûVvWwXxYyZz") {
                    wordsByLetter.Add(letter, new List<string>());
                }

                foreach (var word in wordsSpliteds) {
                    if (word.Length >= 2 && word.Length <= 46) {
                        wordsByLetter[word[0]].Add(word);
                    }
                }

                foreach (var letter in wordsByLetter.Keys) {
                    var wordsForLetter = wordsByLetter[letter];
                    if (wordsForLetter.Count > 500) {
                        wordsForLetter = wordsForLetter.Take(500).ToList();
                    }

                    foreach (var word in wordsForLetter) {
                        await _context.AddRangeAsync(new Word(word));
                    }

                    await _context.SaveChangesAsync();
                }
            }
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

        [HttpGet("size/skip/{skip:int}/take/{take:int}/size/{size:int}")]
        public async Task<IActionResult> GetWordsBySize([FromRoute] int skip = 0, [FromRoute] int take = 25, [FromRoute] int size = 2) {
            var total = await _context.Words.Where(w => w.Size == size).CountAsync();
            var words = await _context.Words
                .Where(w => w.Size == size)
                .AsNoTracking()
                .Skip(skip)
                .Take(take)
                .ToListAsync();

            if (words.Count() == 0) {
                return NotFound();
            }

            return Ok(new {
                total,
                words
            });
        }

        [HttpGet("id/{id}")]
        public async Task<IActionResult> GetWordById(int id) {
            var word = await _context.Words.FirstOrDefaultAsync(x => x.WordId == id);
            if (word == null) {
                return NotFound();
            }

            return Ok(word);
        }

        [HttpGet("name/{name}")]
        public async Task<IActionResult> GetWordByName(string name) {
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
