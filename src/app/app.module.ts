import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { DataTablesModule } from 'angular-datatables';
import { NgxSmartModalModule } from 'ngx-smart-modal';

import { AppComponent } from './app.component';
import { NavbarComponent } from './_components/navbar/navbar.component';
import { LoginComponent } from './_components/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './_components/home/home.component';
import { AlertComponent } from './_components/alert/alert.component';
import { appRoutingModule } from './app.routing';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { MotoBoyComponent } from './_components/moto-boy/moto-boy.component';
import { ListarMotoBoyComponent } from './_components/moto-boy/listar-moto-boy/listar-moto-boy.component';
import { ProdutoComponent } from './_components/produto/produto.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { TextMaskModule } from 'angular2-text-mask';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    HomeComponent,
    AlertComponent,
    MotoBoyComponent,
    ListarMotoBoyComponent,
    ProdutoComponent
  ],
  imports: [
    BrowserModule,
    NgxSmartModalModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule,
    appRoutingModule,
    BrowserAnimationsModule,
    TextMaskModule,
    [MatButtonModule, MatCheckboxModule]

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
