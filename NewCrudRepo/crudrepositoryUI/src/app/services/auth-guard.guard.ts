import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServicesService } from './auth-services.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

constructor(private auth:AuthServicesService,private Router:Router){}

  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return this.auth.isLoggedin();
  // }
  canActivate(): boolean {
    if (this.auth.isLoggedin()) {
      return true;
    } else {
      this.Router.navigate(['/login']);
      return false;
    }
  }
}
