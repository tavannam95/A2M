import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Cookie2Service } from 'app/services/cookie2/cookie2.service';
import { JwtService } from 'app/services/jwt/jwt.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private cookieService: Cookie2Service,
    private jwtService: JwtService,
    public readonly router: Router
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (!this.jwtService.isLoggedIn() || this.jwtService.getExpiration()) {
      this.cookieService.delete();
      void this.router.navigate(['/login']);
      return false;
    }else{
      return true;
    }
    
  }

}
