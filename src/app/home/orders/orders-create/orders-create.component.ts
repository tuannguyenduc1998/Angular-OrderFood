import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { OrderDetailSummaryModel, OrderSummaryModel } from 'src/app/shared/models/order/order.model';
import { ProductSummaryModel } from 'src/app/shared/models/product/product.model';
import { OrderService } from 'src/app/shared/services/order.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-orders-create',
  templateUrl: './orders-create.component.html',
  styleUrls: ['./orders-create.component.scss'],
})
export class OrdersCreateComponent implements OnInit {
  id: string;
  order: OrderSummaryModel;
  products: ProductSummaryModel[];
  orderDetails: OrderDetailSummaryModel[];
  productAmount: number;
  constructor(
    private productService: ProductService,
    private router: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.id = this.router.snapshot.paramMap.get('id');
    forkJoin([
      this.orderService.getOrdersById(this.id),
      this.orderService.getOrderDetailsByOrderId(this.id),
    ]).subscribe(([res1, res2]) => {
      this.order = res1;
      this.orderDetails = res2;
      this.productService
        .getProductByStoreId(this.order.store.id)
        .subscribe((result) => {
          this.products = result;
        });
    });
  }

  checkExsitProduct(productId): number{
    let s = 0;
    for (const x of [...this.orderDetails])
    {
      if (x.product.id === productId){
        s += x.amount;
      }
    }
    return s;
  }
}
