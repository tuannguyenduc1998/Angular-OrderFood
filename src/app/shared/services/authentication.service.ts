import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { localStorageKey } from 'src/app/app.config';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends BaseService implements CanActivate {

  constructor(private httpClient: HttpClient, private router: Router) {
    super(httpClient);
   }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.getAuthenticationModel()) {
      return true;
    }
    this.router.navigate(['/auth/sign-in'], {
      queryParams: { returnUrl: state.url }
    });
    return false;
  }
   public login(usernameOrEmail: string, password: string): Observable<any>{
     const requestModel = {
       userName: usernameOrEmail,
       password
     };
     return this.post<any>('/api/accounts/login', requestModel);
   }

   public setAuthenticationModel(authenticationModel: any): string{
     return (window.localStorage[localStorageKey] = JSON.stringify(
       authenticationModel
     ));
   }

   public getAuthenticationModel(): any {
    if (!window.localStorage[localStorageKey]) {
      return null;
    }
    try {
      return JSON.parse(window.localStorage[localStorageKey]);
    } catch (error) {
      return null;
    }
  }
}
