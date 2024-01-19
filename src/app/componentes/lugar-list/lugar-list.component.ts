import { Component, Input, OnInit } from '@angular/core';
import { Lugar } from 'src/app/data/lugar';
import { DestinoService } from 'src/app/servicios/destino.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { airplaneOutline, trashOutline,cameraOutline } from 'ionicons/icons'
import { ModalViajeComponent } from '../modal-viaje/modal-viaje.component';
import { ConfirmacionModalComponent } from '../confirmacion-modal/confirmacion-modal.component';
import { CamaraComponent } from '../camara/camara.component';

@Component({
  selector: 'app-lugar-list',
  templateUrl: './lugar-list.component.html',
  styleUrls: ['./lugar-list.component.scss'],
  standalone: true,
  imports:[CommonModule, FormsModule, IonicModule]
})
export class LugarListComponent  implements OnInit {

  @Input() listaLugar:Lugar[] = []

  constructor(
    private destinoService:DestinoService,
    private modalController: ModalController
  ) { 
    addIcons({
      trashOutline,
      airplaneOutline,
    cameraOutline})
  }

  ngOnInit(): void {
    this.cargarListaLugar();
  }

  cargarListaLugar() {
    this.listaLugar = this.destinoService.getListaLugar(); 
  }

  eliminarListaLugar(index: number) {
    this.destinoService.eliminarListaLugar(index);
    this.cargarListaLugar(); 
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
      this.eliminarListaLugar(index);
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

