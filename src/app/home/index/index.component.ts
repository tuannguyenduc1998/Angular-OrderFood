import { Component, OnInit } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { StoreModel } from 'src/app/shared/models/store/store.model';
import { StoreService } from 'src/app/shared/services/store.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  public config: SwiperConfigInterface = {
    // tslint:disable-next-line:indent
    // direction: "horizontal",
    speed: 800,
    slidesPerView: 1,
    slidesPerColumn: 1,
    slidesPerGroup: 1,
    grabCursor: true,
    autoplay: {
      delay: 1500,
    },
  };

  slides: any = [
    '../../../assets/images/slide1.png',
    '../../../assets/images/slide2.png',
    '../../../assets/images/slide3.png',
    '../../../assets/images/slide5.png',
    '../../../assets/images/slide6.png',
    '../../../assets/images/slide7.png',
    '../../../assets/images/slide8.png',
  ];
  stores: StoreModel[];
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
