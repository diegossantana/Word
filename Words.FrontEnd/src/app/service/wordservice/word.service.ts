import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { catchError, Observable, throwError } from 'rxjs';
import { Word } from '../../model/Word';

@Injectable({
  providedIn: 'root'
})
export class WordService {

  private baseUrl = 'https://localhost:7005/api/Word';
  /* private baseUrl = 'https://localhost:44363/api/Word'; */

  constructor(private http: HttpClient) { }

  getWords(skip: number, take: number): Observable<Word[]> {
    return this.http.get<Word[]>(`${this.baseUrl}/skip/${skip}/take/${take}`).pipe(
      catchError(error => {
        console.error('Ocorreu um erro:', error);
        return throwError('Ocorreu um erro ao obter as palavras.');
      })
    );
  }

  getWordsBySize(skip: number, take: number, size: number): Observable<Word[]> {
    return this.http.get<Word[]>(`${this.baseUrl}/size/skip/${skip}/take/${take}/size/${size}`).pipe(
      catchError(error => {
        console.error('Ocorreu um erro:', error);
        return throwError('Ocorreu um erro ao obter as palavras.');
      })
    );
  }

  getWordById(id: number): Observable<Word> {
    return this.http.get<Word>(`${this.baseUrl}/id/${id}`).pipe(
      catchError(error => {
        console.error('Ocorreu um erro:', error);
        return throwError('Ocorreu um erro ao obter a palavra por Id.');
      })
    );
  }

  getWordByName(name: string): Observable<Word> {
    return this.http.get<Word>(`${this.baseUrl}/name/${name}`).pipe(
      catchError(error => {
        console.error('Ocorreu um erro:', error);
        return throwError('Ocorreu um erro ao obter a palavra por Nome.');
      })
    );
  }

  addWord(word: Word): Observable<Word> {
    return this.http.post<Word>(`${this.baseUrl}`, word).pipe(
      catchError(error => {
        console.error('Ocorreu um erro:', error);
        return throwError('Ocorreu um erro ao adicionar a palavra. Por favor, tente novamente.');
      })
    );
  }

  updateWord(id: number, word: Word): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, word).pipe(
      catchError(error => {
        console.error('Ocorreu um erro:', error);
        return throwError('Ocorreu um erro ao atualizar a palavra. Por favor, tente novamente.');
      })
    );
  }

  deleteWord(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Ocorreu um erro:', error);
        return throwError('Ocorreu um erro ao excluir a palavra. Por favor, tente novamente.');
      })
    );
  }
}
