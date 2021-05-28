import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationModel } from '../../models/auth/authentication.model';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: AuthenticationModel;
  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.user = this.authenticationService.getAuthenticationModel();
  }

  logOut(): void{
    this.authenticationService.logOut();
    this.router.navigate([`/home`]);
    this.user = this.authenticationService.getAuthenticationModel();
  }

  storeManager(): void{
    if (this.user)
    {
      this.router.navigate([`/home/store-manager/store`]);
    }
    else{
      this.router.navigate([`/auth/sign-in`]);
    }
  }

  userOrderManager(): void{
    if (this.user)
    {
      this.router.navigate([`/home/user-orders`]);
    }
    else{
      this.router.navigate([`/auth/sign-in`]);
    }
  }

  orderManager(): void{
    if (this.user)
    {
      this.router.navigate([`/home/orders`]);
    }
    else{
      this.router.navigate([`/auth/sign-in`]);
    }
  }

  changePassword(): void{

  }
}
