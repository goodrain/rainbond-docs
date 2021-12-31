---
title: '快速安装'
weight: 104
description: '使用最简单，方便的方式安装 Rainbond。'
aliases:
  - /docs/quick-start/rainbond_install
---

**注意：**

- 快速安装为单节点体验版，不适用于生产环境，如果您希望在生产环境使用，请参考[Rainbond安装文档](https://www.rainbond.com/docs/user-operations/deploy/)

#### 第一步：安装Docker

```bash
curl sh.rainbond.com/install_docker | bash
```

- 该docker安装方式仅支持 Linux x86 操作系统。

#### 第二步：设置EIP环境变量（可选）

``` 
 export EIP=IP地址
```

注意：服务器为单网卡时，直接跳过此步设置即可，多网卡时，优先填写公网IP，其次内网IP ,禁止填写127.0.0.1

#### 第三步：启动 Rainbond 控制台

```bash
docker run --privileged -d  -p 7070:7070 -p 80:80 -p 443:443 -p 6060:6060 -p 8443:8443 \
--name=rainbond-allinone --restart=unless-stopped \
-v ~/.ssh:/root/.ssh \
-v ~/rainbonddata:/app/data \
-v /opt/rainbond:/opt/rainbond \
-e ENABLE_CLUSTER=true \
-e EIP=${EIP:-$(hostname -i)} \
registry.cn-hangzhou.aliyuncs.com/goodrain/rainbond:v5.5.0-dind-allinone \
&& docker logs -f rainbond-allinone
```

| 启动参数       | 说明                                                   | 是否必填项 |
| :------------- | :----------------------------------------------------- | ---------- |
| -p 10000:10000 | 如果通过TCP策略访问内部应用，需要进行映射10000以上端口 | 否         |

- 看到以下三条提示，表示Rainbond安装成功。

```
正在加载数据，预计3分钟，时间取决于磁盘性能...
正在启动Rainbond，预计5分钟...
Rainbond启动成功，可以通过访问: http://$EIP:7070 进入Rainbond控制台
```

`备注:`

- 控制台将产生需要持久化的数据，存储于您部署节点的 `~/rainbonddata` 以及 ``` /opt/rainbond``` 目录中；

- 安装成功后，默认会有示例应用，点击团队界面，进入admin团队，进入默认应用，即可查看Ghost示例，示例初次启动大概2分钟左右，待变成绿色，即可访问。
- 点击六边形示例组件，点击对话框示例名称，即可进入示例管理界面。

