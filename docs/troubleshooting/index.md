---
title: '故障排除概述'
description: Rainbond 平台常见问题排查及解决方案指南
keywords:
- Rainbond 故障排查
- Kubernetes 故障诊断
- 应用部署问题解决
---

本文档提供了 Rainbond 平台使用过程中可能遇到的各类问题的排查思路和解决方案，按照问题类型分为安装问题、平台问题和应用问题三大类。

## 问题分类

- [安装问题](./install.md)：安装阶段遇到的问题通常与环境配置、资源限制或底层依赖有关。
- [平台问题](./cluster-connect.md)：平台运行中可能遇到的系统级问题，影响整体平台稳定性。
- [应用问题](./common.md)：应用级别的问题，与具体业务组件运行相关。

## 排查工具

在解决 Rainbond 问题时，以下工具和命令非常有用：

- **kubectl**: 查看 Kubernetes 资源状态和日志
  ```bash
  # 查看 Pod 状态
  kubectl get pods -n rbd-system
  # 查看日志
  kubectl logs -f <pod-name> -n rbd-system
  ```

- **docker/nerdctl**: 容器和镜像管理
  ```bash
  # 清理不再使用的资源
  docker system prune
  # 检查镜像
  nerdctl -n k8s.io images prune
  ```

- **journalctl**: 查看系统日志
  ```bash
  # 查看 Docker 日志
  journalctl -fu docker
  ```

- **查看平台日志**: 通过控制台查看平台组件日志
  - 平台管理 -> 日志 -> 控制台日志/集群日志

## 获取帮助

如果您的问题在本文档中未能解决，可以通过以下渠道获取帮助：

- [GitHub Issues](https://github.com/goodrain/rainbond/issues) - 提交问题或查找已有解决方案
- [Rainbond 社区](https://t.goodrain.com/) - 与其他用户和开发者交流
- [微信群](/docs/support#微信群) - 加入微信用户群获取实时帮助
- [钉钉群](/docs/support#钉钉群) - 加入钉钉用户群交流问题
- [官方支持](https://p5yh4rek1e.feishu.cn/share/base/shrcn4dG9z5zvbZZWd1MFf6ILBg/) - 获取商业技术支持服务

