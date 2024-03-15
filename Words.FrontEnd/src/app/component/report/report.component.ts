import { NotificationService } from './../../service/notificationservice/notification.service';
import { WordInfo } from './../../model/WordInfo';
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
  wordInfo: any;

  constructor(private graphicsreportService: GraphicsreportService, private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.RenderChart();
  }

  getDataToGraphic() {
    this.graphicsreportService.GetReportByKey().subscribe(
      (response) => {
        this.wordInfo = response;
      },
      (error) => {
        this.notificationService.mostrarFeedback('Erro ao gerar gráfico. Por favor, recarregue a página.', false);
      }
    );
  }

  RenderChart() {
    this.getDataToGraphic();

    console.log(this.wordInfo);

    const ctx = new Chart("piechart", {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            '#FF0000',
            '#0000FF',
            '#FFFF00',
            '#008000',
            '#A020F0',
            '#FFA500',
          ],
          borderColor: [
            '#000000'
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
  }

}
