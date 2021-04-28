import { Component, OnInit } from '@angular/core';
import { AuthenticationModel } from '../../models/auth/authentication.model';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: AuthenticationModel;
  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.user = this.authenticationService.getAuthenticationModel();
  }

  logOut(): void{

  }

  changePassword(): void{

  }
}
