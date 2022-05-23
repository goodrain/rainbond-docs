---
title: 部署Vue、React前端项目
weight: 4003
---

**前言**

以往我们在部署 **Vue**、**React** 前端项目有几种方法：

* 项目打包好之后生成dist目录，将其放入nginx中，并进行相应的访问配置。
* 将项目打包好放入tomcat中。
* 将项目打包好的dist目录中的static和index.html文件放入springboot项目的resources目录下
* 直接运行一个前端server，类似本地开发那种。



在Rainbond中部署**Vue** **React** 项目同样使用了第一种方法，根据源码自动`build`，打包完成后自动把静态文件放入nginx中。

* 在Rainbond中部署 **Vue** **React** 项目有以下三点规范：

  1. Rainbond 会根据源代码根目录是否有 **nodestatic.json** 和 **package.json **文件，文件来识别为`Vue` `React`前端类项目。

2. 源代码根目录下必须存在以下两个文件之一（**不可以同时存在**）：

   - `package-lock.json` 存在该文件时，Rainbond 默认使用 npm 包管理器构建。

   - `yarn.lock` 存在该文件时，Rainbond 使用 yarn 包管理器构建。
  3. 源代码根目录下需存在 `web.conf` 文件，这是`nginx`的配置文件。没有此文件时，Rainbond 会采用缺省配置。



**在Rainbond部署自己的Vue、React项目之前需要检查项目是否可用：**

- 清理本地`node_modules`所有依赖，是否可以使用`npm run build`或其他命令 **打包成功**。



接下来用此Vue项目`https://gitee.com/zhangbigqi/RuoYi-Vue.git` 来演示，Fork开源项目 [若依](https://gitee.com/y_project/RuoYi-Vue.git)




### 1.1 添加 nodestatic.json 文件

在源代码根目录创建文件 `nodestatic.json` ,填写以下内容。

该文件指定静态文件编译后的输出目录，一般Vue项目默认都是打包后输出到项目根目录`dist`。

```bash
{
	"path": "dist"
}
```

如果你的项目打包后目录输出不是项目根目录，而是根目录下的某一个文件夹例如：`project/dist`，则需要修改`nodestatic.json`文件

```shell
{
	"path": "project/dist"
}
```

### 1.2 添加 web.conf 文件

项目编译完成后，Rainbond 会默认使用 Nginx（1.14.2） 将前端项目运行起来。用户可以在源代码根目录下加入 `web.conf` 文件来指定 Nginx 的配置，该文件的作用是定义运行时参数。没有此文件时，Rainbond 会采用缺省配置。参考配置用例如下：

默认会把打包出来的 `dist`目录下的所有文件放到容器的`/app/www`

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

**有了以上文件可以在Rainbond中构建Vue、React项目了**

### 1.3 源码部署Vue项目

**本次使用Vue项目进行演示，React项目亦是如此。** 

本项目源码地址`https://gitee.com/zhangbigqi/RuoYi-Vue.git` Fork开源项目 [若依](https://gitee.com/y_project/RuoYi-Vue.git)

#### 1.3.1 基于源码创建组件

* 参考基于源码构建[官方文档](/docs/use-manual/component-create/language-support/nodejs-static/)

- 填写源码仓库地址，填写前端子目录 `ruoyi-ui`，构建Vue项目

![Vue-1](https://static.goodrain.com/docs/practice/Vue-SpringBoot-Mysql/Vue-1.png)

- 确认创建组件，平台会自动识别语言为 **Nodestatic**.

  ![Vue-2](https://static.goodrain.com/docs/practice/Vue-SpringBoot-Mysql/Vue-2.png)

- 创建，等待构建组件完成即可。

  > 默认使用国内npm淘宝源，可在组件构建源中查看

- 此开源项目比较特殊，默认打包命令不是`npm run build`，而是`npm run build:prod`，需要在 `组件 > 构建源 `修改构建命令为此命令。

  > Rainbond中默认打包命令是 npm run build 、yarn run build

* 修改后重新构建，直至完成，访问页面即可。✌️



### 常见问题

* 部署完成后访问页面**403**，有以下几种原因：

1. 打包没有成功，导致产物不完全。

   >  仔细查看构建日志，确认错误原因。或在本地删除所有依赖包，重新验证项目是否可以正常构建。

   2. 打包路径定义错误，导致Rainbond构建过程无法获取到构建后的静态文件。

      > 参考上文1.1环节，正确配置项目打包路径。