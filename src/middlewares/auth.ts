import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';

dotenv.config();

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    let token = req.cookies['JWT'];
    if (!token) {
      token = req.headers['authorization'].split(' ')[1];
    }
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (e) {
    next(e);
  }
};
