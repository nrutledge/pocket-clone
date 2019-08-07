import express from 'express';
import authRouter from './auth';

const router = (app: express.Application) => {
  authRouter(app);
};

export default router;