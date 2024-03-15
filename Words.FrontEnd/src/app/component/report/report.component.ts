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
  numberCaracters: any[] = [];
  totalWords: any[] = [];
  constructor(private graphicsreportService: GraphicsreportService, private notificationService: NotificationService) { }

  ngOnInit() {
    this.RenderChart();
  }

  RenderChart() {
    this.graphicsreportService.GetReportByKey().subscribe((data: any) => {

      var count = Object.keys(data).length;

      for (var i = 0; i < count; i++) {
        this.numberCaracters.push(Object.keys(data)[i]);
        this.totalWords.push(Object.values(data)[i]);
      }

      const ctx = new Chart("piechart", {
        type: 'bar',
        data: {
          labels: this.numberCaracters,
          datasets: [{
            label: '# of Votes',
            data: this.totalWords,
            backgroundColor: [
              '#FF0000',
              '#0000FF',
              '#FFFF00',
              '#008000',
              '#A020F0',
              '#FFA500',
            ],
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
    })
  }

}
