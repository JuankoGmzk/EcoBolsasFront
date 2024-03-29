import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppComponent } from './app.component';
import { SigupComponent } from './components/sigup/sigup.component';
import { SigninComponent } from './components/signin/signin.component';
import { TaskComponent } from './components/task/task.component';
import { PrivateTaskComponent } from './components/private-task/private-task.component';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import {  SocketWebService} from "./services/socket-web.service";
import { CotizadorComponent } from './components/cotizador/cotizador.component';
import { MaterialesComponent } from './components/materiales/materiales.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSliderModule} from '@angular/material/slider';
import {MatExpansionModule} from '@angular/material/expansion';
import { ModalModule } from 'ngx-bootstrap/modal';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { LobbyComponent } from './components/lobby/lobby.component';
import { MisCotizacionesComponent } from './components/mis-cotizaciones/mis-cotizaciones.component';
import { MisOTComponent } from './components/mis-ot/mis-ot.component';
import { UsersComponent } from './components/users/users.component';
import { OTActivasComponent } from './components/otactivas/otactivas.component';
import { MiPerfilComponent } from './components/mi-perfil/mi-perfil.component';
import { CreateMaterialsComponent } from './components/create-materials/create-materials.component';


@NgModule({
  declarations: [
    AppComponent,
    SigupComponent,
    SigninComponent,
    TaskComponent,
    PrivateTaskComponent,
    CreateTaskComponent,
    CotizadorComponent,
    MaterialesComponent,
    LobbyComponent,
    MisCotizacionesComponent,
    MisOTComponent,
    UsersComponent,
    OTActivasComponent,
    MiPerfilComponent,
    CreateMaterialsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    MatSliderModule,
    MatExpansionModule,
    ModalModule.forRoot(),
    MatSidenavModule,
    MatDividerModule,
    MatListModule 
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    SocketWebService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
