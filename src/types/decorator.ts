import { NextFunction, Request, Response } from "express";
export enum ALLOW_METHODS {
  Get = "get",
  Post = "post",
}

type MiddleWareHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export type DecratorItem = {
  method: ALLOW_METHODS;
  handle: MiddleWareHandler;
  handlerName: string;
  middlewares: Array<MiddleWareHandler>;
  path: string;
};

export type ControllerProps = { prefix?: string } | string;