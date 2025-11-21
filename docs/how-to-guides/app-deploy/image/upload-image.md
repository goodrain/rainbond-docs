---
title: 上传本地镜像包部署
description: 在 Rainbond 中通过上传本地镜像包快速部署应用
keywords:
- Rainbond 镜像包上传
- Docker 镜像 tar 包
- 本地镜像部署
- 离线镜像部署
---

## 概述

Rainbond 支持通过上传本地 Docker 镜像包（tar 格式）的方式快速部署应用，无需连接镜像仓库。这种方式特别适用于离线环境、内网部署或需要快速导入已有镜像的场景。

## 适用场景

- **离线环境部署**: 无法访问公共镜像仓库的内网环境
- **快速镜像迁移**: 从一个环境快速导入镜像到另一个环境
- **已有镜像导入**: 将本地已构建好的镜像快速部署到 Rainbond
- **安全合规要求**: 需要在本地审查和扫描镜像后再上传
- **镜像备份恢复**: 恢复之前保存的镜像备份

## 支持的镜像格式

目前仅支持 **tar** 格式的 Docker 镜像包。

:::warning 重要限制
- 每个 tar 包**只能包含一个镜像**
- 如果需要部署多个镜像，请分别制作 tar 包并分别上传
- 不支持将多个镜像打包到同一个 tar 文件中上传
:::

## 操作步骤

1. 进入目标团队和应用，点击 **新建组件 → 从镜像构建 → 容器 → 上传**
2. 点击 **镜像上传** 按钮，选择准备好的 tar 文件
3. 等待文件上传完成后确认构建

### 重新上传镜像包

如果需要更新镜像，可以重新上传新的镜像包:

1. 进入组件详情页，**高级设置 → 构建源 → 更改 → 上传镜像包**
2. 点击 **选择文件** 上传新的 tar 文件并确认
5. 点击 **构建** 部署新版本

:::tip 版本管理
建议在 tar 文件名中包含版本信息，如 `myapp-v1.1.tar`，便于识别和管理不同版本。
:::

## 常见问题

### 上传的 tar 文件提示格式不正确

可能使用了错误的命令生成 tar 文件。确保使用 `docker save` 或 `docker export` 命令生成 tar 文件:

```bash
docker save -o myapp.tar myapp:v1.0
```

### Q: 上传后镜像无法启动

**可能原因**:
1. 镜像中的应用需要特定的环境变量
2. 端口配置不正确
3. 缺少必要的存储卷

**解决方案**:

1. **查看启动日志**:
   - 进入组件 → 日志
   - 查看错误信息

2. **检查环境变量**:
   在本地测试镜像需要的环境变量
   ```bash
   docker run -e APP_ENV=production -e PORT=8080 myapp:v1.0
   ```

3. **检查端口配置**:
   确认镜像中的应用监听端口与配置一致

4. **检查存储卷**:
   确保必要的存储目录已挂载

### 如何部署多个不同的镜像

**原因**: Rainbond 的镜像包上传功能，一个 tar 包只能包含一个镜像。

**解决方案**:

为每个镜像分别制作 tar 包并分别上传部署:

```bash
# 为每个镜像单独制作 tar 包
docker save -o nginx-alpine.tar nginx:alpine
docker save -o mysql-8.0.tar mysql:8.0
docker save -o redis-alpine.tar redis:alpine
# 然后分别上传每个 tar 文件，创建对应的组件
```

**部署步骤**:
1. 上传 `nginx-alpine.tar`，创建 nginx 组件
2. 上传 `mysql-8.0.tar`，创建 mysql 组件
3. 上传 `redis-alpine.tar`，创建 redis 组件

:::warning 注意
不要使用 `docker save -o bundle.tar nginx:alpine mysql:8.0` 将多个镜像打包到一个 tar 文件，这样的 tar 包无法正常上传或只会识别第一个镜像。
:::

## 镜像包制作最佳实践

### 1. 本地验证

上传前先在本地验证镜像可以正常运行:

```bash
# 测试镜像
docker run -d -p 8080:8080 myapp:v1.0

# 检查容器状态
docker ps

# 查看日志
docker logs <container_id>

# 测试功能
curl http://localhost:8080
```

### 2. 镜像命名规范

```bash
# 使用语义化版本
docker tag myapp:latest myapp:v1.2.3

# 包含环境标识
docker tag myapp:latest myapp:v1.2.3-production

# 保存时使用清晰的文件名
docker save -o myapp-v1.2.3-production.tar myapp:v1.2.3-production
```