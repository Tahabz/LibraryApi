import { Router } from 'express';
import * as dotenv from 'dotenv';
import { userLogin } from '../controllers/auth';
import sharedRouter from '../shared/router';

dotenv.config();

const userRouter = Router();

userRouter.post('/login', userLogin);

userRouter.use(sharedRouter);

export default userRouter;
