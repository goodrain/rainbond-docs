---
title: RabbitMQ
description: 在 Rainbond 中通过 KubeBlocks 快速部署和管理 RabbitMQ 消息队列集群
keywords:
- Rainbond RabbitMQ 部署
- RabbitMQ 集群
- 消息队列
- KubeBlocks RabbitMQ
---

RabbitMQ 是一个功能强大的开源消息代理和队列服务器，实现了高级消息队列协议 (AMQP)。您可以通过 Rainbond 轻松部署和管理 RabbitMQ ReplicaSet 集群。

## 支持的版本和模式

| 主要版本 | 支持的次要版本 |
| :------- | :------------- |
| 3.8      | 3.8.14         |
| 3.9      | 3.9.29         |
| 3.10     | 3.10.25        |
| 3.11     | 3.11.28        |
| 3.12     | 3.12.14        |
| 3.13     | 3.13.2、3.13.7 |
| 4.0      | 4.0.9          |

## 创建 RabbitMQ 集群

1. 进入团队空间，点击 **创建应用 → 数据库 → RabbitMQ**

![](/docs/how-to-guides/databases/create-databases.png)

2. 在创建页面，配置基础信息如下:

  - **资源配置:** 通常 RabbitMQ 至少需要 256M 内存和 100m CPU
  - **版本:** 选择合适的 RabbitMQ 版本
  - **实例数:** 1（单副本）或 3（高可用）
  - **存储类:** 选择合适的存储类, 自动获取集群中的 StorageClass 列表
  - **磁盘:** 根据数据量规划，建议 > 10Gi

3. RabbitMQ 不支持备份功能，跳过备份仓库配置
4. 确认创建

## 访问 RabbitMQ

### 获取连接信息

进入 RabbitMQ 组件页面，点击 **依赖** 标签页，即可查看连接信息，包括主机地址、端口、用户名和密码。

### 集群内部访问

如果您的[应用依赖](../app-ops/dependon)的 RabbitMQ 组件，依赖信息会自动注入到应用的环境变量中。

```bash
# 在应用中可以直接使用以下环境变量
RABBITMQ_HOST=gr40985e
RABBITMQ_PORT=15672
RABBITMQ_DEFAULT_USERNAME=root
RABBITMQ_DEFAULT_PASSWORD=<自动注入的密码>
```


**代码示例**: 

1. 使用环境变量连接 RabbitMQ

```java
spring.rabbitmq.host=${RABBITMQ_HOST}
spring.rabbitmq.port=${RABBITMQ_PORT}
spring.rabbitmq.username=${RABBITMQ_DEFAULT_USERNAME}
spring.rabbitmq.password=${RABBITMQ_DEFAULT_PASSWORD}
spring.rabbitmq.virtual-host=/
```

2. 使用内部域名连接 RabbitMQ

```java
spring.rabbitmq.host=gr40985e
spring.rabbitmq.port=5672
spring.rabbitmq.username=admin
spring.rabbitmq.password=password
spring.rabbitmq.virtual-host=/
```

### 集群外部访问

如果需要从 Rainbond 集群外部连接 RabbitMQ (如本地开发工具):

1. 进入 RabbitMQ 组件的 **高级设置 → 端口** 标签页，开启 **对外访问** 按钮
2. 使用默认生成的外部 IP 和端口连接 RabbitMQ

**访问 RabbitMQ Web 控制台:** 在端口中添加 15672 端口并开启对外访问，然后使用外部 IP 和 15672 端口访问 Web 控制台。

## 常见问题

### Q: 无法连接 RabbitMQ

**原因**: 密码错误、网络不通、端口未开放

**解决方案**:
1. 确认连接信息正确
2. 测试网络连通性
3. 检查防火墙规则
4. 验证用户权限


## 相关文档

- [RabbitMQ 官方文档](https://www.rabbitmq.com/documentation.html)
- [应用依赖组件](../app-ops/dependon)
