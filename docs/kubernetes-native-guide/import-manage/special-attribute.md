---
title: 组件 Kubernetes 属性管理
description: 介绍在 Rainbond 上为组件设置特殊属性，例如：privileged
keywords:
- 介绍在 Rainbond 上为组件设置特殊属性，例如：privileged
---

本文介绍如何给 Rainbond 上的组件设置 Kubernetes 特殊属性，例如：privileged、affinity 等等。

在组件内 -> 其他设置中可找到 Kubernetes 属性并进行配置。

## Kubernetes 属性

与 Kubenetes 中定义属性不同的是，该属性为 YAML 格式时，开头无需填写属性名。

### nodeSelector

用于将Pod调度到匹配Label的Node上，如果没有匹配的标签会调度失败。
    
### labels

是附加到k8s对象上的键值对标识，支持高效的查找和监听。作用就是字面意思，给k8s对象打上标签，我们可以使用标签来选择对象。
    
### volumes
 
数据的持久化存储，volumes 在 k8s 中定义时的格式为：

```yaml
volumes:
  - name: config-vol
    configMap:
      name: log-config
      items:
        - key: log_level
          path: log_level
```

在 Rainbond 上添加属性时不需要在开头定义 `volumes`，如以下格式：

```yaml
- name: config-vol
  configMap:
    name: log-config
    items:
      - key: log_level
        path: log_level
```

### volumeMounts

挂载 volumes，volumeMounts 在k8s中定义时的格式为：

```yaml
volumeMounts:        #容器内挂载点
  - mountPath: /data
    name: redis-data        #必须有名称
```

在 Rainbond 上添加属性时不需要在开头定义 `volumeMounts`，如以下格式：

```yaml
- mountPath: /data
  name: redis-data
```

### affinity

详细信息可参考k8s官方文档 https://kubernetes.io/zh-cn/docs/concepts/scheduling-eviction/assign-pod-node/
  
亲和性调度，affinity在k8s中定义时的格式为：

```yaml
affinity:
  nodeAffinity:  # 作用域：Pod和Node之间
    requiredDuringSchedulingIgnoredDuringExecution:  # Node亲和性-硬策略
      nodeSelectorTerms:
      - matchExpressions:
        - key: kubernetes.io/hostname
          operator: NotIn
          values:
          - node3
```

在 Rainbond 上添加属性时不需要在开头定义 `affinity`，如以下格式：

```yaml
nodeAffinity:  # 作用域：Pod和Node之间
  requiredDuringSchedulingIgnoredDuringExecution:  # Node亲和性-硬策略
    nodeSelectorTerms:
    - matchExpressions:
      - key: kubernetes.io/hostname
        operator: NotIn
        values:
        - node3
```

### tolerations
  
详细信息可参考k8s官方文档 https://kubernetes.io/zh-cn/docs/concepts/scheduling-eviction/taint-and-toleration/
  
容忍度，tolerations 在 k8s 中定义时的格式为：

```yaml
tolerations:
  - key: "key1"
    operator: "Equal"
    value: "value1"
    effect: "NoSchedule"
    tolerationSeconds: 3600
  - key: "key1"
    operator: "Equal"
    value: "value1"
    effect: "NoExecute"
```

在 Rainbond 上添加属性时不需要在开头定义 `tolerations`，如以下格式：
```yaml
- key: "key1"
  operator: "Equal"
  value: "value1"
  effect: "NoSchedule"
  tolerationSeconds: 3600
- key: "key1"
  operator: "Equal"
  value: "value1"
  effect: "NoExecute"
```   

### serviceAccountName
  
配置服务账户，详细信息可参考k8s官方文档 https://kubernetes.io/zh-cn/docs/tasks/configure-pod-container/configure-service-account/

### privileged 
  
决定是否 Pod 中的某容器可以启用特权模式。 默认情况下，容器是不可以访问宿主上的任何设备的，不过一个“privileged（特权的）” 容器则被授权访问宿主上所有设备。 这种容器几乎享有宿主上运行的进程的所有访问权限。

### env
  
详细信息可参考 k8s 官方文档 https://kubernetes.io/zh-cn/docs/tasks/inject-data-application/define-environment-variable-container/

环境变量，env 在 k8s 中定义时的格式为：

```yaml
env:
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

在 Rainbond 上添加属性时不需要在开头定义 `env`，如以下格式：

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

### shareProcessNamespace

在 Pod 中的容器之间共享进程命名空间

详细信息可参考k8s官方文档 https://kubernetes.io/zh-cn/docs/tasks/configure-pod-container/share-process-namespace/


### dnsPolicy

Pod的DNS策略, 可以逐个 Pod 来设定。目前 Kubernetes 支持以下特定 Pod 的 DNS 策略

`Default`: Pod 从运行所在的节点继承名称解析配置

`ClusterFirst`: 与配置的集群域后缀不匹配的任何 DNS 查询（例如 "www.kubernetes.io"） 都将转发到从节点继承的上游名称服务器。集群管理员可能配置了额外的存根域和上游 DNS 服务器。

`ClusterFirstWithHostNet`: 对于以 hostNetwork 方式运行的 Pod，应显式设置其 DNS 策略

`None`: 此设置允许 Pod 忽略 Kubernetes 环境中的 DNS 设置。 注: Pod 会使用其 `dnsConfig` 字段所提供的 DNS 设置

详细信息可参考k8s官方文档 https://kubernetes.io/zh-cn/docs/concepts/services-networking/dns-pod-service/

dnsConfig 配置在 k8s 中定义时的格式为：

```yaml
dnsConfig:
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

在 Rainbond 上添加属性时不需要在开头定义 `dnsConfig`，如以下格式：

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

### resources

为 Pod 和容器管理资源

详细信息可参考k8s官方文档 https://kubernetes.io/zh-cn/docs/concepts/configuration/manage-resources-containers/

resources 在 k8s 中定义时的格式为：

```yaml
resources:
  requests:
    memory:
  limits:
    memory:
```

在 Rainbond 上添加属性时不需要在开头定义 `resources`，如以下格式：

```yaml
requests:
  memory:
limits:
  memory:
```

### hostIPC

控制容器是否可以共享主机的IPC名称空间

### lifecycle

为容器的生命周期事件设置处理函数

详细信息可参考k8s官方文档 https://kubernetes.io/zh-cn/docs/tasks/configure-pod-container/attach-handler-lifecycle-event/

lifecycle 在 k8s 中定义时的格式为：

```yaml
lifecycle:
  postStart:
    exec:
      command: ["/bin/sh", "-c", "echo Hello from the postStart handler > /usr/share/message"]
  preStop:
    exec:
      command: ["/bin/sh","-c","nginx -s quit; while killall -0 nginx; do sleep 1; done"]
```

在 Rainbond 添加属性时不需要在开头定义 `lifecycle`，如以下格式：

```yaml
postStart:
  exec:
    command: ["/bin/sh", "-c", "echo Hello from the postStart handler > /usr/share/message"]
preStop:
  exec:
    command: ["/bin/sh","-c","nginx -s quit; while killall -0 nginx; do sleep 1; done"]
```
### hostAliases

#### hostAliases的作用

`hostAliases`属性允许您在容器的 `/etc/hosts` 文件中添加自定义的主机名和对应的IP地址。这在需要自定义主机名解析的场景下非常有用，例如解决与外部系统通信时的主机名映射。

#### 如何配置hostAliases

在Rainbond平台中，配置hostAliases非常简单。在组件的Kubernetes属性配置中，找到并编辑`hostAliases`字段，按照以下格式进行配置：

```yaml
- ip: "192.168.1.1"
hostnames:
- "alias1.example.com"
- "alias2.example.com"
- ip: "192.168.1.2"
hostnames:
- "alias3.example.com"
```

上述示例中，每个`hostAliases`项包含一个IP地址和一个或多个与之关联的主机名。您可以根据需要添加多个`hostAliases`项。

#### 示例：使用hostAliases解决外部服务通信问题

假设您的组件需要与外部数据库进行通信，而该数据库的连接需要通过主机名进行。通过配置hostAliases，您可以轻松将数据库主机名解析为其实际IP地址，确保通信的正常进行。

```yaml
- ip: "203.0.113.1"
hostnames:
- "external-db.example.com"
```