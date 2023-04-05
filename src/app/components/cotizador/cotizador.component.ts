import { Component, ViewChild } from '@angular/core';
import { CotizadorService } from "../../services/cotizador.service";
import { from, of, switchMap } from 'rxjs';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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
    {value: 'Asas', viewValue: 'Asas'},
    {value: 'Troquel', viewValue: 'Troquel'}
  ];

  TipoBolsa: InputSelect[] = [
    {value: 'Plana', viewValue: 'Plana'},
    {value: 'Base Fuelle', viewValue: 'Base Fuelle'},
    {value: 'Fuelle completo', viewValue: 'Fuelle completo'},
    {value: 'Tula', viewValue: 'Tula'},
    {value: 'Plegable', viewValue: 'Plegable'},
    {value: 'Troquel', viewValue: 'Troquel'},
    {value: 'joyeria', viewValue: 'joyeria'}
  ];

  TipoMaterial: InputSelect[] = [
    {value: 'Kambrel', viewValue: 'Kambrel'},
    {value: 'Kambrel - 70 gr', viewValue: 'Kambrel - 70 gr'},
    {value: 'Kambrel - 90 gr', viewValue: 'Kambrel - 90 gr'},
    {value: 'Kambrel - 110 gr', viewValue: 'Kambrel - 110 gr'},
    {value: 'Madre Selva gr', viewValue: 'Madre Selva gr'},
    {value: 'Cerro Sport gr', viewValue: 'Cerro Sport gr'},
    {value: 'Yute gr', viewValue: 'Yute gr'},
    {value: 'Lienzo gr', viewValue: 'Lienzo gr'},
    {value: 'Lino gr', viewValue: 'Lino gr'},
    {value: 'Tafeta gr', viewValue: 'Tafeta gr'},
    {value: 'Lona PVC gr', viewValue: 'Lona PVC gr'}
  ];

  TipoEstampado: InputSelect[]=[
    {value: 'Sin estampado', viewValue: 'Sin estampado'},
    {value: 'Tinta plana', viewValue: 'Tinta plana'},
    {value: 'Policromia', viewValue: 'Policromia'}
  ];

  NumeroCaras: InputSelect []=[
    {value: '1', viewValue: '1'},
    {value: '2', viewValue: '2'}
  ];

  NumeroTintas: InputSelect [] = [
    {value: '1', viewValue: '1'},
    {value: '2', viewValue: '2'},
    {value: '3', viewValue: '3'}
  ];


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


  //Datos del resultado cotizador-METROS
  txtHolguraAncho_cm: string = '';
  txtHolguraAlto_cm: string = '';
  txtFuelleAlto_cm: string = '';
  txtFuelleAncho_cm: string = '';
  txtCorteAlto_cm: string = '';
  txtCorteAncho_cm: string = '';

  txtMetrosRequeridosHorizontal: number = 0;
  txtMetrosRequeridosVertical: number = 0;

  txtMetrosSobranteHorizontal: number = 0;
  txtMetrosSobranteVertical: number = 0;

  //Proceso
  ObtenerCosto_anchoRollo: string = '';
  ObtenerCosto_largoRollo: string = '';
  ObtenerCosto_costo_sinIva_Rollo: string = '';
  Sobrantes: any = 0.02;
  ObtenerCosto_Confeccion : string = '';
  ObtenerCosto_Cogedera : string = '';
  ObtenerCosto_Impresion : string = '';

  //Ruta de imagen
  RutaImagen: string = 'deafult';
  RutaImagenSobrante: string = 'deafult';
  blnShowImagenSobrante:boolean = false;
  RutaImagenCorte: string = 'deafult';
  blnShowImagenCorte:boolean = false;

  //Enviar resultado al usuario
  strResultadoCorte: number = 0;
  strResultadoFuelleCompleto: number = 0;
  strResultadoAsas: number = 0;
  strResultadoTotal: number = 0;

  strCostoMaterial : number = 0;
  strCostoConfeccion : number = 0;
  strCostoImpresion : number = 0;
  strCostoAccesorio : number = 0;
  strCostoTransporte : number = 50000;
  strTOTAL_COSTOS : number = 0;
  strValor_TOTAL_Bolsa : number = 0;

  //Valores mostrar usuario cotización final

  strPrecioVentaConIva : number = 0;
  strTotalVentaConIva : number = 0;
  strPrecioVentaSinIva : number = 0;
  strTotalVentaSinIva : number = 0;
  strUtilidad : number = 25;


  //#endregion VariablesIniciales
  // dataSource = [
  //   { description: 'Precio Venta (sin IVA)',  unitPrice: 15001, totalPrice: 2850190 },
  //   { description: 'Precio Venta (IVA-19%)',  unitPrice: 2850, totalPrice: 541536 }
  // ];

  dataSource = [{}];

  displayedColumns = ['description',  'unitPrice', 'totalPrice'];

  constructor(private cotizadorService: CotizadorService) { }


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

  
  ParserToNumber(valor1: String) {
    let numeroFormateado = Number(valor1).toLocaleString();
    return numeroFormateado;
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

  ObtenerCostoMaterial(strNameMaterial: string): Promise<any> {
    let objNameMaterial = { nombreMaterial: strNameMaterial };

    return from(this.cotizadorService.getMaterialesById(objNameMaterial)).pipe(
      switchMap(res => {
        this.ObtenerCosto_anchoRollo = res.ancho_m;
        this.ObtenerCosto_largoRollo = res.largo_m;
        this.ObtenerCosto_costo_sinIva_Rollo = res.costo_sinIva_Rollo;
        return of(res);
      })
    ).toPromise();
  }

  ObtenerCostoConfeccion(strNameConfeccion: string): Promise<any> {
    let objNameConfeccion = { nombreConfeccion: strNameConfeccion };

    return from(this.cotizadorService.getConfecionById(objNameConfeccion)).pipe(
      switchMap(res => {
        this.ObtenerCosto_Confeccion = res.costoConfeccion;
        return of(res);
      })
    ).toPromise();
  }

  ObtenerCostoImpresion(strNameImpresion: string): Promise<any> {
    let objNameImpresion = { nombreImpresion: strNameImpresion };

    return from(this.cotizadorService.getImpresionesById(objNameImpresion)).pipe(
      switchMap(res => {
        this.ObtenerCosto_Impresion = res.costoImpresion;
        return of(res);
      })
    ).toPromise();
  }

  ObtenerCostoCogedera(strNameCogedera: string): Promise<any> {
    let objNameCogedera = { nombreCogedera: strNameCogedera };

    return from(this.cotizadorService.getCogederaById(objNameCogedera)).pipe(
      switchMap(res => {
        this.ObtenerCosto_Cogedera = res.costoCogedera;
        return of(res);
      })
    ).toPromise();
  }

  async CalcularCorte() {

    if (this.validateInput()) {

      debugger;

      await this.ObtenerCostoMaterial(this.slcMaterial);

      //Holgura
      this.txtHolguraAncho_cm = '2';
      var strTipoCogedera =  this.slcTipoCogedera;
      let Holgura = this.slcTipoCogedera = 'Troquel' ? '8' : '5';
      this.txtHolguraAlto_cm = Holgura;

      //Fuelle
      this.txtFuelleAncho_cm = '0'

      if (this.slcTipoBolsa == 'Plana') {
        this.txtFuelleAlto_cm = '0'
      }
      else {
        this.txtFuelleAlto_cm = this.txtFuelle_cm;
      }

      //Corte
      this.txtCorteAncho_cm = (Number(this.txtAncho_cm) + 2 + 0).toString();
      this.txtCorteAlto_cm = (Number(this.txtAlto_cm) * 2 + Number(Holgura) + Number(this.txtFuelleAlto_cm)).toString();

      //Corte Horizontal
      let CorteHorizontalxRollo = Math.floor(Number(this.ObtenerCosto_anchoRollo) / Number(this.txtCorteAlto_cm));
      let CorteHorizontalUsoMaterial = Number(CorteHorizontalxRollo) * Number(this.txtCorteAlto_cm);
      let CorteHorizontalSobrante = Number(this.ObtenerCosto_anchoRollo) - Number(CorteHorizontalUsoMaterial);
      let calculoTotalUnidades = parseFloat(this.txtUnidadesRequeridas) + Math.floor(parseFloat(this.txtUnidadesRequeridas) * parseFloat(this.Sobrantes));
      let calculoTotalUnidadesConDecimales = parseFloat(this.txtUnidadesRequeridas) + parseFloat(this.txtUnidadesRequeridas) * parseFloat(this.Sobrantes);
      let CorteHorizontalCortesRequeridos = Math.ceil(calculoTotalUnidadesConDecimales / Number(CorteHorizontalxRollo));
      const resultMetrosRequeridosCorteHorizontal = Math.ceil((CorteHorizontalCortesRequeridos * Number(this.txtCorteAncho_cm)) / 100)
      this.txtMetrosRequeridosHorizontal = resultMetrosRequeridosCorteHorizontal;

      //Corte Vertical
      let CorteVerticalxRollo = Math.floor(Number(this.ObtenerCosto_anchoRollo) / Number(this.txtCorteAncho_cm));
      let CorteVerticalUsoMaterial = Number(CorteVerticalxRollo) * Number(this.txtCorteAncho_cm);
      let CorteVerticalSobrante = Number(this.ObtenerCosto_anchoRollo) - Number(CorteVerticalUsoMaterial);
      let CorteVerticalCortesRequeridos = Math.ceil(calculoTotalUnidadesConDecimales / Number(CorteVerticalxRollo));
      const resultMetrosRequeridosCorteVertical = Math.ceil((CorteVerticalCortesRequeridos * Number(this.txtCorteAlto_cm)) / 100)
      this.txtMetrosRequeridosVertical = resultMetrosRequeridosCorteVertical;

      if(resultMetrosRequeridosCorteHorizontal<resultMetrosRequeridosCorteVertical){
        this.strResultadoCorte = resultMetrosRequeridosCorteHorizontal;
        this.RutaImagenCorte = "rolloHorizontal"
        this.blnShowImagenCorte = true;
      }
      else{
        this.strResultadoCorte = resultMetrosRequeridosCorteVertical;
        this.RutaImagenCorte = "rolloVertical"
        this.blnShowImagenCorte = true;
      }

      if (this.slcTipoBolsa == 'Fuelle completo') {
        const intSobranteHorizontal = this.CalcularSobranteFuelleComleto(this.ObtenerCosto_anchoRollo, this.txtFuelleAlto_cm, this.txtAlto_cm, CorteHorizontalSobrante, resultMetrosRequeridosCorteHorizontal, calculoTotalUnidadesConDecimales)
        const intSobranteVertical = this.CalcularSobranteFuelleComleto(this.ObtenerCosto_anchoRollo, this.txtFuelleAlto_cm, this.txtAlto_cm, CorteVerticalSobrante, resultMetrosRequeridosCorteVertical, calculoTotalUnidadesConDecimales, true)
        
        if(intSobranteHorizontal < intSobranteVertical){
          if(intSobranteHorizontal==0){
            this.strResultadoFuelleCompleto = intSobranteVertical;
            this.RutaImagenSobrante = "rolloVertical"
            this.blnShowImagenSobrante = true;
          }
          else{
            this.strResultadoFuelleCompleto = intSobranteHorizontal;
            this.RutaImagenSobrante = "rolloHorizontal"
            this.blnShowImagenSobrante = true;
          }
        }
        else{
          this.strResultadoFuelleCompleto = intSobranteVertical;
          this.RutaImagenSobrante = "rolloVertical"
          this.blnShowImagenSobrante = true;
        }

        this.txtMetrosSobranteHorizontal = intSobranteHorizontal;
        this.txtMetrosSobranteVertical = intSobranteVertical;

        this.strResultadoTotal = this.strResultadoCorte + this.strResultadoFuelleCompleto + this.strResultadoAsas 


        // Costos.

        //Costos Material
        const intRollosRequeridos = Number((Number(this.strResultadoTotal)/Number(this.ObtenerCosto_largoRollo)).toFixed(1));
        const intSubTotal = intRollosRequeridos*Number(this.ObtenerCosto_costo_sinIva_Rollo);
        const iva = intSubTotal*0.19;

        this.strCostoMaterial = intSubTotal+iva+this.strCostoTransporte;

        //Costos Confección

        await this.ObtenerCostoConfeccion(this.slcTipoBolsa);
        await this.ObtenerCostoCogedera(strTipoCogedera);
        await this.ObtenerCostoImpresion(this.slcEstampado)

        const intSubTotalConfeccion = calculoTotalUnidadesConDecimales*Number(this.ObtenerCosto_Confeccion); 
        const intCortesVLr_rolloConfeccion = (intRollosRequeridos*50000);
        const intCogederaConfeccion = (Number(this.txtUnidadesRequeridas)*Number(this.ObtenerCosto_Cogedera))*Number(this.ObtenerCosto_Cogedera);

        // this.strCostoConfeccion = intSubTotalConfeccion+intCortesVLr_rolloConfeccion+intCogederaConfeccion;
        this.strCostoConfeccion = intSubTotalConfeccion;

        //Costos Impresión
        const intTamaño = Number(this.txtAncho_cm)*Number(this.txtAlto_cm);
        const intTotalImpresion = Number(this.txtUnidadesRequeridas)*Number(this.ObtenerCosto_Impresion);

      
        this.strCostoImpresion = intTotalImpresion;


        this.strTOTAL_COSTOS = this.strCostoMaterial+this.strCostoConfeccion+this.strCostoImpresion+intCortesVLr_rolloConfeccion;

        this.strValor_TOTAL_Bolsa = Math.ceil(this.strTOTAL_COSTOS/Number(this.txtUnidadesRequeridas));


        //Logica Final

        this.CalcularCotizacionFinal();
        
      }
    }
  };

  CalcularCotizacionFinal(blnInput:boolean=false){
    const Utilidad = (this.strUtilidad/100)
    const PrecioVentaSinIva = (this.strValor_TOTAL_Bolsa*Utilidad)+this.strValor_TOTAL_Bolsa;
    const PrecioVentaConIva = PrecioVentaSinIva+(PrecioVentaSinIva*(19/100));
    const strPrecioVentaSinIva = PrecioVentaSinIva;
    const strTotalVentaSinIva = PrecioVentaSinIva*Number(this.txtUnidadesRequeridas);
    const strPrecioVentaConIva = PrecioVentaConIva;
    const strTotalVentaConIva = PrecioVentaConIva*Number(this.txtUnidadesRequeridas);

    const dataSource = [
      { description: "Precio Venta (sin IVA)", unitPrice: strPrecioVentaSinIva, totalPrice: strTotalVentaSinIva },
      { description: "Precio Venta (IVA-19%)", unitPrice: strPrecioVentaConIva, totalPrice: strTotalVentaConIva }
    ];

    this.dataSource = dataSource;
    
    if(blnInput){
      this.table.renderRows();
    }
  }

  //MetrosRequeridosAncho:MRA
  //Alto Fuelle : AF
  //Alto Bolsa : AB
  //Sobrante : S
  //Metros Requeridos Horizontal:MRH
  CalcularSobranteFuelleComleto(strMRA: string, strAF: string, strAB: string, strS: number, strMRH: number, intTotalUnidades: number, isVertical: boolean = false) {

    let sobranteV = Math.floor((Number(strS) / Number(strAF))) * Math.floor((Number(strMRH) * 100 / Number(strAB)));
    let sobranteH = Math.floor((Number(strS) / Number(strAB))) * Math.floor((Number(strMRH) * 100 / Number(strAF)));

    let UnidadesRequeridas = (intTotalUnidades * 2) - Math.max(sobranteV, sobranteH);
    if (UnidadesRequeridas < 0) {
      UnidadesRequeridas = 0;
    }

    let CortesxAR = Math.floor((Number(strMRA) / Number(strAB)));
    let UsoMaterial = CortesxAR * Number(strAB)
    let Desperdicio = Number(strMRA) - UsoMaterial
    let CortesRequeridos = Math.ceil(UnidadesRequeridas / CortesxAR)
    let MetrosRequeridos = Math.ceil((CortesRequeridos * Number(strAF)) / 100)

    if (isVertical) {
      CortesxAR = Math.floor((Number(strMRA) / Number(strAF)));
      UsoMaterial = CortesxAR * Number(strAF)
      Desperdicio = Number(strMRA) - UsoMaterial
      CortesRequeridos = Math.ceil(UnidadesRequeridas / CortesxAR)
      MetrosRequeridos = Math.ceil((CortesRequeridos * Number(strAB)) / 100)
    }
   
    return MetrosRequeridos;
  }

  CambiarImagen(strMaterial: string) {
    this.RutaImagen = strMaterial;
  }
}
