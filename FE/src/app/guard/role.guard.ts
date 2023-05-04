import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtService } from 'app/services/jwt/jwt.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private toastrService: ToastrService,
    private router: Router
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.jwtService.getRoleFromToken()==='ROLE_ADMINSTRATOR') {
        return true;
      }
      const check = this.jwtService.getRoleFromToken() === route.data['role'];
      
      if (!check) {
        this.toastrService.warning(route.data['message']);
        return false;
      }
      // if (this.jwtService.getRoleFromToken() == 'ROLE_EMPLOYEE' || this.jwtService.getRoleFromToken()==='ROLE_ADMINSTRATOR') {
      //   this.router.navigate(['/dashboard']);
      //   return true;
      // }
      // if (this.jwtService.getRoleFromToken() == 'ROLE_CUSTOMER') {
      //   this.router.navigate(['/home']);
      // }
      return true;

  }
  
}
