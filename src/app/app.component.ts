import { Component, ViewChild } from '@angular/core';
import { AuthService } from './services/auth.service';
import {  SocketWebService} from "./services/socket-web.service";
import { MatSidenav } from '@angular/material/sidenav';

 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('sidenav') sidenav!: MatSidenav;

  toggleSidenav() {
    this.sidenav.toggle();
  }

  constructor(public authService: AuthService,private socketService: SocketWebService) {}

  ngOnInit() {
    
  }
}
