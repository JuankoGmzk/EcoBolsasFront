import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CotizadorService {

  //private URL = 'http://localhost:4000/cotizador';
  private URL = 'https://ecobackend18.azurewebsites.net/cotizador';
  constructor(private http: HttpClient) { }

  
  getMateriales() {
    return this.http.get<any>(this.URL + '/AllMateriales');
  }

  getMaterialesById(nombreMaterial:object){
    return this.http.post<any>(this.URL+'/MaterialById', nombreMaterial)
  }

  actualizarMaterialById(material:object){
    return this.http.put<any>(this.URL+"/actualizarMaterial",material);
  }

  eliminarMaterialByid(material:object){
    return this.http.post<any>(this.URL+"/eliminarMaterial", material)
  }

  //Impresion
  getImpresiones(){
    return this.http.get<any>(this.URL + "/AllImpresiones");
  }

  getImpresionesById(impresion:object){
    return this.http.post<any>(this.URL + '/ImpresionById',impresion)
  }

  actualizarImpresion(impresion:object){
    return this.http.put<any>(this.URL + '/actualizarImpresion', impresion)
  }

  
  eliminarImpresion(impresion:object){
    return this.http.post<any>(this.URL+"/eliminarImpresion", impresion)
  }

  //Confeccion
  getConfecciones(){
    return this.http.get<any>(this.URL + "/AllConfecciones");
  }

  getConfecionById(confeccion:object){
    return this.http.post<any>(this.URL + '/ConfeccionById',confeccion)
  }

  actualizarConfeccion(confeccion:object){
    return this.http.put<any>(this.URL + '/actualizarConfeccion', confeccion)
  }

  eliminarConfeccion(confeccion:object){
    return this.http.post<any>(this.URL+"/eliminarConfeccion", confeccion)
  }

  //Cordon

  getCordones(){
    return this.http.get<any>(this.URL + "/AllCordones");
  }


  getCogederaById(confeccion:object){
    return this.http.post<any>(this.URL + '/CogederaById',confeccion)
  }

  actualizarCordon(cordon:object){
    return this.http.put<any>(this.URL+'/actualizarCordon',cordon)
  }

  
  eliminarCordon(cordon:object){
    return this.http.post<any>(this.URL+"/eliminarCordon", cordon)
  }

  //cotizaciones
  postCrearCotizacion(datosCotizador:object){
    return this.http.post<any>(this.URL+'/Cotizar', datosCotizador)
  }

  postCrearYGuardarCotizacion(datosCotizador:object){
    return this.http.post<any>(this.URL+'/CrearCotizacion', datosCotizador)
  }

  ObtenerDetalleCotizacion(datosCotizador:object){
    return this.http.post<any>(this.URL+'/DetalleCotizacion', datosCotizador)
  }

  EditarCotizacion(datosCotizador:object){
    return this.http.post<any>(this.URL+'/ActualizarMiCotizacion', datosCotizador);
  }

  ObtenerMisCotizaciones(idCliente:object){
    return this.http.post<any>(this.URL+'/MisCotizaciones', idCliente);
  }

  ObtenerOtActivas(){
    return this.http.get<any>(this.URL+'/ObtenerOtActivas');
  }

  ActualizarCotizacionGenerarOT(idCotizacion:object){
    return this.http.post<object>(this.URL+'/GenerarOT', idCotizacion);
  }

}
