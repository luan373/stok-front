import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, pipe, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { Usuario } from './usuario';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly API = `${environment.API}usuario/`;

  private usr: Usuario;

  constructor(
    protected http: HttpClient) { }

  doLogin(usuario: Usuario) {
    const url = this.API + "porUsuarioSenha";
    this.http.post<Usuario>(url, usuario).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

}

