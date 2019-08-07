'use strict';
import mongoose from 'mongoose';
import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

import router from './routes';

const server = (port: number): void => {
  const app = express();
  mongoose.connect(process.env.MONGO_URL, async () => {
    console.log('MONGO CONNECTION ACHIEVED');
  });

  router(app);

  app.listen(port, () => {
    // tslint:disable-next-line: no-console
    console.log(`App is listening on port ${port}.`);
  });
};

export default server;
