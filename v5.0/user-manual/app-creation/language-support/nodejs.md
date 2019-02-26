---
title: 通过Node.JS源码创建
summary: 通过Node.JS源码创建
toc: true
---

## 一、准备工作

在此步骤中，您将准备一个可以部署的简单应用程序，至少需要满足前3个条件: 

- 本地可以正常运行部署的Nodejs程序  
- 项目可以托管到git仓库或svn代码仓库
- 项目根目录下必须存在`package.json`,用来管理Nodejs项目的依赖,也是Rainbond识别为Nodejs语言的必要条件  
- 项目根目录下需要定义`Procfile`,用来定义程序启动方式。如果未定义，Rainbond将读取`package.json`中的 scripts.start 的定义值来启动。
- 5.0及以前版本暂不支持NodeJS前端类项目的源码构建，如有类似需求，请参考[NodeJS前端类代码源码构建](http://t.goodrain.com/t/nodejs-react-vue/654)


你可以直接使用示例代码 : [Node.js示例代码](https://github.com/goodrain/nodejs-demo.git)

## 二、代码识别

代码的根目录下必须有`package.json`文件，如果不存在请手动或使用 `npm init` 命令创建并配置需要的依赖和其它信息。

## 三、Runtime版本支持

#### 3.1 定义Node的版本

Node 默认当前支持的版本如下：

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


您可以在 `package.json` 里使用 engines 指定版本：

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

#### 3.2 定义Yarn的版本

如果在代码根目录存在`yarn.lock` 文件，Rainbond将安装yarn来管理下载依赖包，你需要通过下述方式指定yarn的版本。

* 支持的版本

  1.9.4

* 定义方式

  ```
  {
    "engines": {
      "yarn": "1.9.4"
    }
  }
  ```

## 四、环境变量

系统会设置以下的环境变量，`NODE_ENV`环境变量默认是 production。

```bash
   # 默认 NODE_ENV 是 production
   export NODE_ENV=${NODE_ENV:-production}

   # 添加node的二进制文件目录到PATH
   PATH=vendor/node/bin:bin:node_modules/.bin:$PATH
```



## 五、构建行为

#### 5.1 依赖包安装

Node项目支持使用[npm package manager](https://www.npmjs.com/) 和 [yarn package manager](https://yarnpkg.com/) 安装依赖包，如果存在`yarn.lock` 文件，使用yarn安装依赖和运行脚本，否则使用npm。

#### 5.2 自定义构建脚本

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

## 五、配置启动命令

Procfile 文件不是必须的，系统会检查 `package.json` 里的 `scripts.start` 项，如果存在，系统会使用 `scripts.start` 里的命令做为启动命令，参考上一节里 `package.json` 示例里的 `scripts.start` 脚本。

另外，您也可以自行创建  [Procfile](./etc/procfile.html)  来指定应用启动命令，如：

{% include copy-clipboard.html %}
```bash
web: npm start
```
系统会优先使用  [Procfile](./etc/procfile.html)  中的启动命令。
{{site.data.alerts.callout_danger}}请注意  [Procfile](./etc/procfile.html)  的语法，冒号后在有一个空格。{{site.data.alerts.end}}