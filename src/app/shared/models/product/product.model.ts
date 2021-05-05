export class ProductModel {
  id: string;
  storeName: string;
  productName: string;
  price: number;
  isHidden: boolean;
  categoryName: string;
}

export class ProductSummaryModel {
  id: string;
  storeId: string;
  productName: string;
  price: number;
  isHidden: boolean;
  categoryId: string;
}
