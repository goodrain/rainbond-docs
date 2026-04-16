---
title: 常见问题
description: 常见问题
keywords:
- Rainbond 常见问题
---

## 产品认知

### Q: Rainbond 是否开源？

Rainbond 是不用懂 Kubernetes 的开源容器平台，源代码主要托管在 [Github](https://github.com/goodrain/rainbond)，国内代码托管平台 [Gitee](https://gitee.com/rainbond/Rainbond)、[GitCode](https://gitcode.com/goodrain/rainbond)。

社区版完全免费，企业版提供额外功能和商业支持。

### Q: Rainbond 和 Kubernetes 是什么关系？

Rainbond 以 Kubernetes 为基础设施，在其之上构建了应用管理平台。用户无需学习 Kubernetes 即可管理应用，但又能充分利用 Kubernetes 的优势。

### Q: Rainbond 支持多集群管理吗？

支持。可以通过在 Rainbond 中添加多个 Kubernetes 集群，实现应用的跨集群部署和管理。

### Q: Rainbond 如何保证高可用？

通过多节点部署、组件副本集、存储高可用等机制保证。建议生产环境采用至少 3 节点的集群部署。

### Q: Rainbond 是否支持私有化部署？

完全支持私有化部署，可以在企业内网环境中独立运行，不依赖外部网络。

### Q: Rainbond 适合中小企业使用吗？

非常适合。Rainbond 降低了应用云原生化的门槛，中小企业无需大量运维人员即可管理好应用。

### Q: Rainbond 和 Jenkins 如何选择？

两者定位不同：

- Jenkins 是 CI/CD 工具，专注于流水线构建
- Rainbond 是应用管理平台，提供全流程应用管理，包含构建、部署、运维等

可以结合使用：Jenkins 负责代码构建，Rainbond 负责应用部署和管理。

## 安装与运维

### Q: 如何清理磁盘空间？

请阅读 [集群资源清理](/docs/ops-guides/management/resource-cleanup) 文档。

### Q: 平台管理员密码如何重置？

请阅读 [重置管理员密码](/docs/ops-guides/management/reset-pwd) 文档。

### Q: 快速安装如何开放更多 TCP 端口

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

# 删除旧容器，使用上述新命令启动容器。注意：请检查 volume 挂载参数，确保数据不丢失
docker stop rainbond && docker rm rainbond
```
