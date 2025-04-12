---
title: Export Helm Chart package
description: Support Helm package delivery for cloud-native applications
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Scenario

The application template export mechanism provided by Rainbond is mainly used to solve the application delivery problem for end users.Cannot meet the scenario of delivering applications through Helm

Applicable scenarios include:

- Delivery environment provides Helm command
- Offline business, or delivery scenarios with security restrictions.

## Prerequisites

- Rainbond platform version is not lower than v5.10.1-release.
- Refer to the documentation to complete the application release process and publish the application to the internal component library.
- Only supports application packages with governance mode as native Service mode

## Export Helm Chart package

Find the published application template in the internal component library, and click to export `Helm Chart package` on the `Export Application Template` page.After the export is completed, you can download the exported Helm Chart package.

The obtained Chart package is named in the format of `{application name}-{application template version number}-helm.tar.gz`.The package can be decompressed in any Linux operating system, and the directory structure after decompression is as follows (taking pig as an example):

```bash
pig-0.1-helm
├── pig
│   ├── Chart.yaml
│   ├── templates
│   │   ├── Deployment.yaml
│   │   ├── Secret.yaml
│   │   ├── ...
│   │   ├── StatefulSet.yaml
│   │   └── Service.yaml
│   └── values.yaml
├── plugin-images.tar
└── component-images.tar
```

- The first level directory stores the Helm Chart package, the image package used by the plugin, and the image package used by the workloads type resources in sequence.
- All resources included in the application will be stored in the templates directory of the Helm Chart package (except ingress resources).

## Helm Chart usage

### Helm Chart configuration introduction

As we all know, Helm Chart packages are configurable. Below will introduce what parameters can be configured in the Helm Chart package exported by Rainbond, that is, the introduction of values.yaml.

```bash
mysql:
  MYSQL_HOST:127.0.0.1
  MYSQL_PASS:123456
redis:
  REDIS_HOST:127.0.0.1
  REDIS_PASS:123456
imageDomain: goodrain.me
storageClass: ""
```

**mysql** **redis** :Configuration group information, `MYSQL_HOST:127.0.0.1` `REDIS_PASS:123456` are the detailed configuration items of your configuration group, here corresponds to the configuration group under the application, the content of the configuration group as the configuration items in values.yaml.\
**imageDomain** : The repository address where the images are stored, the source of the images.\
**storageClass** : The pvc created by Rainbond will use the `storageClass` created by Rainbond by default, you can modify it to use your own `storageClass` by configuration

### Step one: Upload compressed images

<Tabs groupId="upload">
  <TabItem value="有私有镜像仓库" label="有私有镜像仓库" default>
   Upload the exported tgz package to the environment that needs to be delivered and decompress it, and decompress the `plugin-images.tar` and `component-images.tar` image packages into the environment, and then configure and install through the Helm command, no need to specify the image repository when Helm is installed.   

```bash
docker load < plugin-images.tar
docker load < component-images.tar
```

After loading the images, re-tag them and push them to your image repository

```bash
docker tag goodrain.me/pig:20221228165641 registry.cn-hangzhou.aliyuncs.com/goodrain/pig:20221228165641
docker push registry.cn-hangzhou.aliyuncs.com/goodrain/pig:20221228165641
```

:::warning
Note: If you need to modify the name of the image, you need to modify the image field of the corresponding component in the template directory of the export package accordingly.
:::

```bash
helm install --set imageSource=registry.cn-hangzhou.aliyuncs.com/goodrain myapp ./
```

  </TabItem>
  <TabItem value="无私有镜像仓库" label="无私有镜像仓库">
    Upload the exported tgz package to the environment that needs to be delivered and decompress it, and decompress the `plugin-images.tar` and `component-images.tar` image packages into the environment, and then configure and install through the Helm command, no need to specify the image repository when Helm is installed.   

```bash
docker load < plugin-images.tar
docker load < component-images.tar
```

:::warning
Note: If there are multiple nodes, this command needs to be executed on each node.
:::

### Step two: Execute the installation command

Enter the directory of the Helm Chart package and execute the installation command.

```bash
cd test-0.1
helm install myapp ./
```
</TabItem>
</Tabs>
### Advanced settings

#### Configure your own image address

After uploading the loaded images to your own image repository, you can set them through the imageSource field.

```bash
helm install --set imageSource=registry.cn-hangzhou.aliyuncs.com/goodrain myapp ./
```

#### Modify StorageClass

The storage in the exported Chart package uses the StorageClass provided by Rainbond, rainbondvolumerwx, by default. If you need to specify your own StorageClass, you can configure it as follows.

```bash
helm install --set storageClass=mysc myapp ./
```