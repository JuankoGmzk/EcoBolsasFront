import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-sigup',
  templateUrl: './sigup.component.html',
  styleUrls: ['./sigup.component.css']
})
export class SigupComponent {
  generoOptions: string[] = ['Masculino', 'Femenino'];
  user = {
    primerNombre : '',
    segundoNombre : '',
    primerApellido : '',
    segundoApellido : '',
    cedula : '',
    cargo : '',
    edad : '',
    fechaNacimiento : '',
    esPLanta : '',
    genero : '',
    user: '',
    password: ''
  };

  constructor(private authService: AuthService,
    private router: Router){}

  ngOnInit(){}


  signUp() {

    this.user.user = this.user.primerNombre+this.user.primerApellido.substr(0,3);
    this.user.password = this.user.cedula;

    this.authService.signUpUser(this.user)
      .subscribe(
        res => {
          console.log("creación de usuario y de sesión -> ",res);
          localStorage.setItem('token', res.token);
          this.router.navigate(['/lobby']);
        },
        err => console.log(err)
      )
  }
}
