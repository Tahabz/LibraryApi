import { Router } from 'express';
import * as dotenv from 'dotenv';
import { userLogin } from '../controllers/auth';
import sharedRouter from '../shared/router';
import { userAuth } from '../middlewares/auth';
import reservation from '../controllers/reservation';

dotenv.config();

const userRouter = Router();

userRouter.post('/login', userLogin);

userRouter.use(userAuth);

userRouter.use(sharedRouter);

userRouter.route('/reservations').post(reservation.createOne).delete(reservation.deleteOne);

export default userRouter;
