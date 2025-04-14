---
title: Cluster-side Contribution Guide
description: This document describes how to contribute to the Rainbond cluster-side project.
---

## Rainbond cluster-side source code compilation

The data center side is directly deployed on the Kubernetes cluster, and there are many components, so you can compile a single component as needed.

## Single component compilation

Single component compilation is very important in the actual development process. Due to the large system architecture of Rainbond, it is usually to modify a certain component during the development process, compile the component, and use the latest component image to directly replace the image in the installed development and test environment.

Single component compilation supports the following components:

| Component | illustrate                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| chaos     | The chaos component corresponds to the Rainbond application build service, mainly processing the CI process, parsing, compiling, and packaging input sources including `source code` or `Docker image` or `application market application`, and finally generating the version medium of the application (component).                                                                                                                                                                                                     |
| api       | The api component corresponds to the Rainbond data center API service. The API service, as the core control service of the data center level abstraction, provides Restful style API services externally and is the only entry point for data center control requests.                                                                                                                                                                                                                                                       |
| gateway   | The gateway component corresponds to the Rainbond application gateway service. The application gateway is the only entry point for external traffic to enter the internal components of the Rainbond tenant, providing HTTP, HTTPs routing, TCP/UDP services, load balancer, advanced routing (A/B testing, gray release), virtual IP support and other functions.                                                                                                                                        |
| monitor   | The monitor component corresponds to the Rainbond monitoring service. Rainbond encapsulates the Monitor component based on Prometheus, automatically discovers various monitoring objects of applications, clusters, and cluster node services from etcd and Kubernetes clusters, completes Prometheus monitoring target configuration, and includes the monitoring targets in the Prometheus monitoring scope.                                                                                                              |
| mq        | The mq component corresponds to the Rainbond message middleware service. The MQ component is a lightweight distributed, message persistent and globally consistent message middleware based on Etcd.This component maintains asynchronous task messages and provides multi-topic message publishing and subscription capabilities.                                                                                                                                                                           |
| webcli    | The webcli component corresponds to the Rainbond application Web terminal control service. This component implements the function of connecting to the container console through the web.This component communicates with the UI through WebSocket. Users can send various shell commands through the simulated Web terminal. Webcli executes commands in the container through the exec method provided by kube-apiserver and returns the results to the Web terminal.      |
| worker    | The worker component corresponds to the Rainbond application runtime control service. The application runtime control service instantiates the Rainbond-Application Model into the Kubernetes resource model, configures various resources required for application operation, completes the running state part of the application life cycle, and can be understood as the CD control service. The design point of this service is to support the life cycle supervision of a large number of applications. |

## The compilation method is as follows:

(1) Clone the project

```bash
git clone https://github.com/goodrain/rainbond.git
```

(2) Take the chaos component as an example, execute in the main directory of the rainbond code

```bash
./release.sh chaos
```

## Complete installation package packaging and compilation

Compiling the complete installation package is suitable for regenerating the installation package after modifying more source code.Execute in the main directory of the rainbond code

```
./release.sh all
```

## Run the data center side image

Since the data center side is deployed on the Kubernetes cluster, you need to meet the following preconditions to run the compiled component image.

### Preconditions

1. A test environment with Rainbond installed
2. Install the Kubectl command

### Run the image

The components of the Rainbond data center side are all defined by the rbdcomponent CRD resource.Therefore, when you compile an image of a certain component and need to run it, you need to modify the rbdcomponent resource.

Still take the chaos component as an example.Assume the chaos image you compiled is named

```Bash
rainbond/rbd-chaos:v5.5.0-release
```

Then you need to perform the following operations in sequence to replace the component image in your cluster.

(1) Edit the corresponding rbdcomponent file

```Bash
kubectl edit rbdcomponent rbd-chaos -n rbd-system
```

(2) Find the image address column and modify it to your image, such as

```Bash
image: rainbond/rbd-chaos:v5.5.0-release
imagePolicy: IfNotPresent
```

(3) Save and exit. At this time, execute the following command, and you should see the corresponding component being updated.Wait for the pod to update.

```Bash
kubectl get po -n rbd-system
```
