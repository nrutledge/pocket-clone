'use strict';
import mongoose from 'mongoose';
import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

const server = (port: number): void => {
  const app = express();
  mongoose.connect(process.env.MONGO_URL, async () => {
    console.log('MONGO CONNECTION ACHIEVED');
  });

  app.get('/', (req, res) => {
    res.send('Welcome');
  });

  app.listen(port, () => {
    // tslint:disable-next-line: no-console
    console.log(`App is listening on port ${port}.`);
  });
};

export default server;
