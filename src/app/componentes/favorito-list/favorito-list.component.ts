import { Component, Input, OnInit } from '@angular/core';
import { ResultadoWSDetalle } from 'src/app/data/clases';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { airplaneOutline, trashOutline, cameraOutline } from 'ionicons/icons'
import { DestinoService } from 'src/app/servicios/destino.service';
import { OTMService } from 'src/app/servicios/otm.service';
import { ModalViajeComponent } from '../modal-viaje/modal-viaje.component';
import { ConfirmacionModalComponent } from '../confirmacion-modal/confirmacion-modal.component';
import { CamaraComponent } from '../camara/camara.component';

@Component({
  selector: 'app-favorito-list',
  templateUrl: './favorito-list.component.html',
  styleUrls: ['./favorito-list.component.scss'],
  standalone: true,
  imports:[CommonModule, FormsModule, IonicModule]
})
export class FavoritoListComponent  implements OnInit {

  @Input() favoritos:ResultadoWSDetalle[] = []

  constructor(private destinoService:DestinoService,
    private modalController: ModalController
    ) { 
      addIcons({
        trashOutline,
        airplaneOutline,
      cameraOutline})
    }

    ngOnInit(): void {
      this.cargarFavoritos();
    }
  
    cargarFavoritos() {
      this.favoritos = this.destinoService.getFavoritos(); 
    }
  
    eliminarFavoritos(lugarFavorito: ResultadoWSDetalle) {
      const index = this.favoritos.indexOf(lugarFavorito);
      if (index >= 0) {
        this.destinoService.eliminarFavoritos(index);
        this.cargarFavoritos();
      }
    }

 // Modal 

 async abrirModal() {
  const modal = await this.modalController.create({
    component: ModalViajeComponent,
  });
  return await modal.present();
}

async mostrarModal() {
  const modal = await this.modalController.create({
    component: ModalViajeComponent,
  });

  await modal.present();

  const { data } = await modal.onWillDismiss();

  if (data && data.valorRegistrado) {
    this.destinoService.setMontoRegistrado(data.valorRegistrado);
  }
  
}

getMontoRegistrado(): number {
  return this.destinoService.getMontoRegistrado();
}

 // Confirmar Eliminar con ventana modal 

  
 async confirmarEliminar(index: number) {
  const modal = await this.modalController.create({
    component: ConfirmacionModalComponent,
    componentProps: {
      mensaje: '¿Estás seguro de que deseas eliminar este destino turístico?'
    }
  });

  await modal.present();

  const { data } = await modal.onWillDismiss();
  
  if (data && data.confirmado) {
    this.destinoService.eliminarFavoritos(index);
  }
}

  // Camara

  async abrirModalCamara() {
    const modal = await this.modalController.create({
      component: CamaraComponent,
    });
    return await modal.present();
  }

  
}
