import server from './server';

const port: number = parseInt(process.env.PORT || '5000', 10);
server(port);
