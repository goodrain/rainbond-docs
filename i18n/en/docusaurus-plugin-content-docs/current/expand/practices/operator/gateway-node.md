---
title: Reassign the Gateway node
weight: 5001
---

> rbd-gateway is a high-performance distributed cluster gateway developed by Haoyu Technology. Service components deployed on the Rainbond platform can expose domain names or service addresses in the form of IP:Port through this gateway, and support Http protocol and Tcp protocol.When the Rainbond cluster is first installed and deployed, it will be required to specify the gateway node (rbd-gateway deployment node) to be deployed on some nodes in the cluster.So after the cluster is built, how to re-designate the gateway node, and what operations should be done after switching the gateway?



### scene description

`rbd-gateway` The gateway service is deployed in the Rainbond cluster as a daemon process through `Kubernetes DaemonSet` controllers.It has distributed characteristics and can be deployed on any one or a batch of nodes in the cluster. The nodes that deploy `rbd-gateway` gateway service are called gateway nodes.

When a Rainbond cluster is deployed, certain nodes in the cluster are required to be designated as gateway nodes.After the cluster is built, it is also possible to re-designate the gateway node if it needs to be re-planned.

### reassign gateway node

- First, it is necessary to ensure that the new gateway node does not listen to ports `80, 443, 6060, 7070, 8443, 10254, 18080, and 18081` to avoid port conflicts.
- Second, make sure `rainbond-operator` is using the latest mirror：

```bash
kubectl edit statefulsets.apps rainbond-operator -n rbd-system
```

Make sure the `spec.template.spec.containers.image` field  `rainbond-operator` uses the `v1.1.1` version (current latest version) image, if it is lower than this version, then modify it.

```yaml
image: registry.cn-hangzhou.aliyuncs.com/goodrain/rainbond-operator:v1.1.1
```

- Finally, modify Rainbond custom resource `rbdcomponents.rainbond.io` in `rbd-gateway`:

```bash
kubectl edit rbdcomponents.rainbond.io -n rbd-system rbd-gateway
```

Modify the description of the Scheduling Affinity paragraph：

```yaml
spec:
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
        - matchExpressions:
          - key: kubernetes.io/hostname
            operator: In
            values:
            - 172.24.206.41 # This list declares which rbd-gateway will schedule to Node
            - 172.24.206.40 
```

In the above description of scheduling affinity,`values` specifies the name of the node, which is obtained through the `kubectl get node` command

```bash
[root@iZhp38me3xgju205i5udfnZ ~]# kubectl get node
NAME STATUS ROLES AGE VERSION
172.24.206.41 Ready master 38d v1.16.2
```



### Modify the address of the traffic entry

The previous section shows how to specify the scheduling gateway service (rbd-gateway), so what needs to be done after the `rbd-gateway` service is migrated to the specified new node?According to different scenarios, what to do is different.

- In the first scenario, there is：load balancing on the outer layer of the gateway. In this scenario, the server where the `rbd-gateway` service is located is the access portal of the running application on the platform.External access traffic flows in through the IP of this server.Then, you need to modify：

1. The resolution address of the domain name bound to the application.You can change the resolution address of the domain name from the domain name resolution service provider.
2. This IP should also be changed when exposing `<gateway IP>:<port>` after the application opens the outgoing TCP protocol.

The operation method is to log in to the database used by Rainbond, the default is `rbd-db` component.update `console.region_info` table content：

```bash
update console.region_info set wsurl='ws://<new gateway IP>:6060', tcpdomain='<new gateway IP>';
```



- The second scenario：The outer layer of the gateway has load balancing.For example, in the ACK Alibaba Cloud environment, if multiple gateway nodes are deployed, Alibaba's SLB service is used externally for unified load balancing.Then, after the `rbd-gateway` service is migrated to the specified new node, you only need to modify the backend instance in the SLB load balancing, remove the old gateway IP, and add the new gateway IP.



### for other components

All components of Rainbond are maintained and configured through the custom resource type `rbdcomponents.rainbond.io` , that is to say, you can specify any Rainbond component to schedule to a certain or a certain type of node in this way.

For example, at the beginning of the installation of Rainbond cluster, it will also be required to specify the running node of the build service, that is, the node where the `rbd-chaos` service is deployed.It can also be re-specified by the way in this article.