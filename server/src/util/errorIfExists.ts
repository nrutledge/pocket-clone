import 'module-alias/register';
import { Model, Document } from 'mongoose';

export default async (model: Model<Document>, query: object): Promise<null> => {
  const doc = await model.findOne(query);
  const modelName = model.modelName.replace('Schema', '');

  if (doc) throw new Error(`${modelName} already exists.`);

  return null;
};
