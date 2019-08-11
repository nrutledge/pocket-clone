import { ModelType } from 'typegoose';
import UserModel from 'Model/User';

// export interface Config { models: { User: User } }

export const config = {
  models: {
    User: UserModel
  }
};

export type Config = config;
