---
title: NodeJS front-end language
description: NodeJS front-end language type Rainbond support specification introduction, deploy Vue React Angular source code to Rainbond
---

> This document is suitable for nodejs front-end projects, such as vue and react.

### NodeJS front-end project identification method

Rainbond will identify it as a NodeJS front-end class project according to whether there are `package.json` and `nodestatic.json` files in the source code root directory. In addition, one of the following two files must exist in the source code root directory (not can exist at the same time)：

- `package-lock.json` When this file exists, Rainbond builds with the npm package manager by default.

- `yarn.lock` When this file exists, Rainbond is built using the yarn package manager.

### Validation preparation

Before deploying the project to Rainbond, please follow the steps below for local verification. After the local build is successful, you can start trying to deploy the project on Rainbond.

- The source code is hosted on a Git or SVN server.

- Check the local build environment and runtime environment to determine the npm, node, and yarn versions.

- Clear the local build cache. Generally, there are `node_modules` directories under the local project path. Please change the path of this folder temporarily after confirmation.

```bash
mv node_modules node_modules.bak
```

- Execute the following build command, which is also the default command：for Rainbond nodejs front-end project builds

```bash
# When building with npm
npm run build

# When building with yarn
yarn run build
```

### Compile and run environment configuration

In the environment preparation stage, the Rainbond build and run environment needs to be as unified as possible with the commonly used local build and run environment.Such as Node version, build command, etc.e.g. Node version, build command, etc.

#### Graphical settings

Rainbond supports the graphical definition of the compilation and runtime environment, and the configuration is located on the build source page of the service component.\*\*Modifications to these configurations need to take effect through [build](/docs/use-manual/component-manage/overview/basic-operation)!\*\***Changes to these configurations need to be made via [构建](/docs/use-manual/component-manage/overview/basic-operation)!**

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/component-create/language-support/nodejsstatic/nodejsstatic-1.png" title="编译运行环境定义"/>

- Disable caching, this switch should always be on until the first successful build is done, off by default.

- Select the version of Node used to compile and run,**must use the version verified when preparing for verification**.

- BUILD_NODE_ENV is used to specify whether to clean up dependencies during the build process. The default is to clean up.

- NPM MIRROR_URL is used to specify the build private server, and the Taobao npm source address is specified by default.

- Build command, used to specify what command the project is built with, defaults to `npm run build` or `yarn run build` , depending on whether there is `package-lock.json` or `yarn.lock`in the source code root.

#### Set via code (recommended)

The compilation and runtime environment of the Nodejs front-end language project can be set by code.

**package.json**

The file is vital, the platform is built according to the `build` command defined in part of the `scripts`.Environment is configured based on node, npm or yarn versions defined in `engines`.This file is critical, the platform builds the project according to the `scripts` section defined in the `build` command.Environment configuration based on the node, npm or yarn version defined in `engines` section.The version definition can be defaulted, the default is `node=10.9.0` `yarn=1.9.4` `npm=6.2.0` If you need a custom version, please configure it in the following：

```bash
"engines": LO
    "node": "12.8.1",
    "npm": "6.4.1"
}
```

Currently Rainbond supports the following Node version：

| Options |                                                                                                                                                                                                     Version                                                                                                                                                                                                     |
| :-----: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|   Node  | 0.12.18, 4.9.1, 5.12.0, 6.14.4, 7.10.1, 8.12.0, 9.11.2, 10.13.0, 11.1.0, 12.8.1 |
|   Yarn  |                                                                                                                                                                                      1.9.4                                                                                                                                                                                      |

The platform default version uses`8.12.0`.

`scripts` in package.json file have CI features, and the Rainbond source code build process inherits these features, such as：

```bash
"scripts": {
    "preinstall": "bash preinstall.sh", # Before executing npm install, automatically execute script preinstall.sh
    "postinstall": "bash postinstall.sh", # After executing npm install, automatically Execute the script postinstall.sh
    "build": "vue-cli-service build --mode test"
}
```

For more `npm-scripts` features, see [How npm handles the "scripts" field](https://docs.npmjs.com/misc/scripts)

**nodestatic.json**

This file specifies the output directory of static files after compilation. In general, the path is `dist`.

```bash
LO
   "path": "distres"
}
```

**web.conf**

After the project is compiled, Rainbond will use Nginx (1.14.2) by default to run the front-end project.Users can add `web.conf` file in the source code root directory to specify the configuration of Nginx. The function of this file is to define the runtime parameters, especially the proxy for the background API.Without this file, Rainbond uses the default configuration.The reference configuration use case is as follows：The format of the configuration file is the same as that of the nginx configuration file.In the example,`/manage-server` is the access path of the back-end API, which is proxied to`127.0.0.1:8080` , and then the front-end components need to depend on the back-end API components.When this file is not available, Rainbond will use default configuration.Reference config example below：

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
        root /app/www;
        index index.html index.htm;
    }
    location / {
        try_files $uri $uri/ /index.html;
        root /app/www;
        index index.html index.htm;
    }
}
```

The configuration file format is the same as nginx configuration format.The `/manage-server` in the example is the access path to the backend API, proxy to `127.0.0.1:8080` and then the front-end component needs to rely on the backend API component.

**rainbondfile**

Adding [rainbondfile](../language-support/rainbondfile) to the root directory of the source code can define environment variables for the service component. More configurations during the build process can be defined by means of environment variables.

During the Rainbond source code building process, the variables defined for service components starting with `BUILD_` can be passed into the build environment for use.Some commonly used environment variables are as follows:Some of the commonly used environmental variables are as follows:

|                                  environment variable                                 |              Defaults             |                                                               illustrate                                                              |
| :-----------------------------------------------------------------------------------: | :-------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------: |
|              BUILD_NPM_REGISTRY             | `https://registry.npm.taobao.org` |                                    The private server address specified when executing npm install                                    |
|             BUILD_YARN_REGISTRY             | `https://registry.npm.taobao.org` |                                    The private server address specified when executing yarn install                                   |
|                BUILD_NODE_ENV               |            `Production`           |                    Used to specify whether to clean up dependencies during the build process, the default is clean                    |
| BUILD_NODE_MODULES_CHE |               `true`              | Specifies whether to enable the build cache. When the performance of the Rainbond server disk is low, specify `false` |
| VIP_PLAYLIST_FREE_BODY |              `false`              |             Specifies whether to reflect the dependency list in the build log (`npm ls` or `yarn list`)            |

### Start command configuration

After the Nodejs front-end project source code construction process is completed, Rainbond will automatically run the service component, which requires us to specify the start command of the service component in advance.

#### Procfile specification

Rainbond defines the project startup command through the `Procfile` file in the source code root directory, and the`Procfile` file definition specification is detailed in [Procfile](../language-support/procfile).

If Procfile is not defined, the following default Procfile will be generated

```bash
web: sh boot.sh
```

The above is the default `Procfile` , if you need to expand more startup parameters, you can customize `Procfile`.

- `web: there is a space between` and `sh`
- End of file cannot contain special characters

The default execution of `boot.sh` content is：

```bash
sed -i -r "s/(listen ).*/\1\$PORT;/" /app/nginx/conf.d/web.conf #Use the specified port to configure Nginx to listen to
touch /app/nginx/logs /access.log
touch /app/nginx/logs/error.log
ln -sf /dev/stdout /app/nginx/logs/error.log
ln -sf /dev/stderr /app/nginx/logs/access .log
echo "Launching nginx"
exec /app/nginx/sbin/nginx -g 'daemon off;'
```

### Sample demo program

Example[https://github.com/goodrain/rainbond-ui](https://github.com/goodrain/rainbond-ui.git)

### FAQ resolution

- An error occurs when packaging with the git-revision-webpack-plugin plugin.

  > Some projects have been configured in the package configuration based on git to get a version number and need to rely on .git files in the source directory.The source code used in the compilation of the source code in Rainbond will not exist in .git file.Therefore, the git plugin cannot be used to fetch the version.Some project packaging configurations are set to obtain the version number based on git, which requires the existence of a .git file in the source code directory.The source code used in the source code compilation process in Rainbond does not exist in a .git file.So the git plugin cannot be used to get the version.There is version management on the Rainbond platform, so if you encounter this problem, please remove the git-related plugins in the webpack configuration file.

- Access 404 after compilation is complete

  > Please confirm whether the release directory of the compiled files configured in`nodestatic.json` is the release directory configured by the project.For example, the real directory is `build`, but the configuration in `nodestatic.json` is `dist` , then the compiled file cannot be found in the end.For example, if the real directory is `build`, but the `nodestatic.json` is configured for `distance`. Eventually, the compiled file cannot be found.

- What should I do if the source code compilation fails on the platform?

  > Looking at the build log, in most cases, the source code does not conform to the specification or the compilation itself fails.Logs can help you find and fix problems.Log can help you find and solve problems.
  >
  > (1) Scenario 1, the build log prompts `Two different lockfiles found: package-lock.json and yarn.lock` , which indicates that there are `package-lock.json` and `yarn.json` in the current source code root directory at the same time Two lock files, please delete the other lock file according to the package manager you want to use, submit the code and rebuild it.
  >
  > (2) Scenario 2, the build log prompts：`Outdated Yarn lockfile` , which indicates that the current build uses `yarn.lock` that conflicts with the version dependencies specified in `package.json` According to the follow-up prompts in the build log, you can Update `yarn.lock` locally, and rebuild after committing the code.
  >
  > (3) Scenario 3, the build log prompts `No matching version found for Node: XXX` or `No matching version found for Yarn: XXX`, the message prompts Node and Yarn defined in `scripts.engines` in `package.json` The version is not currently supported, please refer to the above document `package.json` Configuration version section.If the version provided by Rainbond does not meet the needs of the project, please contact the engineers of Haoyu Technology to add it.If the version provided by Rainbond does not meet project needs, please contact the rainy technology engineer to add.
  >
  > (4) In Scenario 4, the build log prompts `Invalid semver requirement` , this message prompts `package.json` in `scripts.engines` to define the version that does not conform to [semver format](http://semver.org/).Please refer to the above documentation `package.json` Configuration version section.FAQ

- The source code compiles but runs abnormally.

  > (1) Scenario 1, because the `nodestatic.json` file is not defined, the platform thinks this is a nodejs backend project.It runs as a backend project.The solution is to add `nodestatic.json` file to the source code, and then recreate the component or re-identify the source code type.Then rebuild.Run as a backend project.The solution is to add the `nodestatic.json` file in the source code, then recreate the component or re-identify the source type.Then rebuild.
  >
  > (2) Scenario 2, the format of the configured web.conf is incorrect, and it is not a legal nginx configuration.Error lines are displayed in the component run log.The row in the Component Run Log will prompt the error.

- In the construction of the front-end vue project, the non-Taobao source is used but the private source is used. Because the private source requires authentication, the package 401 is obtained.

  > Add the .npmrc file in the project home directory, and set the private source key in the file, such as：\_auth=**\*\*\***

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
