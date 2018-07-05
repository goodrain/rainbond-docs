---
title: 安装问题排查
summary: 安装问题排查
toc: true
---

当安装Rainbond 遇到问题时，请先参考本篇文档。如果问题未解决，请按文档要求收集相关信息通过 Github [提供给 Rainbond开发者](https://github.com/goodrain/rainbond-install/issues/new)或者通过邮件反馈<rainbond@goodrain.com>。

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