---
title: 服务操作
summary: 服务的其他设置
toc: true
asciicast: true
---


## 服务其他设置

服务的其他功能，包括更多的服务信息、自动部署、健康检查等高级功能都在 服务的 【设置】页面中，下文会对每一块功能做详细介绍。

### 1.1 服务基础信息

服务基础信息显示了服务当前的版本信息、来源及状态，不同类型的服务显示的内容也会有所不同，并且在基础可以改变应用的部署类型，给服务添加标签，构建后是否自动升级等；只有在服务是有状态的情况下，才可以设置服务名称属性：

<center>
<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/user-manual/1544407006124.jpg" width="80%" />
</center>

<center>
<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/user-manual/team-operation.gif" width="80%" />
</center>


{{site.data.alerts.callout_info}}

- 只有通过源码构建的服务才显示Git/Svn仓库地址和分支信息
- Docker镜像、Docker Run命令和Docker compose的方式创建的服务会显示镜像地址和版本

{{site.data.alerts.end}}


### 1.2 自定义环境变量

当你通过服务【设置】中的自定义环境变量，添加变量时，服务下次启动会加载这些环境变量。

通常情况下，我们将配置信息写到配置文件中供程序读取使用，在Rainbond平台中，我们<b>极力推荐</b>使用环境变量的方式来代替传统的配置文件的方式。

这样做的好处如下：

- 将配置信息与服务绑定，与代码解耦，摆脱不同环境下切换配置文件的麻烦
- 敏感信息与代码分离，避免程序漏洞造成数据丢失
- 省去配置管理的工作

下面是一个生产环境的服务使用环境变量进行配置的截图：

<center>
<img src="https://static.goodrain.com/images/docs/3.6/user-manual/manage/custom-env.png" width="90%" />
</center>

以Python为例介绍在配置读取环境变量的方法：

```python
# -*- coding: utf8 -*-
import os

DEBUG = os.environ.get('DEBUG') or False

TEMPLATE_DEBUG = os.environ.get('TEMPLATE_DEBUG') or False

DEFAULT_HANDLERS = [os.environ.get('DEFAULT_HANDLERS') or 'zmq_handler']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'goodrain',
        'USER': os.environ.get('MYSQL_USER'),
        'PASSWORD': os.environ.get('MYSQL_PASSWORD'),
        'HOST': os.environ.get('MYSQL_HOST'),
        'PORT': os.environ.get('MYSQL_PORT'),
    }
}
...
```



基于环境变量除了可以定义上诉所述的用于应用运行的变量以外，还能作为服务编译、服务调度运行的参数指定方式，更多请查看 [环境变量的高级用法](/docs/stable/user-manual/app-manage/app-env.html)

关于动态值环境变量：

> 环境变量的值可以基于已存在环境变量的值解析，如果环境变量的值中出现 ${XXX}，平台将尝试查找XXX环境变量的值来替换此字符串，若无法找到具有值的XXX变量，将不做更改。 
>
> 为防止出现无法被解析的情况，可以定义为${XXX:yy}的形式，`:`以后的将作为未成功解析的默认值。
>
> 例如有已存在环境变量 A=1，环境变量B需要使用A的值，直接定义B=${A}。

### 1.3 健康检查

为了了解服务启动后的服务是否可用，已经服务运行中的服务运行情况，我们增加了服务检查的功能：

- 启动时检查

> 服务启动时的健康检查，用户可根据服务的协议、端口自定义设置监控选项。如果达到检查的阈值的实例，将被设置为不健康状态，继而从应用网关或ServiceMesh层下线。

<b>服务启动时检查配置示例</b>

<center>
<img src="https://static.goodrain.com/images/docs/3.6/user-manual/manage/app-check-on-startup.png" width="80%" />
</center>

> 示例配置：当容器启动2秒后，开始对 5000 端口进行 tcp 协议的第一次检查，如果等待20秒检查没有结果，平台会重启服务，如果20秒内成功返回，平台认为服务启动成功。

- 运行时检查

> 服务运行时的监控检查，用户可根据服务的协议、端口自定义设置监控选项。如果达到检查的阈值，平台会重启服务（生产环境谨慎设置）

<b>服务运行时检查配置示例</b>

<center>
<img src="https://static.goodrain.com/images/docs/3.6/user-manual/manage/app-check-on-running.png" width="80%" />
</center>

> 示例配置：当服务成功启动后，等待20秒，针对5000端口，tcp协议进行第一次检查，每隔3秒检查一次，检查超时时间20秒，如果连续三次检查都失败，平台会重启服务。

### 1.4 成员服务权限

关于角色权限定义的文档请参考：<a href="../../user-registration-login/user-manage.html">用户管理</a>

这里主要讲的是服务权限的管理，当某个用户加入到团队时，团队管理员决定该用户的角色，如果要限制某个用户只能管理某些服务，建议使用 `Viewer(观察者)` 角色，然后根据需要在服务的 【成员服务权限】中设置服务的管理权限。

### 1.5 删除服务

平台提供服务永久删除功能，服务删除后，服务信息会从控制台和数据中心数据库中删除，持久化数据暂时保留。

目前还没有恢复删除服务的功能，请谨慎使用该功能。

<img src="https://static.goodrain.com/images/docs/3.6/user-manual/manage/delete-app.gif" width="100%" />