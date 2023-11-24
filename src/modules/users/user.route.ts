import express from 'express';
import { userControllers } from './user.controller';

const router = express.Router();

router
  .post('/users', userControllers.createUser)
  .get('/users', userControllers.getAllUser)
  .get('/users/:userId', userControllers.getSingleUser)
  .put('/users/:userId', userControllers.updateSingleUser)
  .delete('/users/:userId', userControllers.deleteSingleUser);

export const userRoutes = router;
