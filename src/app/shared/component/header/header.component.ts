import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthenticationModel } from '../../models/auth/authentication.model';
import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userLogin: AuthenticationModel;
  user: any;
  url = environment.API_ENDPOINT_LOCAL;
  constructor(private authenticationService: AuthenticationService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.userLogin = this.authenticationService.getAuthenticationModel();
    if (this.userLogin){
      this.userService.getUserById(this.userLogin.userId).subscribe((result) => {
        this.user = result;
      });
    }
  }

  logOut(): void{
    this.authenticationService.logOut();
    this.router.navigate([`/`]);
    this.userLogin = this.authenticationService.getAuthenticationModel();
  }

  storeManager(): void{
    if (this.userLogin)
    {
      this.router.navigate([`/store-manager/store`]);
    }
    else{
      this.router.navigate([`/auth/sign-in`]);
    }
  }

  userOrderManager(): void{
    if (this.userLogin)
    {
      this.router.navigate([`/user-orders`]);
    }
    else{
      this.router.navigate([`/auth/sign-in`]);
    }
  }

  orderManager(): void{
    if (this.userLogin)
    {
      this.router.navigate([`/orders`]);
    }
    else{
      this.router.navigate([`/auth/sign-in`]);
    }
  }

  changePassword(): void{

  }
}
