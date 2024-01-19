import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, SearchbarInputEventDetail } from '@ionic/angular';
import { IonSearchbarCustomEvent } from '@ionic/core';
import { OTMService } from 'src/app/servicios/otm.service';
import { LugarWS, ResultadoWSDetalle, ResultadoWSSugerencias } from '../data/clases';
import { ModalController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addCircleOutline, cameraOutline } from 'ionicons/icons'
import { DestinoService } from '../servicios/destino.service';
import { Lugar } from '../data/lugar';
import { LugarListComponent } from "../componentes/lugar-list/lugar-list.component";
import { FavoritoListComponent } from '../componentes/favorito-list/favorito-list.component';
import { ModalViajeComponent } from '../componentes/modal-viaje/modal-viaje.component'; 
import { CamaraComponent } from '../componentes/camara/camara.component';


@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, LugarListComponent, FavoritoListComponent]
})
export class HomePage {

  listaLugar:Lugar[] = []
  
  lugaresSugerencias: ResultadoWSSugerencias[] = [];
  lugaresDetalles: ResultadoWSDetalle[] = [];

  favoritos: ResultadoWSDetalle[] = [];

  constructor(
    private servicio: OTMService,
    private servicio2: DestinoService,
    private modalController: ModalController
  ) { 
    addIcons({
      addCircleOutline,
      cameraOutline
    });
    this.listaLugar = this.servicio2.getListaLugar();
  }

  ngOnInit() {

  }
  

  async handleInput($event: IonSearchbarCustomEvent<SearchbarInputEventDetail>) {
    const termino: string = "" + $event.detail.value;
    this.lugaresSugerencias = [await this.servicio.getLugaresSugerencias(termino)]
    this.lugaresDetalles = [];
    for (const sugerencia of this.lugaresSugerencias[0].features) {
      const detalle = await this.servicio.getDetalleLugar(sugerencia.properties.xid);
      this.lugaresDetalles.push(detalle);
    }
  }

    // Favoritos
    
    
  agregarAFavoritos(lugarFavorito: ResultadoWSDetalle) {
    if (!this.favoritos.some((fav) => fav.xid === lugarFavorito.xid)) {
      this.favoritos.push(lugarFavorito);
    }
  }

  eliminarFavoritos(lugarFavorito: ResultadoWSDetalle) {
    const index = this.favoritos.indexOf(lugarFavorito);
    if (index >= 0) {
      this.favoritos.splice(index, 1);
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
      componentProps: {
      }
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (data && data.valorRegistrado) {
      this.servicio2.setMontoRegistrado(data.valorRegistrado);
    }
  }

  getMontoRegistrado(): number {
    return this.servicio2.getMontoRegistrado();
  }

  // Camara

  async abrirModalCamara() {
    const modal = await this.modalController.create({
      component: CamaraComponent,
    });
    return await modal.present();
  }

}