---
title: 部署ThinkPHP框架程序
description: 在云帮部署ThinkPHP框架程序
hidden: true
draft: true
prehidden: true
---

## 前言

&emsp;&emsp;云帮支持源码及各种框架的自动识别和自动部署，我们可以直接提交`github`的仓库地址，也可以将代码提交到 **好雨git** 代码仓库。

## 代码构建

云帮会根据`composer.json`的配置进行依赖的下载构建，如下面我们给出的示例，我们推荐您使用`php5.6`以上的版本可以更好的支持`ThinkPHP5`。

`composer.json`文件示例：



```json
{
    "name": "topthink/think",
    "description": "the new thinkphp framework",
    "type": "project",
    "keywords": [
        "framework",
        "thinkphp",
        "ORM"
    ],
    "homepage": "http://thinkphp.cn/",
    "license": "Apache-2.0",
    "authors": [
        {
            "name": "liu21st",
            "email": "liu21st@gmail.com"
        }
    ],
    "require": {
        "php": ">=5.6.0",
        "topthink/framework": "^5.0.4",
        "topthink/think-captcha": "^1.0.7",
        "topthink/think-testing": "^1.0"
    }, 
    "extra": {
        "think-path": "thinkphp"
    },
    "config": {
        "preferred-install": "dist"
    }
}
```


如果代码的根目录下有`composer.lock`文件，务必删掉，否则平台将从这里读取版本信息。云帮在构建的过程中会自动生成这个文件。



### 多个composer.json

某项目大概结构如下：
 
```
index.php
composer.json
app/
vendor/
vendor/topthink/
vendor/topthink/think-captcha/
vendor/topthink/think-captcha/
vendor/topthink/think-captcha/composer.json
```

默认`composer.json`为主配置文件，不会去依赖加载次级目录下的`vendor/topthink/think-captcha/composer.json`文件。需在根目录下的主配置文件`composer.json`里添加

```json
"config": {
        "preferred-install": "dist"
    },
# 添加如下：
"scripts":{
	"composer install": "vendor/topthink/think-captcha"
    }
```

## web服务器的选择

您无需自已安装和配置web服务器，云帮会自动提供`apache`和`nginx`服务器供您选择使用，因为ThinkPHP框架会使用`.htaccess`文件来自定义`apache`的跳转规则，所以您应该选择`apache`做为web服务器。

## 设置Document Root

入口文件位于`public/index.php`，入口文件位置的设计是为了让应用部署更安全，`public`目录为web可访问目录，其他的文件都可以放到非`WEB`访问目录下面。

很多用户的应用并不是将代码跟目录作为Web Server的主目录，例如`ThinkPHP5`框架要求`Document root`是 `public`目录。这就需要我们将`Document root`设置到 跟目录中下的`public`二级目录中。

配置的方法是在代码的根目录下写一个`Procfile`文件，内容如下：

```bash
web: vendor/bin/heroku-php-apache2 public/
```

这段配置是告诉平台用`apache`来做为web服务器，并将`public`目录做为web根目录。