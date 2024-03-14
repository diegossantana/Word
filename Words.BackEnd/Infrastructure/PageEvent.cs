using iTextSharp.text;
using iTextSharp.text.pdf;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure {
    public class PageEvent : PdfPageEventHelper {
        private PdfContentByte wdc;

        private BaseFont FonteBaseRodape { get; set; }
        private iTextSharp.text.Font FonteRodape { get; set; }

        //adicionado ao contrutor a edição da fonte que a mesma utilizará
        public PageEvent() {
            FonteBaseRodape = BaseFont.CreateFont(BaseFont.HELVETICA, BaseFont.CP1252, false);
            FonteRodape = new iTextSharp.text.Font(FonteBaseRodape, 8f, iTextSharp.text.Font.NORMAL, BaseColor.Black);
        }

        public override void OnOpenDocument(PdfWriter writer, Document document) {
            base.OnOpenDocument(writer, document);

            this.wdc = writer.DirectContent;
        }



        //sobrescrição de método da classe herdada que permite realizar uma edição nos elementos no fim da página como o nome sugere
        public override void OnEndPage(PdfWriter writer, Document document) {
            base.OnEndPage(writer, document);

            AdicionarMomentoGerecaoRelatorio(writer, document);
            AdicionarNumerosDasPaginas(writer, document);
        }

        private void AdicionarMomentoGerecaoRelatorio(PdfWriter writer, Document document) {
            var textoMomentoGeracao = $"Gerado em {DateTime.Now.ToShortDateString()} às {DateTime.Now.ToShortTimeString()}";

            //inicia uma caixa de texto
            wdc.BeginText();

            //defini as fonte do texto
            wdc.SetFontAndSize(FonteRodape.BaseFont, FonteRodape.Size);

            //defini a posição do texto
            wdc.SetTextMatrix(document.LeftMargin, document.BottomMargin * 0.75f);

            //exibe o texto
            wdc.ShowText(textoMomentoGeracao);

            //encerra o texto
            wdc.EndText();
        }

        private void AdicionarNumerosDasPaginas(PdfWriter writer, Document document) {

            //obtem o número da pagina atual
            int paginaAtual = writer.PageNumber;

            //texto que será utilizado
            var textoPaginacao = $"Página {paginaAtual}";

            //edição da fonte utilizada e calculo do tamanho do texto e sua posição
            float larguraTextoPaginacao = FonteBaseRodape.GetWidthPoint(textoPaginacao, FonteRodape.Size);

            //obtem o tamanho do texto
            var tamanhoPagina = document.PageSize;

            //inicia uma caixa de texto
            wdc.BeginText();

            //defini as fonte do texto
            wdc.SetFontAndSize(FonteRodape.BaseFont, FonteRodape.Size);

            //defini a posição do texto
            wdc.SetTextMatrix(tamanhoPagina.Width - document.RightMargin - larguraTextoPaginacao, document.BottomMargin * 0.75f);

            //exibe o texto
            wdc.ShowText(textoPaginacao);

            //encerra o texto
            wdc.EndText();


        }
    }
}
