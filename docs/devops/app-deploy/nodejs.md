---
title: NodeJS 前后端项目部署
description: 在 Rainbond 上通过源代码部署 NodeJS 前端项目和后端项目。例如 Vue、React 等前端项目和 Express、Koa 等后端项目。
keywords:
- Rainbond 部署 Vue React 前端项目
- Vue React 前端项目部署
- Rainbond 部署 Express 项目
- Rainbond 部署 Koa 项目
---

import Bvideo from '/src/components/Bvideo';

<Bvideo src="//player.bilibili.com/player.html?aid=820892498&bvid=BV1334y1f76U&cid=983036584&page=4" />


本篇文档介绍如何在 Rainbond 平台上通过源代码部署 NodeJS 前端项目和后端项目。例如 Vue、React 等前端项目和 Express、Koa 等后端项目。

## 概述

在基于源码构建时，Rainbond 会识别项目根目录的 **package.json** 文件来判断为 NodeJS 项目。
1. 支持在页面上选择为 Node 前端项目或者后端项目并自动添加下述文件，并选择使用 NPM 还是 YARN 构建项目。
2. 在源代码根目录根据下述描述添加文件来确定项目类型。

Rainbond 会根据源码根目录是否有`package.json`来识别为 NodeJS 项目。根据是否存在`nodestate.json`文件来识别为 Node 前端项目。

- **package-lock.json:** 如源码根目录存在则使用 NPM 构建，不可与 yarn.lock 同时存在。
- **yarn.lock:** 如源码根目录存在则使用 YARN 构建，不可与 package-lock.json 同时存在。
- **nodestatic.json:** 如源码根目录存在则为 Node 前端项目，默认如下：
  ```json
  {
    "path": "dist"
  }
  ```
  > 指定静态文件编译后的输出目录，默认为 dist
- **web.conf:** Nginx配置文件。如源码根目录存在则使用，不存在则采用下述默认配置。
  ```conf
  server {
      listen       5000;
      
      location / {
          root   /app/www;
          try_files $uri $uri/ /index.html;
          index  index.html index.htm;
      }
  }
  ```
  > 容器内 Nginx 默认路径为 /app/nginx，静态文件默认路径为 /app/www。如 /app/nginx/nginx.conf、/app/nginx/conf.d/web.conf

### 自定义构建脚本

如需要在构建前执行安装其他依赖等操作，在 `package.json` 中添加 `scripts` 节点，如:

```json
{
  "scripts": {
    "preinstall": "apt-get update && apt -y install python3 && bash preinstall.sh",
    "build": "npm run build"
  }
}
```

在上述的 `package.json` 文件中，关键字 `preinstall` 指定了在安装依赖前所做的操作。示例中为执行代码根目录下的一个脚本文件，其内容为设置构建私服：

```bash
#!/bin/bash
yarn config set sass_binary_site https://npmmirror.com/mirrors/node-sass --global
yarn config set phantomjs_cdnurl https://npmmirror.com/mirrors/phantomjs --global
yarn config set electron_mirror https://npmmirror.com/mirrors/electron --global
yarn config set profiler_binary_host_mirror https://npmmirror.com/mirrors/node-inspector --global
yarn config set chromedriver_cdnurl https://npmmirror.com/mirrors/chromedriver --global
```

## 前端项目部署示例

* Vue Demo: https://gitee.com/zhangbigqi/vue-demo
* React Demo: https://gitee.com/zhangbigqi/react-demo

### 源码部署 Vue Or React 项目

1. 基于源码创建组件，填写以下信息：

|              | 内容                                 |
| ------------ | ------------------------------------ |
| 组件名称     | 自定义                               |
| 组件英文名称 | 自定义                               |
| 仓库地址     | `https://gitee.com/zhangbigqi/vue-demo.git` or `https://gitee.com/zhangbigqi/react-demo` |
| 代码版本     | main                    |

2. 选择为 Node 前端项目并指定使用 Npm 还是 Yarn 构建项目。
3. 在组件构建源中切换 Node 版本至 `16.15.0` 保存并构建。


## 后端项目部署示例

进入到团队下，新建应用选择**基于源码示例**进行构建，选中 NodeJS Demo 并默认全部下一步即可。
