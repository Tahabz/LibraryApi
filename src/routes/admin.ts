import { Router } from 'express';
import admin from '../controllers/admin';
import { adminLogin } from '../controllers/auth';
import book from '../controllers/book';
import reservation from '../controllers/reservation';
import { adminAUth } from '../middlewares/auth';

const adminRouter = Router();

adminRouter.post('/login', adminLogin);

adminRouter.use(adminAUth);

adminRouter.post('/register', admin.createOne);

adminRouter.get('/users', (req, res) => res.end('hello world'));

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
