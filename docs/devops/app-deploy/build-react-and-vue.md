---
title: Vue React 前端项目部署
description: 在 Rainbond 中部署 Vue React 前端项目
keywords:
- Rainbond 部署 Vue React 前端项目
- Vue React 前端项目部署
---

## 前言

以往我们在部署 **Vue React** 前端项目有几种方法：

* 项目打包好之后生成 Dist目录，将其放入 Nginx 中，并进行相应的访问配置。
* 将项目打包好放入 Tomcat 中。
* 将项目打包好的 dist 目录中的 static 和 index.html 文件放入 Springboot 项目的 resources 目录下
* 直接运行一个前端 Server，类似本地开发那种。

在 Rainbond 中部署 **Vue React** 项目同样使用了第一种方法，根据源码自动 `npm run build`，打包完成后自动把静态文件放入 Nginx 中。

### Rainbond 对 Vue React 前端项目的规范

在Rainbond中部署 **Vue React** 项目有以下三点规范：

1. Rainbond 会根据源代码根目录是否有 `nodestatic.json` 和 `package.json` 文件，文件来识别为 **Vue React**前端类项目。

2. 源代码根目录下必须存在以下两个文件之一 **【不可以同时存在】**

   - `package-lock.json` 存在该文件时，Rainbond 默认使用 npm 包管理器构建。
   - `yarn.lock` 存在该文件时，Rainbond 使用 yarn 包管理器构建。

3. 源代码根目录下需存在 `web.conf` 文件，这是`nginx`的配置文件。没有此文件时，Rainbond 会采用缺省配置。

### 检查项目

在 Rainbond 部署自己的 **Vue React** 项目之前需要检查项目是否可用：

- 清理本地 `node_modules` 所有依赖，是否可以使用 `npm run build` 或其他命令 **打包成功**。


## 部署示例

接下来用此 Vue 项目 `https://gitee.com/zhangbigqi/RuoYi-Vue.git` 来演示，Fork开源项目 [若依](https://gitee.com/y_project/RuoYi-Vue.git)

### 添加 nodestatic.json 文件

在源代码根目录创建文件 `nodestatic.json` ,填写以下内容。

:::tip
该文件指定静态文件编译后的输出目录，默认是打包后输出到项目根目录 `dist`。如不是默认 `dist` 目录，需要在该文件中指定。
:::

```json
{
  "path": "dist"
}
```

### 添加 web.conf 配置文件

项目编译完成后，Rainbond 会默认使用 Nginx（1.19.6） 将前端项目运行起来。用户可以在源代码根目录下加入 `web.conf` 文件来指定 Nginx 的配置，该文件的作用是定义运行时参数。没有此文件时，Rainbond 会采用缺省配置。参考配置用例如下：

默认会把打包出来的 `dist` 目录下的所有文件放到容器的 `/app/www`

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

:::tip
有了以上文件可以在 Rainbond 中构建 Vue、React 项目了
:::

### 源码部署Vue项目

本次使用 Vue 项目进行演示，React 项目同理。


#### 基于源码创建组件

1. 基于源码创建组件，填写以下信息：

|              | 内容                                 |
| ------------ | ------------------------------------ |
| 组件名称     | 自定义                               |
| 组件英文名称 | 自定义                               |
| 仓库地址     | `https://gitee.com/zhangbigqi/RuoYi-Vue.git` |
| 子目录路径     | `ruoyi-ui` |
| 代码版本     | master                    |

2. 确认创建组件，平台会自动识别语言为 **Nodestatic**.

:::info
此项目默认打包命令是 `npm run build:prod`，需要在 `组件 > 构建源 `修改构建命令为此命令。

Rainbond中默认打包命令是 `npm run build yarn run build`

修改后重新构建，直至完成，访问页面即可。
:::