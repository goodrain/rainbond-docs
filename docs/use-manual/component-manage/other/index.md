---
title: 组件其他设置
description: 组件其他设置功能模块介绍
---
## 组件部署类型

- 无状态服务(Deployment类型)
 一般用于Web类、API类等组件

- 有状态服务(Statefulset类型)
 一般用于DB类、消息中间件类、数据类组件

- 任务(Job类型)
一般用于一次性任务,完成后容器就退出
- 周期性任务(Cronjob类型)
一般用于处理周期性的、需反复执行的定时任务

## 组件健康检测

健康检测是为了真实的反应组件业务的运行状态。在不配置健康检测的情况下，组件的运行状态由容器（进程）状态决定，即容器启动成功则认为组件已经进入 Ready 状态。Ready 状态的组件实例将立即加入到流量处理中去。然而我们都清楚大部分程序业务都是需要启动时间的，从开始启动到准备好处理业务是一段时间的，一般越复杂的组件时间越长。还没有准备好的组件去接受了业务请求将导致部分请求失败。特别是在组件进行滚动升级过程中，对于无状态组件，平台进行了先启动新实例接受流量，再关闭旧实例的机制，如果组件健康状态未精确体现。滚动升级的效果将大打折扣。启动因此我们需要通过一种机制来尽可能的验证组件的真实状态，这就是组件健康检测。

目前组件健康检测支持以下两种机制：

- <b>TCP 端口检测</b> 这种检测的方式是尝试与组件配置的端口建立 TCP 连接，若正常建立认为其处于健康状态。
- <b>HTTP 业务检测</b> 端口建立监听也不能完全代表业务正常，因此对于 HTTP 类的服务，能够请求到指定的路由来根据状态码进行组件健康状态判断。这种模式更加精确。

组件启动后必须经过健康检测来表示组件状态，当组件处于不健康时，有两种处理方式：

- 设置组件为不健康

> 当组件实例被设置成不健康，其将从应用网关和 ServiceMesh 网络下线。等待其工作正常后重新自动上线。但如果组件只有一个实例，Rainbond 不会将其下线。

- 重启组件实例

> 有些组件可能由于代码阻塞等原因形成死锁进程，无法提供组件但进程依然运行。处理这类组件的不健康状态只能通过重启实例的方式。

因此用户可以根据业务状态来判断选择合适的处理方式。

### 操作流程

组件健康检测的配置在 _组件控制面板/其他设置_ 页面中。

1.点击健康检测的编辑按钮，弹窗显示健康检测的配置项目。

- 端口：选择组件进行健康检测的端口，若选项中不存在组件实际的检测端口，请到端口管理页面中进行添加。
- 探针协议： 根据上文所述，协议选择支持 TCP 和 HTTP，选择不同的协议后续的设置项目有些不同。
- 不健康处理方式： 默认为“下线”，可以选择“重启”。
- HTTP 协议对应的设置项： 选择 HTTP 协议后可设置检测的路径和请求头（比如需要 Token 请求），注意该路由请求必须返回状态码小于 400 则认为为健康。
- 初始化等候时间：是指开始检测前等待组件实例启动的时间，默认为 4 秒。
- 检测间隔时间：是指连续两次检测任务的时间间隔。
- 检测超时时间：如果检测请求时遇到问题请求被阻塞，超时时间将生效。
- 连续成功次数：是指标记组件实例为健康状态时的连续检测成功的次数。

上述信息根据实际情况填写，保存后需要更新组件健康检测机制将生效。

2.启用/禁用健康检测

特殊情况下开发者可能需要临时禁用健康检测使组件一直处于健康状态。可以使用启用/禁用健康检测功能。修改后需要更新组件即可生效。

## kubernetes属性
  
  与kubenetes中定义属性不同的是，该属性为yaml格式时，开头无需填写属性名
### 属性介绍
#### nodeSelector
  用于将Pod调度到匹配Label的Node上，如果没有匹配的标签会调度失败
    
#### labels
  是附加到k8s对象上的键值对标识，支持高效的查找和监听。作用就是字面意思，给k8s对象打上标签，我们可以使用标签来选择对象
    
#### volumes
  数据的持久化存储，volumes在k8s中定义时的格式为
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
  挂载volumes，volumeMounts在k8s中定义时的格式为
  ```yaml
  volumeMounts:        #容器内挂载点
    - mountPath: /data
      name: redis-data        #必须有名称
  ```
  在平台添加属性时不需要在开头定义volumeMounts，如以下格式
  ```yaml
  - mountPath: /data
    name: redis-data
  ```
#### affinity
  详细信息可参考k8s官方文档 https://kubernetes.io/zh-cn/docs/concepts/scheduling-eviction/assign-pod-node/
  
  亲和性调度，affinity在k8s中定义时的格式为
  
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
  在平台添加属性时不需要在开头定义affinity，如以下格式
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
  
  容忍度，tolerations在k8s中定义时的格式为
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
  在平台添加属性时不需要在开头定义tolerations，如以下格式
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

  环境变量，env在k8s中定义时的格式为

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
  在平台添加属性时不需要在开头定义env，如以下格式
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

  dnsConfig配置在k8s中定义时的格式为
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
  在平台添加属性时不需要在开头定义dnsConfig，如以下格式
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

  resources在k8s中定义时的格式为
  ```yaml
  resources:
    requests:
      memory:
    limits:
      memory:
  ```
  在平台添加属性时不需要在开头定义resources，如以下格式
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



























## 常见问题

- 组件滚动更新过程中出现请求故障

> 出现此问题强烈建议设置更加精确的健康检测规则，比如选用 HTTP 模式。

- 其他协议的组件如何设置健康检测

> Mysql,Redis 等更多的应用层协议目前不支持精确检测，请选用 TCP 模式。后续我们将增加使用 `cmd` 的方式进行检测，可以对不同类型的组件进行较好的支持。


## 组件特性管理

```mdx-code-block
import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

<DocCardList items={useCurrentSidebarCategory().items}/>
```