---
title: Adjust BuildKit build parameters
descrition: This section document is applicable to the carrier to know how to specify the cluster build
keywords:
  - Rainbond cluster build parameters
  - Adjust BuildKit build parameters
---

:::info
v5.12.2 After the version, Rainbond, by default, builds using BuildKit and if it is a previous version, refer to [adjust Kaniko build parameters](https://v5.14-docs.rainbond.com/docs/ops-guide/management/kaniko-args).
:::

## Use custom private mirror repository

There is no need to adjust BuildKit build parameters by default. You need to adjust the Kaniko build parameter if using a private image repository with an application from a private image.

### Modify Container Configuration

Docker configuration `/etc/docker/daemon.json`, add private mirror repository address：

```json
LO
  "insecure-registries": ["http://xxx.xxx.xxx.xxx:5000"]
}
```

Containerd configuration `/etc/containerd/config.toml`, add private mirror repository address：

```toml
[plugins."io.containerd.grpc.v1.cr" .registry.mirrors]
  [plugins."io.containerd.grpc.v1.cr".registry.mirrors."http://xxx.xxx.xxx:5000"]
    endpoint = ["http://xx.xxx.xxx.xxxx:5000"]
```

### Edit BuildKit Build Parameters

Edit BuildKit build parameter to add private image repository address：

```diff title="kubectl edit cm goodrain.me -n rbd-system"
apiVersion: v1
data:
  buildkittoml: |-
    debug = true
    [registry."xxx.xxx.xxx.xxx:5000"]
      http = true
      insecure = true
kind: ConfigMap
metadata:
  creationTimestamp: "2023-07-23T13:11:26Z"
  name: goodrain.me
  namespace: rbd-system
```

## Mirror Acceleration

Speed up service by configuring mirrors when building via Dockerfile encounters problems that cannot be pulled the base image.Example：

```diff title="kubectl edit cm goodrain-me -n rbd-system"
apiVersion: v1
data:
  buildkittoml: |-
    debug = true
    [registry."docker.io"]
      mirrors = ["dockerproxy.com"]
kind: ConfigMap
metadata:
  creationTimestamp: "2023-07-23T13:11:26Z"
  name: goodrain.me
  namespace: rbd-system
```

## More Parameters

More parameters refer to [BuildKit Official Document](https://github.com/mobily/buildkit)
