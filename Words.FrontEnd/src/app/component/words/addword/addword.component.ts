import { NotificationService } from './../../../service/notificationservice/notification.service';
import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { WordService } from 'src/app/service/wordservice/word.service';

@Component({
  selector: 'app-addword',
  templateUrl: './addword.component.html',
  styleUrls: ['./addword.component.scss']
})
export class AddwordComponent implements OnInit {
  palavraForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private wordService: WordService, private notificationService: NotificationService) {
    this.palavraForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.palavraForm.valid) {
      const newWord = this.palavraForm.value;

      this.wordService.addWord(newWord).subscribe(
        (response) => {
          this.notificationService.mostrarFeedback('Palavra adicionada com sucesso!', true);
          this.palavraForm.reset();
        },
        (error) => {
          this.notificationService.mostrarFeedback('Erro ao adicionar palavra. Por favor, tente novamente.', false);
        }
      );
    }
  }
}
