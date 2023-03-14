import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-sigup',
  templateUrl: './sigup.component.html',
  styleUrls: ['./sigup.component.css']
})
export class SigupComponent {

  user = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService,
    private router: Router){}

  ngOnInit(){}


  signUp() {
    this.authService.signUpUser(this.user)
      .subscribe(
        res => {
          console.log(res);
          localStorage.setItem('token', res.token);
          this.router.navigate(['/private']);
        },
        err => console.log(err)
      )
  }
}
