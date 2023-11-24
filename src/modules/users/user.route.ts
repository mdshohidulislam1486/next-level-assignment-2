import express from 'express';
import { userControllers } from './user.controller';

const router = express.Router();

router
  .post('/users', userControllers.createUser)
  .get('/users', userControllers.getAllUser)
  .get('/users/:userId', userControllers.getSingleUser)
  .put('/users/:userId', userControllers.updateSingleUser)
  .delete('/users/:userId', userControllers.deleteSingleUser)
  .put('/users/:userId/orders', userControllers.addSingleOrder)
  .get('/users/:userId/orders', userControllers.getAllOrdersForSingleUserId);

export const userRoutes = router;
