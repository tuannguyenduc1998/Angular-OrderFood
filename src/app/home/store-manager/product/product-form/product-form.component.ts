import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { forkJoin } from 'rxjs';
import ValidationHelper from 'src/app/shared/helpers/validation.helper';
import { AuthenticationModel } from 'src/app/shared/models/auth/authentication.model';
import { ProductSummaryModel } from 'src/app/shared/models/product/product.model';
import { StoreSummaryModel } from 'src/app/shared/models/store/store.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { StoreService } from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  @Input() id: string;
  @Input() typeForm: string;
  productForm: FormGroup;
  product: ProductSummaryModel;
  userLogin: AuthenticationModel;
  categories: any;
  store: StoreSummaryModel = new StoreSummaryModel();
  invalidMessages: string[] = [];
  formErrors = {
    store: '',
    productName: '',
    price: '',
    isHidden: '',
    category: ''
  };
  constructor(
    private productService: ProductService,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private nzNotificationService: NzNotificationService,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.userLogin = this.authenticationService.getAuthenticationModel();
    if (this.id)
    {
      forkJoin([
        this.productService.getAllCategory(),
        this.productService.getProductById(this.id),
        this.storeService.getStoreByUserId(this.userLogin.userId),
      ]).subscribe(([res1, res2, res3]) => {
        this.categories = res1;
        this.product = res2;
        this.store = res3;
        this.createForm();
      });
    }
    else{
      forkJoin([
        this.productService.getAllCategory(),
        this.storeService.getStoreByUserId(this.userLogin.userId)
      ]).subscribe(([res1, res2]) => {
        this.categories = res1;
        this.store = res2;
        this.product = this.mappingProduct();
        this.createForm();
      });
    }
  }

  createForm(): void {
    this.productForm = this.formBuilder.group({
      store: [this.store.storeName , Validators.required],
      productName: [this.product.productName, Validators.required],
      price: [this.product.price, Validators.required],
      category: [this.product.category, Validators.required]
    });
  }

  validateForm(): boolean {
    this.invalidMessages = ValidationHelper.getInvalidMessages(
      this.productForm,
      this.formErrors
    );
    return this.invalidMessages.length === 0;
  }

  mappingProduct(): ProductSummaryModel{
    return {
      id: '',
      productName: '',
      price: +'',
      isHidden: false,
      store: this.store,
      category: null
    };
  }

  mappingModel(form): any{
    if (this.id)
    {
      return {
        productId: this.id,
        productName: form.productName,
        price: form.price,
        categoryId: form.categoryId
      };
    }
    else{
      return {
        storeId: this.store.id,
        productName: form.productName,
        price: form.price,
        categoryId: form.category.id
      };
    }
  }

  onSubmit(): void{
    this.productService.createOrUpdate(this.mappingModel(this.productForm.value)).subscribe((res) =>
    {
      if (res)
      {
        this.router.navigate([`/store-manager/product/list`]);
        this.nzNotificationService.success('Thông báo', 'Thêm sản phẩm thành công!', { nzPlacement: 'bottomRight'});
      }
    });
  }

  compareData(o1, o2): boolean {
    return o1 && o2 ? o1.id.toString() === o2.id.toString() : o1 === o2;
  }
}
