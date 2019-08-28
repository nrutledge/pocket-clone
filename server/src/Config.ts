import 'module-alias/register';
import { Model, Document } from 'mongoose';
import UserModel from '@src/Model/User';
import errorIfExists from '@src/util/errorIfExists';

export interface Config {
  models: {
    User: Model<Document>;
  };
  util: {
    errorIfExists(model: Model<Document>, query: object): Promise<boolean>;
  };
  cryptoKey: string;
}

export const config: Config = {
  models: {
    User: UserModel
  },
  util: {
    errorIfExists
  },
  cryptoKey: process.env.CRYPTO_KEY || 'a2k3nr23iuhr32iub2jkbf23iu12io'
};
