import { Component, OnInit } from '@angular/core';
import { WordService } from 'src/app/service/wordservice/word.service';

@Component({
  selector: 'app-filterresult',
  templateUrl: './filterresult.component.html',
  styleUrls: ['./filterresult.component.scss']
})
export class FilterresultComponent implements OnInit {
words: any[] = [];
  total: number = 0;
  size: number = 2;
  skip: number = 0;
  take: number = 10;
  currentPage: number = 1;
  lastPage!: number;

  constructor(private wordService: WordService) { }

  ngOnInit(): void {
    this.loadWords();
  }

  loadWords() {
    this.wordService.getWordsBySize(this.skip, this.take, this.size).subscribe((data: any) => {
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
    this.onPageChange(1);
    this.loadWords();
  }

  getPages(): number[] {
    const totalPages = Math.ceil(this.total / this.take);
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }
}
