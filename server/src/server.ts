'use strict';
import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

import * as dotenv from 'dotenv';
dotenv.config();

import router from './routes';

const server = (port: number): void => {
  const app = express();

  const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  };

  app.use(cors(corsOptions));
  app.use(morgan('dev'));
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ extended: false }));

  mongoose
    .connect(process.env.MONGO_URL, { useNewUrlParser: true })
    // eslint-disable-next-line no-console
    .then(() => console.log('MONGO CONNECTION ACHIEVED'))
    // eslint-disable-next-line no-console
    .catch(console.error);

  router(app);

  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`App is listening on port ${port}.`);
  });
};

export default server;
