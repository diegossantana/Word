import { RegisteruserComponent } from './login/registeruser/registeruser.component';
import { BemvindoComponent } from './bemvindo/bemvindo.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { WordsComponent } from './words/words.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: BemvindoComponent },
  { path: 'bem-vindo', component: BemvindoComponent },
  { path: 'palavras', component: WordsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisteruserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
