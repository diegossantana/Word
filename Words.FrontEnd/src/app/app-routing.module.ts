import { DeletewordComponent } from './words/deleteword/deleteword.component';
import { UpdatewordComponent } from './words/updateword/updateword.component';
import { SearchnameComponent } from './words/searchname/searchname.component';
import { SearchidComponent } from './words/searchid/searchid.component';
import { AddwordComponent } from './words/addword/addword.component';
import { RegisteruserComponent } from './login/registeruser/registeruser.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { WordsComponent } from './words/words.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'bem-vindo', component: WelcomeComponent },
  { path: 'palavras', component: WordsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisteruserComponent },

  { path: 'adicionar', component: AddwordComponent },
  { path: 'consultarId', component: SearchidComponent },
  { path: 'consultarPalavra', component: SearchnameComponent },
  { path: 'editar', component: UpdatewordComponent },
  { path: 'excluir', component: DeletewordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
