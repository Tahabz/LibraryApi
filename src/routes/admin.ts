import { Router } from 'express';
import { login } from '../controllers/auth';
import book from '../controllers/book';
import reservation from '../controllers/reservation';
import auth from '../middlewares/auth';

const adminRouter = Router();

adminRouter.post('/login', login);

adminRouter.use(auth);

adminRouter.get('/users');

adminRouter.get('/books/:id', async (req, res, next) => {
  const select = book.getOne({ _id: req.params.id });
  const exec = select();
  return await exec(req, res, next);
});
adminRouter.route('/books').post(book.createOne).get(book.getAll).delete(book.deleteOne).put(book.updateOne);

adminRouter.get('/reservations', reservation.getAll);
adminRouter.get('/reservations/:id', async (req, res, next) => {
  const select = reservation.getOne({ _id: req.params.id });
  const exec = select();
  return await exec(req, res, next);
});

export default adminRouter;
