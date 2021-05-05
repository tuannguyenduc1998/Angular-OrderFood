import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AuthenticationModel } from 'src/app/shared/models/auth/authentication.model';
import { StoreSummaryModel } from 'src/app/shared/models/store/store.model';
import { UserDataFilter } from 'src/app/shared/models/user/user-data-filter.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { StoreService } from 'src/app/shared/services/store.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-management-store-list',
  templateUrl: './management-store-list.component.html',
  styleUrls: ['./management-store-list.component.scss']
})
export class ManagementStoreListComponent implements OnInit {

  stores: StoreSummaryModel[];
  userLogin: AuthenticationModel;
  filterModel: UserDataFilter = new UserDataFilter();
  searchTerm$ = new BehaviorSubject('');
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  url = environment.API_ENDPOINT_LOCAL;
  constructor(private storeService: StoreService, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.userLogin = this.authenticationService.getAuthenticationModel();
    this.searchTerm$.pipe(debounceTime(200)).subscribe((_) => {
      this.filterModel.keyWord = this.searchTerm$.value.trim();
      this.pageIndex = 1;
      this.filterUserList();
    });
  }

  filterUserList(pageIndex?: number): void {
    this.filterModel.page = pageIndex;
    const filter = { ...this.filterModel };
    this.storeService
      .listStorePaging(filter)
      .subscribe((result) => {
        this.stores = result.items;
        this.total = result.total;
        this.pageIndex = this.filterModel.page ?  this.filterModel.page : 1;
      });
  }

  changPageSize(event: number): void {
    this.filterModel.pageSize = event;
    this.filterModel.page = 1;
    this.filterUserList();
  }

  changePageIndex(event: number): void {
    this.filterUserList(event);
  }

}
