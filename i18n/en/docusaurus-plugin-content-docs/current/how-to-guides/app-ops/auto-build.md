---
title: 自动构建
description: Rainbond 自动构建功能的完整配置与使用指南
keywords:
  - 自动构建
  - 持续构建
  - Webhook
  - 镜像自动构建
  - API自动构建
---

## 概述

自动构建是现代开发流程中的重要环节，能够实现代码或镜像变更后自动触发应用的构建和部署。Rainbond 提供了多种自动构建方式，可以有效提升开发效率，缩短开发周期，帮助团队实现敏捷开发与持续交付。

Rainbond 支持以下几种自动构建方式：

1. [代码仓库自动构建](../app-deploy/gitops.md)：支持 GitHub、GitLab、Gitee 等代码仓库的 Webhook
2. [镜像仓库自动构建](../app-deploy/image/via-registry-deploy.md)：支持 Docker Hub、阿里云镜像仓库等的 Webhook
3. API 自动构建：提供 API 接口，支持与第三方 CI/CD 工具集成

## API 自动构建

API 自动构建是最灵活的自动部署方式，可以轻松与各种 CI/CD 工具集成，如 Jenkins、GitLab CI、GitHub Actions 等。

### 配置步骤

1. 进入组件内 → 构建源 → 开启 API 自动构建
2. 设置自定义秘钥，秘钥用于验证 API 调用的合法性，请设置复杂且安全的值
3. 保存配置

### API 使用方式

使用 curl 命令调用 API 触发自动构建：

```bash
curl -d {"secret_key":"<Secret >"}' -H "Content-type: application/json" -X POST <API地址>
```

### 与 CI/CD 系统集成

#### Jenkins 集成示例

在 Jenkins Pipeline 中添加以下脚本：

```groovy
stage('Trigger Rainbond Build') {
    steps {
        sh '''
        curl -d '{"secret_key":"<秘钥>"}' -H "Content-type: application/json" -X POST <API地址>
        '''
    }
}
```

#### GitLab CI 集成示例

在 `.gitlab-ci.yml` 文件中添加：

```yaml
deploy:
  stage: deploy
  script:
    - curl -d '{"secret_key":"<秘钥>"}' -H "Content-type: application/json" -X POST <API地址>
```

#### GitHub Actions 集成示例

在 GitHub Actions 工作流文件中添加：

```yaml
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Rainbond Build
        run: curl -d '{"secret_key":"<秘钥>"}' -H "Content-type: application/json" -X POST <API地址>
```

## 常见问题

### API 自动构建失败

**可能原因**：

- 秘钥不匹配
- API 调用格式错误
- API 地址错误

**解决方案**：

- 确认使用的秘钥与配置的秘钥一致
- 检查 API 调用的 JSON 格式是否正确
- 验证 API 地址是否完整且正确
