using Infrastructure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Words.BackEnd.Controller {
    [Route("api/[controller]")]
    [ApiController]
    public class PdfReportController : ControllerBase {

        private readonly WordDbContext _context;

        public PdfReportController(WordDbContext context) {
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

            var pdfGenerator = new PdfGenerator();

            iTextSharp.text.Document document = pdfGenerator.PdfReportGenerate(wordOrdered, "Lista de items ordenados de forma crescente por total de palavras e seus caracteres.\n\n");

            return Ok(document);
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

            var pdfGenerator = new PdfGenerator();

            iTextSharp.text.Document document = pdfGenerator.PdfReportGenerate(wordOrdered, "Lista de items ordenados de forma crescente por caracteres e total de palavras.\n\n");

            return Ok(document);
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

            var wordOrdered = new Dictionary<int, int>();

            IEnumerable<KeyValuePair<int, int>> enumerable = wordsReport.Where(v => v.Value == maxValue);

            foreach (var word in enumerable) {
                wordOrdered.Add(word.Key, word.Value);
            }

            var pdfGenerator = new PdfGenerator();

            iTextSharp.text.Document document = pdfGenerator.PdfReportGenerate(wordOrdered, "Maior quantidade de palavras por caracter.\n\n");

            return Ok(document);
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

            var maxValue = wordsReport.Min(s => s.Value);

            var wordOrdered = new Dictionary<int, int>();

            IEnumerable<KeyValuePair<int, int>> enumerable = wordsReport.Where(v => v.Value == maxValue);

            foreach (var word in enumerable) {
                wordOrdered.Add(word.Key, word.Value);
            }

            var pdfGenerator = new PdfGenerator();

            iTextSharp.text.Document document = pdfGenerator.PdfReportGenerate(wordOrdered, "Menor quantidade de palavras por caracter.\n\n");

            return Ok(document);
        }
    }
}
