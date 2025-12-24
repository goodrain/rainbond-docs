---
title: 常见问题
description: 常见问题
keywords:
- Rainbond 常见问题
---

## Q: 如何清理磁盘空间？

请阅读[集群资源清理](./ops-guides/management/resource-cleanup)文档

## Q: 平台管理员密码如何重置？

请阅读[重置管理员密码](./ops-guides/management/reset-pwd)文档

## Q: 快速安装如何开放更多 TCP 端口

默认情况下，快速安装只开放了 10 个 TCP 端口 `30000-30010`，在 Rainbond 页面中使用 TCP 访问应用只能使用这 10 个端口，如果需要开放更多端口，请按照以下步骤操作：

> 如脚本丢失，请重新下载脚本 `curl -o install.sh https://get.rainbond.com`。

Usage: 
```bash
bash ./install.sh port-forward <container-port> <host-port>
```

Example: 
```bash
bash ./install.sh port-forward 30011 30011
```

出现如下提示即表示端口开放成功，可以通过服务器的 `30011` 端口访问容器的 `30011` 端口：

```bash
✓ Port forwarding configured successfully!
You can now access container port 30011 via host port 30011
```

如使用 MacOS，则需要更改 `docker run` 启动命令，修改 `-p` 参数，添加更多端口映射，例如：

```bash
# 通过脚本查看当前启动命令
bash ./install.sh show-command

# 修改启动命令，添加更多端口映射
docker run --privileged -d \
  ......
  -p 30000-30010:30000-30010 \ # 默认端口映射
  -p 30011:30020 \             # 新增端口映射
  ......
```