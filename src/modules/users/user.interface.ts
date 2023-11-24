export type Taddress = {
  street: string;
  city: string;
  country: string;
};
export type Torders = {
  productName: string;
  price: number;
  quantity: number;
};
export type Tuser = {
  userId: number;
  username: string;
  password: string;
  fullName: {
    fullName: string;
    lastName: string;
  };
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: Taddress;
  orders: Torders[];
};
