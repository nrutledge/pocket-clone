import { promisify } from 'util';
import { pbkdf2, randomBytes } from 'crypto';
import jwt from 'jsonwebtoken';
import 'module-alias/register';
import { Handler } from 'types/http';
import User from '@src/Model/User';
import validateBody from '@src/util/validateBody';

const pbkdf2Promise = promisify(pbkdf2);

interface SignupResponse {
  token: string;
}

// TODO: Consider removing response from the handler type as it should not be necessary
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const test: Handler<SignupResponse> = async (config, req, ignored) => {
  validateBody(['name', 'email', 'password'], req.body);
  const { name, email, password } = req.body;
  await config.util.errorIfExists(User, { email: req.body.email });
  const salt = randomBytes(128).toString('base64');
  const iterations = 1000;
  const passwordBuffer = await pbkdf2Promise(password, salt, iterations, 64, 'sha512');
  const hashedPass = passwordBuffer.toString('hex');
  await new User({ name, email, password: hashedPass }).save();
  const token = await jwt.sign({ email }, config.cryptoKey, { expiresIn: '2 days' });
  return [200, { result: { token } }];
};

export default test;
