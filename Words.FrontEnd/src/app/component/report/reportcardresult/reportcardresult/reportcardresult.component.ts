import { Component, Input, OnInit } from '@angular/core';
import { WordInfo } from 'src/app/model/WordInfo';

@Component({
  selector: 'app-reportcardresult',
  templateUrl: './reportcardresult.component.html',
  styleUrls: ['./reportcardresult.component.scss']
})
export class ReportcardresultComponent implements OnInit {

  @Input() word!: WordInfo;
  @Input() title!: string;

  constructor() { }

  ngOnInit() {
  }

}
