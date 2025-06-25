import express from 'express';
import { clearkWebHooks } from '../controllers/UserController.js';

const userRouter = express.Router();

userRouter.post('/webhooks', clearkWebHooks);

export default userRouter;