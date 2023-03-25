import fs from "fs";
import path from "path";
import { Express } from "express";
import {
  DecratorItem,
  ALLOW_METHODS,
  ControllerProps,
} from "../types/decorator";
import chalk from "chalk";

const isProd = process.env.NODE_ENV === "production";
const defaultPrefix = "";
let prefix = defaultPrefix;

function resetPrefix() {
  prefix = "";
}

let parseLists: Array<DecratorItem> = [];

function commonDecoraor(
  target: any,
  propertyKey: string, // 函数名叫 handle
  descriptor: PropertyDescriptor,
  path: string,
  method: ALLOW_METHODS
) {
  const { middlewares = [] } = target;
  parseLists.push({
    method,
    handle: descriptor.value,
    handlerName: propertyKey,
    middlewares,
    path,
  });
}
export function Get(path: string = "") {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    commonDecoraor(target, propertyKey, descriptor, path, ALLOW_METHODS.Get);
  };
}

export function Post(path: string = "") {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    commonDecoraor(target, propertyKey, descriptor, path, ALLOW_METHODS.Post);
  };
}
// 中间件装饰器
export function MiddleWare(middle: Function) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    if (Array.isArray(target.middlewares)) {
      target.middlewares.push(middle);
    } else {
      target.middlewares = [middle];
    }
  };
}

export function Controller(props: ControllerProps) {
  return function (constructor: Function) {
    if (typeof props === "string") {
      prefix = props;
    } else if (typeof props === "object") {
      prefix = props.prefix ?? "";
    }
  };
}

// 读取文件，解析装饰器
export async function parseRoutes(app: Express) {
  console.log(chalk.blue("=========开始路由解析========="));
  const dirList = fs.readdirSync(path.resolve(__dirname, "../module"));
  for (let i = 0; i < dirList.length; i++) {
    const dirname = dirList[i];
    const ext = isProd ? ".js" : ".ts";
    const controllerPathName = path.resolve(
      __dirname,
      `../module/${dirname}/${dirname}.controller${ext}`
    );

    // 判断该文件是否存在,如果文件不存在则给一个提示
    if (!fs.existsSync(controllerPathName)) {
      const warningPath = path.resolve(__dirname, `../module/${dirname}`);
      console.log(
        chalk.yellow(
          `[ Warn ] You may should add ${dirname}.controller${ext} file in ${warningPath}`
        )
      );
      continue;
    }

    // Controller 文件一旦引入，那么装饰器就开始工作，这时候已经拿到了所有的 method middleWare
    const controller = require(controllerPathName);

    // 解析通过装饰器拿到的数据
    while (parseLists.length) {
      const item = parseLists.pop();
      const { method, handle, handlerName, middlewares, path } = item!;
      if (!app[method]) {
        continue;
      }
      app[method](`${prefix}${path}`, ...middlewares, handle);
      console.log(
        chalk.blue(
          `Method: ${method} |  Url: ${prefix}${path} | Handler: ${controller?.default?.constructor?.name}.${handlerName}`
        )
      );
    }

    // 重置 prefix
    resetPrefix();
  }
  console.log(chalk.blue("=========路由解析结束========="));
}

// 为了方便快速的开发，必须遵守一下规则:
// 1. 装饰器从上往下的顺序必须是先 请求方法装饰器、后中间件装饰器
