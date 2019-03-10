---
title: NodeJS前端类源码构建应用
summary: NodeJS前端类源码构建应用
toc: true
---

> 本教程将帮助你在几分钟内熟悉Rainbond如何快速部署NodeJS前端类源码程序。

## 平台编译运行机制

1. 平台默认会根据源码根目录是否有`package.json`和`nodestatic.json`文件来识别为NodeJS前端类项目;
2. 预编译处理完成后,会根据语言类型选择nodejstatic的buildpack去编译项目.在编译过程中会安装定义的Node版本以及Nodejs相关依赖,安装默认web服务nginx;
3. 编译完成后会检查是否在平台设置了Procfile参数,若配置了会重写启动命令配置文件Procfile.

## NodeJS前端项目源码规范

在此步骤中，你需要提供一个可用的NodeJS源码程序用来部署在Rainbond平台上,此应用程序至少需要满足如下条件:

1. 本地可以正常运行的NodeJS项目
2. 源码程序必须托管在gitlab等相关git或者svn服务上
3. 源码程序根路径下必须存在`package.json`,用来管理NodeJS项目的依赖,是Rainbond识别为NodeJS前端类语言的必要条件
4. 代码的根目录下必须有`nodestatic.json`文件，是Rainbond识别为NodeJS前端类语言的必要条件


### nodestatic.json规范

用于定义NodeJS编译后文件路径。

```
# cat nodestatic.json
{"path":"<编译后路径>"}
```

### Procfile规范

如果未定义Procfile，会生成如下默认Procfile

```bash
web: sh boot.sh
```

上述是默认Procfile,如果需要扩展更多启动参数,可以自定义Procfile。

{{site.data.alerts.callout_info}}
1. `web:`和`sh`之间有一个空格
2. 文件结尾不能包含特殊字符
{{site.data.alerts.end}}

## 编译运行环境设置

### 配置Node版本

#### Node支持

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

平台默认版本使用`8.12.0`。可以在 `package.json` 里使用 engines 指定版本：

{% include copy-clipboard.html %}
```bash
{
      "name": "myapp",
      "description": "a really cool app",
      "version": "0.0.1",
      "engines": {
        "node": "4.8.7"
      }
}
```

0.8.5 之后的版本包括 0.11.13 也是支持的，以下是使用 0.11.x 版本的例子：
{% include copy-clipboard.html %}

```bash
{
  "engines": {
    "node": "0.11.x"
  }
}
```

{{site.data.alerts.callout_success}}
npm 版本不是必须的，可以省略，因为 npm 是跟 node 绑定的。
{{site.data.alerts.end}}

### 高级构建说明


#### 依赖包安装 

Node项目支持使用[npm package manager](https://www.npmjs.com/) 和 [yarn package manager](https://yarnpkg.com/) 安装依赖包，如果存在`yarn.lock` 文件，使用yarn(默认支持版本1.9.4)安装依赖和运行脚本，否则使用npm。

* yarn定义方式

  ```
  {
    "engines": {
      "yarn": "1.9.4"
    }
  }
  ```


#### 自定义构建脚本

如果您的应用在构建时需要执行额外的操作，可以在 `package.json` 的 `scripts` 节点下添加 `postinstall`
脚本，该脚本会在 buildpack 执行完 `npm install —production` 后自动执行，可参考`package.json` 示例：

{% include copy-clipboard.html %}
```bash
{
  "name": "node-hello",
  "version": "0.0.1",
  "description": "nodejs demo",
  "dependencies" : {
    "bower": "~1.3.9",
    "grunt-cli": "~0.1.13",
  },
  "scripts": {
    "start": "node index.js",
    "test": "mocha",
    "postinstall": "bower install && grunt build"
  },
  "engines": {
    "node": "9.3.0"
  }
}
```

{{site.data.alerts.callout_danger}}
系统默认不自带 grunt、gulp、bower 这些工具，但是会安装 `package.json` 中 `dependencies` 和`devDependencies` 节点下的依赖，所以自定义执行的命令也需要作为依赖添加到此节点下，否则可能会找不到命令，这些工具执行时需要的依赖也是如此。
{{site.data.alerts.end}}

### Web服务支持

Web默认支持Nginx,目前Nginx版本为1.14.2。如果需要自定义配置Nginx，需要在源代码根目录添加`web.conf`(需要符合Nginx配置文件语法)。

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

## 示例demo程序

示例[https://github.com/goodrain/rainbond-ui](https://github.com/goodrain/rainbond-ui.git)

## 推荐阅读

