---
title: x86 应用迁移到 ARM64：依赖盘点、多架构构建和验证
description: 盘点镜像与闭源依赖，构建 amd64/arm64 多架构镜像，在 Rainbond 异构集群中分阶段验证与切换。
keywords: [x86迁移ARM, ARM64应用迁移, 异构应用交付]
---

# x86 应用迁移到 ARM64

**版本基线：** Rainbond 6.x；目标架构为 `linux/arm64`。平台可承载多架构应用，但不能把仅有 x86 二进制的依赖自动转换为 ARM64。

```bash
docker buildx create --use --name multiarch
docker buildx build --platform linux/amd64,linux/arm64 \
  -t registry.example.com/team/app:v1.0.0 --push .
docker buildx imagetools inspect registry.example.com/team/app:v1.0.0
```

## 操作步骤

1. 盘点基础镜像、系统包、JDK/Node/Python、数据库驱动和闭源 SDK。
2. 为缺失 ARM64 的依赖寻找官方版本；无法替换时将该组件继续留在 x86 节点。
3. 构建多架构镜像，确认 manifest 同时包含 `linux/amd64` 与 `linux/arm64`。
4. 在 Rainbond 中接入 ARM64 节点或集群，先部署无状态组件。
5. 验证接口、文件编码、时间、性能和外部依赖，再迁移有状态组件。
6. 保留 x86 版本和数据回切路径，逐步切流而非一次性替换。

![鲲鹏与麒麟环境的部署流程图](/img/offline-and-xinchuang/kunpeng-kylin-deploy-flow.svg)

## 故障处理

- `exec format error`：镜像或入口二进制架构不匹配。
- 镜像可拉取但启动失败：检查动态链接库和本地扩展是否提供 ARM64。
- 性能变化：用相同请求和数据量做基准，不用单次启动时间下结论。
- 混合集群调度错误：检查镜像 manifest、节点架构标签和组件调度设置。

更多边界见 [x86 到 ARM 迁移专题](/offline-and-xinchuang/x86-to-arm)。
