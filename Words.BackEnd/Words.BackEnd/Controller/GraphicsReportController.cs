using Infrastructure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace Words.BackEnd.Controller {
    [Route("api/[controller]")]
    [ApiController]
    public class GraphicsReportController : ControllerBase {
        private readonly WordDbContext _context;

        public GraphicsReportController(WordDbContext context) {
            _context = context;
        }

        [HttpGet("relatorioOrdenadoPorQuantidade")]
        public async Task<IActionResult> GetReportByValue() {
            var wordsReport = new Dictionary<int, int>();
            for (int key = 2; key <= 46; key++) {
                int value = await _context.Words.Where(w => w.Size == key).CountAsync();
                if (value != 0) {
                    wordsReport.Add(key, value);
                }
            }

            if (wordsReport.Count == 0) { return NotFound(); }

            var orderedEnumerable = wordsReport.OrderBy(s => s.Value);

            var wordOrdered = new Dictionary<int, int>();

            foreach (var word in orderedEnumerable) {
                wordOrdered.Add(word.Key, word.Value);
            }

            string wordJson = JsonConvert.SerializeObject(wordOrdered);

            return Ok(wordJson);
        }

        [HttpGet("relatorioOrdenadoPorCaracteres")]
        public async Task<IActionResult> GetReportByKey() {
            var wordsReport = new Dictionary<int, int>();
            for (int key = 2; key <= 46; key++) {
                int value = await _context.Words.Where(w => w.Size == key).CountAsync();
                if (value != 0) {
                    wordsReport.Add(key, value);
                }
            }

            if (wordsReport.Count == 0) { return NotFound(); }

            var orderedEnumerable = wordsReport.OrderBy(s => s.Key);

            var wordOrdered = new Dictionary<int, int>();

            foreach (var word in orderedEnumerable) {
                wordOrdered.Add(word.Key, word.Value);
            }

            string wordJson = JsonConvert.SerializeObject(wordOrdered);

            return Ok(wordJson);
        }

        [HttpGet("relatorioMaiorValor")]
        public async Task<IActionResult> GetReportByMaxValue() {
            var wordsReport = new Dictionary<int, int>();
            for (int key = 2; key <= 46; key++) {
                int value = await _context.Words.Where(w => w.Size == key).CountAsync();
                if (value != 0) {
                    wordsReport.Add(key, value);
                }
            }

            if (wordsReport.Count == 0) { return NotFound(); }

            var maxValue = wordsReport.Max(s => s.Value);

            var maxValueItem = new Dictionary<int, int>();

            IEnumerable<KeyValuePair<int, int>> enumerable = wordsReport.Where(v => v.Value == maxValue);

            foreach (var word in enumerable) {
                maxValueItem.Add(word.Key, word.Value);
            }

            string wordJson = JsonConvert.SerializeObject(maxValueItem);

            return Ok(wordJson);
        }

        [HttpGet("relatorioMenorValor")]
        public async Task<IActionResult> GetReportByMinValue() {
            var wordsReport = new Dictionary<int, int>();
            for (int key = 2; key <= 46; key++) {
                int value = await _context.Words.Where(w => w.Size == key).CountAsync();
                if (value != 0) {
                    wordsReport.Add(key, value);
                }
            }

            if (wordsReport.Count == 0) { return NotFound(); }

            var minValue = wordsReport.Min(s => s.Value);

            var minValueItem = new Dictionary<int, int>();

            IEnumerable<KeyValuePair<int, int>> enumerable = wordsReport.Where(v => v.Value == minValue);

            foreach (var word in enumerable) {
                minValueItem.Add(word.Key, word.Value);
            }

            string wordJson = JsonConvert.SerializeObject(minValueItem);

            return Ok(wordJson);
        }
    }
}
