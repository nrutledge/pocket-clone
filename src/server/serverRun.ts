import Server from './Server';

// Start the server or run tests
// if (process.argv[2] !== 'test') {
const port: number = parseInt(process.env.PORT || '5000', 10);
const server = new Server();
server.start(port);
// } else {

// }
