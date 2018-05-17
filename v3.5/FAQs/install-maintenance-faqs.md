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

### 版本3.5升级到3.5.1操作

```
1. 更新管理节点服务至3.5最新版版本

docker pull rainbond/rbd-app-ui:3.5
docker pull rainbond/rbd-lb:3.5
docker pull rainbond/rbd-webcli:3.5
docker pull rainbond/rbd-api:3.5
docker pull rainbond/rbd-eventlog:3.5
docker pull rainbond/rbd-entrance:3.5
docker pull rainbond/rbd-chaos:3.5
docker pull rainbond/rbd-mq:3.5
docker pull rainbond/rbd-worker:3.5

2. 更新数据库
下载更新sql https://github.com/goodrain/rainbond-ui/blob/V3.5/sql/V3.5-V3.5.1.sql
进入数据库容器：docker exec -it rbd-db bash 
执行sql语句

3. 更新管理节点服务
dc-compose up -d 
4. 更新所有节点node至最新版本
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock rainbond/static gr-node

```
