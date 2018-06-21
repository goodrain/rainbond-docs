---
title: 安装命令
summary: 增加计算节点的命令
toc: false
toc_not_nested: true
asciicast: true
---

<div id="toc"></div>


##扩容计算节点

命令在管理节点执行，无需登陆到计算节点
{% include copy-clipboard.html %}
```bash

cd rainbond-intall/scripts

# 管理节点初始化计算节点(主机名compute01,ip, 密码)
./compute.sh init single <hostname> <ip> <passwd>

# 安装计算节点服务
./compute.sh install

# 计算节点uid
uuid=$(grctl node list | grep <计算节点内网ip> | awk '{print $2}')

# 上线计算节点服务
grctl node up $uuid
```

{{site.data.alerts.callout_info}}
如果在扩容时,遇到问题请给我们提 [issue](https://github.com/goodrain/rainbond-install/issues/new)，我们会第一时间处理。
{{site.data.alerts.end}}