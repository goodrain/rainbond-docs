---
title: Application Console High Availability Deployment
description: 'Application Console High Availability Deployment'
hidden: true
---

## Application Console High Availability Deployment

> Our suggestion to you is to log in to the platform after the platform is built, build the rbd-app-ui service inside the platform, and connect to the third-party database; it not only increases the flexibility of the application console Web service, facilitates monitoring, but also ensures the application High availability for console web services.

```
# The app-ui component will generate a large number of connections to the database. In order to avoid database blocking, it is recommended to optimize the external database.
[root@mysql ~]# vim /etc/my.cnf
max_connect_errors = 2000
# On the first management node View external database information on
[root@manage01 ~]# vim /opt/rainbond/conf/ui.yaml
start: >-
    docker run --name rbd-app-ui
    --network host
    -e MANAGE_SECRET_KEY= eihi5Ijaiv4oL6jeecohfuDeeShideim
    -e MYSQL_HOST=39.104.21.207 #External database host IP
    -e MYSQL_PORT=3306 #Database port
    -e MYSQL_USER=root #Database username
    -e MYSQL_PASS=** #Database password
    -e MYSQL_DB=console # Database library name
    -v /opt/rainbond/.init:/initdata
    -v /grdata/services/console:/app/ui/data
    -v /opt/rainbond/etc/rbd-api:/etc/goodrain #ssl
    -v /opt/rainbond/logs/rbd-app-ui:/app/logs #
    -i goodrain.me/rbd-app-ui:v5.1.6-release
```

- Create app-ui application

View the current app-ui image address on the first management node, and use this image address as the build source

```
docker ps | grep rbd-app-ui
```

<img src="https://rainbond-pkg.oss-cn-shanghai.aliyuncs.com/App-ui/CreatApplication01.png" width="100%" />

- Add third-party services to connect to external databases

<img src="https://rainbond-pkg.oss-cn-shanghai.aliyuncs.com/App-ui/CreatApplication02.png" width="100%" />

- Add data center variables, connect Mysql information

<img src="https://rainbond-pkg.oss-cn-shanghai.aliyuncs.com/App-ui/CreatApplication03.png" width="100%" />

- Add Mysql port to enable it to provide services internally

<img src="https://rainbond-pkg.oss-cn-shanghai.aliyuncs.com/App-ui/CreatApplication04.png" width="100%" />

 - Add dependency on data center

<img src="https://rainbond-pkg.oss-cn-shanghai.aliyuncs.com/App-ui/CreatApplication05.png" width="100%" />

- View connection information

<img src="https://rainbond-pkg.oss-cn-shanghai.aliyuncs.com/App-ui/CreatApplication06.png" width="100%" />

- App-ui service adds port (7070) to open external access

<img src="https://rainbond-pkg.oss-cn-shanghai.aliyuncs.com/App-ui/CreatApplication07.png" width="100%" />

- The number of elastic scaling instances, memory configuration, and high availability of the application console

<img src="https://rainbond-pkg.oss-cn-shanghai.aliyuncs.com/App-ui/CreatApplication09.png" width="100%" />

<img src="https://rainbond-pkg.oss-cn-shanghai.aliyuncs.com/App-ui/CreatApplication10.png" width="100%" />

- mount storage

<img src="https://rainbond-pkg.oss-cn-shanghai.aliyuncs.com/App-ui/CreatApplication11.png" width="100%" />

```
#View the service information to know the directory where the pod is located, and copy the file to the directory where the pod is located
cp -a /grdata/services/console/ /grdata/tenant/7b0e4bed6a1f4b9498fdf48abcd18612/service/a8b6048dbb985348186ed1b4a874e7ea/
#Copy the ssl file
cp -a /opt/ rainbond/etc/rbd-api/ /grdata/tenant/7b0e4bed6a1f4b9498fdf48abcd18612/service/a8b6048dbb985348186ed1b4a874e7ea/

```

For more platform service creation methods, please refer to[User Manual](/docs/use-manual/component-create/creation-process)
