---
title: Procfile文件
description: 讲解Procfile文件的用法
hidden: true
---

### Procfile介绍

Procfile 是Rainbond基于代码指定服务运行方式的策略。其本身是一个普通的文本文件，需要将其放到代码的根目录中，其内容是定义源码构建的服务运行起来的启动命令。通常情况下只包含一行信息即可，请看下面的例子：

- Java语言类型，定义启动命令运行War包

```bash
web: java -jar /opt/webapp-runner.jar --port $PORT --session-store redis ./*.war
```

- 直接执行二进制文件，例如nginx

```
web: vendor/bin/heroku-php-nginx
```

- 执行启动脚本，例如执行Maven生成的Tomcat Java Server脚本

```bash
web: sh target/bin/webapp
```

- 启动ruby项目

```bash
 bundle exec bin/rails server -p $PORT -e $RAILS_ENV
```
{{% notice info %}}
您可能注意到了 `$PORT` 这个环境变量，指定服务的监听端口。Rainbond运行服务时将自动通过用户设置的端口信息注入此环境变量。通过上诉类型的启动命令，实现服务监听端口的灵活配置。类似的机制还可以被使用到例如Tomcat启动等几乎所有语言服务类型中。


### Procfile格式说明

```bash
<服务类型>: <命令>
```

- <服务类型> : 目前仅支持 `web` 服务类型

- <命令> : 启动程序的命令行，执行的命令必须是前台运行。
