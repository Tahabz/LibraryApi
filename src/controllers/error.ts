import { Response } from 'express';
import { MongoServerError } from 'mongodb';
import { Error } from 'mongoose';
// import { Error } from 'mongoose';

export const handleDuplicateKeyError = (err: MongoServerError, res: Response) => {
  const field = Object.keys(err.keyValue);
  const code = 409;
  const error = `The field ${field} already exists.`;
  res.status(code).json({ success: false, message: error, fields: field });
};

export const handleValidationError = (err: Error.ValidationError, res: Response) => {
  console.log(err.errors);
  const errors = Object.values(err.errors).map((el: Error.ValidatorError) => el.message);
  const fields = Object.values(err.errors).map((el: Error.ValidatorError) => el.path);
  const code = 400;
  if (errors.length > 1) {
    const formattedErrors = errors.join(' ');
    res.status(code).json({ success: false, message: formattedErrors, fields: fields });
  } else {
    res.status(code).json({ success: false, message: errors[0], fields: fields });
  }
};
