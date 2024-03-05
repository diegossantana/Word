import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/service/notificationservice/notification.service';
import { WordService } from 'src/app/service/wordservice/word.service';

@Component({
  selector: 'app-searchname',
  templateUrl: './searchname.component.html',
  styleUrls: ['./searchname.component.scss']
})
export class SearchnameComponent implements OnInit {
  consultarForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private wordService: WordService, private notificationService: NotificationService) {
    this.consultarForm = this.formBuilder.group({
      name: ['', Validators.required]
    })
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.consultarForm.valid) {
      const newName = this.consultarForm.value.name;

      this.wordService.getWordByName(newName).subscribe(
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
