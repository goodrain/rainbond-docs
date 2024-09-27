---
title: Procfile
description: Explain the usage of Procfile file
---

### Introduction to Procfile

A Procfile is Rainbond's code-based strategy for specifying how a service should run.It is an ordinary text file, which needs to be placed in the root directory of the code, and its content is the startup command that defines the running of the service built from the source code.Usually only one line of information is enough, see example：below其本身是一个普通的文本文件，需要将其放到代码的根目录中，其内容是定义源码构建的服务运行起来的启动命令。通常情况下只包含一行信息即可，请看下面的例子：

- Java language type, defines the startup command to run the War package

```bash
web: java -jar /opt/webapp-runner.jar --port $PORT --session-store redis ./*.war
```

- Execute binaries directly, such as nginx

```
web: vendor/bin/heroku-php-nginx
```

- Execute startup scripts, such as Maven-generated Tomcat Java Server scripts

```bash
web: sh target/bin/webapp
```

- start the ruby project

```bash
 bundle exec bin/rails server -p $PORT -e $RAILS_ENV
```

您可能注意到了 `$PORT` 这个环境变量，指定服务的监听端口。Rainbond 运行服务时将自动通过用户设置的端口信息注入此环境变量。通过上述类型的启动命令，实现服务监听端口的灵活配置。类似的机制还可以被使用到例如 Tomcat 启动等几乎所有语言服务类型中。

### Procfile format description

```bash
<Service Type>: <Command>
```

- <服务类型> : Currently only `web` service type is supported

- <命令> : The command line to start the program, the executed command must be running in the foreground.
