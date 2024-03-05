import { NotificationService } from './../../../service/notificationservice/notification.service';
import { WordService } from './../../../service/wordservice/word.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-searchid',
  templateUrl: './searchid.component.html',
  styleUrls: ['./searchid.component.scss']
})
export class SearchidComponent implements OnInit {
  consultarForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private wordService: WordService, private notificationService: NotificationService) {
    this.consultarForm = this.formBuilder.group({
      id: ['', Validators.required]
    })
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.consultarForm.valid) {
      const newId = this.consultarForm.value.id;

      this.wordService.getWordById(newId).subscribe(
        (response) => {
          this.notificationService.mostrarFeedback('Palavra encontrada!', true);
          this.consultarForm.reset();
        },
        (error) => {
          this.notificationService.mostrarFeedback('Erro ao consultar por Id. Por favor, tente novamente.', false);
        }
      );
    }
  }

}
