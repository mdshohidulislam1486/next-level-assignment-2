import { Request, Response } from 'express';
import userValidation from './user.zod.validation';
import { userService } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const { userData } = req.body;

    const zodParseData = userValidation.parse(userData);
    const result = await userService.createUserIntoDb(zodParseData);
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create user',
      data: error.message,
    });
  }
};
const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUserFromDB();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'No user Found',
      data: error.message,
    });
  }
};
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userService.getSingleUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'No user Found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};
const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { userData } = req.body;
    const zodParseData = userValidation.parse(userData);
    const result = await userService.updateSingleUserIntoDB(
      userId,
      zodParseData,
    );
    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'User not updated',
      error: {
        code: 404,
        description: 'User not updated',
      },
    });
  }
};
const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    await userService.deleteSingleUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'User not deleted',
      error: {
        code: 404,
        description: 'Could not delete user',
      },
    });
  }
};

export const userControllers = {
  createUser,
  getAllUser,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
};
