import { Component, ViewChild } from '@angular/core';
import { CotizadorService } from "../../services/cotizador.service";
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { MatTable } from '@angular/material/table';



interface InputSelect {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-cotizador',
  templateUrl: './cotizador.component.html',
  styleUrls: ['./cotizador.component.css']
})
export class CotizadorComponent {

  formatLabel(value: number): string {
    return `${value}`;
  }

  @ViewChild(MatTable) table!: MatTable<any>;



  TipoCogedera: InputSelect[] = [
    { value: 'Asas', viewValue: 'Asas' },
    { value: 'Troquel', viewValue: 'Troquel' }
  ];

  TipoBolsa: InputSelect[] = [];
  TipoMaterial: InputSelect[] = [];
  TipoEstampado: InputSelect[] = [];

  NumeroCaras: InputSelect[] = [
    { value: '1', viewValue: '1' },
    { value: '2', viewValue: '2' }
  ];

  NumeroTintas: InputSelect[] = [
    { value: '1', viewValue: '1' },
    { value: '2', viewValue: '2' },
    { value: '3', viewValue: '3' }
  ];

  respuestaCotizacion = {
    PVSinIvaUnitario: '',
    PVSinIvaTotal: '',
    PVConIvaUnitario: '',
    PVConIvaTotal: '',
    IVA19Unitario: '',
    IVA19Total: '',

    PTMaterial: '',
    PTConfeccion: '',
    PTCorte: '',
    PTImpresion: '',
    PTAccesorios: '',
    PTOtros: '',

    SumaTotalCostos: '',
    ValorPorBolsa: '',
    message: '',

    rutaImagen: '',
    PreciosVenta: '',
    ResumenCosto: '',
  };


  //Estado 
  ImpStatusCot : string = '';
  //#region VariablesIniciales
  blnFuelleOpen = true;
  blnAsas = true;

  //Datos del cliente
  blnNombreEmpresa: boolean = false;
  blnNombreContacto: boolean = false;
  blnNit: boolean = false;
  blnTel_Contacto: boolean = false;
  blnEmail: boolean = false;
  blnFechaEntrega: boolean = false;
  blnCiudad: boolean = false;
  blnDireccionDeEntrega: boolean = false;
  // Datos Bolsa
  blnUnidadesRequeridas: boolean = false;
  blnTipoBolsa: boolean = false;
  blnTipoCogedera: boolean = false;
  blnAncho_cm: boolean = false;
  blnAlto_cm: boolean = false;
  blnFuelle_cm: boolean = false;
  blnLargoAsas_cm: boolean = false;
  //Datos Material
  blnMaterial: boolean = false;
  blnColor: boolean = false;
  //Datos Estampado
  blnEstampado: boolean = false;
  blnCaras: boolean = false;
  blnNumeroTintas: boolean = false;
  blnColorTintas: boolean = false;

  //Datos del cliente
  txtNombreEmpresa: string = '';
  txtNombreContacto: string = '';
  txtNit: string = '';
  txtTel_Contacto: string = '';
  txtEmail: string = '';
  txtFechaEntrega: string = '';
  txtCiudad: string = '';
  txtDireccionDeEntrega: string = '';
  // Datos Bolsa
  txtUnidadesRequeridas: string = '';
  slcTipoBolsa: string = '';
  slcTipoCogedera: string = '';
  txtAncho_cm: string = '';
  txtAlto_cm: string = '';
  txtFuelle_cm: string = '';
  txtLargoAsas_cm: string = '';
  //Datos Material
  slcMaterial: string = '';
  txtColor: string = '';
  //Datos Estampado
  slcEstampado: string = '';
  slcCaras: string = '';
  slcNumeroTintas: string = '';
  txtColorTintas: string = '';

  //Ruta de imagen
  RutaImagen: string = 'deafult';
  RutaImagenSobrante: string = 'deafult';
  blnShowImagenSobrante: boolean = false;
  RutaImagenCorte: string = 'deafult';
  blnShowImagenCorte: boolean = false;
  blnCotizacionTable: boolean = false;

  //Valores mostrar usuario cotización final
  strUtilidad: number = 25;

  dataSource = [{}];

  displayedColumns = ['description', 'unitPrice', 'totalPrice'];

  constructor(private cotizadorService: CotizadorService) {
    this.AllMateriales();
    this.AllConfeciones();
    this.AllImpresion();
  }


  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      const date = cellDate.getDate();

      // Highlight the 1st and 20th day of each month.
      return date === 1 || date === 20 ? 'example-custom-date-class' : '';
    }

    return '';
  };

  ngOnInit() {
  }

  validateInput() {

    let blnValidate = true;
    //Datos del cliente
    this.txtNombreEmpresa ? this.blnNombreEmpresa = false : this.blnNombreEmpresa = true;
    this.txtNombreContacto ? this.blnNombreContacto = false : this.blnNombreContacto = true;
    this.txtNit ? this.blnNit = false : this.blnNit = true;
    this.txtTel_Contacto ? this.blnTel_Contacto = false : this.blnTel_Contacto = true;
    this.txtEmail ? this.blnEmail = false : this.blnEmail = true;
    this.txtFechaEntrega ? this.blnFechaEntrega = false : this.blnFechaEntrega = true;
    this.txtCiudad ? this.blnCiudad = false : this.blnCiudad = true;
    this.txtDireccionDeEntrega ? this.blnDireccionDeEntrega = false : this.blnDireccionDeEntrega = true;
    // Datos Bolsa
    this.txtUnidadesRequeridas ? this.blnUnidadesRequeridas = false : this.blnUnidadesRequeridas = true;
    this.slcTipoBolsa ? this.blnTipoBolsa = false : this.blnTipoBolsa = true;
    this.slcTipoCogedera ? this.blnTipoCogedera = false : this.blnTipoCogedera = true;
    this.txtAncho_cm ? this.blnAncho_cm = false : this.blnAncho_cm = true;
    this.txtAlto_cm ? this.blnAlto_cm = false : this.blnAlto_cm = true;
    this.txtFuelle_cm ? this.blnFuelle_cm = false : this.blnFuelle_cm = true;
    this.txtLargoAsas_cm ? this.blnLargoAsas_cm = false : this.blnLargoAsas_cm = true;
    //Datos Material
    this.slcMaterial ? this.blnMaterial = false : this.blnMaterial = true;
    this.txtColor ? this.blnColor = false : this.blnColor = true;
    //Datos Estampado
    this.slcEstampado ? this.blnEstampado = false : this.blnEstampado = true;
    this.slcCaras ? this.blnCaras = false : this.blnCaras = true;
    this.slcNumeroTintas ? this.blnNumeroTintas = false : this.blnNumeroTintas = true;
    this.txtColorTintas ? this.blnColorTintas = false : this.blnColorTintas = true;

    //#Validación 
    // if(!this.blnNombreEmpresa && !this.blnNombreContacto && !this.blnNit && !this.blnTel_Contacto && !this.blnEmail && !this.blnFechaEntrega && !this.blnCiudad && !this.blnDireccionDeEntrega
    //    && !this.blnUnidadesRequeridas && !this.blnTipoBolsa && !this.blnTipoCogedera && !this.blnAncho_cm && !this.blnAlto_cm && !this.blnFuelle_cm && !this.blnLargoAsas_cm
    //    && !this.blnMaterial && !this.blnColor
    //    && !this.blnEstampado && !this.blnCaras && !this.blnNumeroTintas && !this.blnColorTintas){
    //     blnValidate = true;
    // }
    if (!this.blnMaterial) {
      blnValidate = true;
    }
    else {
      blnValidate = false;
    }
    //#Validación
    return blnValidate;
  }

  validateShowInputBolsas(strTipoBolsa: string) {
    if (strTipoBolsa == "Plana") {
      this.blnFuelleOpen = false;
    }
    else {
      this.blnFuelleOpen = true;
    }
  }

  validateShowInputAsas(strTipoAsas: string) {
    if (strTipoAsas == "Troquel") {
      this.blnAsas = false;
    }
    else {
      this.blnAsas = true
    }
  }

  async CalcularCorteBackend() {

    const datosCotizacion = {
      TipoCogedera: this.slcTipoCogedera,
      TipoBolsa: this.slcTipoBolsa,
      UnidadesRequeridas: this.txtUnidadesRequeridas,
      Ancho: this.txtAncho_cm,
      Alto: this.txtAlto_cm,
      Fuelle: this.txtFuelle_cm,
      Asas: this.txtLargoAsas_cm,
      Material: this.slcMaterial,
      Color: this.txtColor,
      Estampado: this.slcEstampado,
      Caras: this.slcCaras,
      NumeroTintas: this.slcNumeroTintas,
      ColorTintas: this.txtColorTintas
    };
    try {
      const respuesta = await this.cotizadorService.postCrearCotizacion(datosCotizacion).toPromise();
      console.log("respuesta cotizador", respuesta);
      if (respuesta.resp) {
        this.blnCotizacionTable = true;


        this.respuestaCotizacion.PVSinIvaUnitario = respuesta.PreciosVenta.PVSinIvaUnitario;
        this.respuestaCotizacion.PVSinIvaTotal = respuesta.PreciosVenta.PVSinIvaTotal;
        this.respuestaCotizacion.PVConIvaUnitario = respuesta.PreciosVenta.PVConIvaUnitario;
        this.respuestaCotizacion.PVConIvaTotal = respuesta.PreciosVenta.PVConIvaTotal;
        this.respuestaCotizacion.IVA19Unitario = respuesta.PreciosVenta.IVA19Unitario;
        this.respuestaCotizacion.IVA19Total = respuesta.PreciosVenta.IVA19Total;

        this.respuestaCotizacion.PTMaterial = respuesta.ResumenCosto.PTMaterial;
        this.respuestaCotizacion.PTConfeccion = respuesta.ResumenCosto.PTConfeccion;
        this.respuestaCotizacion.PTCorte = respuesta.ResumenCosto.PTCorte;
        this.respuestaCotizacion.PTImpresion = respuesta.ResumenCosto.PTImpresion;
        this.respuestaCotizacion.PTAccesorios = respuesta.ResumenCosto.PTAccesorios;
        this.respuestaCotizacion.PTOtros = respuesta.ResumenCosto.PTOtros;

        this.respuestaCotizacion.SumaTotalCostos = respuesta.ResumenCosto.SumaTotalCostos;
        this.respuestaCotizacion.ValorPorBolsa = respuesta.ResumenCosto.ValorPorBolsa;
        this.respuestaCotizacion.message = respuesta.message;

        this.respuestaCotizacion.rutaImagen = respuesta.rutaImagen;
        this.respuestaCotizacion.PreciosVenta = respuesta.PreciosVenta;
        this.respuestaCotizacion.ResumenCosto = respuesta.ResumenCosto;

        const dataSource = [
          { description: "Precio Venta (sin IVA)", unitPrice: respuesta.PreciosVenta.PVSinIvaUnitario, totalPrice: respuesta.PreciosVenta.PVSinIvaTotal },
          { description: "Precio Venta (IVA-19%)", unitPrice: respuesta.PreciosVenta.PVConIvaUnitario, totalPrice: respuesta.PreciosVenta.PVConIvaTotal }
        ];

        this.dataSource = dataSource;


      }
      else {

      }

    } catch (error) {
      console.error(error);
    }
  }

  CambiarImagen(strMaterial: string) {
    this.RutaImagen = strMaterial;
  }

  CambiarUtilidad(strUtilidad: string) {
    return null;
  }

  AllMateriales() {
    const AllMateriales = this.cotizadorService.getMateriales().toPromise();

    AllMateriales.then((materiales) => {

      materiales.forEach((element: any) => {
        this.TipoMaterial.push({ value: element._id, viewValue: element.nombreMaterial });
      });

    }).catch((error) => {
      console.error(error);
    });

  }
  AllConfeciones() {

    const AllConfecciones = this.cotizadorService.getConfecciones().toPromise();

    AllConfecciones.then((confecciones) => {
   
      confecciones.forEach((element: any) => {
        this.TipoBolsa.push({ value: element._id, viewValue: element.nombreConfeccion })
      });
    });

  }

  AllCogedera() {



  }

  AllImpresion() {

    const AllImpresiones = this.cotizadorService.getImpresiones().toPromise();
    AllImpresiones.then((impresiones) => {
      impresiones.forEach((element: any) => {
        this.TipoEstampado.push({ value: element._id, viewValue: element.nombreImpresion })
      });
    });
  }


  async GuardarCotizacionBackend() {

    const datosCotizacion = {
      NombreEmpresa: this.txtNombreEmpresa,
      NombreContacto: this.txtNombreContacto,
      Identificacion: this.txtNit,
      TelContacto: this.txtTel_Contacto,
      Email: this.txtEmail,
      FechaEntrega: this.txtFechaEntrega,
      Ciudad: this.txtCiudad,
      DireccionEntrega: this.txtDireccionDeEntrega,
      TipoCogedera: this.slcTipoCogedera,
      TipoBolsa: this.slcTipoBolsa,
      UnidadesRequeridas: this.txtUnidadesRequeridas,
      Ancho_cm: this.txtAncho_cm,
      Alto_cm: this.txtAlto_cm,
      Fuelle_cm: this.txtFuelle_cm,
      Asas_cm: this.txtLargoAsas_cm,
      Material: this.slcMaterial,
      Color: this.txtColor,
      Estampado: this.slcEstampado,
      Caras: this.slcCaras,
      NumeroTintas: this.slcNumeroTintas,
      ColorTintas: this.txtColorTintas,
      ValorBolsa:  this.respuestaCotizacion.ValorPorBolsa,
      Utilidad: this.strUtilidad,
      PVSinIvaUnitario: this.respuestaCotizacion.PVSinIvaUnitario,
      PVSinIvaTotal: this.respuestaCotizacion.PVSinIvaTotal,
      PVConIvaUnitario: this.respuestaCotizacion.PVConIvaUnitario,
      PVConIvaTotal:  this.respuestaCotizacion.PVConIvaTotal ,
      NombreUsuario:localStorage.getItem('user'),
      _IdUsuario:localStorage.getItem('_IdUser'),
      _EstadoCotizacion:'borrador',
      CheckCliente:null,
      CheckDineroCliente:null
    };

    try {
      const respuesta = await this.cotizadorService.postCrearYGuardarCotizacion(datosCotizacion).toPromise();
      console.log("respuesta cotizador", respuesta);
    } catch (error) {
      console.error(error);
    }
  }


}
