import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import {
  StoreModel,
  StoreSummaryModel,
} from 'src/app/shared/models/store/store.model';
import { StoreService } from 'src/app/shared/services/store.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
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
