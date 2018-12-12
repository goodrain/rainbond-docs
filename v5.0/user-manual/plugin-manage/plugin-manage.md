---
title: 插件管理
summary: 用户针对插件可以做哪些操作
toc: true
asciicast: true
---
本文讲解插件的行为，也就是说用户可以对插件做哪些控制。

## 一、插件的定义
应用插件是标准化的为应用提供功能扩展，与应用共同运行的程序
## 二、创建插件

####2.1 开始制作插件
插件是以容器形式运行在云帮上的，所以制作插件就是制作一个可运行的镜像，可参考[防火墙插件](https://github.com/goodrain-apps/waf-plugin-naxsi)。

#### 2.2 安装nginx
因为插件的功能涉及到监听端口和请求转发，这正是nginx所擅长的，所以我们先编写一个Dockerfile，并在容器中要安装一个nginx。

#### 2.3 配置nginx
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

#### 2.5 新建插件
将写好的Dockerfile和其它依赖的文件上传到代码仓库中，登录云帮的控制台，进入我的插件页面，点击新建插件，插件类型选择入口网络，用刚才上传的项目来创建一个插件，最后点击构建插件等待完成。

#### 2.6 配置插件
新建插件以后，我们可以为插件增加一些配置项，比如是否开启过滤请求功能，是否对某个IP做特殊限制等等，这些配置项在我们调前面说的API的时候可以获取到，这样就可以在插件中做出相应的处理。在构建页面的下方找到配置组管理模块，点击新增配置，在弹出的对话框中选择应用端口，然后填写配置项与对应的值等等，最后点击确定。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/user-manual/team-operation6.gif" width="100%">

## 三、插件的使用
创建好插件后，如需在服务商使用该插件，需要去服务详情页面的`插件`页面开通插件即可
<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/user-manual/team-operation7.gif" width="100%">

## 四、插件的分享
插件与应用一样，都可以分享和安装，需注意只有构建完成的插件才可以分享，分享的流程和应用相同
<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/user-manual/team-operation8.gif" width="100%">