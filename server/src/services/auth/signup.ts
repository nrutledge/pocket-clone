import 'module-alias/register';
import passport from 'passport';
import { Handler, ResponseTuple } from 'types/http';
import { config } from '@src/Config';
import User from '@src/Model/User';
import validateBody from '@src/util/validateBody';

interface SignupResponse {
  token: string;
}

const test: Handler<SignupResponse> = async (config, req, res) => {
  validateBody(['email', 'password'], req.body);
  const { email, password } = req.body;

  if (await config.util.documentExists(User, { email: req.body.email })) {
    throw new Error('Email already exists');
  }

  new User({ email, password }).save();

  // TODO:
  // Hash password
  // Persist user to db
  // Generate and send token

  return [200, { result: { token: 'abc123' } }];
};

export default test;