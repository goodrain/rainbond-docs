
---
title: 管理后台安装
summary: 管理后台如何安装
toc: false
---  

## 管理后台安装配置

### 安装

#### 源码安装

先安装python运行环境，详情[python开发环境搭建](http://www.runoob.com/python/python-install.html)。安装完成后,进入代码根目录再以diango的运行方式启动即可。

```
python manage.py runserver 0.0.0.0:8000
```

### docker方式运行


* 进入代码根目录。使用`docker build` 生成镜像。
* 使用`docker run` 命令运行，注意将5000端口映射并持久化`/volume` 目录。

### 配置

管理后台只需2个环境变量即可

`CONSOLE_URL`：该环境变量为云帮控制台访问地址，如`http://console.goodrain.me`

`MANAGE_SECRET_KEY`：该环境变量为管理后台访问云帮的临时key,可以随意填写，不过需要和云帮控制台保持一致。云帮控制台也需要添加此环境变量，并且值和在此处填写的值一样。




