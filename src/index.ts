import express from 'express';
import * as dotenv from 'dotenv';
import { connect } from './db';

dotenv.config();
const app = express();

app.get('/', (req, res) => {
  return res.end('hello world');
});

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
