import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Word } from 'src/app/model/Word';
import { NotificationService } from 'src/app/service/notificationservice/notification.service';
import { WordService } from 'src/app/service/wordservice/word.service';

@Component({
  selector: 'app-deleteword',
  templateUrl: './deleteword.component.html',
  styleUrls: ['./deleteword.component.scss']
})
export class DeletewordComponent implements OnInit {
  deletarForm: FormGroup;
  wordFounded!: Word;

  constructor(private formBuilder: FormBuilder, private wordService: WordService, private notificationService: NotificationService, private location: LocationStrategy) {
    this.deletarForm = this.formBuilder.group({
      name: ['', Validators.required],
    })
  }


  ngOnInit() {
  }

  onSubmit() {
    if (this.deletarForm.valid) {
      const newEdit = this.deletarForm.value.name;

      this.wordService.getWordByName(newEdit).subscribe(
        (response: Word) => {
          this.wordFounded = response;
          this.deletarForm.reset();
        },
        (error) => {
          this.notificationService.mostrarFeedback('Erro ao consultar por palavra. Por favor, tente novamente.', false);
        }
      );
    }
  }

  onDelete() {
    const newId = this.wordFounded.wordId;
    if (this.wordFounded) {
      this.wordService.deleteWord(newId).subscribe(
        (response) => {
          this.notificationService.mostrarFeedback('Palavra excluída com sucesso!', true);
          this.location.back();
        },
        (error) => {
          this.notificationService.mostrarFeedback('Erro ao excluir a palavra. Por favor, tente novamente.', false);
        }
      );
    }
  }

  onBack() {
    this.location.back();
  }
}
