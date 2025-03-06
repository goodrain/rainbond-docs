---
title: 高级属性设置
description: 介绍在 Rainbond 上为组件设置特殊属性，例如：privileged
keywords:
  - 介绍在 Rainbond 上为组件设置特殊属性，例如：privileged
---

本文介绍如何给组件设置 Kubernetes 高级属性，例如: `privileged、affinity` 等等。

## 设置 Kubernetes 高级属性

在组件的其他设置中，可以设置 Kubernetes 的高级属性。所有属性添加时不需要在开头定义属性名称，直接添加属性即可。

- [nodeSelector](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/) 调度到指定的节点上
- [labels](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/) 标签
- [volumes](https://kubernetes.io/docs/concepts/storage/volumes/) 存储卷，示例如下
  ```yaml
  - name: config-vol
    configMap:
      name: log-config
      items:
        - key: log_level
          path: log_level
  ```
- [volumeMounts](https://kubernetes.io/docs/concepts/storage/volumes/) 存储卷挂载，示例如下
  ```yaml
  - mountPath: /data
    name: redis-data
  ```
- [affinity](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/) 亲和性，示例如下
  ```yaml
  nodeAffinity:
    requiredDuringSchedulingIgnoredDuringExecution:
      nodeSelectorTerms:
      - matchExpressions:
        - key: kubernetes.io/hostname
          operator: NotIn
          values:
          - node3
  ```
- [tolerations](https://kubernetes.io/zh-cn/docs/concepts/scheduling-eviction/taint-and-toleration/) 容忍度，示例如下:
  ```yaml
  - key: "key1"
    operator: "Equal"
    value: "value1"
    effect: "NoSchedule"
    tolerationSeconds
  ```
- 设置 [serviceAccountName](https://kubernetes.io/zh-cn/docs/tasks/configure-pod-container/configure-service-account/) 服务账户
- privileged 特权模式
- [env](https://kubernetes.io/zh-cn/docs/tasks/inject-data-application/define-environment-variable-container/) 环境变量，示例如下:
  ```yaml
  - name: Version
    value: v5.8
  - name: NGINX_USERNAEM
    valueFrom:
      secretKeyRef:
        name: nginx-secret
        key: username
        optional: false
  - name: NGINX_PASSWORD
    valueFrom:
      secretKeyRef:
        name: nginx-secret
        key: password
        optional: false
  - name: MY_POD_IP
    valueFrom:
      fieldRef:
        fieldPath: status.podIP
  ```
- [shareProcessNamespace](https://kubernetes.io/zh-cn/docs/tasks/configure-pod-container/share-process-namespace/) 共享进程命名空间
- [dnsPolicy](https://kubernetes.io/zh-cn/docs/concepts/services-networking/dns-pod-service/) DNS策略，示例如下:
  ```yaml
  nameservers:
    - 1.2.3.4
  searches:
    - ns1.svc.cluster-domain.example
    - my.dns.search.suffix
  options:
    - name: ndots
      value: "2"
    - name: edns0
  ```
- [resources](https://kubernetes.io/zh-cn/docs/concepts/configuration/manage-resources-containers/) 资源限制，示例如下:
  ```yaml
  requests:
    memory: "1024Mi"
    cpu: "500m"
  limits:
    memory: "512Mi"
    cpu: "100m"
  ```
- hostIPC 控制容器是否可以共享主机的 IPC 名称空间
- [lifecycle](https://kubernetes.io/zh-cn/docs/tasks/configure-pod-container/attach-handler-lifecycle-event/) 容器的生命周期事件设置处理函数，示例如下:
  ```yaml
  postStart:
    exec:
      command: ["/bin/sh", "-c", "echo Hello from the postStart handler > /usr/share/message"]
  preStop:
    exec:
      command: ["/bin/sh","-c","nginx -s quit; while killall -0 nginx; do sleep 1; done"]
  ```
- [hostAliases](https://kubernetes.io/docs/tasks/network/customize-hosts-file-for-pods/) 允许在容器的 `/etc/hosts` 文件中添加自定义的主机名和对应的IP地址。示例如下:
  ```yaml
  - ip: "192.168.1.1"
  hostnames:
  - "alias1.example.com"
  - "alias2.example.com"
  - ip: "192.168.1.2"
  hostnames:
  - "alias3.example.com"
  ```
