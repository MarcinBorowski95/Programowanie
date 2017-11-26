import { AuthService } from './../_services/auth.service';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/do';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
 
@Injectable()
export class AuthGuard implements CanActivate {
 
    constructor(
      private auth: AuthService,
      private router: Router,
    ) { }
 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.auth.authenticated$
            .do((authenticated) => {
                if(!authenticated) {
                    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
                }
            })
        
    }
}