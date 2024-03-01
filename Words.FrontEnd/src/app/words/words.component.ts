import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.scss']
})
export class WordsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  adicionarPalavra() {
    // Lógica para adicionar uma nova palavra
  }

  consultarPorId() {
    // Lógica para consultar palavra por ID
  }

  consultarPorPalavra() {
    // Lógica para consultar palavra por nome
  }

  editarPalavra() {
    // Lógica para editar uma palavra existente
  }

  excluirPalavra() {
    // Lógica para excluir uma palavra
  }

}
