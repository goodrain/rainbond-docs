---
title: "rbd-db数据迁移至外部数据库"
weight: 1005
description: "将数据由平台默认数据存储中心rbd-db迁移至外部数据库"
hidden: true
---

#### 准备工作，使用rainbond平台默认的rbd-db组件搭建外部数据库


- 在数据库节点安装docker

```
# 安装docker
export VERSION=18.06 && curl -fsSL http://rainbond-pkg.oss-cn-shanghai.aliyuncs.com/releases/docker/install-docker.sh | bash -s docker
# 启动docker
systemctl start docker
# 拉取rbd-db镜像
docker pull rainbond/rbd-db:latest
# 修改tag
docker tag rainbond/rbd-db:latest goodrain.me/rbd-db:latest
# 提前在数据库节点创建持久化目录
mkdir -p /opt/rainbond/data/
# 创建数据库配置文件目录
mkdir -p /opt/rainbond/etc/

```

><font color="#dd0000">注意：数据备份之后请勿在平台上继续进行操作，以免造成数据不一致</font><br />


- 在首个管理节点执行以下操作

```
# 查看数据库连接信息
root@rainbond:~# cat /opt/rainbond/.init/updatedb.sh |grep ^DB

DB_HOST=10.10.10.10
DB_PORT=3306
DB_USER=nugh4Z  #数据库用户
DB_PASS=Eu0aiDee #数据库密码
NET_TYPE=internal

# 进入rbd-db容器，备份当前数据
din rbd-db
# 备份数据,直接将数据重定向至持久化目录中
mysqldump -u用户 -p密码 --all-databases > /data/all.sql
# 查看数据备份是否成功
cat /data/all.sql
# 退出容器，在宿主机持久化目录查看备份的数据
ls /opt/rainbond/data/mysql/
all.sql data logs tmp 
# 将数据拷贝到存储节点中
scp /opt/rainbond/data/mysql/all.sql  10.10.10.11:/tmp/
# 在管理节点拷贝rbd-db的启动文件至数据库节点
scp /etc/systemd/system/rbd-db.service 10.10.10.11:/etc/systemd/system/
# 在管理节点拷贝rbd-db的配置文件至数据库节点
scp -r /opt/rainbond/etc/rbd-db 10.10.10.11:/opt/rainbond/etc/
```

- 在存储节点的Mysql导入数据

```
# 启动rbd-db服务
systemctl start rbd-db
# 查看rbd-db服务状态
systemctl status rbd-db
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

> 在首个管理节点需要修改两个配置文件ui.yaml,master.yaml，若有多个管理节点其他管理节点只需修改master.yaml文件即可,计算节点无需修改

- 在首个管理节点操作，因数据已经导入，只需修改指向数据库主机的IP即可

```
# 需要修改一个地方
vi /opt/rainbond/conf/ui.yaml

version: '2.1'
services:
- name: rbd-app-ui
  endpoints:
  - name: APP_UI_ENDPOINTS
    protocol: http
    port: 7070
  health:
    name: rbd-app-ui
    model: http
    address: 127.0.0.1:7070
    max_errors_num: 3
    time_interval: 20
  after:
    - docker
  type: simple
  pre_start: docker rm rbd-app-ui
  start: >-
    docker run --name rbd-app-ui
    --network host
    -e MANAGE_SECRET_KEY=yee5je8Au4no1ceefe0vu6APhae0be8h 
    -e MYSQL_HOST=10.10.10.11  #修改数据库主机IP
    -e MYSQL_PORT=  #数据库端口
    -e MYSQL_USER=  #数据库用户
    -e MYSQL_PASS=  #数据库密码
    -e MYSQL_DB=console
    -v /opt/rainbond/.init:/initdata
    -v /grdata/services/console:/app/ui/data
    -v /opt/rainbond/etc/rbd-api:/etc/goodrain
    -v /opt/rainbond/logs/rbd-app-ui:/app/logs
    -i goodrain.me/rbd-app-ui:v5.1.6-release
  stop: docker stop rbd-app-ui
  restart_policy: always
  restart_sec: 10
```
master.yaml文件，需要修改四个地方，只修改数据库主机IP即可

```
vi /opt/rainbond/conf/master.yaml

version: '2.1'
services:
- name: rbd-api
  endpoints:
  - name: API_ENDPOINTS
    protocol: http
    port: 8888
  health:
    name: rbd-api
    model: http
    address: 127.0.0.1:8888/v2/health
    max_errors_num: 3
    time_interval: 10
  after:
    - docker
  type: simple
  pre_start: docker rm rbd-api
  start: >-
    docker run --name rbd-api
    --network host
    -e LicenseSwitch="off"
    -e EX_DOMAIN=2b7847.grapps.cn
    -v /grdata:/grdata
    -v /grdata/downloads/log:/grdata/logs
    -v /opt/rainbond/etc/rbd-api:/etc/goodrain
    -v /opt/rainbond/etc/kubernetes/kubecfg:/opt/rainbond/etc/kubernetes/kubecfg
    -v /opt/rainbond/logs/docker_logs:/data/docker_logs
    -v /opt/rainbond/logs/rbd-api:/logs
    -i goodrain.me/rbd-api:v5.1.6-release
    --etcd=${ETCD_ENDPOINTS}
    --api-addr-ssl=0.0.0.0:8443
    --api-addr=127.0.0.1:8888
    --log-level=info
    --mysql="数据库连接用户:数据库密码@tcp(数据库IP:端口)/region"
    --api-ssl-enable=true
    --api-ssl-certfile=/etc/goodrain/region.goodrain.me/ssl/server.pem
    --api-ssl-keyfile=/etc/goodrain/region.goodrain.me/ssl/server.key.pem
    --client-ca-file=/etc/goodrain/region.goodrain.me/ssl/ca.pem
  stop: docker stop rbd-api
  restart_policy: always
  restart_sec: 10
- name: rbd-chaos
  endpoints:
  - name: CHAOS_ENDPOINTS
    protocol: http
    port: 3228
  health:
    name: rbd-chaos
    model: http
    address: 127.0.0.1:3228/v2/builder/health
    max_errors_num: 3
    time_interval: 10
  after:
    - docker
  type: simple
  pre_start: docker rm rbd-chaos
  start: >-
    docker run --name rbd-chaos
    --network host
    -e SOURCE_DIR="/cache/source"
    -e CACHE_DIR="/cache"
    -v /logs:/logs
    -v /grdata:/grdata
    -v /cache:/cache
    -v /var/run:/var/run
    -v /grdata/services/ssh:/root/.ssh
    -i goodrain.me/rbd-chaos:v5.1.6-release
    --etcd-endpoints=${ETCD_ENDPOINTS} --hostIP=10.63.4.51 --log-level=info --mysql="数据库连接用户名:数据库密码@tcp(数据库IP:端口)/region"
  stop: docker stop rbd-chaos
  restart_policy: always
  restart_sec: 10
- name: rbd-mq
  endpoints:
  - name: MQ_ENDPOINTS
    protocol: http
    port: 6301
  health:
    name: rbd-mq
    model: http
    address: 127.0.0.1:6301/health
    max_errors_num: 3
    time_interval: 10
  after:
    - docker
  type: simple
  pre_start: docker rm rbd-mq
  start: >-
    docker run --name rbd-mq
    --network host
    -i goodrain.me/rbd-mq:v5.1.6-release
    --log-level=info --etcd-endpoints=${ETCD_ENDPOINTS} --hostIP=10.63.4.51
  stop: docker stop rbd-mq
  restart_policy: always
  restart_sec: 10
- name: rbd-webcli
  endpoints:
  - name: WEBCLI_ENDPOINTS
    protocol: http
    port: 7171
  health:
    name: rbd-webcli
    model: http
    address: 127.0.0.1:7171/health
    max_errors_num: 3
    time_interval: 10
  after:
    - docker
  type: simple
  pre_start: docker rm rbd-webcli
  start: >-
    docker run --name rbd-webcli
    --network host
    -v /usr/local/bin/kubectl:/usr/bin/kubectl
    -v /root/.kube:/root/.kube
    -i goodrain.me/rbd-webcli:v5.1.6-release
    --hostIP=10.63.4.51 --etcd-endpoints=${ETCD_ENDPOINTS}
  stop: docker stop rbd-webcli
  restart_policy: always
  restart_sec: 10
- name: rbd-worker
  endpoints:
  - name: WORKER_ENDPOINTS
    protocol: http
    port: 6369
  health:
    name: rbd-worker
    model: http
    address: 127.0.0.1:6369/worker/health
    max_errors_num: 3
    time_interval: 10
  after:
    - docker
  type: simple
  pre_start: docker rm rbd-worker
  start: >-
    docker run --name rbd-worker
    --network host
    -e K8S_MASTER=http://127.0.0.1:8181
    -e EX_DOMAIN=2b7847.grapps.cn
    -e docker_bridge_ip=172.30.42.1
    -v /opt/rainbond/etc/kubernetes/kubecfg:/etc/goodrain/kubernetes
    -v /grdata:/grdata
    -i goodrain.me/rbd-worker:v5.1.6-release
    --log-level=info
    --host-ip=10.63.4.51
    --etcd-endpoints=${ETCD_ENDPOINTS}
    --node-name=1150c208-cfb7-11e6-03cd-346b5bf2b33e
    --kube-config="/etc/goodrain/kubernetes/admin.kubeconfig"
    --mysql="数据库连接用户:数据库密码@tcp(数据库IP:端口)/region"
  stop: docker stop rbd-worker
  restart_policy: always
  restart_sec: 10
- name: rbd-eventlog
  endpoints:
  - name: EVENTLOG_ENDPOINTS
    protocol: http
    port: 6363
  health:
    name: rbd-eventlog
    model: http
    address: 10.63.4.51:6363/health
    max_errors_num: 3
    time_interval: 5
  after:
    - docker
  type: simple
  pre_start: docker rm rbd-eventlog
  start: >-
    docker run --name rbd-eventlog
    --network host
    -e K8S_MASTER=http://127.0.0.1:8181
    -e DOCKER_LOG_SAVE_DAY=7
    -v /opt/rainbond/logs/rbd-eventlog:/var/log
    -v /grdata/downloads/log:/grdata/logs
    -v /opt/rainbond/etc/node:/opt/rainbond/etc/node
    -i goodrain.me/rbd-eventlog:v5.1.6-release
    --cluster.bind.ip=10.63.4.51 --cluster.instance.ip=10.63.4.51 --db.type=mysql --db.url="数据库连接用户:数据库密码@tcp(数据库IP:端口)/region" --discover.etcd.addr=${ETCD_ENDPOINTS} --eventlog.bind.ip=10.63.4.51 --websocket.bind.ip=10.63.4.51
  stop: docker stop rbd-eventlog
  restart_policy: always
  restart_sec: 10

```


所有节点修改完毕后执行命令

```
node service update
```

最后查看集群状态 

```
grctl cluster
```
登录平台查看应用状态

数据迁移完毕停止rbd-db服务

```
# 将rbd-db配置文件移走
mv /opt/rainbond/conf/db.yaml /backup
rm -rf  /etc/systemd/system/rbd-db.service 
# 停止rbd-db服务
systemctl stop rbd-db
# 将rbd-db从组件列表删除
grctl node condition delete <NODE ID> --name rbd-db
# 更新组件
node service update
```

到此完成数据迁移