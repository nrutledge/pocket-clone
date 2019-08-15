import 'module-alias/register';
import express from 'express';
import { config } from '@src/Config';
import { runRouteHandler, ahandler } from './routesLib';
import signupHandler from '@src/services/auth/signup';

const authRouter = (app: express.Application) => {
  const route = runRouteHandler(config);
  app.get('/', route(ahandler));

  app.post('/signup', route(signupHandler));
};

export default authRouter;
