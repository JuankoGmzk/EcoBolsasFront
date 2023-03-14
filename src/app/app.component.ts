import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import {  SocketWebService} from "./services/socket-web.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public authService: AuthService,private socketService: SocketWebService) {}

  ngOnInit() {
    
  }
}
