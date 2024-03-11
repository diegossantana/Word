import { FilterresultComponent } from './component/filter/filterresult/filterresult.component';
import { FilterComponent } from './component/filter/filter.component';
import { WordcardresultComponent } from './component/words/wordcardresult/wordcardresult.component';
import { WordresultComponent } from './component/words/wordresult/wordresult.component';
import { UpdatewordComponent } from './component/words/updateword/updateword.component';
import { DeletewordComponent } from './component/words/deleteword/deleteword.component';
import { SearchnameComponent } from './component/words/searchname/searchname.component';
import { SearchidComponent } from './component/words/searchid/searchid.component';
import { AddwordComponent } from './component/words/addword/addword.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { WordsComponent } from './component/words/words.component';
import { LoginComponent } from './component/login/login.component';
import { WelcomeComponent } from './component/welcome/welcome.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from "@angular/material/form-field";
import { ToastrModule } from 'ngx-toastr';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AddwordComponent,
    AppComponent,
    DeletewordComponent,
    FilterComponent,
    FilterresultComponent,
    LoginComponent,
    SearchidComponent,
    SearchnameComponent,
    UpdatewordComponent,
    WelcomeComponent,
    WordsComponent,
    WordcardresultComponent,
    WordresultComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatMenuModule,
    MatToolbarModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
