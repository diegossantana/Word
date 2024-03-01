import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Word } from '../Word';

@Injectable({
  providedIn: 'root'
})
export class WordService {

  private baseUrl = 'http://localhost:5000/api/word';

  constructor(private http: HttpClient) { }

  getWords(): Observable<Word[]> {
    return this.http.get<Word[]>(`${this.baseUrl}`);
  }

  getWordById(id: number): Observable<Word> {
    return this.http.get<Word>(`${this.baseUrl}/id/${id}`);
  }

  getWordByName(name: string): Observable<Word> {
    return this.http.get<Word>(`${this.baseUrl}/name/${name}`);
  }

  addWord(word: Word): Observable<Word> {
    return this.http.post<Word>(`${this.baseUrl}`, word);
  }

  updateWord(id: number, word: Word): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, word);
  }

  deleteWord(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
