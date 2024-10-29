---
title: 国内首个支持国产化信创的开源云原生平台
description: 国产化信创是指中国本土信息技术和创新产业的发展和推广。随着各种形势的复杂变化，推动国产化和信创已成为信息产业发展的重要方向。在这一背景下，国内的技术企业和开发者们纷纷投入到开源国产化和自主创新的浪潮中，力图摆脱对国外技术和服务的依赖。从硬件到软件，再到云原生。
slug: gchopensource
---

国产化信创是指中国本土信息技术和创新产业的发展和推广。随着各种形势的复杂变化，推动国产化和信创已成为信息产业发展的重要方向。在这一背景下，国内的技术企业和开发者们纷纷投入到开源国产化和自主创新的浪潮中，力图摆脱对国外技术和服务的依赖。从硬件到软件，再到云原生。

众所周知，在各个技术领域都有国产化信创的产品，比如国产CPU、国产操作系统、国产数据库等等都有厂商在做，都有开源的版本。但目前开源的国产化信创云原生平台目前较少。据我了解，目前在国内 Rainbond 是首个支持国产化信创的开源云原生平台。

<!--truncate-->

## 国产化信创环境支持

目前主流的国产化 CPU 厂商包括飞腾、华为、龙芯、海光、兆芯等，其指令集集中在 `X86` 、`Arm` 以及自主性极高的 `LoongArch` (MIPS 指令集的后继者) 。

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/localization-guide/%E5%9B%BD%E4%BA%A7CPU%E7%94%9F%E6%80%81.png)

Rainbond 开源版本对国产 CPU 和国产操作系统提供全面支持，确保应用能够在国产硬件和软件环境下稳定运行。这包括对多种国产 CPU 架构的优化和适配，如鲲鹏、飞腾、龙芯等，以及对国产操作系统的兼容性，例如统信、银河麒麟、中标麒麟、龙蜥、欧拉操作系统等。这种支持不仅涵盖了基础的运行环境，还包括了对特定硬件和软件特性的优化，以提高性能和安全性。

## 信创应用迁移支持

Rainbond 开源版本自动屏蔽架构差异，以最低成本将应用迁移到国产化信创环境之中。仅需要提供源代码，即可在指定架构环境中编译运行。开源应用商店提供不同架构的应用模板，上百种开源软件一键部署。信创应用供应商可以以最小的技术成本和时间成本，即可将不同类型的服务重新编译，并部署到信创环境中去。

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/localization-guide/%E5%BC%82%E6%9E%84%E5%BE%AE%E6%9C%8D%E5%8A%A1%E8%BF%81%E7%A7%BB.png)



## 国产化信创环境部署实践

Rainbond 的有三种安装方式，这三种安装方式都支持国产化信创环境：

* [快速安装](https://www.rainbond.com/docs/quick-start/quick-install)：这是一个快速体验版本，使用一条命令安装 Rainbond。
* [基于主机安装](https://www.rainbond.com/docs/installation/install-with-ui/)：支持通过裸操作系统开始部署 K8s + Rainbond。
* [基于K8s安装](https://www.rainbond.com/docs/installation/install-with-helm/)：这种方式需要用户自行部署K8s，再部署 Rainbond。

下面将简述如何使用基于主机安装方式在麒麟V10 + 鲲鹏上部署 Rainbond。我这里是在华为云上开个演示服务器。

![](https://static.goodrain.com/wechat/xinchuang/1.png)

### 安装 Docker

Rainbond 提供了 Arm 版的 Docker 安装脚本，如下：

```bash
curl -sfL https://get.rainbond.com/install_docker | bash
```

### 安装 Rainbond 控制台

Rainbond 镜像支持多架构，不同的架构自动拉取不同的镜像。使用 Docker 启动 Rainbond 控制台，启动后使用 `http://IP:7070`进行访问。

```bash
docker run -d -p 7070:7070 \
--name=rainbond-allinone --restart=always \
-v ~/.ssh:/root/.ssh \
-v ~/rainbonddata:/app/data \
registry.cn-hangzhou.aliyuncs.com/goodrain/rainbond:v5.17.3-release-allinone
```

### 安装 K8s

1. 登录 Rainbond 后，进入 **平台管理 > 集群 -> 添加集群 -> 从主机开始安装** 进入图形化安装页面。
2. 按照页面引导填写信息，如下：

![](https://static.goodrain.com/wechat/xinchuang/2.png)

3. 等待完成安装即可。

## 安装 Rainbond 集群

在安装完成 K8s 集群后，下一步将进入 Rainbond 集群安装页面，这部分将引导您完成 Rainbond 集群的安装。

根据页面引导填写配置，配置详情可参考 [Rainbond 集群安装配置说明](https://www.rainbond.com/docs/installation/install-with-ui/#%E5%AE%89%E8%A3%85-rainbond-%E9%9B%86%E7%BE%A4)。

![](https://static.goodrain.com/wechat/xinchuang/4.png)

配置信息填写完成后进入 Rainbond 集群安装页面，在该页面可看到安装的进度信息，并且每个组件都可点击查看状态以及事件信息。

![](https://static.goodrain.com/wechat/xinchuang/5.png)

等待 Rainbond 所有组件都启动后，会自动跳转到集群对接页面，填写集群 ID，完成对接。

## 最后

在完成以上步骤后，您已经成功在国产化信创环境中部署了 Rainbond 云原生平台，并且可以开始管理和部署您的信创应用。随着国产化信创的不断推进，Rainbond 作为首个全面支持国产化信创的开源云原生平台，将在未来发挥越来越重要的作用。国产化信创的道路虽充满挑战，但 Rainbond 会致力做好开源、做好国产化信创，我们相信未来国产化信创云原生平台的生态将会更加完善。