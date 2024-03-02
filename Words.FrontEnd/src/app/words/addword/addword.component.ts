import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { WordService } from 'src/app/wordservice/word.service';

@Component({
  selector: 'app-addword',
  templateUrl: './addword.component.html',
  styleUrls: ['./addword.component.scss']
})
export class AddwordComponent implements OnInit {
  palavraForm: FormGroup;
  mensagemFeedback: string = '';
  exibirFeedback: boolean = false;

  constructor(private formBuilder: FormBuilder, private location: LocationStrategy, private wordService: WordService, private toastr: ToastrService) {
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
          this.mostrarFeedback('Palavra adicionada com sucesso!', true);
          this.palavraForm.reset();
        },
        (error) => {
          this.mostrarFeedback('Erro ao adicionar palavra. Por favor, tente novamente.', false);
        }
      );
    }
  }

  mostrarFeedback(mensagem: string, sucesso: boolean) {
    this.mensagemFeedback = mensagem;
    this.exibirFeedback = true;

    if (sucesso) {
      this.toastr.success(mensagem, 'Sucesso', { timeOut: 3000, progressBar: true });
      this.exibirFeedback = false;
      this.location.back();
    } else {
      this.toastr.error(mensagem, 'Erro', { timeOut: 3000, progressBar: true });
    }
  }
}
