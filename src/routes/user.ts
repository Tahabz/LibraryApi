import { Router } from 'express';
import * as dotenv from 'dotenv';
import { userLogin } from '../controllers/auth';
import book from '../controllers/book';

dotenv.config();

const userRouter = Router();

userRouter.post('/login', userLogin);

userRouter.get('/books/:id', async (req, res, next) => {
  const select = book.getOne({ _id: req.params.id });
  const exec = select();
  return await exec(req, res, next);
});

userRouter.get('/books', async (req, res, next) => {
  if (Object.keys(req.query).length != 0) {
    const select = book.getMany({ ...req.query });
    const exec = select();
    return await exec(req, res, next);
  }
  return await book.getAll(req, res, next);
});

export default userRouter;
