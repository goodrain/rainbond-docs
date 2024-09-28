---
title: Operation troubleshooting
description: This topic describes how to troubleshoot Rainbond components
keywords:
  - Troubleshooting the operation of components in the process of using Rainbond
---

## runtime problems

![](https://static.goodrain.com/docs/5.12/troubleshooting/installation/en-run.png)

When the operation log of the service component indicates that the build is successful, it enters the stage of running the service component. We expect all component instances to show a green `Running` status, but many abnormal situations may occur, which need to be checked step by step according to the guidelines. At this stage, it is necessary to understand the concepts of each stage in [Component Lifecycle](/docs/use-manual/component-manage/overview/service-properties). The subsequent troubleshooting process is also based on the different states of the components.We expect all component instances to show a green `in-run` state, but there may also be many anomalies that need to be checked step by step according to the guidelines.At this stage, it is necessary to understand the concepts of the various phases of [组件生命周期](/docs/use-manual/component-manage/overview/service-properties).The subsequent scheduling process is also based on the different state of the component.

## common problem

### Components have no running log information

Component logs are pushed through WebSocket. If there is no log information, go to **Platform Management -> Cluster -> Edit** to check whether the `WebSocket` communication address is correct. If the cluster is provided by a public cloud vendor, the address here is internal network IP, then you cannot establish a WebSocket with the cluster locally, and you cannot display logs. Change this to the IP you can connect to locally.Change this to an IP you can connect locally.

### Troubleshoot runtime issues based on exception status

#### Scheduler

The component instance is always in the <font color="#ffa940"> scheduling </font> state

An instance of</font> state in the <font color="#ffa940"> schedule, representing an orange block.Note that there are no enough resources in the cluster to run this instance.Details about specific resource items are missing and can be found in `description` by clicking on the orange block, opening the instance details page.e.g.：

```css
Instance Status: Scheduling
Reason: Unschedulable
Explanation: 0/1 nodes are available: 1 node(s) had desk pressure
```

Based on the \`description', it is understood that there are 1 host node in the current cluster, but it is not available because the node has disk pressure.The problem is automatically lifted when the node is extended for reasons or when space is cleared.Common resource deficit types also include：CPU insufficiency and memory deficiency.

#### waiting to start

The component instance has been in the <font color="#ffa940"> waiting to start </font> state

The Rainbond platform determines the startup order based on dependencies between components. If a service component is in the <font color="#ffa940"> waiting to start </font> state for a long time, it means that some of the components it depends on failed to start normally. Switch to the application topology view to sort out the dependencies among components to ensure that the components they depend on are in a normal operating state.Instances in the <font color="#ffa940"> Scheduling </font> state are represented by orange squares. It means that there are not enough resources in the cluster to run this instance. For details about the shortage of specific resource items, you can click the orange square to open the instance details page and learn about it in `Description`. For example:Switch to the Apple-Optical View compose dependencies to ensure that the components it depends are in a normal state of operation.

#### Abnormal operation

The component instance has been in the state of <font color="red"> running abnormally </font>

Running an exception means that the instance has encountered something that is not working properly.An unhealthy state means that the instance encountered a condition that prevented it from functioning properly. Click the red square, you can find prompts on the instance details page, focus on the status of the container in the instance, and continue to troubleshoot the problem based on the different status. The following are common problem states:Below are common questions status：

##### ImagePullBackOff

This status indicates that the image of the current container cannot be pulled. Pull down to the `Events` list to get more detailed information. Make sure that the corresponding image can be pulled. If you find that the image that cannot be pulled starts with `goodrain.me`, you can try to build this component to solve the problem.Make sure the mirror can be pulled and try building the component to solve the problem if it starts with `foodrain.me`.

##### Etcd could not start pkg/netutil: could not resolve host rbd-etcd:2380

This state may be `kube-system` in the namespace \`\`\`\`coredns\`\` which cannot be started. See for more information.

```bash
kubtl get po -nkube-system
```

Appears as follows

```bash
NAME READY STATUS RESTARTS AGE
coredns-79d84b4865-n6n2x 0/1 ImagePullPackOff 1 (5h36m ago) 20h
coedns-autoscal-b7fd846f5-p5627 1/1 Running 1 (5h36m ago) 20h
kube-flannel-jxmt6 2/2 Running 2 (5h36m ago) 20h
rke-coredns-addon-de-employ-q5nps 0/1 Completed 0 20h
rke-network-plugin-de-employ-job-bcrsg 0/1 Completed 0  
```

If you see `corens` not running successfully, you may be unable to pull the image. Try changing the image

```bash
kubtl edit po coredns-79d84b4865-n6n2x -nkube-system
```

The speci.containers.image field can be changed to `rancher/mirrored-coredns:1.9.0`

```yaml
spec:
  containers:
    image: rancher/mirrored-coredns-coredns:1.9.0
```

The pod will reboot automatically, wait a moment to re-run the view of the pod and see if the service is back normal.

`coredns-autoscaler` may also cause this problem by changing the image to `rancher/mirrored-cluster-proportional-autoscaler:1.8.5`

##### Failed to pull image xx, denied: You may not log in yet

Can be built successfully, but cannot scroll over updates, usually without `rbd-hub-credential` in the namespace or `rbd-hub-credentials` key content is incorrect.
Can view the existence of this key by command

```bash
kubtl get secret -n <namespace>
```

1. If this key does not exist, you can try to change the key field after creating a new yaml or export the yaml file from another namespace

```yaml
apiVersion: v1
data:
  .dockerconfigjson: xxxx # Authorized Field, modified as the case may be, this field
does not need to be modified if yaml exported from a new namespace is exported: Secret
metata:
  name: rbd-hub-credentials
  namespace: xx # namespace, modifies
type: kubernetes.io/dockerconfigjson
```

Export yaml from other namespace(you can create a new team with a new namespace and there is `rbd-hub-credentials`)

```bash
kubtl get secret rbd-hub-credentials -o yaml > rbd-hub-credentials.yaml -n <namespace>
```

Then modify the `mettata.namespace`, mentioned above, to replace the `namespace` field with the namespace of your problem.
Second, create a new component.

```bash
kubtl apply -f rbd-hub-credentials.yaml -n <namespace>
```

Finally check for successful runs.

2. If this key exists, you can check if the group key is configured correctly

```bash
kubtl get secret rbd-hub-credentials - n <namespace> -o jsonpath='{.data.\.dockerconfigjson}' | base64 --decode
```

If authentication is not correct, try deleting the key

```bash
kubtl delete secret rbd-hub-credentials — n <namespace>
```

The deletion will be sufficient to re-establish itself on the basis of the above steps.

##### CrashLoopBackup

This status indicates that the current container itself failed to start, or is encountering a runtime error. Switch to the `log` page to view the business log output, and solve the problem symptomatically.Switch to the `log` page to view the transaction log output, to resolve the problem.

##### OMOMKilled

According to `Description`, we can know that there is a total of 1 host node in the current cluster, but it is in an unavailable state because the node has disk pressure. After expanding the disk capacity or clearing the space of the node according to the reason, the problem will be solved automatically. Common resource shortage types also include: insufficient CPU, insufficient memory.The memory config entry for the business container is on the `scale` page.This status indicates that the memory allocated for the container is too small, or there is a memory leak problem in the service itself. The memory configuration entry of the business container is located on the `Scaling` page. The memory configuration entry for the plugin container is located on the `Plugins` page.

### Third-party components are not ready

Follow the steps below for third-party components:

1. Open the internal port of the third-party component
2. Set third-party component health detection
3. Start/update third-party components

It cannot be used normally until the status of the third-party component is `ready`.

If the status of the third-party component is `ready`, but cannot be accessed internally or externally, please troubleshoot by the following steps:

1. Check whether the endpoint created by the third-party component is correct

```bash
kubtl get deep -n <namespace>
```

2. Check whether the service created by the third-party component is correct, and check whether it can be accessed through the curl command

```bash
kubtl get svc -n <namespace>
```

3. Check whether the ingress created by the third-party component is correct

```bash
kubtl get -n <namespace>
```
