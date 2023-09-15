import { Component } from '@angular/core';
import { CotizadorService } from "../../services/cotizador.service";
import { Router } from '@angular/router';
@Component({
  selector: 'app-mis-cotizaciones',
  templateUrl: './mis-cotizaciones.component.html',
  styleUrls: ['./mis-cotizaciones.component.css']
})
export class MisCotizacionesComponent {
  cotizaciones = [];

  columnas: string[] = ['NombreEmpresa', 'NombreContacto','Identificacion','ValorBolsa','PVConIvaTotal','Acciones'];
  
  constructor(private cotizadorService: CotizadorService,private router: Router) {
    this.getMisCotizaciones();
  }

  async getMisCotizaciones(){
    const idUser  = {idUser: localStorage.getItem('_IdUser'), statusCotizacion: 'borrador'};

    const MisCotizaciones = await this.cotizadorService.ObtenerMisCotizaciones(idUser).toPromise();

    this.cotizaciones=MisCotizaciones;
  }

  EditarCotizacion(idCotizacion:String){
    console.log(idCotizacion)
    this.router.navigate(['/cotizador', idCotizacion]);
  }

  VerCotizacion(cotizacion:object){
    console.log(cotizacion)
  }
}
