---
title: n8n 私有化部署、升级和备份
description: 在 Rainbond 中部署 n8n，配置数据库、加密密钥、Webhook 域名和持久化，并建立升级与恢复流程。
keywords: [n8n私有化部署, n8n升级, n8n备份]
---

# n8n 私有化部署、升级和备份

**版本基线：** Rainbond 6.x；n8n 版本以模板或上游镜像标签为准。生产环境不要使用 `latest`。

## 操作步骤

1. 从应用市场或镜像创建 n8n，固定镜像版本。
2. 使用 PostgreSQL 保存生产数据，配置持久化目录。
3. 通过平台环境变量注入 `N8N_ENCRYPTION_KEY`、数据库参数和时区；密钥不要写入模板。
4. 在网关配置域名和 TLS。反向代理场景设置 `N8N_WEBHOOK_URL=https://n8n.example.com/` 与 `N8N_PROXY_HOPS=1`，并转发 `X-Forwarded-For`、`X-Forwarded-Host` 和 `X-Forwarded-Proto`。
5. 创建一个测试工作流，验证手动执行、定时触发和 Webhook 回调。
6. 备份数据库、加密密钥和持久化文件；在副本环境验证恢复。
7. 阅读上游 Release 后升级测试环境，再升级生产并保留上一镜像版本。

![Rainbond 应用市场安装与参数配置入口](/img/video/app-store-install-step-5.png)

## 验证与故障处理

```bash
curl -I https://n8n.example.com/
# 激活带 Webhook 节点的工作流后，使用该节点实际配置的生产路径
curl -i https://n8n.example.com/webhook/<configured-path>
```

- Webhook 返回旧域名：核对外部 URL 环境变量和网关转发头。
- `/webhook-test/` 只用于编辑器测试监听期间；持续调用应使用已激活工作流的 `/webhook/` 地址。
- 凭据无法解密：恢复时必须使用原 `N8N_ENCRYPTION_KEY`。
- 升级后节点不可用：检查 n8n 版本变更和社区节点兼容性。
- 执行记录增长过快：设置执行数据保留策略，并监控数据库容量。

官方核验资料：[自定义加密密钥](https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/configuration-examples/set-a-custom-encryption-key)、[反向代理 Webhook 配置](https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/configuration-examples/configure-webhook-urls-with-reverse-proxy)、[升级 n8n](https://docs.n8n.io/deploy/host-n8n/keep-n8n-running/update-n8n)。

相关生产实践见 [n8n AI 工作流文章](/blog/n8n-ai-workflow-automation) 和 [AI 私有化专题](/solutions/ai-private-deployment)。
