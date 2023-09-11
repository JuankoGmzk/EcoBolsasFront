import { Component, ViewChild } from '@angular/core';
import { AuthService } from './services/auth.service';
import {  SocketWebService} from "./services/socket-web.service";
import { MatSidenav } from '@angular/material/sidenav';

import { Router, NavigationEnd } from '@angular/router';
 
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

  currentRoute: string | undefined;

  
  constructor(public authService: AuthService,private socketService: SocketWebService,private router: Router) {

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
    
  }

  ngOnInit() {
    
  }
}
