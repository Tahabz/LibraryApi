import { Document, model, Schema } from 'mongoose';

export interface IUserObject {
  intra_id: number;
}

export interface IUser extends Document, IUserObject {}

const userSchema = new Schema<IUser>({
  intra_id: {
    required: true,
    unique: true,
    type: Number,
  },
});

const userModel = model('user', userSchema);
export default userModel;
