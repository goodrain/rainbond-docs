---
title: NodeJS前端类代码源码构建
summary: NodeJS前端类代码源码构建
toc: true
---

## 一、准备工作

在此步骤中，您将准备一个可以部署的简单应用程序，至少需要满足前3个条件: 

- 本地可以正常运行部署的Nodejs程序  
- 项目可以托管到git仓库或svn代码仓库
- 项目根目录下必须存在`package.json`,用来管理Nodejs项目的依赖,也是Rainbond识别为NodeJS前端项目的必要条件  
- 项目根目录下必须存在`nodestatic.json`,用来定义Nodejs前端项目相关配置,也是Rainbond识别为NodeJS前端项目的必要条件

你可以直接使用示例代码 : [Node.js前端示例代码](https://github.com/goodrain/rainbond-ui.git)

## 二、代码识别

1. 代码的根目录下必须有`package.json`文件，如果不存在请手动或使用 `npm init` 命令创建并配置需要的依赖和其它信息。
2. 代码的根目录下必须有`nodestatic.json`文件，如果不存在请手动配置

```
# cat nodestatic.json
{"path":"<编译后路径>"}
```

## 三、版本支持

#### 3.1 Node支持版本

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

关于Node方面具体可以参考[通过Node.JS源码创建](./nodejs.html)

#### 3.2 Web服务支持

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