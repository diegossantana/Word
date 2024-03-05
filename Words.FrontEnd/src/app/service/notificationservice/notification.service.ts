import { LocationStrategy } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService, private location: LocationStrategy) { }

  mostrarFeedback(mensagem: string, sucesso: boolean) {

    if (sucesso) {
      this.toastr.success(mensagem, 'Sucesso', { timeOut: 10000, progressBar: true });
    } else {
      this.toastr.error(mensagem, 'Erro', { timeOut: 10000, progressBar: true });
    }
  }
}
