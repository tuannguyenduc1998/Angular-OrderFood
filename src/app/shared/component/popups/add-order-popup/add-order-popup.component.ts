import { Component, Input, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { forkJoin } from 'rxjs';
import {
  OrderDetailModel,
  OrderDetailSummaryModel,
  OrderSummaryModel,
} from 'src/app/shared/models/order/order.model';
import { ProductSummaryModel } from 'src/app/shared/models/product/product.model';
import { StoreSummaryModel } from 'src/app/shared/models/store/store.model';
import { OrderService } from 'src/app/shared/services/order.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-add-order-popup',
  templateUrl: './add-order-popup.component.html',
  styleUrls: ['./add-order-popup.component.scss'],
})
export class AddOrderPopupComponent implements OnInit {
  @Input() order: OrderSummaryModel;
  @Input() orderDetails: OrderDetailSummaryModel[];
  orderDetail: OrderDetailSummaryModel;
  products: ProductSummaryModel[];
  productDetail = [];
  productAmount = 0;
  listProduct = [];
  arrProduct: any[] = [];
  constructor(
    private productService: ProductService,
    private modal: NzModalRef,
    private orderService: OrderService,
    private nzNotificationService: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.productService
      .getProductByStoreId(this.order.store.id)
      .subscribe((result) => {
        this.orderDetails.forEach((x) => this.productDetail.push(x.product.id));
        this.products = result.filter(
          (x) => this.productDetail.includes(x.id) === false
        );
        this.products.map((item) => {
          this.listProduct.push({ product: item, amount: 0 });
        });
      });
  }

  decreaseAmount(item, i): void {
    if (this.listProduct[i].amount > 0) {
      this.listProduct[i].amount = this.listProduct[i].amount - 1;
      const indexarr = this.arrProduct.findIndex((product) => {
        return product.product.id === item.product.id;
      });
      if (this.listProduct[i].amount === 0) {
        this.arrProduct.splice(indexarr, 1);
      } else {
        this.arrProduct[indexarr] = { ...this.listProduct[i] };
      }
    }
  }

  increaseAmount(item, i): void {
    this.listProduct[i].amount = this.listProduct[i].amount + 1;
    if (this.arrProduct.length > 0) {
      const indexarr = this.arrProduct.findIndex((product) => {
        return product.product.id === item.product.id;
      });
      if (indexarr !== -1) {
        this.arrProduct.splice(indexarr, 1);
        this.arrProduct.push({ ...this.listProduct[i] });
      } else {
        this.arrProduct.push({ ...this.listProduct[i] });
      }
    } else {
      // mảng rỗng
      this.arrProduct.push({ ...this.listProduct[i] });
    }
  }

  onAdd(): void {
    if (this.arrProduct.length > 0)
    {
      // tslint:disable-next-line:prefer-const
      let orderForm: OrderDetailModel[] = [];
      for (const x of [...this.arrProduct]) {
        const orderDetail: OrderDetailModel = {
          orderId: this.order.id,
          productId: x.product.id,
          amount: x.amount,
          price: x.product.price * x.amount,
          orderDetailNote: ''
        };
        orderForm.push(orderDetail);
      }
      this.orderService.addOrderDetails(orderForm).subscribe((res) => {
        if (res){
          this.nzNotificationService.success('Thông báo', 'Thêm sản phẩm vào đơn hàng thành công!');
          this.modal.destroy({isSuccess: true});
        }
        else {
          this.nzNotificationService.error('Thông báo', 'Có lỗi xảy. Vui lòng kiểm tra lại!');
        }
      });
    }
  }

  actionCancel(): void {
    this.modal.destroy();
  }
}
