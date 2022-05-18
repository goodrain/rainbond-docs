---
title: 应用控制台高可用部署
description: '应用控制台高可用部署'
hidden: true
---

## 应用控制台高可用部署

> 我们给您的建议是在平台搭建完成以后，登录平台，在平台内部搭建 rbd-app-ui 服务，对接第三方数据库；既增加了应用控制台 Web 服务的灵活性，便于监控，又保证了应用控制台 Web 服务的高可用性。

```
# app-ui组件会和数据库产生大量连接，为了避免数据库阻塞，建议对外部数据库进行优化
[root@mysql ~]# vim /etc/my.cnf
max_connect_errors = 2000
# 在第一个管理节点上查看外部数据库信息
[root@manage01 ~]# vim /opt/rainbond/conf/ui.yaml
start: >-
    docker run --name rbd-app-ui
    --network host
    -e MANAGE_SECRET_KEY=eihi5Ijaiv4oL6jeecohfuDeeShideim
    -e MYSQL_HOST=39.104.21.207   #外部数据库主机IP
    -e MYSQL_PORT=3306		   #数据库端口
    -e MYSQL_USER=root		   #数据库用户名
    -e MYSQL_PASS=**          #数据库密码
    -e MYSQL_DB=console			#数据库库名
    -v /opt/rainbond/.init:/initdata
    -v /grdata/services/console:/app/ui/data
    -v /opt/rainbond/etc/rbd-api:/etc/goodrain #ssl文件
    -v /opt/rainbond/logs/rbd-app-ui:/app/logs #日志
    -i goodrain.me/rbd-app-ui:v5.1.6-release
```

- 创建 app-ui 应用

在首个管理节点查看当前使用 app-ui 镜像地址，使用此镜像地址作为构建源

```
docker ps |grep rbd-app-ui
```

<img src="https://rainbond-pkg.oss-cn-shanghai.aliyuncs.com/App-ui/CreatApplication01.png" width="100%" />

- 添加第三方服务，对接外部数据库

<img src="https://rainbond-pkg.oss-cn-shanghai.aliyuncs.com/App-ui/CreatApplication02.png" width="100%" />

- 添加数据中心的变量,连接 Mysql 信息

<img src="https://rainbond-pkg.oss-cn-shanghai.aliyuncs.com/App-ui/CreatApplication03.png" width="100%" />

- 添加 Mysql 端口，让其能够对内提供服务

<img src="https://rainbond-pkg.oss-cn-shanghai.aliyuncs.com/App-ui/CreatApplication04.png" width="100%" />
 
 - 添加对数据中心的依赖
 
<img src="https://rainbond-pkg.oss-cn-shanghai.aliyuncs.com/App-ui/CreatApplication05.png" width="100%" />

- 查看连接信息

<img src="https://rainbond-pkg.oss-cn-shanghai.aliyuncs.com/App-ui/CreatApplication06.png" width="100%" />

- app-ui 服务添加端口（7070），开通对外访问

<img src="https://rainbond-pkg.oss-cn-shanghai.aliyuncs.com/App-ui/CreatApplication07.png" width="100%" />

- 弹性伸缩实例数量，内存配置，构成应用控制台高可用

<img src="https://rainbond-pkg.oss-cn-shanghai.aliyuncs.com/App-ui/CreatApplication09.png" width="100%" />

<img src="https://rainbond-pkg.oss-cn-shanghai.aliyuncs.com/App-ui/CreatApplication10.png" width="100%" />

- 挂载存储

<img src="https://rainbond-pkg.oss-cn-shanghai.aliyuncs.com/App-ui/CreatApplication11.png" width="100%" />

```
#查看service信息得知pod所在目录，拷贝文件到pod所在目录
cp -a /grdata/services/console/  /grdata/tenant/7b0e4bed6a1f4b9498fdf48abcd18612/service/a8b6048dbb985348186ed1b4a874e7ea/
#拷贝ssl文件
cp -a /opt/rainbond/etc/rbd-api/ /grdata/tenant/7b0e4bed6a1f4b9498fdf48abcd18612/service/a8b6048dbb985348186ed1b4a874e7ea/

```

更多平台服务创建方式请参阅[用户使用手册](/docs/use-manual/component-create/creation-process)
