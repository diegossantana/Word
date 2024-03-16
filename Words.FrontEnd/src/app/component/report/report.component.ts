import { saveAs } from 'file-saver';
import { PdfreportService } from './../../service/report/pdfreport.service';
import { WordInfo } from './../../model/WordInfo';
import { NotificationService } from './../../service/notificationservice/notification.service';
import { GraphicsreportService } from './../../service/report/graphicsreport.service';
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js/auto';

Chart.register(...registerables);

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  wordInfoMax!: WordInfo;
  wordInfoMin!: WordInfo;
  titleTsMin!: string;
  titleTsMax!: string;
  numberCaracters: any[] = [];
  totalWords: any[] = [];

  constructor(private graphicsreportService: GraphicsreportService, private notificationService: NotificationService, private pdfreportService: PdfreportService) { }

  ngOnInit() {

    this.wordInfoMin = {
      NumberCaracters: 0,
      TotalWords: 0
    };

    this.wordInfoMax = {
      NumberCaracters: 0,
      TotalWords: 0
    };

    this.graphicsreportService.GetReportByKey().subscribe((data: any) => {

      var count = Object.keys(data).length;

      for (var i = 0; i < count; i++) {
        this.numberCaracters.push(Object.keys(data)[i]);
        this.totalWords.push(Object.values(data)[i]);
      }
      this.RenderChart('line', 'linechart');
      this.RenderChart('doughnut', 'doughnutchart');
    });

    this.graphicsreportService.GetReportByMinValue().subscribe((data: WordInfo) => {
      this.wordInfoMin.NumberCaracters = +Object.keys(data)[0];
      this.wordInfoMin.TotalWords = +Object.values(data)[0];
      this.titleTsMin = "Menor quantidade por caracter";
    })

    this.graphicsreportService.GetReportByMaxValue().subscribe((data: WordInfo) => {
      this.wordInfoMax.NumberCaracters = +Object.keys(data)[0];
      this.wordInfoMax.TotalWords = +Object.values(data)[0];
      this.titleTsMax = "Maior quantidade por caracter";
    })
  }

  RenderChart(type: any, id: any) {
    const ctx = new Chart(id, {
      type: type,
      data: {
        labels: this.numberCaracters,
        datasets: [{
          label: '# of Votes',
          data: this.totalWords,
          backgroundColor: (context: any) => {
            const hexChars = '0123456789ABCDEF';
            let hexColor = '#';
            for (let i = 0; i < 6; i++) {
              hexColor += hexChars[Math.floor(Math.random() * hexChars.length)];
            }
            return hexColor;
          },
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  quantidadeCaracteres() {
    this.pdfreportService.GetReportByKey().subscribe(
      (blob: Blob) => {
        saveAs(blob, 'relatório.pdf');
      }
    )
  }
  quantidadePalavras() {
    this.pdfreportService.GetReportByValue().subscribe(
      (blob: Blob) => {
        saveAs(blob, 'relatório.pdf');
      }
    )
  }
  menorCaracter() {
    this.pdfreportService.GetReportByMinValue().subscribe(
      (blob: Blob) => {
        saveAs(blob, 'relatório.pdf');
      }
    )
  }
  maiorCaracter() {
    this.pdfreportService.GetReportByMaxValue().subscribe(
      (blob: Blob) => {
        saveAs(blob, 'relatório.pdf');
      }
    )
  }
}
