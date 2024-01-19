import { Injectable } from '@angular/core';
import { Lugar } from '../data/lugar';
import { ResultadoWSDetalle } from '../data/clases';

@Injectable({
  providedIn: 'root'
})
export class DestinoService {

  favoritos: ResultadoWSDetalle[] = [];

  // Para Modal Viaje 
  montoRegistrado: number = 0; 

  // Listado pre cargado 

  private listaLugar:Lugar[] = [

    new Lugar("Jardín Botánico de la Universidad Austral de Chile", "Chile", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/UACh-Jard%C3%ADn_Bot%C3%A1nico-3.JPG/400px-UACh-Jard%C3%ADn_Bot%C3%A1nico-3.JPG"),
    new Lugar("Torres del Paine National Park", "Chile","https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Torres_del_Paine%2C_Laguna_Azul_09.jpg/400px-Torres_del_Paine%2C_Laguna_Azul_09.jpg"),
    new Lugar("Pichilemu Historical Area", "Chile","https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Parque_Agust%C3%ADn_Ross_-_2008_-_1.jpg/400px-Parque_Agust%C3%ADn_Ross_-_2008_-_1.jpg"),
    new Lugar("Holy Cross Chruch, Hanga Roa", "Chile","https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Hanga_Roa_Catholic_Church_exterior_2.JPG/400px-Hanga_Roa_Catholic_Church_exterior_2.JPG"),
  ]


  // Metodos para el listado pre cargado 

  agregarListaLugar(l:Lugar){
    this.listaLugar.push(l)
  }

  getListaLugar():Lugar[]{
    return this.listaLugar
  }

  eliminarListaLugar(index: number) {
    if (index >= 0 && index < this.listaLugar.length) {
      this.listaLugar.splice(index, 1);
    }
  }

  // Favoritos 

  

  agregarFavoritos(f:ResultadoWSDetalle){
    this.favoritos.push(f)
  }

  getFavoritos():ResultadoWSDetalle[]{
    return this.favoritos
  }

  eliminarFavoritos(index: number) {
    if (index >= 0 && index < this.favoritos.length) {
      this.favoritos.splice(index, 1);
    }
  }

// Para el Modal Viaje 

setMontoRegistrado(monto: number) {
  this.montoRegistrado = monto;
}

getMontoRegistrado(): number {
  return this.montoRegistrado;
}

  constructor() { }

}

