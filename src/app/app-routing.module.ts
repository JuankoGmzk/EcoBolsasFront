import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Components
import {TaskComponent} from './components/task/task.component';
import {PrivateTaskComponent} from './components/private-task/private-task.component';
import {SigupComponent} from './components/sigup/sigup.component';
import {SigninComponent} from './components/signin/signin.component';
import { CreateTaskComponent } from "./components/create-task/create-task.component";
import { CotizadorComponent } from "./components/cotizador/cotizador.component";
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path : '', component : TaskComponent, pathMatch : 'full' },
  { path : 'tasks', component : TaskComponent },
  { path : 'private', component : PrivateTaskComponent,canActivate: [AuthGuard]},
  { path : 'signup', component : SigupComponent},
  { path : 'signin', component : SigninComponent},
  { path : 'createTask', component: CreateTaskComponent,canActivate: [AuthGuard]},
  { path : 'cotizador', component: CotizadorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
