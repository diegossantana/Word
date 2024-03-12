import { ReportComponent } from './component/report/report.component';
import { FilterresultComponent } from './component/filter/filterresult/filterresult.component';
import { FilterComponent } from './component/filter/filter.component';
import { DeletewordComponent } from './component/words/deleteword/deleteword.component';
import { UpdatewordComponent } from './component/words/updateword/updateword.component';
import { SearchnameComponent } from './component/words/searchname/searchname.component';
import { SearchidComponent } from './component/words/searchid/searchid.component';
import { AddwordComponent } from './component/words/addword/addword.component';
import { RegisteruserComponent } from './component/login/registeruser/registeruser.component';
import { WelcomeComponent } from './component/welcome/welcome.component';
import { LoginComponent } from './component/login/login.component';
import { WordsComponent } from './component/words/words.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'adicionar', component: AddwordComponent },
  { path: 'excluir', component: DeletewordComponent },
  { path: 'filtro', component: FilterComponent },
  { path: 'filtrado', component: FilterresultComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisteruserComponent },
  { path: 'relatorio', component: ReportComponent },
  { path: 'consultarId', component: SearchidComponent },
  { path: 'consultarPalavra', component: SearchnameComponent },
  { path: 'editar', component: UpdatewordComponent },
  { path: '', component: WelcomeComponent },
  { path: 'bem-vindo', component: WelcomeComponent },
  { path: 'palavras', component: WordsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
