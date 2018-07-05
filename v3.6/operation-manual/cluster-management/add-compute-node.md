---
title: 扩容计算节点
summary: 添加一个或多个计算节点
toc: false
---

## 一、扩容计算节点

特别说明一下，计算节点主机名需要已compute开头，如computexxx.

```bash
# 在管理节点执行如下操作
cd rainbond-intall/scripts
# 管理节点初始化计算节点(主机名compute01,ip, 密码)
./compute.sh init single <hostname> <ip> <passwd>
# 或者管理节点已经做了信任
./compute.sh init single <hostname> <ip> <key私钥> ssh
# 安装计算节点服务
./compute.sh install <hostname>

# 计算节点uid
uuid=$(grctl node list | grep <计算节点内网ip> | awk '{print $2}')

# 上线计算节点服务
grctl node up $uuid
```