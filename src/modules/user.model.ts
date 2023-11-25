import { Schema, model } from 'mongoose';

import { Taddress, Torders, Tuser, userModel } from './users/user.interface';
import bcrypt from 'bcrypt';
import config from '../app/config';

const addressSchema = new Schema<Taddress>(
  {
    street: String,
    city: String,
    country: String,
  },
  { _id: false },
);

const ordersSchema = new Schema<Torders, userModel>({
  productName: String,
  price: Number,
  quantity: Number,
});

const userSchema = new Schema<Tuser>({
  userId: {
    type: Number,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: [true, 'Must add an user name'],
    unique: true,
  },
  password: String,
  fullName: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  hobbies: {
    type: [String],
    default: [],
  },
  isActive: Boolean,
  address: {
    type: addressSchema,
    required: true,
  },
  orders: [ordersSchema],
});

// for hasing passwrod and save to db
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;

  if (user.password) {
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_rounds),
    );
  }

  next();
});

userSchema.post('save', async function (doc, next) {
  doc.password = undefined;
  if (doc.orders && doc.orders.length < 1) {
    doc.orders = undefined;
  }
  next();
});

userSchema.post('findOne', function (doc, next) {
  if (doc && doc.orders && doc.orders.length < 1) {
    doc.orders = undefined;
  }
  if (doc) {
    doc.password = undefined;
  }
  next();
});

userSchema.post('findOneAndUpdate', function (doc, next) {
  if (doc && doc.orders && doc.orders.length < 1) {
    doc.orders = undefined;
  }

  next();
});
export class CustomError extends Error {
  statusCode: unknown;
  constructor(message: string | undefined, statusCode: unknown) {
    super(message);
    this.statusCode = statusCode;
  }
}

userSchema.statics.isUserExists = async function (userId: string) {
  const existingUser = await UserModel.findOne({ userId });
  return !!existingUser;
};

export const UserModel = model<Tuser, userModel>('User', userSchema);
