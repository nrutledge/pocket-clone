import express from 'express';
import { Either, fold } from 'fp-ts/Lib/Either';
import { pipe } from 'fp-ts/lib/pipeable'
import { tryCatch } from 'fp-ts/Lib/TaskEither';
import { identity } from 'fp-ts/Lib/function'

interface Config {name: String}

type ResponseTuple<T> = [Number, APIResponse<T>]
interface Handler<T> {
  (config: Config, req:express.Request, res: express.Response): Promise<ResponseTuple<T>> 
}
interface APIResponse<T> {
  error?: String
  result?: T
}

const ahandler:Handler<null> = () => new Promise(resolve => {
  console.log('hullo!')
  return resolve([200, {}])
})

const getHandlerResult = 
  <T>(handler: Handler<T>, 
    config: Config, 
    req:express.Request, 
    res: express.Response)=> 
    tryCatch<ResponseTuple<T>, ResponseTuple<T>>(
  ()=>handler(config, req, res),
  (err: Error) => {
    return [500, {error: err.message}]
  }
) 

const eitherToResponseTuple = <T>(either: Either<ResponseTuple<T>, ResponseTuple<T>>)=> 
pipe(
  either,
  fold(identity, identity)
)

const sendTupleResponse = <T>(res: express.Response) => ([n, a]: [number, T]) => res.status(n).send(a)

const runRouteHandler =
(config: Config) => 
  <T>(handler: Handler<T>) =>
  (req: express.Request, res: express.Response) => {
    getHandlerResult(handler, config, req, res)()
      .then(eitherToResponseTuple)
      .then(sendTupleResponse(res))
};

const authRouter = (app: express.Application) => {
  const route = runRouteHandler({name: 'bob'})
  app.get('/', route(ahandler));

  app.post('/signup', (req, res) => {
    res.send('You are NOT signed up');
  });
};

export default authRouter;