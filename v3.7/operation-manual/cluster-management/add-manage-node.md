---
title: 扩容管理节点
summary: 扩容一个，或多个管理节点
toc: true
---

{{site.data.alerts.callout_danger}}

- 管理节点主机名(hostname)仅支持以manage命名开头，且不能为manage01，如managexxx.
- 管理节点不支持批量扩容操作，只能依次扩容。
  
{{site.data.alerts.end}}

```bash
# 在管理节点manage01执行如下操作
# ssh安装
grctl node add --hostname <主机名> --iip <内网ip> --private-key <信任私钥(/root/.ssh/id_rsa)> --role manage
# 密码安装(仅支持root用户)
grctl node add --hostname <主机名> --iip <内网ip> --root-pass <root用户密码> --role manage
```

扩容完成可以执行如下:

```bash
# 更新部分配置
salt "*" state.sls common.node_conf
# 如管理节点的 entrance 服务
systemctl restart node
systemctl restart rbd-entrance
# 如果扩容前已经有应用运行了，请将管理节点1的rbd-lb的数据同步到其他管理节点
数据路径：/opt/rainbond/etc/rbd-lb/
```
