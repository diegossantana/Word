import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/service/notificationservice/notification.service';
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
  flagReload: boolean = false;

  consultarForm: FormGroup;

  constructor(private wordService: WordService, private formBuilder: FormBuilder, private notificationService: NotificationService) {
    this.consultarForm = this.formBuilder.group({
      size: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.loadWords();
  }

  onSubmit() {
    if (this.consultarForm.valid) {
      this.size = this.consultarForm.value.size;
      this.flagReload = true
      if (this.size > 1) {
        this.loadWords(this.skip, this.take, this.size);
      }
      else {
        this.notificationService.mostrarFeedback(`A quantidade de letras ${this.size} é inválida!`, false)
      }
    }
  }

  loadWords(skip?: number, take?: number, size?: number) {
    this.wordService.getWordsBySize(this.skip, this.take, this.size).subscribe(
      (response: any) => {
        if (this.size != 2 && this.flagReload) {
          this.notificationService.mostrarFeedback(`Palavras com ${this.size} letras encontradas!`, true);
          this.flagReload = false;
        }
        this.words = response.words;
        this.total = response.total;
      },
      (error) => {
        this.notificationService.mostrarFeedback(`Palavras com ${this.size} letras não encontradas!`, false);
      }
    );
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
