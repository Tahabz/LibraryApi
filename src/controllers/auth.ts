import { error } from 'console';
import { NextFunction, Request, Response } from 'express';
import adminService from '../services/admin';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const select = adminService.getOne({ username: username });
    const exec = select('username password');
    const admin = await exec();
    if (admin) {
      if (admin.password != password) throw new error('invalid credentials');
    } else throw new Error('invalid credentials');
    res.cookie('JWT', jwt.sign({ username, password }, process.env.JWT_SECRET));
    return res.json({ success: true, message: 'Welcome!' });
  } catch (e) {
    next(e);
  }
};
