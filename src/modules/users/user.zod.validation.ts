import { z } from 'zod';

const Taddress = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
});

const Torders = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});

const userValidation = z.object({
  userId: z.number(),
  username: z.string(),
  password: z.string().optional(),
  fullName: z.object({
    firstName: z.string(),
    lastName: z.string(),
  }),
  age: z.number(),
  email: z.string(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: Taddress,
  orders: z.array(Torders).optional(),
});

export default userValidation;
