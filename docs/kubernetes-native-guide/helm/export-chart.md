---
title: 导出 Helm Chart 包
description: 支持 Helm 包交付云原生应用
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## 场景

Rainbond 提供的应用模板导出机制,主要用来解决面向最终用户的应用交付问题。无法满足通过 Helm 交付应用的场景

适用的场景包括：
- 交付环境提供 Helm 命令
- 离线业务,或安全限制等交付场景。

## 前提要求

- Rainbond 平台版本不低于 v5.10.1-release 。
- 参考文档,完成应用发布流程,将应用发布到内部组件库。
- 仅支持治理模式为原生 Service 模式的应用包

## 导出 Helm Chart 包

在内部组件库中找到已经发布好的应用模板,在 `导出应用模板` 页面中,点击导出 `Helm Chart 包` 。导出完成后,即可下载导出的 Helm Chart 包。

得到的 Chart 包,命名格式为 `{应用名称}-{应用模板版本号}-helm.tar.gz` 。该包可以在任意 Linux 操作系统中解压,解压后的目录结构如下(这里以 pig 为例)：

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

- 第一层目录存放的依次是 Helm 的 Chart 包,插件所使用的的镜像包,workloads 类型资源所使用的镜像包。
- 应用中包含的所有资源都会存放在 Helm Chart 包的 templates 目录下(除 ingress 资源)。

##  Helm Chart 使用
### Helm Chart 配置介绍

正如我们所熟知的, Helm Chart 包都是可配置的,下面将介绍, Rainbond 导出的 Helm Chart 包都有哪些参数可以配置,即对 values.yaml 的介绍。

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
**mysql** **redis** :配置组信息, `MYSQL_HOST:127.0.0.1` `REDIS_PASS:123456`便是你的配置组详细的配置项，这里 对应的就是应用下的配置组, 将配置组的内容作为 values.yaml 里的配置项。       
**imageDomain** : 存放镜像的仓库地址,镜像获取的来源。   
**storageClass** : Rainbond 创建的pvc默认会使用 Rainbond 所创建的 `storageClass` ,可以通过配置来修改使用自己的 `storageClass` 

### 第一步：上传压缩镜像

<Tabs groupId="upload">
  <TabItem value="有私有镜像仓库" label="有私有镜像仓库" default>
  将导出的 tgz 包存上传到需要交付的环境中并解压并把 `plugin-images.tar` 和 `component-images.tar` 镜像包解压到环境中,然后再通过 Helm 命令配置安装,Helm 安装的时候无需指定镜像仓库。   

```bash
docker load < plugin-images.tar
docker load < component-images.tar
```
  将 load 出来的镜像重新打 tag 后推送到你的镜像仓库中
```bash
docker tag goodrain.me/pig:20221228165641 registry.cn-hangzhou.aliyuncs.com/goodrain/pig:20221228165641
docker push registry.cn-hangzhou.aliyuncs.com/goodrain/pig:20221228165641
```
:::warning
注意：如果需要修改镜像的名称则需要对应的修改导出包模版目录中对应的组件的 image 字段。
:::
然后执行安装命令的时候指定仓库地址即可
```bash
helm install --set imageSource=registry.cn-hangzhou.aliyuncs.com/goodrain myapp ./
```

  </TabItem>
  <TabItem value="无私有镜像仓库" label="无私有镜像仓库">
    将导出的 tgz 包存上传到需要交付的环境中并解压并把 `plugin-images.tar` 和 `component-images.tar` 镜像包解压到环境中,然后再通过 Helm 命令配置安装,Helm 安装的时候无需指定镜像仓库。   

```bash
docker load < plugin-images.tar
docker load < component-images.tar
```
:::warning
注意：如果有多个节点，需要在每个节点都执行此命令。
:::
  </TabItem>
</Tabs>

### 第二步：执行安装命令
进入到 Helm Chart 包的目录执行安装命令。   

```bash
cd test-0.1
helm install myapp ./
```

### 高级设置

#### 配置自己的镜像地址

将 load 出来的镜像上传到你自己的镜像仓库后，可以通过 imageSource 字段来设置。
```bash
helm install --set imageSource=registry.cn-hangzhou.aliyuncs.com/goodrain myapp ./
```

#### 修改 StorageClass
导出的Chart包中的存储默认使用的 StorageClass 为 Rainbond 提供的 rainbondvolumerwx ,如需自行指定 StorageClass 可通过如下配置。

```bash
helm install --set storageClass=mysc myapp ./
```