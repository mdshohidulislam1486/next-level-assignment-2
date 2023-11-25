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
      error: {
        code: 404,
        description: 'Failed to create user',
      },
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
      message: error.message || 'No user found',
      error: {
        code: 404,
        description: 'No user found',
      },
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

const addSingleOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    let order = req.body;
    order = {
      productName: order.productName,
      price: order.price,
      quantity: order.quantity,
    };
    await userService.addSingleOrderIntoDB(userId, order);
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Could not add the order',
      error: {
        code: 404,
        description: 'Could not add the order',
      },
    });
  }
};
const getAllOrdersForSingleUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await userService.getAllOrderForUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Could not fetch orders',
      error: {
        code: 404,
        description: 'Could not fetch orders',
      },
    });
  }
};
const getTotalPriceForUserOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await userService.getTotalPriceForUserOrdersFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Could not found total price',
      error: {
        code: 404,
        description: 'Could not found total price',
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
  addSingleOrder,
  getAllOrdersForSingleUserId,
  getTotalPriceForUserOrders,
};
