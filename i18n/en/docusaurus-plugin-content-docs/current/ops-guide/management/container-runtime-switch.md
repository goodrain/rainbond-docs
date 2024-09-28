---
title: Container Runtime handover
descrition: This section of documentation describes how to switch the Rainbond container runtime
keywords:
  - When switching containers running
  - Rainbond switching container running
---

## General description

During the installation of Rainbond the bottom container of your k8s cluster will be identified (`Docker` or `Containerd`), which will run as a container while the cluster environment runs both `Docker` and `Containerd`, by default, while the cluster environment runs both `Docker` and `Containerd` containers. This text will guide you how to switch the container to run when it is running at the same time.

## Prerequisite

Both Docker and Containerd are running and want to specify when the container used by Rainbond is running.

## Switch process

### Identification Logic

1. Check if the `operator` container contains `CONTAINER_RUNTIME` environmental variables, if the value of the environmental variable `CONTAINER_RUNTIME` is `containerd`, and if `containerd` is to run as Rainbond container.If not, select `docker` to run as Rainbond
2. No `CONTAINER_RUNTIME` environment variable checks if there is `docker.sock` file in the directory. If there is an option `docker` running as a Rainbond container, no `containerd` is used when running as a Rainbow container.

### When installed platforms toggle containers running

Delete DaemonSet Resource `rbd-node` and `rbd-chaos` make `operator` create\
change Deploying Resource `rainbond-operator`

```bash
kubtl delete goods rbd-node -nrbd-system
kubectl delete goods rbd-chaos -nrbd-system
kubectl edit rainbond-operator-n rbd-system
```

Find the `image` and `imagePullPolicy`, add the environment variable that controls the container running.\
Value is filled out when the container you want to run (docker, containerd)

```bash
image: registry.cn-hangzhou.aliyuncs.com/xxx/rainbond-operator:xx
env:
- name: CONTAINER_RUNTIME
  value: "containerd"
imagePullPolicy: IfNotPresent
```

Operator will re-create node and chaos after finishing, and then check whether to change successfully by viewing the yaml files from node and chaos.

```bash
kubectl get goods rbd-chaos -n rbd-system -yaml
kubectl get goods rbd-node -n rbd-system -oyaml
```

When running using the docker container, chaos and node args will have the following parameters, containerd does not have the following parameters.

```bash
-- container-runtime=docker
```
