import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../service/auth/auth.service';
import {StorageService} from '../service/storage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(public readonly authService: AuthService,
                public readonly storageService: StorageService,
                public readonly router: Router) {
    }

    canActivate(next: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (!this.storageService.isLoggedIn()) {
            void this.router.navigate(['/login']);
            return false;
        } else {
            return true;
        }
    }

}
