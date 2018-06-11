---
title: 通过Node.JS源码创建
summary: 通过Node.JS源码创建
toc: false
---
<div id="toc"></div>

## 代码识别
在您代码的根目录下必须有`package.json`文件，如果不存在请手动或使用 `npm init` 命令创建并配置需要的依赖和其它信息。
## 支持Node.js的版本

当前支持的版本 

- 0.10.48
- 0.12.18
- 4.8.7
- 6.12.3
- 8.9.4
- 9.3.0

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

## 环境变量
系统会设置以下的环境变量，`NODE_ENV`环境变量默认是 production。

```bash
   # 默认 NODE_ENV 是 production
   export NODE_ENV=${NODE_ENV:-production}

   # 添加node的二进制文件目录到PATH
   PATH=vendor/node/bin:bin:node_modules/.bin:$PATH
```
## 自定义构建
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
系统默认不自带 grunt、gulp、bower 这些工具，而且只会安装 `package.json` 中 `dependencies` 节点下的依赖，所以自定义执行的命令也需要作为依赖添加到此节点下，否则可能会找不到命令，这些工具执行时需要的依赖也是如此。
{{site.data.alerts.end}}

我们 **推荐** 在本地编译好静态文件再上传到服务器部署，而不是在服务器端.因为服务器端可能会缺少某些包依赖的外部环境而无法执行某些 grunt 任务，比如：`grunt-contrib-compass` 和 `grunt-contrib-sass` 都是依赖外部的 Ruby 命令行工具的，但是平台的 node.js 环境里是没有这些工具的。

## 启动命令
Procfile 文件不是必须的，系统会检查 `package.json` 里的 `scripts.start` 项，如果存在，系统会使用 `scripts.start` 里的命令做为启动命令，参考上一节里 `package.json` 示例里的 `scripts.start` 脚本。

另外，您也可以自行创建 Procfile 来指定应用启动命令，如：

{% include copy-clipboard.html %}
```bash
web: npm start
```
系统会优先使用 Procfile 中的启动命令。
{{site.data.alerts.callout_danger}}请注意Profile的语法，冒号后在有一个空格。{{site.data.alerts.end}}

## 示例代码

- [Node.js示例代码](http://code.goodrain.com/demo/nodejs-hello/tree/master)