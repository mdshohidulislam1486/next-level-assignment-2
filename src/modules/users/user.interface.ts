import { Model } from 'mongoose';

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
  password?: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: Taddress;
  orders?: Torders[];
};

export interface userModel extends Model<Tuser> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: string): Promise<Tuser | null>;
}
