import { WordService } from 'src/app/service/wordservice/word.service';
import { Component, OnInit } from '@angular/core';

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

  constructor(private wordService: WordService) { }

  ngOnInit(): void {
    this.loadWords();
  }

  loadWords() {
    this.wordService.getWords(this.skip, this.take).subscribe((data: any) => {
      this.words = data.words;
      this.total = data.total;
    })
  }

  onPageChange(page: number): void {
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
