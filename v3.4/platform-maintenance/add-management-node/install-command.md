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

## 扩容管理节点

{{site.data.alerts.callout_danger}}
- 管理节点安装数建议为奇数(1,3,5,7...)
- 安装命令都在第一个管理节点执行
{{site.data.alerts.end}}

{% include copy-clipboard.html %}
```bash
# 添加管理节点到node集群里
grctl node add -i <管理节点ip>  --Role manage
# 管理节点uid
uuid=$(grctl node list | grep <管理节点ip> | awk '{print $2}')
# 安装管理节点基础服务
grctl install manage_base --nodes $uuid
# 安装管理节点核心服务
grctl install manage --nodes $uuid
```

## 同步管理节点配置

- 需要在完成管理节点安装后执行

{% include copy-clipboard.html %}
```bash
# 更新entrance
grctl tasks exec update_entrance_services -n <管理节点uid>

# 更新region_api
grctl tasks exec create_host_id_list -n <管理节点uid>

```