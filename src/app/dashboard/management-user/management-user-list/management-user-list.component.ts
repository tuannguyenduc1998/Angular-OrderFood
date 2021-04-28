import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { UserDataFilter } from 'src/app/shared/models/user/user-data-filter.model';
import { UserData } from 'src/app/shared/models/user/user-data.model';
import { UserService } from 'src/app/shared/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-management-user-list',
  templateUrl: './management-user-list.component.html',
  styleUrls: ['./management-user-list.component.scss']
})
export class ManagementUserListComponent implements OnInit {

  userList: UserData[] = [];
  filterModel: UserDataFilter = new UserDataFilter();
  searchTerm$ = new BehaviorSubject('');
  pageIndex = 1;
  pageSize = 2;
  total = 1;
  url = environment.API_ENDPOINT_LOCAL;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.searchTerm$.pipe(debounceTime(200)).subscribe((_) => {
      this.filterModel.keyWord = this.searchTerm$.value.trim();
      this.pageIndex = 1;
      this.filterUserList();
    });
  }

  filterUserList(pageIndex?: number): void {
    this.filterModel.page = pageIndex;
    const filter = { ...this.filterModel };
    this.userService
      .listUser(filter)
      .subscribe((result) => {
        this.userList = result.items;
        this.total = result.total;
        this.pageIndex = pageIndex;
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
