import { prop, Typegoose, ModelType, InstanceType } from 'typegoose';

class User extends Typegoose {
  @prop()
  name: { first: string; last: string };
  @prop()
  email: string;
  @prop()
  password: string;
}

const UserModel = new User().getModelForClass(User);

export default UserModel;
