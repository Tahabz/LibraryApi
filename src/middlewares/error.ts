import { NextFunction, Request, Response } from 'express';
import { MongoServerError } from 'mongodb';
import { Error } from 'mongoose';
import { handleDuplicateKeyError, handleValidationError } from '../controllers/error';

export default (err: Error, req: Request, res: Response, next: NextFunction) => {
  try {
    if (err instanceof MongoServerError) {
      if (err.code && err.code == 11000) {
        return handleDuplicateKeyError(err, res);
      }
    }
    if (err instanceof Error.ValidationError) {
      return handleValidationError(err, res);
    }
    return res.status(404).send({ success: false, message: err.message });
  } catch (err) {
    return res.status(500).send({ success: false, message: err.message });
  }
};
