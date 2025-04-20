---
title: 数据库迁移
description: 本文介绍如何将 Rainbond 默认数据库迁移到外部数据库
keywords:
- Rainbond 数据库迁移
- 外部数据库配置
- MySQL 数据迁移
---

## 概述

Rainbond 默认使用内置的 MySQL 8.0（rbd-db）来存储平台数据。出于以下原因，您可能需要将数据迁移到外部数据库：

* 需要更好的数据库性能
* 需要更强的数据库可靠性
* 需要统一的数据库管理
* 已有企业级数据库平台

:::tip
如果您正在安装 Rainbond，建议直接使用外部数据库，参考：
* [主机安装时配置外部数据库](/docs/installation/install-with-ui/)
* [Helm 安装时配置外部数据库](/docs/installation/install-with-helm/)
:::

## 准备工作

### 外部数据库要求

**数据库版本**
- MySQL 8.0 或更高版本
- 确保数据库服务稳定可用
- 具备足够的存储空间

**数据库配置**
- 创建两个数据库：
  - `console`：存储控制台数据
  - `region`：存储集群数据
- 创建具有相应权限的数据库用户
- 确保 Rainbond 集群可以访问该数据库

**备份准备**
- 确保有足够的存储空间保存备份文件
- 准备好数据库连接信息

## 迁移步骤

### 1. 备份当前数据

首先，我们需要备份当前 rbd-db 中的数据：

```bash
# 备份 console 数据库
kubectl exec -it rbd-db-0 -n rbd-system -- \
  mysqldump -uroot -p$MYSQL_ROOT_PASSWORD --databases console > console.sql

# 备份 region 数据库
kubectl exec -it rbd-db-0 -n rbd-system -- \
  mysqldump -uroot -p$MYSQL_ROOT_PASSWORD --databases region > region.sql
```

### 2. 导入数据到外部数据库

将备份的数据导入到外部 MySQL 数据库：

```bash
# 1. 导入 console 数据库
mysql -h <外部数据库地址> -P <端口> -u <用户名> -p<密码> < console.sql

# 2. 导入 region 数据库
mysql -h <外部数据库地址> -P <端口> -u <用户名> -p<密码> < region.sql
```

### 3. 修改 Rainbond 配置

配置 Rainbond 使用外部数据库：

```bash
# 编辑 rainbondcluster 配置
kubectl edit rainbondcluster -n rbd-system
```

添加以下配置：

```yaml
spec:
  # 配置控制台数据库连接信息
  uiDatabase:
    host: <外部数据库地址>        # 例如：192.168.1.100
    port: <端口>                # 例如：3306
    username: <用户名>          # 例如：root
    password: <密码>            # 例如：password
    name: console              # 数据库名称，固定为 console

  # 配置集群数据库连接信息
  regionDatabase:
    host: <外部数据库地址>        # 例如：192.168.1.100
    port: <端口>                # 例如：3306
    username: <用户名>          # 例如：root
    password: <密码>            # 例如：password
    name: region               # 数据库名称，固定为 region
```

### 4. 重启相关服务

```bash
# 重启 operator 使配置生效
kubectl delete pod -l name=rainbond-operator -n rbd-system
```

### 5. 验证迁移结果

1. **检查数据库配置是否生效**：
```bash
# 查看 rbd-api 的配置
kubectl get pod -n rbd-system -l name=rbd-api -o yaml | grep -A 5 args
```

预期输出应包含新的数据库连接信息：
```yaml
spec:
  containers:
  - args:
    - --mysql=<用户名>:<密码>@tcp(<外部数据库地址>:<端口>)/region
```

2. **检查平台功能**：
   * 登录控制台，确认数据是否完整
   * 测试创建应用等基本功能
   * 检查历史数据是否正常显示

### 6. 清理工作（可选）

确认迁移成功后，可以删除原有的数据库组件：

```bash
# 删除原有的 rbd-db 组件
kubectl delete rbdcomponent rbd-db -n rbd-system
```

## 常见问题

1. **数据库连接失败**
   * 检查数据库连接信息是否正确
   * 确认数据库是否允许远程连接
   * 检查网络连接是否正常

2. **数据不完整**
   * 确认备份是否完整
   * 检查导入过程是否有错误
   * 重新执行备份和导入

3. **服务无法启动**
   * 检查数据库权限配置
   * 查看服务日志排查问题
   * 确认配置格式是否正确

## 回滚方案

如果迁移过程中出现问题，可以通过以下步骤回滚：

1. 恢复原有的 rainbondcluster 配置
2. 重启 operator 使配置生效
3. 如果已删除 rbd-db，重新部署它

:::warning
执行迁移前，请务必做好完整备份，确保可以随时回滚到原始状态。
:::

