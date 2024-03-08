import { WordService } from 'src/app/service/wordservice/word.service';
import { Component, OnInit } from '@angular/core';
import { Word } from 'src/app/model/Word';

@Component({
  selector: 'app-wordresult',
  templateUrl: './wordresult.component.html',
  styleUrls: ['./wordresult.component.scss']
})
export class WordresultComponent implements OnInit {
  words: any[] = [];
  total: number = 0;
  skip: number = 0;
  take: number = 10;
  currentPage: number = 1;
  lastPage: number = 10;

  constructor(private wordService: WordService) { }

  ngOnInit(): void {
    this.loadWords();
    this.words = [
      { wordId: 1, name: 'Palavra 1', size: 10 },
      { wordId: 2, name: 'Palavra 2', size: 15 },
      { wordId: 3, name: 'Palavra 3', size: 20 }
    ];
  }

  trackByWordId(index: number, word: Word): number {
    return word.wordId;
  }

  loadWords() {
    this.wordService.getWords(this.skip, this.take).subscribe((data: any) => {
      this.words = data.words;
      this.total = data.total;
    })
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.lastPage = Math.ceil(this.total / this.take);
    this.skip = (page - 1) * this.take;
    this.loadWords();
  }

  onItemsPerPageChange(event: any): void {
    const itemsPerPage = event.target.value;
    this.take = parseInt(itemsPerPage, 10);
    this.loadWords();
  }

  getPages(): number[] {
    const totalPages = Math.ceil(this.total / this.take);
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }
}
