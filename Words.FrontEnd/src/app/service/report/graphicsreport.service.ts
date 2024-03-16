import { WordInfo } from './../../model/WordInfo';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraphicsreportService {

  private baseUrl = 'https://localhost:7005/api/GraphicsReport';
  /* private baseUrl = 'https://localhost:44363/api/GraphicsReport'; */

  constructor(private http: HttpClient) { }

  GetReportByValue(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/relatorioOrdenadoPorQuantidade`).pipe(
      catchError(error => {
        console.error('Ocorreu um erro:', error);
        return throwError('Ocorreu um erro ao obter as palavras.');
      })
    );
  }

  GetReportByKey(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/relatorioOrdenadoPorCaracteres`).pipe(
      catchError(error => {
        console.error('Ocorreu um erro:', error);
        return throwError('Ocorreu um erro ao obter as palavras.');
      })
    );
  }

  GetReportByMaxValue(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/relatorioMaiorValor`).pipe(
      catchError(error => {
        console.error('Ocorreu um erro:', error);
        return throwError('Ocorreu um erro ao obter as palavras.');
      })
    );
  }

  GetReportByMinValue(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/relatorioMenorValor`).pipe(
      catchError(error => {
        console.error('Ocorreu um erro:', error);
        return throwError('Ocorreu um erro ao obter as palavras.');
      })
    );
  }
}
