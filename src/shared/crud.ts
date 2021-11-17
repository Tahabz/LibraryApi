import { AnyKeys, AnyObject, Document, FilterQuery, Model, PopulateOptions, QueryOptions, UpdateQuery } from 'mongoose';

const getOne =
  <T extends Document>(model: Model<T>) =>
  (filter: FilterQuery<T>) =>
  (arg?: object | string | Array<string>) =>
  async () =>
    await model.findOne(filter).select(arg).lean().exec();

const getMany =
  <T extends Document>(model: Model<T>) =>
  (filter: FilterQuery<T>) =>
  (arg?: object | string | Array<string>) =>
  async () =>
    await model.find(filter).select(arg).lean().exec();

const getOneAndPopulate =
  <T extends Document>(model: Model<T>) =>
  (filter: FilterQuery<T>) =>
  (populateOptions: PopulateOptions) =>
  (arg?: object | string | Array<string>) =>
  async () =>
    await model.findOne(filter).select(arg).lean().populate(populateOptions).exec();

const getAll =
  <T extends Document>(model: Model<T>) =>
  async () =>
    await model.find({}).lean().exec();

const createOne =
  <T extends Document>(model: Model<T>) =>
  (data: AnyObject | AnyKeys<T>) =>
  async () =>
    await model.create(data);

const updateOne =
  <T extends Document>(model: Model<T>) =>
  (filter: FilterQuery<T>) =>
  (data: UpdateQuery<T>) =>
  (options: QueryOptions = {}) =>
  async () =>
    await model.findOneAndUpdate(filter, data, options).lean().exec();

const deleteOne =
  <T extends Document>(model: Model<T>) =>
  (filter: FilterQuery<T>) =>
  async () =>
    await model.findOneAndDelete(filter).lean().exec();

export default <T extends Document>(model: Model<T>) => ({
  getOne: getOne(model),
  getMany: getMany(model),
  getOneAndPopulate: getOneAndPopulate(model),
  getAll: getAll(model),
  createOne: createOne(model),
  updateOne: updateOne(model),
  deleteOne: deleteOne(model),
});
