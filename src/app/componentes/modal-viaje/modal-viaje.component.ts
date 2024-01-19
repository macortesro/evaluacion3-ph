import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { DestinoService } from 'src/app/servicios/destino.service';


@Component({
  selector: 'app-modal-viaje',
  templateUrl: './modal-viaje.component.html',
  styleUrls: ['./modal-viaje.component.scss'],
  providers: [CurrencyPipe],
  standalone: true,
  imports: [IonicModule,  FormsModule, CommonModule]
})
export class ModalViajeComponent  implements OnInit {

  valorViaje: number = 0;

  constructor(
    private modalController: ModalController,
    private destinoService: DestinoService) { }
  
  ngOnInit(){ }

  

  cerrarModal() {
    this.modalController.dismiss();
  }

  registrarViaje() {
    if (typeof this.valorViaje === 'number') {
      console.log('Valor del Viaje:', this.valorViaje);
  
      // Almacena el valor registrado en el servicio
      this.destinoService.setMontoRegistrado(this.valorViaje);
    } else {
      console.error('El valor del viaje no es un número válido.');
    }
  
    this.cerrarModal();
  }
}