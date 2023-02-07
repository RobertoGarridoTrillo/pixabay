import {Component} from '@angular/core';
import {Subscription} from "rxjs";
import {ImagenService} from "../../services/imagen.service";

@Component({
  selector: 'app-listar-imagen',
  templateUrl: './listar-imagen.component.html',
  styleUrls: ['./listar-imagen.component.css']
})
export class ListarImagenComponent {

  termino: string = "";
  subscription: Subscription;

  listImagenes: any[] = [];
  imagenesPorPagina = 30;
  paginaActual = 1;
  paginasTotales = 0;
  principio: boolean = true;
  final: boolean = false;

  loading = false;

  constructor(private _imagenService: ImagenService) {
    this.subscription = _imagenService.terminoBusqueda$.subscribe(data => {
      this.termino = data;
      // me subcribo al observable http cuando lo recibo
      this.obtenerImagenes(true);
    })
  }

  obtenerImagenes(reset:boolean) {

    this.loading = true;

    setTimeout(args => {

      this._imagenService.getImagenes(this.termino, this.imagenesPorPagina, this.paginaActual).subscribe(
        {
          next: data => {
            if (data.hits.length === 0) {
              this._imagenService.error$ = "Opss.. no encontramos ningun resultado";
              return;
            }
            this.listImagenes = data.hits; // almacenamos en un array las imagenes
            this.loading = false;
            if (reset){
              this.paginaActual = 1;
              this.paginasTotales = Math.ceil(data.totalHits / this.imagenesPorPagina);
              this.principio = true;
              this.final = this.paginaActual == this.paginasTotales;
            }
          },
          error: err => {
            this.loading = false;
            this._imagenService.error$ = "Opss.. ocurrió un error";
          },
          complete: () => {
          }
        }
      );

    }, 0);
  }

  calcularPagina(value: number) {
    if (value == -1 && this.paginaActual > 1) {

      this.paginaActual--;
      this.listImagenes = [];
      this.obtenerImagenes(false);

    } else if (value == 1 && this.paginaActual < this.paginasTotales) {

      this.paginaActual++;
      this.listImagenes = [];
      this.obtenerImagenes(false);
    }

    this.principio = this.paginaActual == 1;
    this.final = this.paginaActual == this.paginasTotales;

  }

  setPaginaActual($event: number) {
    this.paginaActual = $event;
  }
}
