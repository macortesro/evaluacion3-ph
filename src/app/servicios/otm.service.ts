import { Injectable } from '@angular/core';
import { LugarWS, ResultadoWSDetalle, ResultadoWSSugerencias } from '../data/clases';

@Injectable({
  providedIn: 'root'
})
export class OTMService {

  apiKey  = "5ae2e3f221c38a28845f05b607222e5e1c46d57f8c263b10dc650907"
  baseUrl = "https://api.opentripmap.com/0.1/en/"

  constructor() { }

  async getLugaresSugerencias(termino: string): Promise<ResultadoWSSugerencias> {
    const url = `${this.baseUrl}/places/autosuggest?name=${termino}&radius=12742000&lon=-33.472268104251775&lat=-70.73257652710636&rate=3&limit=5&apikey=${this.apiKey}`;
    const resultado = await fetch(url);
    const data = await resultado.json();
    return data;
  }

  async getDetalleLugar(xid: string): Promise<ResultadoWSDetalle> {
    const url = `${this.baseUrl}/places/xid/${xid}?apikey=${this.apiKey}`;
    const resultado = await fetch(url);
    const data = await resultado.json();
    return data;
  }
}

