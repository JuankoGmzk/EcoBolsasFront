import { Component } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  usuarios = [{primerNombre:'Juan',cedula:'1000158029',cargo:'ING'}];

  columnas: string[] = ['primerNombre', 'cedula','cargo','Acciones'];
  
  constructor( private authService:AuthService) {
    this.getAllUsers();
  }

  async getAllUsers(){
    const AllUsers = await this.authService.GetAllUsers().toPromise();
    this.usuarios = AllUsers;
  }

  VerUsuario(usuario:object){

  }

  EditarUsuario(usuario:object){
    console.log((usuario as any)._id)
  }

  openModal() {
   // this.modalRef = this.modalService.open(ModalComponent)
  }

}
