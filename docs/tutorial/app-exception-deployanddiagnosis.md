---
title: 应用异常部署与诊断
description: 掌握 Rainbond 应用异常诊断方法：状态识别、故障模拟、日志分析三步骤
keywords:
- Rainbond 异常诊断
- 容器状态排查
- 服务故障修复
---

在本节中，我们将引导您完成以下内容：
- 了解组件异常状态
- 使用容器镜像部署一个异常的服务。
- 诊断异常服务。

## 前提

- 已完成 [Rainbond 快速安装](/docs/quick-start/quick-install)。

## 了解组件异常状态

异常状态（红色）表示服务不可用，点击红色方块进入详情页：
 
**核心异常状态解析**：
1. **ImagePullBackOff** (镜像拉取失败)
    - 检查项：镜像地址、仓库凭证、网络连接
2. **CrashLoopBackOff** (容器崩溃循环)
    - 检查项：启动命令、资源限制、依赖服务
3. **OOMKilled** (内存溢出终止)
    - 检查项：内存配额、JVM 配置、内存泄漏

## 使用容器镜像部署一个异常的服务

1. 进入目标团队视图，创建新应用。
2. 选择从镜像构建 ➡️ 容器。
    - 自定义应用名称。
    - 镜像地址：`registry.cn-hangzhou.aliyuncs.com/goodrain/nginx:demo`
3. 资源配置过程（保持默认）。
4. 基础配置过程（保持默认）。
5. 观察部署过程
   - 预期结果：组件状态变为红色。

## 诊断异常服务

根据上述部署的异常服务，排查过程如下：
1. 检查组件的状态是否为 `ImagePullBackOff、CrashLoopBackup、OOMkilled`。
2. 检查事件信息，查看事件日志信息。
3. 检查日志输出，查看运行时日志信息。

```bash
[emerg] directive "listen" is not terminated by ";" in /etc/nginx/conf.d/default.conf:4
```

根据日志得出，是 Nginx 配置文件出现错误。`/etc/nginx/conf.d/default.conf` 第 4 行没有闭合，缺少 `;`。