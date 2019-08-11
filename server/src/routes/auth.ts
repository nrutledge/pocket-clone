import express from 'express';
import { runRouteHandler, ahandler } from './routesLib';
import signupHandler from '../services/auth/signup';

const authRouter = (app: express.Application) => {
  const route = runRouteHandler({ name: 'bob' });
  app.get('/', route(ahandler));

  app.post('/signup', route(signupHandler));
};

export default authRouter;
