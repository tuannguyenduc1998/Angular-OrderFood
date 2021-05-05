import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {

  @ViewChild('form') form: ProductFormComponent;
  typeForm: string;
  constructor() { }

  ngOnInit(): void {
    this.typeForm = 'create';
  }

}
