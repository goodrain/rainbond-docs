---
title: Console troubleshooting
description: This topic describes how to troubleshoot server exceptions on the Rainbond console
keywords:
  - Rainbond Troubleshooting server exceptions
---

This article describes how to troubleshoot some warnings that pop up in the upper right corner when using Rainbond, for example: server-side exceptions.

## Troubleshoot ideas

:::tip
When operating on the console page, if a warning pops up in the upper right corner, or other unexpected display occurs, refer to the following to troubleshoot the problem.
:::

When a problem occurs, check its log first, and troubleshoot the problem based on the log.

Go to **Platform Management -> Log -> Console Log** of the console, and troubleshoot problems according to the log.

## common problem

### Server exception

This type of problem indicates that there is a problem with the console itself, and the problem can be solved by querying and analyzing the log files according to [Troubleshooting Ideas](#执查思想).

#### Database is blocked

When the console log prompts `database is locked`, it means that the console database is locked. This may be due to multiple data operations at the same time. You can wait or restart the console to solve the problem, or switch the console database to MySQL to permanently solve the problem .

### Failed to get node list

This problem indicates that the Node Labels of the Kubernetes cluster do not match, causing the console to fail to obtain the node list. By default, the `node-role.kubernetes.io/worker=true node-role.kubernetes.io/master=true` label is used to distinguish nodes Role, check whether the node label is correct:

```bash
kubtl get nodes --show-labels
```

If the label does not exist, it can be added with the following command:

```bash
kubectl label nodes <node-name> node-role.kubernetes.io/worker=true
```

### Component failure

There is a component failure on the platform management home page, for example: `rbd-chaos` component failure, there are several possibilities for this problem:

1. The collection of monitoring data is not timely, resulting in incorrect data, which leads to component failure.
2. If the component does fail, you can check the component log to troubleshoot the problem.

```bash
# Check if the component status is running
kubectl get pod -n rbd-system

# View component logs
kubectl logs -fl name=rbd-chaos -n rbd-system
```

3. The component works normally, but the alarm of component failure keeps appearing, which can be solved by restarting the component as follows:

```bash
kubtl delete pod -l name=rbd-chaos -n rbd-system
```

### Unable to view component real-time logs

Real-time logs cannot be viewed in the component, there may be two situations:

1. The address configured by the Websocket is incorrect, resulting in communication failure.
2. The rbd-eventlog service fails, making it impossible to obtain logs.

Troubleshooting method:

1. Check the Websocket address, **Platform Management -> Cluster -> Edit Cluster** Check the Websocket address, whether the local can communicate with this address.
2. Check whether the rbd-eventlog service is normal. If not, check the service log or try to restart the component.

```bash
# View component status
kubectl get pod -l name=rbd-eventlog -n rbd-system

# restart the component
kubectl delete pod -l name=rbd-eventlog -n rbd-system
```
