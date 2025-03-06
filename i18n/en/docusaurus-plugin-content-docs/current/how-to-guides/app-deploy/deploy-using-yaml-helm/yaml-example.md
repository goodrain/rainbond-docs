---
title: 使用 YAML 文件部署
description: 通过上传 Kubernetes 原生 YAML 文件在 Rainbond 平台上部署 WordPress 应用的完整指南
keywords:
  - WordPress YAML 部署
  - Rainbond YAML 导入
  - Kubernetes 应用迁移
  - WordPress 示例部署
---

本文档将指导您如何利用 Rainbond 的 YAML 导入功能，通过上传标准 Kubernetes YAML 文件部署一个功能完整的 WordPress 博客系统。通过本指南，您将了解 Rainbond 如何将 Kubernetes 原生资源无缝转换为平台应用模型。

## 准备工作

1. 已了解 [Kubernetes 资源到 Rainbond 应用模型的转换原理](./yaml-convert-ram.md)
2. 准备示例 `example.yaml` 文件，该文件包含以下 Kubernetes 资源：
  - `Deployment`：WordPress 应用组件
  - `StatefulSet`：MySQL 数据库组件
  - `Service`：MySQL 服务资源

<details><summary>example.yaml</summary>
  <div>

```yaml
---
apiVersion: v1
kind: Service
metadata:
  name: mysql-wordpress-example
  labels:
    app: mysql-wordpress-example
spec:
  type: ClusterIP
  ports:
    - port: 3306
      targetPort: mysql
  selector:
    app: mysql-wordpress-example
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: wordpress-example
  labels:
    app: wordpress-example
spec:
  selector:
    matchLabels:
      app: wordpress-example
  template:
    metadata:
      labels:
        app: wordpress-example
    spec:
      containers:
        - name: wordpress-example
          image: registry.cn-hangzhou.aliyuncs.com/goodrain/bitnami-wordpress:6
          imagePullPolicy: IfNotPresent
          env:
          - name: WORDPRESS_DATABASE_HOST
            value: "mysql-wordpress-example"
          - name: WORDPRESS_DATABASE_PORT_NUMBER
            value: "3306"
          - name: WORDPRESS_DATABASE_PASSWORD
            value: "wordpress"
          - name: WORDPRESS_DATABASE_USER
            value: "root"
          - name: WORDPRESS_DATABASE_NAME
            value: "wordpress"
          - name: WORDPRESS_USERNAME
            value: "admin"
          - name: WORDPRESS_PASSWORD
            value: "admin"
          ports:
            - name: http
              containerPort: 8080
          volumeMounts:
            - name: wordpress-persistent-storage
              mountPath: /var/www/html
      volumes:
        - name: wordpress-persistent-storage
          emptyDir: {}
---
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: mysql-wordpress-example
  labels:
    name: mysql-wordpress-example
spec:
  selector:
    matchLabels:
      app: mysql-wordpress-example
  template:
    metadata:
      labels:
        app: mysql-wordpress-example
    spec:
      containers:
      - image: registry.cn-hangzhou.aliyuncs.com/goodrain/bitnami-mysql:latest
        name: mysql
        env:
        - name: MYSQL_ROOT_PASSWORD
          value: "wordpress"
        - name: MYSQL_DATABASE
          value: "wordpress"
        ports:
        - containerPort: 3306
          name: mysql
        volumeMounts:
        - name: mysql-data
          mountPath: /var/lib/mysql
      volumes:
      - name: mysql-data
        emptyDir: {}
```

</div>
</details>

## 实施步骤

### 1. 导入 YAML 文件

1. 进入 Rainbond 平台，选择目标团队
2. 点击 **新建应用** → **Kubernetes YAML/Helm** → **YAML 文件上传**
3. 选择本地 `example.yaml` 文件至上传区域
4. 点击 **确认上传**

  ![上传YAML文件](/docs/how-to-guides/deploy-using-yaml-helm/upload-yaml.png)

### 2) 资源识别阶段

上传完成后，Rainbond 自动识别 YAML 文件中包含的 Kubernetes 资源，并显示为列表：

- **工作负载资源**：
  - `Deployment`: wordpress-example（WordPress 应用服务器）
  - `StatefulSet`: mysql-wordpress-example（MySQL 数据库服务器）
- **服务资源**：
  - `Service`: mysql-wordpress-example（MySQL 服务）

确认资源列表无误后，点击 **下一步**。

![资源识别](/docs/how-to-guides/deploy-using-yaml-helm/yaml-resource.png)

### 3. 应用模型转换

Rainbond 将识别到的 Kubernetes 资源转换为平台应用模型：

- **WordPress 组件**：由 `Deployment` 类型工作负载转换而来
  - 容器镜像、环境变量、挂载卷等规格定义被映射到对应的 Rainbond 配置项
  - 端口配置转换为组件端口设置
- **MySQL 组件**：由 `StatefulSet` 类型工作负载转换而来
  - 数据库参数通过环境变量方式保留
  - 存储卷配置被转换为存储设置
- **其他 Kubernetes 资源**：进入应用的 **K8s 资源** 管理面板

  ![高级资源识别](/docs/how-to-guides/deploy-using-yaml-helm/advanced-resources.png)

检查转换结果无误后，点击 **部署**。

### 4. 部署和访问应用

1. 在应用拓扑图页面，点击 **启动** 按钮启动整个应用
2. 等待所有组件启动完成（状态变为绿色运行中）
3. 进入 `wordpress-example` 组件详情页 → **端口** 选项卡
4. 为 WordPress 的 HTTP 端口（8080）启用 **对外服务**
5. 使用生成的访问地址打开 WordPress 站点

> **提示**：WordPress 管理后台路径为 `/wp-admin`，默认管理员账号/密码：`admin`/`admin`

## 优化配置

### 存储持久化优化

YAML 文件中定义的存储资源（如 EmptyDir）在 Rainbond 中可以进行优化处理：

1. 导入后，原 YAML 中的 `volumeMounts` 和 `volumes` 配置会被保存在组件的 **其他设置** > **Kubernetes属性** 中
2. 对于需要持久化的数据（如 WordPress 内容和 MySQL 数据），推荐使用 Rainbond 的存储功能：
  - 删除 Kubernetes 属性中相应的 `volumeMounts`/`volumes` 条目
  - 进入组件的 **存储** > **存储设置** > **添加存储**
  - 添加相应的持久化路径
    - 例如 MySQL 的 `/bitnami/mysql/data`
    - 例如 WordPress 的 `/bitnami/wordpress`

## 故障排除

- **组件启动失败**: 查看组件的事件和日志，确认镜像拉取和资源配置是否正确
- **WordPress 无法连接 MySQL**: 检查环境变量配置，确保数据库连接参数正确且 MySQL 服务已正常启动
- **数据持久化问题**: 如使用了默认的 EmptyDir，重启后数据会丢失，请参照上述存储优化配置持久化存储
