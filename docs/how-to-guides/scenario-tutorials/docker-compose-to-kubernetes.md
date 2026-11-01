---
title: Docker Compose 迁移到 Kubernetes：用 Rainbond 转换并验证多服务应用
description: 检查 Compose 配置，上传项目包，验证端口、环境变量、存储和依赖，并在 Rainbond 上完成迁移后的访问与排错。
keywords: [Docker Compose迁移到Kubernetes, Compose应用部署]
---

# Docker Compose 迁移到 Kubernetes

**版本基线：** Rainbond 6.x；Docker Compose Specification。先在原环境执行：

```bash
docker compose config --quiet
docker compose config > compose.resolved.yaml
```

## 操作步骤

1. 将 `docker-compose.yml`、`.env`、配置文件和初始化脚本打成 ZIP/TAR/TGZ。
2. 在团队中选择“新建应用 > Docker Compose”，上传压缩包并填写 Compose 相对路径。
3. 检查每个 `service` 是否转换为组件，核对 `image`、`ports`、`environment`、`volumes`、`depends_on`。
4. 对 `build` 服务先构建并推送镜像；Rainbond 不会直接执行本地 Compose build。
5. 启动应用，依次检查构建日志、事件、运行日志和内部依赖。
6. 开通 HTTP 端口并配置应用网关域名，完成真实请求验证。

![Docker Compose 转换后的 Rainbond 应用拓扑](/img/homepage/imagevideo/hero-app-topology.png)

## 常见故障

| 现象 | 检查方法 | 处理 |
| --- | --- | --- |
| 私有镜像拉取失败 | 查看组件事件 | 补充仓库凭据并确认节点可访问仓库 |
| `${VAR}` 未展开 | 对比 `compose.resolved.yaml` | 上传 `.env` 或在组件环境变量中设置 |
| 数据重启后丢失 | 检查目标挂载目录 | 为有状态目录配置持久化存储 |
| `depends_on` 后仍启动失败 | 查看依赖服务日志 | 增加健康检查或等待脚本 |

完整转换限制见 [Docker Compose 部署文档](/docs/how-to-guides/app-deploy/docker-compose)。
