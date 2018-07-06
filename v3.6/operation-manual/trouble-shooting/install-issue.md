---
title: 安装问题排查
summary: 安装问题排查
toc: true
---

当安装Rainbond 遇到问题时，请先参考本篇文档。如果问题未解决，请按文档要求收集相关信息通过 Github [提供给 Rainbond开发者](https://github.com/goodrain/rainbond-install/issues/new)或者通过邮件反馈<rainbond@goodrain.com>。

安装问题反馈需要提供如下信息:

1. 内核版本，系统信息；
2. 机器配置 如：CPU,内存,存储,网络(网络是否有限制)；
3. 安装出错步骤完整截图，具体哪一步出错；
4. 重新执行后，是否还是同样问题

## 安装网络问题排查

如果服务器无法直接联网，只能通过代理上网，需要做如下设置。

```bash
# 前提已经有了相关代理服务,示例代理192.168.199.39:1087
# bash/zsh

export http_proxy=http://192.168.199.39:1087
export https_proxy=http://192.168.199.39:1087
export no_proxy="goodrain.me"

# 在安装完docker需要配置

mkdir -p /etc/systemd/system/docker.service.d
cat > /etc/systemd/system/docker.service.d/http-proxy.conf <<EOF
[Service]
Environment="HTTP_PROXY=http://192.168.199.39:1087" "HTTPS_PROXY=http://192.168.199.39:1087" "NO_PROXY=goodrain.me"
EOF

# 重启docker

systemctl daemon-reload
systemctl restart docker
```

## 扩容计算节点了，grclt node list却没有列出对应的计算节点

```bash
# 确定计算节点uuid信息是否有重复的
salt "*" grains.item uuid
# 修改重复的计算节点的uuid 可通过uuidgen生成uuid
/opt/rainbond/envs/kubelet.sh HOST_UUID的值
/opt/rainbond/etc/rbd-node/node_host_uuid.conf:host_uuid的值
两者的值一致，修改完成
# 重启计算节点服务
systemctl restart node
systemctl restart kubelet
# 被重复的节点也需要重启一下node
systemctl restart node
# 重新上线重复节点
grclt node up <新生成的uuid>
```