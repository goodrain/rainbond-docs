---
title: Alarm configuration
description: This section describes how to configure alarm rules and alarm notification for Rainbond
keywords:
  - prometheus
  - alertmanager
  - alertmanager 告警配置
---

介绍 Rainbond 如何自定义告警规则和配置告警通知，告警通知支持邮件、钉钉、企业微信。

## 自定义告警

### 前提

- [监控告警服务部署](/docs/ops-guide/monitor/monitor-alert-deploy)
- [添加业务监控](/blog/JmxExporter)
- 安装 [kubectl](/docs/ops-guide/tools/#kubectl-cli) 命令行工具

### 准备配置文件

配置示例：

```yaml title="vim customize.yml"
apiVersion: v1
kind: ConfigMap
metadata:
  name: customize
  namespace: rbd-system
data:
  customize.yml: |
    groups:
    - name: Java
      rules:
      - alert: java故障
        expr: up{job="ceshi"}==0
        for: 20s
        labels:
          Alert: Rainbond
          PageAlarm: "true"
          Region: default
        annotations:
          description: 'java故障'
          summary: java故障
```

告警规则详解：

- alert: 告警规则的名称（一个大的规则组里可以有多个告警规则，保证格式对其即可）。
- expr：基于PromQL表达式告警触发条件，用于计算是否有时间序列满足该条件,其中定义的 job需要修改成添加的业务监控的配置名。
- for：评估等待时间，可选参数。用于表示只有当触发条件持续一段时间后才发送告警。在等待期间新产生告警的状态为pending。
- labels：自定义标签，允许用户指定要附加到告警上的一组附加标签。
- annotations：用于指定一组附加信息，比如用于描述告警详细信息的文字等，annotations的内容在告警产生时会一同作为参数发送到Alertmanager报警系统。

创建 `configmap`：

```bash
kubectl apply -f customize.yml
```

将 `configmap` 挂载到 `rbd-monitor` 容器中：

```yaml
$ kubectl edit rbdcomponent rbd-monitor  -n rbd-system
spec:
volumeMounts:
- mountPath: /etc/prometheus/rules/customize.yml
  name: customize
  subPath: customize.yml
volumes:
- configMap:
    items:
    - key: customize.yml
      path: customize.yml
    name: customize
  name: customize
```

重启 `rbd-monitor` POD 生效

```bash
kubectl delete pod -l name=rbd-monitor -n rbd-system
```

## 告警通知

```mdx-code-block
import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

<DocCardList items={useCurrentSidebarCategory().items}/>
```
