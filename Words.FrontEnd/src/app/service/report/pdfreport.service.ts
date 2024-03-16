import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError, Observable } from 'rxjs';
import { WordInfo } from 'src/app/model/WordInfo';

@Injectable({
  providedIn: 'root'
})
export class PdfreportService {
  private baseUrl = 'https://localhost:7005/api/PdfReport';
  /* private baseUrl = 'https://localhost:44363/api/PdfReport'; */

  constructor(private http: HttpClient) { }

  GetReportByValue(): Observable<Blob> {
    return this.http.get<Blob>(`${this.baseUrl}/relatorioOrdenadoPorQuantidade`).pipe(
      catchError(error => {
        console.error('Ocorreu um erro:', error);
        return throwError('Ocorreu um erro ao obter as palavras.');
      })
    );
  }

  GetReportByKey(): Observable<Blob> {
    return this.http.get<Blob>(`${this.baseUrl}/relatorioOrdenadoPorCaracteres`).pipe(
      catchError(error => {
        console.error('Ocorreu um erro:', error);
        return throwError('Ocorreu um erro ao obter as palavras.');
      })
    );
  }

  GetReportByMaxValue(): Observable<Blob> {
    return this.http.get<Blob>(`${this.baseUrl}/relatorioMaiorValor`).pipe(
      catchError(error => {
        console.error('Ocorreu um erro:', error);
        return throwError('Ocorreu um erro ao obter as palavras.');
      })
    );
  }

  GetReportByMinValue(): Observable<Blob> {
    return this.http.get<Blob>(`${this.baseUrl}/relatorioMenorValor`).pipe(
      catchError(error => {
        console.error('Ocorreu um erro:', error);
        return throwError('Ocorreu um erro ao obter as palavras.');
      })
    );
  }
}
