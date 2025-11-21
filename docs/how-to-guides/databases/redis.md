---
title: Redis
description: 在 Rainbond 中通过 KubeBlocks 快速部署和管理 Redis 缓存集群
keywords:
- Rainbond Redis 部署
- Redis 集群
- Redis 哨兵
- KubeBlocks Redis
---

Redis 是一个高性能的键值存储系统，广泛用于缓存、会话存储、消息队列等场景。您可以轻松通过 Rainbond 部署和管理 Redis 集群，仅支持哨兵 (Sentinel) 模式。

## 支持的版本和模式

| 主要版本 | 支持的次要版本       |
| :------- | :------------------- |
| 8.2      | 8.2.1                |
| 8.0      | 8.0.3、8.0.1         |
| 7.4      | 7.4.5、7.4.2         |
| 7.2      | 7.2.10、7.2.7、7.2.4 |
| 7.0      | 7.0.6                |
| 6.2      | 6.2.17，6.2.14       |
| 5.0      | 5.0.12               |

## 创建 Redis 集群

1. 进入团队空间，点击 **创建应用 → 数据库 → Redis**

![](/docs/how-to-guides/databases/create-databases.png)

2. 在创建页面，配置基础信息如下:

  - **资源配置:** 通常 Redis 至少需要 256M 内存和 100m CPU
  - **版本:** 选择合适的 Redis 版本
  - **实例数:** 1（单副本）或 3（高可用）
  - **存储类:** 选择合适的存储类, 自动获取集群中的 StorageClass 列表
  - **磁盘:** 根据数据量规划，建议 > 10Gi

3. 可选配置备份仓库以启用自动备份功能，你需要在安装时配置好备份仓库
4. 确认创建

## 访问 Redis

### 获取连接信息

进入 Redis 组件页面，点击 **依赖** 标签页，即可查看连接信息，包括主机地址、端口、用户名和密码。

### 集群内部访问

如果您的[应用依赖](../app-ops/dependon)的 Redis 组件，依赖信息会自动注入到应用的环境变量中。

```bash
# 在应用中可以直接使用以下环境变量
REDIS_HOST=gr40985e
REDIS_PORT=6379
REDIS_DEFAULT_USERNAME=root
REDIS_DEFAULT_PASSWORD=<自动注入的密码>
```


**代码示例**: 

1. 使用环境变量连接 Redis

```java
Jedis jedis = new Jedis("${REDIS_HOST}", ${REDIS_PORT});
jedis.auth("your-password");
```

2. 使用内部域名连接 Redis

```java
Jedis jedis = new Jedis("gr40985e", 6379);
jedis.auth("your-password");
```

### 集群外部访问

如果需要从 Rainbond 集群外部连接 Redis (如本地开发工具):

1. 进入 Redis 组件的 **高级设置 → 端口** 标签页，开启 **对外访问** 按钮
2. 使用默认生成的外部 IP 和端口连接 Redis


## 常见问题

### 连接 Redis 失败

**原因**: 密码错误、网络不通、防火墙阻止

**解决方案**:
1. 确认密码正确 (从依赖页面获取)
2. 检查服务状态
3. 测试网络连通性:
   ```bash
   telnet gr40985e 6379
   ```
4. 检查是否需要密码认证

## 相关文档

- [Redis 官方文档](https://redis.io/docs/)
- [应用依赖组件](../app-ops/dependon)
