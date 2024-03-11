import { Component, OnInit } from '@angular/core';
import { WordService } from 'src/app/service/wordservice/word.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  words: any[] = [];
  total: number = 0;
  size: number = 2;
  skip: number = 0;
  take: number = 10;
  currentPage: number = 1;
  lastPage: number = 10;

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
    this.loadWords();
  }

  getPages(): number[] {
    const totalPages = Math.ceil(this.total / this.take);
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }
}
