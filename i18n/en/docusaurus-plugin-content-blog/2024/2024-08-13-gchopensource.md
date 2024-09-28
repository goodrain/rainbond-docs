---
title: The first open source cloud native platform to support the creation of national confidence
description: Nationalized credit creation refers to the development and diffusion of Chinese indigenous information technology and innovation industries.With the complex changes in various situations, the promotion of nationalization and confidence-building have become important directions for the development of the information industry.Against this backdrop, domestic technology enterprises and developers have been involved in the wave of open country production and autonomous innovation, seeking to escape dependence on foreign technology and services.From hardware to software, and to cloud origin.
slug: gchopensource
---

Nationalized credit creation refers to the development and diffusion of Chinese indigenous information technology and innovation industries.With the complex changes in various situations, the promotion of nationalization and confidence-building have become important directions for the development of the information industry.Against this backdrop, domestic technology enterprises and developers have been involved in the wave of open country production and autonomous innovation, seeking to escape dependence on foreign technology and services.From hardware to software, and to cloud origin.

It is well known that there are domestically produced confidence-building products in various technical areas, such as CPU, NPOS, NPDs, etc., that are being done by manufacturers, and that have open source versions.But there are currently fewer open sources of home-grown creatures.I understand that at the domestic level, Rainbond is the first open-source cloud-origin platform to support the creation of national futures.

## Country-producing Creative Environment Support

Mainstream national production CPU manufacturers include Flighting, Huawei, Dragon, Sea Spech, Megige, etc. Its instructions are concentrated in `X86`, `Arm`, and very autonomous `LoongArch` (follow-on to MIPS set of directives).

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/localization-guide/%E5%9B%BD%E4%BA%A7CPU%E7%94%9F%E6%80%81.png)

Rainbond open source versions provide full support to both CPU and the national production operating systems to ensure that applications operate in a stable environment of domestically produced hardware and software.This includes the optimization and suitability of a wide range of CPU structures, such as Peng, Flightenn, Dragon core, etc., and compatibility with national production operating systems, such as SUST, Silicolin, Loronsos, Olara operating system, among others.This support covers not only the basic operating environment but also the optimization of specific hardware and software features to improve performance and security.

## Creative Apps Migration Support

Rainbond open source versions automatically shield differences in architecture, migrating applications to a home-grown confidence creation environment at minimal cost.Only source code is provided and can be compiled and run in the specified architecture environment.Open source stores provide different application templates and hundreds of open source software one-click deployments.Creative applications can recompile different types of services and deploy them to an infancy environment with minimal technical and time costs.

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/localization-guide/%E5%BC%82%E6%9E%84%E5%BE%AE%E6%9C%8D%E5%8A%A1%E8%BF%81%E7%A7%BB.png)

## National production of trust for environmental deployment

Rainbond has three modes of installation, all of which support the national fun environment：

- [快速安装](https://www.rainbond.com/docs/quick-start/quick-install)：is a fast experience version with a command to install Rainbond.
- [基于主机安装](https://www.rainbond.com/docs/installation/installation-with-ui/)：supports the start of deployment of K8s + Rainbond through nudity operating systems.
- [基于K8s安装](https://www.rainbond.com/docs/installation/installation-with-helm/)：requires users to deploy K8s themselves and deploy Rainbond.

Below is a brief description of how to deploy Rainbond, using a host-based installation method to Kirin V10 + Peng.I am here to open a demonstration server on the cloud.

![](https://static.goodrain.com/wechat/xinchanang/1.png)

### Install Docker

Rainbond provided a docker installation script for the Arm version below：

```bash
curl -sfL https://get.rainbond.com/install_docker | bash
```

### Install Rainbond Console

Rainbond mirrors support multiple structures, different structures automatically pull different mirrors.Launch the Rainbond Console using Docker to access the `http://IP:7070` on startup.

```bash
docker run -d -p 7070:7070 \
--name=rainbond-allinone --restart=always \
-v ~/.ssh:/root/.ssh \
-v ~/rainbonddata:/app/data \
registry.cn-hangzhou.aliyuncs.com/goodrain/rainbond:v5.17.3-release-allinone
```

### Install K8s

1. Sign in with Rainbond to enter _platform management > cluster -> Add cluster -> Install cluster -> Install from host_\* to the graphical installation page.
2. 按照页面引导填写信息，如下：

![](https://static.goodrain.com/wechat/xinchanang/2.png)

3. Wait to complete the installation.

## Install Rainbond Cluster

Once the K8s cluster is installed, the next step will go to the Rainbond cluster installation page, which will lead you to complete the installation of the Rainbond cluster.

根据页面引导填写配置，配置详情可参考 [Rainbond 集群安装配置说明](https://www.rainbond.com/docs/installation/install-with-ui/#%E5%AE%89%E8%A3%85-rainbond-%E9%9B%86%E7%BE%A4)。

![](https://static.goodrain.com/wechat/xinchanang/4.png)

The configuration is completed by entering the Rainbond cluster installation page, where progress information can be seen and where each component can click on status and event information.

![](https://static.goodrain.com/wechat/xinchanang/5.png)

Wait that all components of Rainbond start will automatically jump to the cluster interface page, fill the cluster ID and complete the interface.

## Last

After completing the above steps, you have successfully deployed the Rainbond Yun Native Platform in the national fun environment and can begin to manage and deploy your confidence-building app.As nationally-produced confidence creation progresses, Rainbond will play an increasingly important role in the future, as the first open-source platform to fully support the creation of domestically produced credits.While the path of national-producing confidence creation is challenging, Rainbond will be committed to open up sources and endogenous trusts, and we believe that the ecology of future national production clouds will be improved.
