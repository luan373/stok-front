import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MotoBoy } from '../_models/motoBoy';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class ListarMotoBoyService {
  private readonly API = `${environment.API}`;

  constructor(private http: HttpClient) { }

  lista(): Observable<Array<MotoBoy>> {
    const url = this.API + "motoBoy";

    return this.http.get<Array<MotoBoy>>(url);
  }

}
