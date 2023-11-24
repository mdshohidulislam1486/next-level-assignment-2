import mongoose, { Schema, model } from 'mongoose';
import validator from 'validator';
import { Taddress, Torders, Tuser } from './users/user.interface';
import { boolean } from 'zod';

const addressSchema = new Schema<Taddress>({
  street: String,
  city: String,
  country: String,
});

const ordersSchema = new Schema<Torders>({
  productName: String,
  price: Number,
  quantity: Number,
});

const userScheam = new Schema<Tuser>({
  userId: {
    type: Number,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: [true, 'Must add an user name'],
    uniqe: true,
  },
  password: String,
  fullName: {
    type: Object,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  isActive: Boolean,
  address: {
    type: addressSchema,
    required: true,
  },
  orders: {
    orders: { type: [ordersSchema], default: [] },
  },
});

export const UserModel = model<Tuser>('Student', userScheam);
