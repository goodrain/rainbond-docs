---
title: 静态HTML
description: 静态Html语言类型Rainbond支持规范介绍
---

#### 静态 HTML 识别策略

平台默认会根据源码根目录是否有`index.html`文件来识别为静态语言项目.

#### 编译原理

1. 预编译处理完成后,会根据语言类型选择 static 的 buildpack 去编译项目.在编译过程中会安装定义的 Web 服务 Nginx 或者 Apache;
2. 编译完成后会检查是否在平台设置了 Procfile 参数,若配置了会重写启动命令配置文件 Procfile.

#### 静态语言项目源码规范

1. 源码程序必须托管在 gitlab 等相关 git 或者 svn 服务上
2. 源码根目录需要存在`index.html`文件

#### Procfile 规范

如果未定义 Procfile，会生成如下默认 Procfile

```bash
web: sh boot.sh
```

#### Web 服务支持

> 默认使用最新稳定版本 Nginx

##### 自定义 Nginx 配置

需要在源码根目录定义 nginx 配置文件：web.conf,默认配置文件为

```
server {
    listen       80;

    location / {
        root   /app/www;
        index  index.html index.htm;
    }
}
```

#### 示例代码

- [静态 Html 示例代码](https://github.com/goodrain/static-demo.git)
