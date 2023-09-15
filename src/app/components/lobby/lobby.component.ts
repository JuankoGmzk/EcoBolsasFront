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
  rol : string | null  = localStorage.getItem('rol');
  strRol = this.rol == null ? '' : this.rol;
  pathImageGener = this.genero === 'Masculino' ? 'avatarMasculino' : 'avatarFemenino';
  //'Administrador', 'Colaborador', 'JefeVentas', 'JefeProduccion', 'JefeEstampado'
  permisosCotizar = ['Administrador', 'JefeVentas'];
  permisosCotizacionesRealizadas = ['Administrador', 'JefeVentas'];
  permisosHistoricoDeMisOT= ['Administrador', 'JefeVentas'];
  permisosCambiarPrecios = ['Administrador'];
  permisosUsuarios =['Administrador']; 
  permisosCrearUsuario =['Administrador'];

  blpermisosCotizar = this.permisosCotizar.includes(this.strRol)
  blpermisosCotizacionesRealizadas = this.permisosCotizacionesRealizadas.includes(this.strRol);
  blpermisosHistoricoDeMisOT= this.permisosHistoricoDeMisOT.includes(this.strRol)
  blpermisosCambiarPrecios = this.permisosCambiarPrecios.includes(this.strRol)
  blpermisosUsuarios = this.permisosUsuarios.includes(this.strRol)
  blpermisosCrearUsuario = this.permisosCrearUsuario.includes(this.strRol)


 
  mostrarSubopciones = false;
}
