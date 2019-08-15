import 'module-alias/register';
import { Model, Document } from 'mongoose';
import UserModel from '@src/Model/User';
import documentExists from '@src/util/documentExists';

export interface Config {
  models: {
    User: Model<Document>
  },
  util: {
    documentExists(model: Model<Document>, query: object): Promise<Boolean>
  }
}

export const config: Config = {
  models: {
    User: UserModel
  },
  util: {
    documentExists: documentExists
  }
};



