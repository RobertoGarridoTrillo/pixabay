import {Component, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {ImagenService} from "../../services/imagen.service";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})

export class ErrorComponent implements OnDestroy{
  texto = "";
  mostrar = false;
  subscription: Subscription;

  constructor(private _imageService: ImagenService) {
    this.subscription = _imageService.error$.subscribe(data => {
      this.mostrar = true;
      this.texto = data;
      this.mostrarMensaje();
    });
  }

  mostrarMensaje(): void {
    setTimeout(() => {
      this.mostrar = false;
    }, 2000);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    }
}
