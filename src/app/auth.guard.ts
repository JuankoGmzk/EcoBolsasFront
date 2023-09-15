import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.authService.loggedIn()) {
      this.router.navigate(['/signin']);
      return false;
    }

    // Verificar si se requieren permisos y, en ese caso, si el usuario los tiene
    
    if (route.data && route.data['requiredPermission']) {
      const requiredPermission = route.data['requiredPermission'] as string;

      if (!this.authService.hasPermission(requiredPermission)) {
        this.router.navigate(['/lobby']); // Redirigir a una página de acceso no autorizado si no tiene los permisos necesarios
        return false;
      }
    }

    return true;
  }

}
