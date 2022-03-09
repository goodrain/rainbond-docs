---
title: 前端组件使用shell hook对接CDN快速部署
Description: 在Rainbond平台上，前端组件如何配置使用shell hook对接CDN
---


本文档适合的场景是：解决因分布、带宽、服务器性能带来的访问延迟问题，将运行于 Rainbond 的 Nodejs 前端项目进行动静分离，通过 阿里云CDN 加速 对象存储OSS 中的静态资源，提升用户访问速度。


实现原理：Rainbond 支持 Nodejs 前端项目的源码构建，在项目构建结束后通过脚本自动将静态文件（css，js，img等）推送至 对象存储OSS ，使用阿里云 CDN 对 对象存储OSS 中的静态资源进行加速，实现动静分离，有效提升内容加载速度。


<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.3/practices/app-dev/shell-hook-cdn/cdn_acceleration.jpg" title="架构图" width="60%" />

### 操作步骤

Demo：好雨科技 Rainbond 前端开源项目 [Rainbond-ui](https://gitee.com/Aaron-23/rainbond-ui.git)

#### 推送静态文件

npm 是 Nodejs 的包管理器，提供了 pre 和 post 两种钩子，对于任何在 package.json 的 scripts 字段中定义的命令，可以通过 pre 以及 post 名称前缀，额外定义该任务在执行前、后的额外执行的钩子命令。例如：

"postbuild" 中定义了在编译后需要执行的脚本 `cdn_release.sh`

项目package.json文件

```bash
{
  "name": "rainbond-ui",
  "version": "5.3.0",
  "description": "rainbond front-end project.",
  "private": true,
  "scripts": {
    "start": "umi dev",
    "start:no-mock": "cross-env MOCK=none umi dev",
    "build": "umi build",
    "postbuild": "./cdn_release.sh", #在执行npm install之后，自动执行脚本cdn_release.sh
    "image": "umi build && docker build -t registry.cn-hangzhou.aliyuncs.com/goodrain/rainbond-ui:V5.2.1-pre-release .",
    "site": "roadhog-api-doc static && gh-pages -d dist",
    "analyze": "cross-env ANALYZE=true roadhog build"
  },
```
  
  

 
该脚本做了两件事：    
1.安装 OSS 命令行工具 ossutil ，    
2.将源码编译后的静态文件以日期分割推送至OSS

  - 使用环境变量`ENABLE_CDN`控制是否开启CDN加速
  - 环境变量`CDN_ACCESS_KEY_ID``CDN_ACCESS_KEY_SECRET`定义阿里云OSS账户信息

cdn_release.sh脚本

```bash
#!/bin/bash
osstool="./ossutil64"
os=$(uname -s)
osstool_install() {
    if [ ! -f ${osstool} ]; then
        echo "installing ossutil binary"
        if [ "$os" == "Darwin" ]; then
            wget http://gosspublic.alicdn.com/ossutil/1.6.14/ossutilmac64 -O ${osstool}
        else
            wget http://gosspublic.alicdn.com/ossutil/1.6.3/ossutil64 -O ${osstool}
        fi
        chmod +x ${osstool}
        cat >~/.ossutilconfig <<EOF
[Credentials]
language=CH
endpoint=http://oss-cn-shanghai.aliyuncs.com
accessKeyID=${CDN_ACCESS_KEY_ID}
accessKeySecret=${CDN_ACCESS_KEY_SECRET}
EOF
    fi
}

if [ "${ENABLE_CDN}" == 'true' ]; then
    echo "Upload static file to oss"
    osstool_install
    now_day=$(date '+%Y-%m-%d')
    ${osstool} mkdir "oss://grstatic/cdn-demo/publish/${now_day}/"
    ${osstool} cp -u -r dist/ "oss://grstatic/cdn-demo/publish/${now_day}/"
fi
```

#### 定义访问路径

静态资源推送至OSS以后，需要修改项目 css，js，img 资源访问路径，否则后续客户端的请求依然会发送至源站。

依然采用环境变量`ENABLE_CDN`的方式进行控制，如果在编译过程中检测到该环境变量值为true，则访问路径为OSS中的静态资源文件。

项目config.js文件

```bash
import defaultSettings from '../src/defaultSettings';
import routerConfig from './router.config';
import moment from 'moment';

const dayFormat = moment(new Date())
  .locale('zh-cn')
  .format('YYYY-MM-DD');
let publcPath = '/static/dists/';
if (process.env.SEPARATION === 'true') {
  publcPath = `/`;
}
if (process.env.ENABLE_CDN === 'true') {
//如果ENABLE_CDN环境变量的值为true，则路径如下
  publcPath = `https://static.goodrain.com/cdn-demo/publish/${dayFormat}/`;
}
```

使用该项目在平台中进行编译，编译过程中添加以下环境变量

|环境变量|值|简介|
| --- | --- | --- |
|BUILD_ENABLE_CDN|true|是否开启CDN|
|BUILD_CDN_ACCESS_KEY_ID||阿里云OSS Access key|
|BUILD_CDN_ACCESS_KEY_SECRET||阿里云OSS Access secret |


#### 阿里云CDN加速OSS资源

参考 [通过CDN加速OSS资源](https://help.aliyun.com/document_detail/123227.htm?spm=a2c4g.11186623.2.27.5c875e2cUFETjd#task-1937766) 进行阿里云CDN的配置，对静态资源进行缓存，配置完成后客户端访问 css，js，img 资源时将会优先从CDN获取。



<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.3/practices/app-dev/shell-hook-cdn/cdn_domain.png" title="访问页面效果" width="100%" />