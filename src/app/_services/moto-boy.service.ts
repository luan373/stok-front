import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MotoBoy } from '../_models/motoBoy';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { tap, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MotoBoyService {

  private readonly API = `${environment.API}` + "motoBoy";

  constructor(private http: HttpClient) { }

  listar(): Observable<Array<MotoBoy>> {
    return this.http.get<Array<MotoBoy>>(this.API);
  }

  buscarPorId(id: number): Observable<MotoBoy> {
    const url = this.API + "/" + id;

    return this.http.get<MotoBoy>(url);
  }

  atualizar(motoBoy: MotoBoy) {
    this.http.put<MotoBoy>(this.API, motoBoy).pipe(map(resp => {
      if (resp != null) {

      }
      
    })).toPromise();

  }

  salvar(motoBoy: MotoBoy) {
    this.http.post<MotoBoy>(this.API, motoBoy).toPromise();
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
