import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  
  user = {
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  signIn() {
    this.authService.signInUser(this.user)
      .subscribe(
        res => {
          console.log("Inicio de sesión --> ",res);
       
          localStorage.setItem('token', res.token);
          localStorage.setItem('primerNombre', res.dataUser.primerNombre);
          localStorage.setItem('segundoNombre', res.dataUser.segundoNombre);
          localStorage.setItem('primerApellido', res.dataUser.primerApellido);
          localStorage.setItem('genero', res.dataUser.genero);
          localStorage.setItem('edad', res.dataUser.edad);
          localStorage.setItem('cedula', res.dataUser.cedula);
          localStorage.setItem('cargo', res.dataUser.cargo);
          localStorage.setItem('user', res.dataUser.user);
          localStorage.setItem('_IdUser',res.dataUser.idUser)

          this.router.navigate(['/lobby']);
        },
        err => console.log(err)
      )
  }

}