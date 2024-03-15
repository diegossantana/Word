import { WordInfo } from './../../model/WordInfo';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraphicsreportService {

  private baseUrl = 'https://localhost:7005/api/Word';
  /* private baseUrl = 'https://localhost:44363/api/Word'; */

  constructor(private http: HttpClient) { }

  GetReportByValue(): Observable<WordInfo[]> {
    return this.http.get<WordInfo[]>(`${this.baseUrl}/relatorioOrdenadoPorQuantidade`).pipe(
      catchError(error => {
        console.error('Ocorreu um erro:', error);
        return throwError('Ocorreu um erro ao obter as palavras.');
      })
    );
  }

  GetReportByKey(): Observable<WordInfo[]> {
    return this.http.get<WordInfo[]>(`${this.baseUrl}/relatorioOrdenadoPorQuantidade`).pipe(
      catchError(error => {
        console.error('Ocorreu um erro:', error);
        return throwError('Ocorreu um erro ao obter as palavras.');
      })
    );
  }

  GetReportByMaxValue(): Observable<WordInfo> {
    return this.http.get<WordInfo>(`${this.baseUrl}/relatorioOrdenadoPorQuantidade`).pipe(
      catchError(error => {
        console.error('Ocorreu um erro:', error);
        return throwError('Ocorreu um erro ao obter as palavras.');
      })
    );
  }

  GetReportByMinValue(): Observable<WordInfo> {
    return this.http.get<WordInfo>(`${this.baseUrl}/relatorioOrdenadoPorQuantidade`).pipe(
      catchError(error => {
        console.error('Ocorreu um erro:', error);
        return throwError('Ocorreu um erro ao obter as palavras.');
      })
    );
  }
}
