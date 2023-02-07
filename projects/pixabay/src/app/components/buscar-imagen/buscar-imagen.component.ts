import { Component } from '@angular/core';
import {ImagenService} from "../../services/imagen.service";

@Component({
  selector: 'app-buscar-imagen',
  templateUrl: './buscar-imagen.component.html',
  styleUrls: ['./buscar-imagen.component.css']
})
export class BuscarImagenComponent {

  nombreImagen: string;

  constructor(private _imagenService: ImagenService) {
    this.nombreImagen = "";

  }

  buscarImagen(): void {
    if (this.nombreImagen === ""){
      this._imagenService.error$ = "Debes de introducir un valor";
      return;
    }
    // paso al observable termino el valor del input
    this._imagenService.terminoBusqueda$ = this.nombreImagen;
  }
}



