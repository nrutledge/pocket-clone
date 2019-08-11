import { prop, Typegoose, ModelType, InstanceType } from 'typegoose';

export class User extends Typegoose {
  @prop()
  public name: { first: string; last: string };
  @prop()
  public email: string;
  @prop()
  public password: string;
}

const UserModel = new User().getModelForClass(User);

export default UserModel;
