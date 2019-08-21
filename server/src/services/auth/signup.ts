import { promisify } from 'util';
import { pbkdf2, randomBytes } from 'crypto';
import jwt from 'jsonwebtoken';
import 'module-alias/register';
import passport from 'passport';
import { Handler, ResponseTuple } from 'types/http';
import { config } from '@src/Config';
import User from '@src/Model/User';
import validateBody from '@src/util/validateBody';

const pbkdf2Promise = promisify(pbkdf2);

interface SignupResponse {
  token: string;
}

const test: Handler<SignupResponse> = async (config, req, res) => {
  validateBody(['name', 'email', 'password'], req.body);
  const { name, email, password } = req.body;

  await config.util.errorIfExists(User, { email: req.body.email });

  const salt = randomBytes(128).toString('base64');
  const iterations = 1000;

  const passwordBuffer = await pbkdf2Promise(password, salt, iterations, 64, 'sha512');
  const hashedPass = passwordBuffer.toString('hex');

  console.log(hashedPass);

  const user = await new User({ name, email, password }).save();

  const token = await jwt.sign({ email }, config.cryptoKey, { expiresIn: '2 days'})

  console.log({ token });
  // TODO:
  // Hash password
  // Persist user to db
  // Generate and send token

  return [200, { result: { token } }];
};

export default test;