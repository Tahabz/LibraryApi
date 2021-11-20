import express from 'express';
import * as dotenv from 'dotenv';
import { connect } from './db';
import adminRouter from './routes/admin';
import error from './middlewares/error';

dotenv.config();
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  return res.end('hello world');
});

app.use('/admin', adminRouter);

app.use(error);
const start = async () => {
  try {
    await connect();
    app.listen(process.env.PORT, () => {
      console.log(`Server up and running on port ${process.env.PORT} !`);
    });
  } catch (e) {
    console.error(e);
  }
};

start();
