# 本地开发

1. 依赖安装

```bash
npm install
npm install ts-node nodemon -D
```

or

```bash
yarn
```

2. 开发调试

```bash
npm run dev  / yarn dev
```

# 构建

```bash
npm run build / yarn build
```

构建后调试

`npm run compile:start`

# 注意事项

本项目为了简化开发流程，使用自动化路由(类似于 Nest 的依赖注入，但原理完全不一样)，所以必须遵守一定的规则:

1. 想要创建一个模块的路由，需要在 `src/moudle` 下新建一个目录，比如 `home`,在 `home` 目录下新建 `home.controller.ts`, 注意: 一定是 `[目录名].controller.ts`
2. 使用 Get 和 Post 装饰器时，参数为 path，使用 Controller 装饰器时，参数为 prefix
   > 路由

```ts
import { Controller, Get } from "../../decorator/automatic-routing";

@Controller("/post")
export class PostsController {
  @Get("/update")
  handlePostUpdate(req: any, res: any) {
    res.send("Post");
  }
}
const postsController = new PostsController();

export default postsController;
```

在这个例子中访问 /post/update 则会使用 `handlePostUpdate` 来进行处理，`handlePostUpdate` 的名字不做要求。

> 中间件
> 中间件的使用方法和平时完全一样，在使用 `MiddleWare` 装饰器的时候，中间件的执行顺序是从下网上的，并且必须卸载 Get Post 装饰器下面

```ts
import { Controller, Get, MiddleWare } from "../../decorator/automatic-routing";

function middleware1(req, res, next) {
  next();
}
function middleware2(req, res, next) {
  next();
}

@Controller("/post")
export class PostsController {
  @Get("/update")
  @MiddleWare(middleware2)
  @MiddleWare(middleware1)
  handlePostUpdate(req: any, res: any) {
    res.send("Post");
  }
}
const postsController = new PostsController();

export default postsController;
```

以上例子，当访问/post/update 时，会一次经过 middleware1,middleware2,handlePostUpdate

> 本地调试
为了更好的console效果，请在 xxx.controller.ts 文件中导出该 controller 的实例~