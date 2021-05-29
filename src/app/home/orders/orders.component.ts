import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthenticationModel } from 'src/app/shared/models/auth/authentication.model';
import { OrderModel } from 'src/app/shared/models/order/order.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  constructor(
    private titleService: Title,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((_) => {
        const childRoute = this.getChild(this.activeRoute);
        childRoute.data.subscribe((data) => {
          this.titleService.setTitle(data.title);
        });
      });
  }

  getChild(activeRoute: ActivatedRoute): ActivatedRoute {
    if (activeRoute.firstChild) {
      return this.getChild(activeRoute.firstChild);
    } else {
      return activeRoute;
    }
  }
}
