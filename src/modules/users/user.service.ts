import { CustomError, UserModel } from '../user.model';
import { Torders, Tuser } from './user.interface';

const createUserIntoDb = async (userData: Tuser) => {
  const result = await UserModel.create(userData);
  return result;
};

const getAllUserFromDB = async () => {
  const result = await UserModel.find(
    {},
    'username fullName age email address -_id',
  );
  return result;
};
const getSingleUserFromDB = async (userId: string) => {
  const userExists = await UserModel.isUserExists(userId);
  if (!userExists) {
    throw new CustomError('User not found', 404);
  }
  const result = await UserModel.findOne({ userId });
  return result;
};
const updateSingleUserIntoDB = async (userId: string, userData: Tuser) => {
  const userExists = await UserModel.isUserExists(userId);
  if (!userExists) {
    throw new CustomError('User not found', 404);
  }
  const updatedUser = await UserModel.findOneAndUpdate(
    { userId: Number(userId) },
    userData,
    { new: true },
  ).select('-password -_id');

  return updatedUser;
};
const deleteSingleUserFromDB = async (userId: string) => {
  const userExists = await UserModel.isUserExists(userId);
  if (!userExists) {
    throw new CustomError('User not found', 404);
  }
  const result = await UserModel.deleteOne({ userId });
  return result;
};
const addSingleOrderIntoDB = async (userId: string, order: Torders) => {
  const userExists = await UserModel.isUserExists(userId);
  if (!userExists) {
    throw new CustomError('No user found', 404);
  }
  const updateOrder = await UserModel.findOneAndUpdate(
    { userId: Number(userId) },
    {
      $push: {
        orders: order,
      },
    },
    { new: true },
  ).select('-password');

  return updateOrder;
};
const getAllOrderForUserFromDB = async (userId: string) => {
  const userExists = await UserModel.isUserExists(userId);
  if (!userExists) {
    throw new CustomError('No user found', 404);
  }

  const result = await UserModel.findOne(
    { userId: Number(userId) },
    'orders -_id',
  );
  return result;
};
const getTotalPriceForUserOrdersFromDB = async (userId: string) => {
  const userExists = await UserModel.isUserExists(userId);
  if (!userExists) {
    throw new CustomError('No user found', 404);
  }

  const result = await UserModel.aggregate([
    { $match: { userId: Number(userId) } },
    {
      $unwind: '$orders',
    },
    {
      $group: {
        _id: '',
        totalPrice: {
          $sum: { $multiply: ['$orders.price', '$orders.quantity'] },
        },
      },
    },
    {
      $project: {
        _id: 0,
        totalPrice: 1,
      },
    },
  ]);

  return result[0];
};
export const userService = {
  createUserIntoDb,
  getAllUserFromDB,
  getSingleUserFromDB,
  updateSingleUserIntoDB,
  deleteSingleUserFromDB,
  addSingleOrderIntoDB,
  getAllOrderForUserFromDB,
  getTotalPriceForUserOrdersFromDB,
};
