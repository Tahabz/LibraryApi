import { Document, model, PopulatedDoc, Schema } from 'mongoose';
import { IBook } from './Book';
import { IUser } from './User';

export interface IReservationObject {
  userId: PopulatedDoc<IUser>;
  bookId: PopulatedDoc<IBook>;
  due_back: Date;
}
export interface IReservation extends Document, IReservationObject {}

const reserversationSchema = new Schema<IReservation>({
  userId: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  bookId: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'book',
  },
  due_back: {
    required: true,
    type: Date,
  },
});

const reservationModel = model('reservation', reserversationSchema);
export default reservationModel;
