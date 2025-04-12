---
title: FAQ
description: Troubleshooting
---

## Reset Administrator Password

If it is a quick installation, you need to execute `docker exec -it rainbond bash` to enter the container and execute the following commands.

```bash
kubectl get pod -l name=rbd-app-ui -n rbd-system
kubectl exec -it rbd-app-ui-xxxxx-xxx -n rbd-system bash

Execute the following command to modify the specified user password.
python manage.py change_password --username=username --password=newpassword
```

## Get the default image repository rbd-hub password

```bash title="kubectl get rainbondcluster -n rbd-system -o yaml|grep -A 3 imageHub"
imageHub:
  domain: goodrain.me
  password: 2118317a
  username: admin
```

## Scale Gateway Node/Build Node

Scaling **Gateway Node/Build Node** refers to adding existing K8s nodes as Rainbond's gateway nodes or build nodes.

Edit the `rainbondcluster` CRD resource, modify the `nodesForGateway/nodesForChaos` field, and add gateway/build node information.

```yaml title="kubectl edit rainbondcluster -n rbd-system"
spec:
  nodesForGateway:
  - name: node-1 #Node name
    externalIP: 192.168.1.1 #Node external IP
    internalIP: 192.168.1.1 #Node internal IP
  nodesForChaos:
  - name: node-1 #Node name
```

Restart the `rainbond-operator` Pod to make the configuration take effect.

```bash
kubectl delete pod -n rbd-system -l name=rainbond-operator
```

## Modify the installed Rainbond component image address

The controllers of services such as `rbd-api, rbd-worker`, such as `Deployment, StatefulSet`, etc., are controlled by `rainbond-operator`, so directly modifying the image address of these controllers will not take effect.Need to modify the `rbdcomponent` CRD resource.

```yaml title="kubectl edit rbdcomponent -n rbd-system rbd-api"
spec:
  image: registry.cn-hangzhou.aliyuncs.com/goodrain/rbd-api:<version>-release
```

You can view all components through `kubectl get rbdcomponent -n rbd-system`.

## Storage Space Cleanup

Generally speaking, Rainbond's own components do not occupy too much storage space, but when the server storage space is insufficient, it will cause K8s to be abnormal, which in turn will cause Rainbond to be abnormal.

The following is an explanation of Rainbond and K8s storage space, you can clean up according to the actual situation.

Rainbond component storage description:

- **rbd-chaos:** Store source code build-related dependency packages, stored in the `/opt/rainbond/cache` directory.If you need to clean up, please delete the files in this directory.
- **rbd-hub:** Store the images built by the platform, before the `v6.1.1-release` version, they were stored in the `minio` component, this version will cause [rbd-hub image repository cleanup](https://t.goodrain.com/d/21-rbd-hub) problems.[v6.1.2-release](https://github.com/goodrain/rainbond/releases/tag/v6.1.2-release) version of `rbd-hub` image repository data is stored in the `local-path-provisioner` component, which is local storage.
- **minio:** Before the `v6.1.1-release` version, store `rbd-hub` image repository data, store files uploaded through the page, import and export application offline packages.If you need to clean up, please clean up in the `minio web console`, access minio can be obtained through the `minio` component's `service nodeport` address, the default account password is `admin/admin1234`.

## Startup cannot get image x509: certificate signed by unknown authority

Usually caused by incorrect configuration of Containerd.

1. Modify the configuration file `/etc/containerd/config.toml`

```bash
[plugins."io.containerd.grpc.v1.cri".registry.configs]
  [plugins."io.containerd.grpc.v1.cri".registry.configs."goodrain.me"]
    [plugins."io.containerd.grpc.v1.cri".registry.configs."goodrain.me".tls]
       insecure_skip_verify = true
```

2. Add Containerd configuration file `/etc/containerd/certs.d/goodrain.me/hosts.toml`

```bash
[host."https://goodrain.me"]
  capabilities = ["pull", "resolve","push"]
  skip_verify = true
```

## Default image repository switch to external image repository

If the default `rbd-hub` image repository was used when installing the cluster, and now you want to switch to an external image repository, you can switch through the following command:

1. Edit the rainbondcluster resource, modify the imageHub field.

```yaml title="kubectl edit rainbondcluster -n rbd-system"
spec:
  imageHub: # Modify this field
    domain: 172.31.112.97:5000
    namespace: rainbond
    password: admin
    username: admin
```

2. Delete rbd-hub CRD resource.

```bash
kubectl delete rbdcomponent rbd-hub -n rbd-system 
```

3. Restart `rainbond-operator, rbd-chaos` components.

```bash
kubectl delete pod -l name=rainbond-operator -n rbd-system
kubectl delete pod -l name=rbd-chaos -n rbd-system
```

## External image repository switch to default image repository

If an external image repository was used when installing the cluster, and now you don't want to use the external image repository, and want to switch to the default `rbd-hub` image repository, you can switch through the following command:

1. Edit the `rainbondcluster` CRD resource, delete the custom `imageHub` field.

```yaml title="kubectl edit rainbondcluster -n rbd-system"
spec:
  imageHub: # Delete this field
    domain: 172.31.112.97:5000
    password: admin
    username: admin
```

2. Restart rainbond-operator component.

```bash
kubectl delete pod -l name=rainbond-operator -n rbd-system
```

3. Create rbd-hub CRD resource.

```yaml title="kubectl apply -f rbd-hub.yaml"
apiVersion: rainbond.io/v1alpha1
kind: RbdComponent
metadata:
  name: rbd-hub
  namespace: rbd-system
  labels:
    belongTo: rainbond-operator
    creator: Rainbond
    name: rbd-hub
    priorityComponent: "true"
    persistentVolumeClaimAccessModes: ReadWriteOnce
spec:
  replicas: 1
  image: registry.cn-hangzhou.aliyuncs.com/goodrain/registry:2.6.2
  imagePullPolicy: IfNotPresent
  priorityComponent: true
```

4. Restart `rbd-chaos` component.

```bash
kubectl delete pod -l name=rbd-chaos -n rbd-system
```

## Quick installation add more TCP ports

The quick installation of Rainbond uses Docker to start by default, and maps `30000～30010` 10 TCP ports by default for application testing.If you need more TCP ports, through the command printed in the script, delete the container and restart it and add `-p` to map the new port.

## Access Rainbond using domain name

By default, access Rainbond through `http://IP:7070`, if you need to use a domain name to access, please follow the steps below to configure:

1. Log in to the Rainbond platform, go to `Application -> Add Component -> Third-party Component`.
2. On the Add Third-party Component page, select the component registration method as **Static Registration**, then fill in the component address as `http://IP:7070`, and create a new component.
3. Enter the third-party component, switch to the port Tab page, add the `7070` port, and enable the internal and external ports.
4. Switch to the More Settings Tab page, add health check.
5. Enter the application view's gateway management, add domain name binding to this component, and add a certificate to complete the domain name access configuration.(The certificate does not need to be manually bound, it is automatically matched)

## Quick installation or host installation to configure an external HTTP private image repository or DockerHub image acceleration

If you need to use an external HTTP private image repository or DockerHub image acceleration, please follow the steps below to configure:

**Quick installation**:

- Rainbond quick installation comes with a built-in K3S cluster. You need to enter the container to modify the `/etc/rancher/k3s/registries.yaml` configuration file. For details, please refer to the [K3S image repository configuration](https://docs.k3s.io/installation/private-registry) document.
- The container needs to be restarted to take effect. The restart command is: `docker restart rainbond`

**Host installation**:

- Rainbond host installation uses an RKE2 cluster. You need to modify the `/etc/rancher/rke2/registries.yaml` configuration file. For details, please refer to the [RKE2 image repository configuration](https://docs.rke2.io/install/private_registry) document.
- The RKE2 cluster needs to be restarted to take effect. The restart command is: `systemctl restart rke2-server/rke2-agent`

## Extend TCP/NodePort port range

The default TCP port range for Rainbond host installation is `30000-32767`, which is the K8s NodePort port range.If you need to extend the port range, please follow the steps below to configure.

1. Modify the `/etc/rancher/rke2/config.yaml.d/00-rbd.yaml` file, as shown below:

```bash title="vim /etc/rancher/rke2/config.yaml.d/00-rbd.yaml"
service-node-port-range: 20000-30000
```

2. Restart the RKE2 cluster to complete the port range extension

```bash
systemctl restart rke2-server
# or
systemctl restart rke2-agent
```

If your K8s cluster is self-installed, please check how to modify the K8s NodePort port range by yourself.