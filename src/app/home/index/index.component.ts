import { Component, OnInit } from '@angular/core';
import { StoreModel, StoreSummaryModel } from 'src/app/shared/models/store/store.model';
import { StoreService } from 'src/app/shared/services/store.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  stores: StoreSummaryModel[];
  url = environment.API_ENDPOINT_LOCAL;
  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.storeService.getAllStore().subscribe((res) => {
      this.stores = res;
    });
  }

  truncateChar(text: string, charlimit): string {
    if (!text || text.length <= charlimit) {
      return text;
    }
    const withouthtml = text.replace(/<(?:.|\n)*?>/gm, '');
    const shortened = withouthtml.substring(0, charlimit) + '...';
    return shortened;
  }
}
