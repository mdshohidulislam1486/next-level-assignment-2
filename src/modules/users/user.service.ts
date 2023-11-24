import { CustomError, UserModel } from '../user.model';
import { Tuser } from './user.interface';

const createUserIntoDb = async (userData: Tuser) => {
  const result = await UserModel.create(userData);
  return result;
};

const getAllUserFromDB = async () => {
  const result = await UserModel.find(
    {},
    'username fullName age email address',
  );
  return result;
};
const getSingleUserFromDB = async (userId: string) => {
  const userExists = await UserModel.isUserExists(userId);
  if (!userExists) {
    throw new CustomError('User not found', 404);
  }
  const result = await UserModel.aggregate([
    { $match: { userId: Number(userId) } },
    {
      $project: {
        _id: 0,
        password: 0,
      },
    },
  ]);
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
  if (!updatedUser) {
    throw new CustomError('Failed to update user', 500);
  }
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
export const userService = {
  createUserIntoDb,
  getAllUserFromDB,
  getSingleUserFromDB,
  updateSingleUserIntoDB,
  deleteSingleUserFromDB,
};
