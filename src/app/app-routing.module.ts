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
  { path : '', component : LobbyComponent, pathMatch : 'full' },
  { path : 'tasks', component : TaskComponent },
  { path : 'private', component : PrivateTaskComponent,canActivate: [AuthGuard]},
  { path : 'signup', component : SigupComponent},
  { path : 'signin', component : SigninComponent},
  { path : 'createTask', component: CreateTaskComponent,canActivate: [AuthGuard]},
  { path : 'cotizador/:id', component: CotizadorComponent},
  { path : 'materiales', component:MaterialesComponent},
  { path : 'lobby', component:LobbyComponent},
  { path : 'misCotizaciones', component:MisCotizacionesComponent},
  { path : 'misOT', component:MisOTComponent},
  { path : 'users', component:UsersComponent},
  { path : 'miPerfil', component:MiPerfilComponent},
  { path : 'oTActivas', component:OTActivasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
