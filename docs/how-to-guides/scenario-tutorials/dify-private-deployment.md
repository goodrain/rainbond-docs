---
title: Dify 私有化部署、升级和备份
description: 在 Rainbond 中安装 Dify，连接私有模型，备份数据库与文件，并按测试、升级和回滚流程维护生产实例。
keywords: [Dify私有化部署, Dify升级, Dify备份]
---

# Dify 私有化部署、升级和备份

**版本基线：** Rainbond 6.x；Dify 版本以应用市场模板详情和上游 Release 为准。升级前必须核对 Dify 的数据库迁移说明。

## 操作步骤

1. 从应用市场选择 Dify 模板，先查看组件清单、镜像版本和资源要求。
2. 安装到独立团队/应用，设置管理员密码、对象存储、PostgreSQL、Redis 和向量数据库参数。
3. 在 Rainbond 部署模型服务或准备外部模型 API，在 Dify 中填写 base URL、模型名和 API Key。
4. 配置域名和 TLS，限制管理入口，创建测试工作流验证模型调用。
5. 备份 PostgreSQL、向量数据库、对象存储和 Dify 持久化目录。
6. 克隆到测试环境升级；验证迁移、工作流、知识库和模型调用后再升级生产。

![Rainbond 应用市场安装应用](/img/video/app-store-install-step-4.png)

## 备份检查

```bash
# 示例仅表示数据库逻辑备份动作，变量从安全环境注入
pg_dump --format=custom --file=dify.dump "$DATABASE_URL"
```

不要在命令历史或文档中写真实密码。数据库、向量库和上传文件必须属于同一恢复点。

## 常见故障

- 模型调用 401：检查 Dify 供应商配置的密钥、base URL 和模型名称。
- Worker 堆积：检查 Redis、队列组件日志和 Worker 副本资源。
- 升级后迁移失败：停止继续写入，保留日志，按上游版本迁移路径恢复备份。
- 知识库文件丢失：检查对象存储/持久化目录是否随数据库一起备份。

升级步骤会随 Dify 版本变化。升级前应查看目标版本 Release，并对比新版 `.env.example` 与现有 `.env`；如果修改过 `docker-compose.yaml`，要把定制项重新应用到新版本文件，不能直接沿用旧文件。参考 [Dify 官方 Docker Compose 部署与升级说明](https://docs.dify.ai/en/self-host/deploy/quick-start/docker-compose)。

产品能力与边界见 [AI 私有化部署专题](/solutions/ai-private-deployment)。
