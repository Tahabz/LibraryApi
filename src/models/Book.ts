import { Document, model, Schema } from 'mongoose';

export interface IBookObject {
  title: string;
  description?: string;
  author: string;
  genre: string;
  status: 'available' | 'unavailable';
}

export interface IBook extends Document, IBookObject {}

const bookSchema = new Schema<IBook>({
  title: {
    type: String,
    required: true,
  },
  description: String,
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: 'available',
    enum: ['available', 'unavailable'],
  },
});

const bookModel = model('book', bookSchema);
export default bookModel;
