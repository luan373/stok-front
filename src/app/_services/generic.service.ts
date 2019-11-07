import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { AlertService } from '../_components/alert/alert.service';

export abstract class GenericService<T> {

    constructor(
        protected API: string,
        protected http: HttpClient,
        protected alertService: AlertService) {
    }

    listar(): Observable<Array<T>> {
        return this.http.get<Array<T>>(this.API);
    }

    buscarPorId(id: number): Observable<T> {
        const url = this.API + "/" + id;

        return this.http.get<T>(url);
    }

    atualizar(t: T): Observable<T> {
        return this.http.put<T>(this.API, t).pipe(
            catchError(this.handleError('atualizar', t)));
    }

    salvar(t: T): Observable<T> {
        return this.http.post<T>(this.API, t).pipe(
            catchError(this.handleError('salvar', t)));
    }

    excluir(id: number): Observable<any> {
        const url = this.API + "/" + id;

        return this.http.delete<T>(url).pipe(
            catchError(this.handleError('deletar', id)));
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            console.error(error); // log to console instead
            this.alertService.error(error, true);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

}