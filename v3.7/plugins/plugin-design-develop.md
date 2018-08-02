---
title: 插件设计与开发
summary: 分类讲解插件的制作流程
toc: false
asciicast: true
---

<div class="filters filters-big clearfix">
    <a href="plugin-design-develop.html"><button class="filter-button">入口网络插件</button></a>
</div>

<div id="toc"></div>

## 什么是入口网络插件
入口网络插件是指云帮中为用户提供的一系列应用增强功能，比如，当我们部署了一个web应用后，我们不希望有不合法的请求（比如SQL注入）到达web中，这时我们可以为web应用安装一个安全插件，用来控制所有访问web的请求，就像是一个入口控制器，所以我们把这类插件叫做入口网络插件。

## 工作原理
当为某个应用安装了入口网络插件后，该插件被置于应用的前面，它会监听一个由云帮分配的新端口用来拦截应用的所有请求，如下图中的8080端口，这时我们可以在插件内部对收到的请求进行必要的处理，然后把处理后的请求转发给应用监听的端口，如下图中的80端口。入口网络插件与应用的关系如下图所示：

![](http://grstatic.oss-cn-shanghai.aliyuncs.com/images/other/net-ingress-plugin.png)


## 开始制作插件
插件是以容器形式运行在云帮上的，所以制作插件就是制作一个可运行的镜像，可参考[防火墙插件](https://github.com/goodrain-apps/waf-plugin-naxsi)。

### 1.安装nginx
因为插件的功能涉及到监听端口和请求转发，这正是nginx所擅长的，所以我们先编写一个Dockerfile，并在容器中要安装一个nginx。

### 2.配置nginx
当我们为应用安装了一个插件后，云帮会自动为插件分配一个端口，并且应用的所有请求在到达应用之前都会先到达该端口，这些端口相关的信息可以通过node组件的RESTFUL API获取到，而该API地址会被注入到插件的环境变量中。

我们现在需要从API中获取端口信息然后写入到nginx的配置文件中，这部分工作可以通过[confd服务](https://github.com/goodrain/plugin-discover-config)来自动完成，confd服务的启动比较简单：

```
confd --template ./nginx.conf.template --out ./nginx.conf &
```

confd服务完成的事情如下：

1. 从环境变量`DISCOVER_URL`获取API地址
1. 循环请求API得到端口信息，如果信息有变化则进行下面的步骤
1. 修改`nginx.conf.template`文件中的监听端口号和应用端口号，然后覆盖`nginx.conf`文件
1. 通知nginx重新加载配置

### 3.新建插件
将写好的Dockerfile和其它依赖的文件上传到代码仓库中，登录云帮的控制台，进入我的插件页面，点击新建插件，插件类型选择入口网络，用刚才上传的项目来创建一个插件，最后点击构建插件等待完成。

### 4.配置插件
新建插件以后，我们可以为插件增加一些配置项，比如是否开启过滤请求功能，是否对某个IP做特殊限制等等，这些配置项在我们调前面说的API的时候可以获取到，这样就可以在插件中做出相应的处理。在构建页面的下方找到配置组管理模块，点击新增配置，在弹出的对话框中选择应用端口，然后填写配置项与对应的值等等，最后点击确定。
