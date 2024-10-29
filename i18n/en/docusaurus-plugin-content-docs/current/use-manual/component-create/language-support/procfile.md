---
title: Procfile
description: Explain the usage of Procfile file
---

### Introduction to Procfile

A Procfile is Rainbond's code-based strategy for specifying how a service should run.It is an ordinary text file, which needs to be placed in the root directory of the code, and its content is the startup command that defines the running of the service built from the source code.Usually only one line of information is enough, see example：belowIt is itself a normal text file that needs to be placed in the root of the code, the content of which is the launch command that defines the service built by the source code.Usually only one line of information is available, see the example： below

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

您可能注意到了 `$PORT` 这个环境变量，指定服务的监听端口。Rainbond will automatically inject this environment variable through port information set by the user when running the service.Flexible configuration of service listener ports through the above type of launch command.Similar mechanisms can also be used in almost all language service types, such as Tomcat launch.

### Procfile format description

```bash
<Service Type>: <Command>
```

- \<服务类型> : Currently only `web` service type is supported

- \<命令> : The command line to start the program, the executed command must be running in the foreground.
