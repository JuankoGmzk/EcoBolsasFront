import { Component } from '@angular/core';
import {AuthService} from '../../services/auth.service'

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent {
  genero: string | null = localStorage.getItem('genero');

 
  pathImageGener = this.genero === 'Masculino' ? 'avatarMasculino' : 'avatarFemenino';


    primerNombre = localStorage.getItem('primerNombre');
    segundoNombre = localStorage.getItem('segundoNombre');
    primerApellido = localStorage.getItem('primerApellido');
    segundoApellido = localStorage.getItem('segundoApellido');
    cedula = localStorage.getItem('cedula');
    cargo = localStorage.getItem('cargo');
    edad = localStorage.getItem('edad');
    fechaNacimiento = localStorage.getItem('fechaNacimiento');
    esPlanta = localStorage.getItem('esPlanta');

  constructor(private authService : AuthService){

  }
  
  EditarPerfil(){
    
  }

  CambiarContrasena(){

  }

}
