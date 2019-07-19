import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, pipe, throwError } from 'rxjs';
import { catchError, map, retry, first } from 'rxjs/operators';
import { Usuario } from '../../_models/usuario';
import { environment } from 'src/environments/environment';
import { ApiConfig } from 'src/app/_interfaces/api-config';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly API = `${environment.API}usuario/`;

  statusCode: number = 0;
  usr: Usuario = new Usuario();

  constructor(
    protected http: HttpClient,
  ) { }

  doLogin(usuario: Usuario) {
    const url = this.API + "porUsuarioSenha";

    return this.http.post<Usuario>(url, usuario);
  }

}

