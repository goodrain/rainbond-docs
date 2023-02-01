---
title: 组件 kubernetes 属性管理
description: 组件其他设置功能模块介绍
---

运行于 Rainbond 的每一个 Workload 类型的组件中，都可以在 `其他设置` 页面配置 Kubernetes 特殊属性。

## kubernetes属性

与kubenetes中定义属性不同的是，该属性为yaml格式时，开头无需填写属性名。

### 属性介绍
#### nodeSelector

用于将Pod调度到匹配Label的Node上，如果没有匹配的标签会调度失败。
    
#### labels

是附加到k8s对象上的键值对标识，支持高效的查找和监听。作用就是字面意思，给k8s对象打上标签，我们可以使用标签来选择对象。
    
#### volumes
 
数据的持久化存储，volumes在k8s中定义时的格式为：

```yaml
volumes:
  - name: config-vol
    configMap:
      name: log-config
      items:
        - key: log_level
          path: log_level
```

在平台添加属性时不需要在开头定义volumes，如以下格式
```yaml
- name: config-vol
  configMap:
    name: log-config
    items:
      - key: log_level
        path: log_level
```

#### volumeMounts

挂载volumes，volumeMounts在k8s中定义时的格式为：

```yaml
volumeMounts:        #容器内挂载点
  - mountPath: /data
    name: redis-data        #必须有名称
```
在平台添加属性时不需要在开头定义volumeMounts，如以下格式：

```yaml
- mountPath: /data
  name: redis-data
```

#### affinity

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

在平台添加属性时不需要在开头定义affinity，如以下格式：
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

#### tolerations
  
详细信息可参考k8s官方文档 https://kubernetes.io/zh-cn/docs/concepts/scheduling-eviction/taint-and-toleration/
  
容忍度，tolerations在k8s中定义时的格式为：

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

在平台添加属性时不需要在开头定义tolerations，如以下格式：
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

#### serviceAccountName
  
配置服务账户，详细信息可参考k8s官方文档 https://kubernetes.io/zh-cn/docs/tasks/configure-pod-container/configure-service-account/

#### privileged 
  
决定是否 Pod 中的某容器可以启用特权模式。 默认情况下，容器是不可以访问宿主上的任何设备的，不过一个“privileged（特权的）” 容器则被授权访问宿主上所有设备。 这种容器几乎享有宿主上运行的进程的所有访问权限。

#### env
  
详细信息可参考k8s官方文档 https://kubernetes.io/zh-cn/docs/tasks/inject-data-application/define-environment-variable-container/

环境变量，env在k8s中定义时的格式为：

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

在平台添加属性时不需要在开头定义env，如以下格式：

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

#### shareProcessNamespace

在 Pod 中的容器之间共享进程命名空间

详细信息可参考k8s官方文档 https://kubernetes.io/zh-cn/docs/tasks/configure-pod-container/share-process-namespace/


#### dnsPolicy

Pod的DNS策略, 可以逐个 Pod 来设定。目前 Kubernetes 支持以下特定 Pod 的 DNS 策略

`Default`: Pod 从运行所在的节点继承名称解析配置

`ClusterFirst`: 与配置的集群域后缀不匹配的任何 DNS 查询（例如 "www.kubernetes.io"） 都将转发到从节点继承的上游名称服务器。集群管理员可能配置了额外的存根域和上游 DNS 服务器。

`ClusterFirstWithHostNet`: 对于以 hostNetwork 方式运行的 Pod，应显式设置其 DNS 策略

`None`: 此设置允许 Pod 忽略 Kubernetes 环境中的 DNS 设置。 注: Pod 会使用其 `dnsConfig` 字段所提供的 DNS 设置

详细信息可参考k8s官方文档 https://kubernetes.io/zh-cn/docs/concepts/services-networking/dns-pod-service/

dnsConfig配置在k8s中定义时的格式为：

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

在平台添加属性时不需要在开头定义dnsConfig，如以下格式：

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

#### resources

为Pod和容器管理资源

详细信息可参考k8s官方文档 https://kubernetes.io/zh-cn/docs/concepts/configuration/manage-resources-containers/

resources在k8s中定义时的格式为：

```yaml
resources:
  requests:
    memory:
  limits:
    memory:
```

在平台添加属性时不需要在开头定义resources，如以下格式：

```yaml
requests:
  memory:
limits:
  memory:
```

#### hostIPC

控制容器是否可以共享主机的IPC名称空间

#### lifecycle

为容器的生命周期事件设置处理函数

详细信息可参考k8s官方文档 https://kubernetes.io/zh-cn/docs/tasks/configure-pod-container/attach-handler-lifecycle-event/

lifecycle在k8s中定义时的格式为
```yaml
lifecycle:
  ostStart:
    exec:
      command: ["/bin/sh", "-c", "echo Hello from the postStart handler > /usr/share/message"]
  preStop:
    exec:
      command: ["/bin/sh","-c","nginx -s quit; while killall -0 nginx; do sleep 1; done"]
```
在平台添加属性时不需要在开头定义lifecycle，如以下格式
```yaml
postStart:
  exec:
    command: ["/bin/sh", "-c", "echo Hello from the postStart handler > /usr/share/message"]
preStop:
  exec:
    command: ["/bin/sh","-c","nginx -s quit; while killall -0 nginx; do sleep 1; done"]
```
