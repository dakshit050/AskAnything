import { SignupService } from './../../services/signup.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private authservice:SignupService,
    private routes:Router
){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean {
      if(!this.authservice.isLogin()){
        this.routes.navigateByUrl('/login');
        this.authservice.DeleteToken();
        return false;
      }
    return true;
  }
  
}
