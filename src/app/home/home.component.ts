import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
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
