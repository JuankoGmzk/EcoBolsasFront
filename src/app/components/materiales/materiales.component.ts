import { Component,ViewEncapsulation,TemplateRef   } from '@angular/core';
import { CotizadorService } from "../../services/cotizador.service";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


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
    porcentajeValor: '',
    resultMtrXRollo:'',
    resultMtrXRolloDetal:''
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
  panelOpenMateriales = false;
  panelOpenImpresiones = false;
  panelOpenConfecciones = false;
  panelOpenCordones = false;

  
  constructor(private cotizadorService: CotizadorService,private modalService: BsModalService) { }

  modalRef?: BsModalRef;
  config = {
    animated: true
  };

  openModalDeleteMaterial(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
 
  confirmDeleteMaterial(): void {
    this.modalRef?.hide();
  }

  //

  openModalDeleteImpresion(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
 
  confirmDeleteImpresion(): void {
    this.modalRef?.hide();
  }
  //

  openModalDeleteConfeccion(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
 
  confirmDeleteConfeccion(): void {
    this.modalRef?.hide();
  }

  //

  openModalDeleteCordon(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
 
  confirmDeleteCordon(): void {
    this.modalRef?.hide();
  }
 
  declineDelete(): void {
    this.modalRef?.hide();
  }
 
  ngOnInit() {
    this.ObtenerMateriales();
    this.ObtenerImpresiones();
    this.ObtenerConfecciones();
    this.ObtenerCordones();
  }

  async ObtenerMateriales() {
    const Materiales = await this.cotizadorService.getMateriales().toPromise();
    this.materiales = Materiales;
  }

  async ObtenerImpresiones() {
    const Impresiones = await this.cotizadorService.getImpresiones().toPromise();
    this.impresiones = Impresiones;
  }

  async ObtenerConfecciones() {
    const Confecciones = await this.cotizadorService.getConfecciones().toPromise();
    this.confecciones = Confecciones;
  }

  async ObtenerCordones() {
    const Cordones = await this.cotizadorService.getCordones().toPromise();
    this.cordones = Cordones;
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
