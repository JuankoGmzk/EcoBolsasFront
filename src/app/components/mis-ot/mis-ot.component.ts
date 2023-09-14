import { Component } from '@angular/core';
import { CotizadorService } from "../../services/cotizador.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-mis-ot',
  templateUrl: './mis-ot.component.html',
  styleUrls: ['./mis-ot.component.css']
})
export class MisOTComponent {

  cotizaciones = [];

  columnas: string[] = ['NombreEmpresa', 'NombreContacto','Identificacion','ValorBolsa','PVConIvaTotal','Acciones'];
  
  constructor(private cotizadorService: CotizadorService,private router: Router) {
    this.getMisCotizaciones();
  }

  async getMisCotizaciones(){
    const idUser  = {idUser: localStorage.getItem('_IdUser'), statusCotizacion: 'OT'};

    const MisCotizaciones = await this.cotizadorService.ObtenerMisCotizaciones(idUser).toPromise();

    this.cotizaciones=MisCotizaciones;
  }

  VerCotizacion(cotizacion:object){
    console.log(cotizacion)
  }
}
