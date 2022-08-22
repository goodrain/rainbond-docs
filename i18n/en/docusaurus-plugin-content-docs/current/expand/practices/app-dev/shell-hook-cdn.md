---
title: Front-end components use shell hook to connect to CDN for rapid deployment
Description: On the Rainbond platform, how to configure front-end components to connect to CDN using shell hooks
---


The suitable scenario of this document is to solve the problem of access delay caused by distribution, bandwidth and server performance, separate the dynamic and static of the：front-end project running on Rainbond, and use Alibaba Cloud CDN to accelerate the object storage of static resources in OSS to improve user access. speed.


Implementation Principle：Rainbond supports the source code construction of Nodejs front-end projects. After the project is built, static files (css, js, img, etc.) are automatically pushed to the object storage OSS through scripts, and the static resources in the object storage OSS are processed by Alibaba Cloud CDN. Accelerate, realize the separation of dynamic and static, and effectively improve the content loading speed.


<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.3/practices/app-dev/shell-hook-cdn/cdn_acceleration.jpg" title="Architecture diagram" width="60%" />

### Steps

Demo：Good Rain Technology Rainbond Front-end Open Source Project [Rainbond-ui](https://gitee.com/Aaron-23/rainbond-ui.git)

#### Push static files

npm is a package manager for Nodejs, which provides two hooks, pre and post. For any command defined in the scripts field of package.json, the pre and post name prefixes can be used to additionally define the extras before and after the task is executed. Hook command to execute.e.g.：

The script that needs to be executed after compilation is defined in "postbuild" `cdn_release.sh`

Project package.json file

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
    "postbuild": "./cdn_release. sh", #After executing npm install, automatically execute the script cdn_release.sh
    "image": "umi build && docker build -t registry.cn-hangzhou.aliyuncs.com/goodrain/rainbond-ui:V5.2.1- pre-release .",
    "site": "roadhog-api-doc static && gh-pages -d dist",
    "analyze": "cross-env ANALYZE=true roadhog build"
},
```




The script does two things：    
1. Install the OSS command-line tool ossutil,    
2. Push the static files compiled from the source code to OSS by date.

  - Use the environment variable`ENABLE_CDN`to control whether to enable CDN acceleration
  - Environment variable`CDN_ACCESS_KEY_ID``CDN_ACCESS_KEY_SECRET`Define Alibaba Cloud OSS account information

cdn_release.sh script

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
            wget http://gosspublic.alicdn.com/ossutil/1.6.3 /ossutil64 -O ${osstool}
        fi
        chmod +x ${osstool}
        cat >~/.ossutilconfig <<EOF
[Credentials]
language=CH
endpoint=http://oss-cn-shanghai.aliyuncs.com
accessKeyID=${CDN_ACCESS_KEY_ID}
accessKeySecret =${CDN_ACCESS_KEY_SECRET}
EOF
    fi
}

if [ "${ENABLE_CDN}" == 'true' ]; then
    echo "Upload static file to oss"
    osstool_install
    now_day=$(date '+%Y-%m-%d')
    ${osstool} mkdir "oss: //grstatic/cdn-demo/publish/${now_day}/"
    ${osstool} cp -u -r dist/ "oss://grstatic/cdn-demo/publish/${now_day}/"
fi
```

#### define access path

After static resources are pushed to OSS, you need to modify the project css, js, and img resource access paths. Otherwise, subsequent client requests will still be sent to the origin site.

The environment variable`ENABLE_CDN`is still used for control. If the value of the environment variable is detected to be true during the compilation process, the access path is the static resource file in OSS.

Project config.js file

```bash
import defaultSettings from '../src/defaultSettings';
import routerConfig from './router.config';
import moment from 'moment';

const dayFormat = moment(new Date())
  .locale('zh- cn')
  .format('YYYY-MM-DD');
let publcPath = '/static/dists/';
if (process.env.SEPARATION === 'true') {
  publcPath = `/` ;
}
if (process.env.ENABLE_CDN === 'true') {
//If the value of the ENABLE_CDN environment variable is true, the path is as follows
  publcPath = `https://static.goodrain.com/cdn- demo/publish/${dayFormat}/`;
}
```

Use this project to compile in the platform, add the following environment variables during the compilation process

| environment variable            | value | Introduction                    |
| ------------------------------- | ----- | ------------------------------- |
| BUILD_ENABLE_CDN              | true  | Whether to enable CDN           |
| BUILD_CDN_ACCESS_KEY_ID     |       | Alibaba Cloud OSS Access key    |
| BUILD_CDN_ACCESS_KEY_SECRET |       | Alibaba Cloud OSS Access secret |


#### Alibaba Cloud CDN accelerates OSS resources

Refer to [Accelerating OSS resources through CDN](https://help.aliyun.com/document_detail/123227.htm?spm=a2c4g.11186623.2.27.5c875e2cUFETjd#task-1937766) to configure Alibaba Cloud CDN and cache static resources. After the configuration is complete, clients will preferentially obtain css, js, and img resources from CDN.



<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.3/practices/app-dev/shell-hook-cdn/cdn_domain.png" title="Access page effects" width="100%" />