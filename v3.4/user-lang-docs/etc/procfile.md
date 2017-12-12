---
title: Procfile
summary: profile
toc: false
---
<div id="toc"></div>

&emsp;&emsp;Procfile是一种帮助用户在云帮上将自己编写的程序运行起来的描述文件。目前云帮只支持web类型的用户代码，后续会增加worker，clock等等各种类型的应用。

## procfile介绍

Procfile是普通的文本文件，需要将其放到代码的跟目录中，其内容是定义如何将程序运行起来。通常情况下只包含一行信息即可，请看下面的例子：

- Ruby on Rails 3 项目Procfile文件

```
   web: bundle exec rails server -p $PORT
```

- Clojure web 项目

```
   web: lein run -m demo.web $PORT
```
{{site.data.alerts.callout_danger}}您可能注意到了$PORT这个环境变量，它是为了在云帮上将您的应用添加到负载均衡的重要依据，如果不写该变量或者修改成其他的端口号，您的程序将无法在云帮跑起来。{{site.data.alerts.end}}

如果您在内网测试可以自行处理该变量。

- 执行Maven生成的Tomcat Java Server脚本:


```
   web: sh target/bin/webapp
```

## Procfile格式说明

```
<服务类型>: <命令>
```

<服务类型> – 英文字符串，目前可选的只有web，以后会添加worker, urgentworker, clock, 等类型。

<命令> – 启动程序的命令行。如：

```
 bundle exec bin/rails server -p $PORT -e $RAILS_ENV
```


{{site.data.alerts.callout_success}}

web类型的应用平台会将其添加到全局负载均衡以便公网的用户可以访问到。

{{site.data.alerts.end}}

## 本地运行

Procfile文件同样可以在本地使用，只需要您下载一个小的命令行工具[Foreman](http://blog.daviddollar.org/2011/05/06/introducing-foreman.html)，下面是安装方法：

| 系统                         | 安装                    |
| -------------------------- | --------------------- |
| Ruby (MRI, JRuby, Windows) | $ gem install foreman |
| Mac OS X                   | foreman.pkg           |

Foreman 可以读取Procfile文件的内容并运行起来。

本地运行Foreman的效果：

```
$ foreman start
18:06:23 web.1     | started with pid 47219
```

{{site.data.alerts.callout_danger}}使用Foreman跑起来的web服务会将$PORT变量设置为 5000 ，如果使用其他端口需要指定 -p 参数{{site.data.alerts.end}}

## 设置本地环境变量

如果要在本地启动程序之前设置环境变量，可以将环境变量写到代码根目录的.env文件中，这样利用Foreman启动的时候会自动加载。例如可以将RACK_ENV设置为 development ：

```
echo "RACK_ENV=development" >>.env
$ foreman run irb
> puts ENV["RACK_ENV"]
> development
```

{{site.data.alerts.callout_danger}}推荐将.env文件设置到git的忽略文件中，保持本地与线上的隔离。{{site.data.alerts.end}}

## 部署到云帮

在平台上并不是所有的开发语言都需要写 Procfile文件，我们尽量让用户做得最少且不改变已有的开发习惯。但针对特殊情况目前还是需要用户简单设置一下。

部分语言的web应用我们会用默认的命令行启动，但如果用户有需求，可以自己设置运行命令，如php语言默认是apache启动的，如果用户需要用nginx启动，可以在代码根目录创建Procfile文件，并添加启动命令：

```
web: vendor/bin/heroku-php-nginx
```

