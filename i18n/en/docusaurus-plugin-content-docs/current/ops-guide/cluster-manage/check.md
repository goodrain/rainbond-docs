---
title: Cluster installation exception check
description: This chapter documents the troubleshooting and resolution of obstacles to Kubernetes installation or Rainbond cluster initialization during Rainbond cluster installation.
weight: 109
hidden: true
---

### Kubernetes cluster installation exception analysis

It mainly refers to the link of installing a Kubernetes cluster by specifying a node.

- The error message prompts "Cluster must have at least one etcd plane host"

<img src="https://static.goodrain.com/docs/5.3/operator/error.png" width="100%" />

> In this case, the IP address or SSH port of the node you configured is incorrect, or the port has a firewall policy, so that the console cannot connect to the specified node.Reconfigure the correct node IP address and SSH port, or enable the firewall policy for the SSH port.

### Analysis of Rainbond Cluster Initialization Abnormal Conditions

The Rainbond cluster initialization control process is as follows：

- Connect to Kubernetes cluster via KubeAPI
- helm install rainbond chart
- Create a CR resource
- Wait for rainbond-operator to complete cluster initialization.

Therefore, in most cases the apparent problem that users encounter is that they time out waiting for the cluster to complete initialization.waiting rainbond region ready timeout.
<img src="https://static.goodrain.com/docs/5.3/operator/timeout.png" width="60%" />
But there are many practical reasons behind the surface.We first give an idea for troubleshooting, and then focus on some common problems：

The investigation ideas are as follows：

##### Check the pod situation under the rbd-system namespace.

> Rainbond system components are installed under the rbd-system namespace and are installed based on a certain order.`kubectl get pod -n rbd-system` to query pod information.

> By specifying the node to follow, the cluster node does not carry the`kubectl`command by default, and refer to[document](../tools/kubectl/)for installation.

> The first step to install the basic components includes：rainbond-operator, nfs-provider (if the external storage service is specified in the initialization parameter, no such component), rbd-hub (if the external mirror warehouse service is specified in the initialization parameter, there is no such component) ,rbd-etcd (if the external etcd service is specified in the initialization parameter, no such component), rbd-gateway, rbd-node

> If a component runs abnormally, run the`kubectl logs`command to view the log for exception handling.

FAQs have：

- rbd-gateway is not functioning properly.Usually it is a port conflict, especially if the ingress-controller already exists in the cluster, it is very likely to have a conflict.rbd-gateway operation requires that the following ports of the node must be free：80, 443, 8443, 6060, 10254, 18080, 18081.If there is an ingress-controller, you need to select no ingress-controller as the Rainbond gateway node, and specify nodesForGateway in the rainbondcluster cluster initialization configuration resource.[Refer to document](./init-region).

- rbd-etcd is not functioning properly.The main reasons are low disk performance or IO stress on the node running the component.The etcd service is a key service for cluster stability, and SSD disks need to be configured as much as possible.

- rbd-node failed to start.The main reason is that the rbd-hub service has not been started, and the certificate issuance of the mirror warehouse has not been completed.Just wait for the rbd-hub service to start to complete.

- If there are factors such as node network failure, DNS resolution failure, etc., components can also fail.It can be analyzed according to the log.

##### View rainbond-operator logs

> If the appeal components are running normally and the initialization has not been completed for a long time, you can check the rainbond-operator log for troubleshooting.

FAQs have：

- Slow network or disk IO results in long mirror pulls.The log reflects that the mirror has been pulled all the time.

- It always prints`waiting local image hub ready`. If the components are normal, it is considered that there is a problem with the distribution of the warehouse certificate.Process according to [processing mode](https://github.com/goodrain/rainbond/issues/956).
