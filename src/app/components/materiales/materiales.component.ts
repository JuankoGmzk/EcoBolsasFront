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

  _idUser : string | null = localStorage.getItem('_IdUser');
  _idUserString = this._idUser == null ? '' : this._idUser


  materiales = [{
    _id: '',
    nombreMaterial: '',
    material: '',
    largo_m: '',
    ancho_m: '',
    grm_m2: '',
    costo_sinIva_Rollo: '',
    costoAnteriorFront:'',
    porcentajeValor: '',
    resultMtrXRollo:'',
    resultMtrXRolloDetal:''
  }];

  impresiones = [{
    _id: '',
    nombreImpresion: '',
    costoImpresion: '',
    antiguoValorcostoImpresion:'',
  }]

  confecciones = [{
    _id:'',
    nombreConfeccion:'',
    costoConfeccion:'',
    antiguoValorcostoConfeccion:'',

  }]

  cordones = [{
    _id : '',
    nombreCordon : '',
    largoRollo : '',
    valorRollo : '',
    valorMetro : '',
    antiguoValorcostovalorMetro:'',
  }]

  editingItem: any = null;
  editingImpreion:any = null;
  editingConfeccion:any=null;
  editingCordon:any=null;
  panelOpenMateriales = false;
  panelOpenImpresiones = false;
  panelOpenConfecciones = false;
  panelOpenCordones = false;

  
  constructor(private cotizadorService: CotizadorService,private modalService: BsModalService) { }

  modalRef?: BsModalRef;
  config = {
    animated: true
  };

  _idMaterialEliminar : string = "";

  openModalDeleteMaterial(template: TemplateRef<any>, _id:string) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    this._idMaterialEliminar = _id;
  }

  confirmDeleteMaterial(): void {

    const obj_IdMaterial = {_id:this._idMaterialEliminar}

     console.log(obj_IdMaterial)

     this.cotizadorService.eliminarMaterialByid(obj_IdMaterial).subscribe(
       res => { 
         console.log("registro eliminado",res) 
         window.location.reload();
       },
       err => {
         console.log("Es este el error de backend?",err)
       }
     );

    this.modalRef?.hide();
  }

  //
  _idImpresionEliminar : string = "";

  openModalDeleteImpresion(template: TemplateRef<any>,_id:string) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    this._idImpresionEliminar = _id;
  }

  confirmDeleteImpresion(): void {

    const obj_IdImpresion = {_id:this._idImpresionEliminar}

    console.log(obj_IdImpresion)

    this.cotizadorService.eliminarImpresion(obj_IdImpresion).subscribe(
      res => { 
        console.log("registro eliminado",res) 
        window.location.reload();
      },
      err => {
        console.log("Es este el error de backend?",err)
      }
    );

    this.modalRef?.hide();
  }
  //

  _idConfeccionEliminar : string = "";

  openModalDeleteConfeccion(template: TemplateRef<any>, _id:string) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    this._idConfeccionEliminar=_id;
  }
 
  confirmDeleteConfeccion(): void {

     const obj_Id = {_id:this._idConfeccionEliminar}

     console.log(obj_Id)

     this.cotizadorService.eliminarConfeccion(obj_Id).subscribe(
       res => { 
         console.log("registro eliminado",res) 
         window.location.reload();
       },
       err => {
         console.log("Es este el error de backend?",err)
       }
     );

    this._idConfeccionEliminar = "";
    this.modalRef?.hide();
  }

  //

  _idCordonEliminar : string = "";

  openModalDeleteCordon(template: TemplateRef<any>, _id:string) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    this._idCordonEliminar = _id;
  }

  confirmDeleteCordon(): void {

    const obj_IdCordon = {_id:this._idCordonEliminar}

    console.log(obj_IdCordon)

    this.cotizadorService.eliminarCordon(obj_IdCordon).subscribe(
      res => { 
        console.log("registro eliminado",res) 
        window.location.reload();
      },
      err => {
        console.log("Es este el error de backend?",err)
      }
    );

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

    console.log( this.materiales)
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


  saveEditItem(material:object, user:string){ 
    this.editingItem= null;
    console.log(material)
    console.log(typeof(material))

    this.cotizadorService.actualizarMaterialById(material).subscribe(
      res => { 
        console.log("registro actualizado",res) 
        window.location.reload();
      },
      err => {
        console.log(err)
      }
    );

  }

  EditarImpresion(impresion:object, id:string){
    console.log("editando la impresion");
    this.editingImpreion = id
  }

  saveEditImpresion(impresion:object,user:string){

    this.editingImpreion = null;

    this.cotizadorService.actualizarImpresion(impresion).subscribe(
      res => { 
        console.log("registro actualizado",res) 
        window.location.reload();
      },
      err => {
        console.log(err)
      }
    );

  }

  EditarConfeccion(confeccion:object, id:string){
    this.editingConfeccion=id;

  }
  saveEditConfeccion(confeccion:object,user:string){
    this.editingConfeccion = null;

    this.cotizadorService.actualizarConfeccion(confeccion).subscribe(
      res => { 
        console.log("registro actualizado",res) 
        window.location.reload();
      },
      err => {
        console.log(err)
      }
    );

  }

  EditarCordon(cordon:object,id:string){
    this.editingCordon = id;
  }

  saveEditCordon(cordon:object,user:string){
    this.editingCordon = null;

    this.cotizadorService.actualizarCordon(cordon).subscribe(
      res => { 
        console.log("registro actualizado",res) 
        window.location.reload();
      },
      err => {
        console.log(err)
      }
    );
  }
}
