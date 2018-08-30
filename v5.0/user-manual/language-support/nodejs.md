---
title: 通过Node.JS源码创建
summary: 通过Node.JS源码创建
toc: true
---

## 一、代码识别

在您代码的根目录下必须有`package.json`文件，如果不存在请手动或使用 `npm init` 命令创建并配置需要的依赖和其它信息。

## 二、支持版本

```
node  4.x (支持到 4.9.1)
node  5.x (支持到5.12.0)
node  6.x (支持到6.14.4)
node  7.x (支持到7.10.1)
node  8.x (支持到8.11.4)
node  9.x (支持到9.11.2)
node 10.x (支持到10.9.0)
yarn  1.x (支持到1.9.4)
iojs  3.x (支持到3.3.1)
iojs  2.x (支持到2.5.0)
```

## 三、环境变量

系统会设置以下的环境变量，`NODE_ENV`环境变量默认是 production。

## 四、自定义构建或启动

应用在构建时需要执行额外的操作，可以在 `package.json` 的 `scripts` 节点下添加 `postinstall`
脚本，该脚本会在 buildpack 执行完 `npm install —production` 后自动执行，可参考`package.json` 示例：

{% include copy-clipboard.html %}

```json
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
系统默认不自带 grunt、gulp、bower 这些工具，而且只会安装 `package.json` 中 `dependencies` 定义的依赖，所以自定义执行的命令也需要作为依赖添加到`dependencies`下，否则可能会找不到命令，这些工具执行时需要的依赖也是如此。
{{site.data.alerts.end}}

我们 **推荐** 在本地编译好静态文件再上传到服务器部署，而不是在服务器端.因为服务器端可能会缺少某些包依赖的外部环境而无法执行某些 grunt 任务，比如：`grunt-contrib-compass` 和 `grunt-contrib-sass` 都是依赖外部的 Ruby 命令行工具的，但是平台的 node.js 环境里是没有这些工具的。

`Procfile`文件不是必须的，系统会根据 `package.json` 里的 `scripts.start` 定义项自动生成`Procfile`。如果两者都有，则优先使用`Procfile`文件

另外，可以自定义`Procfile`来指定应用启动命令，如：

{% include copy-clipboard.html %}

```bash
web: npm start
```

## 五、相关源码

- [Getting Started with Node on Rainbond](https://github.com/goodrain/nodejs-getting-started)