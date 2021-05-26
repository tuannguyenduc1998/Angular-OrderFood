export class OrderSummaryModel {
  id: string;
  orderCode: string;
  orderDate: Date;
  orderState: number;
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
  store?: {
    id: string;
    storeName: string;
    storeOwner: string;
    storeAvatar: string;
    storeState: boolean;
    createDate: Date;
    storeAddress: string;
  };
  totalPrice?: number;
}

export class OrderModel {
  orderDate: Date;
  orderState: number;
  orderCode: number;
  totalAmount: number;
  totalPrice: number;
  totalProduct: number;
  store: {
    id: string;
    storeName: string;
    storeOwner: string;
    storeAvatar: string;
    storeState: boolean;
    createDate: Date;
    storeAddress: string;
  };
}

export class UserOrderModel {
  orderDate: Date;
  orderState: number;
  orderCode: number;
  amount: number;
  price: number;
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
  product: {
    id: string;
    storeId: string;
    productName: string;
    price: number;
    isHidden: boolean;
    categoryId: string;
  };
}

export class OrderDetailModel {
  orderId: string;
  productId: string;
  amount: number;
  price: number;
  orderDetailNote: string;
}

export class AddOrderDetailModel {
  orderDetails: OrderDetailModel[];
}

export class OrderDetailSummaryModel {
  product: {
    id: string;
    storeId: string;
    productName: string;
    price: number;
    isHidden: boolean;
    categoryId: string;
  };
  amount: number;
  price: number;
  orderDetailNote: string;
}
