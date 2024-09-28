---
title: Modify the default port required for installation
descrition: This chapter is intended for operation and maintenance personnel to learn how to change the default port required for installation.
keywords:
  - Default port when Rainbond changes installation
  - Modify Rainbond 80 443 8443 6060 Port
---

During Rainbond installation, ports to 80, 443, 8443, 6060 will need to be used. If they are already occupied, the default port required for installation can be modified.

- **80 and 443:** is the default port for the Rainbond gateway, which is used for external access.
- **8443:** is the API port of Rainbond used to communicate with the console with the cluster.
- **6060:** is the Web socket port of Rainbond for the Web Terminal command line and real-time push logs, etc.

## Prerequisite

- Use [Helm to install Rainbond](/docs/installation/install-with-helm/).

## Action step

Create `values.yaml` file before using Helm installation, add the following:

```yaml title="values.yaml"
operator:
  env:
  - name: GATEWAY_HTTP_PORT
    value: "8080"
  - name: GATEWAY_HTTP_PORT
    value: "9443"
  - name: API_PORT
    value: "7443"
  - name: API_WS_PORT
    value: "6066"
Cluster:
  enableEnvCheck: false
Component:
  rbd_gateway:
    args:
    - --service-port 80
    - --service-https-port 9443
  rbd_api:
    args:
    - -api-addr-ssl=0. .0.0.0:7443
    - --ws-addr=0.0.0.0:6066
```

Argument Explanation:

- **operator.env** Environment variable interpretation
  - GATEWAY_HTTP_PORT：Defines Operator to detect gateway HTTP port.
  - GATEWAY_HTTPS_PORT：Defines Operator Detection Gateway HTTPS port.
  - API_PORT：defines Operator creating API services and progress ports.
  - API_WS_PORT：defines Operator creating API Websocket services and Progress ports.
- **enableEnvCheck** is used to close environmental checks, which will default to detect whether the ports are occupied and will fail if they are occupied.If set to `false`, port usage will not be detected.
- **--service-http-port** used to modify the HTTP port at Rainbond gateway.
- **--service-https-port** modify HTTPS port on the Rainbond gateway.
- **--api-addr-ssl** modify API port of Rainbrond.
- **--ws-addr** modify the Websocket port of Rainbrond.

For more Helm install parameters, refer to [Chart Installation](/docs/installation/install-with-helm/vaules-config).

Reference [based on Kubernetes installation] (/docs/installation/install-with-helm/install-from-kubernetes).

The configuration file needs to be specified using the `-f values.yaml` parameter when installed.

### Modify private image configuration

:::tip
It is recommended to specify an external mirror repository. The following actions can be skipped, and external mirror repository can be configured by reference to [Chart installation options](/docs/installation/installation-with-helm/vaules-config).
:::

When installing is complete, you will see the following `POD`:

```bash
$ kubectl get pod -n rbd-system
NAME READY STATUS RESTARTS AGE
nfs-provisionioner-0 1/1 Running 0 16m
rainbond-operator-587d56c78c-vs5ng 1/1 Running 0 16m
rbd-etcd-0 1/1 Running 0 15m
rbd-gqhh 1/1 Running 0 15m
rbd-hub-8d47f589d-kbsgd 1/1 Running 0 15m
rbd-node-jw74 s 1/1 Running 0 15m
```

This installation is in an irregular state and needs to modify the default `goodrain.me` Docker directory and the location of the `rainbondcluster` mirror repository for the correct address to continue the installation.

- Edit Docker Certificate Directory

```bash
mv /etc/docker/certs.d/goodrain.me /etc/docker/certs.d/goodrain.me:9443
```

- Modify image repository address

```yaml title="kubectl edit rainbondcluster -n rbd-system"
spec:
  imageHub:
    domain: goodrain.me:9443
```

:::tip
Waiting for installation to complete access to the Rainbond Console for reference to [安装进度查询](/docs/installation/install-with-helm/install-from-kubernetes).
:::
