export class StoreModel
{
  id: string;
  storeName: string;
  storeOwner: string;
  storeAvatar: string;
  storeState: boolean;
  storeAddress: string;
}

export class StoreSummaryModel
{
  id: string;
    storeName: string;
    user: {
      id: string;
      userName: string;
      password: string;
      email: string;
      fullName: string;
      gender: 0;
      avatar: string;
      dateOfBirth: Date;
      phoneNumber: string;
      address: string;
      lockoutEnabled: boolean;
      resetToken: string;
      resetTokenExpires: Date
    };
    storeAvatar: string;
    storeState: boolean;
    createDate: Date;
    storeAddress: string;
}
