---
title: Rainbond cluster-side source code compilation
description: Rainbond cluster-side source code compilation
---

## Rainbond cluster-side source code compilation

The data center side is directly deployed on the Kubernetes cluster and has many components, so you can compile individual components as needed.

## single component compilation

Single-component compilation is very important in the actual development process. Due to the relatively large system of the Rainbond system, in the usual development process, a component is usually modified and then compiled, and the latest component image is used in the installed development and test environment. directly replace the image in the .

Single component compilation supports the following components：

| components      | illustrate                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| chaos           | The chaos component corresponds to the Rainbond application construction service, which mainly deals with the CI process. The input source includes `source code` or `Docker image` or `application market application` for parsing, compiling, packaging, and finally generating the version medium of the application (component).                                                                                                                                                                                             |
| api             | The api component corresponds to the Rainbond data center API service. As the abstract core control service at the data center level, the API service provides Restful-style API services to the outside world, and is the only entry for data center control requests.                                                                                                                                                                                                                                                          |
| gateway         | The gateway component corresponds to the Rainbond application gateway service. The application gateway is the only entry for external traffic to enter the internal components of the Rainbond tenant, providing HTTP, HTTPs routing, TCP/UDP services, load balancer, advanced routing (A/B testing, grayscale publishing), Features such as virtual IP support.                                                                                                                                                                |
| monitor         | The monitor component corresponds to the Rainbond monitoring service. Rainbond encapsulates the Monitor component based on Prometheus. By automatically discovering various monitoring objects of applications, clusters, and cluster node services from etcd and Kubernetes clusters, and completing the configuration of Prometheus monitoring targets, the monitoring targets are included in the scope of Prometheus monitoring. .                                                                                           |
| mq              | The mq component corresponds to the Rainbond message middleware service. The MQ component is a lightweight distributed message middleware with message persistence and global consistency based on Etcd.This component maintains asynchronous task messages and provides multi-topic message publishing and subscription capabilities.                                                                                                                                                                                           |
| webcli          | The webcli component corresponds to the Rainbond application web terminal control service, which implements the function of connecting to the container console through the web.This component communicates with the UI through WebSocket. Users can send various shell commands by simulating the web terminal. The webcli executes commands in the container through the exec method provided by kube-apiserver and returns the results to the web terminal.                                                                   |
| worker          | The worker component corresponds to the Rainbond application runtime control service. The application runtime control service instantiates the Rainbond-Application Model and converts it into a Kubernetes resource model. It is associated with various resources required for application running, and completes the running state part of the application life cycle. It is understandable For the CD control service, the design of the service is to support the life cycle supervision of a large number of applications. |
| eventlog        | The eventlog component corresponds to the Rainbond event and log processing service, and mainly handles user asynchronous operation logs, application construction logs and application running logs.                                                                                                                                                                                                                                                                                                                            |
| mesh-data-panel | The mesh-data-panel component handles dependencies between components.                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| grctl           | The grctl component provides command-line tools for querying information about components in the cluster.                                                                                                                                                                                                                                                                                                                                                                                                                        |
| node            | The node component corresponds to the Rainbond cluster and node management service. The node component is the basic service of the Rainbond cluster. All nodes in the cluster need to run this component.Provides key capabilities such as node information collection, cluster service maintenance, application log collection, and application runtime support.                                                                                                                                                                |


## The compilation method is as follows：

(1) Clone project

```bash
git clone https://github.com/goodrain/rainbond.git
```

(2) Take the chaos component as an example, execute it in the main directory of the rainbond code

```bash
./release.sh chaos
```

## The complete installation package is packaged and compiled

Compiling the complete installation package is suitable for regenerating the installation package after changing a lot of source code.Execute in the main directory of the rainbond code

```
./release.sh all
```

## Running data center side mirroring

Since the data center is deployed on the Kubernetes cluster, you need to meet the following prerequisites to run the compiled component image.

### Preconditions

1. Rainbond's test environment has been installed
2. Kubectl command

### run image

The components on the data center side of Rainbond are all defined by the CRD resource rbdcomponent.Therefore, when you compile the image of a component and need to run it, you need to modify the rbdcomponent resource.

Still take the chaos component as an example.Suppose your compiled chaos image is named

```Bash
rainbond/rbd-chaos:v5.5.0-release
```

Then you need to do the following in order to replace the component images in your cluster.

(1) Edit the corresponding rbdcomponent file

```Bash
kubectl edit rbdcomponent rbd-chaos -n rbd-system
```

(2) Find the mirror address column and modify it to your mirror, such as

```Bash
image: rainbond/rbd-chaos:v5.5.0-release
imagePolicy: IfNotPresent
```

(3) Save and exit, execute the following command at this time, you should see that the corresponding component is being updated.Just wait for the pod to update.

```Bash
kubectl get po -n rbd-system
```
