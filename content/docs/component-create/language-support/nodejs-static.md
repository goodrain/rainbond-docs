---
title: NodeJS前端语言
description: NodeJS前端语言类型Rainbond支持规范介绍, 部署Vue React Angular源码部署到Rainbond
weight: 3322
hidden: false
aliases:
- /docs/user-manual/component-create/language-support/nodejs-static/
---

#### NodeJS前端项目识别方式

平台默认会根据源码根目录是否有`package.json`和`nodestatic.json`文件来识别为NodeJS前端类项目。

- 默认会使用 npm 包管理器

- 如代码根目录下存在`yarn.lock`文件，则使用yarn包管理器

#### 编译原理

##### npm编译原理

1. 预编译处理完成后,会根据语言类型选择nodejstatic的buildpack去编译项目.在编译过程中会安装定义的Node版本以及相关依赖,安装默认web服务nginx;
2. 编译过程中，会使用 `npm run build` 命令，所以要关注 `package.json` 文件中，有没有通过 `scripts` 中的 `build` 关键字，指定构建方式。
3. 编译完成后会检查是否在平台设置了Procfile参数,若配置了会重写启动命令配置文件Procfile.

##### yarn编译原理

1. 预编译处理完成后,会根据语言类型选择nodejstatic的buildpack去编译项目.在编译过程中会安装指定版本的Node、yarn、以及相关依赖,安装默认web服务nginx;
2. 编译过程中，会使用 `yarn build` 命令，所以要关注 `package.json` 文件中，有没有通过 `scripts` 中的 `build` 关键字，指定构建方式。
3. 编译完成后会检查是否在平台设置了Procfile参数,若配置了会重写启动命令配置文件Procfile.

#### NodeJS前端项目源码规范

在此步骤中，你需要提供一个可用的NodeJS源码程序用来部署在Rainbond平台上,此应用程序至少需要满足如下条件:

1. 本地可以正常运行的NodeJS项目
2. 源码程序必须托管在gitlab等相关git或者svn服务上
3. 源码程序根路径下必须存在`package.json`,用来管理NodeJS项目的依赖,是Rainbond识别为NodeJS前端类语言的必要条件
4. 代码的根目录下必须有`nodestatic.json`文件，是Rainbond识别为NodeJS前端类语言的必要条件

##### nodestatic.json规范

用于定义NodeJS编译后文件路径。

```
# cat nodestatic.json
{"path":"<编译后路径>"}
```

##### Procfile规范

如果未定义Procfile，会生成如下默认Procfile

```bash
web: sh boot.sh
```

上述是默认Procfile,如果需要扩展更多启动参数,可以自定义Procfile。

{{% notice info %}}

1. `web:`和`sh`之间有一个空格
<br>
2. 文件结尾不能包含特殊字符



#### 编译运行环境设置

##### Node版本支持

当前Rainbond支持Node如下版本为：

```
4.9.1 
5.12.0 
6.14.4 
7.10.1 
8.12.0 
9.11.2
10.13.0 
11.1.0 
```

平台默认版本使用`8.12.0`,具体配置参考[NodeJS源码构建](../nodejs/)

##### 仓库私服设置

###### npm 私服设置

npm 构建默认使用淘宝私服地址： `https://registry.npm.taobao.org`
如果希望能够自定义 `npm install` 时使用的私服仓库地址，则需要添加自定义环境变量：

```bash
BUILD_NPM_REGISTRY=http://X.X.X.X:8080/repository/npm-group/
```

###### yarn 私服设置

yarn 构建并不支持环境变量设置私服，但是可以通过 `preinstall` 关键字设置私服地址。

```json
"scripts": {
	"preinstall": "bash preinstall.sh",
	"build": "/tmp/build/node_modules/.bin/vue-cli-service build --mode test"
},
```

在上述的 `package.json` 文件中，关键字 `preinstall` 指定了在安装依赖（yarn install）前所做的操作。示例中为执行代码根目录下的一个脚本文件，其内容为设置构建私服：

```bash
#!/bin/bash
yarn config set registry http://X.X.X.X:8080/repository/npm-group/ --global
```

#### Web服务支持

Web默认支持Nginx,目前Nginx版本为1.14.2。如果需要自定义配置Nginx，需要在源代码根目录添加`web.conf`或者`www/web.conf`(需要符合Nginx配置文件语法)。

默认配置文件`web.conf`

```bash
server {
    listen       80;
    
    location / {
        root   /app/www;
        index  index.html index.htm;
    }
}
```

#### 示例demo程序

示例[https://github.com/goodrain/rainbond-ui](https://github.com/goodrain/rainbond-ui.git)