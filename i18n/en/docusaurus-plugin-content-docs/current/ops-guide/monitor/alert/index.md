---
title: Alarm configuration
description: This section describes how to configure alarm rules and alarm notification for Rainbond
keywords:
  - prometheus
  - alertmanager
  - alertmanager warning configuration
---

Introducing Rainbond how to customize warning rules and configuration alerts, warning notifications that support mail, nails, and business microcredits.

## Custom warning

### Prerequisite

- [监控告警服务部署](/docs/ops-guide/monitor/monitor-alert-employ)
- [添加业务监控](/blog/JmxExporter)
- Install [kubectl](/docs/ops-guide/tools/#kubectl-cli) command line tools

### Preparing profile

Configure Example：

```yaml title="vim customize.yml"
apiVersion: v1
kind: ConfigMap
metatata:
  name: customize
  namespace: rbd-system
data:
  customize. ml: |
    groups:
    - name: Java
      rules:
      - alert: java fault
        expr: up{job="ceshi"}==0
        for: 20 s
        labels:
          Alert: Rainbond
          PageAlarm: "true"
          Region: default
        annotations:
          description: 'java failure'
          summary: java fault
```

Warn Rule Details：

- alert: Name of the warning rule (multiple warning rules can be found in a large group of rules, guarantee format is sufficient).
- expr：is used to calculate whether there is a time series to meet this condition based on the PromQL expression trigger condition, and the job defined needs to be changed to the configuration name of the added business monitoring.
- For：assessing waiting time, optional parameters.Used to indicate that a warning will be sent only if the trigger continues for a certain period of time.The status of a new warning generated during the waiting period is pending.
- Labels：Custom Labels allow users to specify a set of additional tags to be attached to the warning.
- annotations：are used to specify an additional set of information such as text to describe the warning details, and annotations, the content of which will be sent to Alertmanager alert as a parameter when the warning is created.

Create `configmap`：

```bash
kubtl apply -f customize.yml
```

Mount `configmap` to `rbd-monitor` container：

```yaml
$kubtl edit rbdcomponent rbd-monitor - n rbd-system
spec:
volumeMounts:
- mountPath: /etc/prometheus/rules/customize. ml
  name: customize
  subPath: customize. ml
volumes:
- configMap:
    items:
    - key: customize. ml
      path: customize.yml
    name: customize
  name: customize
```

Restart `rbd-monitor` POD to take effect

```bash
kubtl delete pod -l name=rbd-monitor -n rbd-system
```

## Alert notifications

```mdx-code-block
import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

<DocCardList items={useCurrentSidebarCategory().items}/>
```
