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

### 版本3.4.2升级到3.5操作

```
# 1. 更新自研组件至3.5版本 /etc/goodrain/docker-compose.yaml
rainbond/rbd-app-ui:3.5
rainbond/rbd-lb:3.5
rainbond/rbd-webcli:3.5
rainbond/rbd-api:3.5
rainbond/rbd-eventlog:3.5
rainbond/rbd-entrance:3.5
rainbond/rbd-chaos:3.5
rainbond/rbd-mq:3.5
rainbond/rbd-worker:3.5

# 2. 更新docker-compose.yaml

移除rbd-app-ui部分volumes
/etc/goodrain/console.py:/etc/goodrain/console.py
移除rbd-slogger服务
移除rbd-dalaran服务

# 3. 更新数据库相关字段

docker cp rbd-app-ui:/app/ui/sql/upgrade.sql .
docker cp upgrade.sql rbd-db:/root/upgrade.sql
din rbd-db
mysql
use console
source /root/upgrade.sql

# 4. 设置默认管理员

update user_administrator set user_id=1 where id=1;

# 5. 更新数据中心
INSERT INTO `region_info` ( `region_id`, `region_name`, `region_alias`, `url`, `token`, `status`, `desc`, `wsurl`, `httpdomain`, `tcpdomain`) VALUES('asdasdasdasdasdasdasdasdas', 'cloudbang', '私有数据中心1', 'http://region.goodrain.me:8888', NULL, '1', '当前数据中心是默认安装添加的数据中心', 'ws://<ip>:6060', '<域名>', '<ip>');

ip: 如果有公网ip则使用公网ip，若在内网则使用内网ip(/etc/goodrain/envs/ip.sh)
域名: 云帮随机生成的域名
```
