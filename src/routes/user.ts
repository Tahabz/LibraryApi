import { Router } from 'express';
import * as dotenv from 'dotenv';
import { userLogin } from '../controllers/auth';

dotenv.config();

const userRouter = Router();

userRouter.post('/login', userLogin);
export default userRouter;
