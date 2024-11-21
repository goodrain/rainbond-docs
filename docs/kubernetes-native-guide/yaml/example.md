---
title: 使用 Yaml 部署 Wordpress 和 Mysql
description: 如何通过原生 K8s 可用的 Yaml 文件在 Rainbond 上部署一个 Wordpress 示例。
keywords:
- Wordpress Yaml
- Rainbond Yaml
---

本示例描述了如何通过一组 Yaml 声明式配置文件，在 Rainbond 上安装 WordPress 和 MySQL。 

这两个组件：
- 分别使用 Deployment 和 StatefulSet 两种 Workload 资源部署。
- 使用 PersistentVolumes 和 PersistentVolumeClaims 保存数据。
- 通过 Service 完成彼此间通信。
- 通过 Sercet 实现环境变量的加密获取。

:::caution
警告：
这种部署并不适合生产场景，因为它使用的是单实例 WordPress 和 MySQL Pod。 在生产场景中，请考虑使用 WordPress Helm Chart 部署 WordPress。
:::

## 教程目标

- 通过 Yaml 文件将 Workload 类资源部署到 Rainbond 中，包括 WordPress 和 MySQL。
- 在应用中的 `应用 > k8s资源` 处管理非 Workload 类资源，包括 Service 和 Sercet。
- 在组件中的 `其他设置 > Kubernetes属性` 处管理 Workload 的各种属性，包括 labels、volumes、volumeMounts 和取自其他来源的 env。
- 在组件中的 `环境设置` 处管理可以被 Rainbond 直接转化的 Workload 属性，包括自定义环境变量的配置。

## 准备开始

wordpress-depoyment.yaml，其中定义了：
- Deployment: wordpress
- Service: wordpress
- PersistentVolumeClaim: wp-pv-claim

<details>
  <summary>wordpress-depoyment.yaml</summary>
  <div>

```yaml
apiVersion: v1
kind: Service
metadata:
  name: wordpress
  labels:
    app: wordpress
spec:
  ports:
    - port: 80
  selector:
    app: wordpress
    tier: frontend
  type: LoadBalancer
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: wp-pv-claim
  labels:
    app: wordpress
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 20Gi
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: wordpress
  labels:
    app: wordpress
spec:
  selector:
    matchLabels:
      app: wordpress
      tier: frontend
  strategy:
    type: Recreate
  template:
    metadata:
      labels:
        app: wordpress
        tier: frontend
    spec:
      containers:
      - image: wordpress:4.8-apache
        name: wordpress
        env:
        - name: WORDPRESS_DB_HOST
          value: wordpress-mysql
        - name: WORDPRESS_DB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: mysql-pass
              key: password
        ports:
        - containerPort: 80
          name: wordpress
        volumeMounts:
        - name: wordpress-persistent-storage
          mountPath: /var/www/html
      volumes:
      - name: wordpress-persistent-storage
        persistentVolumeClaim:
          claimName: wp-pv-claim

```
</div>
</details>


mysql-statefulset.yaml，其中定义了：
- StatefulSet: wordpress-mysql
- Service: wordpress-mysql
- Secret: mysql-pass

<details>
  <summary>mysql-statefulset.yaml</summary>
  <div>

```yaml
apiVersion: v1
kind: Service
metadata:
  name: wordpress-mysql
  labels:
    app: wordpress
spec:
  ports:
    - port: 3306
  selector:
    app: wordpress
    tier: mysql
  clusterIP: None
---
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: wordpress-mysql
  labels:
    app: wordpress
spec:
  serviceName: wordpress-mysql
  selector:
    matchLabels:
      app: wordpress
      tier: mysql
  template:
    metadata:
      labels:
        app: wordpress
        tier: mysql
    spec:
      containers:
      - image: mysql:5.6
        name: mysql
        env:
        - name: MYSQL_ROOT_PASSWORD
          valueFrom:
            secretKeyRef:
              name: mysql-pass
              key: password
        ports:
        - containerPort: 3306
          name: mysql
        volumeMounts:
        - name: mysql-data
          mountPath: /var/lib/mysql
  volumeClaimTemplates:
  - metadata:
      name: mysql-data
    spec:
      accessModes: 
        - ReadWriteOnce
      resources:
        requests:
          storage: 20Gi
---
apiVersion: v1
kind: Secret
metadata:
  name: mysql-pass
type: Opaque
data:
  password: cGFzc3dvcmQ=
```
</div>
</details>

## 部署操作

1. 从 `工作空间` 进入指定的团队，通过点击 `新建 > Kubernetes YAML Helm` 即可进入文件上传页面。

2. 选择所属应用，或新建应用。

3. 从本地计算机中上传准备好的 Yaml 文件，支持批量上传。

4. 等待文件列表中出现所上传的 Yaml 文件。

5. 点击 `确认创建`。

6. Rainbond 将展示从 Yaml 中解析出的资源列表，对于上述 Wordpress 建站系统的 Yaml 而言，用户应该可以看到列表中包含以下内容，确认无误后，可以点击 `下一步`：

<details>
  <summary>资源列表</summary>
  <div>

- **Deployment**: wordpress
- **StatefulSet**: wordpress-mysql
- **Service**: wordpress-mysql wordpress
- **PVC**: wp-pv-claim
- **Secret**: mysql-pass
- **ServiceAccount**: wordpress-mysql wordpress

</div>
</details>

7. 在这个页面中，Rainbond 更加细化的展示对于每一种资源的处理方式，此页面无法编辑，确认无误后点击 `部署`：

<details>
  <summary>高级资源</summary>
  <div>

- **wordpress-mysql**: 作为 StatefulSet 类型的 Workload 转化为组件，识别到的规格定义转化为 Rainbond 可配置的图形化选项或特殊属性。
- **wordpress**: 作为 Deployment 类型的 Workload 转化为组件，识别到的规格定义转化为 Rainbond 可配置的图形化选项或特殊属性。
- **k8s 资源**: 收录管理 Service 、 Sercet 、PersistentVolumeClaim 资源。

</div>
</details>

8. wordpress 与 wordpress-mysql 已经被转化成为 Rainbond 中的组件，并且完成了构建过程，目前组件尚未启动，用户在此时可以进行管理操作.

<details>
  <summary>推荐操作</summary>
  <div>

- **存储转换**: 对于 Yaml 中定义的 PV、PVC 等资源，会在组件的 `其他设置 > Kubernetes属性` 中体现为 `volumeMounts volumes`，此处建议将一般性的数据持久化配置 `volumeMounts volumes` 定义为 Rainbond 组件的存储，删除 `volumeMounts volumes` 中的对应存储记录，并在 `存储 > 存储设置 > 添加存储` 中加入需要被持久化的路径即可。

- **开启对外服务**: Rainbond 提供了4/7层网关，可以方便的为组件提供对外服务入口，用户只需要在 `端口` 中为指定端口指定 `端口协议` 打开 `对外服务` 即可生成可供访问的 `Ip:Port` 或域名类型的访问地址。

</div>
</details>

9. 启动所有的组件。

## 验证

访问 wordpress 组件的对外服务地址，即可进入 wordpress 的配置页面，开始你的建站之旅。

## 管理组件 Kubernetes 属性

参考文档 [kubernetes属性](../../use-manual/k8s-attribute) 了解目前 Rainbond 所支持的多种规格定义的配置方式。

## 管理应用中的k8s资源

参考文档 [k8s资源操作](/docs/kubernetes-native-guide/import-manage/non-workload) 了解如何管理非 Workload 类型的资源。