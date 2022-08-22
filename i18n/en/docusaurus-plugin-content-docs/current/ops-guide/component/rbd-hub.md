---
title: rbd-hub
description: "rbd-hub component parameter description"
---

## rbd-hub component description

Based on[Docker Registry](https://docs.docker.com/registry/)package, providing docker image storage service

### Operation mode

Running inside the Kubernetes cluster, POD running, jointly maintained and managed by Kubernetes and Rainbond-Operator


### Common parameter description

rbd-hub is based on registry image, please refer to [Docker Registry official documentation](https://docs.docker.com/registry/configuration/)for detailed parameters


### Push images to the cluster's private image repository

:::tip
Do the following on any node in the cluster
:::

First obtain the relevant information of the private image repository

```yaml title="kubectl get rainbondcluster -n rbd-system -o yaml|grep  -A 3 imageHub"
  imageHub:
    domain: goodrain.me
    password: 2118317a
    username: admin
```

Log in to the private mirror repository

```bash
$ docker login goodrain.me -uadmin -p2118317a
```

Change the name of the image to be pushed to`goodrain.me/***`, and perform the`push`operation directly

Take pushing`nginx`image as an example

```bash
# Modify image name
docker tag nginx goodrain.me/nginx:v1
# push image
docker push goodrain.me/nginx:v1
```


