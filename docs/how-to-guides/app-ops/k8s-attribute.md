---
title: Advanced Attribute Settings
description: "Introduce setting special attributes for components on Rainbond, such as: privileged"
keywords:
  - "Introduce setting special attributes for components on Rainbond, such as: privileged"
---

This article introduces how to set advanced Kubernetes attributes for components, such as: `privileged, affinity`, etc.

## Set Kubernetes Advanced Attributes

In the component's other settings, you can set advanced Kubernetes attributes.When adding all attributes, there is no need to define the attribute name at the beginning, just add the attribute directly.

- [nodeSelector](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/) Schedule to the specified node
- [labels](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/) Labels
- [volumes](https://kubernetes.io/docs/concepts/storage/volumes/) Storage volumes, example as follows

    - name: config-vol
      configMap:
        name: log-config
        items:
          - key: log_level
            path: log_level
- [volumeMounts](https://kubernetes.io/docs/concepts/storage/volumes/) Volume mounts, example as follows

    - mountPath: /data
      name: redis-data
- [affinity](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/) Affinity, example as follows

    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
        - matchExpressions:
          - key: kubernetes.io/hostname
            operator: NotIn
            values:
            - node3
- [tolerations](https://kubernetes.io/zh-cn/docs/concepts/scheduling-eviction/taint-and-toleration/) Tolerations, example as follows:

    - key: "key1"
      operator: "Equal"
      value: "value1"
      effect: "NoSchedule"
      tolerationSeconds
- Set [serviceAccountName](https://kubernetes.io/zh-cn/docs/tasks/configure-pod-container/configure-service-account/) Service Account
- privileged Privileged mode
- [env](https://kubernetes.io/zh-cn/docs/tasks/inject-data-application/define-environment-variable-container/) Environment variables, example as follows:

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
- [shareProcessNamespace](https://kubernetes.io/zh-cn/docs/tasks/configure-pod-container/share-process-namespace/) Share Process Namespace
- [dnsPolicy](https://kubernetes.io/zh-cn/docs/concepts/services-networking/dns-pod-service/) DNS Policy, example as follows:

    nameservers:
      - 1.2.3.4
    searches:
      - ns1.svc.cluster-domain.example
      - my.dns.search.suffix
    options:
      - name: ndots
        value: "2"
      - name: edns0
- [resources](https://kubernetes.io/zh-cn/docs/concepts/configuration/manage-resources-containers/) Resource limits, example as follows:

    requests:
      memory: "1024Mi"
      cpu: "500m"
    limits:
      memory: "512Mi"
      cpu: "100m"
- hostIPC Controls whether the container can share the host's IPC namespace
- [lifecycle](https://kubernetes.io/zh-cn/docs/tasks/configure-pod-container/attach-handler-lifecycle-event/) Container lifecycle event setting handler, example as follows:

    postStart:
      exec:
        command: ["/bin/sh", "-c", "echo Hello from the postStart handler > /usr/share/message"]
    preStop:
      exec:
        command: ["/bin/sh","-c","nginx -s quit; while killall -0 nginx; do sleep 1; done"]
- [hostAliases](https://kubernetes.io/docs/tasks/network/customize-hosts-file-for-pods/) allows adding custom hostnames and corresponding IP addresses in the container's `/etc/hosts` file.Example as follows:

    - ip: "192.168.1.1"
    hostnames:
    - "alias1.example.com"
    - "alias2.example.com"
    - ip: "192.168.1.2"
    hostnames:
    - "alias3.example.com"
