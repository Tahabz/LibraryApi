import { Router } from 'express';
import { login } from '../controllers/auth';
import auth from '../middlewares/auth';

const adminRouter = Router();

adminRouter.post('/login', login);
adminRouter.use(auth);
adminRouter.get('/users');
