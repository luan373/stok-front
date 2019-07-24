import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MotoBoy } from '../_models/motoBoy';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MotoBoyService {

  private readonly API = `${environment.API}` + "motoBoy";

  constructor(private http: HttpClient) { }

  lista(): Observable<Array<MotoBoy>> {
    return this.http.get<Array<MotoBoy>>(this.API);
  }

  buscarPorId(id: number): Observable<MotoBoy> {
    const url = this.API + "/" + id;

    return this.http.get<MotoBoy>(url);
  }

}
