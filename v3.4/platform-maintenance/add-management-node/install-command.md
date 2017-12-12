---
title: 安装命令
summary: 增加管理节点的命令
toc: false
toc_not_nested: true
asciicast: true
---

<div id="toc"></div>
<!--
- 如果ip不是内网ip，扩容管理节点需要额外配置。
- export ETCD_LOCAL_IP=<即扩容机器当前ip>
- 扩容第三个节点安装时，可能会提示etcd go offline
- 手动启动etcd ,重新执行安装脚本即可	
-->

##添加管理节点

{% include copy-clipboard.html %}
```bash
# 添加管理节点到node集群里
grctl node add -i <管理节点ip> -e <管理节点ip> --Role manage
# 计算节点uid
uuid=$(grctl node list | grep <管理节点ip> | awk '{print $2}')
# 安装管理节点基础服务
grctl install manage_base --nodes $uuid
# 安装管理节点核心服务
grctl install manage --nodes $uuid

```
