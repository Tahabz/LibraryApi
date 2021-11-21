import { Router } from 'express';
import admin from '../controllers/admin';
import { adminLogin } from '../controllers/auth';
import book from '../controllers/book';
import reservation from '../controllers/reservation';
import user from '../controllers/user';
import { adminAUth } from '../middlewares/auth';
import sharedRouter from '../shared/router';

const adminRouter = Router();

adminRouter.post('/login', adminLogin);

adminRouter.post('/register', admin.createOne);

adminRouter.use(adminAUth);

adminRouter.use(sharedRouter);

adminRouter.get('/users', user.getAll);

adminRouter.route('/books').post(book.createOne).delete(book.deleteOne).put(book.updateOne);

adminRouter.get('/reservations', reservation.getAll);
adminRouter.get('/reservations/:id', async (req, res, next) => {
  const select = reservation.getOne({ _id: req.params.id });
  const exec = select();
  return await exec(req, res, next);
});

export default adminRouter;
