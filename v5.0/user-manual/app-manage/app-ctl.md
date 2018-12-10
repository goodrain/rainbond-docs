---
title: 服务操作
summary: 用户针对服务可以做哪些操作
toc: true
asciicast: true
---

本文讲解服务的行为，也就是说用户可以对服务做哪些控制。

## 一、服务基本操作

构建、启动、关闭、重启、更新、删除和访问是服务最基本和最常用的操作，根据服务的[不同状态](app-properties.html#part-f217864b95b2f14e)，用户可以执行不同的操作，下面会针对每一个操作介绍功能和操作后所触发的事件。

### 1.1 构建

> 适用场景：服务的任何状态（除应用市场安装的服务且该服务在应用市场无更新）

针对不同类型的服务，触发 `构建` 操作后，有着不同的含义，下表针对不同类型的服务加以说明：

| 服务类型        | 说明                                                                                                                                               |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| 各语言源代码    | 拉取最新源代码，通过[rbd-chaos](../../architecture/architecture.html#chaos-ci)调用[builder](https://github.com/goodrain/builder)进行构建，上线服务 |
| Dockerfile 源码 | 拉取最新源代码，通多 docker build 创建 Docker 镜像，push 镜像到内部镜像仓库，上线服务                                                              |
| Docker 镜像     | 重新拉取指定镜像地址的镜像，推送到本地镜像仓库，上线服务                                                                                           |
| 云市应用        | 重新拉取云市服务镜像/服务包，推送到本地镜像仓库，上线服务                                                                                          |

{{site.data.alerts.callout_info}}

- Dockerfile 源码类服务就是将 Dockerfile 及所需要的文件放到 代码仓库（Git/Svn），通过源代码创建的服务。
- 构建后，如果一切顺利，服务会自动切换为新版本并上线，构建操作默认并更新升级，也可在其他设置中去设置构建后不升级流程。
- 单节点服务构建后服务会有 3~10 秒的中断（根据服务启动时间），多节点服务不受影响。
- 处于关闭状态的服务，触发构建操作后，如果构建正常，平台会将服务运行起来。

{{site.data.alerts.end}}

### 1.2 启动

> 使用场景：首次构建成功，并处于关闭状态的服务

启动操作会启动上一次成功构建的镜像，如果运行正常会自动上线。

启动后可以在服务概览页面的 `操作日志` 看到平台调度与处理服务的详细操作日志，当调度完成后，服务就进入启动阶段，这时候可以通过 `日志` 页面查看服务的启动日志。

- 服务概览页的操作日志
  <img src="https://static.goodrain.com/images/docs/3.6/user-manual/manage/app-start-log01.png" width="100%" />

* 服务日志页面
  <img src="https://static.goodrain.com/images/docs/3.6/user-manual/manage/app-start-log02.png" width="100%" />

### 1.3 关闭

> 使用场景：运行中或运行异常的服务

触发关闭操作后，平台会将服务的从负载均衡下线并关闭服务容器，多个节点的服务会滚动下线。

### 1.4 重启

> 使用场景：运行中或运行异常的服务

触发重启操作后，平台会将现有的服务重启，对于无状态服务，重启过程滚动进行，有状态服务，将关闭全部实例后再启动。

{{site.data.alerts.callout_danger}}

- 重启服务并不会更新服务代码或镜像，需要和`构建`操作区分。
- 重启操作会中断有状态服务和单节点无状态应用的服务。

{{site.data.alerts.end}}

### 1.5 访问

> 使用场景：运行中的服务 && （打开了对外服务 | 对内服务的端口）

针对不同协议的服务，点击访问按钮后所触发的命令也不一样：

| 服务协议 | 点击访问按钮后的操作                                                           |
| -------- | ------------------------------------------------------------------------------ |
| HTTP     | 浏览器新开窗口，打开服务的默认域名，如果绑定多个域名，会显示域名列表供用户选择 |
| TCP      | 弹出访问信息窗口                                                               |

- HTTP 协议服务

<img src="https://static.goodrain.com/images/docs/3.6/user-manual/manage/app-open-http.gif" width="85%" />

- TCP 协议服务

<img src="https://static.goodrain.com/images/docs/3.6/user-manual/manage/app-open-tcp.gif" width="85%" />

### 1.6 更新

> 使用场景：运行中服务

触发更新操作后，平台会将现有的服务更新，发送更新请求给数据中心，会升级到最新的服务状态，即改变了某个环境变量或连接信息，都可以触发`更新`操作来处理。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/user-manual/1544171271240.jpg" width="85%" />

### 1.7 删除

> 使用场景：关闭状态下的服务

`删除`是将平台现有的改服务进行删除，如果您想要废弃改服务，可以将其删除，`删除`服务会将和该服务相关的其他设置一起删除，例如：域名，服务与应用关系，环境变量等等。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/user-manual/1544171708320.jpg" width="85%" />


## 二、回滚服务到指定版本

服务每次成功部署后，都会生成一个服务版本，每个版本对应一次代码提交（基于源码创建），或者一个镜像（Docker 镜像创建）。

通过 `构建版本管理` 功能，可以将服务回滚到指定版本。

- 构建版本管理

<img src="https://static.goodrain.com/images/docs/3.6/user-manual/manage/app-rollback01.png" width="100%" />

- 回滚到指定版本
  <img src="https://static.goodrain.com/images/docs/3.6/user-manual/manage/app-rollback02.png" width="100%" />

{{site.data.alerts.callout_danger}}

- 回滚操作是关闭现有版本服务，再启动其他版本服务的过程，本质上是一个服务重启的操作，因此针对单节点服务会中断服务。
- 多节点服务回滚操作采用滚动升级方式，因此时不会影响服务，但会有较短的时间同时存在 2 种版本的情况。

{{site.data.alerts.end}}

## 三、伸缩服务

平台服务有两种伸缩方式：

- 垂直伸缩：增加或减少服务的内存（服务 CPU 与内存是联动的，按照一定的[比例调整](#3-1-cpu)）
- 水平伸缩：增加或减少服务的实例数

<img src="https://static.goodrain.com/images/docs/3.6/user-manual/manage/app-scaling01.png" width="100%" />

{{site.data.alerts.callout_danger}}

- 垂直伸缩时平台会自动调整资源后重启服务，单节点服务会中断，多节点服务不受影响。
- 水平伸缩时平台通过滚动新增或者下线节点的方式进行操作，因此操作不会影响现有服务。

{{site.data.alerts.end}}

### 3.1 垂直伸缩 CPU 与内存比例关系

| 申请值比例（CPU/内存） | 限制值比例（CPU/内存) |
| ---------------------- | --------------------- |
| 0.24/1                 | 1.28/1                |

{{site.data.alerts.callout_info}}

- Kubernetes 针对 CPU 和内存分为申请值与限制值，详情参见: [管理容器的计算资源](https://kubernetes.io/cn/docs/concepts/configuration/manage-compute-resources-container/)
- 平台目前调整的 CPU 与内存占比是经过生产环境验证过，目前平台还没有提供修改占比的方式, 如果想修改团队的资源配额，需在资源管理后台设置。

{{site.data.alerts.end}}

## 四、添加服务存储

### 4.1 服务为什么要添加存储

服务是平台的抽象概念，底层是通过容器封装运行起来的，容器默认是没有存储的，也就是说，在容器中的程序在运行过程中的日志、生成或处理的文件，一旦容器关闭或重启，之前生成或存储的文件就丢失了。

因此，为了保存程序运行中的文件，需要给容器挂载一个存储，在 rainbond 中，只要给服务挂载一个存储，即使服务水平扩展几十上百个节点，平台都会自动挂载。

### 4.2 如何为服务添加存储

为服务添加存储有两种方式：

- <b>(1) 新增服务存储</b>

找到 【存储】页面

<img src="https://static.goodrain.com/images/docs/3.6/user-manual/manage/app-storage01.png" width="100%" />

点击 【添加持久化】按钮

<img src="https://static.goodrain.com/images/docs/3.6/user-manual/manage/app-storage02.png" width="60%" />

存储添加完成

<img src="https://static.goodrain.com/images/docs/3.6/user-manual/manage/app-storage03.png" width="100%" />

- <b>(2) 挂载其他服务的存储</b>

在【存储】页面找到 【挂载目录】
<img src="https://static.goodrain.com/images/docs/3.6/user-manual/manage/app-storage04.png" width="100%" />

点击【挂载目录】按钮后，勾选需要挂载其他服务的名称，并填写挂载到本服务的目录
<img src="https://static.goodrain.com/images/docs/3.6/user-manual/manage/app-storage05.png" width="90%" />

完成挂载其他服务存储

<img src="https://static.goodrain.com/images/docs/3.6/user-manual/manage/app-storage06.png" width="100%" />

{{site.data.alerts.callout_danger}}

- 新增或挂载其他服务的存储后，需要重启服务，挂载其他服务的存储不支持挂载到有状态的服务。
- 新增或挂载其他服务存储时，本服务的路径不能使用 Linux 系统保留目录，如：/dev、/usr、/bin、/sys、/proc 等

{{site.data.alerts.end}}

## 五、服务端口与域名管理

### 5.1 服务端口管理

端口相关的管理包含，端口号，端口协议，端口访问控制、对内服务端口变量设置等操作，下图是不同团队、不同端口的服务开启了不同访问控制后的示意图：

<img src="https://static.goodrain.com/images/docs/3.6/user-manual/manage/port-manage.png" width="100%" />


#### 端口号设置

服务端口与容器内部程序监听的端口是完全对应的关系，也就是说，当程序启动后监听的端口是80，那服务的端口就应该设置为80。

可以通过【添加端口】功能为服务添加其他的端口，需要确保添加的端口与程序监听的端口一致，并选择对应的端口协议。

#### 端口协议
端口可以指定不同的协议类型，目前Rainbond支持 `HTTP`、`TCP`、`UDP`和 `MySQL` 协议，请确保选择的协议与你程序监听的协议一致。

协议的选择会影响服务的后续操作：

- 性能分析功能
> 不同协议的服务启动了[性能分析插件](../../plugins/lists/performance-analysis.html)后，其性能分析的方式会有所不同，如HTTP协议会分析HTTP相关的数据，MySQL协议会分析MySQL语句相关的数据。

- 打开对外服务后的访问
> 当端口打开对外服务后，HTTP协议会<b>分配默认的域名</b>，非HTTP协议会<b>分配IP+端口</b>的访问方式

#### 端口访问控制

端口的访问控制分为两类：

- 对内服务
> 开启租户网络内部的访问许可，这时，该团队内部的服务可以通过【添加依赖服务】的方式访问到该服务。

- 对外服务
> 打开对外服务后，平台会将该<b>服务映射的端口添加到全局负载均衡</b>，这时<b>平台外部</b>以及<b>平台内部其他团队的服务</b>都可以通过负载均衡分配的域名或IP访问到该服务。

{{site.data.alerts.callout_info}}

- 修改端口信息后需要更新服务。
- 端口打开对内服务后，其他服务要想连接到该服务，需要先【添加依赖服务】建立关联，然后通过<b>连接地址或环境变量</b>连接。
- 端口访问控制可以根据需要开启和关闭，可单独开启，也可以全部开启，如果服务是个worker程序，只需要连接别的服务，本身没有端口监听就没有必要开启端口访问。

{{site.data.alerts.end}}

### 5.2 服务域名管理

Rainbond为每一个HTTP服务自动生成一个默认的域名，一般情况下这个域名都比较长，不方便记忆。你可以通过下面两种方式修改默认域名：

- 修改默认域名：修改服务默认生成的域名前缀，主域名是安装云帮时生成或指定的。
- 绑定新域名：为服务指定一个新域名，绑定完成后，需要在你的DNS域名服务商的那里设置一下<a href="https://baike.baidu.com/item/CNAME" target="_blank">CNAME</a>记录。

详细操作文档请参考：<a href="../custom-app-domain.html" target="_blank" >自定义服务域名</a>


## 六、添加服务依赖服务

### 6.1 服务为什么要依赖其他服务

当一个独立的业务系统不能完成所有功能时，就需要借助其他的服务来实现。如web服务一般都需要数据库存储数据，前端页面展现程序需要调用后端API服务获取数据等等。

建立服务依赖的操作请参考：[添加数据库依赖](../link-db.html)

### 6.2 服务如何连接依赖服务

当服务开启[对内服务](part-bceed0b33051c29e)后，其他服务才能通过【添加依赖服务】的方式进行关联，服务与依赖的服务建立起关联后，下一步就是连接依赖服务。

在【依赖】页面中的 【依赖应用信息】可以看到已经依赖的服务：

<img src="https://static.goodrain.com/images/docs/3.6/user-manual/manage/app-link01.png" width="100%" />

#### (1) 获取连接信息

选择其中一个依赖服务，点击【连接信息】会弹出连接信息页面:
<img src="https://static.goodrain.com/images/docs/3.6/user-manual/manage/app-link02.png" width="60%" />

连接信息分为两类:

- 变量名
> 当服务的端口打开<b>对内服务</b>后，会生成一个默认的<b>端口别名</b>这个别名就是该服务的连接信息的前缀。如一个内部的API服务，端口别名是 `USERAPI` 则，其他服务与该API建立关联后，就可以通过 `USERAPI_HOST` 找到API服务的连接IP，通过`USERAPI_PORT` 找到API服务的端口号，如果还需要添加其他的变量名，可以通过 【依赖】--【服务连接信息】添加更多的依赖相关的变量。

- 变量值
> 服务可以通过确定的变量值来连接被依赖（打开对内服务）的服务，我们<b>不推荐</b>使用这种方式连接，这种方式属于硬编码，所有配置都写死到代码中，对于业务安全与程序灵活性都有影响。我们推荐使用<b>环境变量名</b>的方式连接服务。

#### (2) 服务连接依赖服务

当服务添加了依赖，并且查看了连接信息后，下一步就是修改服务的配置，连接依赖的服务，以Springcloud程序为例介绍通过<b>环境变量</b>的形式连接依赖的服务：

`application.yml` 文件

```yml
...
spring:
  data:
    mysql:
      host: ${MYSQL_HOST}
      username: ${MYSQL_USER}
      password: ${MySQL_PASS}
      database: ${MYSQL_DB}
      port: ${MYSQL_PORT}
...
```

其他各类语言都有获取环境变量的方法，如果不想用环境变量，也可以使用直接变量值，但按照<a href="https://12factor.net/zh_cn/config" target="_blank">十二要素</a>原则，我们不推荐使用硬编码的方式连接服务。

## 七、进入容器命令行

运行起来的服务后端都是由容器提供的，平台提供了通过浏览器的方式登录到服务容器命令行的方式。当服务正常启动后，可以通过【管理容器】按钮，选择某个节点，进入到容器命令行：

<img src="https://static.goodrain.com/images/docs/3.6/user-manual/manage/web-console.gif" width="100%" />

{{site.data.alerts.callout_info}}

- 当无法正常打开控制台时，请检查服务状态是否正常。
- Web控制台只用作查看和调试程序，不建议通过控制台部署业务相关的服务。

{{site.data.alerts.end}}

## 八、查看服务日志

当服务创建完成后，会有两种日志与该服务有关：

- 操作日志：显示服务的构建及操作信息，服务的回滚也在这里完成。
- 服务输出日志：服务运行后输出到<a href="https://baike.baidu.com/item/stdout" target="_blank">标准输出(stdout)</a>和<a href="https://baike.baidu.com/item/stderr" target="_blank">标准错误输出(stderr)</a>的日志。

详细文档参考：<a href="../view-app-logs.html" target="_blank">查看服务日志</a>

## 九、构建源

构建源设置中主要会显示构建的源信息以及语言的设置，需要注意只有源码创建的服务才可以设置语言版本，以java为例：

当创建完服务后，不选择默认的构建及部署，便可进入服务详情页面去设置服务属性

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/user-manual/1544427683639.jpg" width="100%" />

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/user-manual/1544427462576.jpg" width="100%" />


## 十、服务其他设置

服务的其他功能，包括更多的服务信息、自动部署、健康检查等高级功能都在 服务的 【设置】页面中，下文会对每一块功能做详细介绍。

### 10.1 服务基础信息

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

### 10.2 自动部署

目前自动部署支持通过Git仓库源码创建的服务，后续会提供Svn仓库、Docker镜像仓库的自动部署功能。

在服务【设置】页面，自动部署区域，点击【开启自动部署】按钮后，会提示类似如下信息：

<center>
<img src="https://static.goodrain.com/images/docs/3.6/user-manual/manage/auto-deploy.png" width="80%" />
</center>

详细文档请参考: [服务持续构建与部署](../../best-practice/ci-cd/auto-deploy.html)

### 10.3 自定义环境变量

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

### 10.4 健康检查

为了了解服务启动后的服务是否可用，已经服务运行中的服务运行情况，我们增加了服务检查的功能：

- 启动时检查

> 服务启动时的健康检查，用户可根据服务的协议、端口自定义设置监控选项。如果达到检查的阈值，平台会重启服务

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

### 10.5 成员服务权限

关于角色权限定义的文档请参考：<a href="../manage-your-team.html#part-4d32fc61fb3a5f74">角色与团队成员管理</a>

这里主要讲的是服务权限的管理，当某个用户加入到团队时，团队管理员决定该用户的角色，如果要限制某个用户只能管理某些服务，建议使用 `Viewer(观察者)` 角色，然后根据需要在服务的 【成员服务权限】中设置服务的管理权限。

## 十一、删除服务

平台提供服务永久删除功能，服务删除后，服务信息会从控制台和数据中心数据库中删除，持久化数据暂时保留。

目前还没有恢复删除服务的功能，请谨慎使用该功能。

<img src="https://static.goodrain.com/images/docs/3.6/user-manual/manage/delete-app.gif" width="100%" />