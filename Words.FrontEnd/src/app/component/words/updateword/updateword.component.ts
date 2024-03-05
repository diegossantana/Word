import { Word } from './../../../model/Word';
import { NotificationService } from 'src/app/service/notificationservice/notification.service';
import { WordService } from 'src/app/service/wordservice/word.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { isEmpty } from 'rxjs';

@Component({
  selector: 'app-updateword',
  templateUrl: './updateword.component.html',
  styleUrls: ['./updateword.component.scss']
})
export class UpdatewordComponent implements OnInit {
  editarForm: FormGroup;
  wordFounded!: Word;
  nameOld!: string;

  constructor(private formBuilder: FormBuilder, private wordService: WordService, private notificationService: NotificationService) {
    this.editarForm = this.formBuilder.group({
      name: ['', Validators.required],
    })
  }


  ngOnInit() {
  }

  onSubmit() {
    if (this.editarForm.valid) {
      const newEdit = this.editarForm.value.name;

      this.wordService.getWordByName(newEdit).subscribe(
        (response: Word) => {
          this.wordFounded = response;
          this.editarForm.reset();
        },
        (error) => {
          this.notificationService.mostrarFeedback('Erro ao consultar por palavra. Por favor, tente novamente.', false);
        }
      );
    }
  }

  onEdit() {
    if (this.editarForm.valid) {
      const newEdit = this.editarForm.value.name;

      if (this.wordFounded) {
        this.wordFounded.name = newEdit;
        this.wordService.updateWord(this.wordFounded.wordId, this.wordFounded).subscribe(
          (response) => {
            this.notificationService.mostrarFeedback('Palavra editada com sucesso!', true);
            this.editarForm.reset();
          },
          (error) => {
            this.notificationService.mostrarFeedback('Erro ao editar palavra. Por favor, tente novamente.', false);
          }
        );
      }
    }
  }
}
