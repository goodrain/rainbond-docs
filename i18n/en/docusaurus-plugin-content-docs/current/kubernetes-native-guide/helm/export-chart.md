---
title: Export Helm Chart Pack
description: Support for Helm package to deliver cloud-native applications
---

Import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Scene

The application template export mechanism provided by Rainbond is primarily used to address problems in the delivery of applications to end-users.Unable to meet the scene of the app delivered via Helm

Applicable scenario includes：

- Delivery environment provides Helm command
- Offline operations, or delivery scenarios, etc.

## Prerequisite requirements

- Rainbond platform version is no less than v5.10.1-release.
- Reference document, complete [应用发布](/docs/use-manual/app-manage/share-app) process and post the app to the internal component library.
- Only apps that support governance mode as native service mode

## Export Helm Chart Pack

A published application template was found in the internal component library. In the `Export Application Template` page click to export the `Helm Chart package`.The exported Helm Chart pack can be downloaded once the export is complete.

得到的 Chart 包,命名格式为 `{应用名称}-{应用模板版本号}-helm.tar.gz` 。The pack can be unpacked in any Linux operating system. The extracted directory structure is as follows (in pig for example)：

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

- The first layer of directory is stored in turn by Helm Chart pack, the image pack used by the plugin, the mirror pack used by the workloads type resource.
- All resources contained in the app will be stored in the Helm Chart template directory (except for address resources).

## Helm Chart Usage

### Introduction to Helm Chart Configuration

As we know, the Helm Chart pack is configurable and will be described below which parameters are configured for the Helm Chart pack exported by Rainbond i.e. a description of values.yaml.

```bash
mysql:
  MYSQL_HOST:127.0.1
  MYSQL_PAS:123456
redis:
  REDIS_HOST:127.0.1
  REDIS_PASS:123456
imageDomain: goodrain.me
storageClass: ""
```

**mysql** **redis** : configuration information, `MYSQL_HOST:127.0.0.1` \`\`REDIS_PASS:123456`is your configuration group detailed, this is the application of[配置组](/docs/use-manual/app-manage/config-group), where the config group content is used as a configuration item in values.yaml.        **imageDomain**: repository address where the mirror is stored, source of the image.    **StorageClass**: The pvc created by Rainbond will use the`storageClass`by default, which can be configured to modify your own`storageClass\`

### Step 1：Upload compressed image

<Tabs groupId="upload">
  <TabItem value="有私有镜像仓库" label="有私有镜像仓库" default>
  Upload the exported tgz pack to the environment where delivery is required and unpack the `plugin-images.tar` and `component-images.tar` mirrors into the environment before installing it via Helm command, without specifying the mirror repository.   

```bash
docker load < plugin-images.tar
docker load < component-images.tar
```

Push the load out mirror back to your mirror repository

```bash
docker tag goodrain.me/pig:202212165641 registry.cn-hangzhou.aliyuncs.com/goodrain/pig:20221228165641
docker push regisy.cn-hangzhou.aliyuncs.com/goodrain/pig:20221228165641
```

:::warning
Note that：requires changing the image name of the mirror to modify the image field of the component in the package template directory.
:::

```bash
help install --set imageSource=registry.cn-hangzhou.aliyuncs.com/goodrain myap./
```

  </TabItem>
  <TabItem value="无私有镜像仓库" label="无私有镜像仓库">
    Upload the exported tgz pack to the environment where delivery is required and unpack the `plugin-images.tar` and `component-images.tar` mirrors into the environment before installing it via Helm command, without specifying the mirror repository.   

```bash
docker load < plugin-images.tar
docker load < component-images.tar
```

:::warning
Note that：needs to execute this command at each node if there are more than one node.
:::

### Step 2 of：executes the installation command

Go to the Helm Chart directory to execute the installation command.

```bash
cd test-0.1
helm install myap./
```

### Advanced Settings

#### Configure your own mirror address

Upload the load image to your own mirror repository and can be set by imageSource field.

```bash
help install --set imageSource=registry.cn-hangzhou.aliyuncs.com/goodrain myap./
```

#### Edit StorageClass

The default StorageClass for storage in the exported Chart packet is rainbonvolumerwx provided by Rainbond, which can be configured on its own if you want to specify StorageClass below.

```bash
help install --set storageClass=mysc myapp./
```
