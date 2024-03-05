import { Component, OnInit, Input } from '@angular/core';
import { Word } from 'src/app/model/Word';

@Component({
  selector: 'app-wordcardresult',
  templateUrl: './wordcardresult.component.html',
  styleUrls: ['./wordcardresult.component.scss']
})
export class WordcardresultComponent implements OnInit {

  @Input() word!: Word;

  constructor() { }

  ngOnInit() {
  }

}
