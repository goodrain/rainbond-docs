---
title: 安装命令
summary: 增加计算节点的命令
toc: false
toc_not_nested: true
asciicast: true
---

<div id="toc"></div>

{{site.data.alerts.callout_info}}

- 此扩容方式仅在**旧版本安装方式**所安装云帮内支持，当前安装方式的扩容计算节点后续支持。

{{site.data.alerts.end}}

##扩容计算节点

命令在管理节点执行，无需登陆到计算节点
{% include copy-clipboard.html %}
```bash
# 添加计算节点到node集群里
grctl node add -i <计算节点内网ip> --Role compute

# 计算节点uid
uuid=$(grctl node list | grep <计算节点内网ip> | awk '{print $2}')

# 安装计算节点服务
grctl install compute --nodes $uuid

# 上线计算节点服务
grctl node up $uuid
```

