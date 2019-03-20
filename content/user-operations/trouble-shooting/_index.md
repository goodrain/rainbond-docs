---
title: "常见问题排查FAQ"
weight: 1701
chapter: true
---

{{% notice note %}}
当安装使用 Rainbond 遇到问题时，请先参考本篇文档快速索引部分。如果问题未解决，请按要求收集必要的信息通过[社区(用户帮助)](https://t.goodrain.com/)或者[Github](https://github.com/goodrain) 提供给Rainbond开发者。尽可能提供具体信息，方便排查问题。

```yaml
# 参考模板
Rainbond版本(grctl version/docker run --rm goodrain.me/rbd-api:5.1.0 version):
操作系统/内核版本:
节点配置(CPU核数,内存大小,硬盘类型(SSD/机械硬盘),网络类型,网络拓扑):
安装类型(是否离线或者对接已有集群):
集群状态(是否health，是否有计算节点，是否多管理节点):
如何复现(什么操作导致的):
尝试解决(重启相关组件): 
相关截图(具体日志部分截图):
```
{{% /notice %}}

#### 安装指南

> 安装问题建议反馈至 [rainbond-ansible](https://github.com/goodrain/rainbond-ansible.git)

1. 安装如何自定ssh port

```
# 目前不支持多节点的SSH端口都不同
export INSTALL_SSH_PORT=12306
./grctl init
```

#### 使用指南

1. [企业管理员密码忘记如何处理](/user-operations/op-guide/reset_enterprise_password/)
2. [对接自己私有Artifactory指南](/user-operations/op-guide/op-repo/)
3. [控制台报系统等错误服务排查](/user-operations/op-guide/console_error/)

<!--
1. 集群是否正常（grctl node list）
2. 应用是否正常  (grctl service get <应用概览url>)
3. 应用监听端口是否正确，是否开启了健康检测，持久化目录是否设置正确
4. 集群状态
5. 操作流程，能否复现
6. 是否尝试过更新部分组件的镜像，是否有效
7. 当前正在进行什么操作
8. 最近一段时间的网络/IO监控数据是否有异常
9. 系统异常是哪个接口报错,提供rbd-app-ui日志(`/opt/rainbond/logs/rbd-app-ui/goodrain.log`)

-->