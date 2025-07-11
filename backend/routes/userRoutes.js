import express from 'express';
import { clearkWebHooks, userCredit } from '../controllers/UserController.js';
import authUser from '../middlewares/auth.js';

const userRouter = express.Router();

userRouter.post('/webhooks', clearkWebHooks);
userRouter.get('/credits', authUser, userCredit);

export default userRouter;