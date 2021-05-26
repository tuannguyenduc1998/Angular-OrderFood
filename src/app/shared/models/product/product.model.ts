export class ProductModel {
  id: string;
  storeId: string;
  productName: string;
  price: number;
  isHidden: boolean;
  categoryId: string;
}

export class ProductSummaryModel {
  id: string;
  productName: string;
  price: number;
  isHidden: boolean;
  category: {
    id: string;
    categoryName: string;
  };
  store: {
    id: string;
    storeName: string;
    user: {
      id: string;
      userName: string;
      password: string;
      email: string;
      fullName: string;
      gender: number;
      avatar: string;
      dateOfBirth: Date;
      phoneNumber: string;
      address: string;
      lockoutEnabled: boolean;
      resetToken: string;
      resetTokenExpires: Date;
    };
    storeAvatar: string;
    storeState: boolean;
    createDate: Date;
    storeAddress: string;
  };
}
