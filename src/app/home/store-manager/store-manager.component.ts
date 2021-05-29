import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { filter } from 'rxjs/operators';
import { AuthenticationModel } from 'src/app/shared/models/auth/authentication.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { StoreService } from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-store-manager',
  templateUrl: './store-manager.component.html',
  styleUrls: ['./store-manager.component.scss'],
})
export class StoreManagerComponent implements OnInit {
  userLogin: AuthenticationModel;
  isProduct: boolean;
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private notificationService: NzNotificationService,
    private storeService: StoreService,
    private titleService: Title,
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
    this.userLogin = this.authenticationService.getAuthenticationModel();
    this.storeService.getStoreByUserId(this.userLogin.userId).subscribe(res => {
      if (res)
      {
        this.isProduct = true;
      }
      else{
        this.isProduct = false;
      }
    });
  }

  checkProduct(): void {
    if (this.isProduct) {
      this.router.navigate([`/store-manager/product`]);
    } else {
      this.router.navigate([`/store-manager/store`]);
      this.notificationService.warning('Thông báo', 'Vui lòng đăng ký cửa hàng trước khi tạo sản phẩm.');
    }
  }

  getChild(activeRoute: ActivatedRoute): ActivatedRoute {
    if (activeRoute.firstChild) {
      return this.getChild(activeRoute.firstChild);
    } else {
      return activeRoute;
    }
  }
}
