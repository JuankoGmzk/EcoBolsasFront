import { Component,ViewEncapsulation  } from '@angular/core';
import { CotizadorService } from "../../services/cotizador.service";


@Component({
  selector: 'app-materiales',
  templateUrl: './materiales.component.html',
  styleUrls: ['./materiales.component.css'],
  encapsulation: ViewEncapsulation.None,
	styles: [
		`
			.dark-modal .modal-content {
				background-color: #292b2c;
				color: white;
			}
			.dark-modal .close {
				color: white;
			}
			.light-blue-backdrop {
				background-color: #5cb3fd;
			}
		`,
	],
})
export class MaterialesComponent {

  materiales = [{
    _id: '',
    nombreMaterial: '',
    material: '',
    largo_m: '',
    ancho_m: '',
    grm_m2: '',
    costo_sinIva_Rollo: '',
    porcentajeValor: ''
  }];

  impresiones = [{
    _id: '',
    nombreImpresion: '',
    costoImpresion: ''
  }]

  confecciones = [{
    _id:'',
    nombreConfeccion:'',
    costoConfeccion:''
  }]

  cordones = [{
    _id : '',
    nombreCordon : '',
    largoRollo : '',
    valorRollo : '',
    valorMetro : ''
  }]

  editingItem: any = null;
 

  constructor(private cotizadorService: CotizadorService) { }

  ngOnInit() {
    this.ObtenerMateriales();
    this.ObtenerImpresiones();
    this.ObtenerConfecciones();
    this.ObtenerCordones();
  }

  ObtenerMateriales() {
    this.cotizadorService.getMateriales().subscribe(
      res => {
        this.materiales = res;
      },
      err => {
        console.log(err)
      }
    );
  }

  ObtenerImpresiones() {
    this.cotizadorService.getImpresiones().subscribe(
      res => {
        this.impresiones = res;
      },
      err => {
        console.log(err)
      }
    );
  }

  ObtenerConfecciones() {
    this.cotizadorService.getConfecciones().subscribe(
      res => {
        this.confecciones = res;
      },
      err => {
        console.log(err)
      }
    );
  }

  ObtenerCordones() {
    this.cotizadorService.getCordones().subscribe(
      res => {
        this.cordones = res;
      },
      err => {
        console.log(err)
      }
    );
  }

  ParserToNumber(valor1: String) {
    let numeroFormateado = Number(valor1).toLocaleString();
    return numeroFormateado;
  }

  ValorMetroXrollo(valor: String, metros: String) {
    let opeacion = Number(valor) / Number(metros);
    return Math.floor(opeacion);
  }

  ValorMetroXdetal(valor: number, multiplicacion: string, index: number) {
    let intMultiplicacion: number = Number(multiplicacion.toLocaleString());
    let numeroEntero: number = valor * intMultiplicacion;
    return numeroEntero.toLocaleString();
  }


  EliminarMaterial(material:object){
    console.log("Eliminar material", material)
  }


  EditarMaterial(material:object, id:string){

    console.log("Editar material", id)
    this.editingItem= id;
  }

  saveEditItem(material:object){
    this.editingItem= null;

    this.cotizadorService.actualizarMaterialById(material).subscribe(
      res => {
        console.log("registro actualizado",res)
      },
      err => {
        console.log(err)
      }
    );

  }

}
