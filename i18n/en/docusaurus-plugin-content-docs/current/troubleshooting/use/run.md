---
title: Operation troubleshooting
description: This topic describes how to troubleshoot Rainbond components
keywords:
- Troubleshooting the operation of components in the process of using Rainbond
---

## runtime problems

![](https://static.goodrain.com/docs/5.12/troubleshooting/installation/en-run.png)

When the operation log of the service component indicates that the build is successful, it enters the stage of running the service component. We expect all component instances to show a green `Running` status, but many abnormal situations may occur, which need to be checked step by step according to the guidelines. At this stage, it is necessary to understand the concepts of each stage in [Component Lifecycle](/docs/use-manual/component-manage/overview/service-properties). The subsequent troubleshooting process is also based on the different states of the components.
## common problem
### Components have no running log information

Component logs are pushed through WebSocket. If there is no log information, go to **Platform Management -> Cluster -> Edit** to check whether the `WebSocket` communication address is correct. If the cluster is provided by a public cloud vendor, the address here is internal network IP, then you cannot establish a WebSocket with the cluster locally, and you cannot display logs. Change this to the IP you can connect to locally.

### Troubleshoot runtime issues based on exception status

#### Scheduling

The component instance is always in the <font color="#ffa940"> scheduling </font> state

Instances in the <font color="#ffa940"> Scheduling </font> state are represented by orange squares. It means that there are not enough resources in the cluster to run this instance. For details about the shortage of specific resource items, you can click the orange square to open the instance details page and learn about it in `Description`. For example:

```css
Instance Status: Scheduling
Reason: Unschedulable
Explanation: 0/1 nodes are available: 1 node(s) had desk pressure
```

According to `Description`, we can know that there is a total of 1 host node in the current cluster, but it is in an unavailable state because the node has disk pressure. After expanding the disk capacity or clearing the space of the node according to the reason, the problem will be solved automatically. Common resource shortage types also include: insufficient CPU, insufficient memory.

#### waiting to start

The component instance has been in the <font color="#ffa940"> waiting to start </font> state

The Rainbond platform determines the startup order based on dependencies between components. If a service component is in the <font color="#ffa940"> waiting to start </font> state for a long time, it means that some of the components it depends on failed to start normally. Switch to the application topology view to sort out the dependencies among components to ensure that the components they depend on are in a normal operating state.

#### Abnormal operation

The component instance has been in the state of <font color="red"> running abnormally </font>

An unhealthy state means that the instance encountered a condition that prevented it from functioning properly. Click the red square, you can find prompts on the instance details page, focus on the status of the container in the instance, and continue to troubleshoot the problem based on the different status. The following are common problem states:

##### ImagePullBackOff

This status indicates that the image of the current container cannot be pulled. Pull down to the `Events` list to get more detailed information. Make sure that the corresponding image can be pulled. If you find that the image that cannot be pulled starts with `goodrain.me`, you can try to build this component to solve the problem.

##### CrashLoopBackup

This status indicates that the current container itself failed to start, or is encountering a runtime error. Switch to the `log` page to view the business log output, and solve the problem symptomatically.

##### OOMkilled

This status indicates that the memory allocated for the container is too small, or there is a memory leak problem in the service itself. The memory configuration entry of the business container is located on the `Scaling` page. The memory configuration entry for the plugin container is located on the `Plugins` page.
### Third-party components are not ready

Follow the steps below for third-party components:

1. Open the internal port of the third-party component
2. Set third-party component health detection
3. Start/update third-party components

It cannot be used normally until the status of the third-party component is `ready`.

If the status of the third-party component is `ready`, but cannot be accessed internally or externally, please troubleshoot by the following steps:

1. Check whether the endpoint created by the third-party component is correct
  ```bash
  kubectl get ep -n <namespace>
  ```
2. Check whether the service created by the third-party component is correct, and check whether it can be accessed through the curl command
  ```bash
  kubectl get svc -n <namespace>
  ```
3. Check whether the ingress created by the third-party component is correct
  ```bash
  kubectl get ing -n <namespace>
  ```