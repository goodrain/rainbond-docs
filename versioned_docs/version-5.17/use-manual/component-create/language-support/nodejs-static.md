---
title: NodeJS前端语言
description: NodeJS前端语言类型Rainbond支持规范介绍, 部署Vue React Angular源码部署到Rainbond
---

> 该文档适用于 nodejs 前端类项目，比如 vue、react。

### NodeJS 前端项目识别方式

Rainbond 会根据源代码根目录是否有 `package.json` 和 `nodestatic.json` 文件来识别为 NodeJS 前端类项目，除此之外，源代码根目录下还必须存在以下两个文件之一（不可以同时存在）：

- `package-lock.json` 存在该文件时，Rainbond 默认使用 npm 包管理器构建。

- `yarn.lock` 存在该文件时，Rainbond 使用 yarn 包管理器构建。

### 验证准备

将项目部署到 Rainbond 之前，请按照以下步骤进行本地验证，本地构建成功后，即可开始尝试将项目部署在 Rainbond 上。

- 源代码托管于 Git 或 SVN 服务器。

- 检查本地构建环境与运行环境，确定 npm、 node、 yarn 版本。

- 清除本地构建缓存，一般情况下，本地项目路径下存在 `node_modules` 目录，请在确认后，将该文件夹临时更改路径。

```bash
mv node_modules node_modules.bak
```

- 执行以下构建命令，该命令也是 Rainbond nodejs 前端项目构建的默认命令：

```bash
# 使用 npm 进行构建时
npm run build

# 使用 yarn 进行构建时
yarn run build
```

### 编译运行环境配置

环境准备阶段，需要将 Rainbond 构建运行环境，和常用的本地构建运行环境尽量统一。比如 Node 版本、构建命令等。

#### 图形化设置

Rainbond 支持图形化定义编译运行环境，配置位于服务组件的构建源页面。**对这些配置的修改，需要通过 [构建](../../component-manage/overview/basic-operation) 来生效！**

<img src="https://static.goodrain.com/docs/5.2/component-create/language-support/nodejsstatic/nodejsstatic-1.png" title="编译运行环境定义"/>

- 禁用缓存，在完成首次成功的构建之前，该开关应该始终处于打开的状态，默认关闭。

- 选择编译运行所使用的 Node 版本，**务必使用验证准备时验证过的版本**。

- BUILD_NODE_ENV，用于指定构建过程中是否清理依赖，默认清理。

- NPM MIRROR_URL，用于指定构建私服，默认指定淘宝 npm 源地址。

- 构建命令，用于指定项目通过什么命令构建，默认使用 `npm run build` 或 `yarn run build` ，取决于源代码根目录中具有 `package-lock.json` 还是 `yarn.lock`。

#### 通过代码设置(推荐)

Nodejs 前端语言项目的编译运行环境可以通过代码进行设置。

**package.json**

该文件至关重要，平台根据其中 `scripts` 部分定义的 `build` 命令进行项目构建。基于 `engines` 部分定义的 node、npm 或者 yarn 版本进行环境配置。版本定义可以缺省，默认使用 `node=10.9.0` `yarn=1.9.4` `npm=6.2.0` 若你需要自定义版本，请按照如下格式配置：

```bash
"engines": {
    "node": "12.8.1",
    "npm": "6.4.1"
}
```

当前 Rainbond 支持如下 Node 版本：

| 选项 |                                      版本                                       |
| :--: | :-----------------------------------------------------------------------------: |
| Node | 0.12.18, 4.9.1, 5.12.0, 6.14.4, 7.10.1, 8.12.0, 9.11.2, 10.13.0, 11.1.0, 12.8.1 |
| Yarn |                                      1.9.4                                      |

平台默认版本使用`8.12.0`。

`package.json` 文件中的 `scripts` 具备 CI 特征，Rainbond 源码构建过程继承这些特性，比如：

```bash
"scripts": {
	"preinstall": "bash preinstall.sh",     # 在执行 npm install 之前，自动执行脚本 preinstall.sh
    "postinstall": "bash postinstall.sh",   # 在执行 npm install 之后，自动执行脚本 postinstall.sh
	"build": "vue-cli-service build --mode test"
}
```

更多 `npm-scripts` 特性，参考 [How npm handles the "scripts" field](https://docs.npmjs.com/misc/scripts)

**nodestatic.json**

该文件指定静态文件编译后的输出目录，一般情况下，该路径都是 `dist`。

```bash
{
   "path": "dist"
}
```

**web.conf**

项目编译完成后，Rainbond 会默认使用 Nginx（1.14.2） 将前端项目运行起来。用户可以在源代码根目录下加入 `web.conf` 文件来指定 Nginx 的配置，该文件的作用是定义运行时参数，特别是对后台 API 的代理。没有此文件时，Rainbond 会采用缺省配置。参考配置用例如下：

```bash
upstream upstream-server {
    server 127.0.0.1:8080;
}

server {
    listen 5000;

    location /api {
        proxy_http_version 1.1;
        proxy_set_header Host manage-server;
        proxy_pass http://upstream-server;
    }

    location /index.html {
        add_header Cache-Control "private, no-store, no-cache, must-revalidate, proxy-revalidate";
        try_files $uri $uri/ /index.html;
        root   /app/www;
        index  index.html index.htm;
    }
    location / {
        try_files $uri $uri/ /index.html;
        root   /app/www;
        index  index.html index.htm;
    }
}
```

配置文件格式与 nginx 配置文件方式一致。例子中`/manage-server` 为后端 API 的访问路径，代理到`127.0.0.1:8080` ，然后前端组件需要依赖后端 API 组件。

**rainbondfile**

在源代码根目录下加入 [rainbondfile](../language-support/rainbondfile) 可以为服务组件定义环境变量，构建过程中更多的配置，可以通过环境变量的方式定义。

在 Rainbond 源码构建的过程中，为服务组件定义的 `BUILD_` 开头的变量，可以被传入构建环境中使用。部分常用的环境变量如下:

|         环境变量         |              默认值               |                                  说明                                  |
| :----------------------: | :-------------------------------: | :--------------------------------------------------------------------: |
|    BUILD_NPM_REGISTRY    | `https://registry.npm.taobao.org` |                   执行 npm install 时指定的私服地址                    |
|   BUILD_YARN_REGISTRY    | `https://registry.npm.taobao.org` |                   执行 yarn install 时指定的私服地址                   |
|      BUILD_NODE_ENV      |           `production`            |                用于指定构建过程中是否清理依赖，默认清理                |
| BUILD_NODE_MODULES_CACHE |              `true`               | 指定是否开启构建缓存，在 Rainbond 服务器磁盘性能低下时，指定为 `false` |
|    BUILD_NODE_VERBOSE    |              `false`              |      指定是否在构建日志中体现依赖列表（`npm ls` 或 `yarn list`）       |

### 启动命令配置

Nodejs 前端项目源码构建过程完成后，Rainbond 会自动将服务组件运行起来，这需要我们事先指定服务组件的启动命令。

#### Procfile 规范

Rainbond 通过源代码根目录下的 `Procfile` 文件来定义项目启动命令，`Procfile` 文件定义规范详见 [Procfile](../language-support/procfile) 。

如果未定义 Procfile，会生成如下默认 Procfile

```bash
web: sh boot.sh
```

上述是默认 `Procfile` ,如果需要扩展更多启动参数,可以自定义 `Procfile` 。

- `web:` 和 `sh` 之间有一个空格
- 文件结尾不能包含特殊字符

默认执行的 `boot.sh` 内容为：

```bash
sed -i -r  "s/(listen ).*/\1\$PORT;/" /app/nginx/conf.d/web.conf #使用指定的端口来配置 Nginx 监听
touch /app/nginx/logs/access.log
touch /app/nginx/logs/error.log
ln -sf /dev/stdout /app/nginx/logs/error.log
ln -sf /dev/stderr /app/nginx/logs/access.log
echo "Launching nginx"
exec /app/nginx/sbin/nginx -g 'daemon off;'
```

### 示例 demo 程序

示例[https://github.com/goodrain/rainbond-ui](https://github.com/goodrain/rainbond-ui.git)

### 常见问题解决

- 使用 git-revision-webpack-plugin 插件打包时报错。

  > 部分项目打包配置中设置了基于 git 来获取版本号，需要依赖源码目录中存在.git 文件。在 Rainbond 中源码编译过程中使用的源代码不会存在.git 文件。因此不能使用 git 插件来获取版本。Rainbond 平台上有版本管理，因此遇到这个问题请移除 webpack 配置文件中的 git 相关的插件。

- 编译完成后访问 404

  > 请确认`nodestatic.json` 中配置的编译后文件发布目录是否是项目配置的发布目录。比如真实目录是 `build`，但 `nodestatic.json` 中配置的是 `dist` ，那最终就是找不到编译后文件。

- 平台上源码编译失败怎么办？

  > 查看构建日志，大多数情况是属于源代码不符合规范或本身编译不通过导致。日志可以帮助你找到并解决问题。
  >
  > （1）情景 1，构建日志提示 `Two different lockfiles found: package-lock.json and yarn.lock` ，该信息提示当前源代码根目录下同时存在 `package-lock.json` 和 `yarn.json` 两个锁文件，请根据希望使用的包管理器删除另一个锁文件，提交代码后重新构建。
  >
  > （2）情景 2，构建日志提示：`Outdated Yarn lockfile` ，该信息提示当前构建使用的 `yarn.lock` 与 `package.json` 中规定的版本依赖有冲突，根据构建日志后续的提示，可以在本地更新 `yarn.lock` ，提交代码后重新构建。
  >
  > （3）情景 3，构建日志提示 `No matching version found for Node: XXX` 或 `No matching version found for Yarn: XXX`，该信息提示 `package.json` 中 `scripts.engines` 定义的 Node 、 Yarn 版本暂时不被支持，请参考上述文档 `package.json` 配置版本部分。如果 Rainbond 提供的版本的确不能满足项目需要，请联系好雨科技工程师添加。
  >
  > （4）情景 4，构建日志提示 `Invalid semver requirement` ，该信息提示 `package.json` 中 `scripts.engines` 定义版本的方式不符合 [semver 格式](http://semver.org/)。请参考上述文档 `package.json` 配置版本部分。

- 源码编译通过但是运行异常。

  > （1）情景 1，是因为没有定义 `nodestatic.json` 文件，平台认为这是 nodejs 后端项目。按照后端项目的方式去运行了。解决方式是源码中添加 `nodestatic.json` 文件，然后重新创建组件或者重新进行源码类型识别。然后重新构建。
  >
  > （2）情景 2，配置的 web.conf 格式不正确，不是合法的 nginx 配置。组件运行日志中会提示错误的行。

- 在构建前端 vue 项目使用非淘宝源而是使用私有源，因私有源需要身份验证导致获取包 401。

  > 在项目主目录添加.npmrc 文件，在文件中设置私有源秘钥，如：\_auth=**\*\*\***

<!-- ### 编译原理

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
``` -->
