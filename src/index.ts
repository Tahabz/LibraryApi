import express from 'express';
import * as dotenv from 'dotenv';

dotenv.config();
const app = express();

app.get('/', (req, res) => {
  return res.end('hello world');
});

app.listen(process.env.PORT, () => {
  console.log('server up and running at port ' + process.env.PORT);
});
