---
title: rbd-hub
description: Parameter Description of the rbd-hub component
---

## rbd-hub component description

Provides docker mirror storage services based on [Docker Registry](https://docs.docker.com/registry/) encapsulation

### Runs

Run inside the Kubernetes cluster, POD runs, co-maintained and managed by Kubernetes and Rainbond-Operator

### Common Parameter Description

rbd-hub based on registry images, see [Docker Registry official documentation] (https://docs.docker.com/registry/configuration/)

### Push image to cluster private mirror repository

:::tip
Do the following actions at any node in a cluster
:::

First get information about private mirror repositories

```yaml title="kubectl get rainbondcluster -n rbd-system -o yaml|grep  -A 3 imageHub"
  imageHub:
    domain: goodrain.me
    password: 2118317a
    username: admin
```

Login to Private Mirror Repository

```bash
$ docker log in goodrain.me -uadmin -p2118317a
```

Change the name of the image to `goodrain.me/**`, to `push` directly

Example to push `nginx`

```bash
# Modify image name
docker tag nginx goodrain.me/nginx:v1
# push image
docker push goodrain.me/nginx:v1
```
