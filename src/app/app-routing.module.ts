import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Components
import {TaskComponent} from './components/task/task.component';
import {PrivateTaskComponent} from './components/private-task/private-task.component';
import {SigupComponent} from './components/sigup/sigup.component';
import {SigninComponent} from './components/signin/signin.component';
import { CreateTaskComponent } from "./components/create-task/create-task.component";
import { CotizadorComponent } from "./components/cotizador/cotizador.component";
import { MaterialesComponent } from "./components/materiales/materiales.component";
import { LobbyComponent } from "./components/lobby/lobby.component"
import { MisCotizacionesComponent } from "./components/mis-cotizaciones/mis-cotizaciones.component";
import { MisOTComponent } from './components/mis-ot/mis-ot.component';
import { UsersComponent } from './components/users/users.component';
import { MiPerfilComponent } from './components/mi-perfil/mi-perfil.component';
import { OTActivasComponent } from './components/otactivas/otactivas.component'
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path : '', component : LobbyComponent, pathMatch : 'full',canActivate: [AuthGuard] },
  { path : 'tasks', component : TaskComponent,canActivate: [AuthGuard] },
  { path : 'private', component : PrivateTaskComponent,canActivate: [AuthGuard], data: { requiredPermission: ['Administrador']}},
  { path : 'signup', component : SigupComponent,canActivate: [AuthGuard], data: { requiredPermission: ['Administrador']}},
  { path : 'signin', component : SigninComponent},
  { path : 'createTask', component: CreateTaskComponent,canActivate: [AuthGuard]},
  { path : 'cotizador/:id', component: CotizadorComponent,canActivate: [AuthGuard]},
  { path : 'materiales', component:MaterialesComponent,canActivate: [AuthGuard], data: { requiredPermission: ['Administrador']}},
  { path : 'lobby', component:LobbyComponent,canActivate: [AuthGuard]},
  { path : 'misCotizaciones', component:MisCotizacionesComponent,canActivate: [AuthGuard]},
  { path : 'misOT', component:MisOTComponent,canActivate: [AuthGuard]},
  { path : 'users', component:UsersComponent,canActivate: [AuthGuard], data: { requiredPermission: ['Administrador','Administrador3']}},
  { path : 'miPerfil', component:MiPerfilComponent,canActivate: [AuthGuard]},
  { path : 'oTActivas', component:OTActivasComponent,canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
