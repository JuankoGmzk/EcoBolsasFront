import { Component } from '@angular/core';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent {
  cargo: string | null = localStorage.getItem('cargo');
  nombre: string | null= localStorage.getItem('primerNombre')+' '+localStorage.getItem('primerApellido');
  genero: string | null = localStorage.getItem('genero');

 
  pathImageGener = this.genero === 'Masculino' ? 'avatarMasculino' : 'avatarFemenino';



  mostrarSubopciones = false;
}
