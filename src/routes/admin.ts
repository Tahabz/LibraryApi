import { Router } from 'express';
import { login } from '../controllers/auth';
import book from '../controllers/book';
import auth from '../middlewares/auth';

const adminRouter = Router();

adminRouter.post('/login', login);
adminRouter.use(auth);
adminRouter.get('/users');
adminRouter.get('/books', book.getAll);
adminRouter.get('/books/:id', async (req, res, next) => {
  const select = book.getOne({ _id: req.params.id });
  const exec = select();
  return await exec(req, res, next);
});
