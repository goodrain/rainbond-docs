---
title: Component other settings
description: Component other settings function module introduction
---

## Component deployment type

- Stateless service (Deployment type) is generally used for components such as Web classes and API classes

- Stateful service (Statefulset type) is generally used for DB classes, message middleware classes, and data class components

- Task (Job type) is generally used for one-time tasks, and the container exits after completion
- Periodic tasks (Cronjob type) is generally used to process periodic tasks that need to be executed repeatedly

## Component Health Check

The health check is to actually reflect the running status of the component business.In the case of not configuring health detection, the running state of the component is determined by the state of the container (process), that is, the component is considered to be in the Ready state if the container is successfully started.Component instances in the Ready state are immediately added to traffic processing.However, we all know that most of the program business needs startup time. It takes a while from startup to ready to process business. Generally, the more complex the component, the longer it takes.Components that are not ready to accept business requests will cause some requests to fail.Especially during the rolling upgrade of components, for stateless components, the platform implements a mechanism to first start a new instance to receive traffic, and then close the old instance, if the health status of the component is not accurately reflected.The effect of rolling upgrades will be greatly reduced.Startup Therefore, we need a mechanism to verify the true state of the component as much as possible, which is the component health check.

Currently, component health detection supports the following two mechanisms：

- <b>TCP port detection</b> This detection method is to try to establish a TCP connection with the port configured by the component. If it is established normally, it is considered to be in a healthy state.
- <b>HTTP service detection</b> Port establishment and monitoring does not fully represent the normal service. Therefore, for HTTP services, you can request the specified route to judge the health status of components according to the status code.This mode is more precise.

After a component is started, it must go through a health check to indicate the state of the component. When the component is unhealthy, there are two processing methods：

- set component as unhealthy

> When a component instance is set as unhealthy, it will be taken offline from the Application Gateway and ServiceMesh network.Wait for it to work properly and automatically go online again.But if the component has only one instance, Rainbond will not take it offline.

- Restart the component instance

> Some components may form a deadlock process due to code blocking and other reasons, and the components cannot be provided but the process still runs.The unhealthy state of such components can only be handled by restarting the instance.

Therefore, the user can choose the appropriate processing method according to the business status.

### Operating procedures

Component health checks are configured on the _Component Control Panel/Other Settings_ page.

1. Click the edit button of health check, the pop-up window will display the configuration items of health check.

- Port：selects the port for the component to perform health detection. If the actual detection port of the component does not exist in the options, please go to the port management page to add it.
- Probe protocol： According to the above, the protocol selection supports TCP and HTTP, and the subsequent setting items are somewhat different for different protocols.
- Unhealthy processing mode： defaults to "offline", and "restart" can be selected.
- The setting item： corresponding to the HTTP protocol can set the detected path and request header after selecting the HTTP protocol (for example, a Token request is required). Note that the routing request must return a status code less than 400 to be considered healthy.
- The initialization wait time：refers to the time to wait for the component instance to start before starting the detection, and the default is 4 seconds.
- The detection interval time：refers to the time interval between two consecutive detection tasks.
- Detection timeout：If the request is blocked when a problem is encountered when detecting the request, the timeout will take effect.
- The number of consecutive successes of：refers to the number of consecutive successful detections when the component instance is marked as healthy.

The above information is filled in according to the actual situation. After saving, the component health detection mechanism needs to be updated to take effect.

2. Enable/disable health check

In special cases, the developer may need to temporarily disable the health check to keep the component in a healthy state.Health detection can be enabled/disabled using.After the modification, you need to update the components to take effect.

## kubernetes properties

  The difference from the attribute defined in kubenetes is that when the attribute is in yaml format, there is no need to fill in the attribute name at the beginning
### Attribute introduction
#### nodeSelector
  Used to schedule the Pod to the Node that matches the Label. If there is no matching label, the scheduling will fail.

#### labels
  It is a key-value pair identifier attached to a k8s object, which supports efficient search and monitoring.The function is literally, to label the k8s object, we can use the label to select the object

#### volumes
  Persistent storage of data, the format of volumes defined in k8s is
  ```yaml
  volumes:
    - name: config-vol
      configMap:
        name: log-config
        items:
          - key: log_level
            path: log_level
  ```
  When adding properties on the platform, you do not need to define volumes at the beginning, such as the following format
  ```yaml
  - name: config-vol
    configMap:
      name: log-config
      items:
        - key: log_level
          path: log_level
  ```
#### volumeMounts
  Mount volumes, the format of volumeMounts when it is defined in k8s is
  ```yaml
  volumeMounts: #mount point
    in the container - mountPath: /data
      name: redis-data #must have a name
  ```
  When adding properties on the platform, you do not need to define volumeMounts at the beginning, as in the following format
  ```yaml
  - mountPath: /data
    name: redis-data
  ```
#### affinity
  For details, please refer to the official k8s documentation https://kubernetes.io/zh-cn/docs/concepts/scheduling-eviction/assign-pod-node/

  Affinity scheduling, the format of affinity defined in k8s is

  ```yaml
  affinity:
    nodeAffinity: # Scope：between Pod and Node
      requiredDuringSchedulingIgnoredDuringExecution: # Node affinity-hard strategy
        nodeSelectorTerms:
        - matchExpressions:
          - key: kubernetes.io/hostname
            operator: NotIn
            values:
            - node3
  ```
  When adding properties on the platform, you do not need to define affinity at the beginning, such as the following format
  ```yaml
  nodeAffinity: # Scope：between Pod and Node
    requiredDuringSchedulingIgnoredDuringExecution: # Node Affinity - Hard Policy
      nodeSelectorTerms:
      - matchExpressions:
        - key: kubernetes.io/hostname
          operator: NotIn
          values:
          - node3
  ```
#### tolerations
  For details, please refer to the official k8s documentation https://kubernetes.io/zh-cn/docs/concepts/scheduling-eviction/taint-and-toleration/

  Tolerance, the format of tolerances when they are defined in k8s is
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
  There is no need to define tolerations at the beginning when adding properties on the platform, such as the following format
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
  Configure the service account. For details, please refer to the official k8s documentation https://kubernetes.io/zh-cn/docs/tasks/configure-pod-container/configure-service-account/

#### privileged
  Determines whether a container in a Pod can enable privileged mode. By default, containers cannot access any devices on the host, but a "privileged" container is granted access to all devices on the host. Such a container has almost all the access rights of a process running on the host.

#### env
  For details, please refer to the official k8s documentation https://kubernetes.io/zh-cn/docs/tasks/inject-data-application/define-environment-variable-container/

  Environment variables, the format of env when it is defined in k8s is

  ```yaml
  env:
  - name: Version
    value: v5.8
  - name: NGINX_USERAEM
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
  When adding properties on the platform, you do not need to define env at the beginning, such as the following format
  ```yaml
  - name: Version
    value: v5.8
  - name: NGINX_USERAEM
    valueFrom:
      secretKeyRef:
        name: nginx-secret
        key: username
        optional: false
  - name: NGINX_PASSWORD
    valueFrom:
      secretKeyRef:
        name: nginx -secret
        key: password
        optional: false
  - name: MY_POD_IP
    valueFrom:
      fieldRef:
        fieldPath: status.podIP
  ```


## common problem

- Request failure during component rolling update

> When this problem occurs, it is strongly recommended to set more precise health detection rules, such as using HTTP mode.

- How components of other protocols set up health checks

> More application layer protocols such as Mysql and Redis currently do not support accurate detection. Please select TCP mode.In the future, we will add the method of `cmd` for detection, which can better support different types of components.


## Component feature management

```mdx-code-block
import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

<DocCardList items={useCurrentSidebarCategory().items}/>
```