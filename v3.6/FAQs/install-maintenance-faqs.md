---
title: 平台安装，维护-常见问题
summary: 云帮安装、维护相关的常见问题。
toc: false
---

<div id="toc"></div>

### 云帮目前支持CentOS 7.x, Debian等

> 目前我们在CentOS 7.3 系统下做了严格的测试，并且具备了丰富的生产环境使用经验。因此建议用户也选用基于CentOS 7.3的系统安装云帮。目前只支持systemd

### 在公有云环境部署云帮后，应用域名解析为内网ip，如何更改默认域名解析设置？

> 云帮平台上运行起来的应用，如果需要外部访问，都需要一个域名与之对应。这个域名是应用的标示，同时也是平台负载均衡区分后端服务的方法。
> 云帮安装程序默认会自动注册一个`*.<random>.goodrain.org` 的泛域名并进行dns的解析工作

```
# 查看当前解析记录
dig  *.y5vhe.goodrain.org | grep -A 2 "ANSWER SECTION"
;; ANSWER SECTION:
*.y5vhe.goodrain.org.	60	IN	A	10.26.98.37
# 更改当前解析记录
grctl domain --ip 59.110.8.184 --domain y5vhe.goodrain.org # domain 参数可选
# 稍等3分钟左右等待解析生效后再次查看
dig *.y5vhe.goodrain.org | grep -A 2 "ANSWER SECTION"
;; ANSWER SECTION:
*.y5vhe.goodrain.org.	60	IN	A	59.110.8.184
```

### 如何查看安装日志

```
安装日志默认 /var/log/event/
```

### 安装过程中可能遇到到问题

```
Q:安装任务卡住或者停止了,如何处理
A: 检查当前任务是否生成相关日志文件，若未生成,则可以新开一个终端，执行systemctl restart rainbond-node；如重启node后以及未执行，使用`grctl tasks get <任务>` 检查依赖任务是否执行成功，若未成功，则检查依赖任务执行日志。
```

### 版本3.5.1升级到3.6操作

```
1. 更新管理节点服务至3.6最新版版本

docker pull rainbond/rbd-app-ui:3.6
docker pull rainbond/rbd-lb:3.6
docker pull rainbond/rbd-webcli:3.6
docker pull rainbond/rbd-api:3.6
docker pull rainbond/rbd-eventlog:3.6
docker pull rainbond/rbd-entrance:3.6
docker pull rainbond/rbd-chaos:3.6
docker pull rainbond/rbd-mq:3.6
docker pull rainbond/rbd-worker:3.6
docker pull rainbond/adapter:3.6
docker pull rainbond/cni:rbd_v3.6

docker tag rainbond/adapter:3.6 goodrain.me/adapter
docker push goodrain.me/adapter

修改/opt/rainbond/docker-compose.yaml中上述镜像的版本信息从3.5(or 3.5.2)变更为3.6
dc-compose stop rbd-prometheus
cclear
# docker-compose 关于rbd-prometheus部分配置变更为如下,其中内网ip为管理节点内网ip
  rbd-monitor:
    image: rainbond/rbd-monitor:3.6
    container_name: rbd-monitor
    volumes:
    - /opt/rainbond/data/prom:/prometheusdata
    command: --etcd-endpoints=http://<内网ip>:2379 --advertise-addr=<内网ip>:9999 --web.listen-address=0.0.0.0:9999 --config.file=/etc/prometheus/prometheus.yml --storage.tsdb.path=/prometheusdata --storage.tsdb.no-lockfile --storage.tsdb.retention=7d --log.level=info
    logging:
      driver: json-file
      options:
        max-size: 50m
        max-file: '3'
    network_mode: host
    restart: always

2. 更新数据库
下载更新sql 
wget https://raw.githubusercontent.com/goodrain/rainbond-ui/V3.6/sql/3.5.1-3.6.sql
wget https://raw.githubusercontent.com/goodrain/rainbond-ui/V3.6/sql/3.6-latest.sql
docker cp 3.5.1-3.6.sql rbd-db:/tmp
docker cp 3.6-latest.sql rbd-db:/tmp
din rbd-db
mysql
use console;
source /tmp/3.5.1-3.6.sql;
source /tmp/3.6-latest.sql;
执行sql语句

3. 更新管理节点服务
dc-compose up -d 
4. 更新所有节点node至最新版本
docker run --rm -v /grdata/tmp/upgrade360:/sysdir rainbond/cni:rbd_v3.6 tar zxf /pkg.tgz -C /sysdir
更新node二进制文件(/usr/local/bin/node)即可
```
如果在升级过程中遇到问题，欢迎[issue](https://github.com/goodrain/rainbond-install/issues/new)，我们会在第一时间反馈解决
