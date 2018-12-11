---
title: 扩容节点
summary: 扩容管理或计算节点
toc: true
---

## 一、 扩容管理节点

{{site.data.alerts.callout_danger}}

- 管理节点不支持批量扩容操作，只能依次扩容。
- 管理节点数目推荐为奇数1,3,5,7。两个节点无法保证高可用
  
{{site.data.alerts.end}}

```bash
# 在管理节点node01执行如下操作
# ssh安装
grctl node add --hostname <主机名> --iip <内网ip> --private-key <信任私钥(/root/.ssh/id_rsa)> --role master
# 密码安装(仅支持root用户)
grctl node add --hostname <主机名> --iip <内网ip> --root-pass <root用户密码> --role master
```

## 二、 扩容计算节点

{{site.data.alerts.callout_danger}}

- 计算节点主机名(hostname)推荐以compute命名开头，如computexxx.

{{site.data.alerts.end}}

```bash
# 在管理节点node01执行如下操作
# ssh安装
grctl node add --hostname <主机名> --iip <内网ip> --private-key <信任私钥(/root/.ssh/id_rsa)> --role worker
# 密码安装(仅支持root用户)
grctl node add --hostname <主机名> --iip <内网ip> --root-pass <root用户密码> --role worker
```

## 三、 管理后台添加

- 添加节点

<a href="https://static.goodrain.com/images/docs/5.0/operation-manual/add-node1.png" target="_blank"><img src="https://static.goodrain.com/images/docs/5.0/operation-manual/add-node1.png" width="100%"  /></a>

- 编辑节点属性

<a href="https://static.goodrain.com/images/docs/5.0/operation-manual/add-node2.png" target="_blank"><img src="https://static.goodrain.com/images/docs/5.0/operation-manual/add-node2.png" width="100%"  /></a>