---
title: 麒麟V10，国产化信创 K8s 离线部署保姆级教程
description: Rainbond V6 国产化部署教程，针对麒麟 V10 的离线环境，手把手教你从环境准备到应用上线，所有依赖包提前打包好，步骤写成傻瓜式操作指南。别说技术团队了，照着文档一步步来，让你领导来都能独立完成部署。
slug: kylin-offline-k8s-guide
date: 2025-05-30
tags:
  - 信创实践
  - ARM
  - 麒麟 V10
  - 离线部署
---

> Rainbond V6 国产化部署教程，针对ARM 麒麟 V10 的离线环境，手把手教你从环境准备到应用上线，所有依赖包提前打包好，步骤写成**傻瓜式**操作指南。别说技术团队了，照着文档一步步来，让你领导来都能独立完成部署。

## 一、环境规划

| 架构  | OS       | 作用                     |
| ----- | -------- | ------------------------ |
| Arm64 | 麒麟 V10 | 单机部署 K8s 和 Rainbond |

![image-20260415144458961](https://grstatic.tos-cn-beijing.volces.com/wechat/KylinV10-ARM/1.png)

## 二、准备离线包

```
curl -o roi https://get.rainbond.com/roi/roi-arm64 && chmod +x roi
./roi download
```

> 下载完成后应该看到以下文件

![image-20260415151329693](https://grstatic.tos-cn-beijing.volces.com/wechat/KylinV10-ARM/2.png)

![image-20260415151607310](https://grstatic.tos-cn-beijing.volces.com/wechat/KylinV10-ARM/3.png)

## 三、离线部署准备

> 以下操作在离线的麒麟 V10 服务器上执行。

### 导入离线包

> 导入上述准备的离线包

![image-20260415151310266](https://grstatic.tos-cn-beijing.volces.com/wechat/KylinV10-ARM/2.png)

## 四、开始离线安装

### 执行单节点安装

> 安装k8s 和 rainbond 大约 6 分钟左右安装成功

```
./roi up --single 
```

![image-20260415151945589](https://grstatic.tos-cn-beijing.volces.com/wechat/KylinV10-ARM/5.png)

## 五、访问 Rainbond

> 安装完成后，日志中会显示访问入口

![image-20260415152601785](https://grstatic.tos-cn-beijing.volces.com/wechat/KylinV10-ARM/6.png)

```
# 在管理节点使用 kubectl
export KUBECONFIG=/etc/rancher/rke2/rke2.yaml
/var/lib/rancher/rke2/bin/kubectl get pods -A
```

## 六、离线环境下使用源码构建

```
./roi addon sourcebuild
```

## 七、访问 Rainbond 验证

1. 使用上述输出 http://172.30.239.24:7070 地址访问 Rainbond
2. 填写 Rainbond 注册信息并登录 Rainbond
3. 查看集群信息

![image-20260415161228939](https://grstatic.tos-cn-beijing.volces.com/wechat/KylinV10-ARM/7.png)





## 最后

按照本指南操作，即使是非技术背景的管理者也能独立完成国产化容器平台的落地。接下来通过 Rainbond 图形化界面，无需编写代码即可将企业应用轻松迁移至 Rainbond。

- 官网：[https://www.rainbond.com](https://www.rainbond.com/)
- Github：https://github.com/goodrain/rainbond