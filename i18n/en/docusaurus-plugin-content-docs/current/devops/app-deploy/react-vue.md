---
title: Vue React 前端项目部署
description: Deploy the Vue React front-end project in Rainbond
keywords:
  - Rainbond 部署 Vue React 前端项目
  - Vue React 前端项目部署
---

import Bvideo from '/src/components/Bvideo';

<Bvideo src="//player.bilibili.com/player.html?aid=820892498&bvid=BV1334y1f76U&cid=983036584&page=4" />

## 概述

在基于源码构建时，Rainbond 会识别项目根目录的 **package.json** 让你选择为 Node 前端项目，并选择使用 NPM 还是 YARN 构建项目。

### 项目定义

#### nodestatic.json

`nodestatic.json` 文件用于定义项目为 Node 前端项目，如项目内未定义则会默认添加，文件默认内容如下：

```json
{
  "path": "dist"
}
```

:::info
该文件指定静态文件编译后的输出目录，默认是打包后输出到项目根目录 `dist`。如不是默认 `dist` 目录，需要在该文件中指定。
:::

#### package-lock.json

`package-lock.json` 文件用于定义该项目使用 NPM 进行构建项目，该文件不可与 `yarn.lock` 同时存在。

#### yarn.lock

`yarn.lock` 文件用于定义该项目使用 YARN 进行构建项目，该文件不可与 `package-lock.json` 同时存在。

#### web.conf

`web.conf` 文件用于定义 Nginx 配置文件，如不定义则会使用默认配置，如下：

```bash
server {
    listen       5000;
    
    location / {
        root   /app/www;
        try_files $uri $uri/ /index.html;
        index  index.html index.htm;
    }
}
```

## 部署示例

- Vue Demo: https://gitee.com/zhangbigqi/vue-demo
- React Demo: https://gitee.com/zhangbigqi/react-demo

### 源码部署 Vue Or React 项目

1. 基于源码创建组件，填写以下信息：

|        | 内容                                                                                       |
| ------ | ---------------------------------------------------------------------------------------- |
| 组件名称   | 自定义                                                                                      |
| 组件英文名称 | 自定义                                                                                      |
| 仓库地址   | `https://gitee.com/zhangbigqi/vue-demo.git` or `https://gitee.com/zhangbigqi/react-demo` |
| 代码版本   | main                                                                                     |

2. 选择为 Node 前端项目并指定使用 Npm 还是 Yarn 构建项目。
3. 在组件构建源中切换 Node 版本至 `16.15.0` 保存并构建。
