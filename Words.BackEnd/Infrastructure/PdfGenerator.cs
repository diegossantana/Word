using iTextSharp.text;
using iTextSharp.text.pdf;
using System.Diagnostics;

namespace Infrastructure {
    public class PdfGenerator {
        public iTextSharp.text.Document PdfReportGenerate(Dictionary<int, int> report, string subTituloMetodo = "") {
            //configuração da margem pixel por milímetro
            var pxPorMm = 72 / 25.2F;

            //definição das proporções da página e suas margens
            var pdf = new iTextSharp.text.Document(PageSize.A4, 15 * pxPorMm, 15 * pxPorMm, 15 * pxPorMm, 20 * pxPorMm);

            //registrando nomes únicos para os relatórios gerados
            var nomeArquivo = $"relatório.{DateTime.Now.ToString("yyyy.MM.dd.HH.mm.ss")}.pdf";

            //gerando o arquivo
            var arquivo = new FileStream(Path.Combine(Directory.GetCurrentDirectory(), nomeArquivo), FileMode.Create);

            //faz o vinculo entre o documento criado(variável pdf), com o arquivo gerado (variável arquivo)
            var writer = PdfWriter.GetInstance(pdf, arquivo);

            //inserido ao documento o rodape
            writer.PageEvent = new PageEvent();

            //sinaliza que o documento está pronto para receber informações
            pdf.Open();

            Font fonteParagrafo = DefinirFontes();

            //definição do título, sua fonte e alinhamento
            Paragraph titulo = InserirTitulo(fonteParagrafo, "Relatório de Palavras\n\n");

            //adição da formatação ao documento
            pdf.Add(titulo);

            //definição do título, sua fonte e alinhamento
            Paragraph subtitulo = InserirSubTitulo(fonteParagrafo, subTituloMetodo);

            //adição da formatação ao documento
            pdf.Add(subtitulo);

            //adição da imagem
            InserirLogo(pdf, writer);

            PdfPTable tabela = CriarTabela();

            //defini o tamanho das colunas
            float[] larguraColuas = { 1f, 1f };

            //adiciona a definição a elemento, tamanho interior padrão e seu tamanho
            tabela.SetWidths(larguraColuas);
            tabela.DefaultCell.BorderWidth = 0;
            tabela.WidthPercentage = 100;

            //criação das células e seus nomes
            CriarCelulaTexto(tabela, "Quantidade de caracteres", PdfPCell.ALIGN_CENTER, true);
            CriarCelulaTexto(tabela, "Total de Palavras", PdfPCell.ALIGN_CENTER, true);

            //adição dos elementos ao relatório
            foreach (var item in report) {
                CriarCelulaTexto(tabela, item.Key.ToString(), PdfPCell.ALIGN_CENTER);
                CriarCelulaTexto(tabela, item.Value.ToString(), PdfPCell.ALIGN_CENTER);

                //uso de imagem dentro da celula
                /*
                var caminhoImagemCelula = Path.Combine(Directory.GetCurrentDirectory(), nomeArquivoImagem));
                CriarCelulaImagem(tabela, caminhoImagemCelula, 20, 20);
                */

            }

            //adiciona um link abaixo da logo
            //AdicionarLink(pdf, writer, pxPorMm);

            //adição da tabela ao documento
            pdf.Add(tabela);

            //encerra a edição
            pdf.Close();
            arquivo.Close();

            //abre pdf automaticamente após finalizado
            AbrirDocumentoAutomaticamente(nomeArquivo);

            return pdf;
        }

        private static void AbrirDocumentoAutomaticamente(string nomeArquivo) {
            //abre o pdf no visualizador padrão
            var caminhoPdf = Path.Combine(Directory.GetCurrentDirectory(), nomeArquivo);

            //abre o documento automaticamente ao final do processo
            if (File.Exists(caminhoPdf)) {
                Process.Start(new ProcessStartInfo() {
                    Arguments = $"/c start {caminhoPdf}",
                    FileName = "cmd.exe",
                    CreateNoWindow = true
                });
            }
        }

        public void ExcluirPdf() {
            string currentDirectory = Directory.GetCurrentDirectory();
            string[] filesCurrentDirectory = Directory.GetFiles(currentDirectory);
            string[] pdfFilesCurrentDirectory = Array.FindAll(filesCurrentDirectory, file => file.EndsWith(".pdf"));
            int lengthPdfFiles = pdfFilesCurrentDirectory.Length;
            for (int i = 0; i < lengthPdfFiles; i++)
            {
                File.Delete(pdfFilesCurrentDirectory[i]);
            }
        }

        private void AdicionarLink(iTextSharp.text.Document pdf, PdfWriter writer, float pxPorMm) {
            var fonteLink = new iTextSharp.text.Font(BaseFont.CreateFont(BaseFont.HELVETICA, BaseFont.CP1252, false), 9.9F, Font.NORMAL, BaseColor.Blue);
            var link = new Chunk("Canal do dev Diego S. Santana", fonteLink);
            link.SetAnchor("https://www.diegossantana.com/dev");
            var larguraTextoLink = BaseFont.CreateFont(BaseFont.HELVETICA, BaseFont.CP1252, false).GetWidthPoint(link.Content, fonteLink.Size);

            var caixaTexto = new ColumnText(writer.DirectContent);
            caixaTexto.AddElement(link);
            caixaTexto.SetSimpleColumn(
                pdf.PageSize.Width - pdf.RightMargin - larguraTextoLink,
                pdf.PageSize.Height - pdf.TopMargin - (30 * pxPorMm),
                pdf.PageSize.Width - pdf.RightMargin,
                pdf.PageSize.Height - pdf.TopMargin - (18 * pxPorMm)
                );
            caixaTexto.Go();
        }

        private static PdfPTable CriarTabela() {
            //adição de tabela de dados e definição da quantidade de colunas da tabela
            var tabela = new PdfPTable(2);

            //definição da borda
            tabela.DefaultCell.BorderWidth = 0;

            //definição do espaço ocupado pela tabela no campo
            tabela.WidthPercentage = 70;
            return tabela;
        }

        private static void CriarCelulaTexto(PdfPTable tabela, string texto, int alinhamentoHorz = PdfPCell.ALIGN_LEFT, bool negrito = false, bool italico = false, int tamanhoFonte = 12, int alturaCelula = 25) {
            int estilo = iTextSharp.text.Font.NORMAL;
            if (negrito && italico) {
                estilo = iTextSharp.text.Font.BOLDITALIC;
            } else if (negrito) {
                estilo = iTextSharp.text.Font.BOLD;
            } else if (italico) {
                estilo = iTextSharp.text.Font.ITALIC;
            }

            //difinição da fonte da celula
            var fonteCelula = new iTextSharp.text.Font(BaseFont.CreateFont(BaseFont.HELVETICA, BaseFont.CP1252, false), tamanhoFonte, estilo, BaseColor.Black);

            //definição da cor de fundo das linhas da tabela
            var bgColor = iTextSharp.text.BaseColor.White;
            if (tabela.Rows.Count % 2 == 1) {
                bgColor = new BaseColor(0.95F, 0.95f, 0.95F);
            }

            //definição do título da célula e sua fonte
            var celula = new PdfPCell(new Phrase(texto, fonteCelula));

            //alinhamento dos items?
            celula.HorizontalAlignment = alinhamentoHorz;
            celula.VerticalAlignment = PdfPCell.ALIGN_MIDDLE;

            //borda
            celula.Border = 0;

            //borda interior
            celula.BorderWidthBottom = 1;

            //altura da celular
            celula.FixedHeight = alturaCelula;

            //margem interna das células
            celula.PaddingBottom = 5;

            //definição da cor de fundo
            celula.BackgroundColor = bgColor;

            //acréscimo da celula a tabela
            tabela.AddCell(celula);
        }

        private static Font DefinirFontes() {
            //configura a fonte usada como padrão do documento. (FONTE, CODIFIÇÃO IDEAL LATINA, SINAL QUE É FONTE DO PRÓPRIO SISTEMA E NÃO PERSONALIZADA)
            var fonteBase = BaseFont.CreateFont(BaseFont.HELVETICA, BaseFont.CP1252, false);

            //definição de fonte que será utilizada no parágrafo
            var fonteParagrafo = new iTextSharp.text.Font(fonteBase, 32, iTextSharp.text.Font.NORMAL, BaseColor.Black);
            return fonteParagrafo;
        }

        private static Paragraph InserirTitulo(Font fonteParagrafo, string texto) {
            var titulo = new Paragraph(texto, fonteParagrafo);

            //alinhamento a esquerda
            titulo.Alignment = Element.ALIGN_LEFT;

            //alinhamento dos últimos elementos da página
            titulo.SpacingAfter = 4;
            return titulo;
        }

        private static Paragraph InserirSubTitulo(Font fonteParagrafo, string texto) {
            var titulo = new Paragraph(texto, new iTextSharp.text.Font(BaseFont.CreateFont(BaseFont.HELVETICA, BaseFont.CP1252, false), 22, iTextSharp.text.Font.NORMAL, BaseColor.Black));

            //alinhamento a esquerda
            titulo.Alignment = Element.ALIGN_CENTER;

            //alinhamento dos últimos elementos da página
            return titulo;
        }

        private static void InserirLogo(iTextSharp.text.Document pdf, PdfWriter writer) {
            var caminhoImagem = Path.Combine(Directory.GetCurrentDirectory(), "logoIsaiah96.png");

            if (File.Exists(caminhoImagem)) {
                //carrega a imagem selecionada
                iTextSharp.text.Image logo = iTextSharp.text.Image.GetInstance(caminhoImagem);

                //difini as proporções da logo e posição vertical da sua localização.
                float razaoAlturaLargura = logo.Width / logo.Height;
                float alturaLogo = 32;
                float larguraLogo = alturaLogo * razaoAlturaLargura;

                //passa as definições acima para a classe
                logo.ScaleToFit(larguraLogo, alturaLogo);

                //difini a posição horizontal da sua localização.
                var margemEsquerda = pdf.PageSize.Width - pdf.TopMargin - larguraLogo;
                var margemTopo = pdf.PageSize.Height - pdf.TopMargin - 54;
                //passa as definições acima para a classe
                logo.SetAbsolutePosition(margemEsquerda, margemTopo);

                //transmite para o documento as alterações da logo
                writer.DirectContent.AddImage(logo, false);
            }
        }

        private static void CriarCelulaImagem(PdfPTable tabela, string caminhoImagem, int larguraImagem, int alturaImagem, int alturaCelula = 25) {
            //definição da cor de fundo das linhas da tabela
            var bgColor = iTextSharp.text.BaseColor.White;
            if (tabela.Rows.Count % 2 == 1) {
                bgColor = new BaseColor(0.95F, 0.95f, 0.95F);
            }

            if (File.Exists(caminhoImagem)) {

                //criação de novo objeto do tipo imagem passando o seu caminho
                iTextSharp.text.Image imagem = iTextSharp.text.Image.GetInstance(caminhoImagem);

                //passa as definições acima para a classe
                imagem.ScaleToFit(larguraImagem, alturaImagem);

                //definição do título da célula e sua fonte
                var celula = new PdfPCell(imagem);

                //alinhamento dos items?
                celula.HorizontalAlignment = PdfPCell.ALIGN_CENTER;
                celula.VerticalAlignment = PdfPCell.ALIGN_MIDDLE;

                //borda
                celula.Border = 0;

                //borda interior
                celula.BorderWidthBottom = 1;

                //altura da celular
                celula.FixedHeight = alturaCelula;

                //definição da cor de fundo
                celula.BackgroundColor = bgColor;

                //acréscimo da celula a tabela
                tabela.AddCell(celula);
            }
        }
    }
}
