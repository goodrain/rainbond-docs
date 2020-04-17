---
title: rbd-db数据迁移至外部数据库
weight: 1007
description: 将数据由平台默认数据存储中心rbd-db迁移至外部数据库
---

#### 准备工作，使用rainbond平台默认的rbd-db组件搭建外部数据库


- 在数据库节点安装docker

```bash
# 安装docker
export VERSION=18.06 && curl -fsSL http://rainbond-pkg.oss-cn-shanghai.aliyuncs.com/releases/docker/install-docker.sh | bash -s docker
# 启动docker
systemctl start docker
# 拉取rbd-db镜像
docker pull rainbond/rbd-db:latest
# 提前在数据库节点创建持久化目录
mkdir -p /opt/rainbond/data/
# 创建数据库配置文件目录
mkdir -p /opt/rainbond/etc/
# 启动数据库
docker run --name rbd-db -p 3306:3306  -e MYSQL_ALLOW_EMPTY_PASSWORD="yes" -v /opt/rainbond/data/rbd-db:/data -v /opt/rainbond/etc/rbd-db:/etc/mysql -i rainbond/rbd-db:latest
# 确认是否启动成功
ss -lntp|grep :3306
```

><font color="#dd0000">注意：数据备份之后请勿在平台上继续进行操作，以免造成数据不一致</font><br />

```bash
# 备份数据
kubectl exec  -it  rbd-db-0 -n rbd-system  --  mysqldump --all-databases > all.sql
# 查看数据备份是否成功
cat all.sql
# 将数据拷贝到数据库目的迁移节点中
scp all.sql  10.10.10.11:/tmp/
```


- 在存储节点的Mysql导入数据

```
# 查看rbd-db服务容器
docker ps
# 拷贝数据库备份文件到容器中
docker cp /tmp/all.sql  <CONTAINER ID>:/tmp
# 进入容器
docker exec -it <CONTAINER ID> bin/bash
# 导入数据
mysql  -uroot -p  < /tmp/all.sql
flush privileges;­
```

#### 修改数据库连接地址

> 在首个管理节点需要修改rbd-app-ui配置

- 因数据已经导入，只需修改指向数据库主机的IP即可

  修改rbd-app-ui组件连接地址

```bash
kubectl edit deployment rbd-app-ui -n rbd-system

      containers:
      - env:
        - name: MYSQL_HOST
          value: rbd-db   #修改此处的连接地址
        - name: MYSQL_PORT
          value: "3306"
        - name: MYSQL_USER
          value: rite
        - name: MYSQL_PASS
          value: e59e8773
        - name: MYSQL_DB
          value: console
```

修改rbd-api组件连接地址

```bash
kubectl edit deployment rbd-api -n rbd-system

      containers:
      - args:
				...
        - --mysql=mysql_user:mysql_pass@tcp(mysql_host:mysql_port)/region #修改mysql_host和mysql_port为新的地址和端口即可
				...
```

修改rbd-chaos组件连接地址

```bash
kubectl edit daemonsets rbd-chaos -n rbd-system

      containers:
      - args:
				...
        - --mysql=mysql_user:mysql_pass@tcp(mysql_host:mysql_port)/region #修改mysql_host和mysql_port为新的地址和端口即可
				...
```

修改rbd-worker组件连接地址

```bash
kubectl edit deployments rbd-worker -n rbd-system

      containers:
      - args:
				...
        - --mysql=mysql_user:mysql_pass@tcp(mysql_host:mysql_port)/region #修改mysql_host和mysql_port为新的地址和端口即可
				...
```

修改rbd-eventlog组件连接地址

```bash
kubectl edit deployments rbd-eventlog -n rbd-system

      containers:
      - args:
				...
        - --db.url=mysql_user:mysql_pass@tcp(mysql_host:mysql_port)/region #修改mysql_host和mysql_port为新的地址和端口即可
				...
```



最后查看集群状态 

```
grctl cluster
```
登录平台查看应用状态

#### 数据迁移完毕停止rbd-db服务,到此完成数据迁移