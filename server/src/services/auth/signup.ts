import passport from 'passport';
import { Handler, ResponseTuple } from 'types/http';
import { Config } from 'Config';
import { right } from 'fp-ts/Lib/Either';
import validateBody from 'util/validateBody';

interface SignupResponse {
  token: string;
}

const test: Handler<SignupResponse> = async (config, req, res) => {
  validateBody(['email', 'password'], req.body);

  const { email, password } = req.body;

  return [200, { result: { token: 'abc123' } }];
};

export default test;
