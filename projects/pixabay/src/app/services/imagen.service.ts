import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  private _error$ = new Subject<string>();
  private _terminoBusqueda$ = new Subject<string>();

  constructor(private http: HttpClient) {
  }

  //<editor-fold desc="getters">
  // @ts-ignore
  get error$(): Observable<string> {
    return this._error$.asObservable();
  }

  set error$(value: string) {
    this._error$.next(value);
  }

  // @ts-ignore
  get terminoBusqueda$(): Observable<string> {
    return this._terminoBusqueda$.asObservable();
  }

  set terminoBusqueda$(value: string) {
    this._terminoBusqueda$.next(value);
  }
  //</editor-fold>

  getImagenes(termino: string, imagenesPorPagina: number, paginaActualEmitter: number): Observable<any> {

    const KEY = '';

    const URL = 'https://pixabay.com/api/?key=' + KEY +
      '&q=' + termino +
      '&per_page=' + imagenesPorPagina +
      '&page=' + paginaActualEmitter;
    // http.get devuelve un observable
    return this.http.get(URL);
  }

  //<editor-fold desc="antiguos getters">
  /* antigua forma no pura
    setError$(mensaje: string):void {
      this._error$.next(mensaje);
    }

    getError$(): Observable<string> {
      return this._error$.asObservable()
    }
  */
  //</editor-fold>

}
