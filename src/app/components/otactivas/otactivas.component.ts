import { Component } from '@angular/core';
import { SocketWebService } from '../../services/socket-web.service';
import { CotizadorService } from '../../services/cotizador.service';

@Component({
  selector: 'app-otactivas',
  templateUrl: './otactivas.component.html',
  styleUrls: ['./otactivas.component.css']
})
export class OTActivasComponent {

  OtActivas = [{
    NombreEmpresa:'',
    NombreContacto:'',
    Identificacion:'',
    TelContacto:'',
    FechaEntrega:'',
    UnidadesRequeridas:''
  }];


  constructor(private socketWebService:SocketWebService, private cotizacionService:CotizadorService){
    socketWebService.outEven.subscribe((res:any) => {
      console.log(res);
      this.ObtenerCotizacionesOTActivas();
    })
  }

  ngOnInit(): void {
    this.ObtenerCotizacionesOTActivas();
  } 

  async ObtenerCotizacionesOTActivas (){

    const CotizacionesOTActivas = await this.cotizacionService.ObtenerOtActivas().toPromise();

    this.OtActivas = CotizacionesOTActivas;

    console.log("CotizacionesOTActivas***** ",CotizacionesOTActivas)

  }

}
