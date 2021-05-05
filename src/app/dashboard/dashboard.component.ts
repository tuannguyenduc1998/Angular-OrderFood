import { Component, OnInit } from '@angular/core';
import { AuthenticationModel } from '../shared/models/auth/authentication.model';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isCollapsed = false;
  user: AuthenticationModel;
  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.user = this.authenticationService.getAuthenticationModel();
  }

}
