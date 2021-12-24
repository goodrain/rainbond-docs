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


#### 第二步：启动 Rainbond 控制台

```bash
docker run --privileged -d  -p 7070:7070 -p 80:80 -p 443:443 -p 6060:6060 \
--name=rainbond-allinone --restart=unless-stopped \ 
-v ~/.ssh:/root/.ssh \
-v ~/rainbonddata:/app/data \ 
-v /opt/rainbond:/opt/rainbond \ 
--env ENABLE_K3S=true \
--env EIP=填写IP \
registry.cn-hangzhou.aliyuncs.com/goodrain/rainbond:v5.5.0-dind-allinone
```

| 启动参数         | 说明                                                   | 是否必填项 |
| :--------------- | :----------------------------------------------------- | ---------- |
| -- env EIP       | 优先公网IP，其次内网IP                                 | 是         |
| --env ENABLE_K3S | 定义K3S开关，true为开，不填写为关                      | 否         |
| -p 10000:10000   | 如果通过TCP策略访问内部应用，需要进行映射10000以上端口 | 否         |

- 以下命令查询安装进度：

```
docker logs -f rainbond-allinone
```

- 看到以下提示，表示Rainbond安装成功。

```
Rainbond安装成功，可以通过访问: http://EIP:7070 进入Rainbond控制台
```

`备注:`

- 控制台将产生需要持久化的数据，存储于您部署节点的 `~/rainbonddata` 以及 ``` /opt/rainbond``` 目录中；





