---
title: NodeJS Frontend and Backend Project Deployment
description: Deploy NodeJS frontend and backend projects on Rainbond via source code.For example, frontend projects like Vue, React and backend projects like Express, Koa.
keywords:
  - Rainbond deploys Vue React frontend projects
  - Vue React frontend project deployment
  - Rainbond deploys Express project
  - Rainbond deploys Koa project
---

This document introduces how to deploy NodeJS frontend and backend projects on the Rainbond platform via source code.For example, frontend projects like Vue, React and backend projects like Express, Koa.

## Overview

When building based on source code, Rainbond identifies the **package.json** file in the project root directory to determine it as a NodeJS project.

1. Supports selecting on the page as a Node frontend or backend project and automatically adding the following files, and choosing to use NPM or YARN to build the project.
2. Add files in the source code root directory according to the following description to determine the project type.

Rainbond identifies it as a NodeJS project based on whether there is a `package.json` in the source code root directory.Identifies as a Node frontend project based on the existence of the `nodestate.json` file.

- **package-lock.json:** If it exists in the source code root directory, use NPM to build, and it cannot coexist with yarn.lock.
- **yarn.lock:** If it exists in the source code root directory, use YARN to build, and it cannot coexist with package-lock.json.
- **nodestatic.json:** If it exists in the source code root directory, it is a Node frontend project, default as follows:

```json
    {
      "path": "dist"
    }
```

> Specify the output directory of static files after compilation, default is dist
- **web.conf:** Nginx configuration file.If it exists in the source code root directory, use it; otherwise, use the following default configuration.

```bash
server {
    listen       5000;
    \
        location / {
            root   /app/www;
            try_files $uri $uri/ /index.html;
            index  index.html index.htm;
        }
    }
```
  > The default path for Nginx in the container is /app/nginx, and the default path for static files is /app/www.Such as /app/nginx/nginx.conf, /app/nginx/conf.d/web.conf

### Custom build script

If you need to perform operations such as installing other dependencies before building, add a `scripts` node in `package.json`, for example:

```json
{
  "scripts": {
    "preinstall": "apt-get update && apt -y install python3 && bash preinstall.sh",
    "build": "npm run build"
  }
}
```

In the above `package.json` file, the keyword `preinstall` specifies the operations to be performed before installing dependencies.In the example, it is to execute a script file in the code root directory, the content of which is to set up a build private server:

```bash
#!/bin/bash
yarn config set sass_binary_site https://npmmirror.com/mirrors/node-sass --global
yarn config set phantomjs_cdnurl https://npmmirror.com/mirrors/phantomjs --global
yarn config set electron_mirror https://npmmirror.com/mirrors/electron --global
yarn config set profiler_binary_host_mirror https://npmmirror.com/mirrors/node-inspector --global
yarn config set chromedriver_cdnurl https://npmmirror.com/mirrors/chromedriver --global
```

## Frontend project deployment example

- Vue Demo: https://gitee.com/zhangbigqi/vue-demo
- React Demo: https://gitee.com/zhangbigqi/react-demo

### Source code deployment Vue Or React project

1. Create a component based on source code, fill in the following information:

|                        | Content                                                                                  |
| ---------------------- | ---------------------------------------------------------------------------------------- |
| Component name         | Custom                                                                                   |
| Component English name | Custom                                                                                   |
| Repository address     | `https://gitee.com/zhangbigqi/vue-demo.git` or `https://gitee.com/zhangbigqi/react-demo` |
| Code version           | main                                                                                     |

2. Select as a Node frontend project and specify whether to use Npm or Yarn to build the project.
3. Switch the Node version to `16.15.0` in the component build source, save and build.

## Backend project deployment example

Enter the team, create a new application, select **Based on source code example** to build, select NodeJS Demo and default all the next steps.
