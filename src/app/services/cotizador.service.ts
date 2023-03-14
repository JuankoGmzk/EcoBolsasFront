import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CotizadorService {

  private URL = 'http://localhost:4000/cotizador';
  constructor(private http: HttpClient) { }

  
  getMateriales() {
    return this.http.get<any>(this.URL + '/AllMateriales');
  }

  getMaterialesById(nombreMaterial:object){
    return this.http.post<any>(this.URL+'/MaterialById', nombreMaterial)
  }

}
