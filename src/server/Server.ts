'use strict';

import express from 'express';

const server = (port: number): void => {
  const app = express();
  app.get('/', (req, res) => {
    res.send('Welcome');
  });

  app.listen(port, () => {
    // tslint:disable-next-line: no-console
    console.log(`App is listening on port ${port}.`)
  });
}

export default server;