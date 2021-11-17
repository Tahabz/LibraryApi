import { Document, model, Schema } from 'mongoose';

export interface IAdminObject {
  username: string;
  password: string;
}

export interface IAdmin extends Document, IAdminObject {}

const adminSchema = new Schema<IAdmin>({
  username: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
});

const adminModel = model('admin', adminSchema);
export default adminModel;
