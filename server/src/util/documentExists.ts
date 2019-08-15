import 'module-alias/register';
import { Model, Document } from 'mongoose';

export default (model: Model<Document>, query: object): Promise<Boolean> => {
  return model.findOne(query).then(doc => doc ? true : false);
}