import { Router } from 'express';
import admin from '../controllers/admin';
import { adminLogin } from '../controllers/auth';
import book from '../controllers/book';
import reservation from '../controllers/reservation';
import user from '../controllers/user';
import { adminAUth } from '../middlewares/auth';

const adminRouter = Router();

adminRouter.post('/login', adminLogin);

adminRouter.post('/register', admin.createOne);

adminRouter.use(adminAUth);

adminRouter.get('/users', user.getAll);

adminRouter.get('/books/:id', async (req, res, next) => {
  const select = book.getOne({ _id: req.params.id });
  const exec = select();
  return await exec(req, res, next);
});
adminRouter
  .route('/books')
  .post(book.createOne)
  .get(async (req, res, next) => {
    if (Object.keys(req.query).length != 0) {
      const select = book.getMany({ ...req.query });
      const exec = select();
      return await exec(req, res, next);
    }
    return await book.getAll(req, res, next);
  })
  .delete(book.deleteOne)
  .put(book.updateOne);

adminRouter.get('/reservations', reservation.getAll);
adminRouter.get('/reservations/:id', async (req, res, next) => {
  const select = reservation.getOne({ _id: req.params.id });
  const exec = select();
  return await exec(req, res, next);
});

export default adminRouter;
