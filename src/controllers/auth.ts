import { error } from 'console';
import { NextFunction, Request, Response } from 'express';
import adminService from '../services/admin';
import userService from '../services/user';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

export const adminLogin = async (req: Request, res: Response, next: NextFunction) => {
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

export const userLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const intra_id = req.body.user_id;
    const exec = userService.getOne({ intra_id })();
    let user = await exec();
    if (!user) {
      user = await userService.createOne({ intra_id })();
    }
    res.cookie('JWT', jwt.sign({ intra_id }, process.env.JWT_SECRET));
    return res.json({ success: true, message: user });
  } catch (e) {
    next(e);
  }
};
