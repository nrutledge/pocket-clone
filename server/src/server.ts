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
    origin: 'http://example.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  };

  app.use(cors(corsOptions));
  app.use(morgan('dev'));
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ extended: false }));

  mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })
    .then(() => console.log('MONGO CONNECTION ACHIEVED'))
    .catch(console.error);

  router(app);

  app.listen(port, () => {
    // tslint:disable-next-line: no-console
    console.log(`App is listening on port ${port}.`);
  });
};

export default server;
