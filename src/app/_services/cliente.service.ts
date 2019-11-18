import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cliente } from '../_models/cliente';
import { GenericService } from './generic.service';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '../_components/alert/alert.service';
import { Observable, throwError, of } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends GenericService<Cliente> {

  constructor(http: HttpClient, alertService: AlertService) {
    super(`${environment.API}` + "cliente", http, alertService);
  }

}