import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //private URL = 'http://localhost:4000/api';
  private URL = 'https://ecobackend18.azurewebsites.net/api';
  constructor(private http: HttpClient, private router: Router) { }

  signUpUser(user: any) {
    return this.http.post<any>(this.URL + '/signup', user);
  }

  signInUser(user: any) {
    return this.http.post<any>(this.URL + '/signin', user);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  hasPermission(permission: string): boolean {
    
    const strRol : string | undefined = localStorage.getItem('rol')?.toString();
    const boolValidateRol = strRol !== undefined && permission.includes(strRol);
    if(!boolValidateRol){
      return false;
    }
    return true;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/signin']);
  }

  getToken() {
    return localStorage.getItem('token');
  }


  GetAllUsers(){
    return this.http.get<any>(this.URL+'/AllUsers')
  }

  GetMyInfo(user:object){
    return this.http.post<object>(this.URL+'/MyInfo',user)
  }
}