---
title: 扩容计算节点
summary: 添加一个或多个计算节点
toc: true
---

{{site.data.alerts.callout_danger}}
- 计算节点主机名(hostname)仅支持以compute命名开头，如computexxx.
{{site.data.alerts.end}}

```bash
# 在管理节点manage01执行如下操作
# ssh安装
grctl node add --hostname <主机名> --iip <内网ip> --private-key <信任私钥(/root/.ssh/id_rsa)> --role worker
# 密码安装(仅支持root用户)
grctl node add --hostname <主机名> --iip <内网ip> --root-pass <root用户密码> --role worker
```