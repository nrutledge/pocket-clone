import { prop, Typegoose } from 'typegoose';

export class UserSchema extends Typegoose {
  @prop()
  public name: { first: string; last: string };
  @prop()
  public email: {
    type: string;
    unique: true;
  };
  @prop()
  public password: string;
}

const User = new UserSchema().getModelForClass(UserSchema);

export default User;
