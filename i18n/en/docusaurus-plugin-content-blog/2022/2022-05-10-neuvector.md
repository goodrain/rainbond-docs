---
title: Rainbond combines NeuVector to practice container security management
description: Rainbond combines NeuVector to practice container security management
slug: neuvector
---

:::info
This article mainly describes the steps of installing and deploying the NeuVector container security platform based on Rainbond, as well as the best practices in the production environment with Rainbond.
:::

<!--truncate-->

## foreword

Rainbond is a cloud-native application management platform that is easy to use and does not require knowledge of containers, Kubernetes and the underlying complex technologies. It supports managing multiple Kubernetes clusters and managing the entire lifecycle of enterprise applications.However, with the little progress of the cloud-native era and the emergence of endless network container security incidents, everyone has a further idea of the importance of container security and network security. Similar container security incidents occur, and NeuVector is specially adapted to integrate.

NeuVector is the industry's first end-to-end open source container security platform, providing an enterprise-grade zero-trust security solution for containerized workloads.NeuVector can provide real-time in-depth container network visualization, east-west container network monitoring, active isolation and protection, container host security, and container internal security. The container management platform seamlessly integrates and automates application-level container security, suitable for various cloud environments. , container production environments such as cross-cloud or on-premises deployments.

This article mainly describes the steps to install and deploy the NeuVector container security platform based on Rainbond, as well as the best practices for implementing the production environment with Rainbond.

## Deploy NeuVector

NeuVector has a variety of deployment and installation forms. In order to simplify the installation, choose the helm form for installation. Rainbond also supports the form of the helm store. You only need to add a new store in the application market and fill in the URL of the helm store.

### Preparation

**Create a team**

NeuVector is usually installed in the neuvector namespace, and in Rainbond, the concept of a team corresponds to the namespace in kubernetes, so when installing through helm, you first need to create a corresponding team, and the English name of the team corresponds to the The namespace of the team in the cluster, fill in neuvector here, and select the corresponding cluster.

<img src="https://static.goodrain.com/wechat/neuvector/1.png" width="70%;" />



**Docking helm store**

Rainbond supports direct deployment of applications based on helm, so the next step is to connect to the official helm warehouse of neuvector, and then to deploy neuvector based on the Helm store. On the application market page, click Add store, select the helm store, and enter the relevant information to complete the connection.

helm store address：https://neuvector.github.io/neuvector-helm/

![](https://static.goodrain.com/wechat/neuvector/2.png)

### Install

Find the core in the helm warehouse and click to install it into the neuvector team

![](https://static.goodrain.com/wechat/neuvector/3.png)

Modify the default key and value

![](https://static.goodrain.com/wechat/neuvector/4.png)

values configuration item：

| key                          | value                        |
| ---------------------------- | ---------------------------- |
| registry                     | docker.io                    |
| tag                          | 5.0.0-preview.1              |
| controller.image.repository  | neuvector/controller.preview |
| enforcer.image.repository    | neuvector/enforcer.preview   |
| manager.image.repository     | neuvector/manager.preview    |
| cve.scanner.image.repository | neuvector/scanner.preview    |
| cve.updater.image.repository | neuvector/updater.preview    |
| manager.svc.type             | ClusterIP                    |

After the installation is complete, confirm that the status of the pod is Running

<img src="https://static.goodrain.com/wechat/neuvector/5.png" />

neuvector provides a visual operation interface, the installation process will automatically create a Service, and the access port of neuvector can be exposed in the form of third-party components of the Rainbond platform.

<img src="https://static.goodrain.com/wechat/neuvector/6.png" />

The following are the options that need to be configured

| component name                | neuvector-web           |
| ----------------------------- | ----------------------- |
| Component English name        | neuvector               |
| Component registration method | kubernetes              |
| Namespace                     | neuvector               |
| Service                       | neuvector-service-webui |

After the addition is complete, you need to add and open the port (8443) for external access. The default username and password are both `admin/admin`

![](https://static.goodrain.com/wechat/neuvector/7.png)

Note that when accessing：, you need to access it in the form of https, so far the neuvector installation is complete

<img src="https://static.goodrain.com/wechat/neuvector/8.png" />



## NeuVector Best Practices

### Network Traffic Monitoring Governance

The network activity provided by NeuVector can clearly view the network traffic trend between each pod.As well as the corresponding ports and rules, you can view the direction more clearly.

The blue line represents the normal flow recorded in the learning mode.

The yellow flow is recorded in monitoring mode, and we need to manually review the rules to decide whether to pass this traffic.

Red means that it is recorded in the protected mode, and the trend is rejected, which can also be avoided by rules.

![](https://static.goodrain.com/wechat/neuvector/9.png)



### Use of learning mode, monitoring mode, protected mode

NeuVector's group supports 3 modes：learning mode, monitoring mode and protection mode; the functions of each mode are as follows：

**learning mode**

Learn and record container, host-to-host network connectivity, and process execution information.

Automatically build a whitelist of network rules to protect the normal behavior of application networks.

Set a security baseline for the processes running in each service's container and create a whitelist of process profile rules.

**monitor mode**

NeuVector monitors the network and process operation of containers and hosts, and will alert in NeuVector security events when encountering behaviors recorded in non-learning mode.

**protected mode**

NeuVector monitors the network and process operation of containers and hosts, and directly rejects the behavior recorded in non-learning mode.

For the above three modes, the best practices suitable for the production environment can be summarized. When a new business is ready to go online, it can be defaulted to the learning mode. After a period of learning, the rules of the container and the host are recorded, and then Convert to monitoring mode, run for a period of time, monitor whether there are special network traffic and host processes, help us record special network trends, and alarm to confirm whether to release, and finally switch to monitoring mode to avoid some malicious operations against us the environment poses unnecessary danger.



### Cluster-based image repository for vulnerability checking

The smallest unit of the kubernetes cluster deployment business is the pod, but the most important part of the pod is the image. NeuVector can also perform vulnerability checks based on the image to avoid injecting special vulnerability mechanisms into the image.

When connecting to Rainbond, without using an external mirror warehouse, Rainbond will provide a default warehouse goodrain.me for storing mirrors, which is used to store the mirrors of all businesses built by Rainbond, so by checking the inside Mirroring, it can be clearly seen that the mirroring that the business depends on has those vulnerabilities, and the impact caused by the mirroring vulnerability problem has been avoided.

If you use an external mirror repository when connecting to Rainbond, and the domain name can be resolved, you can directly fill in the domain name, because goodrain.me itself cannot be resolved by NeuVector, so you need to manually add the corresponding coredns through the cluster. Parse to make sure NeuVector can connect.

edit coredns

```shell
kubectl edit cm coredns -n kube-system  
```

<img src="https://static.goodrain.com/wechat/neuvector/10.png" width="70%;" />

Get the IP resolved by goodrain.me

```shell
kubectl get rainbondcluster -n rbd-system -oyaml | egrep -v [A-Za-z{}]
```

Add the following content in the specified location, pay attention to modify the IP

```shell
hosts {
  192.168.0.1 goodrain.me
  fallthrough
}
```

On the left side of the NeuVector web interface, select the asset >  image repository to add a repository

![](https://static.goodrain.com/wechat/neuvector/11.png)

The default user of goodrain.me is admin, and the password is obtained by the following command

```shell
 kubectl get rainbondcluster -n rbd-system -oyaml | grep password | sed "1d"
```

After the mirror scan is completed, the mirror information will be displayed below. Click the name of the mirror you want to view to view the detailed information. The following is for reference.

![](https://static.goodrain.com/wechat/neuvector/12.png)

## write at the end

Through this article, I hope that you can successfully deploy the NeuVector container security platform based on Rainbond, and you can do the corresponding operations according to the best practices. Of course, the functions of NeuVector are far more than that, and you still need to continue to explore, constantly practice.

