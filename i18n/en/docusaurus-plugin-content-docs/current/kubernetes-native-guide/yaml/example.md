---
title: Deploy Wordpress and Mysql with Yaml
description: How to deploy a Wordpress example on Rainbond with Yaml files available in native K8s.
keywords:
  - Wordpress Yaml
  - Rainbond Yaml
---

This example describes how to install WordPress and MySQL on Rainbond through a set of Yaml declaratory profiles.

These two components：

- Deploying resources for employment and statefulSet respectively, will be used to deploy workload.
- Save data using PersistentVolumes and PersistentVolumes
- Complete communication through the service.
- Encryption of environmental variables via Sercet.

:::caution
Warning：
this deployment is not suitable for production scenes because it uses single instance WordPress and MySQL Pod. In production scenarios, consider using WordPress Helm Chart to deploy WordPress.
:::

## Tutorial Targets

- Use Yaml files to deploy Workload class resources to Rainbond, including WordPress and MySQL.
- Manage non-Workload class resources in the `Apps > k8s resource`s in apps, including Service and Sercet.
- Manage Workload properties in `Other Settings > Kubernetes Properties` in the component, including labels, volume, volumeMounts and env from other sources.
- The `Environment Settings` section of the component manages the Workload properties that can be converted directly by Rainbond and includes the configuration of the custom environment variable.

## Ready to start

wordpress-depoyment.yaml, defined：

- Deployment: wordpress
- Service: wordpress
- PersistentVolumeClaim: wp-pv-claim

<details>
  <summary>wordpress-depyment.yaml</summary>
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

mysql-statefulset.yaml, defined：

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

## Deploy Operations

1. Enter the team from the `workspace` to upload the file by clicking the new `>Kubernetes YAML Helm`.

2. Select an app or create a new app.

3. Upload a ready Yaml file from a local computer. Bulk upload is supported.

4. Wait for uploaded Yaml files to appear in the list of files.

5. Click `Confirm Create`.

6. Rainbond will display a list of resources that are parsed from Yaml. For the aforementioned Wordpress building system Yaml, users should be able to see that the list contains the following. Once confirmed, click `Next`：

<details>
  <summary>Resource List</summary>
  <div>

- **Deemployment**: wordpress
- **StatefulSet**: wordpress-mysql
- **Service**: wordpress-mysql wordpress
- **PVC**: wp-pv-claim
- \*_Secretaries_: mysql-pass
- **ServiceAccount**: wordpress-mysql wordpress

</div>
</details>

7. On this page, Rainbond is more nuanced in how each resource is handled, this page cannot be edited, and then click `Deploy`：

<details>
  <summary>Advanced Resources</summary>
  <div>

- \*_wordpress-mysql_: Convert to a component as Workload of StatefulSet type and identify specifications to be converted to a configurable graphical option or special attribute of Rainbond type.
- **wordpress**: Convert to component as Workload of employment type, identified specification definitions to configurable graphical options or special attributes of Rainbond
- **k8s Resources**: Access to Management Service, Sercet, PersistentVolumeClaim resources.

</div>
</details>

8. Wordpress and wordpress-mysql have been converted to components in Rainbond and have completed the build process. The component is not yet started, and users can manage it at this time.

<details>
  <summary>Recommended Actions</summary>
  <div>

- **Storage Transform**: For such resources as PVs, PVC as defined in Yaml, this will be reflected as `volumes` in `Other Settings > Kubernetes Attribute`, It is recommended that the general data persistence configuration `volumeMounts volumes` be defined as the storage of Rainbond components, delete the corresponding memory in `volumeMounts volumes` and add a path that needs to be perpetuated in `Storage > Storage Settings > Add Storage`.

- **Open External Service**: Rainbond provides a 4/7 layer of gateway, easily provides an external service entry for the component. Users only need to open `External Service` in the `Port` for the specified port to generate an accessible `Ip:Port` or domain name type.

</div>
</details>

9. Start all components.

## Verify

Visit the external service address of the wordpress component to go to the wordpress configuration page to start your installation trip.

## Manage components properties

参考文档 [kubernetes属性](../../use-manual/k8s-attribute) 了解目前 Rainbond 所支持的多种规格定义的配置方式。

## Manage k8s resources in apps

See document [k8s资源操作](/docs/kubernetes-native-guide/import-manage/non-workload) for managing non-Workload type resources.
