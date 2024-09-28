---
title: Vue React Frontend Project Deployment
description: Deploy the Vue React front-end project in Rainbond
keywords:
  - Rainbond deploy Vue React Frontend Project
  - Vue React Frontend Project Deployment
---

Import Bvideo from '/src/components/Bvideo';

<Bvideo src="//player.bilibili.com/player.html?aid=820892498&bvid=BV1334y1f76U&cid=983036584&page=4" />

## General description

When building based on the source code, Rainbond will identify the project root directory **package.json** and let you choose to use NPM or YARN to build the project.

### Project definition

#### nodestatic.json

`nodestatic.json` 文件用于定义项目为 Node 前端项目，如项目内未定义则会默认添加，文件默认内容如下：

```json
LO
  "path": "distres"
}
```

:::info
The file specifies the output directory after static file compilation. By default the output is `distressing to the project root after packing.If this is not the default `distance\` directory, it needs to be specified in the file.
:::

#### package-block.json

The `package-lock.json` file is used to define the project using NPM to build the project. The file cannot exist at the same time as `yarn.lock`.

#### yarn.lock

The `yarn.lock` file is used to define the project as building with YARN and cannot exist at the same time as `package-lock.json`.

#### web.conf

The `web.conf` file defines the Nginx configuration file and will use the default configuration if not defined. The following：

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

## Deployment Example

- Vue Demo: https://gitee.com/zhangbigqi/vue-demo
- React Demo: https://gitee.com/zhangbigqi/react-demo

### Source deploy Vue Or React project

1. Create components based on source code, fill out the following information：

|                        | Content                                                                                  |
| ---------------------- | ---------------------------------------------------------------------------------------- |
| Component name         | Custom                                                                                   |
| Component English Name | Custom                                                                                   |
| Repository Address     | `https://gitee.com/zhangbigqi/vue-demo.git` or `https://gitee.com/zhangbigqi/react-demo` |
| Code Version           | Main                                                                                     |

2. Select to use Npm or Yarn to build items for Node frontend items.
3. Switch the Node version to `16.15.0` in the component build.
