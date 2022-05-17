---
title: rbd-db数据迁移至外部数据库
weight: 1007
description: 将数据由平台默认数据存储中心rbd-db迁移至外部数据库
---

### 操作步骤

#### 可选项，通过docker部署外部数据库


- 数据库节点安装并启动 docker

  ```bash
  export VERSION=19.03 && curl -fsSL https://rainbond-pkg.oss-cn-shanghai.aliyuncs.com/releases/docker/install-docker.sh | bash -s docker
  systemctl start docker
  ```

- 运行数据库

  ```bash
  mkdir -p /opt/rainbond/rbd-db/data/ && docker run --name rbd-db -p 3306:3306  -e MYSQL_ALLOW_EMPTY_PASSWORD="yes" -v /opt/rainbond/rbd-db/data:/var/lib/mysql -i registry.cn-hangzhou.aliyuncs.com/goodrain/rbd-db:8.0.19
  ```

><font color="#dd0000">注意：数据备份之后请勿在平台上继续进行操作，以免造成数据不一致</font><br />

### 迁移数据

- 获取原来的数据库密码

  ```bash
  kubectl exec -it -n rbd-system rbd-db-0 -- env|grep MYSQL_ROOT_PASSWORD
  ```

- 替换变量 `MYSQL_ROOT_PASSWORD` 后，备份数据库并确认数据是否完整

  ```bash
  kubectl exec  -it  rbd-db-0 -n rbd-system  --  mysqldump -p$MYSQL_ROOT_PASSWORD --all-databases > all.sql && cat all.sql
  ```


- 查看rbd-db服务容器

  ```bash
  docker ps | grep rbd-db
  ```

- 拷贝数据库备份文件到容器中

  ```bash
  docker cp /tmp/all.sql  rbd-db:/tmp
  ```

- 进入容器

  ```bash
  docker exec -it rbd-db mysql
  ```

- 导入数据

  ```bash
  source /tmp/all.sql;
  ```

- 重新启动数据库

  ```bash
  docker rm -f rbd-db && docker run --name rbd-db -p 3306:3306  -e MYSQL_ALLOW_EMPTY_PASSWORD="yes" -v /opt/rainbond/rbd-db/data:/var/lib/mysql -i registry.cn-hangzhou.aliyuncs.com/goodrain/rbd-db:8.0.19
  ```

#### 修改数据库连接地址

> 在首个管理节点需要修改rbd-app-ui配置

- 因数据已经导入，只需修改指向数据库主机的IP即可 

  修改rbd-app-ui组件连接地址

```bash
kubectl edit -n rbd-system rbdcomponents.rainbond.io rbd-app-ui

spec:
  env:
  - name: MYSQL_HOST
    value: 172.24.206.27
```

修改rbd-api组件数据库连接参数

```bash
kubectl edit -n rbd-system rbdcomponents.rainbond.io rbd-api

spec:
  args:
  - --mysql=mysql_user:mysql_pass@tcp(mysql_host:mysql_port)/region
```

修改rbd-chaos组件数据库连接参数

```bash
kubectl edit -n rbd-system rbdcomponents.rainbond.io rbd-chaos

spec:
  args:
  - --mysql=mysql_user:mysql_pass@tcp(mysql_host:mysql_port)/region
```

修改rbd-worker组件连接地址

```bash
kubectl edit -n rbd-system rbdcomponents.rainbond.io rbd-worker

spec:
  args:
  - --mysql=mysql_user:mysql_pass@tcp(mysql_host:mysql_port)/region
```

修改rbd-eventlog组件连接地址

```bash
kubectl edit -n rbd-system rbdcomponents.rainbond.io rbd-eventlog

spec:
  args:
  - --db.url=mysql_user:mysql_pass@tcp(mysql_host:mysql_port)/region
```

最后查看集群状态 

```bash
kubectl get pod -n rbd-system
```
登录平台查看应用状态

#### 数据迁移完毕停止rbd-db服务,到此完成数据迁移