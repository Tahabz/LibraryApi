import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import admin from '../services/admin';
import user from '../services/user';

dotenv.config();

export const adminAUth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token;
    if (Object.prototype.hasOwnProperty.call(req, 'cookies')) token = req.cookies['JWT'];
    if (!token) {
      token = req.headers['authorization'].split(' ')[1];
    }
    const res = jwt.verify(token, process.env.JWT_SECRET);
    const admn = await admin.getOne({ username: res?.username })()();

    if (!admn) throw new Error('not allowed');
    // req.user = admn;
    next();
  } catch (e) {
    next(e);
  }
};

export const userAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token;
    if (Object.prototype.hasOwnProperty.call(req, 'cookies')) token = req.cookies['JWT'];
    if (!token) {
      token = req.headers['authorization'].split(' ')[1];
    }
    const res = jwt.verify(token, process.env.JWT_SECRET);
    const admn = await user.getOne({ username: res?.username })()();

    if (!admn) throw new Error('not allowed');
    // req.user = admn;
    next();
  } catch (e) {
    next(e);
  }
};
