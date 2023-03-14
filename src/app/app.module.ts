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



@NgModule({
  declarations: [
    AppComponent,
    SigupComponent,
    SigninComponent,
    TaskComponent,
    PrivateTaskComponent,
    CreateTaskComponent,
    CotizadorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
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
