import express from 'express';
import { Config } from 'Config';

export type ResponseTuple<T> = [number, APIResponse<T>];

export interface Handler<T> {
  (config: Config, req: express.Request, res: express.Response): Promise<ResponseTuple<T>>;
}

export interface APIResponse<T> {
  error?: string;
  result?: T;
}
